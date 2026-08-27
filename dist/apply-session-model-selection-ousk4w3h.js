import { c as resolveContextConfigProviderForRuntime, g as isDefaultAgentRuntimeId, v as normalizeOptionalAgentRuntimeId } from "./openai-routing-G4z6ipSe.js";
import { t as modelKey } from "./model-key-BaNhQShd.js";
import { n as isThinkingLevelSupported, o as resolveSupportedThinkingLevel } from "./thinking-CLPqbAwx.js";
import { s as normalizeProviderId } from "./model-ref-shared-BCBRWGJh.js";
import "./model-selection-4mvNeCA1.js";
import { a as enqueueSystemEvent } from "./system-events-fsxpbPNB.js";
import { r as resolveSessionRuntimeOverrideForProvider, t as resolveCompatibleAgentRuntimeForProvider } from "./session-runtime-compat-CDBgUbgw.js";
import { a as resolveEffectiveAgentRuntime } from "./thinking-runtime-93ZQ8Ibj.js";
import { s as refreshQueuedFollowupSession } from "./state-CRjZ_OD8.js";
import { a as isModelSelectionLocked, i as applyModelOverrideToSessionEntry, t as MODEL_SELECTION_LOCKED_MESSAGE } from "./model-overrides-BT6Lelev.js";
import "./queue-DIufyn8Z.js";
import { t as triggerSessionPatchHook } from "./session-patch-hooks-CD1TuQiS.js";
import { a as sessionModelOverrideChangesApplied, n as adoptPersistedSessionSnapshot, t as SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS } from "./session-snapshot-merge-Bi3PsSDQ.js";
import { t as applyModelRuntimeDirective } from "./directive-handling.model-runtime-CLQOQyMI.js";
import { t as resolveContextTokens } from "./model-selection-context-D9G3jfb4.js";
import { t as persistReplySessionEntry } from "./session-entry-persistence-DSn-gj0Z.js";
import { t as persistStickyModelSelectionBestEffort } from "./sticky-model-selection-DiHWwvWQ.js";
//#region src/model-picker/apply-session-model-selection.ts
/** Applies the model transaction field family to one caller-owned snapshot. */
function applySessionModelSelectionToEntry(params) {
	const modelChange = applyModelOverrideToSessionEntry({
		entry: params.entry,
		selection: params.request,
		profileOverride: params.request.profileOverride,
		markLiveSwitchPending: params.markLiveSwitchPending
	});
	const runtimeChange = applyModelRuntimeDirective(params.entry, params.runtime);
	return {
		changed: modelChange.updated || runtimeChange.updated,
		...params.runtime.kind === "clear" || params.runtime.kind === "set" ? { runtimeChange: params.runtime } : {}
	};
}
function resolveRuntimeDirective(params) {
	if (params.request.kind === "unchanged") {
		if (params.entry.agentRuntimeOverride?.trim() && !resolveSessionRuntimeOverrideForProvider({
			provider: params.provider,
			entry: params.entry,
			cfg: params.cfg
		})) return { kind: "clear" };
		return params.request;
	}
	if (params.request.kind === "clear") return params.request;
	const runtime = normalizeOptionalAgentRuntimeId(params.request.runtime);
	if (isDefaultAgentRuntimeId(runtime)) return { kind: "clear" };
	const provider = normalizeProviderId(params.provider);
	const compatibleRuntime = resolveCompatibleAgentRuntimeForProvider({
		provider,
		runtime,
		cfg: params.cfg
	});
	return compatibleRuntime ? {
		kind: "set",
		runtime: compatibleRuntime
	} : {
		kind: "invalid",
		message: `Runtime "${params.request.runtime}" is not supported for ${provider || params.provider}.`
	};
}
function formatModelSwitchEvent(provider, model, alias) {
	const label = `${provider}/${model}`;
	return alias ? `Model switched to ${alias} (${label}).` : `Model switched to ${label}.`;
}
function rejectNotAllowed(provider, model) {
	return {
		status: "rejected",
		reason: "not-allowed",
		message: `Model ${provider}/${model} is not available for this agent.`
	};
}
/** Applies one validated picker selection to the authoritative live session. */
async function applySessionModelSelection(params) {
	const startingEntry = params.storePath ? params.sessionEntry : params.sessionStore[params.sessionKey] ?? params.sessionEntry;
	if (isModelSelectionLocked(startingEntry)) return {
		status: "rejected",
		reason: "locked",
		message: MODEL_SELECTION_LOCKED_MESSAGE
	};
	const normalizedModelKey = modelKey(params.request.provider, params.request.model);
	if (params.allowedModelKeys.size > 0 && !params.allowedModelKeys.has(normalizedModelKey) || !params.modelCatalog.some((entry) => modelKey(entry.provider, entry.id) === normalizedModelKey)) return rejectNotAllowed(params.request.provider, params.request.model);
	const request = {
		...params.request,
		isDefault: normalizedModelKey === modelKey(params.defaultProvider, params.defaultModel)
	};
	const runtime = resolveRuntimeDirective({
		cfg: params.cfg,
		entry: startingEntry,
		provider: request.provider,
		request: request.runtime
	});
	if (runtime.kind === "invalid") return {
		status: "rejected",
		reason: "invalid-runtime",
		message: runtime.message
	};
	const initialEntry = { ...startingEntry };
	const nextEntry = { ...startingEntry };
	const applied = applySessionModelSelectionToEntry({
		entry: nextEntry,
		request,
		runtime,
		markLiveSwitchPending: params.markLiveSwitchPending
	});
	const thinkingCatalog = params.thinkingCatalog ?? params.modelCatalog;
	const thinkingRuntime = resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: request.provider,
		modelId: request.model,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		sessionEntry: nextEntry
	});
	const currentThinkingLevel = nextEntry.thinkingLevel;
	let thinkingRemap;
	if (currentThinkingLevel && !isThinkingLevelSupported({
		provider: request.provider,
		model: request.model,
		level: currentThinkingLevel,
		catalog: [...thinkingCatalog],
		agentRuntime: thinkingRuntime
	})) {
		const remapped = resolveSupportedThinkingLevel({
			provider: request.provider,
			model: request.model,
			level: currentThinkingLevel,
			catalog: [...thinkingCatalog],
			agentRuntime: thinkingRuntime
		});
		if (remapped !== currentThinkingLevel) {
			nextEntry.thinkingLevel = remapped;
			thinkingRemap = {
				from: currentThinkingLevel,
				to: remapped,
				provider: request.provider,
				model: request.model
			};
		}
	}
	nextEntry.updatedAt = Date.now();
	let persistedEntry;
	if (params.storePath) {
		const persistence = await persistReplySessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey,
			initialEntry,
			entry: nextEntry,
			reassertLiveModelSwitchPending: applied.changed && nextEntry.liveModelSwitchPending === true,
			requireModelSelectionUnlocked: true,
			touchedFields: SESSION_MODEL_OVERRIDE_TRANSACTION_FIELDS
		});
		if (persistence.entry) {
			params.sessionStore[params.sessionKey] = persistence.entry;
			adoptPersistedSessionSnapshot(params.sessionEntry, persistence.entry);
		}
		if (persistence.status === "model-selection-locked") return {
			status: "rejected",
			reason: "locked",
			message: MODEL_SELECTION_LOCKED_MESSAGE
		};
		if (persistence.status !== "current" || !sessionModelOverrideChangesApplied({
			initial: initialEntry,
			next: nextEntry,
			current: persistence.entry,
			reassertLiveModelSwitchPending: applied.changed && nextEntry.liveModelSwitchPending === true
		})) return {
			status: "conflict",
			message: "Model change was not applied because the session changed. Retry."
		};
		persistedEntry = persistence.entry;
	} else {
		adoptPersistedSessionSnapshot(params.sessionEntry, nextEntry);
		params.sessionStore[params.sessionKey] = params.sessionEntry;
		persistedEntry = params.sessionEntry;
	}
	const provider = request.provider;
	const model = request.model;
	const effectiveModelRef = `${provider}/${model}`;
	const changed = applied.changed || thinkingRemap !== void 0;
	if (params.canPersistStickyModelSelection === true && !request.isDefault) persistStickyModelSelectionBestEffort({
		agentId: params.agentId,
		model: effectiveModelRef
	});
	if (changed) {
		triggerSessionPatchHook({
			cfg: params.cfg,
			sessionEntry: persistedEntry,
			sessionKey: params.sessionKey,
			patch: {
				key: params.sessionKey,
				model: params.patchModel ?? effectiveModelRef
			}
		});
		refreshQueuedFollowupSession({
			key: params.sessionKey,
			nextProvider: provider,
			nextModel: model,
			nextRouteResolution: "resolved",
			nextModelOverrideSource: "user",
			nextAuthProfileId: persistedEntry.authProfileOverride,
			nextAuthProfileIdSource: persistedEntry.authProfileOverrideSource,
			nextThinking: {
				level: persistedEntry.thinkingLevel,
				catalog: [...thinkingCatalog],
				agentRuntime: resolveEffectiveAgentRuntime({
					cfg: params.cfg,
					provider,
					modelId: model,
					agentId: params.agentId,
					sessionKey: params.sessionKey,
					sessionEntry: persistedEntry
				})
			}
		});
	}
	if (`${params.currentProvider}/${params.currentModel}` !== effectiveModelRef) enqueueSystemEvent(formatModelSwitchEvent(provider, model, request.alias), {
		sessionKey: params.sessionKey,
		contextKey: `model:${effectiveModelRef}`
	});
	const selectedCatalogEntry = params.modelCatalog.find((entry) => modelKey(entry.provider, entry.id) === normalizedModelKey);
	const contextProvider = resolveContextConfigProviderForRuntime({
		provider,
		runtimeId: resolveEffectiveAgentRuntime({
			cfg: params.cfg,
			provider,
			modelId: model,
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			sessionEntry: persistedEntry
		}),
		config: params.cfg
	});
	return {
		status: "applied",
		provider,
		model,
		effectiveModelRef,
		changed,
		contextTokens: resolveContextTokens({
			cfg: params.cfg,
			agentCfg: params.cfg.agents?.defaults,
			provider: contextProvider,
			model,
			modelContextWindow: selectedCatalogEntry?.contextWindow,
			modelContextTokens: selectedCatalogEntry?.contextTokens
		}),
		...applied.runtimeChange ? { runtimeChange: applied.runtimeChange } : {},
		...thinkingRemap ? { thinkingRemap } : {}
	};
}
//#endregion
export { applySessionModelSelection as t };
