import { n as OpenClawConfig } from "../../types.openclaw-CXX8ljmy.js";
import { s as OpenClawPluginApi } from "../../plugin-entry-i32wLQY9.js";
import { E as ConversationRecallContext, at as RecallSubagentResult, d as ActiveMemoryFastMode, ot as ResolvedActiveRecallPluginConfig, y as ActiveMemoryTranscriptSource } from "../../types-CDBuSTev.js";

//#region extensions/active-memory/recall-run.d.ts
declare function runRecallSubagent(params: {
  api: OpenClawPluginApi;
  runtimeConfig: OpenClawConfig;
  config: ResolvedActiveRecallPluginConfig;
  agentId: string;
  parentSessionKey?: string;
  sessionId?: string;
  messageProvider?: string;
  channelId?: string;
  query: string;
  searchQuery: string;
  currentModelProviderId?: string;
  currentModelId?: string;
  modelRef?: {
    provider: string;
    model: string;
  };
  conversationRecall?: ConversationRecallContext;
  storePath: string;
  fastMode?: ActiveMemoryFastMode;
  abortSignal?: AbortSignal;
  onTranscriptSources?: (sources: readonly ActiveMemoryTranscriptSource[]) => void;
}): Promise<RecallSubagentResult>;
//#endregion
export { runRecallSubagent };