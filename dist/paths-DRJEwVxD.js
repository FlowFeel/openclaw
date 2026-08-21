import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { c as resolveAuthProfileDatabasePath } from "./sqlite-Dtmuz_Ar.js";
import path from "node:path";
//#region src/agents/auth-profiles/path-resolve.ts
/**
* Auth profile path resolution.
* Centralizes canonical SQLite display paths and cross-agent OAuth refresh lock paths.
*/
/** Resolve the user-facing auth profile database path. */
function resolveAuthStorePathForDisplay(agentDir) {
	const pathname = resolveAuthProfileDatabasePath(agentDir);
	return pathname.startsWith("~") ? pathname : resolveUserPath(pathname);
}
/** Resolve the user-facing auth state database path. */
function resolveAuthStatePathForDisplay(agentDir) {
	const pathname = resolveAuthProfileDatabasePath(agentDir);
	return pathname.startsWith("~") ? pathname : resolveUserPath(pathname);
}
/**
* Resolve the path of the cross-agent, per-profile OAuth refresh coordination
* lock. The filename digests a JSON tuple of `[provider, profileId]` so it is
* filesystem-safe for arbitrary unicode/control-character inputs and always
* bounded in length. Tuple encoding makes it impossible to collide two distinct
* `(provider, profileId)` pairs by separator-sensitive string concatenation.
*
* This lock is the serialization point that prevents the `refresh_token_reused`
* storm when N agents share one OAuth profile (see issue #26322): every agent
* that attempts a refresh acquires this same file lock, so only one HTTP
* refresh is in-flight at a time and peers can adopt the resulting fresh
* credentials instead of racing against a single-use refresh token.
*
* The key intentionally includes `provider` so that two profiles that
* happen to share a `profileId` across providers (operator-renamed profile,
* test fixture, etc.) do not needlessly serialize against each other.
*/
function resolveOAuthRefreshLockPath(provider, profileId) {
	const safeId = `lock-${oauthLockPathDigest(JSON.stringify([provider, profileId]))}`;
	return path.join(resolveStateDir(), "locks", "oauth-refresh", safeId);
}
function oauthLockPathDigest(value) {
	let left = 14695981039346656037n;
	let right = 11160318154034397263n;
	const prime = 1099511628211n;
	const mask = 18446744073709551615n;
	for (const byte of Buffer.from(value, "utf8")) {
		const octet = BigInt(byte);
		left = (left ^ octet) * prime & mask;
		right = (right ^ octet + 11400714819323198485n) * prime & mask;
	}
	return `${left.toString(16).padStart(16, "0")}${right.toString(16).padStart(16, "0")}`;
}
//#endregion
export { resolveAuthStorePathForDisplay as n, resolveOAuthRefreshLockPath as r, resolveAuthStatePathForDisplay as t };
