import { c as resolveAuthProfileDatabasePath } from "./sqlite-Dtmuz_Ar.js";
//#region src/secrets/runtime-auth-profile-owner.ts
/** Stable SecretRef owner identity for one agent-scoped auth profile. */
/** Tuple encoding distinguishes agents and avoids path/profile separator collisions. */
function resolveAuthProfileSecretOwnerId(params) {
	return JSON.stringify([resolveAuthProfileDatabasePath(params.agentDir), params.profileId]);
}
//#endregion
export { resolveAuthProfileSecretOwnerId as t };
