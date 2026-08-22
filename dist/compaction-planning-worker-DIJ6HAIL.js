import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import { j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import "./errors-D-7D3ZtF.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { c as buildSummaryChunks, f as projectCompactionMessagesForPlanning, l as computeAdaptiveChunkRatio, m as readCompactionPlanningOmittedChars, o as buildOversizedFallbackPlan, p as sanitizeCompactionMessages, s as buildStageSplitPlan } from "./compaction-planning-C-JUoUqc.js";
import { t as hashTopicKey } from "./topic-isolation-policy-CKfDqoAd.js";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { Worker } from "node:worker_threads";
var WorkerPoolError = class extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		this.name = "WorkerPoolError";
	}
};
/**
* A pool of warm worker threads with topic-affinity routing.
*
* @typeParam TValue - The successful response value type from the worker.
*/
var TopicAffineWorkerPool = class {
	constructor(options) {
		this.workers = /* @__PURE__ */ new Map();
		this.seq = 0;
		this.workerUrl = options.workerUrl;
		this.poolSize = Math.max(1, Math.floor(options.poolSize) || 1);
		this.queueDepth = options.queueDepth ?? 4;
		this.timeoutMs = options.timeoutMs ?? 6e4;
		this.workerData = options.workerData;
	}
	/**
	* Dispatch a request to the worker that owns the given topic key.
	*
	* The topic→worker mapping is deterministic (FNV-1a hash), so the same
	* topic always lands on the same worker (session affinity).
	*
	* @throws WorkerPoolError with code "busy" if the worker's queue is full.
	*
	* @param transferList Optional transfer list for `postMessage` (e.g. MessagePort).
	*   Transferable objects are moved (not cloned) to the worker.
	*/
	async dispatch(topicKey, input, transferList) {
		const workerIndex = hashTopicKey(topicKey) % this.poolSize;
		const entry = this.getOrCreateWorker(workerIndex);
		if (entry.queueDepth >= this.queueDepth) throw new WorkerPoolError(`worker-${workerIndex} queue full (${entry.queueDepth}/${this.queueDepth})`, "busy");
		const seq = ++this.seq;
		entry.queueDepth++;
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				entry.pending.delete(seq);
				entry.queueDepth--;
				reject(new WorkerPoolError(`request timed out on worker-${workerIndex}`, "timeout"));
			}, this.timeoutMs);
			entry.pending.set(seq, {
				resolve,
				reject,
				timer
			});
			entry.worker.postMessage({
				seq,
				input
			}, transferList ?? []);
		});
	}
	/** Terminate all workers and reject all pending requests. */
	async terminateAll() {
		const entries = [...this.workers.values()];
		this.workers.clear();
		for (const entry of entries) {
			this.failAllPending(entry, new WorkerPoolError("pool terminated", "unavailable"));
			await entry.worker.terminate();
		}
	}
	getOrCreateWorker(index) {
		let entry = this.workers.get(index);
		if (entry) return entry;
		const sourceWorkerExecArgv = this.workerUrl.pathname.endsWith(".ts") ? ["--import", "tsx"] : void 0;
		const worker = new Worker(this.workerUrl, {
			...this.workerData !== void 0 ? { workerData: this.workerData } : {},
			execArgv: sourceWorkerExecArgv
		});
		worker.unref?.();
		entry = {
			worker,
			pending: /* @__PURE__ */ new Map(),
			queueDepth: 0
		};
		this.workers.set(index, entry);
		worker.on("message", (msg) => {
			const request = entry.pending.get(msg.seq);
			if (!request) return;
			entry.pending.delete(msg.seq);
			entry.queueDepth--;
			clearTimeout(request.timer);
			if (msg.status === "ok" && msg.value !== void 0) request.resolve(msg.value);
			else request.reject(new WorkerPoolError(msg.error ?? "unknown error", "failed"));
		});
		worker.on("error", (error) => {
			this.failAllPending(entry, new WorkerPoolError(error instanceof Error ? error.message : String(error), "unavailable"));
			this.workers.delete(index);
		});
		worker.on("exit", (code) => {
			if (code !== 0) this.failAllPending(entry, new WorkerPoolError(`worker-${index} exited with code ${code}`, "unavailable"));
			this.workers.delete(index);
		});
		return entry;
	}
	failAllPending(entry, error) {
		for (const { reject, timer } of entry.pending.values()) {
			clearTimeout(timer);
			reject(error);
		}
		entry.pending.clear();
		entry.queueDepth = 0;
	}
	/** The number of workers currently alive. */
	get aliveCount() {
		return this.workers.size;
	}
};
/**
* The default minimum byte/character count that triggers worker offload.
* Offloads small message count histories that contain massive payloads.
*/
const DEFAULT_MIN_BYTES_FOR_COMPACTION_WORKER = 128 * 1024;
/**
* Resolve the effective minimum-message threshold for worker offload.
*
* Pure — reads from context + default, not from process.env. Clamps to a
* non-negative integer.
*
* @example
*   resolveCompactionWorkerThreshold({})                         // → 64
*   resolveCompactionWorkerThreshold({ minMessagesForWorker: 32 }) // → 32
*   resolveCompactionWorkerThreshold({ minMessagesForWorker: -1 }) // → 0
*/
function resolveCompactionWorkerThreshold(context = {}) {
	const raw = context.minMessagesForWorker;
	if (typeof raw === "number" && Number.isFinite(raw)) return Math.max(0, Math.floor(raw));
	return 64;
}
/**
* Resolve the effective minimum-byte threshold for worker offload.
*/
function resolveCompactionByteThreshold(context = {}) {
	const raw = context.minBytesForWorker;
	if (typeof raw === "number" && Number.isFinite(raw)) return Math.max(0, Math.floor(raw));
	return DEFAULT_MIN_BYTES_FOR_COMPACTION_WORKER;
}
/**
* Decide whether compaction planning should run inline or on a worker.
*
* Policy:
*   - workerUnavailable → inline (can't offload)
*   - messageCount < threshold AND totalBytes < byteThreshold → inline
*   - messageCount >= threshold OR totalBytes >= byteThreshold → worker
*/
function resolveCompactionStrategy(context) {
	const threshold = resolveCompactionWorkerThreshold(context);
	const byteThreshold = resolveCompactionByteThreshold(context);
	const totalBytes = context.totalBytes ?? 0;
	if (context.messageCount <= 0) return {
		mode: "inline",
		threshold,
		reason: `messageCount ${context.messageCount} <= 0; nothing to plan, runs inline`
	};
	if (context.workerUnavailable) return {
		mode: "inline",
		threshold,
		reason: "worker_threads unavailable; planning runs inline"
	};
	const exceedsCount = context.messageCount >= threshold;
	const exceedsBytes = totalBytes >= byteThreshold;
	if (exceedsCount || exceedsBytes) return {
		mode: "worker",
		threshold,
		reason: exceedsBytes ? `totalBytes ${totalBytes} >= threshold ${byteThreshold}; offload CPU-bound planning to worker` : `messageCount ${context.messageCount} >= threshold ${threshold}; offload CPU-bound planning to worker`
	};
	return {
		mode: "inline",
		threshold,
		reason: `messageCount ${context.messageCount} < threshold ${threshold} and totalBytes ${totalBytes} < threshold ${byteThreshold}; worker startup not worth it`
	};
}
//#endregion
//#region src/agents/compaction-planning-worker.ts
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
const COMPACTION_PLANNING_WORKER_TIMEOUT_MS = 6e4;
const log = createSubsystemLogger("compaction");
function estimateMessagesBytes(messages) {
	let total = 0;
	for (const msg of messages) {
		if (typeof msg.content === "string") total += msg.content.length;
		else if (Array.isArray(msg.content)) {
			for (const block of msg.content) if (block && typeof block === "object") {
				const record = block;
				if (typeof record.text === "string") total += record.text.length;
				if (typeof record.content === "string") total += record.content.length;
				if (typeof record.thinking === "string") total += record.thinking.length;
				if (record.arguments && typeof record.arguments === "object") total += JSON.stringify(record.arguments).length;
			}
		}
		const record = msg;
		for (const field of [
			"command",
			"output",
			"summary"
		]) {
			const val = record[field];
			if (typeof val === "string") total += val.length;
		}
	}
	return total;
}
var CompactionPlanningWorkerError = class extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		this.name = "CompactionPlanningWorkerError";
	}
};
function resolveCompactionPlanningWorkerUrl(currentModuleUrl = import.meta.url) {
	const currentPath = fileURLToPath(currentModuleUrl);
	const distIndex = currentPath.replaceAll(path.sep, "/").lastIndexOf("/dist/");
	if (distIndex >= 0) {
		const distRoot = currentPath.slice(0, distIndex + 6);
		return pathToFileURL(path.join(distRoot, "agents", "compaction-planning.worker.js"));
	}
	const extension = path.extname(currentPath) || ".js";
	return new URL(`./compaction-planning.worker${extension}`, currentModuleUrl);
}
function runCompactionPlanningWorker(params) {
	const abortError = () => toErrorObject(params.signal?.reason ?? /* @__PURE__ */ new Error("compaction planning aborted"), "Non-Error rejection");
	if (params.signal?.aborted) return Promise.reject(abortError());
	const workerUrl = params.workerUrl ?? resolveCompactionPlanningWorkerUrl();
	const sourceWorkerExecArgv = workerUrl.pathname.endsWith(".ts") ? ["--import", "tsx"] : void 0;
	let worker;
	try {
		worker = new Worker(workerUrl, {
			workerData: params.input,
			execArgv: sourceWorkerExecArgv
		});
	} catch (error) {
		return Promise.reject(new CompactionPlanningWorkerError(error instanceof Error ? error.message : String(error), "unavailable"));
	}
	worker.unref?.();
	return new Promise((resolve, reject) => {
		let settled = false;
		const timeout = setTimeout(() => fail(new CompactionPlanningWorkerError("compaction planning worker timed out", "timeout")), resolveTimerTimeoutMs(params.timeoutMs, COMPACTION_PLANNING_WORKER_TIMEOUT_MS));
		const abort = () => fail(abortError());
		const settle = (finish, terminate) => {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			params.signal?.removeEventListener("abort", abort);
			worker.removeAllListeners();
			if (terminate) worker.terminate();
			finish();
		};
		const fail = (error, terminate = true) => settle(() => reject(error), terminate);
		params.signal?.addEventListener("abort", abort, { once: true });
		worker.once("message", (message) => {
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
			if (code === 0) return;
			fail(new CompactionPlanningWorkerError(`compaction planning worker exited with code ${code}`, "unavailable"), false);
		});
	});
}
function restoreIndexedMessages(source, indexes) {
	return indexes.map((index) => {
		const message = source.at(index);
		if (!Number.isInteger(index) || index < 0 || !message) throw new CompactionPlanningWorkerError("compaction planning result contains an invalid message index", "failed");
		return message;
	});
}
let pool = null;
function resolvePool() {
	if (process.env.VITEST || false) return null;
	if (!pool) {
		const envVal = Number(process.env.OPENCLAW_COMPACTION_POOL_SIZE);
		const poolSize = Number.isInteger(envVal) && envVal > 0 ? envVal : 1;
		pool = new TopicAffineWorkerPool({
			workerUrl: resolveCompactionPlanningWorkerUrl(),
			poolSize,
			workerData: { mode: "persistent" },
			queueDepth: 32,
			timeoutMs: 6e4
		});
	}
	return pool;
}
/** Terminate the warm compaction pool (called on shutdown). */
async function terminateCompactionPlanningPool() {
	if (pool) {
		await pool.terminateAll();
		pool = null;
	}
}
async function runCompactionPlan(params) {
	const start = performance.now();
	const messages = sanitizeCompactionMessages(params.input.messages);
	const totalBytes = estimateMessagesBytes(messages);
	const strategy = resolveCompactionStrategy({
		messageCount: messages.length,
		totalBytes
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
			reason: strategy.reason
		}, `Compaction strategy: inline (messages: ${messages.length}, bytes: ${totalBytes}, duration: ${elapsed.toFixed(1)}ms)`);
		return result;
	}
	const projectedMessages = projectCompactionMessagesForPlanning(messages);
	const projectedBytes = estimateMessagesBytes(projectedMessages);
	const projectedInput = {
		...params.input,
		messages: projectedMessages
	};
	let totalOmittedChars = 0;
	for (const msg of projectedMessages) totalOmittedChars += readCompactionPlanningOmittedChars(msg);
	const activePool = resolvePool();
	try {
		if (!activePool) throw new WorkerPoolError("pool disabled (test mode)", "unavailable");
		const value = await activePool.dispatch("compaction", projectedInput);
		if (value.kind !== params.input.kind) throw new CompactionPlanningWorkerError("unexpected compaction planning worker result", "failed");
		const result = params.restore(value, messages);
		const elapsed = performance.now() - start;
		log.info({
			event: "compaction.plan",
			mode: "worker",
			pool: "persistent",
			messages: messages.length,
			totalBytes,
			projectedBytes,
			omittedChars: totalOmittedChars,
			durationMs: elapsed
		}, `Compaction planning offloaded to persistent worker (messages: ${messages.length}, bytes: ${totalBytes} -> ${projectedBytes}, omitted: ${totalOmittedChars}, duration: ${elapsed.toFixed(1)}ms)`);
		return result;
	} catch (error) {
		if (error instanceof WorkerPoolError && (error.code === "unavailable" || error.code === "busy")) try {
			const value = await runCompactionPlanningWorker({
				input: projectedInput,
				signal: params.signal
			});
			if (value.kind !== params.input.kind) throw new CompactionPlanningWorkerError("unexpected compaction planning worker result", "failed");
			const result = params.restore(value, messages);
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
				poolError: error.code
			}, `Compaction planning offloaded to one-shot fallback worker (messages: ${messages.length}, bytes: ${totalBytes} -> ${projectedBytes}, duration: ${elapsed.toFixed(1)}ms)`);
			return result;
		} catch (fallbackError) {
			if (fallbackError instanceof CompactionPlanningWorkerError && fallbackError.code === "unavailable") {
				const result = params.fallback(messages);
				const elapsed = performance.now() - start;
				log.warn({
					event: "compaction.plan",
					mode: "inline-fallback",
					messages: messages.length,
					totalBytes,
					durationMs: elapsed,
					error: fallbackError.message
				}, `Compaction planning worker unavailable, fell back to inline (duration: ${elapsed.toFixed(1)}ms)`);
				return result;
			}
			throw fallbackError;
		}
		if (error instanceof WorkerPoolError) {
			const result = params.fallback(messages);
			const elapsed = performance.now() - start;
			log.warn({
				event: "compaction.plan",
				mode: "inline-fallback",
				messages: messages.length,
				totalBytes,
				durationMs: elapsed,
				error: error.message
			}, `Compaction planning worker failed (${error.code}), fell back to inline (duration: ${elapsed.toFixed(1)}ms)`);
			return result;
		}
		throw error;
	}
}
/** Builds summary chunks, offloading large histories to the planning worker. */
async function buildSummaryChunksWithWorker(params) {
	const { signal, ...planningInput } = params;
	return runCompactionPlan({
		input: {
			kind: "summaryChunks",
			...planningInput
		},
		signal,
		fallback: (messages) => buildSummaryChunks({
			...planningInput,
			messages
		}),
		restore: (value, messages) => value.chunkIndexes.map((indexes) => restoreIndexedMessages(messages, indexes))
	});
}
/** Builds an oversized-message fallback plan, using the worker when worthwhile. */
async function buildOversizedFallbackPlanWithWorker(params) {
	const { signal, ...planningInput } = params;
	return runCompactionPlan({
		input: {
			kind: "oversizedFallback",
			...planningInput
		},
		signal,
		fallback: (messages) => buildOversizedFallbackPlan({
			...planningInput,
			messages
		}),
		restore: (value, messages) => ({
			smallMessages: restoreIndexedMessages(messages, value.smallMessageIndexes),
			oversizedNotes: value.oversizedNotes
		})
	});
}
/** Builds a staged summarization split plan with worker fallback. */
async function buildStageSplitPlanWithWorker(params) {
	const { signal, ...planningInput } = params;
	return runCompactionPlan({
		input: {
			kind: "stageSplit",
			...planningInput
		},
		signal,
		fallback: (messages) => buildStageSplitPlan({
			...planningInput,
			messages
		}),
		restore: (value, messages) => value.mode === "split" ? {
			mode: "split",
			chunks: value.chunkIndexes.map((indexes) => restoreIndexedMessages(messages, indexes))
		} : { mode: "single" }
	});
}
/** Computes the adaptive compaction chunk ratio with worker fallback. */
async function computeAdaptiveChunkRatioWithWorker(params) {
	const { signal, ...planningInput } = params;
	return runCompactionPlan({
		input: {
			kind: "adaptiveChunkRatio",
			...planningInput
		},
		signal,
		fallback: () => computeAdaptiveChunkRatio(planningInput.messages, planningInput.contextWindow),
		restore: (value) => value.ratio
	});
}
const compactionPlanningWorkerTesting = {
	resolveCompactionPlanningWorkerUrl,
	runCompactionPlanningWorker
};
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.compactionPlanningWorkerTestApi")] = compactionPlanningWorkerTesting;
//#endregion
export { terminateCompactionPlanningPool as a, computeAdaptiveChunkRatioWithWorker as i, buildStageSplitPlanWithWorker as n, TopicAffineWorkerPool as o, buildSummaryChunksWithWorker as r, WorkerPoolError as s, buildOversizedFallbackPlanWithWorker as t };
