import { n as lineChannelPluginCommon, t as linePlugin } from "../../channel-Dv2vf-v6.js";
import { r as lineSetupContract, t as lineSetupWizard } from "../../setup-surface-ycrTNH4J.js";
//#region extensions/line/src/channel.setup.ts
const lineSetupPlugin = {
	id: "line",
	...lineChannelPluginCommon,
	setupWizard: lineSetupWizard,
	setupContract: lineSetupContract
};
//#endregion
export { linePlugin, lineSetupPlugin };
