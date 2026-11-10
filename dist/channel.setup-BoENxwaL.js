import { r as zalouserSetupContract } from "./setup-core-Bb2UCJ5e.js";
import { t as createZalouserPluginBase } from "./shared-Bq8geInT.js";
import { t as zalouserSetupWizard } from "./setup-surface-BIzVzgo7.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
