import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { a as validateVoiceWakeRoutingConfigInput, i as setVoiceWakeRoutingConfig, n as normalizeVoiceWakeRoutingConfig, t as loadVoiceWakeRoutingConfig } from "./voicewake-routing-D5Hy03MN.js";
//#region src/gateway/server-methods/voicewake-routing.ts
/** Gateway request handlers for reading and updating voice wake routing. */
const voicewakeRoutingHandlers = {
	"voicewake.routing.get": async ({ respond }) => {
		respond(true, { config: await loadVoiceWakeRoutingConfig() });
	},
	"voicewake.routing.set": async ({ params, respond, context }) => {
		if (!params || params.config === null || typeof params.config !== "object" || Array.isArray(params.config)) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "voicewake.routing.set requires config: object"));
			return;
		}
		const validated = validateVoiceWakeRoutingConfigInput(params.config);
		if (!validated.ok) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, validated.message));
			return;
		}
		const config = await setVoiceWakeRoutingConfig(normalizeVoiceWakeRoutingConfig(params.config));
		context.broadcastVoiceWakeRoutingChanged(config);
		respond(true, { config });
	}
};
//#endregion
export { voicewakeRoutingHandlers };
