import { r as zalouserSetupContract } from "./setup-core-B9L4yOgR.js";
import { t as createZalouserPluginBase } from "./shared-DTnfwQYM.js";
import { t as zalouserSetupWizard } from "./setup-surface-BX4D1gTF.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
