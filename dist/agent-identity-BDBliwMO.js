import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as classifySessionKeyShape, f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { t as validateAgentIdentityParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./sessions-CBo4LOdS.js";
import { n as resolvePublicAgentAvatarSource } from "./identity-avatar-DEDjjlJG.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { n as resolveAssistantIdentity } from "./assistant-identity-D3UsKBOR.js";
import { n as resolveGatewayAssistantAvatar } from "./assistant-avatar-LRWpsT1w.js";
//#region src/gateway/server-methods/agent-identity.ts
const agentIdentityGetHandler = ({ params, respond, context }) => {
	if (!assertValidParams(params, validateAgentIdentityParams, "agent.identity.get", respond)) return;
	const agentIdRaw = normalizeOptionalString(params.agentId) ?? "";
	const sessionKeyRaw = normalizeOptionalString(params.sessionKey) ?? "";
	let agentId = agentIdRaw ? normalizeAgentId(agentIdRaw) : void 0;
	if (sessionKeyRaw) {
		if (classifySessionKeyShape(sessionKeyRaw) === "malformed_agent") {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid agent.identity.get params: malformed session key "${sessionKeyRaw}"`));
			return;
		}
		const resolved = resolveAgentIdFromSessionKey(sessionKeyRaw);
		if (agentId && resolved !== agentId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `invalid agent.identity.get params: agent "${agentIdRaw}" does not match session key agent "${resolved}"`));
			return;
		}
		agentId = resolved;
	}
	const cfg = context.getRuntimeConfig();
	const identity = resolveAssistantIdentity({
		cfg,
		agentId
	});
	const avatarProjection = resolveGatewayAssistantAvatar({
		cfg,
		identity
	});
	const avatarResolution = avatarProjection.resolution;
	respond(true, {
		...identity,
		avatar: avatarProjection.avatar,
		avatarSource: avatarResolution ? resolvePublicAgentAvatarSource(avatarResolution) : void 0,
		avatarStatus: avatarResolution?.kind,
		avatarReason: avatarResolution?.kind === "none" ? avatarResolution.reason : void 0
	}, void 0);
};
const agentIdentityHandlers = { "agent.identity.get": agentIdentityGetHandler };
//#endregion
export { agentIdentityHandlers };
