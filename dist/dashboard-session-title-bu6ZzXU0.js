import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { i as getOrCreatePromise } from "./lazy-promise-DGqyc4Y4.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import { o as resolveAgentEffectiveModelPrimary } from "./agent-scope-DyEposw2.js";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.js";
import { K as updateSessionEntry } from "./session-accessor-D5Or7WgI.js";
import { n as resolveSessionModelRef } from "./session-model-ref-D_2SCgSv.js";
import { n as resolveUtilityModelRefForAgent } from "./utility-model-BQ1ybsXN.js";
import { n as generateConversationLabelWithFallback } from "./conversation-label-generator-BLczieik.js";
//#region src/gateway/dashboard-session-title.ts
const DASHBOARD_SESSION_TITLE_MAX_CHARS = 60;
const DASHBOARD_SESSION_TITLE_SOURCE_MAX_CHARS = 1e3;
const DASHBOARD_SESSION_TITLE_PROMPT = "Generate a concise session title (3-6 words, max 60 characters) from the user's first message. Use the same language as the message. No emoji. Return only the title.";
const sessionTitleRequests = /* @__PURE__ */ new Map();
function hasExplicitSessionName(entry) {
	return Boolean(entry?.label?.trim() || entry?.displayName?.trim() || entry?.subject?.trim() || entry?.groupChannel?.trim() || entry?.space?.trim());
}
function isDashboardSessionKey(sessionKey) {
	return parseAgentSessionKey(sessionKey)?.rest.startsWith("dashboard:") === true;
}
function isDashboardSessionTitleCandidate(params) {
	const sourceText = params.userMessage.trim();
	return Boolean(sourceText && !sourceText.startsWith("/") && isDashboardSessionKey(params.sessionKey));
}
function resolveDashboardTitleAuthProfile(params) {
	const sessionProfile = params.entry?.authProfileOverride?.trim();
	if (sessionProfile) return sessionProfile;
	const configuredRef = resolveAgentEffectiveModelPrimary(params.cfg, params.agentId)?.trim();
	const configuredProfile = configuredRef ? splitTrailingAuthProfile(configuredRef).profile : void 0;
	if (!configuredProfile) return;
	return resolveSessionModelRef(params.cfg, void 0, params.agentId).provider === params.regularProvider ? configuredProfile : void 0;
}
function normalizeDashboardSessionTitle(raw) {
	const firstLine = raw.replace(/\r/g, "").split("\n").map((line) => line.trim()).find((line) => line && !line.startsWith("```"));
	if (!firstLine) return null;
	const normalized = firstLine.replace(/^\s*(?:title\s*:\s*)?/i, "").replace(/^["'`]+|["'`]+$/g, "").replace(/\s+/g, " ").trim();
	return normalized ? truncateUtf16Safe(normalized, DASHBOARD_SESSION_TITLE_MAX_CHARS) : null;
}
/** Generates the same short title used by dashboard session rows without persisting it. */
async function generateDashboardSessionTitle(params) {
	const sourceText = params.userMessage.trim();
	if (!sourceText || sourceText.startsWith("/")) return null;
	const regularModel = resolveSessionModelRef(params.cfg, params.entry, params.agentId);
	const preferredProfile = resolveDashboardTitleAuthProfile({
		cfg: params.cfg,
		agentId: params.agentId,
		entry: params.entry,
		regularProvider: regularModel.provider
	});
	const regularModelRef = `${regularModel.provider}/${regularModel.model}${preferredProfile ? `@${preferredProfile}` : ""}`;
	const utilityModelRef = resolveUtilityModelRefForAgent({
		cfg: params.cfg,
		agentId: params.agentId,
		primaryProvider: regularModel.provider,
		primaryModelRef: regularModelRef
	});
	const generated = await generateConversationLabelWithFallback({
		userMessage: truncateUtf16Safe(sourceText, DASHBOARD_SESSION_TITLE_SOURCE_MAX_CHARS),
		prompt: DASHBOARD_SESSION_TITLE_PROMPT,
		cfg: params.cfg,
		agentId: params.agentId,
		...utilityModelRef ? { utilityModelRef } : {},
		regularModelRef,
		...preferredProfile ? { preferredProfile } : {},
		normalizeLabel: normalizeDashboardSessionTitle,
		maxLength: DASHBOARD_SESSION_TITLE_MAX_CHARS
	});
	return generated ? normalizeDashboardSessionTitle(generated) : null;
}
async function maybeGenerateDashboardSessionTitle(params) {
	const sourceText = params.userMessage.trim();
	if (!isDashboardSessionTitleCandidate({
		sessionKey: params.sessionKey,
		userMessage: sourceText
	})) return false;
	return (await maybeGenerateSessionTitle({
		...params,
		userMessage: sourceText
	})).kind === "persisted";
}
async function maybeGenerateSessionTitle(params) {
	const sourceText = params.userMessage.trim();
	if (hasExplicitSessionName(params.entry) || params.entry?.systemSent === true || params.entry?.sessionId !== params.sessionId) return { kind: "skipped" };
	const requestKey = `${params.storePath}\0${params.sessionKey}\0${params.sessionId}`;
	const existing = sessionTitleRequests.get(requestKey);
	if (existing) return {
		kind: "in-flight",
		settled: existing
	};
	return await getOrCreatePromise(sessionTitleRequests, requestKey, async () => {
		const displayName = await generateDashboardSessionTitle({
			cfg: params.cfg,
			agentId: params.agentId,
			entry: params.entry,
			userMessage: sourceText
		});
		if (!displayName) return false;
		let persisted = false;
		await updateSessionEntry({
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			storePath: params.storePath
		}, (current) => {
			if (current.sessionId !== params.sessionId || hasExplicitSessionName(current)) return null;
			persisted = true;
			return { displayName };
		}, { requireWriteSuccess: true });
		return persisted;
	}, { evictOnSettled: true }) ? { kind: "persisted" } : { kind: "skipped" };
}
//#endregion
export { maybeGenerateSessionTitle as a, maybeGenerateDashboardSessionTitle as i, hasExplicitSessionName as n, isDashboardSessionTitleCandidate as r, generateDashboardSessionTitle as t };
