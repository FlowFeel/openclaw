import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
//#region extensions/discord/subagent-hooks-api.ts
const loadDiscordSubagentHooksModule = createLazyRuntimeModule(() => import("./subagent-hooks-Cc0_XdNr.js"));
const loadDiscordSubagentProgressModule = createLazyRuntimeModule(() => import("./subagent-progress-8P8F0pEP.js"));
function registerDiscordSubagentHooks(api) {
	api.on("gateway_start", async () => {
		const { recoverDiscordSubagentProgress } = await loadDiscordSubagentProgressModule();
		await recoverDiscordSubagentProgress(api);
	});
	api.on("subagent_ended", async (event) => {
		const { handleDiscordSubagentEnded } = await loadDiscordSubagentHooksModule();
		handleDiscordSubagentEnded(event);
	});
	api.on("subagent_delivery_target", async (event) => {
		const { handleDiscordSubagentDeliveryTarget } = await loadDiscordSubagentHooksModule();
		return handleDiscordSubagentDeliveryTarget(event);
	});
}
//#endregion
export { registerDiscordSubagentHooks as t };
