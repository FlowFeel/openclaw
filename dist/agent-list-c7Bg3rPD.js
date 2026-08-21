import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { f as resolveDefaultAgentId, n as listAgentEntries } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { u as normalizeMainKey } from "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { n as SYSTEM_AGENT_ROSTER_ENTRIES } from "./agent-id-D7-xzIog.js";
import fs from "node:fs";
import path from "node:path";
//#region src/gateway/agent-list.ts
const OWNER_ROSTER_ENTRIES = SYSTEM_AGENT_ROSTER_ENTRIES;
function listExistingAgentIdsFromDisk() {
	const agentsDir = path.join(resolveStateDir(), "agents");
	try {
		return fs.readdirSync(agentsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => normalizeAgentId(entry.name)).filter(Boolean);
	} catch {
		return [];
	}
}
/** Lists gateway-visible agents with canonical membership, ordering, and semantic kind. */
function listGatewayAgentsBasic(cfg) {
	const ownerEntries = new Map(OWNER_ROSTER_ENTRIES.map((entry) => [normalizeAgentId(entry.id), entry]));
	const defaultId = normalizeAgentId(resolveDefaultAgentId(cfg));
	const mainKey = normalizeMainKey(cfg.session?.mainKey);
	const scope = cfg.session?.scope ?? "per-sender";
	const configuredById = /* @__PURE__ */ new Map();
	const explicitIds = /* @__PURE__ */ new Set();
	const diskIds = /* @__PURE__ */ new Set();
	const agentIds = /* @__PURE__ */ new Set([defaultId]);
	for (const entry of listAgentEntries(cfg)) {
		if (!entry?.id) continue;
		const id = normalizeAgentId(entry.id);
		const configuredName = normalizeOptionalString(entry.name);
		const identityName = normalizeOptionalString(entry.identity?.name);
		configuredById.set(id, { name: configuredName ?? identityName });
		explicitIds.add(id);
		agentIds.add(id);
	}
	for (const id of listExistingAgentIdsFromDisk()) {
		diskIds.add(id);
		agentIds.add(id);
	}
	const allowedIds = explicitIds.size > 0 ? /* @__PURE__ */ new Set([...explicitIds, defaultId]) : null;
	const visibleIds = [...agentIds].filter((id) => !allowedIds || allowedIds.has(id) || diskIds.has(id) && ownerEntries.has(id));
	visibleIds.sort((a, b) => a.localeCompare(b));
	const orderedIds = visibleIds.includes(defaultId) ? [defaultId, ...visibleIds.filter((id) => id !== defaultId)] : visibleIds;
	if (mainKey && !orderedIds.includes(mainKey) && (!allowedIds || allowedIds.has(mainKey))) orderedIds.push(mainKey);
	return {
		defaultId,
		mainKey,
		scope,
		agents: orderedIds.map((id) => ({
			id,
			kind: !explicitIds.has(id) && diskIds.has(id) ? ownerEntries.get(id)?.kind ?? "agent" : "agent",
			name: configuredById.get(id)?.name
		}))
	};
}
//#endregion
export { listGatewayAgentsBasic as t };
