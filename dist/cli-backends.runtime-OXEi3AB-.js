import { t as getActiveRuntimePluginRegistry } from "./active-runtime-registry-3hUls5u9.js";
//#region src/plugins/cli-backends.runtime.ts
/** Resolves CLI backends from the active runtime plugin registry. */
function resolveRuntimeCliBackends() {
	return (getActiveRuntimePluginRegistry()?.cliBackends ?? []).map((entry) => Object.assign({}, entry.backend, {
		pluginId: entry.pluginId,
		builtWithOpenClawVersion: entry.builtWithOpenClawVersion
	}));
}
//#endregion
export { resolveRuntimeCliBackends as t };
