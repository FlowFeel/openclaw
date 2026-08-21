import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { d as getActivePluginRegistry, k as getPluginRuntimeGatewayRequestScope } from "./runtime-yJAYArQt.js";
import "./agent-scope-DyEposw2.js";
import { Bt as validateHooksStatusParams } from "./src-BSn6va4B.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as loadWorkspaceHookEntries } from "./workspace-CzNo83_N.js";
import { t as buildWorkspaceHookStatus } from "./hooks-status-cTlM29yD.js";
//#region src/gateway/server-methods/hooks-status.ts
/** Gateway handler for the live hook status report. */
const hooksStatusHandlers = { "hooks.status": ({ params, respond, context }) => {
	if (!assertValidParams(params, validateHooksStatusParams, "hooks.status", respond)) return;
	const config = context.getRuntimeConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	respond(true, buildWorkspaceHookStatus(workspaceDir, {
		config,
		entries: [...(getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry())?.hooks.map((hook) => hook.entry) ?? [], ...loadWorkspaceHookEntries(workspaceDir, { config })]
	}), void 0);
} };
//#endregion
export { hooksStatusHandlers };
