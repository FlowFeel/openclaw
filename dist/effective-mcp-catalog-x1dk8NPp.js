import { t as assignSafeServerNames } from "./agent-bundle-mcp-names-DTVZURdO.js";
import "./agent-harness-runtime-BcEss0oN.js";
import { v as sessionBindingIdentity } from "./session-binding-BoB3yqZu.js";
import { m as retainSharedCodexAppServerClientByInstanceId } from "./shared-client-DNQsbM1N.js";
//#region extensions/codex/src/app-server/effective-mcp-catalog.ts
const MCP_STATUS_PAGE_SIZE = 100;
const MCP_STATUS_MAX_PAGES = 100;
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function readString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function catalogTool(params) {
	const raw = asRecord(params.raw);
	const description = readString(raw?.description);
	return {
		serverName: params.serverName,
		safeServerName: params.safeServerName,
		toolName: params.toolName,
		...readString(raw?.title) ? { title: readString(raw?.title) } : {},
		...description ? { description } : {},
		inputSchema: asRecord(raw?.inputSchema) ?? { type: "object" },
		fallbackDescription: description ?? params.toolName,
		...params.deniedBySession ? { deniedBySession: true } : {}
	};
}
/** Converts Codex's thread-scoped status response into OpenClaw's MCP catalog shape. */
function buildCodexEffectiveMcpCatalog(statuses, toolOverrides) {
	const orderedStatuses = [...new Map(statuses.map((status) => [status.name, status])).values()].toSorted((left, right) => left.name.localeCompare(right.name));
	const safeNames = assignSafeServerNames(orderedStatuses.map((status) => status.name));
	const serverEntries = [];
	const tools = [];
	const sessionDeniedTools = [];
	for (const status of orderedStatuses) {
		const safeServerName = safeNames.get(status.name) ?? status.name;
		const denialMap = toolOverrides?.mcpToolsDeny;
		const deniedNames = new Set(denialMap && Object.hasOwn(denialMap, status.name) ? denialMap[status.name] : []);
		const observedNames = /* @__PURE__ */ new Set();
		for (const [toolName, raw] of Object.entries(status.tools).toSorted(([left], [right]) => left.localeCompare(right))) {
			observedNames.add(toolName);
			const deniedBySession = deniedNames.has(toolName) ? true : void 0;
			const tool = catalogTool({
				serverName: status.name,
				safeServerName,
				toolName,
				raw,
				...deniedBySession ? { deniedBySession } : {}
			});
			if (deniedBySession) sessionDeniedTools.push(tool);
			else tools.push(tool);
		}
		for (const toolName of [...deniedNames].toSorted()) {
			if (observedNames.has(toolName)) continue;
			sessionDeniedTools.push(catalogTool({
				serverName: status.name,
				safeServerName,
				toolName,
				deniedBySession: true
			}));
		}
		serverEntries.push([status.name, {
			serverName: status.name,
			safeServerName,
			launchSummary: "Codex native MCP connection",
			toolCount: observedNames.size + [...deniedNames].filter((name) => !observedNames.has(name)).length
		}]);
	}
	return {
		version: 1,
		generatedAt: Date.now(),
		servers: Object.fromEntries(serverEntries),
		tools,
		...sessionDeniedTools.length > 0 ? { sessionDeniedTools } : {}
	};
}
async function listCodexMcpServerStatuses(client, threadId) {
	const statuses = [];
	const seenCursors = /* @__PURE__ */ new Set();
	let cursor;
	for (let page = 0; page < MCP_STATUS_MAX_PAGES; page += 1) {
		const response = await client.request("mcpServerStatus/list", {
			threadId,
			detail: "toolsAndAuthOnly",
			limit: MCP_STATUS_PAGE_SIZE,
			...cursor ? { cursor } : {}
		});
		statuses.push(...response.data);
		cursor = response.nextCursor;
		if (!cursor) return statuses;
		if (seenCursors.has(cursor)) throw new Error("Codex mcpServerStatus/list repeated its pagination cursor");
		seenCursors.add(cursor);
	}
	throw new Error("Codex mcpServerStatus/list exceeded the bounded page limit");
}
/** Loads MCP inventory only from the already-bound Codex process and thread. */
async function loadCodexEffectiveMcpCatalog(params, options) {
	const binding = await options.bindingStore.read(sessionBindingIdentity({
		agentId: params.agentId,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		config: params.config
	}));
	if (!binding?.clientId) return;
	const retained = retainSharedCodexAppServerClientByInstanceId(binding.clientId);
	if (!retained) return;
	try {
		const allowedServerNames = new Set(params.mcpServerNames);
		return buildCodexEffectiveMcpCatalog((await listCodexMcpServerStatuses(retained.client, binding.threadId)).filter((status) => allowedServerNames.has(status.name)), params.toolOverrides);
	} finally {
		retained.release();
	}
}
//#endregion
export { loadCodexEffectiveMcpCatalog };
