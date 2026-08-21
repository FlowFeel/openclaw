import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { f as resolveDefaultAgentId, n as listAgentEntries } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { t as isIncognitoSessionKey } from "./incognito-session-key-BwpD1Lwd.js";
import { r as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { m as listOpenIncognitoAgentDatabases } from "./openclaw-agent-db--PLC25lY.js";
import { i as resolveStoredSessionKeyForAgentStore, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { Z as countSqliteSessionEntryRowsReadOnly, nt as listSqliteSessionEntriesReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import { U as canonicalSessionKeyMigrationRequiredError, a as resolveAgentSessionStoreTargetsSync, i as listKnownSessionStoreAgentIds, l as resolveSessionStoreTargets, r as listConfiguredSessionStoreAgentIds, s as resolveAllAgentSessionStoreTargetsSync, u as dedupeSessionStoreTargetsBySqliteTarget } from "./targets-Dooi6t13.js";
import { o as resolveDeliveryProvenCanonicalSessionKey } from "./store-entry-0o94FtE8.js";
import { $ as listSessionEntries } from "./session-accessor-t3qUoTeV.js";
//#region src/config/sessions/combined-store-gateway.ts
function isStorePathTemplate(store) {
	return typeof store === "string" && store.includes("{agentId}");
}
function resolveCombinedStorePath(paths, storeConfig) {
	return paths.length === 1 ? expectDefined(paths[0], "store path at 0") : typeof storeConfig === "string" && storeConfig.trim() ? storeConfig.trim() : "(multiple)";
}
function loadGatewayStoreEntries(params) {
	return (params.includeOpenDatabases ? listSessionEntries : listSqliteSessionEntriesReadOnly)({
		agentId: params.agentId,
		clone: false,
		projection: params.projection,
		storePath: params.storePath
	});
}
function mergeSessionEntryIntoCombined(params) {
	const { cfg, combined, entry, agentId, canonicalKey } = params;
	const existing = combined[canonicalKey];
	if (existing && (canonicalKey === "global" || canonicalKey === "unknown")) return;
	if (existing) throw canonicalSessionKeyMigrationRequiredError(`duplicate rows resolve to canonical session key ${canonicalKey}`);
	const deliveryCanonicalKey = resolveDeliveryProvenCanonicalSessionKey(canonicalKey, entry);
	if (deliveryCanonicalKey !== canonicalKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${deliveryCanonicalKey}`);
	const resolveLineageKey = (sessionKey) => sessionKey ? resolveSessionStoreKey({
		cfg,
		sessionKey,
		storeAgentId: agentId
	}) : void 0;
	combined[canonicalKey] = {
		...entry,
		...entry.parentSessionKey ? { parentSessionKey: resolveLineageKey(entry.parentSessionKey) } : {},
		...entry.spawnedBy ? { spawnedBy: resolveLineageKey(entry.spawnedBy) } : {}
	};
}
function mergeOpenIncognitoStores(params) {
	const storePaths = [];
	for (const target of params.targets) {
		const store = loadGatewayStoreEntries({
			agentId: target.agentId,
			includeOpenDatabases: true,
			projection: params.projection,
			storePath: target.storePath
		});
		let merged = false;
		for (const { sessionKey, entry } of store) {
			if (!isIncognitoSessionKey(sessionKey) || entry.incognito !== true) continue;
			mergeSessionEntryIntoCombined({
				cfg: params.cfg,
				combined: params.combined,
				entry,
				agentId: target.agentId,
				canonicalKey: sessionKey
			});
			merged = true;
		}
		if (merged) storePaths.push(target.storePath);
	}
	return storePaths;
}
function resolveGatewaySessionStoreTargets(cfg, opts) {
	const storeConfig = cfg.session?.store;
	const diagnostics = [];
	const defaultAgentId = normalizeAgentId(resolveDefaultAgentId(cfg));
	const requestedAgentId = typeof opts.agentId === "string" && opts.agentId.trim() ? normalizeAgentId(opts.agentId) : void 0;
	const configuredAgentIds = opts.configuredAgentsOnly === true && !requestedAgentId ? new Set(listConfiguredSessionStoreAgentIds(cfg)) : void 0;
	const allowedIncognitoAgentIds = requestedAgentId ? /* @__PURE__ */ new Set([requestedAgentId]) : configuredAgentIds;
	const incognitoTargets = opts.includeIncognito === false ? [] : listOpenIncognitoAgentDatabases().filter((target) => !allowedIncognitoAgentIds || allowedIncognitoAgentIds.has(target.agentId));
	if (storeConfig && !isStorePathTemplate(storeConfig)) return {
		configuredAgentIds,
		defaultAgentId,
		diagnostics,
		durableTargets: dedupeSessionStoreTargetsBySqliteTarget([.../* @__PURE__ */ new Set([
			...listAgentEntries(cfg).map((entry) => normalizeAgentId(entry.id)),
			...listKnownSessionStoreAgentIds(cfg),
			defaultAgentId,
			LEGACY_IMPLICIT_AGENT_ID,
			...requestedAgentId ? [requestedAgentId] : []
		])].map((agentId) => ({
			agentId,
			storePath: resolveStorePath(storeConfig, { agentId })
		})), {
			defaultAgentId,
			onDiagnostic: (diagnostic) => diagnostics.push(diagnostic.message)
		}),
		incognitoTargets,
		requestedAgentId,
		storeConfig
	};
	return {
		configuredAgentIds,
		defaultAgentId,
		diagnostics,
		durableTargets: requestedAgentId ? resolveAgentSessionStoreTargetsSync(cfg, requestedAgentId) : opts.configuredAgentsOnly === true ? resolveSessionStoreTargets(cfg, { allAgents: true }) : resolveAllAgentSessionStoreTargetsSync(cfg),
		incognitoTargets,
		requestedAgentId,
		storeConfig
	};
}
/** Checks whether Gateway prewarm can project the selected stores within a bounded row budget. */
function canPrewarmCombinedSessionStoresForGateway(cfg, params) {
	const defaultAgentId = normalizeAgentId(resolveDefaultAgentId(cfg));
	let totalRows = 0;
	for (const agentId of params.agentIds) {
		const resolved = resolveGatewaySessionStoreTargets(cfg, { agentId });
		const projectionTargets = dedupeSessionStoreTargetsBySqliteTarget([...resolved.durableTargets, ...resolved.incognitoTargets], { defaultAgentId });
		for (const target of projectionTargets) {
			totalRows += countSqliteSessionEntryRowsReadOnly(target);
			if (totalRows > params.maxRows) return false;
		}
	}
	return true;
}
/** Loads and canonicalizes session entries for gateway views across one or more agent stores. */
function loadCombinedSessionStoreForGateway(cfg, opts = {}) {
	const projection = opts.projection ?? "full";
	const { configuredAgentIds, defaultAgentId, diagnostics, durableTargets, incognitoTargets, requestedAgentId, storeConfig } = resolveGatewaySessionStoreTargets(cfg, opts);
	if (storeConfig && !isStorePathTemplate(storeConfig)) {
		const combined = {};
		for (const { agentId, storePath } of durableTargets) {
			const store = loadGatewayStoreEntries({
				agentId,
				projection,
				storePath
			});
			for (const { sessionKey: key, entry } of store) {
				const canonicalKey = resolveStoredSessionKeyForAgentStore({
					cfg,
					agentId,
					sessionKey: key
				});
				if (key !== canonicalKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${canonicalKey}`);
				const canonicalAgentId = normalizeAgentId(parseAgentSessionKey(canonicalKey)?.agentId ?? agentId);
				if (configuredAgentIds && !configuredAgentIds.has(canonicalAgentId)) continue;
				if (requestedAgentId && canonicalAgentId !== requestedAgentId) continue;
				mergeSessionEntryIntoCombined({
					cfg,
					combined,
					entry,
					agentId: canonicalAgentId,
					canonicalKey
				});
			}
		}
		const durableStorePath = resolveStorePath(storeConfig, { agentId: defaultAgentId });
		return {
			diagnostics,
			durableStorePath,
			storePath: mergeOpenIncognitoStores({
				cfg,
				combined,
				projection,
				targets: incognitoTargets
			}).length > 0 ? "(multiple)" : durableStorePath,
			store: combined
		};
	}
	const combined = {};
	for (const target of durableTargets) {
		const agentId = target.agentId;
		const storePath = target.storePath;
		const store = loadGatewayStoreEntries({
			agentId,
			projection,
			storePath
		});
		for (const { sessionKey: key, entry } of store) {
			const canonicalKey = resolveStoredSessionKeyForAgentStore({
				cfg,
				agentId,
				sessionKey: key
			});
			if (key !== canonicalKey) throw canonicalSessionKeyMigrationRequiredError(`non-canonical persisted row resolves to session key ${canonicalKey}`);
			const canonicalAgentId = normalizeAgentId(parseAgentSessionKey(canonicalKey)?.agentId ?? agentId);
			if (configuredAgentIds && !configuredAgentIds.has(canonicalAgentId)) continue;
			if (requestedAgentId && canonicalAgentId !== requestedAgentId) continue;
			mergeSessionEntryIntoCombined({
				cfg,
				combined,
				entry,
				agentId: canonicalAgentId,
				canonicalKey
			});
		}
	}
	const incognitoStorePaths = mergeOpenIncognitoStores({
		cfg,
		combined,
		projection,
		targets: incognitoTargets
	});
	const durableStorePaths = durableTargets.map((target) => target.storePath);
	return {
		diagnostics,
		durableStorePath: resolveCombinedStorePath(durableStorePaths, storeConfig),
		storePath: resolveCombinedStorePath([...durableStorePaths, ...incognitoStorePaths], storeConfig),
		store: combined
	};
}
//#endregion
export { loadCombinedSessionStoreForGateway as n, canPrewarmCombinedSessionStoresForGateway as t };
