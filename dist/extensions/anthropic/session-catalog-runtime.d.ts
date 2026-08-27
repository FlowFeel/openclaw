import { n as OpenClawConfig } from "../../types.openclaw-C0MxgyRv.js";
import { N as SessionCatalogEntrySnapshot } from "../../types-BNarcMbg.js";
import { n as OpenClawPluginApi } from "../../plugin-entry-B5PMaQG5.js";
//#region extensions/anthropic/session-catalog-runtime.d.ts
declare function currentClaudeSessionCatalogConfig(api: OpenClawPluginApi): OpenClawConfig;
declare function listBoundClaudeSessions(api: OpenClawPluginApi, sessionEntries?: SessionCatalogEntrySnapshot): Map<string, string>;
/**
 * Resolve the Claude model an agent actually routes to the Claude CLI backend.
 * Callers must not assume the current default is routed: existing configs pin
 * older Claude models, and stamping the default onto their sessions would
 * select a model the operator never routed or allowed.
 */
declare function resolveClaudeCliRoutedModelId(config: OpenClawConfig, agentId: string): string | undefined;
declare function resolveClaudeCatalogCreateSession(api: OpenClawPluginApi, requestedAgentId?: string): {
  model: string;
  agentRuntime: string;
} | undefined;
//#endregion
export { currentClaudeSessionCatalogConfig, listBoundClaudeSessions, resolveClaudeCatalogCreateSession, resolveClaudeCliRoutedModelId };