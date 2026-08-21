import { K as validateCommandsListParams } from "./src-BSn6va4B.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as buildCommandsListResult } from "./commands-list-result-gRleqChn.js";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-BJBtOhUA.js";
//#region src/gateway/server-methods/commands.ts
/** Gateway handler for enumerating available chat/native commands. */
const commandsHandlers = { "commands.list": ({ params, respond, context }) => {
	if (!assertValidParams(params, validateCommandsListParams, "commands.list", respond)) return;
	const resolved = resolveAgentIdOrRespondError({
		rawAgentId: params.agentId,
		respond,
		cfg: context.getRuntimeConfig(),
		normalize: (rawAgentId) => typeof rawAgentId === "string" ? rawAgentId.trim() : void 0
	});
	if (!resolved) return;
	respond(true, buildCommandsListResult({
		cfg: resolved.cfg,
		agentId: resolved.agentId,
		provider: params.provider,
		scope: params.scope,
		includeArgs: params.includeArgs
	}), void 0);
} };
//#endregion
export { commandsHandlers };
