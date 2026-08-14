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
// Lazily created on first use, reused across all subsequent turns.
// Uses the generic TopicAffineWorkerPool with poolSize: 1 (single worker,
// no sharding).  workerData: { mode: "persistent" } puts the compaction
// worker into RPC mode (listen on parentPort for { seq, input } requests).
//
// Falls back to the legacy spawn-per-call harness if the pool worker fails,
// then to inline planning if the worker is truly unavailable.
//
// Disabled in test mode: vitest + worker_threads + tsx is finicky, and the
// test API exercises the legacy one-shot path directly. The pool is a
// production optimization; tests use the deterministic one-shot harness.
let pool: TopicAffineWorkerPool<CompactionPlanningWorkerValue> | null = null;

function resolvePool(): TopicAffineWorkerPool<CompactionPlanningWorkerValue> | null {
  if (process.env.VITEST || process.env.NODE_ENV === "test") {
    return null; // tests use the legacy one-shot path
  }
  if (!pool) {
    pool = new TopicAffineWorkerPool<CompactionPlanningWorkerValue>({
      workerUrl: resolveCompactionPlanningWorkerUrl(),
      poolSize: 1,
      workerData: { mode: "persistent" },
      // High queue depth: compaction is per-session and sessions are serialized
      // by the lane controller, so concurrent compaction requests are rare.
      // A high depth prevents "busy" rejections while still bounding memory.
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
  const messages = sanitizeCompactionMessages(params.input.messages);
  // ── Core mod #3: async compaction scheduler ─────────────────────────
  // The inline-vs-worker decision is extracted to compaction-scheduler.ts
  // (foundry-gateable). Below the threshold, inline planning is faster than
  // worker startup; at/above the threshold, offload CPU-bound planning to
  // keep the main event loop responsive.
  // See src/agents/embedded-agent-runner/compaction-scheduler.ts.
  const strategy = resolveCompactionStrategy({ messageCount: messages.length });
  if (strategy.mode === "inline") {
    return params.fallback(params.input.messages);
  }

  const projectedInput = {
    ...params.input,
    messages: projectCompactionMessagesForPlanning(messages),
  };

  // ── Phase 1: try the warm pool first ────────────────────────────────
  // Falls back to the legacy spawn-per-call harness on pool failure, then
  // to inline planning if the worker is truly unavailable.
  //
  // 2a: the pool is now a TopicAffineWorkerPool (generic).  Error codes:
  //   "unavailable" / "busy" → try the legacy one-shot harness
  //   "timeout" / "failed"   → fall back to inline planning
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
    return params.restore(
      value as Extract<CompactionPlanningWorkerValue, { kind: TInput["kind"] }>,
      messages,
    );
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
        return params.restore(
          value as Extract<CompactionPlanningWorkerValue, { kind: TInput["kind"] }>,
          messages,
        );
      } catch (fallbackError) {
        if (
          fallbackError instanceof CompactionPlanningWorkerError &&
          fallbackError.code === "unavailable"
        ) {
          return params.fallback(messages);
        }
        throw fallbackError;
      }
    }
    // Pool timeout/failed — fall back to inline.
    if (error instanceof WorkerPoolError) {
      return params.fallback(messages);
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
