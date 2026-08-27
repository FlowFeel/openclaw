import { L as RealtimeVoiceProviderPlugin, g as PluginLogger } from "../../plugin-entry-DICCbWcY.js";
import { r as createOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-D1_PEm_e.js";

//#region extensions/openai/realtime-voice-provider.d.ts
type OpenAIQuicksilverBrowserSessionBroker = ReturnType<typeof createOpenAIQuicksilverBrowserSessionBroker>["broker"];
declare function buildOpenAIRealtimeVoiceProvider(options?: {
  quicksilverBrowserSessionBroker?: OpenAIQuicksilverBrowserSessionBroker;
  logger?: Pick<PluginLogger, "debug" | "warn">;
}): RealtimeVoiceProviderPlugin;
//#endregion
export { buildOpenAIRealtimeVoiceProvider };