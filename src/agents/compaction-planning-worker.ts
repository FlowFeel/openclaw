/**
 * Runs CPU-heavy compaction planning in a worker thread when histories are
 * large enough to risk starving the main event loop.
 *
 * Phase 1 (multithreaded-runtime-design.md): uses a warm worker pool
 * (`TopicAffineWorkerPool`) instead of spawning a fresh worker per call.
 * The legacy `runCompactionPlanningWorker` (spawn-per-call) is retained as a
 * fallback and for the test API.
 *
 * 2a reconciliation: the former `CompactionPlanningWorkerPool` (a dedicated
 * single-worker pool) has been retired.  `TopicAffineWorkerPool<CompactionPlanningWorkerValue>`
 * with `poolSize: 1` and `workerData: { mode: "persistent" }` replaces it —
 * one pool abstraction for all request-response workers.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Worker } from "node:worker_threads";
import { resolveTimerTimeoutMs } from "@openclaw/normalization-core/number-coercion";
import { toErrorObject } from "../infra/errors.js";
import { createSubsystemLogger } from "../logging/subsystem.js";
import { TopicAffineWorkerPool, WorkerPoolError } from "../process/topic-affine-worker-pool.js";
import {
  buildOversizedFallbackPlan,
  buildStageSplitPlan,
  buildSummaryChunks,
  computeAdaptiveChunkRatio,
  projectCompactionMessagesForPlanning,
  sanitizeCompactionMessages,
  type OversizedFallbackPlan,
  type StageSplitPlan,
} from "./compaction-planning.js";
import { readCompactionPlanningOmittedChars } from "./compaction-planning-projection.js";
import type {
  CompactionPlanningWorkerInput,
  CompactionPlanningWorkerResult,
  CompactionPlanningWorkerValue,
} from "./compaction-planning.worker.js";
import { resolveCompactionStrategy } from "./embedded-agent-runner/compaction-scheduler.js";
import type { AgentMessage } from "./runtime/index.js";

const COMPACTION_PLANNING_WORKER_TIMEOUT_MS = 60_000;
// The inline-vs-worker threshold lives in compaction-scheduler.ts
// (DEFAULT_MIN_MESSAGES_FOR_COMPACTION_WORKER = 64). Small compactions run
// inline (worker startup not worth it); starvation-sized plans offload.

const log = createSubsystemLogger("compaction");

function estimateMessagesBytes(messages: AgentMessage[]): number {
  let total = 0;
  for (const msg of messages) {
    if (typeof msg.content === "string") {
      total += msg.content.length;
    } else if (Array.isArray(msg.content)) {
      for (const block of msg.content) {
        if (block && typeof block === "object") {
          const record = block as Record<string, unknown>;
          if (typeof record.text === "string") {
            total += record.text.length;
          }
          if (typeof record.content === "string") {
            total += record.content.length;
          }
          if (typeof record.thinking === "string") {
            total += record.thinking.length;
          }
          if (record.arguments && typeof record.arguments === "object") {
            total += JSON.stringify(record.arguments).length;
          }
        }
      }
    }
    const record = msg as unknown as Record<string, unknown>;
    for (const field of ["command", "output", "summary"] as const) {
      const val = record[field];
      if (typeof val === "string") {
        total += val.length;
      }
    }
  }
  return total;
}

class CompactionPlanningWorkerError extends Error {
  constructor(
    message: string,
    readonly code: "unavailable" | "timeout" | "failed",
  ) {
    super(message);
    this.name = "CompactionPlanningWorkerError";
  }
}

function resolveCompactionPlanningWorkerUrl(currentModuleUrl = import.meta.url): URL {
  const currentPath = fileURLToPath(currentModuleUrl);
  const normalized = currentPath.replaceAll(path.sep, "/");
  const distMarker = "/dist/";
  const distIndex = normalized.lastIndexOf(distMarker);
  if (distIndex >= 0) {
    const distRoot = currentPath.slice(0, distIndex + distMarker.length);
    return pathToFileURL(path.join(distRoot, "agents", "compaction-planning.worker.js"));
  }
  const extension = path.extname(currentPath) || ".js";
  return new URL(`./compaction-planning.worker${extension}`, currentModuleUrl);
}

function runCompactionPlanningWorker(params: {
  input: CompactionPlanningWorkerInput;
  signal?: AbortSignal;
  timeoutMs?: number;
  workerUrl?: URL;
}): Promise<CompactionPlanningWorkerValue> {
  const abortError = () =>
    toErrorObject(
      params.signal?.reason ?? new Error("compaction planning aborted"),
      "Non-Error rejection",
    );
  if (params.signal?.aborted) {
    return Promise.reject(abortError());
  }

  const workerUrl = params.workerUrl ?? resolveCompactionPlanningWorkerUrl();
  const sourceWorkerExecArgv = workerUrl.pathname.endsWith(".ts") ? ["--import", "tsx"] : undefined;
  let worker: Worker;
  try {
    worker = new Worker(workerUrl, {
      workerData: params.input,
      execArgv: sourceWorkerExecArgv,
    });
  } catch (error) {
    return Promise.reject(
      new CompactionPlanningWorkerError(
        error instanceof Error ? error.message : String(error),
        "unavailable",
      ),
    );
  }

  worker.unref?.();

  return new Promise<CompactionPlanningWorkerValue>((resolve, reject) => {
    let settled = false;
    const timeout = setTimeout(
      () =>
        fail(new CompactionPlanningWorkerError("compaction planning worker timed out", "timeout")),
      resolveTimerTimeoutMs(params.timeoutMs, COMPACTION_PLANNING_WORKER_TIMEOUT_MS),
    );
    const abort = () => fail(abortError());

    const settle = (finish: () => void, terminate: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      params.signal?.removeEventListener("abort", abort);
      worker.removeAllListeners();
      if (terminate) {
        void worker.terminate();
      }
      finish();
    };
    const fail = (error: Error, terminate = true) => settle(() => reject(error), terminate);

    params.signal?.addEventListener("abort", abort, { once: true });

    worker.once("message", (message: CompactionPlanningWorkerResult) => {
      settle(() => {
        if (message.status === "ok") {
          resolve(message.value);
          return;
        }
        reject(new CompactionPlanningWorkerError(message.error, "failed"));
      }, false);
    });
    worker.once("error", (error) => {
      const message = error instanceof Error ? error.message : String(error);
      fail(new CompactionPlanningWorkerError(message, "unavailable"));
    });
    worker.once("exit", (code) => {
      if (code === 0) {
        return;
      }
      fail(
        new CompactionPlanningWorkerError(
          `compaction planning worker exited with code ${code}`,
          "unavailable",
        ),
        false,
      );
    });
  });
}

function restoreIndexedMessages(source: AgentMessage[], indexes: number[]): AgentMessage[] {
  return indexes.map((index) => {
    const message = source.at(index);
    if (!Number.isInteger(index) || index < 0 || !message) {
      throw new CompactionPlanningWorkerError(
        "compaction planning result contains an invalid message index",
        "failed",
      );
    }
    return message;
  });
}

// ── Module-level warm pool (Phase 1, 2a reconciled) ──────────────────
// Performs RPC-style persistent thread execution.
let pool: TopicAffineWorkerPool<CompactionPlanningWorkerValue> | null = null;

function resolvePool(): TopicAffineWorkerPool<CompactionPlanningWorkerValue> | null {
  if (process.env.VITEST || process.env.NODE_ENV === "test") {
    return null; // tests use the legacy one-shot path
  }
  if (!pool) {
    const envVal = Number(process.env.OPENCLAW_COMPACTION_POOL_SIZE);
    const poolSize = Number.isInteger(envVal) && envVal > 0 ? envVal : 1;
    pool = new TopicAffineWorkerPool<CompactionPlanningWorkerValue>({
      workerUrl: resolveCompactionPlanningWorkerUrl(),
      poolSize,
      workerData: { mode: "persistent" },
      queueDepth: 32,
      timeoutMs: 60_000,
    });
  }
  return pool;
}

/** Terminate the warm compaction pool (called on shutdown). */
export async function terminateCompactionPlanningPool(): Promise<void> {
  if (pool) {
    await pool.terminateAll();
    pool = null;
  }
}

async function runCompactionPlan<TInput extends CompactionPlanningWorkerInput, TResult>(params: {
  input: TInput;
  signal?: AbortSignal;
  fallback: (messages: AgentMessage[]) => TResult;
  restore: (
    value: Extract<CompactionPlanningWorkerValue, { kind: TInput["kind"] }>,
    messages: AgentMessage[],
  ) => TResult;
}): Promise<TResult> {
  const start = performance.now();
  const messages = sanitizeCompactionMessages(params.input.messages);
  const totalBytes = estimateMessagesBytes(messages);
  const strategy = resolveCompactionStrategy({
    messageCount: messages.length,
    totalBytes,
  });

  if (strategy.mode === "inline") {
    const result = params.fallback(params.input.messages);
    const elapsed = performance.now() - start;
    log.info({
      event: "compaction.plan",
      mode: "inline",
      messages: messages.length,
      totalBytes,
      durationMs: elapsed,
      reason: strategy.reason,
    }, `Compaction strategy: inline (messages: ${messages.length}, bytes: ${totalBytes}, duration: ${elapsed.toFixed(1)}ms)`);
    return result;
  }

  const projectedMessages = projectCompactionMessagesForPlanning(messages);
  const projectedBytes = estimateMessagesBytes(projectedMessages);
  const projectedInput = {
    ...params.input,
    messages: projectedMessages,
  };

  let totalOmittedChars = 0;
  for (const msg of projectedMessages) {
    totalOmittedChars += readCompactionPlanningOmittedChars(msg);
  }

  const activePool = resolvePool();
  try {
    if (!activePool) {
      throw new WorkerPoolError("pool disabled (test mode)", "unavailable");
    }
    const value = await activePool.dispatch("compaction", projectedInput);
    if (value.kind !== params.input.kind) {
      throw new CompactionPlanningWorkerError(
        "unexpected compaction planning worker result",
        "failed",
      );
    }
    const result = params.restore(
      value as Extract<CompactionPlanningWorkerValue, { kind: TInput["kind"] }>,
      messages,
    );
    const elapsed = performance.now() - start;
    log.info({
      event: "compaction.plan",
      mode: "worker",
      pool: "persistent",
      messages: messages.length,
      totalBytes,
      projectedBytes,
      omittedChars: totalOmittedChars,
      durationMs: elapsed,
    }, `Compaction planning offloaded to persistent worker (messages: ${messages.length}, bytes: ${totalBytes} -> ${projectedBytes}, omitted: ${totalOmittedChars}, duration: ${elapsed.toFixed(1)}ms)`);
    return result;
  } catch (error) {
    // Pool unavailable or busy — try the legacy one-shot harness.
    if (
      error instanceof WorkerPoolError &&
      (error.code === "unavailable" || error.code === "busy")
    ) {
      try {
        const value = await runCompactionPlanningWorker({
          input: projectedInput,
          signal: params.signal,
        });
        if (value.kind !== params.input.kind) {
          throw new CompactionPlanningWorkerError(
            "unexpected compaction planning worker result",
            "failed",
          );
        }
        const result = params.restore(
          value as Extract<CompactionPlanningWorkerValue, { kind: TInput["kind"] }>,
          messages,
        );
        const elapsed = performance.now() - start;
        log.info({
          event: "compaction.plan",
          mode: "worker",
          pool: "one-shot-fallback",
          messages: messages.length,
          totalBytes,
          projectedBytes,
          omittedChars: totalOmittedChars,
          durationMs: elapsed,
          poolError: error.code,
        }, `Compaction planning offloaded to one-shot fallback worker (messages: ${messages.length}, bytes: ${totalBytes} -> ${projectedBytes}, duration: ${elapsed.toFixed(1)}ms)`);
        return result;
      } catch (fallbackError) {
        if (
          fallbackError instanceof CompactionPlanningWorkerError &&
          fallbackError.code === "unavailable"
        ) {
          const result = params.fallback(messages);
          const elapsed = performance.now() - start;
          log.warn({
            event: "compaction.plan",
            mode: "inline-fallback",
            messages: messages.length,
            totalBytes,
            durationMs: elapsed,
            error: fallbackError.message,
          }, `Compaction planning worker unavailable, fell back to inline (duration: ${elapsed.toFixed(1)}ms)`);
          return result;
        }
        throw fallbackError;
      }
    }
    // Pool timeout/failed — fall back to inline.
    if (error instanceof WorkerPoolError) {
      const result = params.fallback(messages);
      const elapsed = performance.now() - start;
      log.warn({
        event: "compaction.plan",
        mode: "inline-fallback",
        messages: messages.length,
        totalBytes,
        durationMs: elapsed,
        error: error.message,
      }, `Compaction planning worker failed (${error.code}), fell back to inline (duration: ${elapsed.toFixed(1)}ms)`);
      return result;
    }
    throw error;
  }
}

/** Builds summary chunks, offloading large histories to the planning worker. */
export async function buildSummaryChunksWithWorker(params: {
  messages: AgentMessage[];
  maxChunkTokens: number;
  signal?: AbortSignal;
}): Promise<AgentMessage[][]> {
  const { signal, ...planningInput } = params;
  return runCompactionPlan({
    input: { kind: "summaryChunks", ...planningInput },
    signal,
    fallback: (messages) => buildSummaryChunks({ ...planningInput, messages }),
    restore: (value, messages) =>
      value.chunkIndexes.map((indexes) => restoreIndexedMessages(messages, indexes)),
  });
}

/** Builds an oversized-message fallback plan, using the worker when worthwhile. */
export async function buildOversizedFallbackPlanWithWorker(params: {
  messages: AgentMessage[];
  contextWindow: number;
  signal?: AbortSignal;
}): Promise<OversizedFallbackPlan> {
  const { signal, ...planningInput } = params;
  return runCompactionPlan({
    input: { kind: "oversizedFallback", ...planningInput },
    signal,
    fallback: (messages) => buildOversizedFallbackPlan({ ...planningInput, messages }),
    restore: (value, messages) => ({
      smallMessages: restoreIndexedMessages(messages, value.smallMessageIndexes),
      oversizedNotes: value.oversizedNotes,
    }),
  });
}

/** Builds a staged summarization split plan with worker fallback. */
export async function buildStageSplitPlanWithWorker(params: {
  messages: AgentMessage[];
  maxChunkTokens: number;
  parts?: number;
  minMessagesForSplit?: number;
  signal?: AbortSignal;
}): Promise<StageSplitPlan> {
  const { signal, ...planningInput } = params;
  return runCompactionPlan({
    input: { kind: "stageSplit", ...planningInput },
    signal,
    fallback: (messages) => buildStageSplitPlan({ ...planningInput, messages }),
    restore: (value, messages) =>
      value.mode === "split"
        ? {
            mode: "split",
            chunks: value.chunkIndexes.map((indexes) => restoreIndexedMessages(messages, indexes)),
          }
        : { mode: "single" },
  });
}

/** Computes the adaptive compaction chunk ratio with worker fallback. */
export async function computeAdaptiveChunkRatioWithWorker(params: {
  messages: AgentMessage[];
  contextWindow: number;
  signal?: AbortSignal;
}): Promise<number> {
  const { signal, ...planningInput } = params;
  return runCompactionPlan({
    input: { kind: "adaptiveChunkRatio", ...planningInput },
    signal,
    fallback: () => computeAdaptiveChunkRatio(planningInput.messages, planningInput.contextWindow),
    restore: (value) => value.ratio,
  });
}

const compactionPlanningWorkerTesting = {
  resolveCompactionPlanningWorkerUrl,
  runCompactionPlanningWorker,
};

if (process.env.VITEST || process.env.NODE_ENV === "test") {
  (globalThis as Record<PropertyKey, unknown>)[
    Symbol.for("openclaw.compactionPlanningWorkerTestApi")
  ] = compactionPlanningWorkerTesting;
}
