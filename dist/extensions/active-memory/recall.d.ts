import { n as OpenClawConfig } from "../../types.openclaw-DZDgdSgX.js";
import { s as OpenClawPluginApi } from "../../plugin-entry-V3twzgF5.js";
import { E as ConversationRecallContext, S as ActiveRecallResult, ot as ResolvedActiveRecallPluginConfig } from "../../types-C2eFlfUM.js";

//#region extensions/active-memory/recall.d.ts
type ActiveRecallParams = {
  api: OpenClawPluginApi;
  runtimeConfig: OpenClawConfig;
  config: ResolvedActiveRecallPluginConfig;
  agentId: string;
  sessionKey?: string;
  sessionId?: string;
  messageProvider?: string;
  channelId?: string;
  query: string;
  searchQuery: string;
  currentModelProviderId?: string;
  currentModelId?: string;
  conversationRecall?: ConversationRecallContext;
  abortSignal?: AbortSignal;
  runId?: string;
};
declare function maybeResolveActiveRecall(params: ActiveRecallParams): Promise<ActiveRecallResult>;
//#endregion
export { maybeResolveActiveRecall };