import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { r as normalizeOptionalAccountId } from "./account-id-CIVg1QNG.js";
import { t as safeEqualSecret } from "./secret-equal-DRsL8lKD.js";
import { t as normalizeChatType } from "./chat-type-BARlA53h.js";
import { G as ensureExecApprovalsSnapshot, q as loadExecApprovalsAsync } from "./exec-approvals-sCmCk_jQ.js";
import { createHmac } from "node:crypto";
//#region src/gateway/agent-runtime-identity-token.ts
const AGENT_RUNTIME_IDENTITY_TOKEN_CONTEXT = "openclaw:gateway-agent-runtime-identity-token:v1";
const AGENT_RUNTIME_IDENTITY_TOKEN_KIND = "agent-runtime";
const MESSAGE_ACTION_TOKEN_TTL_MS = 6e4;
const CRON_SELF_MANAGEMENT_TOKEN_TTL_MS = 6e4;
function decodeStringList(value) {
	if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) return;
	return value.map((entry) => entry.trim()).filter(Boolean);
}
function decodeSessionSpawnContext(value) {
	if (!isRecord(value) || !isRecord(value.inheritedToolPolicy)) return;
	const policy = value.inheritedToolPolicy;
	const allow = decodeStringList(policy.allow);
	const deny = decodeStringList(policy.deny);
	if (policy.version !== 1 || !allow || !deny) return;
	const completionOwnerSessionKey = normalizeOptionalString(value.completionOwnerSessionKey);
	if (value.completionOwnerSessionKey !== void 0 && !completionOwnerSessionKey) return;
	return {
		...completionOwnerSessionKey ? { completionOwnerSessionKey } : {},
		inheritedToolPolicy: {
			version: 1,
			allow,
			deny
		}
	};
}
async function readSharedAgentRuntimeIdentitySecret() {
	return (await loadExecApprovalsAsync()).socket?.token?.trim() || null;
}
async function requireSharedAgentRuntimeIdentitySecret() {
	const token = (await ensureExecApprovalsSnapshot()).file.socket?.token?.trim();
	if (!token) throw new Error("Unable to mint agent runtime identity token without local socket credentials.");
	return token;
}
function signPayload(secret, payload) {
	return createHmac("sha256", secret).update(AGENT_RUNTIME_IDENTITY_TOKEN_CONTEXT).update("\0").update(payload).digest("base64url");
}
function encodePayload(payload) {
	return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}
function decodeMessageActionContext(value, nowMs) {
	if (!isRecord(value) || typeof value.expiresAtMs !== "number" || !Number.isFinite(value.expiresAtMs) || nowMs >= value.expiresAtMs) return;
	const rawToolContext = value.toolContext;
	const sourceReplyFinal = value.sourceReplyFinal;
	const sourceReplyToolCallId = normalizeOptionalString(value.sourceReplyToolCallId);
	if (sourceReplyFinal !== void 0 && typeof sourceReplyFinal !== "boolean") return;
	if (value.sourceReplyToolCallId !== void 0 && !sourceReplyToolCallId) return;
	if (rawToolContext !== void 0 && !isRecord(rawToolContext)) return;
	const rawCurrentChatType = rawToolContext?.currentChatType;
	const currentChatType = normalizeChatType(typeof rawCurrentChatType === "string" ? rawCurrentChatType : void 0);
	const currentMessageId = rawToolContext?.currentMessageId;
	const replyToMode = rawToolContext?.replyToMode;
	const hasRepliedRef = rawToolContext?.hasRepliedRef;
	if (currentMessageId !== void 0 && typeof currentMessageId !== "string" && typeof currentMessageId !== "number" || replyToMode !== void 0 && replyToMode !== "off" && replyToMode !== "first" && replyToMode !== "all" && replyToMode !== "batched" || hasRepliedRef !== void 0 && (!isRecord(hasRepliedRef) || typeof hasRepliedRef.value !== "boolean")) return;
	const readOptionalBoolean = (key) => {
		const candidate = rawToolContext?.[key];
		return typeof candidate === "boolean" ? candidate : void 0;
	};
	const toolContext = rawToolContext ? {
		currentChannelId: normalizeOptionalString(rawToolContext.currentChannelId),
		currentChatType,
		currentMessagingTarget: normalizeOptionalString(rawToolContext.currentMessagingTarget),
		currentGraphChannelId: normalizeOptionalString(rawToolContext.currentGraphChannelId),
		currentChannelProvider: normalizeOptionalString(rawToolContext.currentChannelProvider),
		currentThreadTs: normalizeOptionalString(rawToolContext.currentThreadTs),
		currentMessageId,
		currentSourceTurnId: normalizeOptionalString(rawToolContext.currentSourceTurnId),
		replyToMode: replyToMode === "off" || replyToMode === "first" || replyToMode === "all" || replyToMode === "batched" ? replyToMode : void 0,
		hasRepliedRef: isRecord(hasRepliedRef) && typeof hasRepliedRef.value === "boolean" ? { value: hasRepliedRef.value } : void 0,
		sameChannelThreadRequired: readOptionalBoolean("sameChannelThreadRequired"),
		skipCrossContextDecoration: readOptionalBoolean("skipCrossContextDecoration")
	} : void 0;
	const context = {
		expiresAtMs: value.expiresAtMs,
		sessionId: normalizeOptionalString(value.sessionId),
		sourceReplySessionKey: normalizeOptionalString(value.sourceReplySessionKey),
		requesterAccountId: normalizeOptionalString(value.requesterAccountId),
		requesterSenderId: normalizeOptionalString(value.requesterSenderId),
		toolContext
	};
	if (sourceReplyFinal === true) {
		if (!sourceReplyToolCallId) return;
		return {
			...context,
			sourceReplyFinal: true,
			sourceReplyToolCallId
		};
	}
	return {
		...context,
		...sourceReplyFinal === false ? { sourceReplyFinal: false } : {},
		...sourceReplyToolCallId ? { sourceReplyToolCallId } : {}
	};
}
function decodePayload(value, nowMs) {
	try {
		const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
		if (!parsed || typeof parsed !== "object") return;
		const raw = parsed;
		if (raw.kind !== AGENT_RUNTIME_IDENTITY_TOKEN_KIND || typeof raw.agentId !== "string" || typeof raw.sessionKey !== "string") return;
		const agentId = normalizeAgentId(raw.agentId);
		const sessionKey = raw.sessionKey.trim();
		const turnSourceAccountId = normalizeOptionalAccountId(typeof raw.turnSourceAccountId === "string" ? raw.turnSourceAccountId : void 0);
		if (!agentId || !sessionKey) return;
		const messageActionContext = raw.messageActionContext === void 0 ? void 0 : decodeMessageActionContext(raw.messageActionContext, nowMs);
		if (raw.messageActionContext !== void 0 && !messageActionContext) return;
		const rawCronSelfManagement = raw.cronSelfManagementContext;
		const cronSelfManagementJobId = isRecord(rawCronSelfManagement) && typeof rawCronSelfManagement.jobId === "string" ? rawCronSelfManagement.jobId.trim() : "";
		const cronSelfManagementExpiresAtMs = isRecord(rawCronSelfManagement) ? rawCronSelfManagement.expiresAtMs : void 0;
		const cronSelfManagementContext = cronSelfManagementJobId && typeof cronSelfManagementExpiresAtMs === "number" && Number.isFinite(cronSelfManagementExpiresAtMs) && nowMs < cronSelfManagementExpiresAtMs ? {
			jobId: cronSelfManagementJobId,
			expiresAtMs: cronSelfManagementExpiresAtMs
		} : void 0;
		if (rawCronSelfManagement !== void 0 && !cronSelfManagementContext) return;
		const sessionSpawnContext = raw.sessionSpawnContext === void 0 ? void 0 : decodeSessionSpawnContext(raw.sessionSpawnContext);
		if (raw.sessionSpawnContext !== void 0 && !sessionSpawnContext) return;
		return {
			kind: AGENT_RUNTIME_IDENTITY_TOKEN_KIND,
			agentId,
			sessionKey,
			...turnSourceAccountId ? { turnSourceAccountId } : {},
			...messageActionContext ? { messageActionContext } : {},
			...cronSelfManagementContext ? { cronSelfManagementContext } : {},
			...sessionSpawnContext ? { sessionSpawnContext } : {}
		};
	} catch {
		return;
	}
}
/** Mint an opaque token that lets trusted local agent-tool clients identify their agent. */
async function mintAgentRuntimeIdentityToken(params) {
	if (params.messageActionContext?.sourceReplyFinal === true && !normalizeOptionalString(params.messageActionContext.sourceReplyToolCallId)) throw new Error("terminal source reply requires tool-call correlation");
	const messageActionContext = params.messageActionContext ? {
		...params.messageActionContext,
		expiresAtMs: Math.min(params.messageActionContext.expiresAtMs, Date.now() + MESSAGE_ACTION_TOKEN_TTL_MS)
	} : void 0;
	const turnSourceAccountId = normalizeOptionalAccountId(params.turnSourceAccountId);
	const cronSelfManagementJobId = normalizeOptionalString(params.cronSelfManagementJobId);
	const cronSelfManagementContext = cronSelfManagementJobId ? {
		jobId: cronSelfManagementJobId,
		expiresAtMs: Date.now() + CRON_SELF_MANAGEMENT_TOKEN_TTL_MS
	} : void 0;
	const payload = encodePayload({
		kind: AGENT_RUNTIME_IDENTITY_TOKEN_KIND,
		agentId: normalizeAgentId(params.agentId),
		sessionKey: params.sessionKey.trim(),
		...turnSourceAccountId ? { turnSourceAccountId } : {},
		...messageActionContext ? { messageActionContext } : {},
		...cronSelfManagementContext ? { cronSelfManagementContext } : {},
		...params.sessionSpawnContext ? { sessionSpawnContext: params.sessionSpawnContext } : {}
	});
	return `${payload}.${signPayload(await requireSharedAgentRuntimeIdentitySecret(), payload)}`;
}
/** Validate a presented agent runtime token and return the internal caller identity. */
async function verifyAgentRuntimeIdentityToken(value, nowMs) {
	const token = value?.trim();
	if (!token) return;
	const [payloadPart, signature, ...extra] = token.split(".");
	if (!payloadPart || !signature || extra.length > 0) return;
	const sharedSecret = await readSharedAgentRuntimeIdentitySecret();
	if (!sharedSecret || !safeEqualSecret(signature, signPayload(sharedSecret, payloadPart))) return;
	const payload = decodePayload(payloadPart, nowMs ?? Date.now());
	if (!payload) return;
	return {
		kind: "agentRuntime",
		agentId: payload.agentId,
		sessionKey: payload.sessionKey,
		...payload.turnSourceAccountId ? { turnSourceAccountId: payload.turnSourceAccountId } : {},
		...payload.messageActionContext ? { messageActionContext: payload.messageActionContext } : {},
		...payload.cronSelfManagementContext ? { cronSelfManagementContext: payload.cronSelfManagementContext } : {},
		...payload.sessionSpawnContext ? { sessionSpawnContext: payload.sessionSpawnContext } : {}
	};
}
//#endregion
export { verifyAgentRuntimeIdentityToken as n, mintAgentRuntimeIdentityToken as t };
