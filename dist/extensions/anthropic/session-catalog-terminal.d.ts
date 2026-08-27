import { P as SessionCatalogTerminalPlan } from "../../types-BykvrQHR.js";
import { n as OpenClawPluginApi } from "../../plugin-entry-DoQDAyTc.js";
//#region extensions/anthropic/session-catalog-terminal.d.ts
type ClaudeTerminalDependencies = {
  listClaudeSessions: () => Promise<Array<{
    threadId: string;
    source?: string;
    filePath: string;
    cwd?: string;
  }>>;
  resolveNodeClaudeRecord: (params: {
    runtime: OpenClawPluginApi["runtime"];
    nodeId: string;
    threadId: string;
  }) => Promise<{
    source?: string;
    cwd?: string;
  }>;
};
declare function isClaudeCliAvailable(pathEnv?: string): boolean;
declare function claudeNodeTerminalCapability(node: {
  connected?: boolean;
  commands?: string[];
  invocableCommands?: string[];
}): {
  canOpenTerminalClaude?: true;
};
declare function terminalEligibility(host: {
  hostId: string;
  canOpenTerminalClaude?: boolean;
}, source: string | undefined, localCliAvailable: boolean): {
  localResumable: boolean;
  canOpenTerminal: boolean;
};
declare function openClaudeCatalogTerminal(params: {
  api: OpenClawPluginApi;
  hostId: string;
  threadId: string;
} & ClaudeTerminalDependencies): Promise<SessionCatalogTerminalPlan>;
//#endregion
export { claudeNodeTerminalCapability, isClaudeCliAvailable, openClaudeCatalogTerminal, terminalEligibility };