import { r as zalouserSetupContract } from "./setup-core-BIifkaHw.js";
import { t as createZalouserPluginBase } from "./shared-DcH53lRr.js";
import { t as zalouserSetupWizard } from "./setup-surface-BeD0ydus.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
