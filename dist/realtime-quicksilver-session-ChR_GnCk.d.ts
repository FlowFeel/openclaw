import { H as RealtimeVoiceBrowserSession, U as RealtimeVoiceBrowserSessionCreateRequest, W as RealtimeVoiceProviderCapabilities, g as PluginLogger } from "./plugin-entry-D2U6D_c3.js";
import { n as OpenClawConfig } from "./types.openclaw-_47ZKysp.js";
import { r as OpenAIQuicksilverInitialItem, t as OpenAIQuicksilverAuth } from "./realtime-quicksilver-wire-D5CFFb_y.js";
import { n as OpenAIQuicksilverSocketFactory } from "./realtime-quicksilver-sideband-Dz6zybpI.js";
import { IncomingMessage, ServerResponse } from "node:http";

//#region extensions/openai/realtime-quicksilver-session.d.ts
declare const OPENAI_QUICKSILVER_OFFER_PATH = "/plugins/openai/realtime/calls";
declare const OPENAI_QUICKSILVER_CAPABILITIES: {
  transports: ("webrtc" | "gateway-relay")[];
  handlesAgentConsult: true;
  supportsToolCalls: false;
  supportsVideoFrames: false;
};
type OpenAIQuicksilverSessionRequest = RealtimeVoiceBrowserSessionCreateRequest & {
  initialItems?: OpenAIQuicksilverInitialItem[];
};
declare function resolveOpenAIChatGptSubscriptionAuth(params: {
  cfg?: OpenClawConfig;
  agentDir?: string;
}): Promise<Extract<OpenAIQuicksilverAuth, {
  type: "oauth";
}> | undefined>;
declare function createOpenAIQuicksilverBrowserSessionBroker(params: {
  getConfig: () => OpenClawConfig | undefined;
  logger: Pick<PluginLogger, "debug" | "warn">;
  fetchImpl?: typeof fetch;
  webSocketFactory?: OpenAIQuicksilverSocketFactory;
}): {
  broker: {
    capabilities: Partial<RealtimeVoiceProviderCapabilities> & {
      handlesAgentConsult: true;
    };
    createBrowserSession: (request: OpenAIQuicksilverSessionRequest, auth: OpenAIQuicksilverAuth) => Promise<RealtimeVoiceBrowserSession>;
    cancelBrowserSession: (session: RealtimeVoiceBrowserSession) => void;
  };
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
  cleanup: () => Promise<void>;
};
//#endregion
export { resolveOpenAIChatGptSubscriptionAuth as i, OPENAI_QUICKSILVER_OFFER_PATH as n, createOpenAIQuicksilverBrowserSessionBroker as r, OPENAI_QUICKSILVER_CAPABILITIES as t };