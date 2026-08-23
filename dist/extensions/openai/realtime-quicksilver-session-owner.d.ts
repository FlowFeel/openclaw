import { g as PluginLogger } from "../../plugin-entry-D2U6D_c3.js";
import { n as OpenClawConfig } from "../../types.openclaw-_47ZKysp.js";
import { r as createOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-ChR_GnCk.js";

//#region extensions/openai/realtime-quicksilver-session-owner.d.ts
type BrokerSession = ReturnType<typeof createOpenAIQuicksilverBrowserSessionBroker>;
type BrokerParams = {
  getConfig: () => OpenClawConfig | undefined;
  logger: Pick<PluginLogger, "debug" | "warn">;
};
declare function acquireOpenAIQuicksilverBrowserSessionBroker(params: BrokerParams): BrokerSession;
declare function releaseOpenAIQuicksilverBrowserSessionBroker(session: BrokerSession): Promise<void>;
//#endregion
export { acquireOpenAIQuicksilverBrowserSessionBroker, releaseOpenAIQuicksilverBrowserSessionBroker };