import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { c as resolveAgentDir, d as resolveDefaultAgentDir, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { c as resolveAuthProfileDatabasePath } from "./sqlite-DQLy89x1.js";
import { i as getRuntimeAuthProfileStoreCredentialsRevision } from "./runtime-snapshots-D6jlj0Te.js";
import { n as hasSecretRefCandidate, t as hasCredentialBearingObjectValue } from "./runtime-secret-scan-J6Zi9oBP.js";
import { existsSync } from "node:fs";
import path from "node:path";
//#region src/secrets/runtime-fast-path.ts
/** Detects when secrets runtime preparation can safely use a fast path. */
const RUNTIME_PATH_ENV_KEYS = [
	"HOME",
	"USERPROFILE",
	"HOMEDRIVE",
	"HOMEPATH",
	"OPENCLAW_HOME",
	"OPENCLAW_STATE_DIR",
	"OPENCLAW_CONFIG_PATH",
	"OPENCLAW_AGENT_DIR"
];
/**
* Merges caller env with process path env needed for config and agent-dir resolution.
*/
function mergeSecretsRuntimeEnv(env) {
	const merged = { ...env ?? process.env };
	for (const key of RUNTIME_PATH_ENV_KEYS) {
		if (merged[key] !== void 0) continue;
		const processValue = process.env[key];
		if (processValue !== void 0) merged[key] = processValue;
	}
	return merged;
}
/**
* Collects default and named agent directories that may contain auth profile stores.
*/
function collectCandidateAgentDirs(config, env = process.env) {
	const dirs = /* @__PURE__ */ new Set();
	dirs.add(resolveUserPath(resolveDefaultAgentDir(config, env), env));
	for (const agentId of listAgentIds(config)) dirs.add(resolveUserPath(resolveAgentDir(config, agentId, env), env));
	return [...dirs];
}
/**
* Combines explicit refresh agent dirs with config-derived dirs for runtime refresh.
*/
function resolveRefreshAgentDirs(config, context) {
	const configDerived = collectCandidateAgentDirs(config, context.env);
	if (!context.explicitAgentDirs || context.explicitAgentDirs.length === 0) return configDerived;
	return uniqueStrings([...context.explicitAgentDirs, ...configDerived]);
}
function resolveCandidateAgentDirs(params) {
	return params.agentDirs?.length ? uniqueStrings(params.agentDirs.map((entry) => resolveUserPath(entry, params.env))) : collectCandidateAgentDirs(params.config, params.env);
}
function hasCandidateAuthProfileStoreSource(agentDir) {
	return existsSync(resolveAuthProfileDatabasePath(agentDir));
}
/**
* Returns whether canonical auth-profile databases exist for candidate agent dirs.
*/
function hasCandidateAuthProfileStoreSources(params) {
	const candidateDirs = resolveCandidateAgentDirs(params);
	const mainAgentDir = path.join(resolveStateDir(params.env), "agents", "main", "agent");
	return candidateDirs.some((agentDir) => hasCandidateAuthProfileStoreSource(agentDir)) || hasCandidateAuthProfileStoreSource(mainAgentDir);
}
/**
* Creates empty web-tool metadata for snapshots that do not need secret resolution.
*/
function createEmptyRuntimeWebToolsMetadata() {
	return {
		search: {
			providerSource: "none",
			diagnostics: []
		},
		fetch: {
			providerSource: "none",
			diagnostics: []
		},
		diagnostics: []
	};
}
function hasActiveRuntimeWebFetchProviderSurface(fetch, defaults) {
	if (!fetch || typeof fetch !== "object" || Array.isArray(fetch)) return false;
	const fetchConfig = fetch;
	if (fetchConfig.enabled === false) return false;
	if (typeof fetchConfig.provider === "string" && fetchConfig.provider.trim()) return true;
	return hasCredentialBearingObjectValue(fetchConfig, defaults);
}
function hasRuntimeWebToolConfigSurface(config) {
	const web = config.tools?.web;
	const defaults = config.secrets?.defaults;
	const fetchExplicitlyDisabled = web && typeof web === "object" && !Array.isArray(web) && typeof web.fetch === "object" && web.fetch?.enabled === false;
	if (web && typeof web === "object" && !Array.isArray(web)) {
		const webRecord = web;
		if ("search" in webRecord) return true;
		if ("fetch" in webRecord && hasActiveRuntimeWebFetchProviderSurface(webRecord.fetch, defaults)) return true;
	}
	const entries = config.plugins?.entries;
	if (!entries || typeof entries !== "object" || Array.isArray(entries)) return false;
	return Object.values(entries).some((entry) => {
		if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
		const pluginConfig = entry.config;
		return pluginConfig !== null && typeof pluginConfig === "object" && !Array.isArray(pluginConfig) && ("webSearch" in pluginConfig || !fetchExplicitlyDisabled && "webFetch" in pluginConfig);
	});
}
/**
* Returns whether a snapshot can skip full SecretRef/web-tool resolution.
*/
/** Returns whether current config/auth/plugin state allows skipping full secret preparation. */
function canUseSecretsRuntimeFastPath(params) {
	if (hasRuntimeWebToolConfigSurface(params.sourceConfig)) return false;
	const defaults = params.sourceConfig.secrets?.defaults;
	if (hasSecretRefCandidate(params.sourceConfig, defaults)) return false;
	return !params.authStores.some((entry) => hasSecretRefCandidate(entry.store, defaults));
}
/**
* Prepares a runtime snapshot without resolving refs when config and auth stores contain none.
*/
function prepareSecretsRuntimeFastPathSnapshot(params) {
	const runtimeEnv = mergeSecretsRuntimeEnv(params.env);
	const authStoreCredentialsRevision = getRuntimeAuthProfileStoreCredentialsRevision();
	const sourceConfig = structuredClone(params.config);
	const resolvedConfig = structuredClone(params.config);
	const includeAuthStoreRefs = params.includeAuthStoreRefs ?? true;
	const candidateDirs = resolveCandidateAgentDirs({
		config: resolvedConfig,
		env: runtimeEnv,
		agentDirs: params.agentDirs
	});
	let authStores = [];
	if (includeAuthStoreRefs) if (!params.loadAuthStore) {
		if (hasCandidateAuthProfileStoreSources({
			config: resolvedConfig,
			env: runtimeEnv,
			agentDirs: candidateDirs
		})) return null;
		authStores = candidateDirs.map((agentDir) => ({
			agentDir,
			store: {
				version: 1,
				profiles: {}
			}
		}));
	} else {
		const loadAuthStore = params.loadAuthStore;
		authStores = candidateDirs.map((agentDir) => ({
			agentDir,
			store: structuredClone(loadAuthStore(agentDir))
		}));
	}
	if (!canUseSecretsRuntimeFastPath({
		sourceConfig,
		authStores
	})) return null;
	return {
		snapshot: {
			sourceConfig,
			config: resolvedConfig,
			authStores,
			authStoreCredentialsRevision,
			warnings: [],
			degradedOwners: [],
			secretOwners: [],
			webTools: createEmptyRuntimeWebToolsMetadata()
		},
		usesAuthStoreFallback: !params.loadAuthStore,
		refreshContext: {
			env: runtimeEnv,
			explicitAgentDirs: params.agentDirs?.length ? [...candidateDirs] : null,
			includeAuthStoreRefs,
			loadablePluginOrigins: params.loadablePluginOrigins ?? /* @__PURE__ */ new Map(),
			...params.manifestRegistry ? { manifestRegistry: params.manifestRegistry } : {},
			...params.loadAuthStore ? { loadAuthStore: params.loadAuthStore } : {}
		}
	};
}
//#endregion
export { prepareSecretsRuntimeFastPathSnapshot as a, mergeSecretsRuntimeEnv as i, collectCandidateAgentDirs as n, resolveRefreshAgentDirs as o, createEmptyRuntimeWebToolsMetadata as r, canUseSecretsRuntimeFastPath as t };
