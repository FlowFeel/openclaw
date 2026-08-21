import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { d as sessionDeliveryOrigin } from "./delivery-context.shared-DR6KpKlV.js";
import { o as resolveEffectiveSessionToolsVisibility, r as createSessionVisibilityGuard, t as createAgentToAgentPolicy } from "./session-visibility-BYkMOIPw.js";
import "./session-store-runtime-DND3iX5-.js";
import { r as resolveSessionTranscriptMemoryHitKeyToSessionKeys } from "./session-transcript-memory-hit-Cm7w9St5.js";
import { i as resolveTranscriptStemToSessionKeys, r as loadCombinedSessionStoreForGateway, t as extractTranscriptIdentityFromSessionsMemoryHit } from "./session-transcript-hit-BmgnuIuf.js";
import "./memory-host-core-B-CGbrht.js";
import { r as readQmdSessionArtifactIdentity } from "./qmd-session-artifacts-Bk5poBgU.js";
//#region extensions/memory-core/src/session-search-visibility.ts
function normalizeAgentIdForCompare(value) {
	return value?.trim().toLowerCase() || void 0;
}
function isGlobalSessionKeyForSharedScope(cfg, key) {
	return cfg.session?.scope === "global" && key.trim().toLowerCase() === "global";
}
function isSameStoredTranscript(anchor, candidate) {
	if (!anchor || !candidate) return false;
	const anchorSessionId = anchor.sessionId?.trim();
	if (anchorSessionId && candidate.sessionId?.trim() === anchorSessionId) return true;
	const anchorSessionFile = anchor.sessionFile;
	const candidateSessionFile = candidate.sessionFile;
	return typeof anchorSessionFile === "string" && anchorSessionFile.trim().length > 0 && typeof candidateSessionFile === "string" && candidateSessionFile.trim() === anchorSessionFile.trim();
}
function isPrivateConversation(params) {
	if (!params.entry) return false;
	const key = params.key.trim().toLowerCase();
	const chatTypes = [params.entry.chatType, sessionDeliveryOrigin(params.entry)?.chatType].filter((chatType) => chatType !== void 0);
	if (chatTypes.some((chatType) => chatType === "group" || chatType === "channel") || /:active-memory:[a-f0-9]{12}$/i.test(key)) return false;
	const prefix = `agent:${params.agentId.trim().toLowerCase()}:`;
	if (key === "global" || key === `${prefix}global`) return false;
	if (key.startsWith(`${prefix}explicit:`)) return chatTypes.length > 0 && chatTypes.every((chatType) => chatType === "direct");
	if (key.includes(":group:") || key.includes(":channel:") || /:(?:active-memory|cron|heartbeat|hook|node|subagent)(?::|$)/.test(key)) return false;
	if (chatTypes.length > 0) return chatTypes.every((chatType) => chatType === "direct");
	if (key.includes(":direct:") || key.includes(":dm:")) return true;
	return false;
}
function anchorAliasesArePrivate(params) {
	for (const [key, entry] of Object.entries(params.store)) {
		if (key === params.anchorSessionKey) continue;
		if (!isSameStoredTranscript(params.anchorEntry, entry)) continue;
		if (!isPrivateConversation({
			agentId: params.agentId,
			entry,
			key
		})) return false;
	}
	return true;
}
function isTrustedRecallRequester(params) {
	const requesterSessionKey = params.requesterSessionKey?.trim();
	if (!requesterSessionKey) return false;
	if (requesterSessionKey === params.anchorSessionKey) return true;
	if (!requesterSessionKey.startsWith(params.anchorSessionKey)) return false;
	const recallSuffix = requesterSessionKey.slice(params.anchorSessionKey.length);
	return /^:active-memory:[a-f0-9]{12}$/i.test(recallSuffix);
}
function filterSessionKeysByScopedAgent(params) {
	const scopedAgentId = normalizeAgentIdForCompare(params.scopedAgentId);
	if (!scopedAgentId) return params.keys;
	return params.keys.filter((key) => {
		if (isGlobalSessionKeyForSharedScope(params.cfg, key)) return true;
		return normalizeAgentIdForCompare(resolveSessionAgentId({
			sessionKey: key,
			config: params.cfg
		})) === scopedAgentId;
	});
}
async function filterMemorySearchHitsBySessionVisibility(params) {
	const visibility = resolveEffectiveSessionToolsVisibility({
		cfg: params.cfg,
		sandboxed: params.sandboxed
	});
	const a2aPolicy = createAgentToAgentPolicy(params.cfg);
	const requesterAgentId = params.requesterSessionKey ? resolveSessionAgentId({
		sessionKey: params.requesterSessionKey,
		config: params.cfg
	}) : void 0;
	const scopedAgentId = params.agentId?.trim() || requesterAgentId;
	const guard = params.requesterSessionKey ? await createSessionVisibilityGuard({
		action: "history",
		requesterSessionKey: params.requesterSessionKey,
		visibility,
		a2aPolicy
	}) : null;
	const { store: combinedSessionStore } = loadCombinedSessionStoreForGateway(params.cfg, scopedAgentId ? { agentId: scopedAgentId } : {});
	const conversationRecall = params.conversationRecall;
	const trustedAgentScope = Boolean(params.trustedAgentScope && scopedAgentId && !params.requesterSessionKey && !conversationRecall);
	const anchorSessionKey = conversationRecall?.anchorSessionKey.trim();
	const recallAgentId = anchorSessionKey ? resolveSessionAgentId({
		sessionKey: anchorSessionKey,
		config: params.cfg
	}) : void 0;
	const anchorEntry = anchorSessionKey ? combinedSessionStore[anchorSessionKey] : void 0;
	const recallAuthorized = Boolean(conversationRecall && !params.sandboxed && conversationRecall.scope === "same-agent-private" && (conversationRecall.corpus === "sessions" || conversationRecall.corpus === "configured") && anchorSessionKey && isTrustedRecallRequester({
		anchorSessionKey,
		requesterSessionKey: params.requesterSessionKey
	}) && normalizeAgentIdForCompare(recallAgentId) === normalizeAgentIdForCompare(scopedAgentId) && recallAgentId && isPrivateConversation({
		agentId: recallAgentId,
		entry: anchorEntry,
		key: anchorSessionKey
	}) && anchorAliasesArePrivate({
		store: combinedSessionStore,
		agentId: recallAgentId,
		anchorSessionKey,
		anchorEntry
	}));
	if (conversationRecall && !recallAuthorized) return conversationRecall.corpus === "configured" ? params.hits.filter((hit) => hit.source !== "sessions") : [];
	const isSessionKeyAllowed = (key) => {
		if (!conversationRecall || !anchorSessionKey || !recallAgentId) {
			const visibilityKey = scopedAgentId && isGlobalSessionKeyForSharedScope(params.cfg, key) ? `agent:${scopedAgentId}:global` : key;
			return trustedAgentScope || guard?.check(visibilityKey).allowed === true;
		}
		const candidateEntry = combinedSessionStore[key];
		if (key === anchorSessionKey || isSameStoredTranscript(anchorEntry, candidateEntry)) return false;
		if (normalizeAgentIdForCompare(resolveSessionAgentId({
			sessionKey: key,
			config: params.cfg
		})) !== normalizeAgentIdForCompare(recallAgentId)) return false;
		return isPrivateConversation({
			agentId: recallAgentId,
			entry: candidateEntry,
			key
		});
	};
	const expandRecallAliasKeys = (keys) => {
		const expanded = new Set(keys);
		for (const key of keys) {
			const entry = combinedSessionStore[key];
			if (!entry) continue;
			for (const [candidateKey, candidateEntry] of Object.entries(combinedSessionStore)) if (isSameStoredTranscript(entry, candidateEntry)) expanded.add(candidateKey);
		}
		return [...expanded];
	};
	const areSessionKeysAllowed = (keys) => {
		return conversationRecall ? expandRecallAliasKeys(keys).every(isSessionKeyAllowed) : keys.some(isSessionKeyAllowed);
	};
	const next = [];
	for (const hit of params.hits) {
		if (hit.source !== "sessions") {
			if (!conversationRecall || conversationRecall.corpus === "configured") next.push(hit);
			continue;
		}
		if (!trustedAgentScope && (!params.requesterSessionKey || !guard && !conversationRecall)) continue;
		const artifactIdentity = readQmdSessionArtifactIdentity(hit);
		if (artifactIdentity) {
			const normalizedScopedAgentId = normalizeAgentIdForCompare(scopedAgentId);
			const normalizedOwnerAgentId = normalizeAgentIdForCompare(artifactIdentity.agentId);
			if (normalizedScopedAgentId && normalizedOwnerAgentId && normalizedOwnerAgentId !== normalizedScopedAgentId) continue;
			const keys = filterSessionKeysByScopedAgent({
				cfg: params.cfg,
				scopedAgentId,
				keys: resolveSessionTranscriptMemoryHitKeyToSessionKeys({
					store: combinedSessionStore,
					key: artifactIdentity.memoryKey,
					includeSyntheticFallback: artifactIdentity.archived
				})
			});
			if (keys.length === 0) continue;
			if (!areSessionKeysAllowed(keys)) continue;
			next.push(hit);
			continue;
		}
		const identity = extractTranscriptIdentityFromSessionsMemoryHit(hit.path);
		if (!identity) continue;
		const isQmdSessionHit = hit.path.replace(/\\/g, "/").startsWith("qmd/");
		const normalizedScopedAgentId = normalizeAgentIdForCompare(scopedAgentId);
		const normalizedOwnerAgentId = normalizeAgentIdForCompare(identity.ownerAgentId);
		if (normalizedScopedAgentId && normalizedOwnerAgentId && normalizedOwnerAgentId !== normalizedScopedAgentId) continue;
		const sameAgentLiveOwnerId = !identity.archived && normalizedScopedAgentId && normalizedOwnerAgentId === normalizedScopedAgentId ? normalizedOwnerAgentId : void 0;
		const archivedOwnerAgentId = Boolean(identity.archived && (identity.ownerAgentId && (!scopedAgentId || normalizeAgentIdForCompare(identity.ownerAgentId) === normalizeAgentIdForCompare(scopedAgentId)) || isQmdSessionHit && scopedAgentId)) ? identity.ownerAgentId ?? scopedAgentId : void 0;
		const liveKeys = identity.liveStem ? resolveTranscriptStemToSessionKeys({
			store: combinedSessionStore,
			stem: identity.liveStem,
			allowQmdSlugFallback: false
		}) : [];
		const resolvedKeys = liveKeys.length > 0 ? liveKeys : resolveTranscriptStemToSessionKeys({
			store: combinedSessionStore,
			stem: identity.stem,
			allowQmdSlugFallback: isQmdSessionHit && !identity.archived,
			...archivedOwnerAgentId ? { archivedOwnerAgentId } : {}
		});
		const keys = filterSessionKeysByScopedAgent({
			cfg: params.cfg,
			scopedAgentId,
			keys: resolvedKeys
		});
		if (keys.length === 0) {
			if (sameAgentLiveOwnerId && (visibility === "agent" || visibility === "all") && !conversationRecall) next.push(hit);
			continue;
		}
		if (!areSessionKeysAllowed(keys)) continue;
		next.push(hit);
	}
	return next;
}
//#endregion
export { filterMemorySearchHitsBySessionVisibility as t };
