import { g as PluginLogger } from "../../plugin-entry-d4GRo0oQ.js";
import { n as OpenClawConfig } from "../../types.openclaw-CN87qdMl.js";
import { r as createOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-CsVR7RnE.js";

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