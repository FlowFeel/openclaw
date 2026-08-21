import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as pruneMapToMaxSize } from "./map-size-DAGm21RM.js";
import { g as isPlainObject } from "./utils-Bs67j6-3.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { h as normalizeToolName } from "./tool-policy-CrjVfI-s.js";
import { i as normalizeMessageChannel, t as isDeliverableMessageChannel } from "./message-channel-normalize-Bmutiks_.js";
import { randomBytes } from "node:crypto";
//#region src/gateway/message-action-turn-capability.ts
const DEFAULT_TTL_MS = 15 * 6e4;
const MAX_TTL_MS = 1440 * 6e4;
const MAX_ACTIVE_CAPABILITIES = 4096;
const RUN_LIFETIME_EXPIRES_AT_MS = Number.MAX_SAFE_INTEGER;
const CAPABILITY_COMPLETION_GRACE_MS = 6e4;
const capabilitiesByToken = /* @__PURE__ */ new Map();
function isTrustedMessageActionTurnIngress(provider) {
	const normalized = normalizeMessageChannel(provider);
	return normalized !== void 0 && isDeliverableMessageChannel(normalized);
}
function resolveTtlMs(value) {
	if (!Number.isFinite(value) || value === void 0 || value <= 0) return DEFAULT_TTL_MS;
	return Math.min(Math.trunc(value), MAX_TTL_MS);
}
/** Mirrors agent timeout semantics while leaving unlimited runs to explicit revocation. */
function resolveMessageActionTurnCapabilityLifetime(timeoutMs) {
	return Number.isFinite(timeoutMs) && timeoutMs > 0 ? { ttlMs: timeoutMs + CAPABILITY_COMPLETION_GRACE_MS } : { expiresWithRun: true };
}
function copyToolContext(context) {
	if (!context) return;
	return {
		currentChannelId: normalizeOptionalString(context.currentChannelId),
		currentChatType: context.currentChatType,
		currentMessagingTarget: normalizeOptionalString(context.currentMessagingTarget),
		currentGraphChannelId: normalizeOptionalString(context.currentGraphChannelId),
		currentChannelProvider: context.currentChannelProvider,
		currentThreadTs: normalizeOptionalString(context.currentThreadTs),
		currentMessageId: context.currentMessageId,
		currentSourceTurnId: normalizeOptionalString(context.currentSourceTurnId),
		replyToMode: context.replyToMode,
		hasRepliedRef: context.hasRepliedRef,
		sameChannelThreadRequired: context.sameChannelThreadRequired,
		skipCrossContextDecoration: context.skipCrossContextDecoration
	};
}
function sweepExpiredMessageActionTurnCapabilities(nowMs = Date.now()) {
	let removed = 0;
	for (const [token, capability] of capabilitiesByToken) if (nowMs >= capability.expiresAtMs) {
		capabilitiesByToken.delete(token);
		removed += 1;
	}
	return removed;
}
/**
* Mint an opaque current-turn capability from trusted channel ingress.
* Public Gateway agent requests never receive this token.
*/
function mintMessageActionTurnCapability(params) {
	const agentId = normalizeAgentId(params.agentId);
	const runId = params.runId.trim();
	const sessionKey = params.sessionKey.trim();
	if (!agentId || !runId || !sessionKey) throw new Error("message action turn capability requires agent, run, and session identity");
	const nowMs = params.nowMs ?? Date.now();
	sweepExpiredMessageActionTurnCapabilities(nowMs);
	pruneMapToMaxSize(capabilitiesByToken, MAX_ACTIVE_CAPABILITIES - 1);
	const token = randomBytes(32).toString("base64url");
	capabilitiesByToken.set(token, {
		agentId,
		runId,
		sessionKey,
		expiresAtMs: params.expiresWithRun ? RUN_LIFETIME_EXPIRES_AT_MS : nowMs + resolveTtlMs(params.ttlMs),
		sessionId: normalizeOptionalString(params.sessionId),
		sourceReplySessionKey: normalizeOptionalString(params.sourceReplySessionKey),
		requesterAccountId: normalizeOptionalString(params.requesterAccountId),
		requesterSenderId: normalizeOptionalString(params.requesterSenderId),
		toolContext: copyToolContext(params.toolContext)
	});
	return token;
}
function resolveMessageActionTurnCapability(params) {
	const token = params.token?.trim();
	if (!token) return;
	const capability = capabilitiesByToken.get(token);
	if (!capability) return;
	if ((params.nowMs ?? Date.now()) >= capability.expiresAtMs) {
		capabilitiesByToken.delete(token);
		return;
	}
	if (capability.agentId !== normalizeAgentId(params.agentId) || capability.runId !== params.runId?.trim() || capability.sessionKey !== params.sessionKey.trim() || capability.sessionId && capability.sessionId !== normalizeOptionalString(params.sessionId)) return;
	return {
		expiresAtMs: capability.expiresAtMs,
		sessionId: capability.sessionId,
		sourceReplySessionKey: capability.sourceReplySessionKey,
		requesterAccountId: capability.requesterAccountId,
		requesterSenderId: capability.requesterSenderId,
		toolContext: copyToolContext(capability.toolContext)
	};
}
function revokeMessageActionTurnCapability(token) {
	return token ? capabilitiesByToken.delete(token) : false;
}
//#endregion
//#region src/agents/code-mode-control-tools.ts
/**
* Tags Code Mode exec/wait control tools and normalizes hook params for the
* exec-compatible before-tool-call surface.
*/
/** Model-visible Code Mode exec tool name. */
const CODE_MODE_EXEC_TOOL_NAME = "exec";
/** Model-visible Code Mode wait tool name. */
const CODE_MODE_WAIT_TOOL_NAME = "wait";
/** Hook metadata kind for Code Mode exec tools. */
const CODE_MODE_EXEC_TOOL_KIND = "code_mode_exec";
const codeModeControlTools = /* @__PURE__ */ new WeakSet();
/** Mark a tool as owned by code mode control flow. */
function markCodeModeControlTool(tool) {
	codeModeControlTools.add(tool);
	return tool;
}
/** Replicate code-mode identity from an original tool object to a wrapper. */
function copyCodeModeControlToolIdentity(original, wrapper) {
	if (codeModeControlTools.has(original)) codeModeControlTools.add(wrapper);
}
/** Return whether a tool was marked as code-mode owned. */
function isCodeModeControlTool(tool) {
	return codeModeControlTools.has(tool);
}
function isCodeModeExecTool(tool) {
	return isCodeModeControlTool(tool) && normalizeToolName(tool.name) === "exec";
}
function resolveCodeModeExecToolInputKind(params) {
	if (!isPlainObject(params)) return;
	const language = params.language;
	if (language === void 0 || language === "javascript") return "javascript";
	if (language === "typescript") return "typescript";
}
function normalizeCodeModeExecParams(params) {
	if (!isPlainObject(params)) return params;
	const code = params.code;
	const command = params.command;
	if (typeof code === "string" && typeof command !== "string") return {
		...params,
		command: params.code
	};
	if (typeof command === "string" && typeof code !== "string") return {
		...params,
		code: params.command
	};
	return params;
}
/** Build before-tool-call metadata for a marked code-mode exec tool. */
function getCodeModeExecBeforeHookMetadata(params) {
	if (!isCodeModeExecTool(params.tool)) return;
	const toolInputKind = resolveCodeModeExecToolInputKind(params.params);
	return {
		toolKind: CODE_MODE_EXEC_TOOL_KIND,
		...toolInputKind && { toolInputKind }
	};
}
/** Build before-tool-call metadata when only the tool kind is available. */
function getCodeModeExecBeforeHookMetadataForToolKind(params) {
	if (params.toolKind !== CODE_MODE_EXEC_TOOL_KIND) return;
	const toolInputKind = resolveCodeModeExecToolInputKind(params.params);
	return {
		toolKind: CODE_MODE_EXEC_TOOL_KIND,
		...toolInputKind && { toolInputKind }
	};
}
/** Normalize before-hook params for a marked code-mode exec tool. */
function normalizeCodeModeExecBeforeHookParams(params) {
	if (!isCodeModeExecTool(params.tool)) return params.params;
	return normalizeCodeModeExecParams(params.params);
}
/** Normalize before-hook params when only the code-mode tool kind is available. */
function normalizeCodeModeExecBeforeHookParamsForToolKind(params) {
	if (params.toolKind !== CODE_MODE_EXEC_TOOL_KIND) return params.params;
	return normalizeCodeModeExecParams(params.params);
}
/** Reconcile hook-adjusted `code` and `command` fields after code-mode normalization. */
function reconcileCodeModeExecBeforeHookParams(params) {
	if (!isCodeModeExecTool(params.tool) || !isPlainObject(params.originalParams) || !isPlainObject(params.hookParams) || !isPlainObject(params.adjustedParams)) return params.adjustedParams;
	const hookCode = params.hookParams.code;
	const hookCommand = params.hookParams.command;
	if (typeof hookCode !== "string" || hookCode !== hookCommand) return params.adjustedParams;
	const adjustedCode = params.adjustedParams.code;
	const adjustedCommand = params.adjustedParams.command;
	const adjustedCodeChanged = typeof adjustedCode === "string" && adjustedCode !== hookCode;
	const adjustedCommandChanged = typeof adjustedCommand === "string" && adjustedCommand !== hookCode;
	if (adjustedCodeChanged === adjustedCommandChanged) return params.adjustedParams;
	if (adjustedCodeChanged) return {
		...params.adjustedParams,
		command: adjustedCode
	};
	if (adjustedCommandChanged) return {
		...params.adjustedParams,
		code: adjustedCommand
	};
	return params.adjustedParams;
}
//#endregion
export { getCodeModeExecBeforeHookMetadataForToolKind as a, normalizeCodeModeExecBeforeHookParams as c, isTrustedMessageActionTurnIngress as d, mintMessageActionTurnCapability as f, revokeMessageActionTurnCapability as h, getCodeModeExecBeforeHookMetadata as i, normalizeCodeModeExecBeforeHookParamsForToolKind as l, resolveMessageActionTurnCapabilityLifetime as m, CODE_MODE_WAIT_TOOL_NAME as n, isCodeModeControlTool as o, resolveMessageActionTurnCapability as p, copyCodeModeControlToolIdentity as r, markCodeModeControlTool as s, CODE_MODE_EXEC_TOOL_NAME as t, reconcileCodeModeExecBeforeHookParams as u };
