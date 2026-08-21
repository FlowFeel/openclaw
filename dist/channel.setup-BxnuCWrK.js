import { r as zalouserSetupContract } from "./setup-core-Y5bIeeRE.js";
import { t as createZalouserPluginBase } from "./shared-Bw42L9PR.js";
import { t as zalouserSetupWizard } from "./setup-surface-Bc-E4XAZ.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
