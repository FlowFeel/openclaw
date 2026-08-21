import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.js";
import { i as asOptionalRecord } from "./record-coerce-DHZ4bFlT.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import { c as resolveAgentDir, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { a as logWarn } from "./logger-CWK_jOH2.js";
import "./agent-scope-DyEposw2.js";
import { h as visitSessionMessagesAsync } from "./session-transcript-readers-O8pyQfzE.js";
import { C as loadSessionEntryReadOnly } from "./session-utils-row-Br8x7LNG.js";
import "./session-utils-P5pxtsqu.js";
import { a as getOrCreateSessionMcpRuntime, s as peekSessionMcpRuntime, t as completeDeferredSessionMcpRuntimeRetirement } from "./agent-bundle-mcp-manager-api-D2GddaSc.js";
import "./agent-bundle-mcp-runtime-C1c78bIy.js";
import { a as getMcpAppViewLeaseForSession, i as getMcpAppViewLease, r as fetchMcpAppView, t as acquireMcpAppViewRequest } from "./mcp-ui-resource-CHdOzPZi.js";
import { CallToolRequestSchema, ContentBlockSchema, ListResourceTemplatesRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";
//#region src/gateway/mcp-app-reconstruction.ts
const MCP_APP_RESTORE_IN_FLIGHT_KEY = Symbol.for("openclaw.mcpAppRestoreInFlight");
function readString(record, key) {
	const value = record?.[key];
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function readDescriptor(value) {
	const record = asOptionalRecord(value);
	const viewId = readString(record, "viewId");
	const serverName = readString(record, "serverName");
	const toolName = readString(record, "toolName");
	const uiResourceUri = readString(record, "uiResourceUri");
	const toolCallId = readString(record, "toolCallId");
	const rawResultMetaState = record?.resultMetaState;
	const resultMetaState = rawResultMetaState === "unavailable" ? rawResultMetaState : void 0;
	if (!viewId || viewId.length > 128 || !serverName || serverName.length > 256 || !toolName || toolName.length > 256 || !uiResourceUri?.startsWith("ui://") || uiResourceUri.length > 2048 || !toolCallId || toolCallId.length > 512 || rawResultMetaState !== void 0 && resultMetaState === void 0) return;
	return {
		viewId,
		serverName,
		toolName,
		uiResourceUri,
		toolCallId,
		...resultMetaState ? { resultMetaState } : {}
	};
}
function readToolInputFromMessage(value, toolCallId, modelToolName) {
	const message = asOptionalRecord(value);
	if (readString(message, "role")?.toLowerCase() !== "assistant") return;
	const content = Array.isArray(message?.content) ? message.content : [];
	for (const blockValue of content) {
		const block = asOptionalRecord(blockValue);
		if ((readString(block, "id") ?? readString(block, "toolCallId")) !== toolCallId) continue;
		const type = readString(block, "type")?.toLowerCase();
		if (type !== "toolcall" && type !== "tool_call" && type !== "tooluse" && type !== "tool_use") continue;
		if ((readString(block, "name") ?? readString(block, "toolName") ?? readString(block, "tool_name")) !== modelToolName) continue;
		return {
			found: true,
			input: block?.arguments ?? block?.input ?? block?.args ?? {}
		};
	}
}
function readCallToolResult(message, details) {
	return {
		content: Array.isArray(message.content) ? message.content.flatMap((value) => {
			const parsed = ContentBlockSchema.safeParse(value);
			return parsed.success ? [parsed.data] : [];
		}) : [],
		...details.structuredContent !== void 0 ? { structuredContent: details.structuredContent } : {},
		...message.isError === true || details.status === "error" ? { isError: true } : {}
	};
}
function matchesLookup(rawDescriptor, lookup) {
	if ("viewId" in lookup) return readString(rawDescriptor, "viewId") === lookup.viewId;
	const descriptor = lookup.descriptor;
	return readString(rawDescriptor, "serverName") === descriptor.serverName && readString(rawDescriptor, "toolName") === descriptor.toolName && readString(rawDescriptor, "uiResourceUri") === descriptor.uiResourceUri && readString(rawDescriptor, "toolCallId") === descriptor.toolCallId;
}
function readTranscriptResult(value, lookup) {
	const message = asOptionalRecord(value);
	if (!message || readString(message, "role")?.toLowerCase() !== "toolresult") return;
	const details = asOptionalRecord(message.details);
	if (!details) return;
	const rawDescriptor = asOptionalRecord(asOptionalRecord(details.mcpAppPreview)?.mcpApp);
	if (!matchesLookup(rawDescriptor, lookup)) return;
	const descriptor = readDescriptor(rawDescriptor);
	const modelToolName = readString(message, "toolName") ?? readString(message, "tool_name");
	if (!descriptor || !modelToolName) return { kind: "unavailable" };
	if (readString(message, "toolCallId") !== descriptor.toolCallId || readString(details, "mcpServer") !== descriptor.serverName || readString(details, "mcpTool") !== descriptor.toolName || descriptor.resultMetaState === "unavailable") return { kind: "unavailable" };
	return {
		kind: "restorable",
		value: {
			descriptor,
			modelToolName,
			toolResult: readCallToolResult(message, details)
		}
	};
}
/** Searches the full active transcript without retaining its messages in memory. */
async function findMcpAppReconstructionDataByVisit(visitTranscript, lookup) {
	let resultRead;
	let resultIndex = -1;
	let messageIndex = 0;
	await visitTranscript((message) => {
		const read = readTranscriptResult(message, lookup);
		if (read) {
			resultRead = read;
			resultIndex = messageIndex;
		}
		messageIndex += 1;
	});
	if (!resultRead || resultRead.kind === "unavailable") return;
	const resolvedResult = resultRead.value;
	let toolInput;
	let foundInput = false;
	messageIndex = 0;
	await visitTranscript((message) => {
		if (messageIndex >= resultIndex) {
			messageIndex += 1;
			return;
		}
		const input = readToolInputFromMessage(message, resolvedResult.descriptor.toolCallId, resolvedResult.modelToolName);
		if (input) {
			foundInput = true;
			toolInput = input.input;
		}
		messageIndex += 1;
	});
	if (!foundInput) return;
	const { modelToolName: _modelToolName, ...reconstruction } = resolvedResult;
	return {
		...reconstruction,
		toolInput
	};
}
function getRestoreInFlight() {
	const state = globalThis;
	const existing = state[MCP_APP_RESTORE_IN_FLIGHT_KEY];
	if (existing) return existing;
	const created = /* @__PURE__ */ new Map();
	state[MCP_APP_RESTORE_IN_FLIGHT_KEY] = created;
	return created;
}
async function reconstructMcpAppView(params) {
	const agentId = resolveAgentIdFromSessionKey(params.sessionKey);
	const loaded = loadSessionEntryReadOnly(params.sessionKey, { agentId });
	const sessionId = loaded.entry?.sessionId;
	if (!sessionId) return;
	const transcriptScope = {
		agentId,
		sessionId,
		sessionKey: loaded.canonicalKey,
		storePath: loaded.storePath,
		sessionEntry: loaded.entry
	};
	const data = await findMcpAppReconstructionDataByVisit(async (visit) => {
		await visitSessionMessagesAsync(transcriptScope, (message) => visit(message), {
			mode: "full",
			reason: "MCP App restart reconstruction",
			cache: "reuse"
		});
	}, params.lookup);
	if (!data) return;
	const runtime = await getOrCreateSessionMcpRuntime({
		sessionId,
		sessionKey: loaded.canonicalKey,
		workspaceDir: resolveAgentWorkspaceDir(params.cfg, agentId),
		agentDir: resolveAgentDir(params.cfg, agentId),
		cfg: params.cfg
	});
	if (runtime.mcpAppsEnabled !== true) return;
	const fetched = await fetchMcpAppView({
		runtime,
		serverName: data.descriptor.serverName,
		toolName: data.descriptor.toolName,
		uiResourceUri: data.descriptor.uiResourceUri,
		toolCallId: data.descriptor.toolCallId,
		toolInput: data.toolInput,
		toolResult: data.toolResult,
		...params.viewId ? { viewId: params.viewId } : {},
		allowedAppToolNames: params.allowedAppToolNames,
		...params.authorizeAppInteraction ? { authorizeAppInteraction: params.authorizeAppInteraction } : {},
		...params.readOnly ? { readOnly: true } : {}
	});
	const view = fetched ? getMcpAppViewLease(fetched.viewId, runtime) : void 0;
	return view ? {
		runtime,
		view
	} : void 0;
}
async function restoreMcpAppViewOnce(params) {
	if (!params.viewId.startsWith("mcp-app-") || params.viewId.length > 128) return;
	return await reconstructMcpAppView({
		...params,
		lookup: { viewId: params.viewId },
		allowedAppToolNames: /* @__PURE__ */ new Set(),
		readOnly: true
	});
}
async function mintMcpAppViewFromTranscript(params) {
	return await reconstructMcpAppView({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		lookup: { descriptor: params.descriptor },
		allowedAppToolNames: params.allowedAppToolNames,
		...params.authorizeAppInteraction ? { authorizeAppInteraction: params.authorizeAppInteraction } : {},
		readOnly: params.readOnly
	});
}
async function restoreMcpAppView(params) {
	const key = `${params.sessionKey}\0${params.viewId}`;
	return await getOrCreatePromise(getRestoreInFlight(), key, () => restoreMcpAppViewOnce(params), { evictOnSettled: true });
}
//#endregion
//#region src/gateway/mcp-app-operations.ts
var McpAppViewExpiredError = class extends Error {
	constructor() {
		super("MCP App view expired or is not authorized for this session");
		this.name = "McpAppViewExpiredError";
	}
};
function isAppCallableTool(tool) {
	return tool.uiVisibility === void 0 || tool.uiVisibility.includes("app");
}
function isAppCallableListedTool(tool) {
	const { _meta: metadata } = tool;
	const ui = metadata?.ui && typeof metadata.ui === "object" && !Array.isArray(metadata.ui) ? metadata.ui : void 0;
	const visibility = Array.isArray(ui?.visibility) ? ui.visibility.filter((entry) => entry === "app" || entry === "model") : void 0;
	return visibility === void 0 || visibility.includes("app");
}
function isAllowedByView(view, toolName) {
	return view.allowedAppToolNames === void 0 || view.allowedAppToolNames.has(toolName);
}
async function requireMcpAppInteraction(view) {
	if (view.readOnly === true || view.allowedAppToolNames === void 0) throw new Error("MCP App view is read-only");
	if (view.authorizeAppInteraction && !await view.authorizeAppInteraction()) throw new Error("MCP App widget grant is no longer active");
}
async function resolveMcpAppAllowedToolNames(active) {
	if (active.view.readOnly === true || active.view.allowedAppToolNames === void 0) return [];
	return (await active.runtime.getCatalog()).tools.filter((tool) => tool.serverName === active.view.serverName && isAppCallableTool(tool) && isAllowedByView(active.view, tool.toolName)).map((tool) => tool.toolName).filter((toolName, index, all) => all.indexOf(toolName) === index).toSorted();
}
async function requireCallableTool(runtime, view, toolName) {
	await requireMcpAppInteraction(view);
	const tool = (await runtime.getCatalog()).tools.find((entry) => entry.serverName === view.serverName && entry.toolName === toolName);
	if (!tool || !isAppCallableTool(tool) || !isAllowedByView(view, toolName)) throw new Error(`MCP tool "${toolName}" is not app-callable`);
}
async function resolveMcpAppActiveView(params) {
	if (params.cfg && params.cfg.mcp?.apps?.enabled !== true) throw new Error("MCP App runtime is unavailable");
	const liveView = getMcpAppViewLeaseForSession(params.viewId, params.sessionKey);
	if (liveView) {
		if (liveView.runtime.mcpAppsEnabled !== true) throw new Error("MCP App runtime is unavailable");
		return {
			runtime: liveView.runtime,
			view: liveView
		};
	}
	const existingRuntime = peekSessionMcpRuntime({ sessionKey: params.sessionKey });
	if (existingRuntime && existingRuntime.mcpAppsEnabled !== true) throw new Error("MCP App runtime is unavailable");
	const existingView = existingRuntime ? getMcpAppViewLease(params.viewId, existingRuntime) : void 0;
	const restored = existingRuntime?.mcpAppsEnabled === true && existingView ? {
		runtime: existingRuntime,
		view: existingView
	} : params.cfg ? await restoreMcpAppView({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		viewId: params.viewId
	}) : void 0;
	if (!restored) throw new McpAppViewExpiredError();
	return restored;
}
async function withMcpAppActiveView(active, kind, operation) {
	active.runtime.markUsed();
	const release = acquireMcpAppViewRequest(active.view, kind);
	const releaseRuntimeLease = active.runtime.acquireLease?.();
	try {
		return await operation();
	} finally {
		release();
		releaseRuntimeLease?.();
		await completeDeferredSessionMcpRuntimeRetirement(active.runtime).catch((error) => {
			logWarn(`mcp-app: deferred runtime cleanup failed: ${formatErrorMessage(error)}`);
		});
	}
}
async function executeMcpAppOperation(active, operation) {
	const { runtime, view } = active;
	switch (operation.method) {
		case "tools/call": return await withMcpAppActiveView(active, "tool", async () => {
			await requireCallableTool(runtime, view, operation.params.name);
			return await runtime.callTool(view.serverName, operation.params.name, operation.params.arguments ?? {});
		});
		case "tools/list": return await withMcpAppActiveView(active, "read", async () => {
			await requireMcpAppInteraction(view);
			if (!runtime.listTools) throw new Error("MCP tools/list is unavailable");
			const [listed, catalog] = await Promise.all([runtime.listTools(view.serverName, operation.params?.cursor ? { cursor: operation.params.cursor } : void 0), runtime.getCatalog()]);
			const allowed = new Set(catalog.tools.filter((tool) => tool.serverName === view.serverName && isAppCallableTool(tool) && isAllowedByView(view, tool.toolName)).map((tool) => tool.toolName));
			return {
				...listed,
				tools: listed.tools.filter((tool) => allowed.has(tool.name.trim()) && isAppCallableListedTool(tool))
			};
		});
		case "resources/list": return await withMcpAppActiveView(active, "read", async () => {
			if (!runtime.listResources) throw new Error("MCP resources/list is unavailable");
			const resources = await runtime.listResources(view.serverName);
			return Array.isArray(resources) ? { resources } : resources;
		});
		case "resources/templates/list": return await withMcpAppActiveView(active, "read", async () => {
			if (!runtime.listResourceTemplates) throw new Error("MCP resources/templates/list is unavailable");
			return await runtime.listResourceTemplates(view.serverName, operation.params?.cursor ? { cursor: operation.params.cursor } : void 0);
		});
		case "resources/read": return await withMcpAppActiveView(active, "read", async () => {
			if (!runtime.readResource) throw new Error("MCP resources/read is unavailable");
			return await runtime.readResource(view.serverName, operation.params.uri);
		});
		default: throw new Error(`Unsupported MCP App operation: ${String(operation)}`);
	}
}
function parseMcpAppOperation(value) {
	const method = value && typeof value === "object" && !Array.isArray(value) ? value.method : void 0;
	const schema = method === "tools/call" ? CallToolRequestSchema : method === "tools/list" ? ListToolsRequestSchema : method === "resources/list" ? ListResourcesRequestSchema : method === "resources/templates/list" ? ListResourceTemplatesRequestSchema : method === "resources/read" ? ReadResourceRequestSchema : void 0;
	if (!schema) return;
	const parsed = schema.safeParse(value);
	return parsed.success ? parsed.data : void 0;
}
//#endregion
export { resolveMcpAppActiveView as a, mintMcpAppViewFromTranscript as c, requireMcpAppInteraction as i, executeMcpAppOperation as n, resolveMcpAppAllowedToolNames as o, parseMcpAppOperation as r, withMcpAppActiveView as s, McpAppViewExpiredError as t };
