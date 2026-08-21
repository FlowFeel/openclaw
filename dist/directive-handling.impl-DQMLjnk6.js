import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import "./number-coercion-IpMOa8nH.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { c as resolveAgentDir } from "./agent-scope-config-Dusa8eSA.js";
import { s as coerceSecretRef } from "./types.secrets-BvApkFoj.js";
import { t as modelKey } from "./model-key-BaNhQShd.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { t as resolveAgentHarnessPolicy } from "./policy-BxKGFISr.js";
import { n as isThinkingLevelSupported, o as resolveSupportedThinkingLevel, t as formatThinkingLevels } from "./thinking-CLPqbAwx.js";
import { C as resolveModelRefFromString, b as resolveConfiguredModelRef, f as isModelKeyAllowedBySet, h as parseConfiguredModelVisibilityEntries, i as buildConfiguredModelCatalog } from "./model-selection-shared-BDTPW9Jk.js";
import { s as normalizeProviderId } from "./model-ref-shared-BCBRWGJh.js";
import { t as findNormalizedProviderValue } from "./model-selection-normalize-Bae-aoqX.js";
import { o as isProfileInCooldown } from "./usage-state-C6UiSWt7.js";
import { i as resolveAuthProfileOrder, t as isConfiguredAwsSdkAuthProfileForProvider } from "./order-DCEZOH-n.js";
import { t as getChannelPlugin } from "./registry-B1AiP2IQ.js";
import "./plugins-1tM2ZjdA.js";
import { a as isInternalMessageChannel } from "./message-channel-1n7hD5_u.js";
import { i as ensureAuthProfileStore } from "./store-C8MGqOG3.js";
import { t as resolveEnvApiKey } from "./model-auth-env-Bb6w1-EL.js";
import { n as resolveAuthStorePathForDisplay } from "./paths-ChRr3Z9Q.js";
import { i as resolveAuthProfileDisplayLabel } from "./auth-profiles-BCkmjCRk.js";
import { x as resolveUsableCustomProviderApiKey } from "./model-auth-provider-config-CaDHRX5w.js";
import "./model-auth-D32HIbZ7.js";
import "./model-selection-D5gxVbBh.js";
import { t as buildAgentRuntimeAuthPlan } from "./auth-DSixY5KL.js";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-BsZayE7D.js";
import { a as enqueueSystemEvent } from "./system-events-fsxpbPNB.js";
import { i as formatFastModeCurrentStatus, r as formatFastModeCommandOptions, s as formatFastModeValue } from "./fast-mode-BORk623r.js";
import { r as resolveSessionRuntimeOverrideForProvider } from "./session-runtime-compat-C7DAZITa.js";
import { a as resolveEffectiveAgentRuntime } from "./thinking-runtime-1FRCPyWR.js";
import { t as resolveFastModeState } from "./fast-mode-DRb2pnqM.js";
import { t as resolveQueueSettings } from "./settings-B9QZfJQM.js";
import { s as refreshQueuedFollowupSession } from "./state-CRjZ_OD8.js";
import { a as isModelSelectionLocked, i as applyModelOverrideToSessionEntry, t as MODEL_SELECTION_LOCKED_MESSAGE } from "./model-overrides-BT6Lelev.js";
import "./queue-CFTxerk6.js";
import { t as triggerSessionPatchHook } from "./session-patch-hooks-CD1TuQiS.js";
import { t as RUNTIME_MODEL_VISIBILITY_NORMALIZATION } from "./model-visibility-policy-BnYDbXrZ.js";
import { r as prefixSystemMessage, t as SYSTEM_MARK } from "./system-message-Dltw0_t9.js";
import "./sandbox-BHXEMQc2.js";
import { f as renderExecTargetLabel } from "./bash-tools.exec-runtime-BbrtT1Mu.js";
import { t as resolveExecDefaults } from "./exec-defaults-B7q-U3gd.js";
import { a as sessionModelOverrideChangesApplied, n as adoptPersistedSessionSnapshot, o as sessionSnapshotChangesApplied, t as SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS } from "./session-snapshot-merge-Bi3PsSDQ.js";
import { n as resolveModelRuntimeDirective, t as applyModelRuntimeDirective } from "./directive-handling.model-runtime-CgipnuKC.js";
import { n as resolveModelSelectionFromDirective, t as maybeHandleUnexpectedNativeDirectiveArguments } from "./directive-handling.native-B2wf5b8Q.js";
import { t as resolveRuntimePolicySessionKey } from "./runtime-policy-session-key-C23Br4Oe.js";
import { t as persistReplySessionEntry } from "./session-entry-persistence-DSn-gj0Z.js";
import { t as persistStickyModelSelectionBestEffort } from "./sticky-model-selection-DiHWwvWQ.js";
import { n as applyVerboseOverride, t as applyTraceOverride } from "./level-overrides-C6SPQ_cO.js";
import { i as resolveModelsCommandReply } from "./commands-models-DmEVPSZZ.js";
import { n as resolveSelectedAndActiveModel } from "./model-runtime-CT6T4rg0.js";
import { r as formatRemainingShort } from "./auth-health-CZKz_e48.js";
import { t as maskApiKey } from "./secret-mask-CWRecbVB.js";
//#region src/auto-reply/reply/directive-handling.auth.ts
function resolveStoredCredentialLabel(params) {
	const masked = maskApiKey(typeof params.value === "string" ? params.value : "");
	if (masked !== "missing") return masked;
	if (coerceSecretRef(params.refValue)) return params.mode === "compact" ? "(ref)" : "ref";
	return "missing";
}
function formatExpirationLabel(expires, now, formatUntil, compactExpiredPrefix = " expired") {
	const timestampMs = asDateTimestampMs(expires);
	if (timestampMs === void 0 || timestampMs <= 0) return "";
	return timestampMs <= now ? compactExpiredPrefix : ` exp ${formatUntil(timestampMs)}`;
}
function formatFlagsSuffix(flags) {
	return flags.length > 0 ? ` (${flags.join(", ")})` : "";
}
function isStoredAuthProfileType(value) {
	return value === "api_key" || value === "oauth" || value === "token";
}
/** Resolves the displayed auth source for a provider without exposing secrets. */
const resolveAuthLabel = async (provider, cfg, modelsPath, agentDir, mode = "compact", workspaceDir, options) => {
	const formatPath = (value) => shortenHomePath(value);
	const store = ensureAuthProfileStore(agentDir, { allowKeychainPrompt: false });
	const rawOrder = resolveAuthProfileOrder({
		cfg,
		store,
		provider
	});
	const acceptedProfileTypes = options?.acceptedProfileTypes ? new Set(options.acceptedProfileTypes) : void 0;
	const order = acceptedProfileTypes ? rawOrder.filter((profileId) => {
		const profile = store.profiles[profileId];
		if (profile) return acceptedProfileTypes.has(profile.type);
		const configuredMode = cfg.auth?.profiles?.[profileId]?.mode;
		return isStoredAuthProfileType(configuredMode) ? acceptedProfileTypes.has(configuredMode) : true;
	}) : rawOrder;
	const providerKey = normalizeProviderId(provider);
	const lastGood = findNormalizedProviderValue(store.lastGood, providerKey);
	const nextProfileId = order[0];
	const now = Date.now();
	const formatUntil = (timestampMs) => formatRemainingShort(timestampMs - now, { underMinuteLabel: "soon" });
	if (order.length > 0) {
		if (mode === "compact") {
			const profileId = nextProfileId;
			if (!profileId) return {
				label: "missing",
				source: "missing"
			};
			const profile = store.profiles[profileId];
			const configProfile = cfg.auth?.profiles?.[profileId];
			const configOnlyAwsSdk = !profile ? isConfiguredAwsSdkAuthProfileForProvider({
				cfg,
				provider,
				profileId
			}) : false;
			const more = order.length > 1 ? ` (+${order.length - 1})` : "";
			if (configOnlyAwsSdk) return {
				label: `${profileId} aws-sdk${more}`,
				source: ""
			};
			if (!profile || configProfile?.provider && configProfile.provider !== profile.provider || configProfile?.mode && configProfile.mode !== profile.type && !(configProfile.mode === "oauth" && profile.type === "token")) return {
				label: `${profileId} missing${more}`,
				source: ""
			};
			if (profile.type === "api_key") return {
				label: `${profileId} api-key ${resolveStoredCredentialLabel({
					value: profile.key,
					refValue: profile.keyRef,
					mode
				})}${more}`,
				source: ""
			};
			if (profile.type === "token") return {
				label: `${profileId} token ${resolveStoredCredentialLabel({
					value: profile.token,
					refValue: profile.tokenRef,
					mode
				})}${formatExpirationLabel(profile.expires, now, formatUntil)}${more}`,
				source: ""
			};
			const display = resolveAuthProfileDisplayLabel({
				cfg,
				store,
				profileId
			});
			return {
				label: `${display === profileId ? profileId : display} oauth${formatExpirationLabel(profile.expires, now, formatUntil)}${more}`,
				source: ""
			};
		}
		return {
			label: order.map((profileId) => {
				const profile = store.profiles[profileId];
				const configProfile = cfg.auth?.profiles?.[profileId];
				const flags = [];
				if (profileId === nextProfileId) flags.push("next");
				if (lastGood && profileId === lastGood) flags.push("lastGood");
				if (isProfileInCooldown(store, profileId)) {
					const until = store.usageStats?.[profileId]?.cooldownUntil;
					if (typeof until === "number" && Number.isFinite(until) && until > now) flags.push(`cooldown ${formatUntil(until)}`);
					else flags.push("cooldown");
				}
				if (!profile && isConfiguredAwsSdkAuthProfileForProvider({
					cfg,
					provider,
					profileId
				})) return `${profileId}=aws-sdk${formatFlagsSuffix(flags)}`;
				if (!profile || configProfile?.provider && configProfile.provider !== profile.provider || configProfile?.mode && configProfile.mode !== profile.type && !(configProfile.mode === "oauth" && profile.type === "token")) return `${profileId}=missing${formatFlagsSuffix(flags)}`;
				if (profile.type === "api_key") return `${profileId}=${resolveStoredCredentialLabel({
					value: profile.key,
					refValue: profile.keyRef,
					mode
				})}${formatFlagsSuffix(flags)}`;
				if (profile.type === "token") {
					const tokenLabel = resolveStoredCredentialLabel({
						value: profile.token,
						refValue: profile.tokenRef,
						mode
					});
					const expirationFlag = formatExpirationLabel(profile.expires, now, formatUntil, "expired");
					if (expirationFlag) flags.push(expirationFlag);
					return `${profileId}=token:${tokenLabel}${formatFlagsSuffix(flags)}`;
				}
				const display = resolveAuthProfileDisplayLabel({
					cfg,
					store,
					profileId
				});
				const suffix = display === profileId ? "" : display.startsWith(profileId) ? display.slice(profileId.length).trim() : `(${display})`;
				const expirationFlag = formatExpirationLabel(profile.expires, now, formatUntil, "expired");
				if (expirationFlag) flags.push(expirationFlag);
				return `${profileId}=OAuth${suffix ? ` ${suffix}` : ""}${formatFlagsSuffix(flags)}`;
			}).join(", "),
			source: `auth profile store: ${formatPath(resolveAuthStorePathForDisplay(agentDir))}`
		};
	}
	const envKey = resolveEnvApiKey(provider, process.env, {
		config: cfg,
		workspaceDir
	});
	if (envKey) return {
		label: envKey.source.includes("ANTHROPIC_OAUTH_TOKEN") || normalizeLowercaseStringOrEmpty(envKey.source).includes("oauth") ? "OAuth (env)" : maskApiKey(envKey.apiKey),
		source: mode === "verbose" ? envKey.source : ""
	};
	const customKey = resolveUsableCustomProviderApiKey({
		cfg,
		provider
	})?.apiKey;
	if (customKey) return {
		label: maskApiKey(customKey),
		source: mode === "verbose" ? `models.json: ${formatPath(modelsPath)}` : ""
	};
	return {
		label: "missing",
		source: "missing"
	};
};
/** Formats an auth label plus source for one-line status output. */
const formatAuthLabel = (auth) => {
	if (!auth.source || auth.source === auth.label || auth.source === "missing") return auth.label;
	return `${auth.label} (${auth.source})`;
};
//#endregion
//#region src/auto-reply/reply/directive-handling.model-picker.ts
/** Resolves optional endpoint/API labels for a provider in picker details. */
function resolveProviderEndpointLabel(provider, cfg) {
	const normalized = normalizeProviderId(provider);
	const entry = findNormalizedProviderValue(cfg.models?.providers ?? {}, normalized);
	const endpoint = normalizeOptionalString(entry?.baseUrl);
	const api = normalizeOptionalString(entry?.api);
	return {
		endpoint: endpoint || void 0,
		api: api || void 0
	};
}
//#endregion
//#region src/auto-reply/reply/directive-handling.model.ts
function isMissingAuthLabel(auth) {
	return auth.label === "missing" && auth.source === "missing";
}
function resolveStatusHarnessRuntime(params) {
	const sessionRuntime = resolveSessionRuntimeOverrideForProvider({
		provider: params.provider,
		entry: params.sessionEntry,
		cfg: params.cfg
	});
	if (sessionRuntime) return sessionRuntime;
	return params.defaultRuntime;
}
function resolveStatusAcceptedProfileTypes(params) {
	if (normalizeProviderId(params.provider) !== "openai" || params.harnessRuntime === "codex") return;
	return ["api_key"];
}
async function resolveStatusAuthLabel(params) {
	const provider = normalizeProviderId(params.provider);
	const harnessPolicy = resolveAgentHarnessPolicy({
		provider,
		modelId: params.modelId,
		config: params.cfg,
		agentId: params.activeAgentId
	});
	const harnessRuntime = resolveStatusHarnessRuntime({
		sessionEntry: params.sessionEntry,
		defaultRuntime: harnessPolicy.runtime,
		provider,
		cfg: params.cfg
	});
	const auth = await resolveAuthLabel(params.provider, params.cfg, params.modelsPath, params.agentDir, params.authMode, params.workspaceDir, { acceptedProfileTypes: resolveStatusAcceptedProfileTypes({
		provider,
		harnessRuntime
	}) });
	if (!isMissingAuthLabel(auth)) return formatAuthLabel(auth);
	const effectiveAuthProvider = buildAgentRuntimeAuthPlan({
		provider,
		config: params.cfg,
		workspaceDir: params.workspaceDir,
		harnessRuntime
	}).harnessAuthProvider;
	if (!effectiveAuthProvider || effectiveAuthProvider === provider) return formatAuthLabel(auth);
	const runtimeAuth = await resolveAuthLabel(effectiveAuthProvider, params.cfg, params.modelsPath, params.agentDir, params.authMode, params.workspaceDir);
	if (isMissingAuthLabel(runtimeAuth)) return formatAuthLabel(auth);
	return `via ${harnessRuntime} runtime / ${effectiveAuthProvider} ${formatAuthLabel(runtimeAuth)}`;
}
function pushUniqueCatalogEntry(params) {
	const provider = normalizeProviderId(params.provider);
	const id = normalizeOptionalString(params.id) ?? "";
	if (!provider || !id) return;
	const key = modelKey(provider, id);
	if (params.keys.has(key)) return;
	params.keys.add(key);
	params.out.push({
		provider,
		id,
		name: params.fallbackNameToId ? params.name ?? id : params.name
	});
}
function buildModelPickerCatalog(params) {
	const resolvedDefault = resolveConfiguredModelRef({
		cfg: params.cfg,
		defaultProvider: params.defaultProvider,
		defaultModel: params.defaultModel,
		...RUNTIME_MODEL_VISIBILITY_NORMALIZATION
	});
	const buildConfiguredCatalog = () => {
		const out = [];
		const keys = /* @__PURE__ */ new Set();
		const pushRef = (ref, name) => {
			pushUniqueCatalogEntry({
				keys,
				out,
				provider: ref.provider,
				id: ref.model,
				name,
				fallbackNameToId: true
			});
		};
		const pushRaw = (raw) => {
			const value = normalizeOptionalString(raw) ?? "";
			if (!value) return;
			const resolved = resolveModelRefFromString({
				raw: value,
				defaultProvider: params.defaultProvider,
				aliasIndex: params.aliasIndex
			});
			if (!resolved) return;
			pushRef(resolved.ref);
		};
		pushRef(resolvedDefault);
		const modelConfig = params.cfg.agents?.defaults?.model;
		const modelFallbacks = modelConfig && typeof modelConfig === "object" ? modelConfig.fallbacks ?? [] : [];
		for (const fallback of modelFallbacks) pushRaw(fallback ?? "");
		const imageConfig = params.cfg.agents?.defaults?.imageModel;
		if (imageConfig && typeof imageConfig === "object") {
			pushRaw(imageConfig.primary);
			for (const fallback of imageConfig.fallbacks ?? []) pushRaw(fallback ?? "");
		}
		for (const raw of Object.keys(params.cfg.agents?.defaults?.models ?? {})) pushRaw(raw);
		return out;
	};
	const keys = /* @__PURE__ */ new Set();
	const out = [];
	const push = (entry) => {
		pushUniqueCatalogEntry({
			keys,
			out,
			provider: entry.provider,
			id: entry.id ?? "",
			name: entry.name,
			fallbackNameToId: false
		});
	};
	const visibility = parseConfiguredModelVisibilityEntries({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (!visibility.hasEntries) {
		for (const entry of params.allowedModelCatalog) push({
			provider: entry.provider,
			id: entry.id ?? "",
			name: entry.name
		});
		for (const entry of buildConfiguredCatalog()) push(entry);
		return out;
	}
	for (const entry of params.allowedModelCatalog.filter((candidate) => isModelKeyAllowedBySet(params.allowedModelKeys, modelKey(candidate.provider, candidate.id ?? "")))) push({
		provider: entry.provider,
		id: entry.id ?? "",
		name: entry.name
	});
	for (const raw of visibility.exactModelRefs) {
		const resolved = resolveModelRefFromString({
			cfg: params.cfg,
			raw,
			defaultProvider: params.defaultProvider,
			aliasIndex: params.policyAliasIndex,
			...RUNTIME_MODEL_VISIBILITY_NORMALIZATION
		});
		if (!resolved) continue;
		const catalogEntry = params.allowedModelCatalog.find((entry) => modelKey(entry.provider, entry.id ?? "") === modelKey(resolved.ref.provider, resolved.ref.model));
		push(catalogEntry ? {
			provider: catalogEntry.provider,
			id: catalogEntry.id ?? "",
			name: catalogEntry.name
		} : {
			provider: resolved.ref.provider,
			id: resolved.ref.model,
			name: resolved.ref.model
		});
	}
	if (resolvedDefault.model && isModelKeyAllowedBySet(params.allowedModelKeys, modelKey(resolvedDefault.provider, resolvedDefault.model))) push({
		provider: resolvedDefault.provider,
		id: resolvedDefault.model,
		name: resolvedDefault.model
	});
	return out;
}
function filterMissingAuthNestedProviderDuplicates(params) {
	const configuredKeys = new Set(buildConfiguredModelCatalog({ cfg: params.cfg }).map((entry) => modelKey(entry.provider, entry.id)));
	const wrapperKeys = /* @__PURE__ */ new Set();
	for (const entry of params.entries) {
		const id = normalizeOptionalString(entry.id) ?? "";
		const slash = id.indexOf("/");
		if (slash <= 0) continue;
		const nestedProvider = normalizeProviderId(id.slice(0, slash));
		const nestedModel = normalizeOptionalString(id.slice(slash + 1)) ?? "";
		const wrapperProvider = normalizeProviderId(entry.provider);
		if (!nestedProvider || !nestedModel || nestedProvider === wrapperProvider) continue;
		wrapperKeys.add(modelKey(nestedProvider, nestedModel));
	}
	if (wrapperKeys.size === 0) return params.entries;
	return params.entries.filter((entry) => {
		const provider = normalizeProviderId(entry.provider);
		const key = modelKey(provider, normalizeOptionalString(entry.id) ?? "");
		if (configuredKeys.has(key)) return true;
		return params.authByProvider.get(provider) !== "missing" || !wrapperKeys.has(key);
	});
}
async function maybeHandleModelDirectiveInfo(params) {
	if (!params.directives.hasModelDirective) return;
	const rawDirective = normalizeOptionalString(params.directives.rawModelDirective);
	const directive = rawDirective ? normalizeLowercaseStringOrEmpty(rawDirective) : void 0;
	const wantsStatus = directive === "status";
	const wantsSummary = !rawDirective;
	const wantsLegacyList = directive === "list";
	if (!wantsSummary && !wantsStatus && !wantsLegacyList) return;
	if (params.directives.rawModelProfile) return { text: "Auth profile override requires a model selection." };
	const pickerCatalog = buildModelPickerCatalog({
		cfg: params.cfg,
		defaultProvider: params.defaultProvider,
		defaultModel: params.defaultModel,
		agentId: params.activeAgentId,
		aliasIndex: params.aliasIndex,
		policyAliasIndex: params.policyAliasIndex ?? params.aliasIndex,
		allowedModelKeys: params.allowedModelKeys,
		allowedModelCatalog: params.allowedModelCatalog
	});
	if (wantsLegacyList) return await resolveModelsCommandReply({
		cfg: params.cfg,
		commandBodyNormalized: "/models",
		surface: params.surface,
		currentModel: `${params.provider}/${params.model}`,
		agentId: params.activeAgentId,
		agentDir: params.agentDir,
		workspaceDir: params.workspaceDir,
		sessionEntry: isCompleteSessionEntry(params.sessionEntry) ? params.sessionEntry : void 0
	}) ?? { text: "No models available." };
	if (wantsSummary) {
		const modelRefs = resolveSelectedAndActiveModel({
			selectedProvider: params.provider,
			selectedModel: params.model,
			sessionEntry: params.sessionEntry
		});
		const current = modelRefs.selected.label;
		const thinkingRuntime = resolveEffectiveAgentRuntime({
			cfg: params.cfg,
			provider: params.provider,
			modelId: params.model,
			agentId: params.activeAgentId,
			sessionKey: params.runtimePolicySessionKey,
			sessionEntry: params.sessionEntry
		});
		const thinkingLine = `Think: ${resolveSupportedThinkingLevel({
			provider: params.provider,
			model: params.model,
			level: params.currentThinkLevel,
			catalog: params.thinkingCatalog,
			agentRuntime: thinkingRuntime
		})} (change with /think <level>)`;
		const activeRuntimeLine = modelRefs.activeDiffers ? `Active: ${modelRefs.active.label} (runtime)` : null;
		const channelData = (params.surface ? getChannelPlugin(params.surface) : null)?.commands?.buildModelBrowseChannelData?.();
		if (channelData) return {
			text: [
				`Current: ${current}${modelRefs.activeDiffers ? " (selected)" : ""}`,
				activeRuntimeLine,
				thinkingLine,
				"",
				"Tap below to browse models, or use:",
				"/model <provider/model> to switch",
				"/model <provider/model> --runtime <runtime> to switch harnesses",
				"/model status for details"
			].filter(Boolean).join("\n"),
			channelData
		};
		return { text: [
			`Current: ${current}${modelRefs.activeDiffers ? " (selected)" : ""}`,
			activeRuntimeLine,
			thinkingLine,
			"",
			"Switch: /model <provider/model>",
			"Runtime: /model <provider/model> --runtime <runtime>",
			"Browse: /models (providers) or /models <provider> (models)",
			"More: /model status"
		].filter(Boolean).join("\n") };
	}
	const modelsPath = `${params.agentDir}/models.json`;
	const formatPath = (value) => shortenHomePath(value);
	const authMode = "verbose";
	if (pickerCatalog.length === 0) return { text: "No models available." };
	const authByProvider = /* @__PURE__ */ new Map();
	for (const entry of pickerCatalog) {
		const provider = normalizeProviderId(entry.provider);
		if (authByProvider.has(provider)) continue;
		const authLabel = await resolveStatusAuthLabel({
			provider,
			modelId: entry.id,
			cfg: params.cfg,
			modelsPath,
			agentDir: params.agentDir,
			activeAgentId: params.activeAgentId,
			authMode,
			workspaceDir: params.workspaceDir,
			sessionEntry: params.sessionEntry
		});
		authByProvider.set(provider, authLabel);
	}
	const modelRefs = resolveSelectedAndActiveModel({
		selectedProvider: params.provider,
		selectedModel: params.model,
		sessionEntry: params.sessionEntry
	});
	const current = modelRefs.selected.label;
	const defaultLabel = `${params.defaultProvider}/${params.defaultModel}`;
	const lines = [
		`Current: ${current}${modelRefs.activeDiffers ? " (selected)" : ""}`,
		modelRefs.activeDiffers ? `Active: ${modelRefs.active.label} (runtime)` : null,
		`Default: ${defaultLabel}`,
		`Agent: ${params.activeAgentId}`,
		`Auth store: ${formatPath(resolveAuthStorePathForDisplay(params.agentDir))}`
	].filter((line) => Boolean(line));
	if (params.resetModelOverride) lines.push(`(previous selection reset to default)`);
	const byProvider = /* @__PURE__ */ new Map();
	const statusCatalog = filterMissingAuthNestedProviderDuplicates({
		cfg: params.cfg,
		entries: pickerCatalog,
		authByProvider
	});
	for (const entry of statusCatalog) {
		const provider = normalizeProviderId(entry.provider);
		const models = byProvider.get(provider);
		if (models) {
			models.push(entry);
			continue;
		}
		byProvider.set(provider, [entry]);
	}
	for (const provider of byProvider.keys()) {
		const models = byProvider.get(provider);
		if (!models) continue;
		const authLabel = authByProvider.get(provider) ?? "missing";
		const endpoint = resolveProviderEndpointLabel(provider, params.cfg);
		const endpointSuffix = endpoint.endpoint ? ` endpoint: ${endpoint.endpoint}` : " endpoint: default";
		const apiSuffix = endpoint.api ? ` api: ${endpoint.api}` : "";
		lines.push("");
		lines.push(`[${provider}]${endpointSuffix}${apiSuffix} auth: ${authLabel}`);
		for (const entry of models) {
			const label = `${provider}/${entry.id}`;
			const aliases = params.aliasIndex.byKey.get(label);
			const aliasSuffix = aliases && aliases.length > 0 ? ` (${aliases.join(", ")})` : "";
			lines.push(`  • ${label}${aliasSuffix}`);
		}
	}
	return { text: lines.join("\n") };
}
function isCompleteSessionEntry(entry) {
	return Boolean(entry && typeof entry.sessionId === "string" && typeof entry.updatedAt === "number");
}
//#endregion
//#region src/auto-reply/reply/directive-handling.shared.ts
const DIRECTIVE_ACK_MESSAGES = {
	verbose: {
		off: "Verbose logging disabled.",
		on: "Verbose logging enabled.",
		full: "Verbose logging set to full."
	},
	trace: {
		off: "Trace disabled.",
		on: "Trace enabled. Warning: trace output may contain sensitive information.",
		raw: "Trace set to raw. Warning: trace output may contain sensitive information."
	},
	reasoning: {
		off: "Reasoning visibility disabled.",
		on: "Reasoning visibility enabled.",
		stream: "Reasoning stream enabled."
	},
	elevated: {
		off: "Elevated mode disabled.",
		on: "Elevated mode set to ask (approvals may still apply).",
		ask: "Elevated mode set to ask (approvals may still apply).",
		full: "Elevated mode set to full (auto-approve)."
	}
};
const formatDirectiveAck = (text) => {
	return prefixSystemMessage(text);
};
const formatOptionsLine = (options) => `Options: ${options}.`;
const withOptions = (line, options) => `${line}\n${formatOptionsLine(options)}`;
const formatElevatedRuntimeHint = () => `${SYSTEM_MARK} Runtime is direct; sandboxing does not apply.`;
const formatInternalExecPersistenceDeniedText = () => "Exec defaults require operator.admin for gateway callers; skipped persistence.";
const formatInternalVerbosePersistenceDeniedText = () => "Verbose defaults require operator.admin for gateway callers; skipped persistence.";
const formatInternalVerboseCurrentReplyOnlyText = () => "Verbose logging set for the current reply only.";
function canPersistSessionDirectiveDefaults(params) {
	const messageProvider = normalizeOptionalString(params.messageProvider);
	const surface = normalizeOptionalString(params.surface);
	const authoritativeChannel = messageProvider ?? surface;
	if (!authoritativeChannel) return true;
	if (isInternalMessageChannel(authoritativeChannel)) return params.gatewayClientScopes?.includes("operator.admin") === true;
	return params.commandAuthorized === true || params.senderIsOwner === true;
}
const SESSION_LEVEL_DIRECTIVE_FIELDS = [
	["hasThinkDirective", "thinkingLevel"],
	["hasFastDirective", "fastMode"],
	["hasVerboseDirective", "verboseLevel"],
	["hasTraceDirective", "traceLevel"],
	["hasReasoningDirective", "reasoningLevel"],
	["hasElevatedDirective", "elevatedLevel"]
];
const SESSION_EXEC_DIRECTIVE_FIELDS = [
	"execHost",
	"execSecurity",
	"execAsk",
	"execNode"
];
const SESSION_QUEUE_DIRECTIVE_FIELDS = [
	["queueMode", "queueMode"],
	["debounceMs", "queueDebounceMs"],
	["cap", "queueCap"],
	["dropPolicy", "queueDrop"]
];
/** Names explicit directive writes that snapshot equality cannot infer. */
function resolveDirectiveTouchedSessionFields(params) {
	const { directives } = params;
	const fields = /* @__PURE__ */ new Set();
	for (const [directiveField, sessionField] of SESSION_LEVEL_DIRECTIVE_FIELDS) if (directives[directiveField] && (sessionField !== "verboseLevel" || params.allowPrivilegedPersistence)) fields.add(sessionField);
	if (directives.hasModelDirective) for (const field of SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS) fields.add(field);
	if (directives.hasExecDirective && params.allowPrivilegedPersistence) {
		for (const field of SESSION_EXEC_DIRECTIVE_FIELDS) if (directives[field]) fields.add(field);
	}
	if (directives.hasQueueDirective) for (const [directiveField, sessionField] of SESSION_QUEUE_DIRECTIVE_FIELDS) {
		const value = directives[directiveField];
		if (directives.queueReset || typeof value === "number" || Boolean(value)) fields.add(sessionField);
	}
	return [...fields];
}
function rejectSessionDirectiveTransaction(persistenceState, errorText) {
	if (persistenceState) persistenceState.outcome = {
		kind: "rejected",
		errorText
	};
	return { text: errorText };
}
/** Keeps the first informational/denied acknowledgement while committing valid siblings once. */
async function acknowledgeIgnoredSessionDirective(params) {
	if (!params.persistenceState) return params.reply;
	const { directives, ignoredDirective } = params;
	const remainingDirectives = ignoredDirective === "hasExecDirective" && directives.hasExecOptions ? {
		...directives,
		invalidExecHost: false,
		invalidExecSecurity: false,
		invalidExecAsk: false,
		invalidExecNode: false
	} : {
		...directives,
		[ignoredDirective]: false,
		...ignoredDirective === "hasThinkDirective" ? { clearThinkLevel: false } : {},
		...ignoredDirective === "hasFastDirective" ? { clearFastMode: false } : {},
		...ignoredDirective === "hasModelDirective" ? { rawModelProfile: void 0 } : {}
	};
	if (resolveDirectiveTouchedSessionFields({
		directives: remainingDirectives,
		allowPrivilegedPersistence: params.allowPrivilegedPersistence
	}).length > 0) {
		const siblingReply = await params.applyRemainingDirectives(remainingDirectives);
		if (params.persistenceState.outcome.kind === "rejected") return siblingReply ?? params.reply;
	}
	return params.reply;
}
/** Applies canonical session settings while each caller retains its authorization boundaries. */
function applySessionDirectiveFields(params) {
	const { directives, sessionEntry } = params;
	let updated = false;
	const updateField = (field, value) => {
		sessionEntry[field] = value;
		updated = true;
	};
	if (directives.clearThinkLevel) {
		if (sessionEntry.thinkingLevel) {
			delete sessionEntry.thinkingLevel;
			updated = true;
		}
	} else if (directives.hasThinkDirective && directives.thinkLevel) updateField("thinkingLevel", directives.thinkLevel);
	if (directives.clearFastMode) {
		if (sessionEntry.fastMode !== void 0) {
			delete sessionEntry.fastMode;
			updated = true;
		}
	} else if (params.persistDirectiveOnlyFields && directives.hasFastDirective && directives.fastMode !== void 0) updateField("fastMode", directives.fastMode);
	if (directives.hasVerboseDirective && directives.verboseLevel && params.allowPrivilegedPersistence) {
		applyVerboseOverride(sessionEntry, directives.verboseLevel);
		updated = true;
	}
	if (directives.hasTraceDirective && directives.traceLevel && params.allowTracePersistence) {
		applyTraceOverride(sessionEntry, directives.traceLevel);
		updated = true;
	}
	if (directives.hasReasoningDirective && directives.reasoningLevel) updateField("reasoningLevel", directives.reasoningLevel);
	if (directives.hasElevatedDirective && directives.elevatedLevel && params.allowElevatedPersistence) updateField("elevatedLevel", directives.elevatedLevel);
	if (directives.hasExecDirective && directives.hasExecOptions && params.allowPrivilegedPersistence) for (const field of SESSION_EXEC_DIRECTIVE_FIELDS) {
		const value = directives[field];
		if (value) updateField(field, value);
	}
	if (directives.hasQueueDirective && directives.queueReset) {
		for (const [, field] of SESSION_QUEUE_DIRECTIVE_FIELDS) delete sessionEntry[field];
		updated = true;
	} else if (directives.hasQueueDirective && params.persistDirectiveOnlyFields) for (const [directiveField, sessionField] of SESSION_QUEUE_DIRECTIVE_FIELDS) {
		const value = directives[directiveField];
		if (typeof value === "number" || value) updateField(sessionField, value);
	}
	return updated;
}
/** Commits a directive snapshot only when its touched fields still win the session transaction. */
async function persistSessionDirectiveSnapshot(params) {
	const { sessionEntry, sessionKey, sessionStore } = params;
	const persistence = await persistReplySessionEntry({
		storePath: params.storePath,
		sessionKey,
		initialEntry: params.initialEntry,
		entry: sessionEntry,
		reassertLiveModelSwitchPending: params.reassertLiveModelSwitchPending,
		requireModelSelectionUnlocked: params.hasModelSelection,
		touchedFields: params.touchedFields
	});
	if (persistence.status !== "current") {
		if (persistence.entry) {
			sessionStore[sessionKey] = persistence.entry;
			adoptPersistedSessionSnapshot(sessionEntry, persistence.entry);
		}
		return { status: persistence.status === "model-selection-locked" ? persistence.status : "conflict" };
	}
	const persistedEntry = persistence.entry;
	sessionStore[sessionKey] = persistedEntry;
	const sessionChangesApplied = sessionSnapshotChangesApplied({
		initial: params.initialEntry,
		next: sessionEntry,
		current: persistedEntry,
		touchedFields: params.touchedFields
	});
	const modelSelectionApplied = !params.hasModelSelection || sessionChangesApplied && sessionModelOverrideChangesApplied({
		initial: params.initialEntry,
		next: sessionEntry,
		current: persistedEntry,
		reassertLiveModelSwitchPending: params.reassertLiveModelSwitchPending
	});
	adoptPersistedSessionSnapshot(sessionEntry, persistedEntry);
	return { status: sessionChangesApplied && modelSelectionApplied ? "applied" : "conflict" };
}
const formatElevatedEvent = (level) => {
	if (level === "full") return "Elevated FULL - exec runs on host with auto-approval.";
	if (level === "ask" || level === "on") return "Elevated ASK - exec runs on host; approvals may still apply.";
	return "Elevated OFF - exec stays in sandbox.";
};
const formatReasoningEvent = (level) => {
	if (level === "stream") return "Reasoning STREAM - emit live <think>.";
	if (level === "on") return "Reasoning ON - include <think>.";
	return "Reasoning OFF - hide <think>.";
};
function enqueueModeSwitchEvents(params) {
	if (params.elevatedChanged) {
		const nextElevated = params.sessionEntry.elevatedLevel ?? "off";
		params.enqueueSystemEvent(formatElevatedEvent(nextElevated), {
			sessionKey: params.sessionKey,
			contextKey: "mode:elevated"
		});
	}
	if (params.reasoningChanged) {
		const nextReasoning = params.sessionEntry.reasoningLevel ?? "off";
		params.enqueueSystemEvent(formatReasoningEvent(nextReasoning), {
			sessionKey: params.sessionKey,
			contextKey: "mode:reasoning"
		});
	}
}
function formatElevatedUnavailableText(params) {
	const lines = [];
	lines.push(`elevated is not available right now (runtime=${params.runtimeSandboxed ? "sandboxed" : "direct"}).`);
	const failures = params.failures ?? [];
	if (failures.length > 0) lines.push(`Failing gates: ${failures.map((f) => `${f.gate} (${f.key})`).join(", ")}`);
	else lines.push("Fix-it keys: tools.elevated.enabled, tools.elevated.allowFrom.<provider>, agents.entries.*.tools.elevated.*");
	if (params.sessionKey) lines.push(`See: ${formatCliCommand(`openclaw sandbox explain --session ${params.sessionKey}`)}`);
	return lines.join("\n");
}
//#endregion
//#region src/auto-reply/reply/directive-handling.queue-validation.ts
/** Validates `/queue` directives and returns immediate status/error replies. */
function maybeHandleQueueDirective(params) {
	const { directives } = params;
	if (!directives.hasQueueDirective) return;
	if (!directives.queueMode && !directives.queueReset && !directives.hasQueueOptions && directives.rawQueueMode === void 0 && directives.rawDebounce === void 0 && directives.rawCap === void 0 && directives.rawDrop === void 0) {
		const settings = resolveQueueSettings({
			cfg: params.cfg,
			channel: params.channel,
			sessionEntry: params.sessionEntry
		});
		const debounceLabel = typeof settings.debounceMs === "number" ? `${settings.debounceMs}ms` : "default";
		const capLabel = typeof settings.cap === "number" ? String(settings.cap) : "default";
		const dropLabel = settings.dropPolicy ?? "default";
		return { text: withOptions(`Current queue settings: mode=${settings.mode}, debounce=${debounceLabel}, cap=${capLabel}, drop=${dropLabel}.`, "modes steer, followup, collect, interrupt; debounce:<ms|s|m>, cap:<n>, drop:old|new|summarize") };
	}
	const queueModeInvalid = !directives.queueMode && !directives.queueReset && Boolean(directives.rawQueueMode);
	const queueDebounceInvalid = directives.rawDebounce !== void 0 && typeof directives.debounceMs !== "number";
	const queueCapInvalid = directives.rawCap !== void 0 && typeof directives.cap !== "number";
	const queueDropInvalid = directives.rawDrop !== void 0 && !directives.dropPolicy;
	if (queueModeInvalid || queueDebounceInvalid || queueCapInvalid || queueDropInvalid) {
		const errors = [];
		if (queueModeInvalid) errors.push(`Unrecognized queue mode "${directives.rawQueueMode ?? ""}". Valid modes: steer, followup, collect, interrupt.`);
		if (queueDebounceInvalid) errors.push(`Invalid debounce "${directives.rawDebounce ?? ""}". Use ms/s/m (e.g. debounce:1500ms, debounce:2s).`);
		if (queueCapInvalid) errors.push(`Invalid cap "${directives.rawCap ?? ""}". Use a positive integer (e.g. cap:10).`);
		if (queueDropInvalid) errors.push(`Invalid drop policy "${directives.rawDrop ?? ""}". Use drop:old, drop:new, or drop:summarize.`);
		return { text: errors.join(" ") };
	}
}
//#endregion
//#region src/auto-reply/reply/directive-handling.impl.ts
/** Applies directive-only command state changes without running the agent. */
/** Handles inline directives that can be acknowledged without a model turn. */
async function handleDirectiveOnly(params) {
	const { directives, sessionEntry, sessionStore, sessionKey, storePath, elevatedEnabled, elevatedAllowed, defaultProvider, defaultModel, aliasIndex, policyAliasIndex, allowedModelKeys, allowedModelCatalog, resetModelOverride, provider, model, initialModelLabel, formatModelSwitchEvent, currentThinkLevel, currentFastMode, currentVerboseLevel, currentReasoningLevel, currentElevatedLevel } = params;
	const allowPrivilegedPersistence = canPersistSessionDirectiveDefaults(params);
	const rejectModelTransaction = (errorText) => rejectSessionDirectiveTransaction(params.persistenceState, errorText);
	const acknowledgeIgnoredDirective = (reply, ignoredDirective) => acknowledgeIgnoredSessionDirective({
		reply,
		directives,
		ignoredDirective,
		persistenceState: params.persistenceState,
		allowPrivilegedPersistence,
		applyRemainingDirectives: (remainingDirectives) => handleDirectiveOnly({
			...params,
			directives: remainingDirectives
		})
	});
	const delegatedTraceAllowed = (params.gatewayClientScopes ?? []).includes("operator.admin");
	if (directives.hasTraceDirective && !params.senderIsOwner && !delegatedTraceAllowed) return acknowledgeIgnoredDirective({ text: "❌ /trace is restricted to owners and gateway clients with operator.admin scope." }, "hasTraceDirective");
	const activeAgentId = resolveSessionAgentId({
		sessionKey: params.sessionKey,
		config: params.cfg
	});
	const agentDir = resolveAgentDir(params.cfg, activeAgentId);
	const runtimePolicySessionKey = resolveRuntimePolicySessionKey({
		cfg: params.cfg,
		ctx: params.ctx,
		sessionKey: params.sessionKey
	});
	const runtimeIsSandboxed = resolveSandboxRuntimeStatus({
		cfg: params.cfg,
		sessionKey: runtimePolicySessionKey
	}).sandboxed;
	const shouldHintDirectRuntime = directives.hasElevatedDirective && !runtimeIsSandboxed;
	const thinkingCatalog = params.thinkingCatalog && params.thinkingCatalog.length > 0 ? params.thinkingCatalog : allowedModelCatalog.length > 0 ? allowedModelCatalog : void 0;
	const modelInfo = await maybeHandleModelDirectiveInfo({
		directives,
		cfg: params.cfg,
		agentDir,
		activeAgentId,
		provider,
		model,
		defaultProvider,
		defaultModel,
		aliasIndex,
		policyAliasIndex,
		allowedModelKeys,
		allowedModelCatalog,
		currentThinkLevel: currentThinkLevel ?? "off",
		thinkingCatalog,
		runtimePolicySessionKey,
		resetModelOverride,
		workspaceDir: params.workspaceDir,
		surface: params.surface,
		sessionEntry
	});
	if (modelInfo) return acknowledgeIgnoredDirective(modelInfo, "hasModelDirective");
	const modelResolution = resolveModelSelectionFromDirective({
		directives,
		cfg: params.cfg,
		agentDir,
		defaultProvider,
		defaultModel,
		aliasIndex,
		allowedModelKeys,
		allowedModelCatalog,
		provider,
		agentId: activeAgentId
	});
	if (modelResolution.errorText) return rejectModelTransaction(modelResolution.errorText);
	const modelSelection = modelResolution.modelSelection;
	const profileOverride = modelResolution.profileOverride;
	if (modelSelection && isModelSelectionLocked(sessionEntry)) return rejectModelTransaction(MODEL_SELECTION_LOCKED_MESSAGE);
	const resolvedProvider = modelSelection?.provider ?? provider;
	const resolvedModel = modelSelection?.model ?? model;
	const modelRuntimeResolution = modelSelection ? resolveModelRuntimeDirective({
		rawRuntime: directives.rawModelRuntime,
		provider: resolvedProvider,
		cfg: params.cfg,
		sessionEntry
	}) : { kind: "unchanged" };
	if (modelRuntimeResolution.kind === "invalid") return rejectModelTransaction(modelRuntimeResolution.errorText);
	const prospectiveSessionEntry = { ...sessionEntry };
	applyModelRuntimeDirective(prospectiveSessionEntry, modelRuntimeResolution);
	const thinkingRuntime = resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: resolvedProvider,
		modelId: resolvedModel,
		agentId: activeAgentId,
		sessionKey: runtimePolicySessionKey,
		sessionEntry: prospectiveSessionEntry
	});
	const fastModeState = resolveFastModeState({
		cfg: params.cfg,
		provider: resolvedProvider,
		model: resolvedModel,
		agentId: activeAgentId,
		sessionEntry: directives.clearFastMode ? void 0 : sessionEntry
	});
	const effectiveFastMode = directives.fastMode ?? (directives.clearFastMode ? fastModeState.mode : currentFastMode) ?? fastModeState.mode;
	const effectiveFastModeSource = directives.fastMode !== void 0 ? "session" : fastModeState.source;
	if (directives.hasThinkDirective && !directives.thinkLevel && !directives.clearThinkLevel) {
		if (!directives.rawThinkLevel) return acknowledgeIgnoredDirective({ text: withOptions(`Current thinking level: ${resolveSupportedThinkingLevel({
			provider: resolvedProvider,
			model: resolvedModel,
			level: currentThinkLevel ?? "off",
			catalog: thinkingCatalog,
			agentRuntime: thinkingRuntime
		})}.`, `default, ${formatThinkingLevels(resolvedProvider, resolvedModel, ", ", thinkingCatalog, thinkingRuntime)}`) }, "hasThinkDirective");
		return acknowledgeIgnoredDirective({ text: `Unrecognized thinking level "${directives.rawThinkLevel}". Valid levels: default, ${formatThinkingLevels(resolvedProvider, resolvedModel, ", ", thinkingCatalog, thinkingRuntime)}.` }, "hasThinkDirective");
	}
	if (directives.hasVerboseDirective && !directives.verboseLevel) return acknowledgeIgnoredDirective({ text: directives.rawVerboseLevel ? `Unrecognized verbose level "${directives.rawVerboseLevel}". Valid levels: off, on, full.` : withOptions(`Current verbose level: ${currentVerboseLevel ?? "off"}.`, "on, full, off") }, "hasVerboseDirective");
	if (directives.hasTraceDirective && !directives.traceLevel) return acknowledgeIgnoredDirective({ text: directives.rawTraceLevel ? `Unrecognized trace level "${directives.rawTraceLevel}". Valid levels: off, on, raw.` : withOptions(`Current trace level: ${sessionEntry.traceLevel ?? "off"}.`, "on, off, raw") }, "hasTraceDirective");
	if (directives.hasFastDirective && directives.fastMode === void 0 && !directives.clearFastMode) {
		const isFastStatus = normalizeLowercaseStringOrEmpty(directives.rawFastMode) === "status";
		if (!directives.rawFastMode || isFastStatus) {
			const statusText = formatFastModeCurrentStatus({
				mode: effectiveFastMode,
				source: effectiveFastModeSource,
				fastAutoOnSeconds: fastModeState.fastAutoOnSeconds
			});
			return acknowledgeIgnoredDirective({ text: isFastStatus ? statusText : withOptions(statusText, formatFastModeCommandOptions({ fastAutoOnSeconds: fastModeState.fastAutoOnSeconds })) }, "hasFastDirective");
		}
		return acknowledgeIgnoredDirective({ text: `Unrecognized fast mode "${directives.rawFastMode}". Valid levels: on, off, auto, default, status.` }, "hasFastDirective");
	}
	if (directives.hasReasoningDirective && !directives.reasoningLevel) return acknowledgeIgnoredDirective({ text: directives.rawReasoningLevel ? `Unrecognized reasoning level "${directives.rawReasoningLevel}". Valid levels: on, off, stream.` : withOptions(`Current reasoning level: ${currentReasoningLevel ?? "off"}.`, "on, off, stream") }, "hasReasoningDirective");
	if (directives.hasElevatedDirective && !directives.elevatedLevel) {
		if (!directives.rawElevatedLevel) {
			if (!elevatedEnabled || !elevatedAllowed) return acknowledgeIgnoredDirective({ text: formatElevatedUnavailableText({
				runtimeSandboxed: runtimeIsSandboxed,
				failures: params.elevatedFailures,
				sessionKey: params.sessionKey
			}) }, "hasElevatedDirective");
			return acknowledgeIgnoredDirective({ text: [withOptions(`Current elevated level: ${currentElevatedLevel ?? "off"}.`, "on, off, ask, full"), shouldHintDirectRuntime ? formatElevatedRuntimeHint() : null].filter(Boolean).join("\n") }, "hasElevatedDirective");
		}
		return acknowledgeIgnoredDirective({ text: `Unrecognized elevated level "${directives.rawElevatedLevel}". Valid levels: off, on, ask, full.` }, "hasElevatedDirective");
	}
	if (directives.hasElevatedDirective && (!elevatedEnabled || !elevatedAllowed)) return acknowledgeIgnoredDirective({ text: formatElevatedUnavailableText({
		runtimeSandboxed: runtimeIsSandboxed,
		failures: params.elevatedFailures,
		sessionKey: params.sessionKey
	}) }, "hasElevatedDirective");
	if (directives.hasExecDirective) {
		const invalidExecMessage = directives.invalidExecHost ? `Unrecognized exec host "${directives.rawExecHost ?? ""}". Valid hosts: auto, sandbox, gateway, node.` : directives.invalidExecSecurity ? `Unrecognized exec security "${directives.rawExecSecurity ?? ""}". Valid: deny, allowlist, full.` : directives.invalidExecAsk ? `Unrecognized exec ask "${directives.rawExecAsk ?? ""}". Valid: off, on-miss, always.` : directives.invalidExecNode ? "Exec node requires a value." : void 0;
		if (invalidExecMessage) return acknowledgeIgnoredDirective({ text: invalidExecMessage }, "hasExecDirective");
		const unexpectedExecArguments = maybeHandleUnexpectedNativeDirectiveArguments(directives);
		if (unexpectedExecArguments) return unexpectedExecArguments;
		if (!directives.hasExecOptions) {
			const execDefaults = resolveExecDefaults({
				cfg: params.cfg,
				sessionEntry,
				agentId: activeAgentId,
				sandboxAvailable: runtimeIsSandboxed
			});
			const nodeLabel = execDefaults.node ? `node=${execDefaults.node}` : "node=(unset)";
			return acknowledgeIgnoredDirective({ text: withOptions(`Current exec defaults: host=${renderExecTargetLabel(execDefaults.host)}, effective=${execDefaults.effectiveHost}, security=${execDefaults.security}, ask=${execDefaults.ask}, ${nodeLabel}.`, "host=auto|sandbox|gateway|node, security=deny|allowlist|full, ask=off|on-miss|always, node=<id>") }, "hasExecDirective");
		}
	}
	const queueAck = maybeHandleQueueDirective({
		directives,
		cfg: params.cfg,
		channel: provider,
		sessionEntry
	});
	if (queueAck) return acknowledgeIgnoredDirective(queueAck, "hasQueueDirective");
	const unexpectedNativeArguments = maybeHandleUnexpectedNativeDirectiveArguments(directives);
	if (unexpectedNativeArguments) return unexpectedNativeArguments;
	if (directives.hasThinkDirective && directives.thinkLevel && !isThinkingLevelSupported({
		provider: resolvedProvider,
		model: resolvedModel,
		level: directives.thinkLevel,
		catalog: thinkingCatalog,
		agentRuntime: thinkingRuntime
	})) return rejectModelTransaction(`Thinking level "${directives.thinkLevel}" is not supported for ${resolvedProvider}/${resolvedModel}. Use one of: ${formatThinkingLevels(resolvedProvider, resolvedModel, ", ", thinkingCatalog, thinkingRuntime)}.`);
	const nextThinkLevel = directives.hasThinkDirective ? directives.thinkLevel : sessionEntry?.thinkingLevel ?? currentThinkLevel;
	const remappedUnsupportedThinkLevel = !directives.hasThinkDirective && nextThinkLevel && !isThinkingLevelSupported({
		provider: resolvedProvider,
		model: resolvedModel,
		level: nextThinkLevel,
		catalog: thinkingCatalog,
		agentRuntime: thinkingRuntime
	}) ? resolveSupportedThinkingLevel({
		provider: resolvedProvider,
		model: resolvedModel,
		level: nextThinkLevel,
		catalog: thinkingCatalog,
		agentRuntime: thinkingRuntime
	}) : void 0;
	const shouldRemapUnsupportedThinkLevel = Boolean(remappedUnsupportedThinkLevel) && remappedUnsupportedThinkLevel !== nextThinkLevel;
	const prevReasoningLevel = currentReasoningLevel ?? sessionEntry.reasoningLevel ?? "off";
	const elevatedChanged = directives.hasElevatedDirective && directives.elevatedLevel !== void 0 && directives.elevatedLevel !== (currentElevatedLevel ?? sessionEntry.elevatedLevel ?? "off") && elevatedEnabled && elevatedAllowed;
	let modelSelectionUpdated = false;
	const appliedSessionEntry = sessionEntry;
	const touchedSessionFields = resolveDirectiveTouchedSessionFields({
		directives,
		allowPrivilegedPersistence
	});
	if (shouldRemapUnsupportedThinkLevel && !touchedSessionFields.includes("thinkingLevel")) touchedSessionFields.push("thinkingLevel");
	const shouldPersistSessionEntry = touchedSessionFields.length > 0;
	const fastModeChanged = directives.hasFastDirective && directives.fastMode !== void 0 && directives.fastMode !== currentFastMode || directives.clearFastMode && currentFastMode !== fastModeState.mode;
	const reasoningChanged = directives.hasReasoningDirective && directives.reasoningLevel !== void 0 && directives.reasoningLevel !== prevReasoningLevel;
	if (shouldPersistSessionEntry) {
		const initialSessionEntry = { ...sessionEntry };
		applySessionDirectiveFields({
			directives,
			sessionEntry,
			allowPrivilegedPersistence,
			allowTracePersistence: true,
			allowElevatedPersistence: elevatedEnabled && elevatedAllowed,
			persistDirectiveOnlyFields: true
		});
		if (shouldRemapUnsupportedThinkLevel && remappedUnsupportedThinkLevel) sessionEntry.thinkingLevel = remappedUnsupportedThinkLevel;
		if (modelSelection) {
			const applied = applyModelOverrideToSessionEntry({
				entry: sessionEntry,
				selection: modelSelection,
				profileOverride,
				markLiveSwitchPending: true
			});
			const appliedRuntime = applyModelRuntimeDirective(sessionEntry, modelRuntimeResolution);
			modelSelectionUpdated = applied.updated || appliedRuntime.updated;
		}
		sessionEntry.updatedAt = Date.now();
		sessionStore[sessionKey] = sessionEntry;
		if (storePath) {
			const persistence = await persistSessionDirectiveSnapshot({
				storePath,
				sessionKey,
				initialEntry: initialSessionEntry,
				sessionEntry,
				sessionStore,
				hasModelSelection: Boolean(modelSelection),
				reassertLiveModelSwitchPending: modelSelectionUpdated && sessionEntry.liveModelSwitchPending === true,
				touchedFields: touchedSessionFields
			});
			if (persistence.status !== "applied") return rejectModelTransaction(persistence.status === "model-selection-locked" ? MODEL_SELECTION_LOCKED_MESSAGE : modelSelection ? "Model change was not applied because the session changed. Retry." : "Session settings were not applied because the session changed. Retry.");
		}
		if (modelSelection && !modelSelection.isDefault && params.canPersistStickyModelSelection === true) persistStickyModelSelectionBestEffort({
			agentId: activeAgentId,
			model: `${modelSelection.provider}/${modelSelection.model}`
		});
		if (modelSelection && modelSelectionUpdated && sessionKey) {
			triggerSessionPatchHook({
				cfg: params.cfg,
				sessionEntry: appliedSessionEntry,
				sessionKey,
				patch: {
					key: sessionKey,
					model: directives.rawModelDirective ?? `${modelSelection.provider}/${modelSelection.model}`
				}
			});
			refreshQueuedFollowupSession({
				key: sessionKey,
				nextProvider: modelSelection.provider,
				nextModel: modelSelection.model,
				nextRouteResolution: "resolved",
				nextModelOverrideSource: "user",
				nextAuthProfileId: appliedSessionEntry.authProfileOverride,
				nextAuthProfileIdSource: appliedSessionEntry.authProfileOverrideSource,
				nextThinking: {
					level: appliedSessionEntry.thinkingLevel,
					catalog: thinkingCatalog,
					agentRuntime: resolveEffectiveAgentRuntime({
						cfg: params.cfg,
						provider: modelSelection.provider,
						modelId: modelSelection.model,
						agentId: activeAgentId,
						sessionKey: runtimePolicySessionKey,
						sessionEntry: appliedSessionEntry
					})
				}
			});
		}
	}
	if (modelSelection) {
		const nextLabel = `${modelSelection.provider}/${modelSelection.model}`;
		if (nextLabel !== initialModelLabel) enqueueSystemEvent(formatModelSwitchEvent(nextLabel, modelSelection.alias), {
			sessionKey,
			contextKey: `model:${nextLabel}`
		});
	}
	enqueueModeSwitchEvents({
		enqueueSystemEvent,
		sessionEntry: appliedSessionEntry,
		sessionKey,
		elevatedChanged,
		reasoningChanged
	});
	if (params.persistenceState) params.persistenceState.outcome = {
		kind: "applied",
		provider: resolvedProvider,
		model: resolvedModel
	};
	const parts = [];
	if (directives.clearThinkLevel) parts.push("Thinking level reset to default.");
	else if (directives.hasThinkDirective && directives.thinkLevel) parts.push(directives.thinkLevel === "off" ? "Thinking disabled." : `Thinking level set to ${directives.thinkLevel}.`);
	if (directives.clearFastMode) parts.push(formatDirectiveAck("Fast mode reset to default."));
	else if (directives.hasFastDirective && directives.fastMode !== void 0) parts.push(directives.fastMode === "auto" ? formatDirectiveAck("Fast mode set to auto.") : directives.fastMode ? formatDirectiveAck("Fast mode enabled.") : formatDirectiveAck("Fast mode disabled."));
	if (directives.hasVerboseDirective && directives.verboseLevel) {
		const message = allowPrivilegedPersistence ? DIRECTIVE_ACK_MESSAGES.verbose[directives.verboseLevel] : formatInternalVerboseCurrentReplyOnlyText();
		parts.push(formatDirectiveAck(message));
	}
	if (directives.hasTraceDirective && directives.traceLevel) parts.push(formatDirectiveAck(DIRECTIVE_ACK_MESSAGES.trace[directives.traceLevel]));
	if (directives.hasVerboseDirective && directives.verboseLevel && !allowPrivilegedPersistence) parts.push(formatDirectiveAck(formatInternalVerbosePersistenceDeniedText()));
	if (directives.hasReasoningDirective && directives.reasoningLevel) parts.push(formatDirectiveAck(DIRECTIVE_ACK_MESSAGES.reasoning[directives.reasoningLevel]));
	if (directives.hasElevatedDirective && directives.elevatedLevel) {
		parts.push(formatDirectiveAck(DIRECTIVE_ACK_MESSAGES.elevated[directives.elevatedLevel]));
		if (shouldHintDirectRuntime) parts.push(formatElevatedRuntimeHint());
	}
	if (directives.hasExecDirective && directives.hasExecOptions && allowPrivilegedPersistence) {
		const execParts = Object.entries({
			host: directives.execHost,
			security: directives.execSecurity,
			ask: directives.execAsk,
			node: directives.execNode
		}).filter(([, value]) => Boolean(value)).map(([key, value]) => `${key}=${value}`);
		if (execParts.length > 0) parts.push(formatDirectiveAck(`Exec defaults set (${execParts.join(", ")}).`));
	}
	if (directives.hasExecDirective && directives.hasExecOptions && !allowPrivilegedPersistence) parts.push(formatDirectiveAck(formatInternalExecPersistenceDeniedText()));
	if (modelSelection) {
		const label = `${modelSelection.provider}/${modelSelection.model}`;
		const labelWithAlias = modelSelection.alias ? `${modelSelection.alias} (${label})` : label;
		parts.push(modelSelection.isDefault ? `Model reset to default (${labelWithAlias}).` : `Model set to ${labelWithAlias} for this session.`);
		if (profileOverride) parts.push(`Auth profile set to ${profileOverride}.`);
		if (modelRuntimeResolution.kind === "clear") parts.push("Runtime reset to configured policy.");
		else if (modelRuntimeResolution.kind === "set") parts.push(`Runtime set to ${modelRuntimeResolution.runtime} for this session.`);
	}
	if (!directives.hasThinkDirective && shouldRemapUnsupportedThinkLevel && remappedUnsupportedThinkLevel) parts.push(`Thinking level set to ${remappedUnsupportedThinkLevel} (${nextThinkLevel} not supported for ${resolvedProvider}/${resolvedModel}).`);
	if (directives.hasQueueDirective && directives.queueMode) parts.push(formatDirectiveAck(`Queue mode set to ${directives.queueMode}.`));
	else if (directives.hasQueueDirective && directives.queueReset) parts.push(formatDirectiveAck("Queue mode reset to default."));
	if (directives.hasQueueDirective && typeof directives.debounceMs === "number") parts.push(formatDirectiveAck(`Queue debounce set to ${directives.debounceMs}ms.`));
	if (directives.hasQueueDirective && typeof directives.cap === "number") parts.push(formatDirectiveAck(`Queue cap set to ${directives.cap}.`));
	if (directives.hasQueueDirective && directives.dropPolicy) parts.push(formatDirectiveAck(`Queue drop set to ${directives.dropPolicy}.`));
	if (fastModeChanged) {
		const nextFastMode = directives.clearFastMode ? fastModeState.mode : sessionEntry.fastMode;
		enqueueSystemEvent(nextFastMode === "auto" ? "Fast mode set to auto." : `Fast mode ${nextFastMode ? "enabled" : "disabled"}.`, {
			sessionKey,
			contextKey: `fast:${formatFastModeValue(nextFastMode)}`
		});
	}
	const ack = parts.join(" ").trim();
	if (!ack && directives.hasStatusDirective) return;
	return { text: ack || "OK." };
}
//#endregion
export { handleDirectiveOnly };
