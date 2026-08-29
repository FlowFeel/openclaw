import { L as RealtimeVoiceProviderPlugin, g as PluginLogger } from "../../plugin-entry-d4GRo0oQ.js";
import { r as createOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-CsVR7RnE.js";

//#region extensions/openai/realtime-voice-provider.d.ts
type OpenAIQuicksilverBrowserSessionBroker = ReturnType<typeof createOpenAIQuicksilverBrowserSessionBroker>["broker"];
declare function buildOpenAIRealtimeVoiceProvider(options?: {
  quicksilverBrowserSessionBroker?: OpenAIQuicksilverBrowserSessionBroker;
  logger?: Pick<PluginLogger, "debug" | "warn">;
}): RealtimeVoiceProviderPlugin;
//#endregion
export { buildOpenAIRealtimeVoiceProvider };