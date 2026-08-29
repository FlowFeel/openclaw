import { s as OpenClawPluginApi } from "../../plugin-entry-rqx6-3xm.js";
import { S as ActiveRecallResult, g as ActiveMemorySearchDebug, ot as ResolvedActiveRecallPluginConfig } from "../../types-MN9FJk_h.js";

//#region extensions/active-memory/session.d.ts
declare function resolveCanonicalSessionKeyFromSessionId(params: {
  api: OpenClawPluginApi;
  agentId: string;
  sessionId?: string;
}): string | undefined;
declare function resolveRecallRunChannelContext(params: {
  api: OpenClawPluginApi;
  agentId: string;
  sessionKey?: string;
  sessionId?: string;
  messageProvider?: string;
  channelId?: string;
}): {
  messageChannel?: string;
  messageProvider?: string;
};
declare function resolveStatusUpdateAgentId(ctx: {
  agentId?: string;
  sessionKey?: string;
}): string;
declare function buildPluginStatusLine(params: {
  result: ActiveRecallResult;
  config: ResolvedActiveRecallPluginConfig;
}): string;
declare function buildPersistedDebugSummary(result: ActiveRecallResult): string | null;
declare function persistPluginStatusLines(params: {
  api: OpenClawPluginApi;
  agentId: string;
  sessionKey?: string;
  statusLine?: string;
  debugSummary?: string | null;
  searchDebug?: ActiveMemorySearchDebug;
}): Promise<void>;
//#endregion
export { buildPersistedDebugSummary, buildPluginStatusLine, persistPluginStatusLines, resolveCanonicalSessionKeyFromSessionId, resolveRecallRunChannelContext, resolveStatusUpdateAgentId };