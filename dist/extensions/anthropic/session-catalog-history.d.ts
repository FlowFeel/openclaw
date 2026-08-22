import { n as OpenClawConfig } from "../../types.openclaw-B2WvMv3k.js";
import { t as ClaudeTranscriptItem } from "../../session-catalog-transcript-xA6TtbpC.js";

//#region extensions/anthropic/session-catalog-history.d.ts
declare function importClaudeHistory(params: {
  items: ClaudeTranscriptItem[];
  threadId: string;
  sessionId: string;
  sessionKey: string;
  agentId: string;
  storePath: string;
  cwd?: string;
  config: OpenClawConfig;
}): Promise<void>;
//#endregion
export { importClaudeHistory };