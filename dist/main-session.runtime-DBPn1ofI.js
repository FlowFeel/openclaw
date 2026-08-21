import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
//#region src/config/sessions/main-session.runtime.ts
/** Resolves the main session key from the active runtime config. */
function resolveMainSessionKeyFromConfig() {
	return resolveMainSessionKey(getRuntimeConfig());
}
//#endregion
export { resolveMainSessionKeyFromConfig as t };
