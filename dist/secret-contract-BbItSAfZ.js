import { i as createChannelSecretTargetRegistryEntries, o as getChannelSurface, r as collectSimpleChannelFieldAssignments } from "./channel-secret-basic-runtime-_ZKJbKbs.js";
import "./channel-secret-basic-runtime-oPyge9AJ.js";
//#region extensions/buzz/src/secret-contract.ts
const secretTargetRegistryEntries = createChannelSecretTargetRegistryEntries({
	channelKey: "buzz",
	channel: ["privateKey", "authTag"]
});
function collectRuntimeConfigAssignments(params) {
	const resolved = getChannelSurface(params.config, "buzz");
	if (!resolved) return;
	const { channel, surface } = resolved;
	for (const field of ["privateKey", "authTag"]) collectSimpleChannelFieldAssignments({
		channelKey: "buzz",
		field,
		channel,
		surface,
		defaults: params.defaults,
		context: params.context,
		topInactiveReason: "Buzz channel is disabled.",
		accountInactiveReason: "Buzz channel is disabled."
	});
}
const channelSecrets = {
	secretTargetRegistryEntries,
	collectRuntimeConfigAssignments
};
//#endregion
export { collectRuntimeConfigAssignments as n, secretTargetRegistryEntries as r, channelSecrets as t };
