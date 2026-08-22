import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { f as resolveDefaultAgentId, n as listAgentEntries, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
//#region src/agents/workspace-dirs.ts
/** Lists unique workspace directories for configured agents and the default agent. */
function listAgentWorkspaceDirs(cfg) {
	const dirs = /* @__PURE__ */ new Set();
	for (const entry of listAgentEntries(cfg)) dirs.add(resolveAgentWorkspaceDir(cfg, entry.id));
	dirs.add(resolveAgentWorkspaceDir(cfg, resolveDefaultAgentId(cfg)));
	return [...dirs];
}
/** Lists only entry-authored workspace paths without requiring a valid default marker. */
function listExplicitAgentWorkspaceDirs(cfg) {
	const dirs = /* @__PURE__ */ new Set();
	for (const entry of listAgentEntries(cfg)) {
		const workspace = typeof entry.workspace === "string" ? entry.workspace.trim() : "";
		if (workspace) dirs.add(resolveUserPath(workspace));
	}
	return [...dirs];
}
//#endregion
export { listExplicitAgentWorkspaceDirs as n, listAgentWorkspaceDirs as t };
