import { a as hasGatewayClientCap, n as GATEWAY_CLIENT_IDS, t as GATEWAY_CLIENT_CAPS } from "./client-info-Dlrmm4mP.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Xi as validateUiCommandParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
//#region src/gateway/server-methods/ui-command.ts
const uiCommandHandlers = { "ui.command": ({ params, respond, context }) => {
	if (!assertValidParams(params, validateUiCommandParams, "ui.command", respond)) return;
	const commandParams = params;
	const connIds = context.getClientConnIds?.((client) => client.connect.client.id === GATEWAY_CLIENT_IDS.CONTROL_UI && hasGatewayClientCap(client.connect.caps, GATEWAY_CLIENT_CAPS.UI_COMMANDS)) ?? /* @__PURE__ */ new Set();
	if (connIds.size === 0) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "no ui client"));
		return;
	}
	context.broadcastToConnIds("ui.command", commandParams, connIds);
	respond(true, { ok: true });
} };
//#endregion
export { uiCommandHandlers };
