import { g as resolveGatewayPort } from "./paths-CL43LNS6.js";
import { i as GATEWAY_CLIENT_NAMES, r as GATEWAY_CLIENT_MODES } from "./client-info-Dlrmm4mP.js";
import { c as callGateway } from "./call-YSl9HPoR.js";
//#region src/cli/plugins-update-gateway-signal.ts
/** Notifies the local Gateway that persisted plugin metadata changed without config writes. */
async function notifyGatewayPluginMetadataChanged(config, deps = {}) {
	try {
		await (deps.callGateway ?? callGateway)({
			config,
			method: "plugins.refresh",
			params: {},
			timeoutMs: 1e3,
			localPortOverride: resolveGatewayPort(config),
			ignoreEnvUrlOverride: true,
			requiredMethods: ["plugins.refresh"],
			scopes: ["operator.admin"],
			clientName: GATEWAY_CLIENT_NAMES.CLI,
			mode: GATEWAY_CLIENT_MODES.CLI
		});
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { notifyGatewayPluginMetadataChanged as t };
