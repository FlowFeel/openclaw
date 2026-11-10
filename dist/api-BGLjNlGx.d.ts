import { w as OpenClawPluginToolContext } from "./types-CFJXaPHi.js";
import { n as ChannelSetupWizard } from "./types.public-CFhLhhWm.js";
import { d as ChannelSetupInput, u as ChannelSetupAdapter } from "./manifest-registry-5PUiQp1v.js";
import { t as AnyAgentTool } from "./plugin-entry-rqx6-3xm.js";
//#region extensions/zalouser/src/tool.d.ts
type ZalouserToolContext = Pick<OpenClawPluginToolContext, "deliveryContext">;
declare function createZalouserTool(context?: ZalouserToolContext): AnyAgentTool;
//#endregion
//#region extensions/zalouser/src/setup-core.d.ts
declare const zalouserSetupAdapter: ChannelSetupAdapter<ChannelSetupInput>;
declare function createZalouserSetupWizardProxy(loadWizard: () => Promise<ChannelSetupWizard>): ChannelSetupWizard;
//#endregion
//#region extensions/zalouser/src/setup-surface.d.ts
declare const zalouserSetupWizard: ChannelSetupWizard;
//#endregion
export { createZalouserTool as i, createZalouserSetupWizardProxy as n, zalouserSetupAdapter as r, zalouserSetupWizard as t };