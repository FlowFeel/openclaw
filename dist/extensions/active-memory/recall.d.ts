import { n as OpenClawConfig } from "../../types.openclaw-BsftVpqJ.js";
import { s as OpenClawPluginApi } from "../../plugin-entry-rqx6-3xm.js";
import { E as ConversationRecallContext, S as ActiveRecallResult, ot as ResolvedActiveRecallPluginConfig } from "../../types-MN9FJk_h.js";

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