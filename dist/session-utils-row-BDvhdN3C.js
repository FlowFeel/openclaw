import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString, s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import "./utils-Bs67j6-3.js";
import { t as resolveNonNegativeNumber } from "./number-coercion-IpMOa8nH.js";
import { f as resolveDefaultAgentId, i as listAgentIds, n as listAgentEntries, o as resolveAgentConfig, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey, n as isAcpSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import "./session-key-DtTE9-Tg.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { r as stripInboundMetadata } from "./strip-inbound-meta-BOGiSpdi.js";
import { j as projectPluginSessionExtensionsSync } from "./loader-BmgwYkg7.js";
import { r as resolveAgentModelFallbackValues } from "./model-input-BofPWz0k.js";
import { d as resolveAgentModelFallbacksOverride, o as resolveAgentEffectiveModelPrimary } from "./agent-scope-DyEposw2.js";
import { d as resolveEffectiveResponseUsage, s as normalizeThinkLevel } from "./thinking.shared-k6K-6JHM.js";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.js";
import { n as DEFAULT_MODEL, r as DEFAULT_PROVIDER } from "./defaults-CdX9UGcX.js";
import { i as listThinkingLevelOptions, o as resolveSupportedThinkingLevel } from "./thinking-CLPqbAwx.js";
import { D as findModelCatalogEntry, b as resolveConfiguredModelRef, d as inferUniqueProviderFromConfiguredModels, k as modelSupportsInput } from "./model-selection-shared-BDTPW9Jk.js";
import { n as parseModelRef, t as findNormalizedProviderValue } from "./model-selection-normalize-Bae-aoqX.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-B7v0y8up.js";
import { rt as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db--PLC25lY.js";
import { l as projectSessionDeliveryFields } from "./delivery-context.shared-B-QSuGw_.js";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-76XnXM8q.js";
import { r as resolveAgentMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { i as resolveStoredSessionKeyForAgentStore, n as resolveSessionStoreAgentId, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { $ as listSqliteSessionChildEntriesReadOnly, nt as listSqliteSessionEntriesReadOnly, ot as loadExactSqliteSessionEntryReadOnly, wt as sessionEntryForkedFromParent } from "./session-accessor.sqlite-B9iW7DOt.js";
import { i as buildGroupDisplayTitle, r as buildGroupDisplayName } from "./store-entry-shape-DB6qjwcl.js";
import { U as canonicalSessionKeyMigrationRequiredError, c as resolveExistingAgentSessionStoreTargetsSync, t as isConfiguredSessionStoreAgentId } from "./targets-Dooi6t13.js";
import { A as resolveFreshSessionTotalTokens, E as isTerminalSessionStatus } from "./session-entry-slot-keys-DR5d2mKt.js";
import { $ as listSessionEntries, a as readSessionTranscriptWatermark, g as readSessionTranscriptMessageEventPage, o as readSessionTranscriptWatermarkBatch, s as readSessionTranscriptTitleProbeBatch } from "./session-accessor-t3qUoTeV.js";
import { l_ as SESSION_AGENT_ATTENTION_ICON_IDS } from "./src-BSn6va4B.js";
import "./model-catalog-B8e14jEf.js";
import { t as publishedModelCatalogOwnerMatchesAgent } from "./prepared-model-catalog-owner-qCUl7GW6.js";
import { n as resolveThinkingDefault } from "./model-thinking-default-VKKhnMLC.js";
import { t as isCliProvider } from "./model-selection-cli-CYqAnhSh.js";
import { r as normalizeStoredOverrideModel } from "./model-selection-4mvNeCA1.js";
import { d as sanitizeUserFacingText } from "./sanitize-user-facing-text-Ba4C3tZ5.js";
import { t as classifySessionKind } from "./classify-session-kind-CRKc5-5D.js";
import { a as readAcpSessionMetaForEntry, o as repairAcpSessionMetaKeyForMigration, r as readAcpSessionMeta } from "./session-meta-DqFXJodN.js";
import { s as resolveCronSessionTargetSessionKey } from "./session-target-DJsUULzX.js";
import { v as resolveSessionGoalDisplayState } from "./sessions-CBo4LOdS.js";
import { a as readRecentSessionUsageFromTranscript, f as resolveTranscriptReadTarget, m as toTranscriptReadScope, n as extractMessageText, p as sqliteMessageEventWithSeq, t as extractMessageRole } from "./session-transcript-readers-O3pZVV3x.js";
import { n as resolveSessionModelRef, t as resolveSessionModelIdentityRef } from "./session-model-ref-SCzh_dh2.js";
import { a as shouldKeepSubagentRunChildLink, l as resolveSubagentSessionStatus, o as getSubagentSessionRuntimeMs, s as getSubagentSessionStartedAt } from "./subagent-run-liveness-CjxLH_UA.js";
import { l as listSubagentRunsForController, n as buildSubagentSessionListReadIndex, o as getSessionDisplaySubagentRunByChildSessionKey, r as countActiveDescendantRuns, s as isSubagentRunLive } from "./subagent-registry-read-DBYMH4dZ.js";
import { i as resolveModelCostConfig, t as estimateUsageCost } from "./usage-format-DqSzIzj_.js";
import { t as resolveModelAgentRuntimeMetadata } from "./agent-runtime-metadata-BpP8rmoQ.js";
import { r as resolveSessionRuntimeOverrideForProvider } from "./session-runtime-compat-CDBgUbgw.js";
import { r as resolveAgentAvatarUrlFromSource } from "./identity-avatar-file-GibViNHN.js";
import { a as resolveEffectiveAgentRuntime, t as concretizeAgentRuntime } from "./thinking-runtime-93ZQ8Ibj.js";
import { i as insideGitCheckout } from "./git-CZbTw1tY.js";
import { t as listGatewayAgentsBasic } from "./agent-list-c7Bg3rPD.js";
import { i as lookupContextTokens, o as resolveContextTokensForModel } from "./context-DKZWKZZE.js";
import { t as resolveFastModeState } from "./fast-mode-DRb2pnqM.js";
import { t as resolveQueueSettings } from "./settings-B9QZfJQM.js";
import { a as getUserProfileListItem } from "./user-profiles-JHwrwmig.js";
import { t as resolveCronAgentSessionKey } from "./session-key-BFTxmFQN.js";
import { a as hasInterSessionUserProvenance } from "./input-provenance-CYGbY89H.js";
import { t as formatUserProfileAvatarPath } from "./user-profiles-http-path-CvR7l2ks.js";
//#region src/gateway/session-utils-contracts.ts
function createSessionRowModelCacheKey(provider, model) {
	return `${normalizeLowercaseStringOrEmpty(provider)}\0${normalizeOptionalString(model) ?? ""}`;
}
//#endregion
//#region src/gateway/session-utils-core.ts
const DERIVED_TITLE_MAX_LEN = 60;
function formatSessionIdPrefix(sessionId, updatedAt) {
	const prefix = sessionId.slice(0, 8);
	if (updatedAt && updatedAt > 0) return `${prefix} (${new Date(updatedAt).toISOString().slice(0, 10)})`;
	return prefix;
}
function truncateTitle(text, maxLen) {
	if (text.length <= maxLen) return text;
	const cut = truncateUtf16Safe(text, maxLen - 1);
	const lastSpace = cut.lastIndexOf(" ");
	if (lastSpace > maxLen * .6) return cut.slice(0, lastSpace) + "…";
	return cut + "…";
}
function deriveSessionTitle(entry, firstUserMessage, externalDisplayName) {
	if (!entry) return;
	const label = normalizeOptionalString(entry.label);
	if (label) return label;
	const displayName = normalizeOptionalString(externalDisplayName) ?? normalizeOptionalString(entry.displayName);
	if (displayName) return displayName;
	const subject = normalizeOptionalString(entry.subject);
	if (subject) return subject;
	const normalized = firstUserMessage ? stripInboundMetadata(firstUserMessage).replace(/\s+/g, " ").trim() : "";
	if (normalized) return truncateTitle(normalized, DERIVED_TITLE_MAX_LEN);
	if (entry.sessionId) return formatSessionIdPrefix(entry.sessionId, entry.updatedAt);
}
function resolvePositiveNumber(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
}
function deriveSessionUnread(entry) {
	return entry?.markedUnreadAt !== void 0 || entry?.lastReadAt !== void 0 && Math.max(entry.lastInteractionAt ?? 0, entry.lastActivityAt ?? 0) > entry.lastReadAt;
}
function isProjectableCompactionCheckpoint(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const checkpoint = value;
	return Boolean(normalizeOptionalString(checkpoint.checkpointId)) && typeof checkpoint.createdAt === "number" && Number.isFinite(checkpoint.createdAt) && (checkpoint.reason === "manual" || checkpoint.reason === "auto-threshold" || checkpoint.reason === "overflow-retry" || checkpoint.reason === "timeout-retry");
}
function resolveProjectableCompactionCheckpoints(entry) {
	const checkpoints = entry?.compactionCheckpoints;
	if (!Array.isArray(checkpoints) || checkpoints.length === 0) return [];
	return checkpoints.filter(isProjectableCompactionCheckpoint);
}
function resolveLatestCompactionCheckpoint(checkpoints) {
	return checkpoints.reduce((latest, checkpoint) => !latest || checkpoint.createdAt > latest.createdAt ? checkpoint : latest, void 0);
}
function buildCompactionCheckpointPreview(checkpoint) {
	if (!checkpoint) return;
	const checkpointId = normalizeOptionalString(checkpoint.checkpointId);
	const createdAt = checkpoint.createdAt;
	const reason = checkpoint.reason;
	if (!checkpointId || typeof createdAt !== "number" || !Number.isFinite(createdAt)) return;
	if (reason !== "manual" && reason !== "auto-threshold" && reason !== "overflow-retry" && reason !== "timeout-retry") return;
	return {
		checkpointId,
		createdAt,
		reason
	};
}
function resolveModelCostConfigCached(provider, model, cfg, rowContext) {
	if (!rowContext) return resolveModelCostConfig({
		provider,
		model,
		config: cfg
	});
	const key = createSessionRowModelCacheKey(provider, model);
	if (rowContext.modelCostConfigByModelRef.has(key)) return rowContext.modelCostConfigByModelRef.get(key);
	const value = resolveModelCostConfig({
		provider,
		model,
		config: cfg
	});
	rowContext.modelCostConfigByModelRef.set(key, value);
	return value;
}
function resolveEstimatedSessionCostUsd(params) {
	const explicitCostUsd = resolveNonNegativeNumber(params.explicitCostUsd ?? params.entry?.estimatedCostUsd);
	if (explicitCostUsd !== void 0) return explicitCostUsd;
	const input = resolvePositiveNumber(params.entry?.inputTokens);
	const output = resolvePositiveNumber(params.entry?.outputTokens);
	const cacheRead = resolvePositiveNumber(params.entry?.cacheRead);
	const cacheWrite = resolvePositiveNumber(params.entry?.cacheWrite);
	if (input === void 0 && output === void 0 && cacheRead === void 0 && cacheWrite === void 0) return;
	const cost = resolveModelCostConfigCached(params.provider, params.model, params.cfg, params.rowContext);
	if (!cost) return;
	return resolveNonNegativeNumber(estimateUsageCost({
		usage: {
			...input !== void 0 ? { input } : {},
			...output !== void 0 ? { output } : {},
			...cacheRead !== void 0 ? { cacheRead } : {},
			...cacheWrite !== void 0 ? { cacheWrite } : {}
		},
		cost
	}));
}
const STALE_STORE_ONLY_CHILD_LINK_MS = 3600 * 1e3;
const SINGLE_ROW_CONTEXT_CACHE_MAX_ENTRIES = 64;
function isFinitePositiveTimestamp(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function shouldKeepStoreOnlyChildLink(entry, now) {
	if (isTerminalSessionStatus(entry.status) || isFinitePositiveTimestamp(entry.endedAt)) {
		const endedAt = isFinitePositiveTimestamp(entry.endedAt) ? entry.endedAt : entry.updatedAt;
		return isFinitePositiveTimestamp(endedAt) && now - endedAt <= 18e5;
	}
	if (entry.status === "running" || isFinitePositiveTimestamp(entry.startedAt)) return true;
	return isFinitePositiveTimestamp(entry.updatedAt) && now - entry.updatedAt <= STALE_STORE_ONLY_CHILD_LINK_MS;
}
const singleRowChildSessionCandidateCache = /* @__PURE__ */ new Map();
function rememberSingleRowChildSessionCandidateCacheEntry(storePath, entry) {
	if (singleRowChildSessionCandidateCache.has(storePath)) singleRowChildSessionCandidateCache.delete(storePath);
	singleRowChildSessionCandidateCache.set(storePath, entry);
	pruneMapToMaxSize(singleRowChildSessionCandidateCache, SINGLE_ROW_CONTEXT_CACHE_MAX_ENTRIES);
}
function buildStoreChildSessionCandidateIndex(store) {
	const childSessionsByKey = /* @__PURE__ */ new Map();
	if (!store) return childSessionsByKey;
	for (const [key, entry] of Object.entries(store)) {
		if (!entry) continue;
		const parentKeys = [normalizeOptionalString(entry.spawnedBy), normalizeOptionalString(entry.parentSessionKey)].filter((value) => Boolean(value) && value !== key);
		for (const parentKey of parentKeys) addChildSessionKey(childSessionsByKey, parentKey, key);
	}
	return childSessionsByKey;
}
function singleRowChildSessionCacheMatches(cached, store) {
	const entries = Object.entries(store);
	return entries.length === cached.entriesByKey.size && entries.every(([key, entry]) => cached.entriesByKey.get(key) === entry);
}
function getSingleRowChildSessionCandidates(params) {
	if (!params.store) return /* @__PURE__ */ new Map();
	const cached = singleRowChildSessionCandidateCache.get(params.storePath);
	if (cached && singleRowChildSessionCacheMatches(cached, params.store)) return cached.childSessionCandidatesByParentKey;
	const childSessionCandidatesByParentKey = buildStoreChildSessionCandidateIndex(params.store);
	rememberSingleRowChildSessionCandidateCacheEntry(params.storePath, {
		entriesByKey: new Map(Object.entries(params.store)),
		childSessionCandidatesByParentKey
	});
	return childSessionCandidatesByParentKey;
}
function resolveRuntimeChildSessionKeys(controllerSessionKey, now = Date.now(), subagentRuns) {
	const childSessionKeys = /* @__PURE__ */ new Set();
	const controllerKey = controllerSessionKey.trim();
	const runs = subagentRuns ? subagentRuns.runsByControllerSessionKey.get(controllerKey) ?? [] : listSubagentRunsForController(controllerSessionKey);
	for (const entry of runs) {
		const childSessionKey = normalizeOptionalString(entry.childSessionKey);
		if (!childSessionKey) continue;
		const latest = subagentRuns ? subagentRuns.getDisplaySubagentRun(childSessionKey) : getSessionDisplaySubagentRunByChildSessionKey(childSessionKey);
		if (!latest) continue;
		if ((normalizeOptionalString(latest?.controllerSessionKey) || normalizeOptionalString(latest?.requesterSessionKey)) !== controllerSessionKey) continue;
		if (!shouldKeepSubagentRunChildLink(latest, {
			activeDescendants: subagentRuns ? subagentRuns.countActiveDescendantRuns(childSessionKey) : countActiveDescendantRuns(childSessionKey),
			now
		})) continue;
		childSessionKeys.add(childSessionKey);
	}
	const childSessions = Array.from(childSessionKeys);
	return childSessions.length > 0 ? childSessions : void 0;
}
function addChildSessionKey(childSessionsByKey, parentKey, childKey) {
	const current = childSessionsByKey.get(parentKey);
	if (current) {
		if (!current.includes(childKey)) current.push(childKey);
		return;
	}
	childSessionsByKey.set(parentKey, [childKey]);
}
function isCurrentSessionChildOwner(params) {
	return params.controllerSessionKey === params.ownerSessionKey || normalizeOptionalString(params.entry.parentSessionKey) === params.ownerSessionKey;
}
function buildStoreChildSessionIndex(store, now = Date.now(), subagentRuns) {
	const childSessionsByKey = /* @__PURE__ */ new Map();
	for (const [key, entry] of Object.entries(store)) {
		if (!entry) continue;
		const parentKeys = [normalizeOptionalString(entry.spawnedBy), normalizeOptionalString(entry.parentSessionKey)].filter((value) => Boolean(value) && value !== key);
		if (parentKeys.length === 0) continue;
		const latest = subagentRuns ? subagentRuns.getDisplaySubagentRun(key) : getSessionDisplaySubagentRunByChildSessionKey(key);
		let latestControllerSessionKey;
		if (latest) {
			latestControllerSessionKey = normalizeOptionalString(latest.controllerSessionKey) || normalizeOptionalString(latest.requesterSessionKey);
			if (!shouldKeepSubagentRunChildLink(latest, {
				activeDescendants: subagentRuns ? subagentRuns.countActiveDescendantRuns(key) : countActiveDescendantRuns(key),
				now
			})) continue;
		} else if (!shouldKeepStoreOnlyChildLink(entry, now)) continue;
		for (const parentKey of parentKeys) {
			if (latestControllerSessionKey && !isCurrentSessionChildOwner({
				entry,
				ownerSessionKey: parentKey,
				controllerSessionKey: latestControllerSessionKey
			})) continue;
			addChildSessionKey(childSessionsByKey, parentKey, key);
		}
	}
	return childSessionsByKey;
}
function resolveStoreChildSessionKeysFromCandidates(params) {
	const childSessionKeys = [];
	for (const childKey of params.candidates.get(params.key) ?? []) {
		const entry = params.store[childKey];
		if (!entry) continue;
		const latest = getSessionDisplaySubagentRunByChildSessionKey(childKey);
		if (latest) {
			const latestControllerSessionKey = normalizeOptionalString(latest.controllerSessionKey) || normalizeOptionalString(latest.requesterSessionKey);
			if (!isCurrentSessionChildOwner({
				entry,
				ownerSessionKey: params.key,
				controllerSessionKey: latestControllerSessionKey
			})) continue;
			if (!shouldKeepSubagentRunChildLink(latest, {
				activeDescendants: countActiveDescendantRuns(childKey),
				now: params.now
			})) continue;
			childSessionKeys.push(childKey);
			continue;
		}
		if (!shouldKeepStoreOnlyChildLink(entry, params.now)) continue;
		childSessionKeys.push(childKey);
	}
	return childSessionKeys.length > 0 ? childSessionKeys : void 0;
}
//#endregion
//#region src/gateway/session-utils-model.ts
function resolveGatewaySessionThinkingLevel(params) {
	if (!(params.modelCatalog ? findModelCatalogEntry(params.modelCatalog, {
		provider: params.provider,
		modelId: params.model
	}) : void 0)) return params.level;
	return resolveSupportedThinkingLevel({
		provider: params.provider,
		model: params.model,
		level: params.level,
		catalog: params.modelCatalog,
		agentRuntime: params.agentRuntime
	});
}
function resolveGatewaySessionThinkingDefault(params) {
	const defaultLevel = (params.agentId ? resolveAgentConfig(params.cfg, params.agentId)?.thinkingDefault : void 0) ?? resolveThinkingDefault({
		cfg: params.cfg,
		provider: params.provider,
		model: params.model,
		catalog: params.modelCatalog,
		agentRuntime: params.agentRuntime
	});
	return resolveGatewaySessionThinkingLevel({
		provider: params.provider,
		model: params.model,
		level: defaultLevel,
		modelCatalog: params.modelCatalog,
		agentRuntime: params.agentRuntime
	});
}
function resolveSessionRowThinkingMetadata(params) {
	if (!params.rowContext) return {
		levels: listThinkingLevelOptions(params.provider, params.model, params.modelCatalog, params.agentRuntime),
		defaultLevel: resolveGatewaySessionThinkingDefault({
			cfg: params.cfg,
			provider: params.provider,
			model: params.model,
			agentId: params.agentId,
			modelCatalog: params.modelCatalog,
			agentRuntime: params.agentRuntime
		})
	};
	const key = `${normalizeAgentId(params.agentId)}\0${params.agentRuntime}\0${createSessionRowModelCacheKey(params.provider, params.model)}`;
	const cached = params.rowContext.thinkingMetadataByModelRef.get(key);
	if (cached) return cached;
	const metadata = {
		levels: listThinkingLevelOptions(params.provider, params.model, params.modelCatalog, params.agentRuntime),
		defaultLevel: resolveGatewaySessionThinkingDefault({
			cfg: params.cfg,
			provider: params.provider,
			model: params.model,
			agentId: params.agentId,
			modelCatalog: params.modelCatalog,
			agentRuntime: params.agentRuntime
		})
	};
	params.rowContext.thinkingMetadataByModelRef.set(key, metadata);
	return metadata;
}
function resolveGatewaySessionThinkingProjectionInternal(params) {
	const cachedAcpMeta = params.rowContext?.acpSessionMetaByEntry;
	const acpMeta = params.entry?.acp ?? (params.entry && cachedAcpMeta?.has(params.entry) ? cachedAcpMeta.get(params.entry) : readAcpSessionMeta({ sessionKey: params.sessionKey }));
	const configuredAgentRuntime = resolveModelAgentRuntimeMetadata({
		cfg: params.cfg,
		agentId: params.agentId,
		provider: params.provider,
		model: params.model,
		sessionKey: params.sessionKey,
		acpRuntime: acpMeta != null,
		acpBackend: acpMeta?.backend
	});
	const persistedAgentRuntime = resolveSessionRuntimeOverrideForProvider({
		provider: params.provider,
		entry: params.entry,
		cfg: params.cfg
	});
	const persistedAgentRuntimeSource = params.entry?.modelSelectionLocked === true ? "session" : "session-key";
	const agentRuntime = acpMeta || !persistedAgentRuntime ? configuredAgentRuntime : {
		id: persistedAgentRuntime,
		source: persistedAgentRuntimeSource
	};
	const thinkingRuntime = acpMeta ? concretizeAgentRuntime(acpMeta.backend ?? agentRuntime.id) : resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: params.provider,
		modelId: params.model,
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		sessionEntry: params.entry
	});
	const metadata = resolveSessionRowThinkingMetadata({
		cfg: params.cfg,
		agentId: params.agentId,
		provider: params.provider,
		model: params.model,
		agentRuntime: thinkingRuntime,
		modelCatalog: params.modelCatalog,
		rowContext: params.rowContext
	});
	const storedThinkingLevel = normalizeThinkLevel(params.entry?.thinkingLevel);
	const thinkingLevel = storedThinkingLevel ? resolveGatewaySessionThinkingLevel({
		provider: params.provider,
		model: params.model,
		level: storedThinkingLevel,
		modelCatalog: params.modelCatalog,
		agentRuntime: thinkingRuntime
	}) : void 0;
	return {
		agentRuntime,
		thinkingLevel,
		effectiveThinkingLevel: thinkingLevel ?? metadata.defaultLevel,
		thinkingLevels: metadata.levels,
		thinkingOptions: metadata.levels.map((level) => level.label),
		thinkingDefault: metadata.defaultLevel
	};
}
/** Resolve the canonical runtime, selected level, and picker metadata for a session. */
function resolveGatewaySessionThinkingProjection(params) {
	return resolveGatewaySessionThinkingProjectionInternal(params);
}
function getSessionDefaults(cfg, modelCatalog, options) {
	const resolved = resolveConfiguredModelRef({
		cfg,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL,
		allowPluginNormalization: options?.allowPluginNormalization
	});
	const contextTokens = cfg.agents?.defaults?.contextTokens ?? lookupContextTokens(resolved.model, { allowAsyncLoad: false }) ?? 2e5;
	const agentId = normalizeAgentId(resolveDefaultAgentId(cfg));
	const sessionKey = resolveAgentMainSessionKey({
		cfg,
		agentId
	});
	const agentRuntime = resolveModelAgentRuntimeMetadata({
		cfg,
		agentId,
		provider: resolved.provider,
		model: resolved.model,
		sessionKey,
		acpRuntime: false
	});
	const thinkingRuntime = resolveEffectiveAgentRuntime({
		cfg,
		provider: resolved.provider,
		modelId: resolved.model,
		agentId,
		sessionKey
	});
	const thinkingLevels = listThinkingLevelOptions(resolved.provider, resolved.model, modelCatalog, thinkingRuntime);
	return {
		modelProvider: resolved.provider ?? null,
		model: resolved.model ?? null,
		contextTokens: contextTokens ?? null,
		agentRuntime,
		thinkingLevels,
		thinkingOptions: thinkingLevels.map((level) => level.label),
		thinkingDefault: resolveGatewaySessionThinkingDefault({
			cfg,
			provider: resolved.provider,
			model: resolved.model,
			modelCatalog,
			agentRuntime: thinkingRuntime
		})
	};
}
function normalizeGatewayModelCapabilityBaseUrl(value) {
	const baseUrl = normalizeOptionalString(value);
	if (!baseUrl) return;
	try {
		const parsed = new URL(baseUrl);
		parsed.pathname = parsed.pathname.replace(/\/+$/u, "") || "/";
		return parsed.toString();
	} catch {
		return baseUrl.replace(/\/+$/u, "");
	}
}
function resolveGatewayProviderStaticModel(params) {
	if (!params.agentId || !params.provider || !publishedModelCatalogOwnerMatchesAgent(params.snapshot, params.agentId)) return;
	const staticEntry = findModelCatalogEntry(params.snapshot.staticEntries ?? [], {
		provider: params.provider,
		modelId: params.model
	});
	if (!staticEntry) return;
	if (params.catalogEntry?.api && params.catalogEntry.api !== staticEntry.api) return;
	const catalogBaseUrl = normalizeGatewayModelCapabilityBaseUrl(params.catalogEntry?.baseUrl);
	const staticBaseUrl = normalizeGatewayModelCapabilityBaseUrl(staticEntry.baseUrl);
	if (catalogBaseUrl && catalogBaseUrl !== staticBaseUrl) return;
	const configuredProvider = findNormalizedProviderValue(params.snapshot.config.models?.providers, params.provider);
	const normalizedModelId = normalizeLowercaseStringOrEmpty(params.model);
	const configuredModel = configuredProvider?.models?.find((model) => normalizeLowercaseStringOrEmpty(model.id) === normalizedModelId);
	if (configuredModel?.input && !configuredModel.input.includes("image")) return;
	const configuredApi = configuredModel?.api ?? configuredProvider?.api;
	if (configuredApi && configuredApi !== staticEntry.api) return;
	const configuredBaseUrl = normalizeGatewayModelCapabilityBaseUrl(configuredModel?.baseUrl ?? configuredProvider?.baseUrl);
	if (configuredBaseUrl && configuredBaseUrl !== staticBaseUrl) return;
	return staticEntry;
}
async function resolveGatewayModelSupportsImages(params) {
	if (!params.model) return true;
	try {
		const loadParams = {
			...params.agentId ? { agentId: params.agentId } : {},
			readOnly: false
		};
		const snapshot = params.loadGatewayModelCatalogSnapshot ? await params.loadGatewayModelCatalogSnapshot(loadParams) : void 0;
		const catalogEntry = findModelCatalogEntry(snapshot ? snapshot.entries : await params.loadGatewayModelCatalog(loadParams), {
			provider: params.provider,
			modelId: params.model
		});
		const modelEntry = (snapshot && (!catalogEntry || !modelSupportsInput(catalogEntry, "image")) ? resolveGatewayProviderStaticModel({
			snapshot,
			agentId: params.agentId,
			provider: params.provider,
			model: params.model,
			catalogEntry
		}) : void 0) ?? catalogEntry;
		const normalizedProvider = normalizeOptionalLowercaseString(params.provider ?? modelEntry?.provider);
		const normalizedCandidates = [normalizeLowercaseStringOrEmpty(params.model), normalizeLowercaseStringOrEmpty(modelEntry?.name)].filter(Boolean);
		if (modelEntry) {
			if (modelSupportsInput(modelEntry, "image")) return true;
			if (normalizedProvider === "microsoft-foundry" && normalizedCandidates.some((candidate) => candidate.startsWith("gpt-") || candidate.startsWith("o1") || candidate.startsWith("o3") || candidate.startsWith("o4") || candidate === "computer-use-preview")) return true;
			if (normalizedProvider === "claude-cli" && normalizedCandidates.some((candidate) => candidate === "opus" || candidate === "sonnet" || candidate === "haiku" || candidate.startsWith("claude-"))) return true;
			return false;
		}
		if (normalizedProvider === "claude-cli" && normalizedCandidates.some((candidate) => candidate === "opus" || candidate === "sonnet" || candidate === "haiku" || candidate.startsWith("claude-"))) return true;
		return false;
	} catch {
		return false;
	}
}
function resolveSessionDisplayModelIdentityRefCached(params) {
	const ctx = params.rowContext;
	if (!ctx) return resolveSessionDisplayModelIdentityRef(params);
	const key = `${params.agentId}\u0000${createSessionRowModelCacheKey(params.provider, params.model)}`;
	const cached = ctx.displayModelIdentityByKey.get(key);
	if (cached) return cached;
	const value = resolveSessionDisplayModelIdentityRef(params);
	ctx.displayModelIdentityByKey.set(key, value);
	return value;
}
function resolveSessionDisplayModelIdentityRef(params) {
	const provider = normalizeOptionalString(params.provider);
	const model = normalizeOptionalString(params.model);
	if (!provider || !model || !isCliProvider(provider, params.cfg)) return {
		provider,
		model
	};
	const defaultRef = resolveDefaultModelForAgent({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (model.includes("/")) {
		const parsedModel = parseModelRef(model, defaultRef.provider);
		if (parsedModel && !isCliProvider(parsedModel.provider, params.cfg)) return parsedModel;
	}
	const inferredProvider = inferUniqueProviderFromConfiguredModels({
		cfg: params.cfg,
		model
	});
	if (inferredProvider && !isCliProvider(inferredProvider, params.cfg)) return {
		provider: inferredProvider,
		model
	};
	const parsedModel = parseModelRef(model, defaultRef.provider);
	if (parsedModel && !isCliProvider(parsedModel.provider, params.cfg)) return parsedModel;
	return {
		provider: defaultRef.provider || provider,
		model
	};
}
//#endregion
//#region src/gateway/session-utils-store-lookup.ts
function findCanonicalStoreMatch(store, candidates, onCanonicalError) {
	const matches = /* @__PURE__ */ new Map();
	for (const candidate of candidates) {
		const trimmed = normalizeOptionalString(candidate) ?? "";
		if (!trimmed) continue;
		const exact = store[trimmed];
		if (exact) matches.set(trimmed, {
			entry: exact,
			key: trimmed
		});
	}
	if (matches.size === 0) return;
	const canonicalKey = candidates[0] ?? "";
	const selected = matches.get(canonicalKey) ?? matches.values().next().value;
	if (matches.size > 1) {
		const error = canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey || selected?.key || ""}`);
		if (!onCanonicalError) throw error;
		onCanonicalError(error);
	}
	if (selected && selected.key !== canonicalKey) {
		const error = canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${canonicalKey || selected.key}`);
		if (!onCanonicalError) throw error;
		onCanonicalError(error);
	}
	return selected;
}
function buildGatewaySessionStoreScanTargets(params) {
	const targets = /* @__PURE__ */ new Set();
	if (params.canonicalKey) targets.add(params.canonicalKey);
	if (params.key && params.key !== params.canonicalKey) targets.add(params.key);
	if (params.canonicalKey === "global" || params.canonicalKey === "unknown") return [...targets];
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (params.canonicalKey === agentMainKey) targets.add(`agent:${params.agentId}:main`);
	return [...targets];
}
function resolveGatewaySessionStoreCandidates(cfg, agentId, cache) {
	const cached = cache?.get(agentId);
	if (cached) return cached;
	const storeConfig = cfg.session?.store;
	const fallback = {
		agentId,
		storePath: resolveStorePath(storeConfig, { agentId })
	};
	const discovery = {
		existing: resolveExistingAgentSessionStoreTargetsSync(cfg, agentId),
		fallback
	};
	cache?.set(agentId, discovery);
	return discovery;
}
function loadGatewaySessionLookupStore(storePath, clone, agentId, options = {}) {
	const cache = options.cache;
	const cacheKey = cache ? `${storePath}\u0000${agentId ?? ""}\u0000${clone === false ? "0" : "1"}\u0000${options.readOnly ? "1" : "0"}\u0000${options.projection ?? "full"}\u0000${options.exactKeys?.join("") ?? ""}` : "";
	if (cache) {
		const cached = cache.get(cacheKey);
		if (cached) return cached;
	}
	const loaded = loadGatewaySessionLookupStoreUncached(storePath, clone, agentId, options);
	cache?.set(cacheKey, loaded);
	return loaded;
}
function loadGatewaySessionLookupStoreUncached(storePath, clone, agentId, options = {}) {
	try {
		if (options.exactKeys) {
			const store = {};
			for (const sessionKey of options.exactKeys) {
				const match = loadExactSqliteSessionEntryReadOnly({
					...agentId ? { agentId } : {},
					clone: false,
					sessionKey,
					storePath
				});
				if (match) store[match.sessionKey] = match.entry;
			}
			return store;
		}
		const listEntries = options.readOnly ? listSqliteSessionEntriesReadOnly : listSessionEntries;
		return Object.fromEntries(listEntries({
			...agentId ? { agentId } : {},
			...clone === false ? { clone: false } : {},
			...options.projection ? { projection: options.projection } : {},
			storePath
		}).map(({ sessionKey, entry }) => [sessionKey, entry]));
	} catch {
		return {};
	}
}
function resolveGatewaySessionStoreLookup(params) {
	const scanTargets = buildGatewaySessionStoreScanTargets(params);
	const { existing, fallback } = resolveGatewaySessionStoreCandidates(params.cfg, params.agentId, params.targetDiscoveryCache);
	const configured = isConfiguredSessionStoreAgentId(params.cfg, params.agentId);
	const candidates = configured ? [fallback, ...existing.filter((target) => target.storePath !== fallback.storePath)] : existing;
	if (candidates.length === 0) return {
		storePath: fallback.storePath,
		store: {},
		match: void 0
	};
	const loadStore = (target) => loadGatewaySessionLookupStore(target.storePath, params.clone, target.agentId, {
		readOnly: params.readOnly || !configured,
		...params.exactRead ? { exactKeys: scanTargets } : {},
		...params.projection ? { projection: params.projection } : {},
		...params.storeCache ? { cache: params.storeCache } : {}
	});
	const firstCandidate = candidates[0] ?? fallback;
	let selectedStorePath = firstCandidate.storePath;
	let selectedStore = params.initialStore && firstCandidate.storePath === fallback.storePath ? params.initialStore : loadStore(firstCandidate);
	let canonicalValidationError;
	const recordCanonicalError = params.deferCanonicalValidation ? (error) => {
		canonicalValidationError ??= error;
	} : void 0;
	let selectedMatch = findCanonicalStoreMatch(selectedStore, scanTargets, recordCanonicalError);
	for (let index = 1; index < candidates.length; index += 1) {
		const candidate = candidates[index];
		if (!candidate) continue;
		const store = loadStore(candidate);
		const match = findCanonicalStoreMatch(store, scanTargets, recordCanonicalError);
		if (!match) continue;
		if (selectedMatch) {
			const error = canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${params.canonicalKey}`);
			if (!recordCanonicalError) throw error;
			recordCanonicalError(error);
			if (match.key !== params.canonicalKey || selectedMatch.key === params.canonicalKey) continue;
		}
		selectedStorePath = candidate.storePath;
		selectedStore = store;
		selectedMatch = match;
	}
	return {
		storePath: selectedStorePath,
		store: selectedStore,
		match: selectedMatch,
		...canonicalValidationError ? { canonicalValidationError } : {}
	};
}
function isAgentScopedSentinelSessionKey(canonicalKey) {
	return canonicalKey === "global" || canonicalKey === "unknown";
}
function resolveExplicitDeletedLegacyMainStoreTarget(params) {
	const parsed = parseAgentSessionKey(params.key);
	const legacyAgentId = normalizeAgentId(parsed?.agentId);
	if (!parsed || legacyAgentId !== "main" || listAgentIds(params.cfg).includes(legacyAgentId)) return null;
	const canonicalKey = resolveStoredSessionKeyForAgentStore({
		cfg: params.cfg,
		agentId: legacyAgentId,
		sessionKey: params.key
	});
	const agentMainKey = resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: legacyAgentId
	});
	const legacyAgentMainKey = `agent:${legacyAgentId}:main`;
	const lookupSeeds = Array.from(/* @__PURE__ */ new Set([
		params.key,
		canonicalKey,
		agentMainKey,
		legacyAgentMainKey
	]));
	let best;
	const { existing } = resolveGatewaySessionStoreCandidates(params.cfg, legacyAgentId, params.targetDiscoveryCache);
	let canonicalValidationError;
	const recordCanonicalError = params.deferCanonicalValidation ? (error) => {
		canonicalValidationError ??= error;
	} : void 0;
	for (const target of existing) {
		if (target.agentId !== legacyAgentId) continue;
		const store = loadGatewaySessionLookupStore(target.storePath, params.clone, target.agentId, {
			readOnly: true,
			...params.exactRead ? { exactKeys: lookupSeeds } : {},
			...params.projection ? { projection: params.projection } : {},
			...params.storeCache ? { cache: params.storeCache } : {}
		});
		const match = findCanonicalStoreMatch(store, lookupSeeds, recordCanonicalError);
		if (!match) continue;
		if (best) {
			const error = canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
			if (!recordCanonicalError) throw error;
			recordCanonicalError(error);
		}
		if (!best || (match.entry.updatedAt ?? 0) >= (best.match.entry.updatedAt ?? 0)) best = {
			storePath: target.storePath,
			store,
			match
		};
	}
	if (!best) return null;
	const storeKeys = /* @__PURE__ */ new Set([canonicalKey]);
	if (params.key !== canonicalKey) storeKeys.add(params.key);
	storeKeys.add(best.match.key);
	for (const seed of lookupSeeds) storeKeys.add(seed);
	return {
		agentId: legacyAgentId,
		storePath: best.storePath,
		canonicalKey,
		storeKeys: Array.from(storeKeys),
		store: best.store,
		...canonicalValidationError ? { canonicalValidationError } : {}
	};
}
function resolveGatewaySessionStoreTargetWithStore(params) {
	const key = normalizeOptionalString(params.key) ?? "";
	const explicitDeletedMainTarget = resolveExplicitDeletedLegacyMainStoreTarget({
		cfg: params.cfg,
		key,
		clone: params.clone,
		...params.deferCanonicalValidation ? { deferCanonicalValidation: true } : {},
		readOnly: params.readOnly,
		exactRead: params.exactRead,
		...params.projection ? { projection: params.projection } : {},
		...params.storeCache ? { storeCache: params.storeCache } : {},
		...params.targetDiscoveryCache ? { targetDiscoveryCache: params.targetDiscoveryCache } : {}
	});
	if (explicitDeletedMainTarget) return includeDirectChildEntries(explicitDeletedMainTarget, params.includeStoreChildEntries);
	const requestedAgentId = normalizeOptionalString(params.agentId);
	const canonicalKey = resolveSessionStoreKey({
		cfg: params.cfg,
		sessionKey: key,
		...requestedAgentId ? { storeAgentId: requestedAgentId } : {}
	});
	const agentId = requestedAgentId && (isAgentScopedSentinelSessionKey(canonicalKey) || !parseAgentSessionKey(key)) ? normalizeAgentId(requestedAgentId) : resolveSessionStoreAgentId(params.cfg, canonicalKey);
	if (isIncognitoSessionKey(canonicalKey)) {
		const storePath = resolveIncognitoOpenClawAgentSqlitePath({ agentId });
		const store = loadGatewaySessionLookupStore(storePath, params.clone, agentId, {
			readOnly: true,
			...params.exactRead ? { exactKeys: [canonicalKey] } : {},
			...params.projection ? { projection: params.projection } : {},
			...params.storeCache ? { cache: params.storeCache } : {}
		});
		return includeDirectChildEntries({
			agentId,
			storePath,
			canonicalKey,
			storeKeys: [canonicalKey],
			store
		}, params.includeStoreChildEntries);
	}
	const { canonicalValidationError, storePath, store } = resolveGatewaySessionStoreLookup({
		cfg: params.cfg,
		key,
		canonicalKey,
		agentId,
		clone: params.clone,
		readOnly: params.readOnly,
		exactRead: params.exactRead,
		deferCanonicalValidation: params.deferCanonicalValidation,
		initialStore: params.store,
		...params.projection ? { projection: params.projection } : {},
		...params.storeCache ? { storeCache: params.storeCache } : {},
		...params.targetDiscoveryCache ? { targetDiscoveryCache: params.targetDiscoveryCache } : {}
	});
	if (canonicalKey === "global" || canonicalKey === "unknown") return includeDirectChildEntries({
		agentId,
		storePath,
		canonicalKey,
		storeKeys: key && key !== canonicalKey ? [canonicalKey, key] : [key],
		store,
		...canonicalValidationError ? { canonicalValidationError } : {}
	}, params.includeStoreChildEntries);
	const storeKeys = new Set(buildGatewaySessionStoreScanTargets({
		cfg: params.cfg,
		key,
		canonicalKey,
		agentId
	}));
	return includeDirectChildEntries({
		agentId,
		storePath,
		canonicalKey,
		storeKeys: Array.from(storeKeys),
		store,
		...canonicalValidationError ? { canonicalValidationError } : {}
	}, params.includeStoreChildEntries);
}
function includeDirectChildEntries(target, include) {
	if (!include) return target;
	try {
		const parentKeys = /* @__PURE__ */ new Set([target.canonicalKey, ...target.storeKeys]);
		for (const parentKey of parentKeys) for (const { sessionKey, entry } of listSqliteSessionChildEntriesReadOnly({
			agentId: target.agentId,
			clone: false,
			sessionKey: parentKey,
			storePath: target.storePath
		})) target.store[sessionKey] = entry;
	} catch {}
	return target;
}
function resolveGatewaySessionStoreTarget(params) {
	const { store: _store, ...target } = resolveGatewaySessionStoreTargetWithStore(params);
	return target;
}
//#endregion
//#region src/gateway/session-utils-store.ts
/**
* Returns the owning agent id if the session key belongs to an agent that is no
* longer present in config (deleted). Returns null for non-agent legacy/global
* keys, confirmed ACP runtime session keys, or when the owning agent still
* exists (#65524).
*/
function resolveDeletedAgentIdFromSessionKey(cfg, sessionKey, entry, options) {
	const parsed = parseAgentSessionKey(sessionKey);
	if (!parsed) return null;
	const agentId = normalizeAgentId(parsed.agentId);
	if (listAgentIds(cfg).includes(agentId)) return null;
	if (isAcpSessionKey(sessionKey) && !parsed.rest.startsWith("acp:binding:")) {
		if (readAcpMetaForDeletedAgentCheck({
			cfg,
			sessionKey,
			entry,
			acpMetadataSessionKey: options?.acpMetadataSessionKey
		})) return null;
	}
	return agentId;
}
function readAcpMetaForDeletedAgentCheck(params) {
	if (params.entry?.acp) return params.entry.acp;
	const acpMetadataSessionKey = normalizeOptionalString(params.acpMetadataSessionKey);
	const directKeys = /* @__PURE__ */ new Set();
	if (acpMetadataSessionKey) directKeys.add(acpMetadataSessionKey);
	else {
		const acpMeta = readAcpSessionMeta({
			sessionKey: params.sessionKey,
			cfg: params.cfg
		});
		if (acpMeta) return acpMeta;
	}
	directKeys.add(params.sessionKey);
	for (const directKey of directKeys) {
		const acpMeta = readAcpSessionMetaForEntry({
			sessionKey: directKey,
			entry: params.entry ?? void 0
		});
		if (acpMeta) return acpMeta;
	}
	repairAcpSessionMetaKeyForMigration({
		sessionKey: params.sessionKey,
		candidateSessionKeys: directKeys,
		entry: params.entry ?? void 0
	});
	return readAcpSessionMetaForEntry({
		sessionKey: params.sessionKey,
		entry: params.entry ?? void 0
	});
}
function loadSessionEntryWithMode(sessionKey, opts, readOnly) {
	const cfg = getRuntimeConfig();
	const target = resolveGatewaySessionStoreTargetWithStore({
		cfg,
		key: normalizeOptionalString(sessionKey) ?? "",
		...opts?.clone === false ? { clone: false } : {},
		...opts?.agentId ? { agentId: opts.agentId } : {},
		...readOnly ? {
			exactRead: true,
			readOnly: true,
			...opts?.includeStoreChildEntries ? { includeStoreChildEntries: true } : {}
		} : {}
	});
	const storePath = target.storePath;
	const store = target.store;
	const canonicalMatch = resolveCanonicalSessionStoreMatchFromStoreKeys(store, target.storeKeys);
	const legacyKey = canonicalMatch?.key !== target.canonicalKey ? canonicalMatch?.key : void 0;
	return {
		cfg,
		storePath,
		store,
		entry: readOnly && opts?.clone !== false && canonicalMatch?.entry ? structuredClone(canonicalMatch.entry) : canonicalMatch?.entry,
		canonicalKey: target.canonicalKey,
		storeKeys: target.storeKeys,
		legacyKey
	};
}
function loadSessionEntry(sessionKey, opts) {
	return loadSessionEntryWithMode(sessionKey, opts, false);
}
function loadSessionEntryReadOnly(sessionKey, opts) {
	return loadSessionEntryWithMode(sessionKey, opts, true);
}
/** Returns the one canonical entry and the exact persisted key that owns it. */
function resolveCanonicalSessionStoreMatchFromStoreKeys(store, storeKeys) {
	let selected;
	for (const key of storeKeys) {
		const entry = store[key];
		if (!entry) continue;
		const match = {
			key,
			entry
		};
		if (selected) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${storeKeys[0] ?? key}`);
		selected = match;
	}
	if (selected && selected.key !== storeKeys[0]) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${storeKeys[0] ?? selected.key}`);
	return selected;
}
function resolveCanonicalSessionEntryFromStoreKeys(store, storeKeys) {
	return resolveCanonicalSessionStoreMatchFromStoreKeys(store, storeKeys)?.entry;
}
function resolveCanonicalGatewaySessionStoreKey(params) {
	const target = resolveGatewaySessionStoreTarget({
		cfg: params.cfg,
		key: params.key,
		store: params.store,
		...params.agentId ? { agentId: params.agentId } : {}
	});
	const primaryKey = target.canonicalKey;
	resolveCanonicalSessionStoreMatchFromStoreKeys(params.store, target.storeKeys);
	return {
		target,
		primaryKey,
		entry: params.store[primaryKey]
	};
}
function parseGroupKey(key) {
	const parts = (parseAgentSessionKey(key)?.rest ?? key).split(":").filter(Boolean);
	if (parts.length >= 3) {
		const [channel, kind, ...rest] = parts;
		if (kind === "group" || kind === "channel") return {
			channel,
			kind,
			id: rest.join(":")
		};
	}
	return null;
}
function isGroupOrChannelDisplaySession(entry, parsed) {
	return entry?.chatType === "group" || entry?.chatType === "channel" || parsed?.kind === "group" || parsed?.kind === "channel";
}
function isStorePathTemplate(store) {
	return typeof store === "string" && store.includes("{agentId}");
}
function resolveConcreteSessionStorePath(storePath) {
	const trimmed = storePath?.trim();
	if (!trimmed || trimmed === "(multiple)" || isStorePathTemplate(trimmed)) return;
	return trimmed;
}
function normalizeFallbackList(values) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const value of values) {
		const trimmed = value.trim();
		if (!trimmed) continue;
		const key = normalizeLowercaseStringOrEmpty(trimmed);
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(trimmed);
	}
	return out;
}
function resolveGatewayAgentModel(cfg, agentId) {
	const primary = splitTrailingAuthProfile(resolveAgentEffectiveModelPrimary(cfg, agentId) ?? "").model;
	const fallbackOverride = resolveAgentModelFallbacksOverride(cfg, agentId);
	const defaultFallbacks = resolveAgentModelFallbackValues(cfg.agents?.defaults?.model);
	const fallbacks = normalizeFallbackList((fallbackOverride ?? defaultFallbacks).map((value) => splitTrailingAuthProfile(value).model));
	if (!primary && fallbacks.length === 0) return;
	return {
		...primary ? { primary } : {},
		...fallbacks.length > 0 ? { fallbacks } : {}
	};
}
function listAgentsForGateway(cfg, modelCatalog, options) {
	const basic = listGatewayAgentsBasic(cfg);
	const configuredById = /* @__PURE__ */ new Map();
	for (const entry of listAgentEntries(cfg)) {
		if (!entry?.id) continue;
		const agentId = normalizeAgentId(entry.id);
		const avatar = normalizeOptionalString(entry.identity?.avatar);
		const avatarUrl = resolveAgentAvatarUrlFromSource(cfg, agentId, avatar);
		const identity = entry.identity ? {
			name: normalizeOptionalString(entry.identity.name),
			theme: normalizeOptionalString(entry.identity.theme),
			emoji: normalizeOptionalString(entry.identity.emoji),
			avatar,
			avatarUrl
		} : void 0;
		configuredById.set(agentId, { identity });
	}
	const agents = (options?.includeSystem ? basic.agents : basic.agents.filter((entry) => entry.kind !== "system")).map((entry) => {
		const { id } = entry;
		const meta = configuredById.get(id);
		const model = resolveGatewayAgentModel(cfg, id);
		const resolvedModel = resolveDefaultModelForAgent({
			cfg,
			agentId: id
		});
		const sessionKey = resolveAgentMainSessionKey({
			cfg,
			agentId: id
		});
		const agentRuntime = resolveModelAgentRuntimeMetadata({
			cfg,
			agentId: id,
			provider: resolvedModel.provider,
			model: resolvedModel.model,
			sessionKey,
			acpRuntime: false
		});
		const thinkingRuntime = resolveEffectiveAgentRuntime({
			cfg,
			provider: resolvedModel.provider,
			modelId: resolvedModel.model,
			agentId: id,
			sessionKey
		});
		const agentModelCatalog = options?.modelCatalogByAgentId?.get(id) ?? modelCatalog;
		const thinkingLevels = listThinkingLevelOptions(resolvedModel.provider, resolvedModel.model, agentModelCatalog, thinkingRuntime);
		const workspace = resolveAgentWorkspaceDir(cfg, id);
		const workspaceGit = insideGitCheckout(workspace);
		return Object.assign({
			id,
			...options?.includeSystem ? { kind: entry.kind } : {},
			name: entry.name,
			identity: meta?.identity,
			workspace,
			workspaceGit,
			agentRuntime,
			thinkingLevels,
			thinkingOptions: thinkingLevels.map((level) => level.label),
			thinkingDefault: resolveGatewaySessionThinkingDefault({
				cfg,
				provider: resolvedModel.provider,
				model: resolvedModel.model,
				agentId: id,
				modelCatalog: agentModelCatalog,
				agentRuntime: thinkingRuntime
			})
		}, model ? { model } : {});
	});
	return {
		defaultId: basic.defaultId,
		mainKey: basic.mainKey,
		scope: basic.scope,
		agents
	};
}
//#endregion
//#region src/sessions/session-agent-status.ts
const SESSION_AGENT_STATUS_NOTE_MAX_CHARS = 120;
const SESSION_AGENT_STATUS_DEFAULT_TTL_MINUTES = 30;
const ATTENTION_ICON_IDS = new Set(SESSION_AGENT_ATTENTION_ICON_IDS);
function isSessionAgentAttentionIconId(value) {
	return typeof value === "string" && ATTENTION_ICON_IDS.has(value);
}
function sanitizeSessionAgentStatusNote(value) {
	return truncateUtf16Safe(sanitizeUserFacingText(value, { errorContext: true }).replace(/\s+/g, " ").trim(), SESSION_AGENT_STATUS_NOTE_MAX_CHARS).trimEnd();
}
function resolveActiveSessionAgentStatus(status, now) {
	if (!status || !status.note.trim() || !Number.isFinite(status.expiresAt) || status.expiresAt <= now) return;
	if (status.attention !== void 0 && !isSessionAgentAttentionIconId(status.attention)) return;
	return status;
}
function sessionAgentStatusExpiresAt(now, ttlMinutes) {
	return now + (ttlMinutes ?? SESSION_AGENT_STATUS_DEFAULT_TTL_MINUTES) * 6e4;
}
//#endregion
//#region src/cron/job-session-bindings.ts
/**
* Resolves every canonical session key a job is bound to: the session the run
* joins (main/isolated/session:<key>) plus the explicit wake/delivery lane in
* job.sessionKey. Keys use the same canonicalization as cron run/session
* creation, so they compare equal to gateway session-store row keys.
*/
function resolveCronJobBoundSessionKeys(job, opts) {
	const agentId = normalizeAgentId(job.agentId ?? opts.defaultAgentId);
	const keys = /* @__PURE__ */ new Set();
	const add = (sessionKey) => {
		const trimmed = sessionKey?.trim();
		if (!trimmed) return;
		keys.add(resolveCronAgentSessionKey({
			sessionKey: trimmed,
			agentId,
			mainKey: opts.cfg.session?.mainKey,
			cfg: opts.cfg
		}));
	};
	try {
		if (job.sessionTarget === "main") add("main");
		else if (job.sessionTarget === "isolated" || job.sessionTarget === "current") add(`cron:${job.id}`);
		else add(resolveCronSessionTargetSessionKey(job.sessionTarget));
		add(job.sessionKey);
	} catch {
		keys.clear();
	}
	return keys;
}
/** Signals a locked re-check found the job no longer bound; a per-job no-op. */
var CronJobBindingStaleError = class extends Error {
	constructor() {
		super("cron job binding changed concurrently");
	}
};
/**
* Disables every enabled cron job bound to a session, used when the session is
* archived so schedules stop targeting a lane that rejects new work.
* Returns the disabled job ids.
*/
async function disableCronJobsBoundToSession(params) {
	const jobs = await params.cron.list();
	const defaultAgentId = params.cron.getDefaultAgentId();
	const boundToSession = (job) => job.enabled && resolveCronJobBoundSessionKeys(job, {
		cfg: params.cfg,
		defaultAgentId
	}).has(params.sessionKey);
	const disabled = [];
	const failures = [];
	for (const job of jobs) {
		if (!boundToSession(job)) continue;
		try {
			await params.cron.updateWithPrecondition(job.id, { enabled: false }, (currentJob) => {
				if (!boundToSession(currentJob)) throw new CronJobBindingStaleError();
			});
			disabled.push(job.id);
		} catch (error) {
			if (error instanceof CronJobBindingStaleError) continue;
			failures.push(error);
		}
	}
	if (failures.length > 0) throw new AggregateError(failures, `failed to disable ${failures.length} cron job(s) bound to ${params.sessionKey}`);
	return disabled;
}
//#endregion
//#region src/gateway/session-automation-index.ts
let source = null;
let sourceVersion = 0;
let epochCounter = 0;
let registeredEpoch = 0;
let memo = null;
/**
* Claimed at cron service build time so registration authority follows build
* order: a stale service whose start resolves after a config reload cannot
* clobber the replacement's registration.
*/
function claimSessionAutomationEpoch() {
	return ++epochCounter;
}
/** Registered by the gateway cron owner; newer epochs win over stale services. */
function registerSessionAutomationSource(next, epoch) {
	const effectiveEpoch = epoch ?? claimSessionAutomationEpoch();
	if (effectiveEpoch < registeredEpoch) return;
	registeredEpoch = effectiveEpoch;
	source = next;
	memo = null;
	sourceVersion += 1;
}
/**
* Owner-compare unregistration: a stopped cron service must not clear a
* replacement's registration when config reloads race the lazy service build.
*/
function unregisterSessionAutomationSource(owner) {
	if (source !== owner) return;
	source = null;
	memo = null;
	sourceVersion += 1;
}
/** Called from the cron onEvent hook after any job/store change. */
function bumpSessionAutomationVersion() {
	sourceVersion += 1;
}
function buildAutomationKeys(jobs, cfg, defaultAgentId) {
	const keys = /* @__PURE__ */ new Set();
	for (const job of jobs) {
		if (!job.enabled) continue;
		for (const key of resolveCronJobBoundSessionKeys(job, {
			cfg,
			defaultAgentId
		})) keys.add(key);
	}
	return keys;
}
/** True when an enabled cron job is bound to the canonical session key. */
function sessionHasAutomation(sessionKey, cfg) {
	const jobs = source?.getJobs();
	if (!source || !jobs || jobs.length === 0) return false;
	if (!memo || memo.jobs !== jobs || memo.version !== sourceVersion || memo.cfg !== cfg) memo = {
		jobs,
		version: sourceVersion,
		cfg,
		keys: buildAutomationKeys(jobs, cfg, source.getDefaultAgentId())
	};
	return memo.keys.has(sessionKey);
}
//#endregion
//#region src/gateway/session-transcript-title-reader.ts
const SQLITE_TITLE_PROBE_INITIAL_MESSAGES = 20;
const SQLITE_TITLE_PROBE_MAX_MESSAGES = 100;
const SQLITE_TITLE_FIELD_CACHE_MAX_ENTRIES = 256;
const sqliteTitleFieldCache = /* @__PURE__ */ new Map();
function sqliteTitleFieldCacheKey(target) {
	return `${target.agentId ?? ""}\0${target.sessionId}\0${target.storePath ?? ""}`;
}
function setSqliteTitleFieldCache(key, entry) {
	sqliteTitleFieldCache.delete(key);
	sqliteTitleFieldCache.set(key, entry);
	pruneMapToMaxSize(sqliteTitleFieldCache, SQLITE_TITLE_FIELD_CACHE_MAX_ENTRIES);
}
function readSqliteTitleProbeRange(scope, totalMessages, start, endExclusive) {
	const end = Math.min(totalMessages, endExclusive);
	const boundedStart = Math.min(Math.max(0, start), end);
	if (boundedStart === end) return [];
	return readSessionTranscriptMessageEventPage(scope, {
		maxMessages: end - boundedStart,
		offset: totalMessages - end
	}).events;
}
function findFirstTitleUserMessage(entries, includeInterSession) {
	return entries.map(sqliteMessageEventWithSeq).find((message) => {
		if (extractMessageRole(message) !== "user") return false;
		return includeInterSession || !hasInterSessionUserProvenance(message);
	});
}
function findLastMessageText(entries) {
	return entries.toReversed().map(sqliteMessageEventWithSeq).map(extractMessageText).find(Boolean) ?? null;
}
function readSqliteTitleFields(target, opts) {
	const scope = toTranscriptReadScope(target);
	const cacheKey = sqliteTitleFieldCacheKey(target);
	const watermark = readSessionTranscriptWatermark(scope);
	const variant = opts?.includeInterSession === true ? "includeInterSession" : "default";
	const cached = sqliteTitleFieldCache.get(cacheKey);
	const cachedFields = cached?.generation === watermark.generation && cached.maxSeq === watermark.maxSeq ? cached.fields[variant] : void 0;
	if (cached && cachedFields) {
		setSqliteTitleFieldCache(cacheKey, cached);
		return { ...cachedFields };
	}
	const tail = readSessionTranscriptMessageEventPage(scope, {
		maxMessages: SQLITE_TITLE_PROBE_INITIAL_MESSAGES,
		offset: 0
	});
	let lastText = findLastMessageText(tail.events);
	if (!lastText && tail.totalMessages > SQLITE_TITLE_PROBE_INITIAL_MESSAGES) lastText = findLastMessageText(readSqliteTitleProbeRange(scope, tail.totalMessages, tail.totalMessages - SQLITE_TITLE_PROBE_MAX_MESSAGES, tail.totalMessages - SQLITE_TITLE_PROBE_INITIAL_MESSAGES));
	let firstUser = findFirstTitleUserMessage(tail.totalMessages <= SQLITE_TITLE_PROBE_INITIAL_MESSAGES ? tail.events : readSqliteTitleProbeRange(scope, tail.totalMessages, 0, SQLITE_TITLE_PROBE_INITIAL_MESSAGES), opts?.includeInterSession === true);
	if (!firstUser && tail.totalMessages > SQLITE_TITLE_PROBE_INITIAL_MESSAGES) firstUser = findFirstTitleUserMessage(readSqliteTitleProbeRange(scope, tail.totalMessages, SQLITE_TITLE_PROBE_INITIAL_MESSAGES, SQLITE_TITLE_PROBE_MAX_MESSAGES), opts?.includeInterSession === true);
	const fields = {
		firstUserMessage: firstUser ? extractMessageText(firstUser) : null,
		lastMessagePreview: lastText
	};
	const fieldsByVariant = cached?.generation === watermark.generation && cached.maxSeq === watermark.maxSeq ? cached.fields : {};
	fieldsByVariant[variant] = fields;
	setSqliteTitleFieldCache(cacheKey, {
		...watermark,
		fields: fieldsByVariant
	});
	return { ...fields };
}
/** Batch-hydrates list title fields once per store, with canonical widening only for misses. */
function readSessionTitleFieldsFromTranscriptBatch(scopes, opts) {
	const targets = [];
	const variant = opts?.includeInterSession === true ? "includeInterSession" : "default";
	const results = /* @__PURE__ */ new Map();
	const misses = [];
	const cachedCandidates = [];
	for (const [index, scope] of scopes.entries()) {
		const target = resolveTranscriptReadTarget(scope);
		targets.push(target);
		const cacheKey = sqliteTitleFieldCacheKey(target);
		const cached = sqliteTitleFieldCache.get(cacheKey);
		const cachedFields = cached?.fields[variant];
		if (cached && cachedFields) {
			cachedCandidates.push({
				cacheKey,
				cached,
				cachedFields,
				index,
				scope,
				target
			});
			continue;
		}
		misses.push({
			cacheKey,
			index,
			scope,
			target
		});
	}
	const watermarks = readSessionTranscriptWatermarkBatch(cachedCandidates.map((candidate) => candidate.scope));
	for (const [candidateIndex, candidate] of cachedCandidates.entries()) {
		const watermark = watermarks[candidateIndex];
		if (watermark && candidate.cached.generation === watermark.generation && candidate.cached.maxSeq === watermark.maxSeq) {
			setSqliteTitleFieldCache(candidate.cacheKey, candidate.cached);
			results.set(candidate.index, { ...candidate.cachedFields });
			continue;
		}
		misses.push({
			cacheKey: candidate.cacheKey,
			index: candidate.index,
			scope: candidate.scope,
			target: candidate.target
		});
	}
	const probes = misses.length > 0 ? readSessionTranscriptTitleProbeBatch(misses.map((miss) => miss.scope)) : [];
	for (const [probeIndex, miss] of misses.entries()) {
		const probe = probes[probeIndex];
		if (!probe) {
			results.set(miss.index, readSqliteTitleFields(miss.target, opts));
			continue;
		}
		const cached = sqliteTitleFieldCache.get(miss.cacheKey);
		const cachedFields = cached?.generation === probe.generation && cached.maxSeq === probe.maxSeq ? cached.fields[variant] : void 0;
		if (cached && cachedFields) {
			setSqliteTitleFieldCache(miss.cacheKey, cached);
			results.set(miss.index, { ...cachedFields });
			continue;
		}
		const firstUser = findFirstTitleUserMessage(probe.head, opts?.includeInterSession === true);
		const lastText = findLastMessageText(probe.tail);
		if (probe.totalMessages > SQLITE_TITLE_PROBE_INITIAL_MESSAGES && (!firstUser || !lastText)) {
			results.set(miss.index, readSqliteTitleFields(miss.target, opts));
			continue;
		}
		const fields = {
			firstUserMessage: firstUser ? extractMessageText(firstUser) : null,
			lastMessagePreview: lastText
		};
		const fieldsByVariant = cached?.generation === probe.generation && cached.maxSeq === probe.maxSeq ? cached.fields : {};
		fieldsByVariant[variant] = fields;
		setSqliteTitleFieldCache(miss.cacheKey, {
			generation: probe.generation,
			maxSeq: probe.maxSeq,
			fields: fieldsByVariant
		});
		results.set(miss.index, { ...fields });
	}
	return targets.map((target, index) => {
		const fields = results.get(index);
		if (!fields) throw new Error(`Missing batched title fields for session ${target.sessionId}`);
		return fields;
	});
}
/** Reads title and preview text from a transcript through the reader seam. */
function readSessionTitleFieldsFromTranscript(scope, opts) {
	return readSqliteTitleFields(resolveTranscriptReadTarget(scope), opts);
}
/** Reads title and preview text asynchronously through the reader seam. */
async function readSessionTitleFieldsFromTranscriptAsync(scope, opts) {
	return readSqliteTitleFields(resolveTranscriptReadTarget(scope), opts);
}
//#endregion
//#region src/gateway/session-utils-projection.ts
function buildSessionListRowContext(params) {
	const subagentRuns = buildSubagentSessionListReadIndex(params.now);
	return buildSessionListRowContextFromParts({
		subagentRuns,
		storeChildSessionsByKey: buildStoreChildSessionIndex(params.store, params.now, subagentRuns),
		userProfileIdentityById: params.userProfileIdentityById
	});
}
function buildSessionListRowContextFromParts(params) {
	return {
		subagentRuns: params.subagentRuns,
		storeChildSessionsByKey: params.storeChildSessionsByKey,
		selectedModelByOverrideRef: /* @__PURE__ */ new Map(),
		thinkingMetadataByModelRef: /* @__PURE__ */ new Map(),
		displayModelIdentityByKey: /* @__PURE__ */ new Map(),
		modelCostConfigByModelRef: /* @__PURE__ */ new Map(),
		userProfileIdentityById: params.userProfileIdentityById ?? /* @__PURE__ */ new Map(),
		acpSessionMetaByEntry: /* @__PURE__ */ new Map()
	};
}
function buildSessionListRowMetadataContext(params) {
	return buildSessionListRowContextFromParts({
		subagentRuns: buildSubagentSessionListReadIndex(params.now),
		storeChildSessionsByKey: /* @__PURE__ */ new Map(),
		userProfileIdentityById: params.userProfileIdentityById
	});
}
function buildSingleRowStoreChildSessionsByKey(params) {
	const storeChildSessions = resolveStoreChildSessionKeysFromCandidates({
		store: params.store,
		key: params.key,
		now: params.now,
		candidates: getSingleRowChildSessionCandidates({
			storePath: params.storePath,
			store: params.store
		})
	});
	return storeChildSessions ? /* @__PURE__ */ new Map([[params.key, storeChildSessions]]) : /* @__PURE__ */ new Map();
}
function resolveSessionSelectedModelRef(params) {
	const override = normalizeStoredOverrideModel({
		providerOverride: params.entry?.providerOverride,
		modelOverride: params.entry?.modelOverride
	});
	if (!override.modelOverride) return null;
	if (!params.rowContext) return resolveSessionModelRef(params.cfg, params.entry, params.agentId, { allowPluginNormalization: params.allowPluginNormalization });
	const key = [
		normalizeAgentId(params.agentId),
		override.providerOverride ?? "",
		override.modelOverride
	].join("\0");
	const cached = params.rowContext.selectedModelByOverrideRef.get(key);
	if (cached) return cached;
	const selected = resolveSessionModelRef(params.cfg, params.entry, params.agentId, { allowPluginNormalization: params.allowPluginNormalization });
	params.rowContext.selectedModelByOverrideRef.set(key, selected);
	return selected;
}
function mergeChildSessionKeys(runtimeChildSessions, storeChildSessions) {
	if (!runtimeChildSessions?.length) return storeChildSessions?.length ? storeChildSessions : void 0;
	if (!storeChildSessions?.length) return runtimeChildSessions;
	return uniqueStrings([...runtimeChildSessions, ...storeChildSessions]);
}
function resolveChildSessionKeys(controllerSessionKey, store, now = Date.now(), subagentRuns) {
	return mergeChildSessionKeys(resolveRuntimeChildSessionKeys(controllerSessionKey, now, subagentRuns), buildStoreChildSessionIndex(store, now, subagentRuns).get(controllerSessionKey));
}
function resolveTranscriptUsageFallback(params) {
	const entry = params.entry;
	if (!entry?.sessionId) return null;
	const parsed = parseAgentSessionKey(params.key);
	const agentId = parsed?.agentId ? normalizeAgentId(parsed.agentId) : normalizeAgentId(params.agentId ?? resolveDefaultAgentId(params.cfg));
	const storePath = resolveConcreteSessionStorePath(params.storePath) ?? resolveStorePath(params.cfg.session?.store, { agentId });
	let snapshot;
	try {
		snapshot = readRecentSessionUsageFromTranscript({
			agentId,
			sessionEntry: entry,
			sessionId: entry.sessionId,
			sessionKey: params.key,
			storePath
		}, typeof params.maxTranscriptBytes === "number" ? params.maxTranscriptBytes : 256 * 1024);
	} catch {
		return null;
	}
	if (!snapshot) return null;
	const modelProvider = snapshot.modelProvider ?? params.fallbackProvider;
	const model = snapshot.model ?? params.fallbackModel;
	const contextTokens = resolveContextTokensForModel({
		cfg: params.cfg,
		provider: modelProvider,
		model,
		allowAsyncLoad: false
	});
	const estimatedCostUsd = resolveEstimatedSessionCostUsd({
		cfg: params.cfg,
		provider: modelProvider,
		model,
		explicitCostUsd: snapshot.costUsd,
		entry: {
			inputTokens: snapshot.inputTokens,
			outputTokens: snapshot.outputTokens,
			cacheRead: snapshot.cacheRead,
			cacheWrite: snapshot.cacheWrite
		},
		rowContext: params.rowContext
	});
	return {
		modelProvider,
		model,
		totalTokens: resolvePositiveNumber(snapshot.totalTokens),
		totalTokensFresh: snapshot.totalTokensFresh === true,
		contextTokens: resolvePositiveNumber(contextTokens),
		estimatedCostUsd
	};
}
//#endregion
//#region src/gateway/session-utils-row.ts
/** Adds current durable human profile display data without persisting rename-prone metadata. */
function projectSessionActor(actor, userProfileIdentityById = /* @__PURE__ */ new Map()) {
	if (!actor) return;
	const id = normalizeOptionalString(actor.id);
	if (actor.type !== "human" || !id) return {
		type: actor.type,
		...id ? { id } : {}
	};
	let identity = userProfileIdentityById.get(id);
	if (!userProfileIdentityById.has(id)) {
		try {
			const profile = getUserProfileListItem(id);
			const label = normalizeOptionalString(profile.displayName);
			identity = {
				...label ? { label } : {},
				...profile.hasAvatar ? { avatarUrl: `${formatUserProfileAvatarPath(profile.id)}?v=${profile.updatedAt}` } : {}
			};
		} catch {
			identity = void 0;
		}
		userProfileIdentityById.set(id, identity);
	}
	return {
		type: actor.type,
		id,
		...identity
	};
}
function buildGatewaySessionRow(params) {
	const { cfg, storePath, store, key, entry } = params;
	const lightweight = params.lightweightListRow === true;
	const now = params.now ?? Date.now();
	const agentStatus = resolveActiveSessionAgentStatus(entry?.agentStatus, now);
	const observerDigest = entry?.observerDigest && (entry.startedAt === void 0 || entry.observerDigest.updatedAt > entry.startedAt) ? entry.observerDigest : void 0;
	const updatedAt = entry?.updatedAt ?? null;
	const parsed = parseGroupKey(key);
	const sessionKind = classifySessionKind(key, entry);
	const gatewayKind = sessionKind === "cron" || sessionKind === "spawn-child" ? "direct" : sessionKind;
	const deliveryFields = projectSessionDeliveryFields(entry?.delivery);
	const channel = deliveryFields.channel ?? parsed?.channel;
	const subject = entry?.subject;
	const groupChannel = entry?.groupChannel;
	const space = entry?.space;
	const id = parsed?.id;
	const origin = deliveryFields.origin;
	const originLabel = origin?.label;
	const parsedAgent = parseAgentSessionKey(key);
	const isDashboardSession = parsedAgent?.rest.startsWith("dashboard:") === true;
	const isGroupSession = isGroupOrChannelDisplaySession(entry, parsed);
	const displayName = entry?.label ?? (isGroupSession ? buildGroupDisplayTitle({
		subject,
		groupChannel,
		space
	}) : void 0) ?? entry?.displayName ?? (isGroupSession && channel ? buildGroupDisplayName({
		provider: channel,
		subject,
		groupChannel,
		space,
		id,
		key
	}) : void 0) ?? (isDashboardSession ? void 0 : originLabel);
	const sessionAgentId = normalizeAgentId(parsedAgent?.agentId ?? params.agentId ?? resolveDefaultAgentId(cfg));
	const skipTranscriptUsage = params.skipTranscriptUsageFallback === true;
	const rowContext = params.rowContext;
	const subagentRun = rowContext ? rowContext.subagentRuns.getDisplaySubagentRun(key) : getSessionDisplaySubagentRunByChildSessionKey(key);
	const subagentOwner = normalizeOptionalString(subagentRun?.controllerSessionKey) || normalizeOptionalString(subagentRun?.requesterSessionKey);
	const liveSubagentRunActive = isSubagentRunLive(subagentRun);
	const persistedSessionStatus = entry?.status;
	const persistedSessionEndedAt = entry?.endedAt;
	const persistedSessionStartedAt = entry?.startedAt;
	const persistedSessionRuntimeMs = entry?.runtimeMs;
	const subagentRunState = subagentRun ? liveSubagentRunActive ? "active" : typeof subagentRun.execution.endedAt === "number" || persistedSessionStatus === "done" || persistedSessionStatus === "failed" || persistedSessionStatus === "killed" || persistedSessionStatus === "timeout" || typeof persistedSessionEndedAt === "number" ? "historical" : "interrupted" : void 0;
	const subagentStatus = subagentRun ? liveSubagentRunActive ? resolveSubagentSessionStatus(subagentRun) : persistedSessionStatus === "running" ? void 0 : persistedSessionStatus ?? (typeof subagentRun.execution.endedAt === "number" ? resolveSubagentSessionStatus(subagentRun) : void 0) : void 0;
	const subagentStartedAt = subagentRun ? liveSubagentRunActive ? getSubagentSessionStartedAt(subagentRun) : persistedSessionStartedAt ?? getSubagentSessionStartedAt(subagentRun) : void 0;
	const subagentEndedAt = subagentRun ? liveSubagentRunActive ? subagentRun.execution.endedAt : persistedSessionEndedAt ?? subagentRun.execution.endedAt : void 0;
	const subagentRuntimeMs = subagentRun ? liveSubagentRunActive ? getSubagentSessionRuntimeMs(subagentRun, now) : persistedSessionRuntimeMs ?? (typeof subagentRun.execution.endedAt === "number" ? getSubagentSessionRuntimeMs(subagentRun, now) : void 0) : void 0;
	const selectedModel = resolveSessionSelectedModelRef({
		cfg,
		entry,
		agentId: sessionAgentId,
		rowContext,
		allowPluginNormalization: !lightweight
	});
	const resolvedModel = resolveSessionModelIdentityRef(cfg, entry, sessionAgentId, subagentRun?.model, { allowPluginNormalization: !lightweight });
	const runtimeModelPresent = Boolean(entry?.model?.trim()) || Boolean(entry?.modelProvider?.trim());
	const freshSessionTotalTokens = resolveNonNegativeNumber(resolveFreshSessionTotalTokens(entry));
	const needsTranscriptTotalTokens = freshSessionTotalTokens === void 0;
	const needsTranscriptContextTokens = resolvePositiveNumber(entry?.contextTokens) === void 0;
	const needsTranscriptEstimatedCostUsd = !skipTranscriptUsage && resolveEstimatedSessionCostUsd({
		cfg,
		provider: resolvedModel.provider,
		model: resolvedModel.model ?? "gpt-5.6-sol",
		entry,
		rowContext
	}) === void 0;
	const transcriptUsage = !skipTranscriptUsage && (needsTranscriptTotalTokens || needsTranscriptContextTokens || needsTranscriptEstimatedCostUsd) ? resolveTranscriptUsageFallback({
		cfg,
		key,
		entry,
		storePath,
		fallbackProvider: resolvedModel.provider,
		fallbackModel: resolvedModel.model ?? "gpt-5.6-sol",
		maxTranscriptBytes: params.transcriptUsageMaxBytes,
		rowContext: params.rowContext,
		agentId: sessionAgentId
	}) : null;
	const preferLiveSubagentModelIdentity = Boolean(subagentRun?.model?.trim()) && subagentStatus === "running";
	const shouldUseTranscriptModelIdentity = runtimeModelPresent && !preferLiveSubagentModelIdentity && (needsTranscriptTotalTokens || needsTranscriptContextTokens);
	const resolvedModelIdentity = {
		provider: resolvedModel.provider,
		model: resolvedModel.model ?? "gpt-5.6-sol"
	};
	const { provider: modelProvider, model } = shouldUseTranscriptModelIdentity ? {
		provider: transcriptUsage?.modelProvider ?? resolvedModelIdentity.provider,
		model: transcriptUsage?.model ?? resolvedModelIdentity.model
	} : resolvedModelIdentity;
	const totalTokens = freshSessionTotalTokens ?? resolveNonNegativeNumber(transcriptUsage?.totalTokens);
	const totalTokensFresh = freshSessionTotalTokens !== void 0 || typeof totalTokens === "number" && Number.isFinite(totalTokens) && totalTokens > 0 ? true : transcriptUsage?.totalTokensFresh === true;
	const goal = entry?.goal ? resolveSessionGoalDisplayState({
		goal: entry.goal,
		totalTokens,
		totalTokensFresh
	}, now, { adoptFreshBaseline: false }) : void 0;
	const childSessions = params.storeChildSessionsByKey ? mergeChildSessionKeys(resolveRuntimeChildSessionKeys(key, now, rowContext?.subagentRuns), params.storeChildSessionsByKey.get(key)) : resolveChildSessionKeys(key, store, now, rowContext?.subagentRuns);
	const compactionCheckpoints = resolveProjectableCompactionCheckpoints(entry);
	const compactionCheckpointCount = Array.isArray(entry?.compactionCheckpoints) ? compactionCheckpoints.length : void 0;
	const latestCompactionCheckpoint = buildCompactionCheckpointPreview(resolveLatestCompactionCheckpoint(compactionCheckpoints));
	const selectedOrRuntimeModelProvider = selectedModel?.provider ?? modelProvider;
	const selectedOrRuntimeModel = selectedModel?.model ?? model;
	const rowModelIdentity = lightweight ? {
		provider: selectedOrRuntimeModelProvider,
		model: selectedOrRuntimeModel
	} : resolveSessionDisplayModelIdentityRefCached({
		cfg,
		agentId: sessionAgentId,
		provider: selectedOrRuntimeModelProvider,
		model: selectedOrRuntimeModel,
		rowContext: params.rowContext
	});
	const rowModelProvider = rowModelIdentity.provider;
	const rowModel = rowModelIdentity.model;
	const acpSessionKey = resolveStoredSessionKeyForAgentStore({
		cfg,
		agentId: sessionAgentId,
		sessionKey: key
	});
	const estimatedCostUsd = lightweight ? resolveNonNegativeNumber(entry?.estimatedCostUsd) : resolveEstimatedSessionCostUsd({
		cfg,
		provider: rowModelProvider,
		model: rowModel,
		entry,
		rowContext: params.rowContext
	}) ?? resolveNonNegativeNumber(transcriptUsage?.estimatedCostUsd);
	const contextTokens = lightweight ? resolvePositiveNumber(entry?.contextTokens) ?? resolvePositiveNumber(resolveContextTokensForModel({
		cfg,
		provider: rowModelProvider,
		model: rowModel,
		allowAsyncLoad: false
	})) : resolvePositiveNumber(entry?.contextTokens) ?? resolvePositiveNumber(transcriptUsage?.contextTokens) ?? resolvePositiveNumber(resolveContextTokensForModel({
		cfg,
		provider: rowModelProvider,
		model: rowModel,
		allowAsyncLoad: false
	}));
	let derivedTitle;
	let lastMessagePreview;
	if (entry?.sessionId && (params.includeDerivedTitles || params.includeLastMessage)) {
		const fields = readSessionTitleFieldsFromTranscript({
			agentId: sessionAgentId,
			sessionEntry: entry,
			sessionId: entry.sessionId,
			sessionKey: key,
			storePath
		});
		if (params.includeDerivedTitles) derivedTitle = deriveSessionTitle(entry, fields.firstUserMessage, displayName);
		if (params.includeLastMessage && fields.lastMessagePreview) lastMessagePreview = fields.lastMessagePreview;
	}
	const thinkingProjection = resolveGatewaySessionThinkingProjectionInternal({
		cfg,
		agentId: sessionAgentId,
		provider: rowModelProvider ?? "openai",
		model: rowModel ?? "gpt-5.6-sol",
		sessionKey: acpSessionKey,
		entry,
		modelCatalog: params.modelCatalog,
		rowContext
	});
	const fastModeState = resolveFastModeState({
		cfg,
		provider: selectedOrRuntimeModelProvider ?? "openai",
		model: selectedOrRuntimeModel ?? "gpt-5.6-sol",
		agentId: sessionAgentId,
		sessionEntry: entry?.fastMode !== void 0 ? { fastMode: entry.fastMode } : void 0
	});
	const pluginExtensions = !lightweight && entry ? projectPluginSessionExtensionsSync({
		sessionKey: key,
		entry
	}) : [];
	return {
		key,
		visibility: entry ? entry.visibility ?? "shared" : void 0,
		incognito: entry?.incognito,
		spawnedBy: subagentOwner || entry?.spawnedBy,
		controlOwnerSessionKey: subagentOwner || entry?.spawnedBy,
		swarmGroupId: entry?.swarmGroupId,
		spawnedWorkspaceDir: entry?.spawnedWorkspaceDir,
		spawnedCwd: entry?.spawnedCwd,
		worktree: entry?.worktree,
		execNode: entry?.execNode,
		execCwd: entry?.execCwd,
		forkedFromParent: sessionEntryForkedFromParent(entry) ? true : void 0,
		spawnDepth: entry?.spawnDepth,
		subagentRole: entry?.subagentRole,
		subagentControlScope: entry?.subagentControlScope,
		createdVia: entry?.createdVia,
		createdActor: projectSessionActor(entry?.createdActor, rowContext?.userProfileIdentityById),
		createdAt: entry?.createdAt,
		forkSource: entry?.forkSource,
		previousSessionId: entry?.previousSessionId,
		kind: gatewayKind,
		label: entry?.label,
		category: entry?.category,
		boardFace: entry?.boardFace,
		displayName,
		derivedTitle,
		lastMessagePreview,
		channel,
		subject,
		groupChannel,
		space,
		chatType: entry?.chatType,
		origin,
		updatedAt,
		archived: entry?.archivedAt !== void 0,
		archivedAt: entry?.archivedAt,
		archivedBy: projectSessionActor(entry?.archivedBy, rowContext?.userProfileIdentityById),
		pinned: entry?.pinnedAt !== void 0,
		pinnedAt: entry?.pinnedAt,
		icon: entry?.icon,
		unread: deriveSessionUnread(entry),
		lastReadAt: entry?.lastReadAt,
		agentStatus,
		observerDigest: observerDigest ? {
			...observerDigest.agentId ? { agentId: observerDigest.agentId } : {},
			runId: observerDigest.runId,
			headline: observerDigest.headline,
			health: observerDigest.health,
			updatedAt: observerDigest.updatedAt,
			revision: observerDigest.revision
		} : void 0,
		lastInteractionAt: entry?.lastInteractionAt,
		lastActivityAt: entry?.lastActivityAt,
		sessionId: entry?.sessionId,
		systemSent: entry?.systemSent,
		abortedLastRun: entry?.abortedLastRun,
		thinkingLevel: thinkingProjection.thinkingLevel,
		thinkingLevels: thinkingProjection.thinkingLevels,
		thinkingOptions: thinkingProjection.thinkingOptions,
		thinkingDefault: thinkingProjection.thinkingDefault,
		fastMode: entry?.fastMode,
		toolOverrides: entry?.toolOverrides,
		effectiveFastMode: fastModeState.mode,
		effectiveFastModeSource: fastModeState.source,
		fastAutoOnSeconds: fastModeState.fastAutoOnSeconds,
		verboseLevel: entry?.verboseLevel,
		traceLevel: entry?.traceLevel,
		reasoningLevel: entry?.reasoningLevel,
		elevatedLevel: entry?.elevatedLevel,
		sendPolicy: entry?.sendPolicy,
		inputTokens: entry?.inputTokens,
		outputTokens: entry?.outputTokens,
		totalTokens,
		totalTokensFresh,
		goal,
		estimatedCostUsd,
		status: subagentRun ? subagentStatus : entry?.status,
		lastRunError: entry?.lastRunError,
		hasAutomation: sessionHasAutomation(key, cfg) ? true : void 0,
		subagentRunState,
		hasActiveSubagentRun: subagentRun ? liveSubagentRunActive : void 0,
		startedAt: subagentRun ? subagentStartedAt : entry?.startedAt,
		endedAt: subagentRun ? subagentEndedAt : entry?.endedAt,
		runtimeMs: subagentRun ? subagentRuntimeMs : entry?.runtimeMs,
		parentSessionKey: entry?.parentSessionKey,
		childSessions,
		responseUsage: entry?.responseUsage,
		effectiveResponseUsage: resolveEffectiveResponseUsage(entry?.responseUsage, cfg.messages?.responseUsage, channel),
		queueMode: entry?.queueMode,
		effectiveQueueMode: resolveQueueSettings({
			cfg,
			channel: INTERNAL_MESSAGE_CHANNEL,
			sessionEntry: entry
		}).mode,
		modelProvider: rowModelProvider,
		model: rowModel,
		modelSelectionLocked: entry?.modelSelectionLocked,
		agentRuntime: thinkingProjection.agentRuntime,
		contextTokens,
		contextBudgetStatus: entry?.contextBudgetStatus,
		deliveryContext: deliveryFields.deliveryContext,
		lastChannel: deliveryFields.lastChannel,
		lastTo: deliveryFields.lastTo,
		lastAccountId: deliveryFields.lastAccountId,
		lastThreadId: deliveryFields.lastThreadId,
		compactionCheckpointCount,
		latestCompactionCheckpoint,
		pluginExtensions: pluginExtensions.length > 0 ? pluginExtensions : void 0
	};
}
//#endregion
export { resolveGatewaySessionStoreTargetWithStore as A, loadSessionEntryReadOnly as C, resolveCanonicalSessionStoreMatchFromStoreKeys as D, resolveCanonicalSessionEntryFromStoreKeys as E, resolveSessionDisplayModelIdentityRefCached as F, deriveSessionTitle as I, isCurrentSessionChildOwner as L, resolveGatewayModelSupportsImages as M, resolveGatewaySessionThinkingProjection as N, resolveDeletedAgentIdFromSessionKey as O, resolveSessionDisplayModelIdentityRef as P, isFinitePositiveTimestamp as R, loadSessionEntry as S, resolveCanonicalGatewaySessionStoreKey as T, resolveActiveSessionAgentStatus as _, buildSingleRowStoreChildSessionsByKey as a, isGroupOrChannelDisplaySession as b, readSessionTitleFieldsFromTranscriptAsync as c, claimSessionAutomationEpoch as d, registerSessionAutomationSource as f, isSessionAgentAttentionIconId as g, resolveCronJobBoundSessionKeys as h, buildSessionListRowMetadataContext as i, getSessionDefaults as j, resolveGatewaySessionStoreTarget as k, readSessionTitleFieldsFromTranscriptBatch as l, disableCronJobsBoundToSession as m, projectSessionActor as n, resolveSessionSelectedModelRef as o, unregisterSessionAutomationSource as p, buildSessionListRowContext as r, readSessionTitleFieldsFromTranscript as s, buildGatewaySessionRow as t, bumpSessionAutomationVersion as u, sanitizeSessionAgentStatusNote as v, parseGroupKey as w, listAgentsForGateway as x, sessionAgentStatusExpiresAt as y, shouldKeepStoreOnlyChildLink as z };
