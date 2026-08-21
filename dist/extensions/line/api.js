import { n as lineChannelPluginCommon, t as linePlugin } from "../../channel-BGA1WTOa.js";
import { r as lineSetupContract, t as lineSetupWizard } from "../../setup-surface-BkLKNaNA.js";
//#region extensions/line/src/channel.setup.ts
const lineSetupPlugin = {
	id: "line",
	...lineChannelPluginCommon,
	setupWizard: lineSetupWizard,
	setupContract: lineSetupContract
};
//#endregion
export { linePlugin, lineSetupPlugin };
