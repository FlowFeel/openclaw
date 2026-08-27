import { n as OpenClawPluginApi } from "../../plugin-entry-DoQDAyTc.js";
import { CLAUDE_CLI_NODE_RUN_COMMAND, CLAUDE_SESSIONS_LIST_COMMAND, CLAUDE_SESSION_READ_COMMAND, CLAUDE_TERMINAL_RESUME_COMMAND, ClaudeCatalogParamsError, isResumableClaudeSource } from "./session-catalog-shared.js";
import { ClaudeSessionCatalogPage, ClaudeSessionTranscriptPage } from "./session-catalog-types.js";

//#region extensions/anthropic/session-catalog.d.ts
declare function listLocalClaudeSessionPage(value: unknown, homeDir?: string): Promise<ClaudeSessionCatalogPage>;
declare function readLocalClaudeTranscriptPage(value: unknown, homeDir?: string): Promise<Omit<ClaudeSessionTranscriptPage, "hostId" | "label">>;
declare function registerClaudeSessionCatalog(api: OpenClawPluginApi): void;
//#endregion
export { CLAUDE_CLI_NODE_RUN_COMMAND, CLAUDE_SESSIONS_LIST_COMMAND, CLAUDE_SESSION_READ_COMMAND, CLAUDE_TERMINAL_RESUME_COMMAND, ClaudeCatalogParamsError, isResumableClaudeSource, listLocalClaudeSessionPage, readLocalClaudeTranscriptPage, registerClaudeSessionCatalog };