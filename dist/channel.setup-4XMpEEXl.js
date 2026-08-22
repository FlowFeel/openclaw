import { r as zalouserSetupContract } from "./setup-core-BSu_XhtR.js";
import { t as createZalouserPluginBase } from "./shared-BvmbEDV5.js";
import { t as zalouserSetupWizard } from "./setup-surface-CLZvCcjR.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
