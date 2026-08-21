import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { c as toRetryError } from "./src-DKBD8PDy.js";
import { t as formatErrorMessage } from "./error-utils-F_0lOXMP.js";
import "./embedding-defaults-BP3wPc9o.js";
import { r as attachLocalEmbeddingRuntimeFacts, t as createLocalEmbeddingWorkerProvider } from "./embeddings-worker-C2YPTqBP.js";
//#region packages/memory-host-sdk/src/host/embedding-vectors.ts
/** Replace invalid coordinates and L2-normalize non-empty vectors. */
function sanitizeAndNormalizeEmbedding(vec) {
	const sanitized = vec.map((value) => Number.isFinite(value) ? value : 0);
	const magnitude = Math.sqrt(sanitized.reduce((sum, value) => sum + value * value, 0));
	if (magnitude < 1e-10) return sanitized;
	return sanitized.map((value) => value / magnitude);
}
//#endregion
//#region packages/memory-host-sdk/src/host/node-llama.ts
const NODE_LLAMA_CPP_MODULE = "node-llama-cpp";
/** Dynamically import node-llama-cpp so the optional dependency is loaded only when needed. */
async function importNodeLlamaCpp(moduleSpecifier = NODE_LLAMA_CPP_MODULE) {
	return import(moduleSpecifier);
}
//#endregion
//#region packages/memory-host-sdk/src/host/embeddings.ts
function copyEmbeddingVector(vector, maxLength) {
	const length = Math.min(maxLength ?? vector.length, vector.length);
	const values = [];
	for (let index = 0; index < length; index += 1) values.push(expectDefined(vector[index], `embedding value ${index}`));
	return values;
}
async function disposeResources(resources) {
	let firstError;
	for (const resource of resources) try {
		await resource?.dispose?.();
	} catch (err) {
		firstError ??= err;
	}
	if (firstError) throw toRetryError(firstError);
}
async function readLlamaRuntimeFacts(llama) {
	const facts = {
		engine: "llama.cpp",
		state: "failed",
		backend: llama.gpu || "cpu",
		buildType: llama.buildType,
		offload: { supported: llama.supportsGpuOffloading }
	};
	try {
		facts.deviceNames = await llama.getGpuDeviceNames();
	} catch {}
	try {
		const memory = await llama.getVramState();
		facts.memory = {
			totalBytes: memory.total,
			usedBytes: memory.used,
			freeBytes: memory.free,
			unifiedBytes: memory.unifiedSize,
			observedAtMs: Date.now()
		};
	} catch {}
	return facts;
}
async function createLocalEmbeddingProvider(options, runtimeOptions) {
	return await createLocalEmbeddingWorkerProvider(options, runtimeOptions);
}
async function createLocalEmbeddingProviderInProcess(options) {
	const modelPath = normalizeOptionalString(options.local?.modelPath) || "hf:ggml-org/embeddinggemma-300m-qat-q8_0-GGUF/embeddinggemma-300m-qat-Q8_0.gguf";
	const modelCacheDir = normalizeOptionalString(options.local?.modelCacheDir);
	const nodeLlamaCppImportUrl = normalizeOptionalString(options.local?.nodeLlamaCppImportUrl);
	const contextSize = options.local?.contextSize ?? 4096;
	const { getLlama, resolveModelFile, LlamaLogLevel } = await importNodeLlamaCpp(nodeLlamaCppImportUrl);
	let llama = null;
	let embeddingModel = null;
	let embeddingContext = null;
	let initPromise = null;
	let initAbortController = null;
	let closePromise = null;
	let runtimeFacts;
	let closed = false;
	const throwIfClosed = () => {
		if (closed) throw new Error("Local embedding provider has been closed");
	};
	const disposeAndThrowIfClosed = async (resource) => {
		if (!closed) return resource;
		await disposeResources([resource]);
		throwIfClosed();
		return resource;
	};
	const ensureContext = async () => {
		throwIfClosed();
		if (embeddingContext) return embeddingContext;
		if (initPromise) return initPromise;
		initPromise = (async () => {
			const abortController = new AbortController();
			initAbortController = abortController;
			try {
				if (!llama) {
					const nextLlama = await getLlama({ logLevel: LlamaLogLevel.error });
					llama = await disposeAndThrowIfClosed(nextLlama);
					runtimeFacts = {
						...await readLlamaRuntimeFacts(llama),
						context: { requestedSize: contextSize }
					};
				}
				if (!embeddingModel) {
					const resolved = await resolveModelFile(modelPath, {
						...modelCacheDir ? { directory: modelCacheDir } : {},
						signal: abortController.signal
					});
					throwIfClosed();
					const nextModel = await llama.loadModel({
						modelPath: resolved,
						loadSignal: abortController.signal,
						...typeof contextSize === "number" ? { gpuLayers: { fitContext: {
							contextSize,
							embeddingContext: true
						} } } : {}
					});
					embeddingModel = await disposeAndThrowIfClosed(nextModel);
					runtimeFacts = {
						...runtimeFacts,
						engine: "llama.cpp",
						state: "failed",
						offload: {
							supported: llama.supportsGpuOffloading,
							offloadedLayers: embeddingModel.gpuLayers,
							totalLayers: embeddingModel.fileInsights.totalLayers
						}
					};
				}
				if (!embeddingContext) {
					const nextContext = await embeddingModel.createEmbeddingContext({
						contextSize,
						createSignal: abortController.signal
					});
					embeddingContext = await disposeAndThrowIfClosed(nextContext);
					const refreshedRuntimeFacts = await readLlamaRuntimeFacts(llama);
					runtimeFacts = {
						...runtimeFacts,
						...refreshedRuntimeFacts,
						engine: "llama.cpp",
						state: "ready",
						offload: {
							supported: llama.supportsGpuOffloading,
							offloadedLayers: embeddingModel.gpuLayers,
							totalLayers: embeddingModel.fileInsights.totalLayers
						},
						context: { requestedSize: contextSize },
						loadError: void 0
					};
				}
				return embeddingContext;
			} catch (err) {
				runtimeFacts = {
					...runtimeFacts,
					engine: "llama.cpp",
					state: "failed",
					context: { requestedSize: contextSize },
					loadError: formatErrorMessage(err)
				};
				initPromise = null;
				throw err;
			} finally {
				if (initAbortController === abortController) initAbortController = null;
			}
		})();
		return initPromise;
	};
	const outputDimensionality = typeof options.outputDimensionality === "number" ? options.outputDimensionality : void 0;
	const normalize = (vector) => sanitizeAndNormalizeEmbedding(copyEmbeddingVector(vector, outputDimensionality));
	const provider = {
		id: "local",
		model: modelPath,
		embedQuery: async (text, optionsValue) => {
			throwIfClosed();
			optionsValue?.signal?.throwIfAborted();
			const ctx = await ensureContext();
			throwIfClosed();
			optionsValue?.signal?.throwIfAborted();
			const embedding = await ctx.getEmbeddingFor(text);
			return normalize(embedding.vector);
		},
		embedBatch: async (texts, optionsLocal) => {
			throwIfClosed();
			optionsLocal?.signal?.throwIfAborted();
			const ctx = await ensureContext();
			throwIfClosed();
			optionsLocal?.signal?.throwIfAborted();
			const embeddings = [];
			for (const text of texts) {
				throwIfClosed();
				optionsLocal?.signal?.throwIfAborted();
				const embedding = await ctx.getEmbeddingFor(text);
				embeddings.push(normalize(embedding.vector));
			}
			return embeddings;
		},
		close: async () => {
			if (closePromise) return closePromise;
			closed = true;
			initAbortController?.abort();
			initAbortController = null;
			closePromise = (async () => {
				const context = embeddingContext;
				const model = embeddingModel;
				const runtime = llama;
				embeddingContext = null;
				embeddingModel = null;
				llama = null;
				initPromise = null;
				await disposeResources([
					context,
					model,
					runtime
				]);
			})();
			return closePromise;
		}
	};
	attachLocalEmbeddingRuntimeFacts(provider, () => runtimeFacts);
	return provider;
}
//#endregion
export { createLocalEmbeddingProviderInProcess as n, sanitizeAndNormalizeEmbedding as r, createLocalEmbeddingProvider as t };
