import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import { t as stableHomebrewNodePathCandidates } from "./stable-node-path-dXOexVJv.js";
import "./embedding-defaults-BP3wPc9o.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { fork } from "node:child_process";
//#region packages/memory-host-sdk/src/host/embedding-worker-errors.ts
/** Stable error codes emitted by the local embedding worker supervisor. */
const LOCAL_EMBEDDING_WORKER_ERROR_CODES = {
	exited: "LOCAL_EMBEDDING_WORKER_EXITED",
	processError: "LOCAL_EMBEDDING_WORKER_PROCESS_ERROR",
	ipcError: "LOCAL_EMBEDDING_WORKER_IPC_ERROR"
};
/** Create a local embedding worker failure with stable metadata fields. */
function createLocalEmbeddingWorkerFailureError(params) {
	return Object.assign(new Error(params.message), {
		code: params.code,
		reason: params.reason,
		...params.exitCode !== void 0 ? { exitCode: params.exitCode } : {},
		...params.signal !== void 0 ? { signal: params.signal } : {},
		...params.cause !== void 0 ? { cause: params.cause } : {}
	});
}
//#endregion
//#region packages/memory-host-sdk/src/host/local-embedding-runtime-facts.ts
const LOCAL_EMBEDDING_RUNTIME_FACTS = Symbol.for("openclaw.localEmbeddingRuntimeFacts");
function attachLocalEmbeddingRuntimeFacts(target, getFacts) {
	Object.defineProperty(target, LOCAL_EMBEDDING_RUNTIME_FACTS, {
		configurable: false,
		enumerable: false,
		value: getFacts,
		writable: false
	});
}
function getLocalEmbeddingRuntimeFacts(target) {
	if (!target) return;
	const getFacts = Reflect.get(target, LOCAL_EMBEDDING_RUNTIME_FACTS);
	return typeof getFacts === "function" ? getFacts() : void 0;
}
//#endregion
//#region packages/memory-host-sdk/src/host/embeddings-worker.ts
/** Resolve the worker child script for source, package, and bundled runtime layouts. */
function resolveDefaultWorkerScriptPath() {
	const currentPath = fileURLToPath(import.meta.url);
	const extension = path.extname(currentPath);
	const currentName = path.basename(currentPath);
	const sibling = extension === ".ts" ? "embeddings-worker-child.ts" : currentName.startsWith("embeddings-worker.") ? "embeddings-worker-child.js" : "memory-core-local-embedding-worker.js";
	return path.join(path.dirname(currentPath), sibling);
}
/** Keep only local embedding options that are safe and necessary to send over IPC. */
function serializeLocalEmbeddingOptions(options, runtimeOptions) {
	return {
		config: {},
		provider: "local",
		model: options.model,
		fallback: "none",
		outputDimensionality: options.outputDimensionality,
		local: {
			...options.local,
			...runtimeOptions?.nodeLlamaCppImportUrl ? { nodeLlamaCppImportUrl: runtimeOptions.nodeLlamaCppImportUrl } : {}
		}
	};
}
/** Create a typed failure for unexpected worker process exits. */
function createWorkerExitError(code, signal) {
	return createLocalEmbeddingWorkerFailureError({
		message: `Local embedding worker exited unexpectedly (${signal ? `signal ${signal}` : `exit code ${code ?? "unknown"}`})`,
		code: LOCAL_EMBEDDING_WORKER_ERROR_CODES.exited,
		reason: signal ? "signal" : "exit",
		exitCode: code,
		signal
	});
}
function createWorkerShutdownError() {
	return createLocalEmbeddingWorkerFailureError({
		message: "Local embedding worker exited unexpectedly (shutdown)",
		code: LOCAL_EMBEDDING_WORKER_ERROR_CODES.exited,
		reason: "exit"
	});
}
/** Convert worker response errors into Error objects while preserving worker error codes. */
function createWorkerResponseError(error) {
	if (typeof error.error === "object" && error.error) {
		const message = error.error.message || "Local embedding worker failed";
		const workerError = new Error(message);
		if (error.error.code) workerError.code = error.error.code;
		return workerError;
	}
	return new Error(error.error || "Local embedding worker failed");
}
const WORKER_UNSAFE_EXEC_ARGV_FLAGS = /* @__PURE__ */ new Set(["--inspect", "--inspect-brk"]);
const WORKER_UNSAFE_EXEC_ARGV_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
	"--eval",
	"-e",
	"--print",
	"-p",
	"--input-type",
	"--inspect-port"
]);
const WORKER_UNSAFE_EXEC_ARGV_OPTION_PREFIXES = [
	"--eval=",
	"--print=",
	"--input-type=",
	"--inspect=",
	"--inspect-brk=",
	"--inspect-port="
];
const WORKER_CLOSE_GRACE_MS = 250;
/** Wait for a confirmed terminal child event while remembering process errors. */
async function waitForWorkerTermination(child, timeoutMs) {
	if (child.exitCode !== null || child.signalCode !== null) return { terminated: true };
	return await new Promise((resolve) => {
		let processError;
		const cleanup = () => {
			child.off("exit", onTerminated);
			child.off("close", onTerminated);
			child.off("error", onError);
			clearTimeout(timeout);
		};
		const settle = (result) => {
			cleanup();
			resolve(result);
		};
		const onTerminated = () => settle({ terminated: true });
		const onError = (err) => {
			processError ??= err;
		};
		child.once("exit", onTerminated);
		child.once("close", onTerminated);
		child.on("error", onError);
		const timeout = setTimeout(() => settle({
			terminated: false,
			error: processError
		}), timeoutMs);
		timeout.unref?.();
	});
}
/** Send a worker signal without letting synchronous or reported failures hang shutdown. */
function signalWorker(child, signal) {
	try {
		if (!child.kill(signal)) return /* @__PURE__ */ new Error(`Failed to send ${signal} to local embedding worker`);
	} catch (err) {
		return err;
	}
}
/** Drop execArgv flags that would make forked workers debug/eval stateful or unsafe. */
function resolveWorkerExecArgv() {
	const args = [];
	let skipNext = false;
	for (const arg of process.execArgv) {
		if (skipNext) {
			skipNext = false;
			continue;
		}
		if (WORKER_UNSAFE_EXEC_ARGV_FLAGS.has(arg)) continue;
		if (WORKER_UNSAFE_EXEC_ARGV_FLAGS_WITH_VALUE.has(arg)) {
			skipNext = true;
			continue;
		}
		if (WORKER_UNSAFE_EXEC_ARGV_OPTION_PREFIXES.some((prefix) => arg.startsWith(prefix))) continue;
		args.push(arg);
	}
	return args;
}
async function resolveWorkerExecPath(nodePath) {
	for (const candidate of stableHomebrewNodePathCandidates(nodePath)) try {
		await fs.access(candidate);
		return candidate;
	} catch {}
	return nodePath;
}
/** IPC client that serializes local embedding calls through one child process. */
var LocalEmbeddingWorkerClient = class {
	constructor(scriptPath, execPath) {
		this.scriptPath = scriptPath;
		this.execPath = execPath;
		this.child = null;
		this.closed = false;
		this.shutdownPromise = null;
		this.requestTail = Promise.resolve();
		this.nextRequestId = 1;
		this.pending = /* @__PURE__ */ new Map();
	}
	/** Start or reuse the child worker and initialize its provider. */
	async initialize(options) {
		await this.send({
			type: "initialize",
			options
		});
	}
	/** Request one query embedding from the child worker. */
	async embedQuery(options, text, callOptions) {
		const result = await this.enqueueRequest({
			type: "embedQuery",
			options,
			text
		}, callOptions);
		return Array.isArray(result) ? result : [];
	}
	/** Request a batch of embeddings from the child worker. */
	async embedBatch(options, texts, callOptions) {
		const result = await this.enqueueRequest({
			type: "embedBatch",
			options,
			texts
		}, callOptions);
		return Array.isArray(result) ? result : [];
	}
	getRuntimeFacts() {
		return this.lastRuntimeFacts;
	}
	/** Ask the child to close gracefully, then force shutdown after a short grace period. */
	async close() {
		if (this.closed) {
			await this.shutdownPromise;
			if (this.child) await this.shutdownChild();
			return;
		}
		this.closed = true;
		if (this.shutdownPromise) {
			await this.shutdownPromise;
			return;
		}
		const child = this.child;
		if (!child) return;
		if (!child.connected) {
			await this.shutdownChild();
			return;
		}
		let timeout;
		const closeRequest = this.send({ type: "close" }, void 0, true).then(() => "closed");
		const closeTimeout = new Promise((resolve) => {
			timeout = setTimeout(() => resolve("timeout"), WORKER_CLOSE_GRACE_MS);
			timeout.unref?.();
		});
		let gracefulCloseError;
		try {
			if (await Promise.race([closeRequest, closeTimeout]) === "timeout") closeRequest.catch(() => {});
		} catch (err) {
			gracefulCloseError = err;
		} finally {
			if (timeout) clearTimeout(timeout);
			await this.shutdownChild();
		}
		if (gracefulCloseError) process.emitWarning(toErrorObject(gracefulCloseError, "Local embedding worker graceful close failed"), { code: "LOCAL_EMBEDDING_WORKER_CLOSE" });
	}
	/** Ensure the child process exists and has lifecycle failure handlers installed. */
	ensureChild() {
		const current = this.child;
		if (current) {
			if (current.connected) return current;
			if (current.exitCode === null && current.signalCode === null) throw new Error("Local embedding worker IPC disconnected before process termination");
			this.child = null;
		}
		const child = fork(this.scriptPath, [], {
			execPath: this.execPath,
			execArgv: resolveWorkerExecArgv(),
			serialization: "json",
			stdio: [
				"ignore",
				"ignore",
				"ignore",
				"ipc"
			]
		});
		child.on("message", (message) => this.handleMessage(message));
		child.on("exit", (code, signal) => {
			if (this.child === child) this.child = null;
			this.rejectPending(createWorkerExitError(code, signal));
		});
		child.on("close", () => {
			if (this.child === child) this.child = null;
		});
		child.on("error", (err) => {
			this.rejectPending(createLocalEmbeddingWorkerFailureError({
				message: `Local embedding worker process failed: ${err.message}`,
				code: LOCAL_EMBEDDING_WORKER_ERROR_CODES.processError,
				reason: "process-error",
				cause: err
			}));
		});
		this.child = child;
		return child;
	}
	/** Serialize native work without letting a queued cancellation kill the active child. */
	async enqueueRequest(request, options) {
		const signal = options?.signal;
		signal?.throwIfAborted();
		const queuedDuringShutdown = this.shutdownPromise !== null;
		const operation = this.requestTail.then(async () => {
			signal?.throwIfAborted();
			if (this.closed && !queuedDuringShutdown) throw createWorkerShutdownError();
			return await this.send(request, options);
		});
		this.requestTail = operation.then(() => void 0, () => void 0);
		if (!signal) return await operation;
		return await new Promise((resolve, reject) => {
			const abort = () => {
				reject(toErrorObject(signal.reason ?? /* @__PURE__ */ new Error("Local embedding request aborted"), "Non-Error rejection"));
			};
			signal.addEventListener("abort", abort, { once: true });
			operation.then((value) => {
				signal.removeEventListener("abort", abort);
				resolve(value);
			}, (error) => {
				signal.removeEventListener("abort", abort);
				reject(toErrorObject(error, "Local embedding request failed"));
			});
		});
	}
	/** Send one request over IPC and bind its abort signal to child shutdown. */
	async send(request, options, allowClosed = false) {
		while (this.shutdownPromise) await this.shutdownPromise;
		if (this.child && !this.child.connected) await this.shutdownChild();
		if (this.closed && !allowClosed) throw new Error("Local embedding worker client has been closed");
		options?.signal?.throwIfAborted();
		const child = this.ensureChild();
		const id = this.nextRequestId++;
		const payload = {
			...request,
			id
		};
		return await new Promise((resolve, reject) => {
			const pending = {
				resolve,
				reject
			};
			if (options?.signal) {
				const abort = () => {
					this.pending.delete(id);
					this.shutdownChild();
					reject(toErrorObject(options.signal?.reason ?? /* @__PURE__ */ new Error("Local embedding request aborted"), "Non-Error rejection"));
				};
				options.signal.addEventListener("abort", abort, { once: true });
				pending.abort = () => options.signal?.removeEventListener("abort", abort);
			}
			this.pending.set(id, pending);
			child.send(payload, (err) => {
				if (err) {
					this.pending.delete(id);
					pending.abort?.();
					reject(createLocalEmbeddingWorkerFailureError({
						message: `Local embedding worker IPC failed: ${err.message}`,
						code: LOCAL_EMBEDDING_WORKER_ERROR_CODES.ipcError,
						reason: "ipc",
						cause: err
					}));
				}
			});
		});
	}
	/** Route one worker response to the matching pending request. */
	handleMessage(message) {
		const response = message;
		if (typeof response.id !== "number") return;
		if (response.runtimeFacts) this.lastRuntimeFacts = response.runtimeFacts;
		const pending = this.pending.get(response.id);
		if (!pending) return;
		this.pending.delete(response.id);
		pending.abort?.();
		if (response.ok) {
			pending.resolve(response.value);
			return;
		}
		pending.reject(createWorkerResponseError(response));
	}
	/** Disconnect and kill the current child process if it is still alive. */
	shutdownChild() {
		if (this.shutdownPromise) return this.shutdownPromise;
		const child = this.child;
		if (!child) return Promise.resolve();
		const shutdown = this.stopChild(child).then(() => {
			if (this.child === child) this.child = null;
		}, (err) => {
			this.closed = true;
			throw err;
		});
		this.shutdownPromise = shutdown;
		const clearShutdown = () => {
			if (this.shutdownPromise === shutdown) this.shutdownPromise = null;
		};
		shutdown.then(clearShutdown, clearShutdown);
		return shutdown;
	}
	async stopChild(child) {
		this.rejectPending(createWorkerShutdownError());
		if (child.connected) child.disconnect();
		if (child.exitCode !== null || child.signalCode !== null) return;
		const gracefulWait = waitForWorkerTermination(child, WORKER_CLOSE_GRACE_MS);
		const gracefulSignalError = signalWorker(child, "SIGTERM");
		const gracefulResult = await gracefulWait;
		if (gracefulResult.terminated) return;
		const forcedWait = waitForWorkerTermination(child, WORKER_CLOSE_GRACE_MS);
		const forcedSignalError = signalWorker(child, "SIGKILL");
		const forcedResult = await forcedWait;
		if (forcedResult.terminated) return;
		throw createLocalEmbeddingWorkerFailureError({
			message: "Local embedding worker did not exit after SIGKILL",
			code: LOCAL_EMBEDDING_WORKER_ERROR_CODES.processError,
			reason: "process-error",
			cause: forcedResult.error ?? forcedSignalError ?? gracefulResult.error ?? gracefulSignalError
		});
	}
	/** Reject all pending requests after child process failure. */
	rejectPending(err) {
		const pending = [...this.pending.values()];
		this.pending.clear();
		for (const entry of pending) {
			entry.abort?.();
			entry.reject(err);
		}
	}
};
const RETAINED_WORKER_CLIENTS = /* @__PURE__ */ new Set();
const RETAINED_WORKER_DRAIN_RETRY_MS = 1e3;
let workerProviderCreationTail = Promise.resolve();
let retainedWorkerDrainPromise = null;
let retainedWorkerDrainTimer = null;
async function drainRetainedWorkerClientsNow() {
	let firstError;
	let closeFailed = false;
	for (const client of RETAINED_WORKER_CLIENTS) try {
		await client.close();
		RETAINED_WORKER_CLIENTS.delete(client);
	} catch (err) {
		if (!closeFailed) firstError = err;
		closeFailed = true;
	}
	if (closeFailed) throw firstError;
}
function scheduleRetainedWorkerDrain() {
	if (RETAINED_WORKER_CLIENTS.size === 0 || retainedWorkerDrainTimer) return;
	retainedWorkerDrainTimer = setTimeout(() => {
		retainedWorkerDrainTimer = null;
		drainRetainedWorkerClients().catch(() => {});
	}, RETAINED_WORKER_DRAIN_RETRY_MS);
	retainedWorkerDrainTimer.unref?.();
}
async function drainRetainedWorkerClients() {
	if (retainedWorkerDrainPromise) return await retainedWorkerDrainPromise;
	if (retainedWorkerDrainTimer) {
		clearTimeout(retainedWorkerDrainTimer);
		retainedWorkerDrainTimer = null;
	}
	const drain = drainRetainedWorkerClientsNow();
	retainedWorkerDrainPromise = drain;
	const settle = () => {
		if (retainedWorkerDrainPromise === drain) retainedWorkerDrainPromise = null;
		scheduleRetainedWorkerDrain();
	};
	drain.then(settle, settle);
	return await drain;
}
/** Waits for provider creation to settle, then closes every retained worker client. */
async function drainRetainedLocalEmbeddingWorkerClients() {
	await workerProviderCreationTail;
	await drainRetainedWorkerClients();
}
/** Create the public local embedding provider backed by the child worker client. */
async function createLocalEmbeddingWorkerProvider(options, runtimeOptions) {
	const create = async () => {
		await drainRetainedWorkerClients();
		return await createLocalEmbeddingWorkerProviderOnce(options, runtimeOptions);
	};
	const creation = workerProviderCreationTail.then(create, create);
	workerProviderCreationTail = creation.then(() => void 0, () => void 0);
	return await creation;
}
async function createLocalEmbeddingWorkerProviderOnce(options, runtimeOptions) {
	const modelPath = normalizeOptionalString(options.local?.modelPath) || "hf:ggml-org/embeddinggemma-300m-qat-q8_0-GGUF/embeddinggemma-300m-qat-Q8_0.gguf";
	const workerOptions = serializeLocalEmbeddingOptions(options, runtimeOptions);
	const workerExecPath = await resolveWorkerExecPath(process.execPath);
	const client = new LocalEmbeddingWorkerClient(runtimeOptions?.workerScriptPath ?? resolveDefaultWorkerScriptPath(), workerExecPath);
	try {
		await client.initialize(workerOptions);
	} catch (err) {
		try {
			await client.close();
		} catch {
			RETAINED_WORKER_CLIENTS.add(client);
			scheduleRetainedWorkerDrain();
		}
		throw err;
	}
	let closed = false;
	let closePromise = null;
	const throwIfClosed = () => {
		if (closed) throw new Error("Local embedding provider has been closed");
	};
	const provider = {
		id: "local",
		model: modelPath,
		embedQuery: async (text, callOptions) => {
			throwIfClosed();
			return await client.embedQuery(workerOptions, text, callOptions);
		},
		embedBatch: async (texts, callOptions) => {
			throwIfClosed();
			return await client.embedBatch(workerOptions, texts, callOptions);
		},
		close: async () => {
			if (!closePromise) {
				closed = true;
				closePromise = client.close();
			}
			const pendingClose = closePromise;
			try {
				await pendingClose;
				RETAINED_WORKER_CLIENTS.delete(client);
			} catch (err) {
				if (closePromise === pendingClose) closePromise = null;
				RETAINED_WORKER_CLIENTS.add(client);
				scheduleRetainedWorkerDrain();
				throw err;
			}
		}
	};
	attachLocalEmbeddingRuntimeFacts(provider, () => client.getRuntimeFacts());
	return provider;
}
//#endregion
export { getLocalEmbeddingRuntimeFacts as i, drainRetainedLocalEmbeddingWorkerClients as n, attachLocalEmbeddingRuntimeFacts as r, createLocalEmbeddingWorkerProvider as t };
