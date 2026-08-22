import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { n as SILENT_REPLY_TOKEN, o as isSilentReplyText } from "./tokens-CMI0yx54.js";
import { p as markReplyPayloadForSourceSuppressionDelivery } from "./reply-payload-BtIUrr9c.js";
import { m as sessionMatchesExpectedTranscriptTurn, st as loadSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import { a as hasRestartRecoverySourceClaim, n as buildRestartRecoveryClaimCleanupPatch, o as hasRestartRecoveryTerminalRun } from "./session-entry-slot-keys-DR5d2mKt.js";
import { K as updateSessionEntry } from "./session-accessor-t3qUoTeV.js";
import { i as isMissingProviderAuthError } from "./model-auth-runtime-shared-BVzqP6NP.js";
import { i as classifyOAuthRefreshFailureError, n as buildOAuthRefreshFailureLoginCommand, o as formatOAuthRefreshFailureLoginCommandMarkdown, r as classifyOAuthRefreshFailure } from "./oauth-refresh-failure-BUReLFib.js";
import "./model-auth-D32HIbZ7.js";
import { _ as isOverloadedErrorMessage, b as isRateLimitErrorMessage, d as sanitizeUserFacingText, g as isBillingErrorMessage, i as formatRateLimitOrOverloadedErrorCopy, n as formatBillingErrorMessage, t as BILLING_ERROR_USER_MESSAGE, v as isPeriodicUsageLimitErrorMessage } from "./sanitize-user-facing-text-Ba4C3tZ5.js";
import { o as classifyProviderRuntimeFailureKind, t as AUTH_INVALID_TOKEN_USER_TEXT } from "./errors-B811vGBl.js";
import { c as isFailoverError, o as findCliMaxTurnsError, s as findCliTimeoutError } from "./failover-error-CMC-wGmM.js";
import "./embedded-agent-helpers-zm6jLxdk.js";
import { i as isFallbackSummaryError } from "./model-fallback-attempt-DCerkT6E.js";
import { n as HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT, t as GENERIC_EXTERNAL_RUN_FAILURE_TEXT } from "./agent-runner-failure-copy-BY7A6uy5.js";
import { t as formatAuthProfileFailureMessage } from "./failure-copy-BxXcpEBa.js";
import { u as resolveSilentReplyPolicy } from "./session-entry-handle-CKnQnjqd.js";
import { randomUUID } from "node:crypto";
//#region src/auto-reply/reply/provider-request-error-classifier.ts
/** User-facing copy for provider-side broken conversation state. */
const PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE = "⚠️ The model provider rejected the conversation state. Please try again, or use /new to start a fresh session.";
const PROVIDER_RATE_LIMIT_OR_QUOTA_ERROR_USER_MESSAGE = "⚠️ The model provider returned HTTP 429 before replying. This can mean rate limiting, exhausted quota, or an account balance/billing issue. Check the selected provider/model, API key, and provider billing/quota dashboard, then try again.";
const PROVIDER_INTERNAL_ERROR_USER_MESSAGE = "⚠️ The model provider returned a temporary internal error before replying. Try again in a moment, or switch to another model if it keeps happening.";
const PROVIDER_AUTHENTICATION_ERROR_USER_MESSAGE = `⚠️ ${AUTH_INVALID_TOKEN_USER_TEXT}`;
/**
* User-facing copy for a configured model the provider no longer serves.
* Distinct from generic failures because retrying or starting a new session
* cannot help: the model id itself must be changed in config.
*/
const PROVIDER_MODEL_UNAVAILABLE_USER_MESSAGE = "⚠️ The configured model is unavailable from the provider — it may have been renamed, retired, or is not offered on this account. This needs a config update (agents.defaults.model); retrying or starting a new session won't fix it.";
/** Classifies provider request failures that are actionable for users. */
function classifyProviderRequestError(err) {
	const technicalMessage = formatErrorMessage(err);
	if (isFailoverError(err) && err.reason === "auth" && err.status === 401 || classifyProviderRuntimeFailureKind(technicalMessage) === "auth_invalid_token") return {
		code: "provider_authentication_error",
		userMessage: PROVIDER_AUTHENTICATION_ERROR_USER_MESSAGE,
		technicalMessage
	};
	if (isFailoverError(err) && err.reason === "model_not_found") return {
		code: "provider_model_unavailable",
		userMessage: PROVIDER_MODEL_UNAVAILABLE_USER_MESSAGE,
		technicalMessage
	};
	if (hasHttp429Evidence(err, technicalMessage) && isGenericProviderRuntimeErrorMessage(technicalMessage)) return {
		code: "provider_rate_limit_or_quota_error",
		userMessage: PROVIDER_RATE_LIMIT_OR_QUOTA_ERROR_USER_MESSAGE,
		technicalMessage
	};
	if (isProviderConversationStateErrorMessage(technicalMessage)) return {
		code: "provider_conversation_state_error",
		userMessage: PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE,
		technicalMessage
	};
	if (hasHttp503Evidence(err, technicalMessage)) return {
		code: "provider_internal_error",
		userMessage: PROVIDER_INTERNAL_ERROR_USER_MESSAGE,
		technicalMessage,
		allowTransientHttpRetry: true
	};
	if (isProviderInternalErrorMessage(technicalMessage)) return {
		code: "provider_internal_error",
		userMessage: PROVIDER_INTERNAL_ERROR_USER_MESSAGE,
		technicalMessage
	};
}
/** Detects provider errors that indicate invalid conversation/tool turn state. */
function isProviderConversationStateErrorMessage(message) {
	const lower = normalizeLowercaseStringOrEmpty(message);
	return lower.includes("custom tool call output is missing") && lower.includes("call id") || lower.includes("toolresult") && lower.includes("tooluse") && lower.includes("exceeds the number") && lower.includes("previous turn") || lower.includes("tool_use") && lower.includes("tool_result") && lower.includes("without") || lower.includes("function call turn comes immediately after") || lower.includes("incorrect role information") || lower.includes("roles must alternate") || lower.includes("invalid_replay_transcript");
}
function isGenericProviderRuntimeErrorMessage(message) {
	const lower = normalizeLowercaseStringOrEmpty(message);
	return lower.includes("an error occurred while processing your request") || lower.includes("something went wrong while processing your request");
}
function isProviderInternalErrorMessage(message) {
	const lower = normalizeLowercaseStringOrEmpty(message);
	return lower.includes("the ai service returned an internal error") || lower.includes("provider returned an internal error") || isGenericProviderRuntimeErrorMessage(message) && (lower.includes("server_error") || lower.includes("internal error"));
}
function hasHttp429Evidence(err, message) {
	return readHttpStatus(err, 429) || /\b(?:http\s*)?429\b|["'](?:status|code)["']\s*:\s*429\b/iu.test(message);
}
function hasHttp503Evidence(err, message) {
	const rawError = isFailoverError(err) ? err.rawError : void 0;
	return readHttpStatus(err, 503) || hasHttp503TextEvidence(message) || (rawError ? hasHttp503TextEvidence(rawError) : false);
}
function hasHttp503TextEvidence(message) {
	return /\b(?:(?:unexpected\s+status|http)\s*503|503\s+service unavailable)\b|["'](?:status|code)["']\s*:\s*503\b/iu.test(message);
}
function readHttpStatus(err, expectedStatus, seen = /* @__PURE__ */ new Set()) {
	if (!err || typeof err !== "object" || seen.has(err)) return false;
	seen.add(err);
	const candidate = err.status ?? err.statusCode;
	if (typeof candidate === "number" && Number.isFinite(candidate)) {
		if (candidate === expectedStatus) return true;
	} else if (typeof candidate === "string" && Number(candidate.trim()) === expectedStatus) return true;
	const nested = err;
	return readHttpStatus(nested.response, expectedStatus, seen) || readHttpStatus(nested.error, expectedStatus, seen) || readHttpStatus(nested.cause, expectedStatus, seen);
}
//#endregion
//#region src/auto-reply/reply/agent-runner-failure-reply.ts
const RATE_LIMIT_RETRY_MESSAGE = "⚠️ The model request was rate-limited. Please try again in a few minutes.";
/** Builds a human-friendly rate-limit message, including a known cooldown. */
function buildRateLimitCooldownMessage(err) {
	const codexUsageLimitMessage = extractCodexUsageLimitErrorMessage(err);
	if (codexUsageLimitMessage) return codexUsageLimitMessage;
	if (isFallbackSummaryError(err) && hasBillingAttemptSummary(err)) return BILLING_ERROR_USER_MESSAGE;
	const message = formatErrorMessage(err);
	if (isBillingErrorMessage(message)) return BILLING_ERROR_USER_MESSAGE;
	if (!isFallbackSummaryError(err)) {
		if (isPeriodicUsageLimitErrorMessage(message)) {
			const providerMessage = sanitizeUserFacingText(message, { errorContext: true });
			return providerMessage.startsWith("⚠️") ? providerMessage : `⚠️ ${providerMessage}`;
		}
		return RATE_LIMIT_RETRY_MESSAGE;
	}
	const expiry = err.soonestCooldownExpiry;
	const now = Date.now();
	if (typeof expiry === "number" && expiry > now) {
		const secsLeft = Math.max(1, Math.ceil((expiry - now) / 1e3));
		if (secsLeft <= 60) return `⚠️ Rate-limited — ready in ~${secsLeft}s. Please wait a moment.`;
		return `⚠️ Rate-limited — ready in ~${Math.ceil(secsLeft / 60)} min. Please try again shortly.`;
	}
	if (new Set(err.attempts.map((attempt) => `${attempt.provider}/${attempt.model}`)).size > 1 && isPureTransientRateLimitSummary(err)) return "⚠️ All attempted models were rate-limited or overloaded. Please try again in a few minutes.";
	return RATE_LIMIT_RETRY_MESSAGE;
}
function resolveBillingFailureReplyText(err) {
	const billingFailure = isFallbackSummaryError(err) ? err.attempts.find((attempt) => attempt.reason === "billing" && (attempt.authMode === "oauth" || attempt.authMode === "token")) : isFailoverError(err) && err.reason === "billing" ? err : void 0;
	if (!billingFailure || billingFailure.authMode !== "oauth" && billingFailure.authMode !== "token") return BILLING_ERROR_USER_MESSAGE;
	return formatBillingErrorMessage(billingFailure.provider, billingFailure.model, billingFailure.authMode);
}
function extractCodexUsageLimitErrorMessage(err) {
	if (isFallbackSummaryError(err)) {
		for (const attempt of err.attempts) {
			const message = extractCodexUsageLimitMessage(attempt.error);
			if (message) return `⚠️ ${message}`;
		}
		return;
	}
	const message = extractCodexUsageLimitMessage(formatErrorMessage(err));
	return message ? `⚠️ ${message}` : void 0;
}
function extractCodexUsageLimitMessage(text) {
	const markers = ["You've reached your Codex subscription usage limit.", "Codex usage limit reached."];
	let markerIndex;
	for (const marker of markers) {
		const index = text.indexOf(marker);
		if (index >= 0 && (markerIndex === void 0 || index < markerIndex)) markerIndex = index;
	}
	if (markerIndex === void 0) return;
	const message = sanitizeUserFacingText(text.slice(markerIndex), { errorContext: true }).split(/\r?\n/u).map((line) => line.trim()).filter(Boolean).join(" ").trim();
	if (!message) return;
	return message.length > 500 ? `${truncateUtf16Safe(message, 497)}...` : message;
}
function isPureTransientRateLimitSummary(err) {
	return isFallbackSummaryError(err) && err.attempts.length > 0 && err.attempts.every((attempt) => {
		const reason = attempt.reason;
		return reason === "rate_limit" || reason === "overloaded";
	});
}
function hasBillingAttemptSummary(err) {
	return isFallbackSummaryError(err) && err.attempts.length > 0 && err.attempts.some((attempt) => attempt.reason === "billing");
}
function collapseRepeatedFailureDetail(message) {
	const parts = message.split(/\s+\|\s+/u).map((part) => part.trim()).filter(Boolean);
	if (parts.length >= 2 && parts.every((part) => part === parts[0])) return expectDefined(parts[0], "parts entry at 0");
	return message.trim();
}
const SAFE_MISSING_API_KEY_PROVIDERS = /* @__PURE__ */ new Set([
	"anthropic",
	"google",
	"openai"
]);
const EXTERNAL_RUN_FAILURE_DETAIL_MAX_CHARS = 900;
const AGENT_FAILED_BEFORE_REPLY_TEXT = "Agent failed before reply:";
const PREFLIGHT_COMPACTION_FAILURE_PREFIX = "Preflight compaction required but failed:";
function isNonDirectConversationContext(ctx) {
	const chatType = normalizeLowercaseStringOrEmpty(ctx.ChatType);
	return chatType === "group" || chatType === "channel";
}
function isVerboseFailureDetailEnabled(level) {
	return level === "on" || level === "full";
}
function resolveExternalRunFailureTextForConversation(params) {
	if (!isNonDirectConversationContext(params.sessionCtx)) return params.text;
	if (!params.isGenericRunnerFailure && !params.text.includes(AGENT_FAILED_BEFORE_REPLY_TEXT)) return params.text;
	return resolveSilentReplyPolicy({
		cfg: params.cfg,
		sessionKey: params.sessionCtx.SessionKey,
		surface: params.sessionCtx.Surface ?? params.sessionCtx.Provider,
		conversationType: "group"
	}) === "disallow" ? params.text : SILENT_REPLY_TOKEN;
}
const CLI_BACKEND_NO_OUTPUT_STALL_RE = /\bCLI produced no output for\s+(\d+)\s*s\s+and was terminated\b/iu;
const CLI_BACKEND_OVERALL_TIMEOUT_RE = /\bCLI exceeded timeout\s*\(\s*(\d+)\s*s\s*\)\s+and was terminated\b/iu;
const CLI_BACKEND_ROUTING_REF_BEFORE_ERROR_RE = /\b([\w.-]+\/[A-Za-z][\w.-]*)\s*:\s*CLI\b/iu;
const CODEX_APP_SERVER_CLIENT_CLOSED_BEFORE_REPLY_RE = /\bcodex app-server client closed before turn completed\b/iu;
const CODEX_APP_SERVER_TURN_COMPLETION_IDLE_TIMEOUT_RE = /\bcodex app-server turn idle timed out waiting for turn\/completed\b/iu;
const CODEX_SESSION_GENERATION_NOT_CURRENT_RE = /\bcodex session generation is no longer current\b/iu;
function buildCodexAppServerFailureText(message) {
	const normalizedMessage = collapseRepeatedFailureDetail(message);
	if (CODEX_SESSION_GENERATION_NOT_CURRENT_RE.test(normalizedMessage)) return "⚠️ This Codex session changed before your message could run. Please send it again.";
	if (CODEX_APP_SERVER_CLIENT_CLOSED_BEFORE_REPLY_RE.test(normalizedMessage)) return "⚠️ Codex app-server connection closed before this turn finished. OpenClaw retried once when the stdio turn was still replay-safe; please try again if this keeps happening.";
	if (CODEX_APP_SERVER_TURN_COMPLETION_IDLE_TIMEOUT_RE.test(normalizedMessage)) return "⚠️ Codex app-server stopped before confirming turn completion. OpenClaw did not replay the turn automatically because it may still be active; try again, or use /new if the session stays stuck.";
	return null;
}
/** Formats the reply shown when preflight compaction fails before a run. */
function buildPreflightCompactionFailureText(message, options) {
	const normalizedMessage = collapseRepeatedFailureDetail(message);
	if (!normalizedMessage.startsWith(PREFLIGHT_COMPACTION_FAILURE_PREFIX)) return null;
	const reason = sanitizeUserFacingText(normalizedMessage.slice(41), { errorContext: true }).trim().replace(/\s+/gu, " ");
	return `⚠️ Context is too large and auto-compaction could not recover this turn.${options?.includeDetails && reason ? ` Reason: ${reason}.` : ""} Try again, use /compact, or use /new to start a fresh session.`;
}
function buildCliBackendTimeoutFailureText(input) {
	const normalizedMessage = collapseRepeatedFailureDetail(input.message);
	const cliTimeoutError = findCliTimeoutError(input.error);
	const stall = normalizedMessage.match(CLI_BACKEND_NO_OUTPUT_STALL_RE);
	const overall = normalizedMessage.match(CLI_BACKEND_OVERALL_TIMEOUT_RE);
	const timeout = cliTimeoutError?.cliTimeout;
	const seconds = timeout?.timeoutSeconds ?? Number((stall ?? overall)?.[1]);
	if (!Number.isFinite(seconds)) return null;
	const routedModelRef = normalizedMessage.match(CLI_BACKEND_ROUTING_REF_BEFORE_ERROR_RE)?.[1];
	const routingSuffix = routedModelRef ? ` (routing ${routedModelRef})` : "";
	const mode = timeout?.mode ?? (stall ? "no-output" : "overall");
	let workStatus = "";
	const stoppedWork = [];
	if (timeout?.backgroundTaskCount) {
		const noun = timeout.backgroundTaskCount === 1 ? "task" : "tasks";
		stoppedWork.push(`${timeout.backgroundTaskCount} CLI background ${noun}`);
	}
	if (timeout?.activeToolCount) {
		const noun = timeout.activeToolCount === 1 ? "call" : "calls";
		stoppedWork.push(`${timeout.activeToolCount} active CLI tool ${noun}`);
	}
	if (stoppedWork.length > 0) workStatus = ` It also stopped ${stoppedWork.join(" and ")}; that work shares the parent CLI process. Effects may be partial; check before retrying.`;
	else if (timeout?.observedActivity) workStatus = " The CLI had already begun work, so effects may be partial; check before retrying.";
	if (input.replayPrevented) workStatus += " OpenClaw did not replay this turn automatically.";
	if (mode === "no-output") {
		const backendId = cliTimeoutError?.provider ?? "<id>";
		return `⚠️ CLI subprocess${routingSuffix}: no output for ${seconds}s, so the no-output watchdog stopped it. This is separate from the overall agent timeout; the gateway is unaffected.${workStatus} Check for an interactive prompt. The CLI backend ${backendId} produced no output before its watchdog expired.`;
	}
	return `⚠️ CLI turn${routingSuffix}: timed out after ${seconds}s (overall turn limit). The gateway is unaffected.${workStatus} For long work, use a detached OpenClaw sub-agent (no run timeout by default), or raise \`agents.defaults.timeoutSeconds\`.`;
}
function buildMissingApiKeyFailureText(input) {
	const normalizedMessage = collapseRepeatedFailureDetail(input.message);
	const provider = isMissingProviderAuthError(input.error) ? input.error.provider.trim().toLowerCase() : normalizedMessage.match(/No API key found for provider "([^"]+)"/u)?.[1]?.trim().toLowerCase();
	if (!provider) return null;
	if (provider === "openai" && normalizedMessage.includes("OpenAI Codex OAuth")) return "⚠️ Missing API key for OpenAI on the gateway. Use `openai/gpt-5.6-sol` with the OpenAI OAuth profile, or set `OPENAI_API_KEY` for direct OpenAI API-key runs.";
	if (provider === "openai") return "⚠️ Missing API key for provider \"openai\". Run `openclaw doctor --fix` to repair stale OpenAI model/session routes, restart the gateway if doctor asks, then try again. If doctor has nothing to repair or the error persists, re-auth with `openclaw models auth login --provider openai` or run `openclaw configure`.";
	if (SAFE_MISSING_API_KEY_PROVIDERS.has(provider)) return `⚠️ Missing API key for provider "${provider}". Configure the gateway auth for that provider, then try again.`;
	return "⚠️ Missing API key for the selected provider on the gateway. Configure provider auth, then try again.";
}
function buildAuthProfileFailoverFailureText(error) {
	if (!isFailoverError(error) || !error.provider || !error.authProfileFailure) return null;
	return formatAuthProfileFailureMessage({
		reason: error.reason,
		provider: error.provider,
		allInCooldown: error.authProfileFailure.allInCooldown,
		cause: error.cause
	});
}
function formatForwardedExternalRunFailureText(message) {
	const sanitized = sanitizeUserFacingText(message, { errorContext: true }).trim().replace(/^⚠️\s*/u, "").replace(/\s+/gu, " ");
	if (!sanitized) return GENERIC_EXTERNAL_RUN_FAILURE_TEXT;
	const detail = sanitized.length > EXTERNAL_RUN_FAILURE_DETAIL_MAX_CHARS ? `${truncateUtf16Safe(sanitized, EXTERNAL_RUN_FAILURE_DETAIL_MAX_CHARS - 1).trimEnd()}…` : sanitized;
	return `⚠️ Agent failed before reply: ${detail}${/[.!?]$/u.test(detail) ? "" : "."} Please try again, or use /new to start a fresh session.`;
}
function supportsChannelCodexLogin(provider) {
	if (!provider) return false;
	const normalizedProvider = provider.trim().toLowerCase().replace(/_/gu, "-");
	return normalizedProvider === "openai" || normalizedProvider === "codex";
}
function buildExternalRunFailureReply(input, options) {
	const message = typeof input === "string" ? input : input.message;
	const error = typeof input === "string" ? void 0 : input.error;
	const normalizedMessage = collapseRepeatedFailureDetail(message);
	const oauthRefreshFailure = classifyOAuthRefreshFailureError(error) ?? classifyOAuthRefreshFailure(normalizedMessage);
	if (oauthRefreshFailure) {
		const loginCommandMarkdown = formatOAuthRefreshFailureLoginCommandMarkdown(buildOAuthRefreshFailureLoginCommand(oauthRefreshFailure.provider, { profileId: options?.includeAuthProfileId ? oauthRefreshFailure.profileId : void 0 }));
		const providerText = oauthRefreshFailure.provider ? ` for ${oauthRefreshFailure.provider}` : "";
		const supportsCodexLogin = supportsChannelCodexLogin(oauthRefreshFailure.provider);
		const channelLoginHint = supportsCodexLogin ? "Send `/login codex` from a private chat or Web UI session to pair a new Codex login, or re-auth" : "Re-auth";
		const retryLoginHint = supportsCodexLogin ? "send `/login codex` from a private chat or Web UI session to pair a new Codex login, or re-auth" : "re-auth";
		if (oauthRefreshFailure.reason) return {
			text: `⚠️ Model login expired on the gateway${providerText}. ${channelLoginHint} with ${loginCommandMarkdown} in a terminal, then try again.`,
			isGenericRunnerFailure: false
		};
		return {
			text: `⚠️ Model login failed on the gateway${providerText}. Please try again. If this keeps happening, ${retryLoginHint} with ${loginCommandMarkdown} in a terminal.`,
			isGenericRunnerFailure: false
		};
	}
	const authProfileFailoverFailure = buildAuthProfileFailoverFailureText(error);
	if (authProfileFailoverFailure) return {
		text: authProfileFailoverFailure,
		isGenericRunnerFailure: false
	};
	const cliMaxTurnsError = findCliMaxTurnsError(error);
	if (cliMaxTurnsError) return {
		text: sanitizeUserFacingText(cliMaxTurnsError.message, { errorContext: true }),
		isGenericRunnerFailure: false
	};
	const cliBackendTimeoutFailure = buildCliBackendTimeoutFailureText({
		message: normalizedMessage,
		error,
		replayPrevented: options?.replayPrevented
	});
	if (cliBackendTimeoutFailure) return {
		text: cliBackendTimeoutFailure,
		isGenericRunnerFailure: false
	};
	const providerRequestError = classifyProviderRequestError(error ?? normalizedMessage);
	if (providerRequestError) return {
		text: providerRequestError.userMessage,
		isGenericRunnerFailure: false
	};
	const missingApiKeyFailure = buildMissingApiKeyFailureText({
		message: normalizedMessage,
		error
	});
	if (missingApiKeyFailure) return {
		text: missingApiKeyFailure,
		isGenericRunnerFailure: false
	};
	if (options?.isHeartbeat) return {
		text: HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT,
		isGenericRunnerFailure: false
	};
	const codexAppServerFailure = buildCodexAppServerFailureText(normalizedMessage);
	if (codexAppServerFailure) return {
		text: codexAppServerFailure,
		isGenericRunnerFailure: false
	};
	return {
		text: options?.includeDetails ? formatForwardedExternalRunFailureText(normalizedMessage) : GENERIC_EXTERNAL_RUN_FAILURE_TEXT,
		isGenericRunnerFailure: true
	};
}
function markAgentRunFailureReplyPayload(payload) {
	const marked = markReplyPayloadForSourceSuppressionDelivery(payload);
	if (!isSilentReplyText(marked.text, "NO_REPLY")) marked.isError = true;
	return marked;
}
function buildTerminalAgentRunFailureReplyPayload(params) {
	const text = params.isHeartbeat ? HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT : GENERIC_EXTERNAL_RUN_FAILURE_TEXT;
	return markAgentRunFailureReplyPayload({ text: params.visibleReplyDelivered ? text : resolveExternalRunFailureTextForConversation({
		text,
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: true,
		cfg: params.cfg
	}) });
}
function buildEmptyInteractiveReplyPayload(params) {
	if (!params.isInteractive || params.isHeartbeat === true || params.silentExpected === true || params.allowEmptyAssistantReplyAsSilent === true || params.isMessageToolOnly || params.hasPendingContinuation || params.hasExplicitSilentReply || params.hasCommittedDelivery) return;
	return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: "I finished the turn, but it did not produce a visible reply. Please try again, or start a new session if this keeps happening.",
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: true,
		cfg: params.cfg
	}) });
}
/** Converts known agent-run failures into user-facing reply payloads. */
function buildKnownAgentRunFailureReplyPayload(params) {
	const message = formatErrorMessage(params.err);
	const isFallbackSummary = isFallbackSummaryError(params.err);
	if (isFallbackSummary ? hasBillingAttemptSummary(params.err) : isFailoverError(params.err) ? params.err.reason === "billing" : isBillingErrorMessage(message)) return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: resolveBillingFailureReplyText(params.err),
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: false,
		cfg: params.cfg
	}) });
	const preflightCompactionFailureText = buildPreflightCompactionFailureText(message, { includeDetails: isVerboseFailureDetailEnabled(params.resolvedVerboseLevel) });
	if (preflightCompactionFailureText) return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: preflightCompactionFailureText,
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: false,
		cfg: params.cfg
	}) });
	const isPureTransientSummary = isFallbackSummary ? isPureTransientRateLimitSummary(params.err) : false;
	const failoverReason = !isFallbackSummary && isFailoverError(params.err) ? params.err.reason : void 0;
	const isOverloaded = failoverReason === "overloaded" || isOverloadedErrorMessage(message);
	const isRateLimit = isFallbackSummary ? isPureTransientSummary : failoverReason ? failoverReason === "rate_limit" || failoverReason === "overloaded" : isRateLimitErrorMessage(message);
	const rateLimitOrOverloadedCopy = !isFallbackSummary || isPureTransientSummary ? formatRateLimitOrOverloadedErrorCopy(failoverReason === "overloaded" ? "overloaded" : message) : void 0;
	if (isRateLimit && !isOverloaded) return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: buildRateLimitCooldownMessage(params.err),
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: false,
		cfg: params.cfg
	}) });
	if (rateLimitOrOverloadedCopy) return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: rateLimitOrOverloadedCopy,
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: false,
		cfg: params.cfg
	}) });
	const externalRunFailureReply = buildExternalRunFailureReply({
		message,
		error: params.err
	}, {
		includeAuthProfileId: !isNonDirectConversationContext(params.sessionCtx),
		includeDetails: isVerboseFailureDetailEnabled(params.resolvedVerboseLevel)
	});
	if (externalRunFailureReply.isGenericRunnerFailure) return;
	return markAgentRunFailureReplyPayload({ text: resolveExternalRunFailureTextForConversation({
		text: externalRunFailureReply.text,
		sessionCtx: params.sessionCtx,
		isGenericRunnerFailure: false,
		cfg: params.cfg
	}) });
}
//#endregion
//#region src/auto-reply/reply/restart-recovery-claim.ts
/** Provider redelivery guard shared by ingress and the agent admission boundary. */
function isDuplicateRestartRecoverySource(entry, sourceTurnId) {
	const normalizedSourceTurnId = normalizeOptionalString(sourceTurnId);
	return Boolean(normalizedSourceTurnId && (hasRestartRecoveryTerminalRun(entry ?? void 0, normalizedSourceTurnId) || hasRestartRecoverySourceClaim(entry ?? void 0, normalizedSourceTurnId)));
}
async function retireTerminalRestartRecoverySourceClaim(params) {
	let didRetire = false;
	const retired = await updateSessionEntry({
		storePath: params.storePath,
		sessionKey: params.sessionKey
	}, (current) => {
		if (current.sessionId !== params.sessionId || current.status === "running" || current.restartRecoveryDeliveryReceiptState === "terminal-pending" || !hasRestartRecoverySourceClaim(current, params.sourceTurnId)) return null;
		didRetire = true;
		return {
			...buildRestartRecoveryClaimCleanupPatch({
				entry: current,
				recordTerminalSource: true,
				terminalSourceRunId: params.sourceTurnId
			}),
			updatedAt: Date.now()
		};
	}, {
		skipMaintenance: true,
		takeCacheOwnership: true
	});
	return didRetire ? retired ?? void 0 : void 0;
}
function buildExpectedSessionState(entry) {
	return {
		abortedLastRun: entry.abortedLastRun,
		mainRestartRecoveryCycleId: entry.mainRestartRecovery?.cycleId,
		mainRestartRecoveryRevision: entry.mainRestartRecovery?.revision,
		restartRecoveryBeforeAgentReplyState: entry.restartRecoveryBeforeAgentReplyState,
		restartRecoveryDeliveryReceiptState: entry.restartRecoveryDeliveryReceiptState,
		restartRecoveryDeliveryToolCallId: entry.restartRecoveryDeliveryToolCallId,
		restartRecoveryDeliveryRequestFingerprint: entry.restartRecoveryDeliveryRequestFingerprint,
		restartRecoveryDeliveryRunId: entry.restartRecoveryDeliveryRunId,
		restartRecoveryDeliverySourceRunId: entry.restartRecoveryDeliverySourceRunId,
		restartRecoveryRequesterAccountId: entry.restartRecoveryRequesterAccountId,
		restartRecoveryRequesterSenderId: entry.restartRecoveryRequesterSenderId,
		restartRecoverySameChannelThreadRequired: entry.restartRecoverySameChannelThreadRequired,
		restartRecoverySourceIngress: entry.restartRecoverySourceIngress,
		restartRecoverySourceReplyDeliveryMode: entry.restartRecoverySourceReplyDeliveryMode,
		restartRecoveryTerminalRunIds: entry.restartRecoveryTerminalRunIds,
		status: entry.status
	};
}
function createReplyRestartRecoveryClaimController(params) {
	let recoveryRunId = randomUUID();
	let recoverySourceRunId;
	let tracked = false;
	let leaseLossRestartHandoffConfirmed = false;
	const persistAdmissionPatch = async (options) => {
		const expectedSessionState = buildExpectedSessionState(options.entry);
		if (options.recorder && !options.recorder.hasPersisted()) {
			const result = await options.recorder.persistApproved({
				target: params.resolveUserTurnTarget?.({
					entry: options.entry,
					sessionId: options.sessionId,
					sessionKey: options.sessionKey,
					storePath: options.storePath
				}),
				expectedSessionId: options.sessionId,
				expectedSessionState,
				sessionLifecyclePatch: options.patch
			});
			if (!result?.sessionEntry) throw new Error("session changed before durable user-turn admission");
			return result.sessionEntry;
		}
		const persisted = await updateSessionEntry({
			storePath: options.storePath,
			sessionKey: options.sessionKey
		}, (current) => sessionMatchesExpectedTranscriptTurn({ entry: current }, {
			expectedSessionId: options.sessionId,
			expectedSessionState
		}) ? options.patch : null);
		if (!persisted) throw new Error("restart recovery claim changed before agent adoption");
		return persisted;
	};
	const persistUserTurnOnly = async (recorder, sessionId) => {
		if (!recorder || recorder.hasPersisted()) return;
		const entry = params.getEntry();
		const target = entry && params.sessionKey && params.storePath ? params.resolveUserTurnTarget?.({
			entry,
			sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}) : void 0;
		const result = await recorder.persistApproved({
			target,
			expectedSessionId: sessionId
		});
		if (!result) throw new Error("session changed before durable user-turn admission");
		if (result.sessionEntry) params.setEntry(result.sessionEntry);
	};
	const admitUserTurn = async (recorder) => {
		if (!params.sessionKey || !params.storePath) {
			await recorder?.persistApproved();
			return "admitted";
		}
		const sessionId = params.getSessionId();
		const entry = loadSqliteSessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey,
			clone: false,
			hydrateSkillPromptRefs: false
		}) ?? params.getEntry();
		if (!entry || entry.sessionId !== sessionId) throw new Error("session changed before durable user-turn admission");
		const admissionRunId = normalizeOptionalString(params.admissionRunId);
		const sourceTurnId = normalizeOptionalString(params.sourceTurnId);
		if (sourceTurnId) {
			if (hasRestartRecoveryTerminalRun(entry, sourceTurnId)) return "duplicate-source";
			if (hasRestartRecoverySourceClaim(entry, sourceTurnId)) {
				if (entry.status !== "running") {
					const retired = await retireTerminalRestartRecoverySourceClaim({
						sessionId,
						sessionKey: params.sessionKey,
						sourceTurnId,
						storePath: params.storePath
					});
					if (retired) params.setEntry(retired);
				}
				return "duplicate-source";
			}
		}
		const activeClaimRunId = normalizeOptionalString(entry?.restartRecoveryDeliveryRunId);
		if (admissionRunId && entry && entry.restartRecoveryDeliveryContext === void 0 && activeClaimRunId === admissionRunId) {
			if (entry.status !== "running" || entry.abortedLastRun === true) throw new Error("restart recovery claim changed before agent adoption");
			const recoveredBeforeAgentReplyState = activeClaimRunId === admissionRunId ? entry.restartRecoveryBeforeAgentReplyState : void 0;
			const adopted = await persistAdmissionPatch({
				entry,
				patch: {
					restartRecoveryBeforeAgentReplyState: recoveredBeforeAgentReplyState ?? params.beforeAgentReplyState,
					restartRecoveryDeliveryReceiptState: void 0,
					restartRecoveryDeliveryToolCallId: void 0,
					restartRecoveryDeliveryRequestFingerprint: void 0,
					restartRecoverySourceIngress: entry.restartRecoverySourceIngress ?? "control-ui",
					updatedAt: Date.now()
				},
				recorder,
				sessionId,
				sessionKey: params.sessionKey,
				storePath: params.storePath
			});
			params.setEntry(adopted);
			recoveryRunId = admissionRunId;
			recoverySourceRunId = normalizeOptionalString(adopted.restartRecoveryDeliverySourceRunId);
			tracked = true;
			return "admitted";
		}
		const deliveryContext = params.resolveDeliveryContext(entry);
		const recoverableDeliveryContext = deliveryContext && sourceTurnId ? deliveryContext : void 0;
		if (recoverableDeliveryContext) {
			const persistedSourceTurnId = normalizeOptionalString((recorder?.getPersistedMessage?.() ?? await recorder?.resolveMessage())?.idempotencyKey);
			if (!recorder || persistedSourceTurnId !== sourceTurnId) throw new Error("channel restart recovery requires source-keyed user-turn admission");
		}
		if (!recoverableDeliveryContext && !activeClaimRunId) {
			await persistUserTurnOnly(recorder, sessionId);
			return "admitted";
		}
		const updatedAt = Date.now();
		if (activeClaimRunId && (entry.abortedLastRun === true || entry.status === "running" || entry.restartRecoveryDeliveryReceiptState === "terminal-pending")) throw new Error("restart recovery claim changed before agent adoption");
		const retiredClaim = activeClaimRunId ? buildRestartRecoveryClaimCleanupPatch({
			entry,
			recordTerminalSource: true,
			terminalSourceRunId: normalizeOptionalString(entry.restartRecoveryDeliverySourceRunId)
		}) : {};
		const patch = recoverableDeliveryContext ? {
			...retiredClaim,
			abortedLastRun: false,
			endedAt: void 0,
			restartRecoveryBeforeAgentReplyState: params.beforeAgentReplyState,
			restartRecoveryDeliveryReceiptState: void 0,
			restartRecoveryDeliveryToolCallId: void 0,
			restartRecoveryDeliveryContext: recoverableDeliveryContext,
			restartRecoveryDeliveryRequestFingerprint: void 0,
			restartRecoveryDeliveryRunId: recoveryRunId,
			restartRecoveryDeliverySourceRunId: sourceTurnId,
			restartRecoveryRequesterAccountId: sourceTurnId ? normalizeOptionalString(params.requesterAccountId) : void 0,
			restartRecoveryRequesterSenderId: sourceTurnId ? normalizeOptionalString(params.requesterSenderId) : void 0,
			restartRecoverySameChannelThreadRequired: sourceTurnId && params.sameChannelThreadRequired === true ? true : void 0,
			restartRecoverySourceIngress: sourceTurnId ? "channel" : void 0,
			restartRecoverySourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
			runtimeMs: void 0,
			startedAt: updatedAt,
			status: "running",
			updatedAt
		} : {
			...retiredClaim,
			updatedAt
		};
		const persisted = await persistAdmissionPatch({
			entry,
			patch,
			recorder,
			sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		});
		params.setEntry(persisted);
		recoverySourceRunId = normalizeOptionalString(persisted.restartRecoveryDeliverySourceRunId);
		tracked = persisted.restartRecoveryDeliveryRunId === recoveryRunId;
		return "admitted";
	};
	const checkpointBeforeAgentReply = async ({ state, pendingFinalDelivery }) => {
		if (!tracked || !params.sessionKey || !params.storePath) return;
		const updatedAt = Date.now();
		const persisted = await updateSessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey
		}, (current) => current.sessionId === params.getSessionId() && current.restartRecoveryDeliveryRunId === recoveryRunId && current.restartRecoveryDeliverySourceRunId === recoverySourceRunId && current.restartRecoveryBeforeAgentReplyState === "pending" ? {
			restartRecoveryBeforeAgentReplyState: state,
			...pendingFinalDelivery ? {
				pendingFinalDelivery: {
					...pendingFinalDelivery.text ? {
						kind: "replayable",
						text: pendingFinalDelivery.text
					} : { kind: "transport-only" },
					createdAt: updatedAt,
					...pendingFinalDelivery.intentId ? { intentId: pendingFinalDelivery.intentId } : {},
					...pendingFinalDelivery.context ? { context: pendingFinalDelivery.context } : {}
				},
				restartRecoveryForceSafeTools: true
			} : {},
			updatedAt
		} : null, {
			skipMaintenance: true,
			takeCacheOwnership: true
		});
		if (!persisted) throw new Error("before_agent_reply checkpoint lost restart recovery ownership");
		params.setEntry(persisted);
	};
	const beginBeforeAgentReply = async () => {
		if (!tracked || !params.sessionKey || !params.storePath) return true;
		const current = loadSqliteSessionEntry({
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			clone: false,
			hydrateSkillPromptRefs: false
		});
		if (current?.sessionId === params.getSessionId() && current.restartRecoveryDeliveryRunId === recoveryRunId && current.restartRecoveryDeliverySourceRunId === recoverySourceRunId && current.restartRecoveryBeforeAgentReplyState === "continue") return false;
		const updatedAt = Date.now();
		const persisted = await updateSessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey
		}, (persistedCurrent) => persistedCurrent.sessionId === params.getSessionId() && persistedCurrent.restartRecoveryDeliveryRunId === recoveryRunId && persistedCurrent.restartRecoveryDeliverySourceRunId === recoverySourceRunId && persistedCurrent.restartRecoveryBeforeAgentReplyState === "admitted" ? {
			restartRecoveryBeforeAgentReplyState: "pending",
			updatedAt
		} : null, {
			skipMaintenance: true,
			takeCacheOwnership: true
		});
		if (!persisted) throw new Error("before_agent_reply start lost restart recovery ownership");
		params.setEntry(persisted);
		return true;
	};
	const confirmRestartRecoveryArmedAfterLeaseLoss = async () => {
		if (!tracked || !params.sessionKey || !params.storePath || !recoverySourceRunId) return false;
		const persisted = loadSqliteSessionEntry({
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			clone: false,
			hydrateSkillPromptRefs: false,
			readConsistency: "latest"
		});
		if (!persisted || persisted.sessionId !== params.getSessionId()) return false;
		params.setEntry(persisted);
		const activeHandoff = persisted.abortedLastRun === true && normalizeOptionalString(persisted.restartRecoveryDeliveryRunId) === recoveryRunId && hasRestartRecoverySourceClaim(persisted, recoverySourceRunId);
		const completedHandoff = hasRestartRecoveryTerminalRun(persisted, recoverySourceRunId);
		const armed = activeHandoff || completedHandoff;
		leaseLossRestartHandoffConfirmed ||= armed;
		return armed;
	};
	const clear = async () => {
		if (!tracked || !params.sessionKey || !params.storePath || params.isRestartAbort() || leaseLossRestartHandoffConfirmed) return;
		const persisted = await updateSessionEntry({
			storePath: params.storePath,
			sessionKey: params.sessionKey
		}, (current) => {
			if (current.sessionId !== params.getSessionId() || current.restartRecoveryDeliveryRunId !== recoveryRunId) return null;
			if (current.restartRecoveryDeliveryReceiptState === "terminal-pending") {
				const endedAt = Date.now();
				return {
					...buildRestartRecoveryClaimCleanupPatch({
						entry: current,
						recordTerminalSource: true,
						terminalSourceRunId: recoverySourceRunId
					}),
					abortedLastRun: true,
					endedAt,
					pendingFinalDelivery: void 0,
					runtimeMs: typeof current.startedAt === "number" ? Math.max(0, endedAt - current.startedAt) : void 0,
					status: "failed",
					updatedAt: endedAt
				};
			}
			const preservesPendingFinal = current.pendingFinalDelivery !== void 0;
			const endedAt = current.restartRecoveryBeforeAgentReplyState === "handled-silent" && !preservesPendingFinal ? Date.now() : void 0;
			return {
				...buildRestartRecoveryClaimCleanupPatch({
					entry: current,
					recordTerminalSource: true,
					terminalSourceRunId: recoverySourceRunId
				}),
				...preservesPendingFinal ? {
					restartRecoveryBeforeAgentReplyState: current.restartRecoveryBeforeAgentReplyState,
					restartRecoverySourceIngress: current.restartRecoverySourceIngress,
					restartRecoveryForceSafeTools: current.restartRecoveryForceSafeTools
				} : {},
				...endedAt !== void 0 ? {
					abortedLastRun: false,
					endedAt,
					runtimeMs: typeof current.startedAt === "number" ? Math.max(0, endedAt - current.startedAt) : void 0,
					status: "done"
				} : {},
				updatedAt: endedAt ?? Date.now()
			};
		});
		if (persisted) params.setEntry(persisted);
	};
	const isArmed = () => {
		if (!tracked || !params.sessionKey || !params.storePath) return false;
		return loadSqliteSessionEntry({
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			clone: false,
			hydrateSkillPromptRefs: false
		})?.abortedLastRun === true || params.getEntry()?.abortedLastRun === true;
	};
	return {
		admitUserTurn,
		beginBeforeAgentReply,
		checkpointBeforeAgentReply,
		clear,
		confirmRestartRecoveryArmedAfterLeaseLoss,
		isArmed
	};
}
//#endregion
export { resolveExternalRunFailureTextForConversation as _, buildEmptyInteractiveReplyPayload as a, buildPreflightCompactionFailureText as c, hasBillingAttemptSummary as d, isNonDirectConversationContext as f, resolveBillingFailureReplyText as g, markAgentRunFailureReplyPayload as h, buildAuthProfileFailoverFailureText as i, buildRateLimitCooldownMessage as l, isVerboseFailureDetailEnabled as m, isDuplicateRestartRecoverySource as n, buildExternalRunFailureReply as o, isPureTransientRateLimitSummary as p, retireTerminalRestartRecoverySourceClaim as r, buildKnownAgentRunFailureReplyPayload as s, createReplyRestartRecoveryClaimController as t, buildTerminalAgentRunFailureReplyPayload as u, PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE as v, classifyProviderRequestError as y };
