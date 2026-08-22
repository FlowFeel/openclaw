import { p as readStringValue } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { r as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import { r as registerResolvedAgentDir } from "./agent-dir-registry-DBWwXoA1.js";
import { n as resolveDefaultAgentWorkspaceDir } from "./workspace-default-CK-leyvS.js";
import path from "node:path";
//#region src/config/model-policy-allowlist-migration.ts
const MODEL_POLICY_ALLOWLIST_MIGRATION_MARKER = "modelPolicyAllowlist";
function hasModelPolicyAllowlistMigrationMarker(value) {
	if (isRecord(value) && isRecord(value.meta) && isRecord(value.meta.migrations) && value.meta.migrations["modelPolicyAllowlist"] === true) return true;
	return false;
}
/** Any policy object opts into the explicit model-policy semantics. */
function isExplicitModelPolicy(value) {
	return isRecord(value);
}
/** A per-agent policy replaces inherited defaults only when it owns `allow`. */
function hasExplicitModelPolicyAllow(value) {
	return isExplicitModelPolicy(value) && Object.hasOwn(value, "allow");
}
function computeModelPolicyAllowlist(params) {
	if (hasModelPolicyAllowlistMigrationMarker(params.root)) return null;
	return collectLegacyDefaultModelAllowRefs(params.defaults);
}
function collectLegacyDefaultModelAllowRefs(defaults) {
	if (!isRecord(defaults)) return null;
	if (isExplicitModelPolicy(defaults.modelPolicy)) return null;
	if (!isRecord(defaults.models)) return null;
	const refs = Object.keys(defaults.models).filter((key) => key.trim().length > 0);
	return refs.length > 0 ? refs : null;
}
//#endregion
//#region src/agents/agent-scope-config.ts
/** Resolves configured agent ids, directories, workspaces, and merged agent defaults. */
/** Strip null bytes from paths to prevent ENOTDIR errors. */
function stripNullBytes(s) {
	return s.replaceAll("\0", "");
}
/** Lists valid configured agent entries from config. */
function listAgentEntriesWithSource(cfg) {
	const roster = readAgentRosterProperty(cfg);
	if (roster?.kind === "entries" && roster.value && typeof roster.value === "object") return Object.entries(roster.value).map(([id, entry]) => ({
		entry: {
			...entry,
			id
		},
		source: {
			kind: "entries",
			key: id
		}
	}));
	if (roster?.kind !== "list" || !Array.isArray(roster.value)) return [];
	return roster.value.flatMap((entry, index) => entry !== null && typeof entry === "object" ? [{
		entry,
		source: {
			kind: "list",
			index
		}
	}] : []);
}
/** Lists valid configured agent entries from either supported representation. */
function listAgentEntries(cfg) {
	return listAgentEntriesWithSource(cfg).map(({ entry }) => entry);
}
/** Converts either supported roster representation into the canonical keyed shape. */
function toAgentEntriesRecord(entries) {
	return Object.fromEntries(entries.map((entry) => {
		const { id, ...config } = entry;
		return [id, config];
	}));
}
/** Reads the explicitly owned raw roster without normalizing malformed values. */
function readAgentRosterProperty(raw) {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
	const agents = raw.agents;
	if (!agents || typeof agents !== "object" || Array.isArray(agents)) return;
	const entries = agents["entries"];
	if (Object.hasOwn(agents, "entries") && entries !== void 0) return {
		kind: "entries",
		value: entries
	};
	const list = agents["list"];
	if (Object.hasOwn(agents, "list") && list !== void 0) return {
		kind: "list",
		value: list
	};
}
/** True when raw config explicitly owns either supported roster representation. */
function hasAgentRosterProperty(raw) {
	return readAgentRosterProperty(raw) !== void 0;
}
/** Lists unique configured agent ids. */
function listAgentIds(cfg) {
	const agents = listAgentEntries(cfg);
	if (agents.length === 0 && !hasAgentRosterProperty(cfg)) return [LEGACY_IMPLICIT_AGENT_ID];
	const seen = /* @__PURE__ */ new Set();
	const ids = [];
	for (const entry of agents) {
		const id = normalizeAgentId(entry?.id);
		if (seen.has(id)) continue;
		seen.add(id);
		ids.push(id);
	}
	return ids;
}
/** Resolves the configured default while preserving the shipped Plugin SDK legacy shape. */
function resolveDefaultAgentId(cfg) {
	const agents = listAgentEntries(cfg);
	if (agents.length === 0) {
		if (!hasAgentRosterProperty(cfg)) return LEGACY_IMPLICIT_AGENT_ID;
		throw new Error("No agents configured. Run `openclaw onboard` or `openclaw agents add` first.");
	}
	return normalizeAgentId((agents.find((agent) => agent?.default === true) ?? agents[0]).id);
}
/** Returns the configured default when diagnostics must tolerate an invalid raw roster. */
function tryResolveDefaultAgentId(cfg) {
	const defaults = listAgentEntries(cfg).filter((agent) => agent?.default === true);
	if (defaults.length !== 1) return;
	return normalizeAgentId(defaults[0].id);
}
function resolveAgentEntry(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	return listAgentEntries(cfg).find((entry) => normalizeAgentId(entry.id) === id);
}
/** Resolves the authored entry object for in-place canonical config mutations. */
function resolveMutableAgentEntry(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	const roster = readAgentRosterProperty(cfg);
	if (roster?.kind === "entries" && roster.value && typeof roster.value === "object") {
		const entries = roster.value;
		const key = Object.keys(entries).find((candidate) => normalizeAgentId(candidate) === id);
		return key ? entries[key] : void 0;
	}
	if (roster?.kind === "list" && Array.isArray(roster.value)) return roster.value.find((entry) => normalizeAgentId(entry?.id) === id);
}
/** Resolves merged config for one agent id. */
function resolveAgentConfig(cfg, agentId) {
	const entry = resolveAgentEntry(cfg, normalizeAgentId(agentId));
	if (!entry) return;
	const agentDefaults = cfg.agents?.defaults;
	return {
		name: readStringValue(entry.name),
		workspace: readStringValue(entry.workspace),
		agentDir: readStringValue(entry.agentDir),
		model: typeof entry.model === "string" || entry.model && typeof entry.model === "object" ? entry.model : void 0,
		...entry.models ? { models: entry.models } : {},
		...entry.params ? { params: entry.params } : {},
		...entry.runtime ? { runtime: entry.runtime } : {},
		...hasExplicitModelPolicyAllow(entry.modelPolicy) ? { modelPolicy: entry.modelPolicy } : {},
		...entry.agentRuntime ? { agentRuntime: entry.agentRuntime } : {},
		utilityModel: readStringValue(entry.utilityModel),
		thinkingDefault: entry.thinkingDefault,
		verboseDefault: entry.verboseDefault ?? agentDefaults?.verboseDefault,
		reasoningDefault: entry.reasoningDefault,
		fastModeDefault: entry.fastModeDefault ?? agentDefaults?.fastModeDefault,
		contextTokens: entry.contextTokens ?? agentDefaults?.contextTokens,
		contextInjection: entry.contextInjection,
		bootstrapMaxChars: entry.bootstrapMaxChars,
		bootstrapTotalMaxChars: entry.bootstrapTotalMaxChars,
		experimental: typeof entry.experimental === "object" && entry.experimental ? {
			...agentDefaults?.experimental,
			...entry.experimental
		} : agentDefaults?.experimental,
		skills: Array.isArray(entry.skills) ? entry.skills : void 0,
		memory: entry.memory,
		humanDelay: entry.humanDelay,
		typingMode: entry.typingMode ?? agentDefaults?.typingMode,
		tts: entry.tts,
		contextLimits: typeof entry.contextLimits === "object" && entry.contextLimits ? {
			...agentDefaults?.contextLimits,
			...entry.contextLimits
		} : agentDefaults?.contextLimits,
		heartbeat: entry.heartbeat,
		identity: entry.identity,
		groupChat: entry.groupChat,
		subagents: typeof entry.subagents === "object" && entry.subagents ? entry.subagents : void 0,
		embeddedAgent: typeof entry.embeddedAgent === "object" && entry.embeddedAgent ? entry.embeddedAgent : void 0,
		sandbox: entry.sandbox,
		tools: entry.tools
	};
}
function resolveAgentContextLimits(cfg, agentId) {
	const defaults = cfg?.agents?.defaults?.contextLimits;
	if (!cfg || !agentId) return defaults;
	return resolveAgentConfig(cfg, agentId)?.contextLimits ?? defaults;
}
function resolveAgentWorkspaceDir(cfg, agentId, env = process.env) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.workspace?.trim();
	if (configured) return stripNullBytes(resolveUserPath(configured, env));
	const defaultAgentId = resolveDefaultAgentId(cfg);
	const fallback = cfg.agents?.defaults?.workspace?.trim();
	if (id === defaultAgentId) {
		if (fallback) return stripNullBytes(resolveUserPath(fallback, env));
		return stripNullBytes(resolveDefaultAgentWorkspaceDir(env));
	}
	if (fallback) return stripNullBytes(path.join(resolveUserPath(fallback, env), id));
	const stateDir = resolveStateDir(env);
	return stripNullBytes(path.join(stateDir, `workspace-${id}`));
}
function resolveAgentDir(cfg, agentId, env = process.env) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.agentDir?.trim();
	if (configured) {
		const agentDir = resolveUserPath(configured, env);
		registerResolvedAgentDir({
			agentId: id,
			agentDir,
			env
		});
		return agentDir;
	}
	const root = resolveStateDir(env);
	const agentDir = path.join(root, "agents", id, "agent");
	registerResolvedAgentDir({
		agentId: id,
		agentDir,
		env
	});
	return agentDir;
}
function resolveDefaultAgentDir(cfg, env = process.env) {
	return resolveAgentDir(cfg, resolveDefaultAgentId(cfg), env);
}
//#endregion
export { computeModelPolicyAllowlist as _, readAgentRosterProperty as a, isExplicitModelPolicy as b, resolveAgentDir as c, resolveDefaultAgentDir as d, resolveDefaultAgentId as f, MODEL_POLICY_ALLOWLIST_MIGRATION_MARKER as g, tryResolveDefaultAgentId as h, listAgentIds as i, resolveAgentEntry as l, toAgentEntriesRecord as m, listAgentEntries as n, resolveAgentConfig as o, resolveMutableAgentEntry as p, listAgentEntriesWithSource as r, resolveAgentContextLimits as s, hasAgentRosterProperty as t, resolveAgentWorkspaceDir as u, hasExplicitModelPolicyAllow as v, hasModelPolicyAllowlistMigrationMarker as y };
