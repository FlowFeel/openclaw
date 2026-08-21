import { o as asDateTimestampMs } from "./number-coercion-Crk_c9KW.js";
import "./number-coercion-IpMOa8nH.js";
import { t as createSubsystemLogger } from "./subsystem-Ess1Ww-N.js";
import { t as cloneAuthProfileStore } from "./clone-DIzuC3ZN.js";
import { r as hasUsableOAuthCredential$1 } from "./credential-state-oLRZBnMF.js";
//#region src/agents/auth-profiles/constants.ts
/**
* Shared auth-profile constants.
* Defines store versions, built-in CLI profile ids, lock budgets, refresh
* timing, and logging used by auth profile runtime modules.
*/
/** @deprecated Anthropic provider-owned CLI profile id; do not use from third-party plugins. */
const CLAUDE_CLI_PROFILE_ID = "anthropic:claude-cli";
/** @deprecated OpenAI provider-owned CLI profile id; do not use from third-party plugins. */
const CODEX_CLI_PROFILE_ID = "openai:codex-cli";
/** Default OpenAI/Codex OAuth profile id used for migrated stores. */
const OPENAI_CODEX_DEFAULT_PROFILE_ID = "openai:default";
/** @deprecated MiniMax provider-owned CLI profile id; do not use from third-party plugins. */
const MINIMAX_CLI_PROFILE_ID = "minimax-portal:minimax-cli";
/** Cross-agent lock policy for shared OAuth refresh operations. */
const OAUTH_REFRESH_LOCK_OPTIONS = {
	retries: {
		retries: 20,
		factor: 2,
		minTimeout: 100,
		maxTimeout: 1e4,
		randomize: true
	},
	stale: 18e4
};
/** Maximum duration for one OAuth refresh call inside the refresh lock. */
const OAUTH_REFRESH_CALL_TIMEOUT_MS = 12e4;
/** Freshness window for syncing external CLI auth into auth profiles. */
const EXTERNAL_CLI_SYNC_TTL_MS = 900 * 1e3;
/** Auth profile subsystem logger. */
const log = createSubsystemLogger("agents/auth-profiles");
//#endregion
//#region src/agents/auth-profiles/oauth-identity.ts
/**
* OAuth identity comparison and mirroring decisions.
* Guards cross-agent credential copy/adoption so refreshed credentials cannot
* overwrite a different account's local auth state.
*/
/** Normalize account-id style identity tokens for exact comparison. */
function normalizeAuthIdentityToken(value) {
	const trimmed = value?.trim();
	return trimmed ? trimmed : void 0;
}
/** Normalize email identity tokens for case-insensitive comparison. */
function normalizeAuthEmailToken(value) {
	return normalizeAuthIdentityToken(value)?.toLowerCase();
}
/**
* One-sided copy gate for both directions:
* - mirror: sub-agent refresh -> main-agent store
* - adopt: main-agent store -> sub-agent store
*/
function isSafeToCopyOAuthIdentity(existing, incoming) {
	const aAcct = normalizeAuthIdentityToken(existing.accountId);
	const bAcct = normalizeAuthIdentityToken(incoming.accountId);
	const aEmail = normalizeAuthEmailToken(existing.email);
	const bEmail = normalizeAuthEmailToken(incoming.email);
	if (aAcct !== void 0 && bAcct !== void 0) return aAcct === bAcct;
	if (aEmail !== void 0 && bEmail !== void 0) return aEmail === bEmail;
	if (aAcct !== void 0 || aEmail !== void 0) return false;
	return true;
}
/** Decide whether a refreshed OAuth credential should mirror into another store. */
function shouldMirrorRefreshedOAuthCredential(params) {
	const { existing, refreshed } = params;
	if (!existing) return {
		shouldMirror: true,
		reason: "no-existing-credential"
	};
	if (existing.type !== "oauth") return {
		shouldMirror: false,
		reason: "non-oauth-existing-credential"
	};
	if (existing.provider !== refreshed.provider) return {
		shouldMirror: false,
		reason: "provider-mismatch"
	};
	if (!isSafeToCopyOAuthIdentity(existing, refreshed)) return {
		shouldMirror: false,
		reason: "identity-mismatch-or-regression"
	};
	const refreshedExpires = asDateTimestampMs(refreshed.expires);
	if (refreshedExpires === void 0) return {
		shouldMirror: false,
		reason: "incoming-not-fresher"
	};
	const existingExpires = asDateTimestampMs(existing.expires);
	if (existingExpires !== void 0 && existingExpires >= refreshedExpires) return {
		shouldMirror: false,
		reason: "incoming-not-fresher"
	};
	return {
		shouldMirror: true,
		reason: "incoming-fresher"
	};
}
//#endregion
//#region src/agents/auth-profiles/oauth-shared.ts
/**
* Shared OAuth credential replacement and identity policy.
* Used by manager, external CLI overlays, and persistence paths to decide when
* incoming runtime credentials may replace or bootstrap stored profiles.
*/
/** Returns true when two OAuth credentials contain the same token/identity data. */
function areOAuthCredentialsEquivalent(a, b) {
	if (!a || a.type !== "oauth") return false;
	return a.provider === b.provider && a.access === b.access && a.refresh === b.refresh && a.expires === b.expires && a.email === b.email && a.enterpriseUrl === b.enterpriseUrl && a.projectId === b.projectId && a.accountId === b.accountId && a.idToken === b.idToken;
}
function hasNewerStoredOAuthCredential(existing, incoming) {
	const existingExpires = asDateTimestampMs(existing?.expires);
	const incomingExpires = asDateTimestampMs(incoming.expires);
	return Boolean(existing && existing.provider === incoming.provider && existingExpires !== void 0 && (incomingExpires === void 0 || existingExpires > incomingExpires));
}
/** Returns true when an incoming OAuth credential should replace stored state. */
function shouldReplaceStoredOAuthCredential(existing, incoming) {
	if (!existing || existing.type !== "oauth") return true;
	if (areOAuthCredentialsEquivalent(existing, incoming)) return false;
	return !hasNewerStoredOAuthCredential(existing, incoming);
}
/** Returns true when an OAuth credential has a usable access token. */
function hasUsableOAuthCredential(credential, now = Date.now()) {
	return hasUsableOAuthCredential$1(credential, { now });
}
/** Returns true when an OAuth credential has account or email identity. */
function hasOAuthIdentity(credential) {
	return normalizeAuthIdentityToken(credential.accountId) !== void 0 || normalizeAuthEmailToken(credential.email) !== void 0;
}
/** Returns true when OAuth identity fields match by account id or email. */
function hasMatchingOAuthIdentity(existing, incoming) {
	return hasOAuthIdentity(existing) && isSafeToCopyOAuthIdentity(existing, incoming);
}
function isSafeOAuthIdentityTransition(existing, incoming, policy) {
	if (!existing || existing.type !== "oauth") return policy.whenExistingCredentialMissing;
	if (existing.provider !== incoming.provider) return false;
	if (areOAuthCredentialsEquivalent(existing, incoming)) return true;
	if (!hasOAuthIdentity(existing)) return policy.whenExistingIdentityMissing;
	return hasMatchingOAuthIdentity(existing, incoming);
}
/** Returns true when bootstrap may adopt an external OAuth identity. */
function isSafeToAdoptBootstrapOAuthIdentity(existing, incoming) {
	return isSafeOAuthIdentityTransition(existing, incoming, {
		whenExistingCredentialMissing: true,
		whenExistingIdentityMissing: true
	});
}
/** Returns true when agent-local state may adopt a main-store OAuth identity. */
function isSafeToAdoptMainStoreOAuthIdentity(existing, incoming) {
	return isSafeOAuthIdentityTransition(existing, incoming, {
		whenExistingCredentialMissing: false,
		whenExistingIdentityMissing: true
	});
}
/** Returns true when an external CLI credential should bootstrap stored OAuth. */
function shouldBootstrapFromExternalCliCredential(params) {
	const now = params.now ?? Date.now();
	if (hasUsableOAuthCredential(params.existing, now)) return false;
	return hasUsableOAuthCredential(params.imported, now);
}
/** Overlays runtime external OAuth profiles on a cloned store. */
function overlayRuntimeExternalOAuthProfiles(store, profiles, options) {
	const externalProfiles = Array.from(profiles);
	const next = cloneAuthProfileStore(store);
	const overlaidProfileIds = new Set(externalProfiles.map((profile) => profile.profileId));
	for (const profile of externalProfiles) next.profiles[profile.profileId] = profile.credential;
	next.runtimePersistedProfileIds = store.runtimePersistedProfileIds?.filter((profileId) => next.profiles[profileId] && !overlaidProfileIds.has(profileId)).toSorted();
	if (next.runtimePersistedProfileIds?.length === 0) next.runtimePersistedProfileIds = void 0;
	const runtimeOnlyProfileIds = new Set(externalProfiles.filter((profile) => profile.persistence !== "persisted").map((profile) => profile.profileId));
	for (const profileId of store.runtimeExternalProfileIds ?? []) if (next.profiles[profileId]) runtimeOnlyProfileIds.add(profileId);
	next.runtimeExternalProfileIds = runtimeOnlyProfileIds.size > 0 || options?.runtimeExternalProfileIdsAuthoritative === true ? [...runtimeOnlyProfileIds].toSorted() : void 0;
	next.runtimeExternalProfileIdsAuthoritative = options?.runtimeExternalProfileIdsAuthoritative === true ? true : void 0;
	return next;
}
/** Returns true when a runtime external OAuth profile should be persisted. */
function shouldPersistRuntimeExternalOAuthProfile(params) {
	for (const profile of params.profiles) {
		if (profile.profileId !== params.profileId) continue;
		if (profile.persistence === "persisted") return true;
		return !areOAuthCredentialsEquivalent(profile.credential, params.credential);
	}
	return true;
}
//#endregion
export { log as S, EXTERNAL_CLI_SYNC_TTL_MS as _, isSafeToAdoptBootstrapOAuthIdentity as a, OAUTH_REFRESH_LOCK_OPTIONS as b, shouldBootstrapFromExternalCliCredential as c, isSafeToCopyOAuthIdentity as d, normalizeAuthEmailToken as f, CODEX_CLI_PROFILE_ID as g, CLAUDE_CLI_PROFILE_ID as h, hasUsableOAuthCredential as i, shouldPersistRuntimeExternalOAuthProfile as l, shouldMirrorRefreshedOAuthCredential as m, hasMatchingOAuthIdentity as n, isSafeToAdoptMainStoreOAuthIdentity as o, normalizeAuthIdentityToken as p, hasOAuthIdentity as r, overlayRuntimeExternalOAuthProfiles as s, areOAuthCredentialsEquivalent as t, shouldReplaceStoredOAuthCredential as u, MINIMAX_CLI_PROFILE_ID as v, OPENAI_CODEX_DEFAULT_PROFILE_ID as x, OAUTH_REFRESH_CALL_TIMEOUT_MS as y };
