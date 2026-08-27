import { r as formatErrorMessage } from "../../errors-D-7D3ZtF.js";
import { n as collectConfiguredModelRefValues } from "../../configured-model-refs-XCtO9k7W.js";
import { f as isWSL2Sync } from "../../undici-runtime-PHOVXB-J.js";
import { r as fetchWithSsrFGuard } from "../../fetch-guard-CPWMHcWe.js";
import { g as readResponseTextLimited, m as readProviderJsonResponse } from "../../provider-http-errors-Dm9G78mz.js";
import { s as coerceSecretRef } from "../../types.secrets-BvApkFoj.js";
import { n as runExec } from "../../exec-Bcu-_3pW.js";
import { t as resolveConfiguredSecretInputString } from "../../resolve-configured-secret-input-string-DxIa9XNX.js";
import { c as isNonSecretApiKeyMarker } from "../../model-auth-markers-Co0rjfKm.js";
import { _ as readStringParam, p as readPositiveIntegerParam, u as readFiniteNumberParam } from "../../common-RkLs-2lL.js";
import { t as jsonResult } from "../../tool-results-BCM3fdVS.js";
import { n as buildApiKeyCredential } from "../../provider-auth-helpers-Cy_Bi6JW.js";
import { s as stringEnum } from "../../typebox-ktRHOCRA.js";
import "../../provider-auth-Cot2SGgW.js";
import { t as createProviderApiKeyAuthMethod } from "../../provider-api-key-auth-KfJbZN4B.js";
import { r as describeImagesWithModel, t as describeImageWithModel } from "../../image-runtime-C8xbV1aR.js";
import "../../media-understanding-BgKfrVi_.js";
import { a as buildOpenAICompatibleReplayPolicy } from "../../provider-replay-helpers-DtVD32X4.js";
import "../../error-runtime-Nqb-RQG4.js";
import "../../runtime-env-Cah9m5gV.js";
import { t as expectDefined } from "../../expect-runtime--WgnKYXT.js";
import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import "../../provider-model-shared-BPWEhHPG.js";
import { r as resolvePluginConfigObject } from "../../plugin-config-runtime-D33X7huv.js";
import "../../ssrf-runtime-B8V5-MiN.js";
import "../../process-runtime-dAJSGvJr.js";
import "../../channel-actions-BCwQOL9z.js";
import "../../provider-http-C8bsuM26.js";
import { l as sanitizeEmbeddingCacheHeaders } from "../../memory-core-host-engine-embeddings-CtOATX16.js";
import "../../provider-auth-api-key--X32VRlt.js";
import { r as buildProviderToolCompatFamilyHooks } from "../../provider-tools-mj-Qt8cY.js";
import "../../param-readers-ru5G1Vh2.js";
import "../../secret-input-runtime-Btgz9yT4.js";
import { i as OLLAMA_DEFAULT_BASE_URL, n as OLLAMA_CLOUD_DEFAULT_MODELS, r as OLLAMA_CLOUD_PROVIDER_ID, t as OLLAMA_CLOUD_BASE_URL, u as OLLAMA_GLM52_CLOUD_MODEL_ID } from "../../defaults-h8fOLDCy.js";
import { _ as resolveOllamaApiBase, a as buildOllamaProvider, c as enrichOllamaCompletionModels, d as fetchOllamaModels, f as isOllamaCloudModel, h as queryOllamaModelShowInfo, i as buildOllamaModelDefinition, l as enrichOllamaModelsWithContext, n as buildDefaultOllamaCloudModelDefinition, o as capLocalOllamaModelContext, r as buildOllamaBaseUrlSsrFPolicy, s as capLocalOllamaProviderContext, t as readProviderBaseUrl, u as fetchLoadedOllamaModelNames, v as throwIfOllamaRequestAborted } from "../../provider-base-url-BEal9pmC.js";
import { a as resolveOllamaSetupDefaultBaseUrl, c as orderPreferredOllamaModelIds, i as promptAndConfigureOllama, n as configureOllamaNonInteractive, r as ensureOllamaModelPulled, s as findAvailableOllamaModelName } from "../../setup-Z0XhhJw_.js";
import { d as resolveConfiguredOllamaProviderConfig, o as createConfiguredOllamaCompatStreamWrapper, s as createConfiguredOllamaStreamFn } from "../../stream-CDd5nOgS.js";
import "../../api-DqxvUkYs.js";
import { r as resolveThinkingProfile } from "../../provider-policy-api-DoThWsPT.js";
import { a as resolveOllamaRuntimeBaseUrl, i as resolveOllamaDiscoveryResult, n as OLLAMA_PROVIDER_ID, o as shouldUseSyntheticOllamaAuth, r as isLocalOllamaBaseUrl, t as OLLAMA_DEFAULT_API_KEY } from "../../discovery-shared-DbZpFHRm.js";
import { n as createOllamaEmbeddingProvider, t as DEFAULT_OLLAMA_EMBEDDING_MODEL } from "../../embedding-provider-BolYJfen.js";
import { t as createOllamaWebSearchProvider } from "../../web-search-provider-9T-ZJQDr.js";
import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import { Type } from "typebox";
//#region extensions/ollama/src/media-understanding-provider.ts
const ollamaMediaUnderstandingProvider = {
	id: OLLAMA_PROVIDER_ID,
	capabilities: ["image"],
	describeImage: describeImageWithModel,
	describeImages: describeImagesWithModel
};
//#endregion
//#region extensions/ollama/src/memory-embedding-adapter.ts
const OLLAMA_EMBEDDING_CACHE_EXCLUDED_HEADERS = [
	"authorization",
	"content-type",
	"x-api-key"
];
function hashEmbeddingCacheHeaders(headers) {
	return headers.length > 0 ? createHash("sha256").update(JSON.stringify(headers)).digest("hex") : void 0;
}
const ollamaMemoryEmbeddingProviderAdapter = {
	id: "ollama",
	defaultModel: DEFAULT_OLLAMA_EMBEDDING_MODEL,
	transport: "remote",
	authProviderId: "ollama",
	create: async (options) => {
		const providerId = options.provider?.trim() || "ollama";
		const { provider, client } = await createOllamaEmbeddingProvider({
			...options,
			provider: providerId,
			fallback: "none"
		});
		const headersHash = hashEmbeddingCacheHeaders(sanitizeEmbeddingCacheHeaders(client.headers, OLLAMA_EMBEDDING_CACHE_EXCLUDED_HEADERS));
		return {
			provider,
			runtime: {
				id: "ollama",
				inlineBatchTimeoutMs: 10 * 6e4,
				cacheKeyData: {
					provider: providerId,
					...providerId === "ollama" && client.baseUrl === "http://127.0.0.1:11434" && headersHash === void 0 ? {} : { baseUrl: client.baseUrl },
					model: client.model,
					outputDimensionality: client.outputDimensionality,
					...headersHash ? { headersHash } : {}
				}
			}
		};
	}
};
//#endregion
//#region extensions/ollama/src/node-inference.ts
const OLLAMA_NODE_INFERENCE_CAPABILITY = "local-inference";
const OLLAMA_MODELS_COMMAND = "ollama.models";
const OLLAMA_CHAT_COMMAND = "ollama.chat";
const OLLAMA_NODE_INFERENCE_COMMANDS = [OLLAMA_MODELS_COMMAND, OLLAMA_CHAT_COMMAND];
const DEFAULT_INFERENCE_TIMEOUT_MS = 12e4;
const DEFAULT_MAX_TOKENS = 512;
const DISCOVERY_TRANSPORT_TIMEOUT_MS = 9e4;
const MAX_INFERENCE_TIMEOUT_MS = 10 * 6e4;
const MAX_TOKENS = 8192;
const MAX_PROMPT_CHARS = 128e3;
const MAX_SYSTEM_PROMPT_CHARS = 32e3;
const MAX_ERROR_BODY_BYTES = 500;
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function readNodeCommandParams(paramsJSON) {
	if (!paramsJSON) return {};
	const parsed = asRecord(JSON.parse(paramsJSON));
	if (!parsed) throw new Error("node inference params must be a JSON object");
	return parsed;
}
function durationMs(value) {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return;
	return Math.round(value / 1e6 * 100) / 100;
}
function optionalNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
async function requestOllamaJson(params) {
	const apiBase = resolveOllamaApiBase(params.baseUrl);
	let response;
	let release;
	try {
		const guarded = await fetchWithSsrFGuard({
			url: `${apiBase}${params.path}`,
			init: params.init,
			timeoutMs: params.timeoutMs,
			...params.signal ? { signal: params.signal } : {},
			policy: buildOllamaBaseUrlSsrFPolicy(apiBase),
			auditContext: `ollama-node-inference${params.path}`
		});
		response = guarded.response;
		release = guarded.release;
	} catch (error) {
		throwIfOllamaRequestAborted(params.signal);
		throw new Error(`Ollama is unavailable at ${apiBase}: ${formatErrorMessage(error)}`, { cause: error });
	}
	try {
		if (!response.ok) {
			const body = (await readResponseTextLimited(response, MAX_ERROR_BODY_BYTES)).trim();
			let detail = body;
			try {
				const parsed = asRecord(JSON.parse(body));
				detail = typeof parsed?.error === "string" ? parsed.error : body;
			} catch {}
			throw new Error(`Ollama ${params.path} failed (HTTP ${response.status})${detail ? `: ${detail}` : ""}`);
		}
		return await readProviderJsonResponse(response, `ollama-node-inference${params.path}`);
	} finally {
		await release();
	}
}
async function discoverOllamaNodeModels(baseUrl = OLLAMA_DEFAULT_BASE_URL, signal) {
	const apiBase = resolveOllamaApiBase(baseUrl);
	const discovered = await fetchOllamaModels(apiBase, signal ? { signal } : void 0);
	if (!discovered.reachable) throw new Error(`Ollama is not running at ${apiBase}`);
	const localModels = discovered.models.filter((model) => !model.remote_host?.trim() && !isOllamaCloudModel(model.name));
	const loaded = await fetchLoadedOllamaModelNames(apiBase, signal ? { signal } : void 0);
	const loadedNames = new Set(loaded.models);
	return {
		provider: "ollama",
		models: (await enrichOllamaCompletionModels(apiBase, localModels.toSorted((left, right) => Number(loadedNames.has(right.name)) - Number(loadedNames.has(left.name))), {
			requireCompletionCapability: true,
			...signal ? { signal } : {}
		})).map((model) => {
			const details = model.details;
			const row = {
				name: model.name,
				loaded: loadedNames.has(model.name)
			};
			if (typeof model.size === "number") row.size = model.size;
			if (typeof model.modified_at === "string") row.modifiedAt = model.modified_at;
			if (details?.family) row.family = details.family;
			if (details?.parameter_size) row.parameterSize = details.parameter_size;
			if (details?.quantization_level) row.quantization = details.quantization_level;
			if (typeof model.contextWindow === "number") row.contextWindow = model.contextWindow;
			if (model.capabilities) row.capabilities = model.capabilities;
			return row;
		}).toSorted((left, right) => {
			if (left.loaded !== right.loaded) return left.loaded ? -1 : 1;
			return (left.size ?? Number.MAX_SAFE_INTEGER) - (right.size ?? Number.MAX_SAFE_INTEGER) || left.name.localeCompare(right.name);
		})
	};
}
async function runOllamaNodeChat(params) {
	const apiBase = resolveOllamaApiBase(params.baseUrl);
	const deadlineMs = performance.now() + params.timeoutMs;
	const remainingTimeoutMs = () => {
		const remainingMs = Math.ceil(deadlineMs - performance.now());
		if (remainingMs <= 0) throw new Error(`Ollama node inference timed out after ${params.timeoutMs}ms`);
		return remainingMs;
	};
	const discovered = await fetchOllamaModels(apiBase, {
		timeoutMs: remainingTimeoutMs(),
		...params.signal ? { signal: params.signal } : {}
	});
	const localModel = discovered.models.find((model) => model.name === params.model && !model.remote_host?.trim() && !isOllamaCloudModel(model.name));
	const [model] = localModel ? await enrichOllamaModelsWithContext(apiBase, [localModel], {
		timeoutMs: remainingTimeoutMs(),
		...params.signal ? { signal: params.signal } : {}
	}) : [];
	if (!discovered.reachable || model?.capabilities?.includes("completion") !== true) {
		remainingTimeoutMs();
		throw new Error(`Ollama model ${JSON.stringify(params.model)} is not a local chat model; discover models first`);
	}
	const messages = [...params.system ? [{
		role: "system",
		content: params.system
	}] : [], {
		role: "user",
		content: params.prompt
	}];
	const data = await requestOllamaJson({
		baseUrl: params.baseUrl,
		path: "/api/chat",
		timeoutMs: remainingTimeoutMs(),
		...params.signal ? { signal: params.signal } : {},
		init: {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: params.model,
				messages,
				stream: false,
				think: false,
				options: {
					num_predict: params.maxTokens,
					...params.temperature !== void 0 && { temperature: params.temperature }
				}
			})
		}
	});
	const response = typeof data.message?.content === "string" ? data.message.content : void 0;
	if (response === void 0) throw new Error("Ollama /api/chat response did not contain message.content");
	if (data.done_reason === "length") throw new Error(`Ollama stopped after reaching maxTokens (${params.maxTokens}); retry with a larger maxTokens value`);
	const promptTokens = optionalNumber(data.prompt_eval_count);
	const completionTokens = optionalNumber(data.eval_count);
	const loadMs = durationMs(data.load_duration);
	const totalMs = durationMs(data.total_duration);
	return {
		provider: "ollama",
		model: typeof data.model === "string" && data.model.trim() ? data.model : params.model,
		response,
		...promptTokens !== void 0 || completionTokens !== void 0 ? { usage: {
			promptTokens,
			completionTokens
		} } : {},
		...loadMs !== void 0 || totalMs !== void 0 ? { timings: {
			loadMs,
			totalMs
		} } : {}
	};
}
function createOllamaNodeHostCommands(options) {
	const baseUrl = options?.baseUrl ?? "http://127.0.0.1:11434";
	return [{
		command: OLLAMA_MODELS_COMMAND,
		cap: OLLAMA_NODE_INFERENCE_CAPABILITY,
		handle: async (_paramsJSON, _io, context) => JSON.stringify(await discoverOllamaNodeModels(baseUrl, context?.signal))
	}, {
		command: OLLAMA_CHAT_COMMAND,
		cap: OLLAMA_NODE_INFERENCE_CAPABILITY,
		handle: async (paramsJSON, _io, context) => {
			const params = readNodeCommandParams(paramsJSON);
			const model = readStringParam(params, "model", { required: true });
			const prompt = readStringParam(params, "prompt", {
				required: true,
				trim: false
			});
			const system = readStringParam(params, "system", { trim: false });
			const maxTokens = readPositiveIntegerParam(params, "maxTokens", {
				max: MAX_TOKENS,
				message: `maxTokens must be an integer between 1 and ${MAX_TOKENS}`
			}) ?? DEFAULT_MAX_TOKENS;
			const timeoutMs = readPositiveIntegerParam(params, "timeoutMs", {
				max: MAX_INFERENCE_TIMEOUT_MS,
				message: `timeoutMs must be an integer between 1 and ${MAX_INFERENCE_TIMEOUT_MS}`
			}) ?? DEFAULT_INFERENCE_TIMEOUT_MS;
			const temperature = readFiniteNumberParam(params, "temperature", {
				min: 0,
				max: 2,
				message: "temperature must be between 0 and 2"
			});
			if (prompt.length > MAX_PROMPT_CHARS) throw new Error(`prompt exceeds ${MAX_PROMPT_CHARS} characters`);
			if (system && system.length > MAX_SYSTEM_PROMPT_CHARS) throw new Error(`system exceeds ${MAX_SYSTEM_PROMPT_CHARS} characters`);
			return JSON.stringify(await runOllamaNodeChat({
				baseUrl,
				model,
				prompt,
				system,
				temperature,
				maxTokens,
				timeoutMs,
				...context?.signal ? { signal: context.signal } : {}
			}));
		}
	}];
}
function createOllamaNodeInvokePolicy() {
	return {
		commands: [...OLLAMA_NODE_INFERENCE_COMMANDS],
		defaultPlatforms: [
			"macos",
			"linux",
			"windows"
		],
		handle: async (ctx) => await ctx.invokeNode()
	};
}
function findNode(nodes, query) {
	const normalized = query.trim().toLowerCase();
	const matches = nodes.filter((node) => node.nodeId.toLowerCase() === normalized || node.displayName?.toLowerCase() === normalized);
	if (matches.length === 0) throw new Error(`node ${JSON.stringify(query)} is not connected with Ollama inference support`);
	if (matches.length > 1) throw new Error(`node ${JSON.stringify(query)} is ambiguous; use its nodeId`);
	return expectDefined(matches[0], "single matching Ollama inference node");
}
function parseInvokePayload(raw) {
	const result = asRecord(raw);
	let payload = asRecord(result?.payload);
	if (!payload && typeof result?.payloadJSON === "string") payload = asRecord(JSON.parse(result.payloadJSON));
	if (!payload) throw new Error("node returned an invalid Ollama inference payload");
	return payload;
}
async function invokeNode(api, nodeId, command, params, timeoutMs, signal) {
	throwIfOllamaRequestAborted(signal);
	return parseInvokePayload(await api.runtime.nodes.invoke({
		nodeId,
		command,
		params,
		timeoutMs,
		scopes: ["operator.write"],
		...signal ? { signal } : {}
	}));
}
const ollamaNodeInferenceToolDefinition = {
	name: "node_inference",
	label: "Node Inference",
	description: "Discover and run chat-capable Ollama models installed on paired desktop/server nodes. Use action=discover first, then action=run with a node and model from that result. Inference stays on the selected node.",
	parameters: Type.Object({
		action: stringEnum(["discover", "run"]),
		node: Type.Optional(Type.String({ description: "Connected node id or display name. Required when ambiguous." })),
		model: Type.Optional(Type.String({ description: "Exact local model name returned by discover." })),
		prompt: Type.Optional(Type.String({ description: "Prompt for action=run." })),
		system: Type.Optional(Type.String({ description: "Optional system prompt for action=run." })),
		temperature: Type.Optional(Type.Number({
			minimum: 0,
			maximum: 2
		})),
		maxTokens: Type.Optional(Type.Integer({
			minimum: 1,
			maximum: MAX_TOKENS
		})),
		timeoutMs: Type.Optional(Type.Integer({
			minimum: 1,
			maximum: MAX_INFERENCE_TIMEOUT_MS
		}))
	}, { additionalProperties: false })
};
function createOllamaNodeInferenceTool(api) {
	return {
		...ollamaNodeInferenceToolDefinition,
		execute: async (_toolCallId, args, signal) => {
			throwIfOllamaRequestAborted(signal);
			const params = asRecord(args) ?? {};
			const action = readStringParam(params, "action", { required: true });
			const nodeQuery = readStringParam(params, "node");
			const modelNodes = (await api.runtime.nodes.list({ connected: true })).nodes.filter((node) => (node.invocableCommands ?? node.commands)?.includes(OLLAMA_MODELS_COMMAND));
			if (action === "discover") {
				const targets = nodeQuery ? [findNode(modelNodes, nodeQuery)] : modelNodes;
				return jsonResult({
					nodes: await Promise.all(targets.map(async (node) => {
						try {
							const payload = await invokeNode(api, node.nodeId, OLLAMA_MODELS_COMMAND, {}, DISCOVERY_TRANSPORT_TIMEOUT_MS, signal);
							const result = {
								nodeId: node.nodeId,
								ok: true
							};
							if (node.displayName) result.displayName = node.displayName;
							return Object.assign(result, payload);
						} catch (error) {
							throwIfOllamaRequestAborted(signal);
							const result = {
								nodeId: node.nodeId,
								ok: false,
								error: formatErrorMessage(error)
							};
							if (node.displayName) result.displayName = node.displayName;
							return result;
						}
					})),
					...modelNodes.length === 0 && { hint: "No connected node advertises Ollama inference. Start Ollama and `openclaw node run` on the target machine, then approve any request shown by `openclaw nodes pending`." }
				});
			}
			if (action !== "run") throw new Error("action must be discover or run");
			const chatNodes = modelNodes.filter((node) => (node.invocableCommands ?? node.commands)?.includes(OLLAMA_CHAT_COMMAND));
			const node = nodeQuery ? findNode(chatNodes, nodeQuery) : chatNodes.length === 1 ? chatNodes[0] : void 0;
			if (!node) throw new Error(chatNodes.length === 0 ? "no connected node advertises Ollama inference" : "multiple nodes advertise Ollama inference; specify node");
			const model = readStringParam(params, "model", { required: true });
			const prompt = readStringParam(params, "prompt", {
				required: true,
				trim: false
			});
			const maxTokens = readPositiveIntegerParam(params, "maxTokens", { max: MAX_TOKENS }) ?? DEFAULT_MAX_TOKENS;
			const timeoutMs = readPositiveIntegerParam(params, "timeoutMs", { max: MAX_INFERENCE_TIMEOUT_MS }) ?? DEFAULT_INFERENCE_TIMEOUT_MS;
			const system = readStringParam(params, "system", { trim: false });
			const temperature = readFiniteNumberParam(params, "temperature", {
				min: 0,
				max: 2
			});
			const commandParams = {
				model,
				prompt,
				maxTokens,
				timeoutMs
			};
			if (system !== void 0) commandParams.system = system;
			if (temperature !== void 0) commandParams.temperature = temperature;
			const result = await invokeNode(api, node.nodeId, OLLAMA_CHAT_COMMAND, commandParams, timeoutMs, signal);
			return jsonResult({
				nodeId: node.nodeId,
				...node.displayName && { displayName: node.displayName },
				...result
			});
		}
	};
}
//#endregion
//#region extensions/ollama/src/wsl2-crash-loop-check.ts
const SYSTEMCTL_TIMEOUT_MS = 5e3;
const WSL_CUDA_MARKERS = [
	"/dev/dxg",
	"/usr/lib/wsl/lib/nvidia-smi",
	"/usr/lib/wsl/lib/libcuda.so.1",
	"/usr/local/cuda"
];
function parseSystemctlShowProperties(stdout) {
	const properties = /* @__PURE__ */ new Map();
	for (const line of stdout.split(/\r?\n/u)) {
		const separator = line.indexOf("=");
		if (separator <= 0) continue;
		properties.set(line.slice(0, separator), line.slice(separator + 1));
	}
	return properties;
}
async function isOllamaEnabledWithRestartAlways() {
	try {
		const { stdout } = await runExec("systemctl", [
			"show",
			"ollama.service",
			"--property=UnitFileState,Restart",
			"--no-pager"
		], {
			logOutput: false,
			timeoutMs: SYSTEMCTL_TIMEOUT_MS
		});
		const properties = parseSystemctlShowProperties(stdout);
		return properties.get("UnitFileState") === "enabled" && properties.get("Restart") === "always";
	} catch {
		return false;
	}
}
async function hasWslCuda() {
	for (const marker of WSL_CUDA_MARKERS) try {
		await access(marker);
		return true;
	} catch {}
	return false;
}
async function checkWsl2CrashLoopRisk(logger) {
	try {
		if (!isWSL2Sync()) return;
		if (!await isOllamaEnabledWithRestartAlways()) return;
		if (!await hasWslCuda()) return;
		logger.warn([
			"[ollama] WSL2 crash-loop risk: ollama.service is enabled with Restart=always and CUDA is visible.",
			"On WSL2, GPU-backed Ollama can pin host memory while loading a model.",
			"Hyper-V memory reclaim cannot always reclaim those pinned pages, so Windows can terminate and restart the WSL2 VM.",
			"",
			"Common evidence: repeated WSL2 reboots, high CPU in app.slice at startup, and SIGTERM from systemd rather than the Linux OOM killer.",
			"See: https://github.com/ollama/ollama/issues/11317",
			"",
			"Mitigation:",
			"  1. Disable autostart: sudo systemctl disable ollama",
			"  2. Add [experimental] autoMemoryReclaim=disabled to %USERPROFILE%\\.wslconfig on Windows, then run wsl --shutdown",
			"  3. Set OLLAMA_KEEP_ALIVE=5m in the Ollama service environment or start ollama serve manually when needed"
		].join("\n"));
	} catch {}
}
//#endregion
//#region extensions/ollama/index.ts
function buildNativeOllamaReplayPolicy() {
	return {
		...buildOpenAICompatibleReplayPolicy("openai-completions", { sanitizeToolCallIds: false }),
		sanitizeToolCallIds: false
	};
}
function matchesOllamaContextOverflowError(errorMessage) {
	return /\bollama\b.*(?:context length|too many tokens|context window)/i.test(errorMessage) || /\btruncating input\b.*\btoo long\b/i.test(errorMessage);
}
function classifyOllamaFailoverReason(errorMessage) {
	return errorMessage.trim() === "Ollama API stream ended without a final response" ? "server_error" : void 0;
}
const dynamicModelCache = /* @__PURE__ */ new Map();
const dynamicManagedCredentialFingerprints = /* @__PURE__ */ new WeakMap();
const OLLAMA_CLOUD_DEFAULT_MODEL_REF = `${OLLAMA_CLOUD_PROVIDER_ID}/${OLLAMA_CLOUD_DEFAULT_MODELS[0].id}`;
const OLLAMA_CONFIGURED_SHOW_CONCURRENCY = 4;
const OLLAMA_CONFIGURED_SHOW_MAX_MODELS = 8;
async function validateOllamaNonInteractive(ctx) {
	const baseUrl = resolveOllamaApiBase((typeof ctx.opts.customBaseUrl === "string" ? ctx.opts.customBaseUrl.trim() : void 0) || resolveOllamaSetupDefaultBaseUrl());
	const discovery = await fetchOllamaModels(baseUrl);
	if (!discovery.reachable) {
		ctx.runtime.error(`Ollama could not be reached at ${baseUrl}.\nDownload it at https://ollama.com/download`);
		ctx.runtime.exit(1);
		return false;
	}
	const requestedModel = typeof ctx.opts.customModelId === "string" ? ctx.opts.customModelId.trim().replace(/^ollama\//i, "") : void 0;
	const selectedModel = requestedModel || "gemma4";
	const availableModelNames = discovery.models.map((model) => model.name);
	const normalizeAvailableModelName = (modelName) => modelName.trim().toLowerCase().replace(/:latest$/, "");
	const selectedModelIsAvailable = availableModelNames.some((modelName) => normalizeAvailableModelName(modelName) === normalizeAvailableModelName(selectedModel));
	if (requestedModel && isOllamaCloudModel(requestedModel)) {
		const { checkOllamaCloudAuth } = await import("../../setup-t2wSd9QQ.js");
		const cloudAuth = await checkOllamaCloudAuth(baseUrl);
		if (!cloudAuth.signedIn) {
			ctx.runtime.error(`Cloud models on this Ollama host need \`ollama signin\`.\n${cloudAuth.signinUrl ?? "Run `ollama signin` on the configured Ollama host."}`);
			ctx.runtime.exit(1);
			return false;
		}
		const showInfo = await queryOllamaModelShowInfo(baseUrl, requestedModel);
		if (typeof showInfo.contextWindow !== "number" && (showInfo.capabilities?.length ?? 0) === 0) {
			ctx.runtime.error(`Ollama model ${requestedModel} was not found at ${baseUrl}.\nAvailable models: ${availableModelNames.join(", ") || "(none)"}`);
			ctx.runtime.exit(1);
			return false;
		}
		return true;
	}
	if (availableModelNames.length === 0) {
		ctx.runtime.error(`No Ollama models are available at ${baseUrl}.\nPull a model first, then re-run setup.`);
		ctx.runtime.exit(1);
		return false;
	}
	if (!selectedModelIsAvailable) {
		ctx.runtime.error(`Ollama model ${selectedModel} was not found at ${baseUrl}.\nAvailable models: ${availableModelNames.join(", ")}`);
		ctx.runtime.exit(1);
		return false;
	}
	return true;
}
async function buildLocalOllamaProvider(configuredBaseUrl, opts) {
	return capLocalOllamaProviderContext(await buildOllamaProvider(configuredBaseUrl, opts));
}
async function resolveAppGuidedOllamaConnection(ctx) {
	if (resolvePluginConfigObject(ctx.config, "ollama")?.discovery?.enabled === false) return null;
	const existing = resolveConfiguredOllamaProviderConfig({
		config: ctx.config,
		providerId: OLLAMA_PROVIDER_ID
	});
	const accessValue = await resolveAppGuidedOllamaApiKey(ctx, existing);
	return {
		existing,
		accessValue,
		discoveryAccess: accessValue ? { apiKey: accessValue } : {},
		baseUrl: resolveOllamaApiBase(readProviderBaseUrl(existing) ?? resolveOllamaSetupDefaultBaseUrl(ctx.env))
	};
}
async function detectAppGuidedOllamaAvailability(ctx) {
	const connection = await resolveAppGuidedOllamaConnection(ctx);
	if (!connection) return false;
	return (await fetchOllamaModels(connection.baseUrl, {
		...connection.discoveryAccess,
		...ctx.signal ? { signal: ctx.signal } : {}
	})).reachable;
}
async function discoverAppGuidedOllamaModel(ctx, options) {
	const connection = await resolveAppGuidedOllamaConnection(ctx);
	if (!connection) return null;
	const requestedPrefix = `${OLLAMA_PROVIDER_ID}/`;
	const requestedModelId = options?.modelRef?.startsWith(requestedPrefix) ? options.modelRef.slice(requestedPrefix.length) : void 0;
	if (options?.modelRef && !requestedModelId) return null;
	const configuredModels = connection.existing?.models ?? [];
	const requestedConfiguredModel = requestedModelId ? configuredModels.find((candidate) => findAvailableOllamaModelName(candidate.id, [requestedModelId]) !== void 0) : void 0;
	let requestedModelIsLoaded = false;
	let availableModelNames;
	if (requestedModelId) {
		if (!requestedConfiguredModel && !isOllamaCloudModel(requestedModelId)) {
			const loaded = await fetchLoadedOllamaModelNames(connection.baseUrl, {
				...connection.discoveryAccess,
				...ctx.signal ? { signal: ctx.signal } : {}
			});
			if (!loaded.reachable || findAvailableOllamaModelName(requestedModelId, loaded.models) === void 0) return null;
			requestedModelIsLoaded = true;
		}
		availableModelNames = [requestedModelId];
	} else {
		const loaded = await fetchLoadedOllamaModelNames(connection.baseUrl, {
			...connection.discoveryAccess,
			...ctx.signal ? { signal: ctx.signal } : {}
		});
		if (!loaded.reachable || loaded.models.length === 0) return null;
		availableModelNames = loaded.models;
	}
	const provider = await buildOllamaProvider(connection.baseUrl, {
		quiet: true,
		...connection.discoveryAccess
	});
	const providerModels = provider.models ?? [];
	const requestedProviderModel = requestedModelId ? providerModels.find((candidate) => candidate.compat?.supportsTools === true && findAvailableOllamaModelName(candidate.id, [requestedModelId]) !== void 0) : void 0;
	const requestedModel = (requestedConfiguredModel || requestedModelIsLoaded) && requestedProviderModel ? requestedProviderModel : requestedConfiguredModel && requestedModelId && isOllamaCloudModel(requestedModelId) ? requestedConfiguredModel : void 0;
	const toolModels = requestedModelId ? requestedModel ? [requestedModel] : [] : providerModels.filter((candidate) => candidate.compat?.supportsTools === true && findAvailableOllamaModelName(candidate.id, availableModelNames) !== void 0);
	let model;
	const candidatesById = new Map(toolModels.map((candidate) => [candidate.id, candidate]));
	for (const candidateId of orderPreferredOllamaModelIds(candidatesById.keys())) {
		const candidate = candidatesById.get(candidateId);
		if (!candidate) continue;
		const showInfo = await queryOllamaModelShowInfo(provider.baseUrl, candidate.id, connection.accessValue ? { apiKey: connection.accessValue } : void 0);
		const contextWindow = showInfo.contextWindow ?? candidate.contextWindow;
		if (!(showInfo.capabilities?.includes("tools") ?? candidate.compat?.supportsTools === true) || contextWindow === void 0 || contextWindow < 16384) continue;
		model = capLocalOllamaModelContext({
			...candidate,
			contextWindow,
			contextTokens: contextWindow,
			compat: {
				...candidate.compat,
				supportsTools: true
			}
		});
		break;
	}
	if (!model) return null;
	const preparedProvider = capLocalOllamaProviderContext({
		...provider,
		models: providerModels.some((candidate) => candidate.id === model.id) ? providerModels.map((candidate) => candidate.id === model.id ? model : candidate) : [...providerModels, model]
	});
	let ownerValue = connection.existing?.apiKey;
	if (ownerValue === void 0) if (connection.accessValue) ownerValue = "OLLAMA_API_KEY";
	else ownerValue = OLLAMA_DEFAULT_API_KEY;
	return {
		existing: connection.existing,
		provider: preparedProvider,
		model,
		ownerValue
	};
}
function buildDynamicManagedSecretScope(provider, baseUrl, configuredApiKey) {
	const secretRef = coerceSecretRef(configuredApiKey);
	if (!secretRef || secretRef.source === "env") return;
	return `${provider}\0${resolveOllamaApiBase(baseUrl)}\0${secretRef.source}\0${secretRef.provider}\0${secretRef.id}`;
}
function buildDynamicCacheKey(provider, baseUrl, configuredApiKey, config) {
	const secretRef = coerceSecretRef(configuredApiKey);
	const managedSecretScope = buildDynamicManagedSecretScope(provider, baseUrl, configuredApiKey);
	const apiKey = readUsableOllamaShowApiKey({
		env: process.env,
		allowAmbientEnvFallback: !isLocalOllamaBaseUrl(baseUrl),
		explicitApiKey: configuredApiKey
	});
	const managedCredentialFingerprint = managedSecretScope && config ? dynamicManagedCredentialFingerprints.get(config)?.get(managedSecretScope) : void 0;
	const credentialScope = apiKey ?? (secretRef ? `${secretRef.source}\0${secretRef.provider}\0${secretRef.id}` : "");
	const credentialFingerprint = managedCredentialFingerprint ?? createHash("sha256").update(credentialScope).digest("hex");
	return `${provider}\0${resolveOllamaApiBase(baseUrl)}\0${credentialFingerprint}`;
}
function hasOllamaDiscoverySignal(providerConfig) {
	return Boolean(process.env.OLLAMA_API_KEY?.trim()) || shouldUseSyntheticOllamaAuth(providerConfig) || Boolean(providerConfig?.apiKey);
}
function toDynamicOllamaModel(params) {
	const input = (params.model.input ?? ["text"]).filter((value) => value === "text" || value === "image");
	return {
		id: params.model.id,
		name: params.model.name ?? params.model.id,
		provider: params.provider,
		api: params.providerConfig.api ?? "ollama",
		baseUrl: readProviderBaseUrl(params.providerConfig) ?? "",
		reasoning: params.model.reasoning ?? false,
		input: input.length > 0 ? input : ["text"],
		cost: params.model.cost ?? {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0
		},
		contextWindow: params.model.contextWindow ?? 8192,
		...params.model.contextTokens !== void 0 ? { contextTokens: params.model.contextTokens } : {},
		maxTokens: params.model.maxTokens ?? 8192,
		...params.model.compat ? { compat: params.model.compat } : {},
		...params.model.params ? { params: params.model.params } : {}
	};
}
function stripTrailingAuthProfile(raw) {
	const trimmed = raw.trim();
	const lastSlash = trimmed.lastIndexOf("/");
	let delimiter = trimmed.indexOf("@", lastSlash + 1);
	if (delimiter <= 0) return trimmed;
	const suffix = () => trimmed.slice(delimiter + 1);
	if (/^\d{8}(?:@|$)/.test(suffix())) {
		const next = trimmed.indexOf("@", delimiter + 9);
		if (next < 0) return trimmed;
		delimiter = next;
	}
	if (/^(?:i?q\d+(?:_[a-z0-9]+)*|\d+bit)(?:@|$)/i.test(suffix())) {
		const next = trimmed.indexOf("@", delimiter + 1);
		if (next < 0) return trimmed;
		delimiter = next;
	}
	const model = trimmed.slice(0, delimiter).trim();
	const profile = trimmed.slice(delimiter + 1).trim();
	return model && profile ? model : trimmed;
}
function needsOllamaCatalogMetadata(entry) {
	return !(entry.contextWindow !== void 0 || entry.contextTokens !== void 0) || entry.reasoning === void 0 || entry.input === void 0 || entry.compat === void 0;
}
function readConfiguredOllamaApiKey(value) {
	if (typeof value === "string") return value.trim() || void 0;
	if (value && typeof value === "object" && "value" in value) {
		const resolved = value.value;
		if (typeof resolved === "string") return resolved.trim() || void 0;
	}
}
function readConcreteOllamaApiKey(value) {
	if (coerceSecretRef(value)) return;
	const apiKey = readConfiguredOllamaApiKey(value);
	return apiKey && !isNonSecretApiKeyMarker(apiKey) ? apiKey : void 0;
}
async function resolveAppGuidedOllamaApiKey(ctx, provider) {
	const input = provider?.apiKey;
	if (input === void 0 || input === null) {
		const configuredBaseUrl = readProviderBaseUrl(provider);
		if (!configuredBaseUrl || isLocalOllamaBaseUrl(configuredBaseUrl)) return;
		return readConcreteOllamaApiKey(ctx.env.OLLAMA_API_KEY);
	}
	const resolved = await resolveConfiguredSecretInputString({
		config: ctx.config,
		env: ctx.env,
		value: input,
		path: `models.providers.${OLLAMA_PROVIDER_ID}.apiKey`,
		unresolvedReasonStyle: "detailed"
	});
	if (resolved.unresolvedRefReason) return;
	const value = readConfiguredOllamaApiKey(resolved.value);
	return value === "OLLAMA_API_KEY" ? readConcreteOllamaApiKey(ctx.env.OLLAMA_API_KEY) : readConcreteOllamaApiKey(value);
}
function readEnvBackedOllamaApiKey(value, env) {
	const ref = coerceSecretRef(value);
	if (ref?.source === "env") return readConcreteOllamaApiKey(env[ref.id.trim()]);
}
function isAmbientOllamaApiKeyMarker(value) {
	return value === "ollama-local" || value === "OLLAMA_API_KEY";
}
function readUsableOllamaShowApiKey(params) {
	const explicitEnvApiKey = readEnvBackedOllamaApiKey(params.explicitApiKey, params.env);
	if (explicitEnvApiKey) return explicitEnvApiKey;
	const explicitApiKey = readConcreteOllamaApiKey(params.explicitApiKey);
	if (explicitApiKey) return explicitApiKey;
	const resolvedApiKey = readConfiguredOllamaApiKey(params.resolved?.apiKey);
	const canUseResolvedDiscovery = params.allowAmbientEnvFallback || !isAmbientOllamaApiKeyMarker(resolvedApiKey);
	const discoveryApiKey = readConcreteOllamaApiKey(params.resolved?.discoveryApiKey);
	if (discoveryApiKey && canUseResolvedDiscovery) return discoveryApiKey;
	const resolvedEnvApiKey = readEnvBackedOllamaApiKey(params.resolved?.apiKey, params.env);
	if (resolvedEnvApiKey && canUseResolvedDiscovery) return resolvedEnvApiKey;
	const apiKey = readConcreteOllamaApiKey(params.resolved?.apiKey);
	if (apiKey) return apiKey;
	return params.allowAmbientEnvFallback ? readConcreteOllamaApiKey(params.env.OLLAMA_API_KEY) : void 0;
}
function collectConfiguredOllamaModelIds(params) {
	const providerPrefix = `${params.provider.toLowerCase()}/`;
	const models = /* @__PURE__ */ new Map();
	const addModelId = (modelId, api, name) => {
		const trimmed = modelId.trim();
		if (!trimmed || trimmed === "*") return;
		const trimmedName = typeof name === "string" ? name.trim() : "";
		const existing = models.get(trimmed);
		if (existing) {
			if (!existing.api && api || !existing.name && trimmedName) models.set(trimmed, {
				...existing,
				...api && !existing.api ? { api } : {},
				...trimmedName && !existing.name ? { name: trimmedName } : {}
			});
			return;
		}
		models.set(trimmed, {
			id: trimmed,
			...api ? { api } : {},
			...trimmedName ? { name: trimmedName } : {}
		});
	};
	const addRef = (raw) => {
		if (typeof raw !== "string") return;
		const trimmed = stripTrailingAuthProfile(raw);
		if (!trimmed.toLowerCase().startsWith(providerPrefix)) return;
		const modelId = trimmed.slice(providerPrefix.length).trim();
		addModelId(modelId);
	};
	for (const ref of collectConfiguredModelRefValues(params.config)) addRef(ref);
	for (const entry of params.entries ?? []) if (entry.provider.toLowerCase() === params.provider.toLowerCase() && entry.id.trim() && needsOllamaCatalogMetadata(entry)) addModelId(entry.id.trim(), entry.api, entry.name);
	return [...models.values()];
}
function buildStaticOllamaCloudProvider() {
	return {
		baseUrl: OLLAMA_CLOUD_BASE_URL,
		api: "ollama",
		models: OLLAMA_CLOUD_DEFAULT_MODELS.map(buildDefaultOllamaCloudModelDefinition)
	};
}
async function buildOllamaCloudProvider(apiKey) {
	const discovered = await buildOllamaProvider(OLLAMA_CLOUD_BASE_URL, {
		...apiKey ? { apiKey } : {},
		quiet: true
	});
	if (!discovered.models?.length) return buildStaticOllamaCloudProvider();
	if (!apiKey || discovered.models.some((model) => model.id === "glm-5.2")) return discovered;
	const showInfo = await queryOllamaModelShowInfo(OLLAMA_CLOUD_BASE_URL, OLLAMA_GLM52_CLOUD_MODEL_ID, { apiKey });
	if (typeof showInfo.contextWindow !== "number" && (showInfo.capabilities?.length ?? 0) === 0) return discovered;
	const defaultModel = OLLAMA_CLOUD_DEFAULT_MODELS.find((model) => model.id === OLLAMA_GLM52_CLOUD_MODEL_ID);
	if (!defaultModel) return discovered;
	return {
		...discovered,
		models: [...discovered.models, buildDefaultOllamaCloudModelDefinition(defaultModel)]
	};
}
async function resolveRequestedDynamicOllamaModel(params) {
	const showBaseUrl = readProviderBaseUrl(params.providerConfig) ?? "http://127.0.0.1:11434";
	const showInfo = params.showApiKey ? await queryOllamaModelShowInfo(showBaseUrl, params.modelId, { apiKey: params.showApiKey }) : await queryOllamaModelShowInfo(showBaseUrl, params.modelId);
	if (typeof showInfo.contextWindow !== "number" && (showInfo.capabilities?.length ?? 0) === 0) return;
	const definition = buildOllamaModelDefinition(params.modelId, showInfo.contextWindow, showInfo.capabilities);
	const model = params.capContextTokens ? capLocalOllamaModelContext(definition) : definition;
	return toDynamicOllamaModel({
		provider: params.provider,
		providerConfig: params.providerConfig,
		model
	});
}
async function augmentConfiguredOllamaCatalogModels(params) {
	const models = collectConfiguredOllamaModelIds({
		config: params.config,
		provider: params.provider,
		entries: params.entries
	});
	if (models.length === 0) return [];
	const configuredProvider = resolveConfiguredOllamaProviderConfig({
		config: params.config,
		providerId: params.provider
	});
	const baseUrl = readProviderBaseUrl(configuredProvider) ?? params.defaultBaseUrl;
	const isLocalBaseUrl = isLocalOllamaBaseUrl(baseUrl);
	const showApiKey = readUsableOllamaShowApiKey({
		env: params.env,
		allowAmbientEnvFallback: !isLocalBaseUrl,
		explicitApiKey: configuredProvider?.apiKey,
		resolved: params.resolveProviderApiKey?.(params.provider)
	});
	if (!isLocalBaseUrl && !showApiKey) return [];
	const providerConfig = {
		...configuredProvider,
		models: configuredProvider?.models ?? [],
		baseUrl,
		api: configuredProvider?.api ?? "ollama"
	};
	const entries = [];
	const modelsToProbe = models.slice(0, OLLAMA_CONFIGURED_SHOW_MAX_MODELS);
	for (let index = 0; index < modelsToProbe.length; index += OLLAMA_CONFIGURED_SHOW_CONCURRENCY) {
		const batch = modelsToProbe.slice(index, index + OLLAMA_CONFIGURED_SHOW_CONCURRENCY);
		const rows = await Promise.all(batch.map(async (model) => {
			const requested = await resolveRequestedDynamicOllamaModel({
				provider: params.provider,
				providerConfig,
				modelId: model.id,
				showApiKey,
				capContextTokens: params.capContextTokens
			});
			return requested ? {
				id: requested.id,
				name: model.name ?? requested.name,
				provider: requested.provider,
				api: model.api ?? providerConfig.api,
				reasoning: requested.reasoning,
				input: requested.input,
				contextWindow: requested.contextWindow,
				contextTokens: requested.contextTokens,
				compat: requested.compat
			} : void 0;
		}));
		for (const row of rows) if (row) entries.push(row);
	}
	return entries;
}
const OLLAMA_SHARED_PROVIDER_HOOKS = {
	...buildProviderToolCompatFamilyHooks("llamacpp-gbnf"),
	createStreamFn: ({ config, model, provider }) => {
		if (model.api !== "ollama") return;
		return createConfiguredOllamaStreamFn({
			model,
			providerBaseUrl: readProviderBaseUrl(resolveConfiguredOllamaProviderConfig({
				config,
				providerId: provider
			})) ?? (provider === "ollama-cloud" ? "https://ollama.com" : void 0)
		});
	},
	buildReplayPolicy: ({ modelApi }) => modelApi === "ollama" ? buildNativeOllamaReplayPolicy() : buildOpenAICompatibleReplayPolicy(modelApi),
	resolveReasoningOutputMode: () => "native",
	resolveThinkingProfile,
	wrapStreamFn: createConfiguredOllamaCompatStreamWrapper,
	matchesContextOverflowError: ({ errorMessage }) => matchesOllamaContextOverflowError(errorMessage),
	classifyFailoverReason: ({ errorMessage }) => classifyOllamaFailoverReason(errorMessage)
};
var ollama_default = definePluginEntry({
	id: "ollama",
	name: "Ollama Provider",
	description: "Bundled Ollama provider plugin",
	register(api) {
		const startupPluginConfig = api.pluginConfig ?? {};
		if (api.registrationMode === "full") checkWsl2CrashLoopRisk(api.logger);
		api.registerMemoryEmbeddingProvider(ollamaMemoryEmbeddingProviderAdapter);
		api.registerMediaUnderstandingProvider(ollamaMediaUnderstandingProvider);
		if (startupPluginConfig.nodeInference?.enabled !== false) for (const command of createOllamaNodeHostCommands()) api.registerNodeHostCommand(command);
		api.registerNodeInvokePolicy(createOllamaNodeInvokePolicy());
		api.registerTool(createOllamaNodeInferenceTool(api));
		const resolveCurrentPluginConfig = (config) => {
			const runtimePluginConfig = resolvePluginConfigObject(config, "ollama");
			if (runtimePluginConfig) return runtimePluginConfig;
			return config ? {} : startupPluginConfig;
		};
		api.registerWebSearchProvider(createOllamaWebSearchProvider());
		api.registerProvider({
			id: OLLAMA_CLOUD_PROVIDER_ID,
			label: "Ollama Cloud",
			docsPath: "/providers/ollama",
			envVars: ["OLLAMA_API_KEY"],
			auth: [createProviderApiKeyAuthMethod({
				providerId: OLLAMA_CLOUD_PROVIDER_ID,
				methodId: "api-key",
				label: "Ollama Cloud API key",
				hint: "Hosted models via ollama.com",
				optionKey: "ollamaCloudApiKey",
				flagName: "--ollama-cloud-api-key",
				envVar: "OLLAMA_API_KEY",
				promptMessage: "Enter Ollama Cloud API key",
				defaultModel: OLLAMA_CLOUD_DEFAULT_MODEL_REF,
				noteTitle: "Ollama Cloud",
				noteMessage: "Manage API keys at https://ollama.com/settings/keys",
				wizard: {
					choiceId: "ollama-cloud",
					choiceLabel: "Ollama Cloud",
					choiceHint: "Hosted models via ollama.com",
					groupId: "ollama",
					groupLabel: "Ollama",
					groupHint: "Cloud and local open models"
				}
			})],
			catalog: {
				order: "simple",
				run: async (ctx) => {
					const resolvedAuth = ctx.resolveProviderApiKey(OLLAMA_CLOUD_PROVIDER_ID);
					const apiKey = resolvedAuth.apiKey ?? resolvedAuth.discoveryApiKey;
					if (!apiKey) return null;
					return { provider: {
						...await buildOllamaCloudProvider(readUsableOllamaShowApiKey({
							env: ctx.env,
							allowAmbientEnvFallback: true,
							resolved: resolvedAuth
						})),
						apiKey
					} };
				}
			},
			staticCatalog: {
				order: "simple",
				run: async () => ({ provider: buildStaticOllamaCloudProvider() })
			},
			...OLLAMA_SHARED_PROVIDER_HOOKS,
			resolveDynamicModel: ({ provider, modelId }) => {
				const cloudProvider = buildStaticOllamaCloudProvider();
				const model = cloudProvider.models?.find((entry) => entry.id === modelId);
				return model ? toDynamicOllamaModel({
					provider,
					providerConfig: cloudProvider,
					model
				}) : void 0;
			},
			augmentModelCatalog: async (ctx) => await augmentConfiguredOllamaCatalogModels({
				config: ctx.config,
				defaultBaseUrl: OLLAMA_CLOUD_BASE_URL,
				env: ctx.env,
				provider: OLLAMA_CLOUD_PROVIDER_ID,
				entries: ctx.entries,
				resolveProviderApiKey: ctx.resolveProviderApiKey
			}),
			buildUnknownModelHint: () => "Ollama Cloud requires an API key. Set OLLAMA_API_KEY or run \"openclaw onboard --auth-choice ollama-cloud\". See: https://docs.openclaw.ai/providers/ollama"
		});
		api.registerProvider({
			id: OLLAMA_PROVIDER_ID,
			label: "Ollama",
			docsPath: "/providers/ollama",
			envVars: ["OLLAMA_API_KEY"],
			auth: [{
				id: "local",
				label: "Ollama",
				hint: "Connect to an Ollama server and select a cloud or local model",
				kind: "custom",
				appGuidedSetup: {
					detectAvailability: detectAppGuidedOllamaAvailability,
					detect: async (ctx) => {
						const discovered = await discoverAppGuidedOllamaModel(ctx);
						if (!discovered) return null;
						return {
							modelRef: `${OLLAMA_PROVIDER_ID}/${discovered.model.id}`,
							detail: `${discovered.model.id} at ${discovered.provider.baseUrl}`
						};
					},
					prepare: async (ctx) => {
						const discovered = await discoverAppGuidedOllamaModel(ctx, { modelRef: ctx.modelRef });
						const prefix = `${OLLAMA_PROVIDER_ID}/`;
						if (!discovered || !ctx.modelRef.startsWith(prefix)) return null;
						if (ctx.modelRef.slice(prefix.length) !== discovered.model.id) return null;
						const ownerAccess = { apiKey: discovered.ownerValue };
						return {
							profiles: [],
							defaultModel: ctx.modelRef,
							configPatch: { models: {
								mode: ctx.config.models?.mode ?? "merge",
								providers: { [OLLAMA_PROVIDER_ID]: {
									...discovered.existing,
									...discovered.provider,
									...ownerAccess,
									models: discovered.provider.models
								} }
							} }
						};
					}
				},
				run: async (ctx) => {
					const result = await promptAndConfigureOllama({
						cfg: ctx.config,
						env: ctx.env,
						opts: ctx.opts,
						prompter: ctx.prompter,
						...ctx.signal ? { signal: ctx.signal } : {},
						secretInputMode: ctx.secretInputMode,
						allowSecretRefPrompt: ctx.allowSecretRefPrompt
					});
					return {
						profiles: [{
							profileId: "ollama:default",
							credential: buildApiKeyCredential(OLLAMA_PROVIDER_ID, result.credential, void 0, result.credentialMode ? {
								secretInputMode: result.credentialMode,
								config: ctx.config
							} : void 0)
						}],
						configPatch: result.config,
						...result.defaultModel ? { defaultModel: result.defaultModel } : {}
					};
				},
				validateNonInteractive: validateOllamaNonInteractive,
				runNonInteractive: async (ctx) => {
					return await configureOllamaNonInteractive({
						nextConfig: ctx.config,
						opts: {
							customBaseUrl: ctx.opts.customBaseUrl,
							customModelId: ctx.opts.customModelId
						},
						runtime: ctx.runtime,
						agentDir: ctx.agentDir
					});
				}
			}],
			catalog: {
				order: "late",
				run: async (ctx) => await resolveOllamaDiscoveryResult({
					ctx,
					pluginConfig: resolveCurrentPluginConfig(ctx.config),
					buildProvider: buildLocalOllamaProvider
				})
			},
			wizard: {
				setup: {
					choiceId: "ollama",
					choiceLabel: "Ollama",
					choiceHint: "Connect to an Ollama server and select a cloud or local model",
					groupId: "ollama",
					groupLabel: "Ollama",
					groupHint: "Cloud and local open models",
					methodId: "local",
					modelSelection: {
						promptWhenAuthChoiceProvided: true,
						allowKeepCurrent: false
					}
				},
				modelPicker: {
					label: "Ollama (custom)",
					hint: "Detect models from a local or remote Ollama instance",
					methodId: "local"
				}
			},
			onModelSelected: async ({ config, model, prompter }) => {
				if (!model.startsWith("ollama/")) return;
				await ensureOllamaModelPulled({
					config,
					model,
					prompter
				});
			},
			...OLLAMA_SHARED_PROVIDER_HOOKS,
			augmentModelCatalog: async (ctx) => await augmentConfiguredOllamaCatalogModels({
				config: ctx.config,
				defaultBaseUrl: OLLAMA_DEFAULT_BASE_URL,
				env: ctx.env,
				provider: OLLAMA_PROVIDER_ID,
				entries: ctx.entries,
				resolveProviderApiKey: ctx.resolveProviderApiKey,
				capContextTokens: true
			}),
			createEmbeddingProvider: async ({ config, model, provider: embeddingProvider, remote }) => {
				const { provider, client } = await createOllamaEmbeddingProvider({
					config,
					remote,
					model: model || "nomic-embed-text",
					provider: embeddingProvider || "ollama"
				});
				return {
					...provider,
					client
				};
			},
			resolveSyntheticAuth: ({ provider, providerConfig }) => {
				if (!shouldUseSyntheticOllamaAuth(providerConfig)) return;
				return {
					apiKey: OLLAMA_DEFAULT_API_KEY,
					source: `models.providers.${provider ?? "ollama"} (synthetic local key)`,
					mode: "api-key"
				};
			},
			shouldDeferSyntheticProfileAuth: ({ resolvedApiKey }) => resolvedApiKey?.trim() === OLLAMA_DEFAULT_API_KEY,
			prepareDynamicModel: async (ctx) => {
				const providerConfig = resolveConfiguredOllamaProviderConfig({
					config: ctx.config,
					providerId: ctx.provider
				});
				if (!hasOllamaDiscoverySignal(providerConfig)) return;
				const baseUrl = readProviderBaseUrl(providerConfig);
				const managedSecretScope = buildDynamicManagedSecretScope(ctx.provider, baseUrl, providerConfig?.apiKey);
				let dynamicCacheKey = buildDynamicCacheKey(ctx.provider, baseUrl, providerConfig?.apiKey, ctx.config);
				let discoveryApiKey;
				if (providerConfig?.apiKey !== void 0 && providerConfig.apiKey !== null) {
					const resolved = await resolveConfiguredSecretInputString({
						config: ctx.config ?? {},
						env: process.env,
						value: providerConfig.apiKey,
						path: `models.providers.${ctx.provider}.apiKey`,
						unresolvedReasonStyle: "detailed"
					});
					if (resolved.unresolvedRefReason) {
						dynamicModelCache.delete(dynamicCacheKey);
						if (managedSecretScope && ctx.config) dynamicManagedCredentialFingerprints.get(ctx.config)?.delete(managedSecretScope);
						return;
					}
					const resolvedApiKey = readConfiguredOllamaApiKey(resolved.value);
					const configuredSecretRef = coerceSecretRef(providerConfig.apiKey);
					discoveryApiKey = configuredSecretRef ? resolvedApiKey : resolvedApiKey === "OLLAMA_API_KEY" ? readConcreteOllamaApiKey(process.env.OLLAMA_API_KEY) : readConcreteOllamaApiKey(resolvedApiKey);
					if (configuredSecretRef && !discoveryApiKey) {
						dynamicModelCache.delete(dynamicCacheKey);
						if (managedSecretScope && ctx.config) dynamicManagedCredentialFingerprints.get(ctx.config)?.delete(managedSecretScope);
						return;
					}
				} else if (!isLocalOllamaBaseUrl(baseUrl)) discoveryApiKey = readConcreteOllamaApiKey(process.env.OLLAMA_API_KEY);
				if (managedSecretScope && ctx.config && discoveryApiKey) {
					let fingerprints = dynamicManagedCredentialFingerprints.get(ctx.config);
					if (!fingerprints) {
						fingerprints = /* @__PURE__ */ new Map();
						dynamicManagedCredentialFingerprints.set(ctx.config, fingerprints);
					}
					const resolvedCredentialFingerprint = createHash("sha256").update(discoveryApiKey).digest("hex");
					if (fingerprints.has(managedSecretScope) && fingerprints.get(managedSecretScope) !== resolvedCredentialFingerprint) dynamicModelCache.delete(dynamicCacheKey);
					fingerprints.set(managedSecretScope, resolvedCredentialFingerprint);
					dynamicCacheKey = buildDynamicCacheKey(ctx.provider, baseUrl, providerConfig?.apiKey, ctx.config);
				}
				const provider = await buildLocalOllamaProvider(baseUrl, {
					quiet: true,
					...discoveryApiKey ? { apiKey: discoveryApiKey } : {}
				});
				const dynamicApi = providerConfig?.api ?? provider.api;
				const dynamicProvider = {
					...provider,
					baseUrl: resolveOllamaRuntimeBaseUrl({
						api: dynamicApi,
						configuredBaseUrl: baseUrl,
						discoveredBaseUrl: provider.baseUrl
					}),
					api: dynamicApi
				};
				const dynamicModels = (dynamicProvider.models ?? []).map((model) => toDynamicOllamaModel({
					provider: ctx.provider,
					providerConfig: dynamicProvider,
					model
				}));
				if (!dynamicModels.some((model) => model.id === ctx.modelId)) {
					const requestedModel = await resolveRequestedDynamicOllamaModel({
						provider: ctx.provider,
						providerConfig: dynamicProvider,
						modelId: ctx.modelId,
						showApiKey: discoveryApiKey,
						capContextTokens: true
					});
					if (requestedModel) dynamicModels.push(requestedModel);
				}
				dynamicModelCache.set(dynamicCacheKey, dynamicModels);
			},
			resolveDynamicModel: (ctx) => {
				const providerConfig = resolveConfiguredOllamaProviderConfig({
					config: ctx.config,
					providerId: ctx.provider
				});
				return dynamicModelCache.get(buildDynamicCacheKey(ctx.provider, readProviderBaseUrl(providerConfig), providerConfig?.apiKey, ctx.config))?.find((model) => model.id === ctx.modelId);
			},
			buildUnknownModelHint: () => "Ollama requires authentication to be registered as a provider. Set OLLAMA_API_KEY=\"ollama-local\" (any value works) or run \"openclaw configure\". See: https://docs.openclaw.ai/providers/ollama"
		});
	}
});
//#endregion
export { ollama_default as default };
