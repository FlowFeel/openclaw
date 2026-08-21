import { r as toErrorObject } from "./error-coercion-CrJRoLe1.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { r as fetchWithSsrFGuard } from "./fetch-guard-CE5RRhcq.js";
import { m as readProviderJsonResponse } from "./provider-http-errors-Cj7zfu8U.js";
import { c as isNonSecretApiKeyMarker } from "./model-auth-markers-z4js65k2.js";
import { t as normalizeOptionalSecretInput } from "./normalize-secret-input-Df_qhWv_.js";
import { l as upsertAuthProfileWithLock } from "./profiles-Hfbx6aWI.js";
import "./provider-auth-SalgjzRl.js";
import { i as normalizeApiKeyInput, n as ensureApiKeyFromOptionEnvOrPrompt, s as validateApiKeyInput } from "./provider-auth-input-BZW5CuzH.js";
import "./error-runtime-Dbl9_3mW.js";
import { t as expectDefined } from "./expect-runtime--WgnKYXT.js";
import { n as applyAgentDefaultModelPrimary } from "./provider-onboard-DwmQBy2F.js";
import { f as selectPreferredLocalModelId } from "./provider-model-shared-DPyoH6xD.js";
import { t as WizardCancelledError } from "./prompts-B0iOB1_a.js";
import "./setup-oCHSAPND.js";
import "./ssrf-runtime-BKWYxujx.js";
import "./provider-http-BV0argQa.js";
import { c as OLLAMA_DEFAULT_MODEL, i as OLLAMA_DEFAULT_BASE_URL, l as OLLAMA_DOCKER_HOST_BASE_URL, n as OLLAMA_CLOUD_DEFAULT_MODELS, t as OLLAMA_CLOUD_BASE_URL } from "./defaults-h8fOLDCy.js";
import { _ as resolveOllamaApiBase, d as fetchOllamaModels, f as isOllamaCloudModel, g as readOllamaModelShowInfo, i as buildOllamaModelDefinition, l as enrichOllamaModelsWithContext, n as buildDefaultOllamaCloudModelDefinition, r as buildOllamaBaseUrlSsrFPolicy, t as readProviderBaseUrl } from "./provider-base-url-D9XsktX-.js";
import { t as checkNdjsonRecordCap } from "./stream-ndjson-cap-D0o3ZPYU.js";
//#region extensions/ollama/src/setup-model-selection.ts
const OLLAMA_CONTEXT_ENRICH_LIMIT = 200;
const OLLAMA_TOOLS_SCAN_CONCURRENCY = 8;
const OLLAMA_APP_GUIDED_MIN_CONTEXT_TOKENS = 16384;
function normalizeOllamaModelName(value) {
	const trimmed = value?.trim();
	if (!trimmed) return;
	return trimmed.toLowerCase().startsWith("ollama/") ? trimmed.slice(7).trim() || void 0 : trimmed;
}
function getOllamaLatestDedupeKey(name) {
	const normalized = name.trim().toLowerCase();
	return normalized.endsWith(":latest") ? normalized.slice(0, -7) : normalized;
}
function mergeUniqueModelNames(...groups) {
	const mergedByKey = /* @__PURE__ */ new Map();
	for (const group of groups) for (const name of group) {
		const key = getOllamaLatestDedupeKey(name);
		const existing = mergedByKey.get(key);
		if (existing === void 0 || !existing.trim().toLowerCase().endsWith(":latest") && name.trim().toLowerCase().endsWith(":latest")) mergedByKey.set(key, name);
	}
	return [...mergedByKey.values()];
}
function findAvailableOllamaModelName(modelName, availableModelNames) {
	const wantedKey = getOllamaLatestDedupeKey(modelName);
	for (const available of availableModelNames) if (getOllamaLatestDedupeKey(available) === wantedKey) return available;
}
function orderPreferredOllamaModelIds(modelIds) {
	const remaining = [...modelIds];
	const ordered = [];
	while (remaining.length > 0) {
		const preferredId = selectPreferredLocalModelId(remaining);
		const preferredIndex = preferredId ? remaining.indexOf(preferredId) : 0;
		const [candidate] = remaining.splice(Math.max(preferredIndex, 0), 1);
		if (candidate) ordered.push(candidate);
	}
	return ordered;
}
function selectAppGuidedOllamaModelId(models) {
	return orderPreferredOllamaModelIds([...models].filter((model) => model.supportsTools === true && model.contextWindow !== void 0 && model.contextWindow >= 16384).map((model) => model.id))[0];
}
function buildOllamaModelsConfig(modelNames, discoveredModelsByName, defaultModels = []) {
	return modelNames.map((name) => {
		const discovered = discoveredModelsByName?.get(name);
		const defaultModel = defaultModels.find((model) => model.id === name);
		if (defaultModel && !discovered) return buildDefaultOllamaCloudModelDefinition(defaultModel);
		const capabilities = discovered?.capabilities ?? (defaultModel ? [...defaultModel.capabilities] : void 0);
		return buildOllamaModelDefinition(name, discovered?.contextWindow ?? defaultModel?.contextWindow, capabilities, { showInspectionFailed: discovered?.showInspectionFailed });
	});
}
async function inspectOllamaModelsForSetup(baseUrl, models, signal) {
	const apiBase = resolveOllamaApiBase(baseUrl);
	const inspected = [];
	const inspectionFailures = [];
	for (let index = 0; index < models.length; index += OLLAMA_TOOLS_SCAN_CONCURRENCY) {
		signal?.throwIfAborted();
		const batch = models.slice(index, index + OLLAMA_TOOLS_SCAN_CONCURRENCY);
		const results = await Promise.all(batch.map(async (model) => {
			try {
				const showInfo = await readOllamaModelShowInfo(apiBase, model.name, {
					timeoutMs: 3e3,
					signal,
					auditContext: "ollama-setup.tools-scan"
				});
				return Object.assign({}, model, showInfo);
			} catch (error) {
				signal?.throwIfAborted();
				inspectionFailures.push(`${model.name}: ${formatErrorMessage(error)}`);
				return Object.assign({}, model, { showInspectionFailed: true });
			}
		}));
		inspected.push(...results);
	}
	return {
		inspected,
		inspectionFailures
	};
}
async function discoverOllamaModelsForSetup(params) {
	const { reachable, models } = await fetchOllamaModels(params.baseUrl);
	const firstModels = models.slice(0, OLLAMA_CONTEXT_ENRICH_LIMIT);
	const inspection = !reachable ? {
		inspected: [],
		inspectionFailures: []
	} : params.inspectTools ? await inspectOllamaModelsForSetup(params.baseUrl, firstModels, params.signal) : {
		inspected: await enrichOllamaModelsWithContext(params.baseUrl, firstModels),
		inspectionFailures: []
	};
	if (params.inspectTools && !inspection.inspected.some((model) => model.capabilities?.includes("tools")) && models.length > OLLAMA_CONTEXT_ENRICH_LIMIT) {
		const remainingScan = await inspectOllamaModelsForSetup(params.baseUrl, models.slice(OLLAMA_CONTEXT_ENRICH_LIMIT), params.signal);
		inspection.inspected.push(...remainingScan.inspected);
		inspection.inspectionFailures.push(...remainingScan.inspectionFailures);
	}
	return {
		reachable,
		models,
		inspectedModels: inspection.inspected,
		discoveredModelsByName: new Map(inspection.inspected.map((model) => [model.name, model])),
		inspectionFailures: inspection.inspectionFailures,
		hasToolsCapableModel: inspection.inspected.some((model) => model.capabilities?.includes("tools"))
	};
}
//#endregion
//#region extensions/ollama/src/setup-pull.ts
const OLLAMA_PULL_RESPONSE_TIMEOUT_MS = 3e4;
const OLLAMA_PULL_STREAM_IDLE_TIMEOUT_MS = 3e5;
function formatOllamaPullStatus(status) {
	const trimmed = status.trim();
	const partStatusMatch = trimmed.match(/^([a-z-]+)\s+(?:sha256:)?[a-f0-9]{8,}$/i);
	if (partStatusMatch) return {
		text: `${partStatusMatch[1]} part`,
		hidePercent: false
	};
	const hidePercent = /^verifying\b.*\bdigest\b/i.test(trimmed);
	return {
		text: hidePercent ? "verifying digest" : trimmed,
		hidePercent
	};
}
async function readOllamaPullChunkWithIdleTimeout(reader) {
	return await new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reader.cancel().catch(() => void 0);
			reject(/* @__PURE__ */ new Error(`Ollama pull stalled: no data received for ${Math.round(OLLAMA_PULL_STREAM_IDLE_TIMEOUT_MS / 1e3)}s`));
		}, OLLAMA_PULL_STREAM_IDLE_TIMEOUT_MS);
		reader.read().then(resolve, (error) => reject(toErrorObject(error, "Non-Error rejection"))).finally(() => clearTimeout(timeoutId));
	});
}
async function pullOllamaModelCore(params) {
	const baseUrl = resolveOllamaApiBase(params.baseUrl);
	const modelName = normalizeOllamaModelName(params.modelName) ?? params.modelName.trim();
	const responseController = new AbortController();
	const responseTimeout = setTimeout(responseController.abort.bind(responseController), OLLAMA_PULL_RESPONSE_TIMEOUT_MS);
	try {
		params.signal?.throwIfAborted();
		const { response, release } = await fetchWithSsrFGuard({
			url: `${baseUrl}/api/pull`,
			init: {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ model: modelName })
			},
			signal: params.signal ? AbortSignal.any([responseController.signal, params.signal]) : responseController.signal,
			policy: buildOllamaBaseUrlSsrFPolicy(baseUrl),
			auditContext: "ollama-setup.pull"
		});
		clearTimeout(responseTimeout);
		try {
			if (!response.ok) {
				response.body?.cancel().catch(() => void 0);
				return {
					ok: false,
					message: `Failed to download ${modelName} (HTTP ${response.status})`
				};
			}
			if (!response.body) return {
				ok: false,
				message: `Failed to download ${modelName} (no response body)`
			};
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";
			let pendingRecordBytes = 0;
			const layers = /* @__PURE__ */ new Map();
			const parseLine = (line) => {
				if (!line.trim()) return;
				try {
					const chunk = JSON.parse(line);
					if (chunk.error) return {
						ok: false,
						message: `Download failed: ${chunk.error}`
					};
					if (!chunk.status || chunk.status === "success") return chunk.status ? { ok: true } : void 0;
					if (chunk.total && chunk.completed !== void 0) {
						layers.set(chunk.status, {
							total: chunk.total,
							completed: chunk.completed
						});
						const totals = {
							total: 0,
							completed: 0
						};
						for (const layer of layers.values()) {
							totals.total += layer.total;
							totals.completed += layer.completed;
						}
						params.onStatus?.(chunk.status, totals.total > 0 ? Math.round(totals.completed / totals.total * 100) : null);
					} else params.onStatus?.(chunk.status, null);
				} catch {}
			};
			try {
				for (;;) {
					const { done, value } = await readOllamaPullChunkWithIdleTimeout(reader);
					if (done) {
						const terminal = parseLine(buffer);
						if (terminal) return terminal;
						throw new Error("pull stream ended before success");
					}
					pendingRecordBytes = checkNdjsonRecordCap(value, pendingRecordBytes);
					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";
					for (const line of lines) {
						const parsed = parseLine(line);
						if (parsed) return parsed;
					}
				}
			} finally {
				reader.cancel().catch(() => void 0);
				reader.releaseLock();
			}
		} finally {
			await release();
		}
	} catch (err) {
		return {
			ok: false,
			message: `Failed to download ${modelName}: ${formatErrorMessage(err)}`
		};
	} finally {
		clearTimeout(responseTimeout);
	}
}
async function pullOllamaModel(baseUrl, modelName, prompter, signal) {
	const spinner = prompter.progress(`Downloading ${modelName}...`);
	const result = await pullOllamaModelCore({
		baseUrl,
		modelName,
		...signal ? { signal } : {},
		onStatus: (status, percent) => {
			const displayStatus = formatOllamaPullStatus(status);
			const progress = displayStatus.hidePercent ? "" : ` - ${percent ?? 0}%`;
			spinner.update(`Downloading ${modelName} - ${displayStatus.text}${progress}`);
		}
	});
	spinner.stop(result.ok ? `Downloaded ${modelName}` : result.message);
	return result.ok;
}
async function pullOllamaModelNonInteractive(baseUrl, modelName, runtime) {
	runtime.log(`Downloading ${modelName}...`);
	const result = await pullOllamaModelCore({
		baseUrl,
		modelName
	});
	if (result.ok) runtime.log(`Downloaded ${modelName}`);
	else runtime.error(result.message);
	return result.ok;
}
//#endregion
//#region extensions/ollama/src/setup.ts
const OLLAMA_SUGGESTED_MODELS_LOCAL = [OLLAMA_DEFAULT_MODEL];
const OLLAMA_SUGGESTED_MODELS_CLOUD = OLLAMA_CLOUD_DEFAULT_MODELS.map((model) => model.id);
const OLLAMA_SUGGESTED_MODELS_LOCAL_CLOUD = OLLAMA_CLOUD_DEFAULT_MODELS.map((model) => `${model.id}:cloud`);
const OLLAMA_CLOUD_MAX_DISCOVERED_MODELS = 500;
const OLLAMA_RECOMMENDED_TOOLS_MODEL = "gemma4:e4b";
const OLLAMA_RECOMMENDED_TOOLS_MODEL_SIZE = "about 9.6 GB";
function isTruthyEnvValue(value) {
	return [
		"1",
		"true",
		"yes",
		"on"
	].includes(value?.trim().toLowerCase() ?? "");
}
function resolveOllamaSetupDefaultBaseUrl(env = process.env) {
	return isTruthyEnvValue(env.OPENCLAW_DOCKER_SETUP) ? OLLAMA_DOCKER_HOST_BASE_URL : OLLAMA_DEFAULT_BASE_URL;
}
const HOST_BACKED_OLLAMA_MODE_CONFIG = {
	"cloud-local": {
		includeCloudModels: true,
		noteTitle: "Ollama Cloud + Local"
	},
	"local-only": {
		includeCloudModels: false,
		noteTitle: "Ollama"
	}
};
function buildOllamaUnreachableLines(baseUrl, retry) {
	return [
		`Ollama could not be reached at ${baseUrl}.`,
		"Start or restart the Ollama server for this address.",
		"If Ollama is not installed on that machine, download it at https://ollama.com/download",
		...retry ? ["", "Continue when it is running. OpenClaw will retry this address."] : []
	];
}
function buildOllamaCloudSigninLines(signinUrl) {
	return [
		"Cloud models on this Ollama host need `ollama signin`.",
		signinUrl ?? "Run `ollama signin` on the configured Ollama host.",
		"",
		"Continuing with local models only for now."
	];
}
async function checkOllamaCloudAuth(baseUrl) {
	try {
		const apiBase = resolveOllamaApiBase(baseUrl);
		const { response, release } = await fetchWithSsrFGuard({
			url: `${apiBase}/api/me`,
			init: { method: "POST" },
			timeoutMs: 5e3,
			policy: buildOllamaBaseUrlSsrFPolicy(apiBase),
			auditContext: "ollama-setup.me"
		});
		try {
			if (response.status === 401) return {
				signedIn: false,
				signinUrl: (await readProviderJsonResponse(response, "ollama.cloud-auth")).signin_url
			};
			if (!response.ok) return { signedIn: false };
			return { signedIn: true };
		} finally {
			response.body?.cancel().catch(() => void 0);
			await release();
		}
	} catch {
		return { signedIn: false };
	}
}
async function promptForOllamaCloudCredential(params) {
	const captured = {};
	const optionToken = normalizeOptionalSecretInput(params.opts?.ollamaApiKey);
	const discoveryApiKey = await ensureApiKeyFromOptionEnvOrPrompt({
		token: optionToken ?? normalizeOptionalSecretInput(params.opts?.token),
		tokenProvider: optionToken ? "ollama" : normalizeOptionalSecretInput(params.opts?.tokenProvider),
		secretInputMode: params.allowSecretRefPrompt === false ? params.secretInputMode ?? "plaintext" : params.secretInputMode,
		config: params.cfg,
		env: params.env,
		expectedProviders: ["ollama"],
		provider: "ollama",
		envLabel: "OLLAMA_API_KEY",
		promptMessage: "Ollama API key",
		normalize: normalizeApiKeyInput,
		validate: validateApiKeyInput,
		prompter: params.prompter,
		setCredential: async (apiKey, mode) => {
			captured.credential = apiKey;
			captured.credentialMode = mode;
		}
	});
	if (!captured.credential) throw new Error("Missing Ollama API key input.");
	if (typeof captured.credential === "string" && isNonSecretApiKeyMarker(captured.credential, { includeEnvVarName: false })) throw new Error("Cloud-only Ollama setup requires a real OLLAMA_API_KEY.");
	return {
		credential: captured.credential,
		credentialMode: captured.credentialMode,
		discoveryApiKey
	};
}
function applyOllamaProviderConfig(cfg, baseUrl, modelNames, discoveredModelsByName, apiKey = "OLLAMA_API_KEY", defaultModels = []) {
	return {
		...cfg,
		models: {
			...cfg.models,
			mode: cfg.models?.mode ?? "merge",
			providers: {
				...cfg.models?.providers,
				ollama: {
					baseUrl,
					api: "ollama",
					apiKey,
					models: buildOllamaModelsConfig(modelNames, discoveredModelsByName, defaultModels)
				}
			}
		}
	};
}
async function storeOllamaCredential(agentDir) {
	await upsertAuthProfileWithLock({
		profileId: "ollama:default",
		credential: {
			type: "api_key",
			provider: "ollama",
			key: "ollama-local"
		},
		agentDir
	});
}
async function promptForOllamaBaseUrl(prompter, env = process.env) {
	const defaultBaseUrl = resolveOllamaSetupDefaultBaseUrl(env);
	return resolveOllamaApiBase((await prompter.text({
		message: "Ollama base URL",
		initialValue: defaultBaseUrl,
		placeholder: defaultBaseUrl,
		validate: (value) => value?.trim() ? void 0 : "Required"
	}) ?? defaultBaseUrl).trim().replace(/\/+$/, ""));
}
async function resolveHostBackedSuggestedModelNames(params) {
	const modeConfig = HOST_BACKED_OLLAMA_MODE_CONFIG[params.mode];
	if (!modeConfig.includeCloudModels) return OLLAMA_SUGGESTED_MODELS_LOCAL;
	const auth = await checkOllamaCloudAuth(params.baseUrl);
	if (auth.signedIn) return mergeUniqueModelNames(OLLAMA_SUGGESTED_MODELS_LOCAL, OLLAMA_SUGGESTED_MODELS_LOCAL_CLOUD);
	await params.prompter.note(buildOllamaCloudSigninLines(auth.signinUrl).join("\n"), modeConfig.noteTitle);
	return OLLAMA_SUGGESTED_MODELS_LOCAL;
}
async function promptAndConfigureHostBackedOllama(params) {
	const baseUrl = await promptForOllamaBaseUrl(params.prompter, params.env);
	let discovery = await discoverOllamaModelsForSetup({
		baseUrl,
		inspectTools: true,
		...params.signal ? { signal: params.signal } : {}
	});
	if (!discovery.reachable) {
		await params.prompter.note(buildOllamaUnreachableLines(baseUrl, true).join("\n"), "Ollama");
		if (!await params.prompter.confirm({
			message: "Retry this Ollama address now?",
			initialValue: true
		})) throw new WizardCancelledError("Ollama setup cancelled");
		params.signal?.throwIfAborted();
		discovery = await discoverOllamaModelsForSetup({
			baseUrl,
			inspectTools: true,
			...params.signal ? { signal: params.signal } : {}
		});
	}
	if (!discovery.reachable) throw new WizardCancelledError(`Ollama is still not reachable at ${baseUrl}`);
	const { models, inspectedModels, discoveredModelsByName, inspectionFailures, hasToolsCapableModel } = discovery;
	if (inspectionFailures.length > 0) await params.prompter.note([
		"Some installed models could not be inspected and were skipped:",
		...inspectionFailures.slice(0, 5).map((line) => `- ${line}`),
		...inspectionFailures.length > 5 ? [`…and ${inspectionFailures.length - 5} more`] : []
	].join("\n"), "Ollama");
	let discoveredModelNames = models.map((model) => model.name);
	const inspectionUsable = inspectedModels.length === 0 || inspectionFailures.length < inspectedModels.length;
	if (!hasToolsCapableModel && inspectionUsable) {
		if (await params.prompter.confirm({
			message: `No tools-capable Ollama model is installed. Pull ${OLLAMA_RECOMMENDED_TOOLS_MODEL} (${OLLAMA_RECOMMENDED_TOOLS_MODEL_SIZE})?`,
			initialValue: false
		})) {
			if (!await pullOllamaModel(baseUrl, OLLAMA_RECOMMENDED_TOOLS_MODEL, params.prompter, params.signal)) throw new WizardCancelledError("Failed to download recommended Ollama model");
			params.signal?.throwIfAborted();
			const recommendedScan = await inspectOllamaModelsForSetup(baseUrl, [{ name: OLLAMA_RECOMMENDED_TOOLS_MODEL }], params.signal);
			if (recommendedScan.inspectionFailures.length > 0) throw new WizardCancelledError(`Failed to verify pulled Ollama model: ${recommendedScan.inspectionFailures[0]}`);
			const [recommendedModel] = recommendedScan.inspected;
			if (recommendedModel) discoveredModelsByName.set(recommendedModel.name, recommendedModel);
			discoveredModelNames = mergeUniqueModelNames(discoveredModelNames, [OLLAMA_RECOMMENDED_TOOLS_MODEL]);
		}
	}
	const suggestedModelNames = await resolveHostBackedSuggestedModelNames({
		mode: params.mode,
		baseUrl,
		prompter: params.prompter
	});
	const localDefaultModelId = selectAppGuidedOllamaModelId([...discoveredModelsByName.values()].map((model) => ({
		id: model.name,
		contextWindow: model.contextWindow,
		supportsTools: model.capabilities?.includes("tools") === true
	})));
	const cloudDefaultModelId = suggestedModelNames.find(isOllamaCloudModel);
	const defaultModelId = localDefaultModelId ?? cloudDefaultModelId;
	return {
		credential: "ollama-local",
		...defaultModelId ? { defaultModel: `ollama/${defaultModelId}` } : {},
		config: applyOllamaProviderConfig(params.cfg, baseUrl, mergeUniqueModelNames(suggestedModelNames, discoveredModelNames), discoveredModelsByName)
	};
}
async function promptAndConfigureOllama(params) {
	const mode = await params.prompter.select({
		message: "Ollama mode",
		options: [
			{
				value: "cloud-local",
				label: "Cloud + Local",
				hint: "Route cloud and local models through your Ollama host"
			},
			{
				value: "cloud-only",
				label: "Cloud only",
				hint: "Hosted Ollama models via ollama.com"
			},
			{
				value: "local-only",
				label: "Local only",
				hint: "Local models only"
			}
		]
	});
	if (mode === "cloud-only") {
		const { credential, credentialMode, discoveryApiKey } = await promptForOllamaCloudCredential({
			cfg: params.cfg,
			env: params.env,
			opts: params.opts,
			prompter: params.prompter,
			secretInputMode: params.secretInputMode,
			allowSecretRefPrompt: params.allowSecretRefPrompt
		});
		const { models: rawDiscoveredModels } = await fetchOllamaModels(OLLAMA_CLOUD_BASE_URL, { apiKey: discoveryApiKey });
		const discoveredModelNames = rawDiscoveredModels.slice(0, OLLAMA_CLOUD_MAX_DISCOVERED_MODELS).map((model) => model.name);
		const modelNames = discoveredModelNames.length > 0 ? mergeUniqueModelNames(OLLAMA_SUGGESTED_MODELS_CLOUD, discoveredModelNames) : OLLAMA_SUGGESTED_MODELS_CLOUD;
		const defaultModelId = modelNames[0];
		return {
			credential,
			credentialMode,
			...defaultModelId ? { defaultModel: `ollama/${defaultModelId}` } : {},
			config: applyOllamaProviderConfig(params.cfg, OLLAMA_CLOUD_BASE_URL, modelNames, void 0, credential, OLLAMA_CLOUD_DEFAULT_MODELS)
		};
	}
	return await promptAndConfigureHostBackedOllama({
		cfg: params.cfg,
		mode,
		prompter: params.prompter,
		env: params.env,
		...params.signal ? { signal: params.signal } : {}
	});
}
async function configureOllamaNonInteractive(params) {
	const baseUrl = resolveOllamaApiBase((params.opts.customBaseUrl?.trim() || resolveOllamaSetupDefaultBaseUrl()).replace(/\/+$/, ""));
	const { reachable, models, discoveredModelsByName } = await discoverOllamaModelsForSetup({ baseUrl });
	const explicitModel = normalizeOllamaModelName(params.opts.customModelId);
	if (!reachable) {
		params.runtime.error(buildOllamaUnreachableLines(baseUrl, false).join("\n"));
		params.runtime.exit(1);
		return params.nextConfig;
	}
	const modelNames = models.map((model) => model.name);
	const orderedModelNames = mergeUniqueModelNames(OLLAMA_SUGGESTED_MODELS_LOCAL.filter((modelName) => findAvailableOllamaModelName(modelName, modelNames) !== void 0), modelNames);
	const requestedDefaultModelId = explicitModel ?? expectDefined(OLLAMA_SUGGESTED_MODELS_LOCAL[0], "default suggested Ollama model");
	const availableModelNames = new Set(modelNames);
	const availableDefaultModelId = findAvailableOllamaModelName(requestedDefaultModelId, availableModelNames);
	const requestedCloudModel = isOllamaCloudModel(requestedDefaultModelId);
	let pulledRequestedModel = false;
	if (requestedCloudModel) availableModelNames.add(requestedDefaultModelId);
	else if (!availableDefaultModelId) {
		pulledRequestedModel = await pullOllamaModelNonInteractive(baseUrl, requestedDefaultModelId, params.runtime);
		if (pulledRequestedModel) availableModelNames.add(requestedDefaultModelId);
	}
	let allModelNames = orderedModelNames;
	let defaultModelId = availableDefaultModelId ?? requestedDefaultModelId;
	if ((pulledRequestedModel || requestedCloudModel) && !allModelNames.includes(requestedDefaultModelId)) allModelNames = [...allModelNames, requestedDefaultModelId];
	if (!findAvailableOllamaModelName(defaultModelId, availableModelNames)) {
		if (availableModelNames.size === 0) {
			params.runtime.error([`No Ollama models are available at ${baseUrl}.`, "Pull a model first, then re-run setup."].join("\n"));
			params.runtime.exit(1);
			return params.nextConfig;
		}
		defaultModelId = allModelNames.find((name) => findAvailableOllamaModelName(name, availableModelNames)) ?? expectDefined(availableModelNames.values().next().value, "available Ollama setup model");
		params.runtime.log(`Ollama model ${requestedDefaultModelId} was not available; using ${defaultModelId} instead.`);
	}
	if (!requestedCloudModel && !discoveredModelsByName.has(defaultModelId)) {
		const selectedModel = expectDefined((await enrichOllamaModelsWithContext(baseUrl, [models.find((model) => model.name === defaultModelId) ?? { name: defaultModelId }]))[0], "selected Ollama setup model");
		discoveredModelsByName.set(defaultModelId, selectedModel);
	}
	await storeOllamaCredential(params.agentDir);
	const config = applyOllamaProviderConfig(params.nextConfig, baseUrl, allModelNames, discoveredModelsByName);
	params.runtime.log(`Default Ollama model: ${defaultModelId}`);
	return applyAgentDefaultModelPrimary(config, `ollama/${defaultModelId}`);
}
async function ensureOllamaModelPulled(params) {
	if (!params.model.startsWith("ollama/")) return;
	const baseUrl = readProviderBaseUrl(params.config.models?.providers?.ollama) ?? "http://127.0.0.1:11434";
	const modelName = params.model.slice(7);
	if (isOllamaCloudModel(modelName)) return;
	const { models } = await fetchOllamaModels(baseUrl);
	if (findAvailableOllamaModelName(modelName, models.map((model) => model.name))) return;
	if (!await pullOllamaModel(baseUrl, modelName, params.prompter)) throw new WizardCancelledError("Failed to download selected Ollama model");
}
//#endregion
export { resolveOllamaSetupDefaultBaseUrl as a, orderPreferredOllamaModelIds as c, promptAndConfigureOllama as i, configureOllamaNonInteractive as n, OLLAMA_APP_GUIDED_MIN_CONTEXT_TOKENS as o, ensureOllamaModelPulled as r, findAvailableOllamaModelName as s, checkOllamaCloudAuth as t };
