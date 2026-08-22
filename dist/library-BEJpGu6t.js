import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import { c as normalizeE164 } from "./utils-Bs67j6-3.js";
import { i as loadConfig } from "./io-DCw4R0kD.js";
import "./config-UtpOr1Uw.js";
import { i as handlePortError, n as describePortOwner, r as ensurePortAvailable, t as PortInUseError } from "./ports-DvrijSVP.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { n as resolveSessionKey, t as deriveSessionKey } from "./session-key-CY0q26lB.js";
import { t as applyTemplate } from "./templating-CLmjS51i.js";
import { r as saveLegacySessionStore, t as loadLegacySessionStore } from "./state-migrations.legacy-session-store-gCfs5hUt.js";
import { t as createDefaultDeps } from "./deps-DjEsu1aS.js";
//#region src/cli/wait.ts
function waitForever() {
	setInterval(() => {}, 1e6);
	return new Promise(() => {});
}
//#endregion
//#region src/library.ts
const loadReplyRuntime = createLazyRuntimeModule(() => import("./reply.runtime.js"));
const loadPromptRuntime = createLazyRuntimeModule(() => import("./prompt-B7EijTXm.js"));
const loadBinariesRuntime = createLazyRuntimeModule(() => import("./binaries-CK5_i3G-.js"));
const loadExecRuntime = createLazyRuntimeModule(() => import("./exec-D94KMckO.js"));
const loadWebChannelRuntime = createLazyRuntimeModule(() => import("./runtime-web-channel-plugin-DZj6B89I.js"));
const getReplyFromConfig = async (...args) => (await loadReplyRuntime()).getReplyFromConfig(...args);
const promptYesNo = async (...args) => (await loadPromptRuntime()).promptYesNo(...args);
const ensureBinary = async (...args) => (await loadBinariesRuntime()).ensureBinary(...args);
const runExec = async (...args) => (await loadExecRuntime()).runExec(...args);
const runCommandWithTimeout = async (...args) => (await loadExecRuntime()).runCommandWithTimeout(...args);
const monitorWebChannel = async (...args) => (await loadWebChannelRuntime()).monitorWebChannel(...args);
/**
* @deprecated Legacy sessions.json compatibility for package-root consumers.
* Use SQLite-backed session APIs. Remove after 2026-10-12, once the v2026.7.x
* upgrade window no longer requires the legacy doctor importer.
*/
function loadSessionStore(storePath, options) {
	return loadLegacySessionStore(storePath, options);
}
/**
* @deprecated Legacy sessions.json compatibility for package-root consumers.
* Use SQLite-backed session APIs. Remove after 2026-10-12, once the v2026.7.x
* upgrade window no longer requires the legacy doctor importer.
*/
async function saveSessionStore(storePath, store, options) {
	await saveLegacySessionStore(storePath, store, options);
}
//#endregion
export { PortInUseError, applyTemplate, createDefaultDeps, deriveSessionKey, describePortOwner, ensureBinary, ensurePortAvailable, getReplyFromConfig, handlePortError, loadConfig, loadSessionStore, monitorWebChannel, normalizeE164, promptYesNo, resolveSessionKey, resolveStorePath, runCommandWithTimeout, runExec, saveSessionStore, waitForever };
