import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { c as resolveAgentDir } from "./agent-scope-config-Dusa8eSA.js";
import { i as isOpenAIProvider, n as OPENAI_PROVIDER_ID } from "./openai-routing-Db2edxk0.js";
import { o as resolveAgentEffectiveModelPrimary } from "./agent-scope-DyEposw2.js";
import { a as selectOpenAIModelRouteAuth, h as buildProviderModelAuthSourcePlan, i as resolveOpenAIModelRoutes, m as buildProviderModelAuthDirectSource } from "./openai-model-routes--NVfVZh4.js";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.js";
import { t as resolveAgentHarnessPolicy } from "./policy-hKMGXdHG.js";
import "./defaults-CdX9UGcX.js";
import { d as resolveClaudeSonnet5ModelIdentity, u as resolveClaudeOpus5ModelIdentity } from "./src-DwO28Ae0.js";
import { C as resolveModelRefFromString, a as buildModelAliasIndex } from "./model-selection-shared-V7VmYFPH.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-BDwklqCa.js";
import { t as applyPreparedRuntimeAuthToModel } from "./provider-request-config-C5exA1l5.js";
import { t as protectPreparedProviderRuntimeAuth } from "./provider-secret-egress-BR0AKHwJ.js";
import { i as ensureAuthProfileStore } from "./store-BWT5kQzj.js";
import { a as prepareProviderRuntimeAuth } from "./provider-runtime.runtime.js";
import { a as bindModelLlmRuntime, n as completeSimple, s as getModelLlmRuntime } from "./stream-CURxsedE.js";
import { at as getModelRegistryRuntime } from "./sessions-CxWGGmnA.js";
import { r as formatMissingAuthError } from "./model-auth-runtime-shared-BVzqP6NP.js";
import { i as getApiKeyForModel, n as applyLocalNoAuthHeaderOverride, r as applySecretRefHeaderSentinels, s as resolveApiKeyForProvider } from "./model-auth-yfB4tyNY.js";
import "./model-selection-CZlE_kEq.js";
import { o as fingerprintResolvedProviderAuth, t as fingerprintAuthProfileCredential } from "./execution-auth-binding-CmucNoqo.js";
import { t as buildAgentRuntimeAuthPlan } from "./auth-DG1WLsPo.js";
import { r as resolveModelAsync } from "./model-weOUIm_9.js";
import { t as materializePreparedRuntimeModel } from "./materialize-model-DPDoen5v.js";
import { n as resolveUtilityModelRefForAgent } from "./utility-model-BQ1ybsXN.js";
import { supportsOpenAIReasoningEffort } from "@openclaw/ai/internal/openai";
import { prepareModelForSimpleCompletion } from "@openclaw/ai/transports";
import { defaultApiRegistry } from "@openclaw/ai/internal/runtime";
//#region src/agents/simple-completion-scope.ts
const workspaceByResolver = /* @__PURE__ */ new WeakMap();
/** Keep request-local workspace scope without growing the public completion SDK signature. */
function bindSimpleCompletionModelResolverWorkspace(resolver, workspaceDir) {
	const scopedResolver = (provider, modelId, agentDir, cfg, options) => resolver(provider, modelId, agentDir, cfg, options);
	workspaceByResolver.set(scopedResolver, workspaceDir);
	return scopedResolver;
}
function resolveSimpleCompletionModelResolverWorkspace(resolver) {
	return resolver ? workspaceByResolver.get(resolver) : void 0;
}
//#endregion
//#region src/agents/simple-completion-runtime.ts
function resolveSimpleCompletionSelectionForAgent(params) {
	const fallbackRef = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId,
		manifestPlugins: params.manifestPlugins
	});
	const modelRef = params.modelRef?.trim() || (params.useUtilityModel ? resolveUtilityModelRefForAgent({
		cfg: params.cfg,
		agentId: params.agentId,
		primaryProvider: fallbackRef.provider
	}) : void 0) || resolveAgentEffectiveModelPrimary(params.cfg, params.agentId);
	const split = modelRef ? splitTrailingAuthProfile(modelRef) : null;
	const aliasIndex = buildModelAliasIndex({
		cfg: params.cfg,
		defaultProvider: fallbackRef.provider || "openai",
		manifestPlugins: params.manifestPlugins
	});
	const resolved = split ? resolveModelRefFromString({
		raw: split.model,
		defaultProvider: fallbackRef.provider || "openai",
		aliasIndex,
		manifestPlugins: params.manifestPlugins
	}) : null;
	const provider = resolved?.ref.provider ?? fallbackRef.provider;
	const modelId = resolved?.ref.model ?? fallbackRef.model;
	if (!provider || !modelId) return null;
	return {
		provider,
		modelId,
		...resolveSimpleCompletionRuntimeProvider({
			cfg: params.cfg,
			agentId: params.agentId,
			provider,
			modelId
		}),
		profileId: split?.profile || void 0,
		agentDir: params.agentDir?.trim() || resolveAgentDir(params.cfg, params.agentId)
	};
}
function resolveSimpleCompletionRuntimeProvider(params) {
	if (!isOpenAIProvider(params.provider)) return {};
	return resolveAgentHarnessPolicy({
		provider: params.provider,
		modelId: params.modelId,
		config: params.cfg,
		agentId: params.agentId
	}).runtime === "codex" ? { runtimeProvider: OPENAI_PROVIDER_ID } : {};
}
async function setRuntimeApiKeyForCompletion(params) {
	const preparedAuth = protectPreparedProviderRuntimeAuth({
		provider: params.model.provider,
		preparedAuth: await prepareProviderRuntimeAuth({
			provider: params.model.provider,
			config: params.cfg,
			workspaceDir: params.workspaceDir,
			env: process.env,
			context: {
				config: params.cfg,
				workspaceDir: params.workspaceDir,
				env: process.env,
				provider: params.model.provider,
				modelId: params.model.id,
				model: params.model,
				apiKey: params.apiKey,
				authMode: params.authMode,
				profileId: params.profileId
			}
		})
	});
	const runtimeApiKey = preparedAuth?.apiKey?.trim() || params.apiKey;
	params.authStorage.setRuntimeApiKey(params.model.provider, runtimeApiKey);
	return {
		apiKey: runtimeApiKey,
		model: applyPreparedRuntimeAuthToModel(params.model, preparedAuth)
	};
}
function hasMissingApiKeyAllowance(params) {
	return Boolean(params.allowMissingApiKeyModes?.includes(params.mode));
}
async function prepareSimpleCompletionModel(params) {
	const workspaceDir = resolveSimpleCompletionModelResolverWorkspace(params.modelResolver);
	const resolved = await (params.modelResolver ?? resolveModelAsync)(params.provider, params.modelId, params.agentDir, params.cfg, {
		...params.agentId ? { agentId: params.agentId } : {},
		...params.allowBundledStaticCatalogFallback !== void 0 ? { allowBundledStaticCatalogFallback: params.allowBundledStaticCatalogFallback } : {},
		...params.skipAgentDiscovery ? { skipAgentDiscovery: true } : {},
		workspaceDir,
		authProfileId: params.profileId,
		preferredProfile: params.preferredProfile
	});
	if (!resolved.model) return { error: resolved.error ?? `Unknown model: ${params.provider}/${params.modelId}` };
	const initialModel = resolved.model;
	let resolvedModel = initialModel;
	const routeResolution = resolveOpenAIModelRoutes({
		provider: initialModel.provider,
		modelId: initialModel.id,
		api: initialModel.api,
		baseUrl: initialModel.baseUrl,
		config: params.cfg,
		env: process.env
	});
	const resolvesAuthBeforePhysicalRoute = routeResolution?.kind === "routes" && routeResolution.routes.length > 1;
	let auth;
	const authStore = params.bindAuthOwner ? ensureAuthProfileStore(params.agentDir, {
		readOnly: true,
		allowKeychainPrompt: false,
		config: params.cfg
	}) : void 0;
	try {
		auth = resolvesAuthBeforePhysicalRoute ? await resolveApiKeyForProvider({
			provider: initialModel.provider,
			cfg: params.cfg,
			agentDir: params.agentDir,
			workspaceDir,
			profileId: params.profileId,
			preferredProfile: params.preferredProfile,
			...authStore ? { store: authStore } : {},
			...params.bindAuthOwner && params.profileId ? { lockedProfile: true } : {},
			modelId: initialModel.id,
			secretSentinels: true
		}) : await getApiKeyForModel({
			model: initialModel,
			cfg: params.cfg,
			agentDir: params.agentDir,
			workspaceDir,
			profileId: params.profileId,
			preferredProfile: params.preferredProfile,
			...authStore ? { store: authStore } : {},
			...params.bindAuthOwner && params.profileId ? { lockedProfile: true } : {},
			secretSentinels: true
		});
		if (routeResolution?.kind === "routes") {
			const routeAuthDecision = selectOpenAIModelRouteAuth({
				resolution: routeResolution,
				sourcePlan: buildProviderModelAuthSourcePlan({
					ownership: {
						reason: "provider-binding",
						source: auth.profileId ? {
							kind: "profile",
							profileId: auth.profileId,
							provider: initialModel.provider,
							mode: auth.mode,
							readiness: "ready",
							cooldown: "clear"
						} : buildProviderModelAuthDirectSource({
							mode: auth.mode,
							availability: true,
							evidence: "runtime",
							authorization: "declared"
						})
					},
					profiles: []
				})
			});
			if (routeAuthDecision.kind !== "selected") throw new Error(routeAuthDecision.kind === "rejected" ? routeAuthDecision.message : "OpenAI route selection unexpectedly deferred after auth was resolved.");
			const route = routeAuthDecision.selection.route;
			resolvedModel = await materializePreparedRuntimeModel({
				plan: buildAgentRuntimeAuthPlan({
					provider: initialModel.provider,
					modelId: initialModel.id,
					authProfileProvider: initialModel.provider,
					authProfileMode: auth.mode,
					sessionAuthProfileId: auth.profileId,
					sessionAuthProfileSource: params.profileId ? "user" : "auto",
					modelRoute: {
						provider: initialModel.provider,
						modelId: initialModel.id,
						api: route.api,
						baseUrl: route.baseUrl,
						authRequirement: route.authRequirement,
						requestTransportOverrides: route.requestTransportOverrides,
						runtimePolicy: route.runtimePolicy
					},
					config: params.cfg,
					workspaceDir
				}),
				provider: initialModel.provider,
				modelId: initialModel.id,
				config: params.cfg,
				model: initialModel,
				resolveModel: ({ config, authProfileId, authProfileMode }) => (params.modelResolver ?? resolveModelAsync)(initialModel.provider, initialModel.id, params.agentDir, config, {
					authStorage: resolved.authStorage,
					modelRegistry: resolved.modelRegistry,
					skipAgentDiscovery: true,
					allowBundledStaticCatalogFallback: true,
					preferBundledStaticCatalogTransport: true,
					workspaceDir,
					authProfileId,
					authProfileMode
				})
			}) ?? initialModel;
			if (resolvesAuthBeforePhysicalRoute) auth = await getApiKeyForModel({
				model: resolvedModel,
				cfg: params.cfg,
				agentDir: params.agentDir,
				workspaceDir,
				profileId: auth.profileId,
				preferredProfile: params.preferredProfile,
				...authStore ? { store: authStore } : {},
				...params.bindAuthOwner && params.profileId ? { lockedProfile: true } : {},
				secretSentinels: true
			});
		}
	} catch (err) {
		return { error: `Auth lookup failed for provider "${initialModel.provider}": ${formatErrorMessage(err)}` };
	}
	const rawApiKey = auth.apiKey?.trim();
	if (!rawApiKey && !hasMissingApiKeyAllowance({
		mode: auth.mode,
		allowMissingApiKeyModes: params.allowMissingApiKeyModes
	})) return {
		error: formatMissingAuthError(auth, resolvedModel.provider),
		auth
	};
	let authValue = rawApiKey;
	if (rawApiKey) {
		const runtimeCredential = await setRuntimeApiKeyForCompletion({
			authStorage: resolved.authStorage,
			model: resolvedModel,
			apiKey: rawApiKey,
			authMode: auth.mode,
			cfg: params.cfg,
			workspaceDir: workspaceDir ?? params.agentDir,
			profileId: auth.profileId
		});
		authValue = runtimeCredential.apiKey;
		resolvedModel = runtimeCredential.model;
	}
	const resolvedAuth = {
		...auth,
		apiKey: authValue
	};
	const profileCredential = params.profileId ? authStore?.profiles[params.profileId] : void 0;
	const sourceAuthFingerprint = params.bindAuthOwner ? profileCredential?.type === "oauth" && params.profileId ? fingerprintAuthProfileCredential({
		profileId: params.profileId,
		credential: profileCredential
	}) : fingerprintResolvedProviderAuth(auth) : void 0;
	const modelRuntime = getModelRegistryRuntime(resolved.modelRegistry);
	return {
		model: bindModelLlmRuntime(applySecretRefHeaderSentinels(applyLocalNoAuthHeaderOverride(resolvedModel, resolvedAuth), params.cfg), modelRuntime.llmRuntime),
		auth: resolvedAuth,
		...sourceAuthFingerprint ? { sourceAuthFingerprint } : {}
	};
}
async function prepareSimpleCompletionModelForAgent(params) {
	const selection = resolveSimpleCompletionSelectionForAgent({
		cfg: params.cfg,
		agentId: params.agentId,
		agentDir: params.agentDir,
		modelRef: params.modelRef,
		useUtilityModel: params.useUtilityModel
	});
	if (!selection) return { error: `No model configured for agent ${params.agentId}.` };
	const prepared = await prepareSimpleCompletionModel({
		cfg: params.cfg,
		agentId: params.agentId,
		provider: selection.runtimeProvider ?? selection.provider,
		modelId: selection.modelId,
		agentDir: selection.agentDir,
		profileId: selection.profileId,
		preferredProfile: params.preferredProfile,
		allowMissingApiKeyModes: params.allowMissingApiKeyModes,
		...params.allowBundledStaticCatalogFallback !== void 0 ? { allowBundledStaticCatalogFallback: params.allowBundledStaticCatalogFallback } : {},
		useAsyncModelResolution: params.useAsyncModelResolution,
		skipAgentDiscovery: params.skipAgentDiscovery,
		bindAuthOwner: params.bindAuthOwner,
		modelResolver: params.modelResolver
	});
	if ("error" in prepared) return {
		...prepared,
		selection
	};
	return {
		selection,
		model: prepared.model,
		auth: prepared.auth,
		...prepared.sourceAuthFingerprint ? { sourceAuthFingerprint: prepared.sourceAuthFingerprint } : {}
	};
}
async function completeWithPreparedSimpleCompletionModel(params) {
	const runtime = getModelLlmRuntime(params.model);
	let completionModel = prepareModelForSimpleCompletion({
		apiRegistry: runtime?.registry ?? defaultApiRegistry,
		model: params.model,
		cfg: params.cfg
	});
	if (runtime) completionModel = bindModelLlmRuntime(completionModel, runtime);
	const { reasoning: rawReasoning, ...options } = params.options ?? {};
	const reasoning = normalizeSimpleCompletionReasoning(rawReasoning, completionModel);
	return await completeSimple(completionModel, params.context, {
		...options,
		...reasoning ? { reasoning } : {},
		apiKey: params.auth.apiKey
	});
}
function normalizeSimpleCompletionReasoning(reasoning, model) {
	switch (reasoning) {
		case void 0: return;
		case "off": return resolveClaudeSonnet5ModelIdentity(model) || resolveClaudeOpus5ModelIdentity(model) ? "off" : void 0;
		case "adaptive": return "medium";
		case "ultra":
		case "max": return isOpenAIProvider(model.provider) && supportsOpenAIReasoningEffort(model, "max") ? "max" : "xhigh";
		default: return reasoning;
	}
}
//#endregion
export { bindSimpleCompletionModelResolverWorkspace as a, resolveSimpleCompletionSelectionForAgent as i, prepareSimpleCompletionModel as n, prepareSimpleCompletionModelForAgent as r, completeWithPreparedSimpleCompletionModel as t };
