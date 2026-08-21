import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { n as resolveBundledPluginsDir } from "./bundled-dir-Ble_JuKC.js";
import { r as resolveDefaultPluginExtensionsDir } from "./install-paths-D18EkQi8.js";
import path from "node:path";
//#region src/plugins/roots.ts
function resolvePluginSourceRoots(params) {
	const env = params.env ?? process.env;
	const workspaceRoot = params.workspaceDir ? resolveUserPath(params.workspaceDir, env) : void 0;
	return {
		stock: resolveBundledPluginsDir(env),
		global: resolveDefaultPluginExtensionsDir(env),
		workspace: workspaceRoot ? path.join(workspaceRoot, ".openclaw", "extensions") : void 0
	};
}
function resolvePluginCacheInputs(params) {
	const env = params.env ?? process.env;
	return {
		roots: resolvePluginSourceRoots({
			workspaceDir: params.workspaceDir,
			env
		}),
		loadPaths: normalizeStringEntries((params.loadPaths ?? []).filter((entry) => typeof entry === "string")).map((entry) => resolveUserPath(entry, env))
	};
}
//#endregion
export { resolvePluginSourceRoots as n, resolvePluginCacheInputs as t };
