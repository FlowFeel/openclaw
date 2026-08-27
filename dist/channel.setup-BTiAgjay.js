import { r as zalouserSetupContract } from "./setup-core-BeMK4T-Z.js";
import { t as createZalouserPluginBase } from "./shared-ByotHq2g.js";
import { t as zalouserSetupWizard } from "./setup-surface-BjYGhF6U.js";
//#region extensions/zalouser/src/channel.setup.ts
const zalouserSetupPlugin = { ...createZalouserPluginBase({
	setupWizard: zalouserSetupWizard,
	setupContract: zalouserSetupContract
}) };
//#endregion
export { zalouserSetupPlugin as t };
