import { r as OpenClawConfig } from "../types.openclaw-DqdTE9e3.js";
import { Aa as listSessionCatalogEntries, Ca as SessionUpstreamActivity, Da as createSessionCatalogAdoptionCoordinator, Ea as SessionUpstreamProbe, Ma as sessionCatalogAdoptedSessionKey, Na as sessionCatalogAdoptedSourceKey, Oa as isExternalUserText, Sa as SessionCatalogTerminalPlan, Ta as SessionUpstreamKind, _a as SessionCatalogEntrySnapshot, ba as SessionCatalogProvider, ga as SessionCatalogContinueProviderResult, ha as SessionCatalogContinueProviderParams, ja as normalizeUserText, ka as listAdoptedSessionCatalogSessions, ma as SessionCatalogArchiveProviderParams, va as SessionCatalogEntrySummary, wa as SessionUpstreamJsonValue, xa as SessionCatalogReadProviderParams, ya as SessionCatalogListProviderParams } from "../types-BMOPjNqu.js";
import { E as OpenClawStateDatabaseOptions } from "../types-C716i8hP.js";
import { A as SessionsCatalogArchiveResult, C as SessionCatalogDescriptor, D as SessionCatalogSession, E as SessionCatalogPullRequestSummary, F as SessionsCatalogReadParams, I as SessionsCatalogReadResult, M as SessionsCatalogContinueResult, N as SessionsCatalogListParams, O as SessionCatalogTranscriptItem, P as SessionsCatalogListResult, S as SessionCatalogCapabilities, T as SessionCatalogLocator, j as SessionsCatalogContinueParams, k as SessionsCatalogArchiveParams, w as SessionCatalogHost, x as SessionCatalog } from "../index-Cxqmod1M.js";

//#region src/plugins/session-catalog-history-import.d.ts
declare function importSessionCatalogHistory(params: {
  catalogId: string;
  threadId: string;
  read: (params: {
    cursor?: string;
    limit: number;
  }) => Promise<SessionsCatalogReadResult>;
  sessionId: string;
  sessionKey: string;
  agentId: string;
  cwd?: string;
  config: OpenClawConfig;
}): Promise<void>;
//#endregion
//#region src/sessions/session-upstream-links.d.ts
declare function upsertSessionUpstreamLink(input: {
  sessionKey: string;
  agentId: string;
  catalogId: string;
  hostId: string;
  threadId: string;
  upstreamKind: SessionUpstreamKind;
  upstreamRef: SessionUpstreamJsonValue;
  marker: SessionUpstreamJsonValue;
}, options?: OpenClawStateDatabaseOptions & {
  now?: number;
}): boolean;
declare function deleteSessionUpstreamLink(sessionKey: string, agentId: string, options?: OpenClawStateDatabaseOptions): void;
//#endregion
//#region src/gateway/cli-session-history.claude-activity.d.ts
type ClaudeCliHistoryLineClassification = {
  humanTurn: boolean;
  occurredAt?: number;
  userText?: string;
};
/** Classifies one native JSONL row through the same filters used by history import. */
declare function classifyClaudeCliHistoryLine(params: {
  line: string;
  cliSessionId: string;
  sourceLineNumber: number;
}): ClaudeCliHistoryLineClassification;
/** Applies native history filters to an already-decoded catalog user message. */
declare function classifyClaudeCliHistoryMessage(params: {
  content: unknown;
  timestamp?: unknown;
  cliSessionId: string;
  sourceLineNumber: number;
}): ClaudeCliHistoryLineClassification;
//#endregion
export { type ClaudeCliHistoryLineClassification, type SessionCatalog, type SessionCatalogArchiveProviderParams, type SessionCatalogCapabilities, type SessionCatalogContinueProviderParams, type SessionCatalogContinueProviderResult, type SessionCatalogDescriptor, type SessionCatalogEntrySnapshot, type SessionCatalogEntrySummary, type SessionCatalogHost, type SessionCatalogListProviderParams, type SessionCatalogLocator, type SessionCatalogProvider, type SessionCatalogPullRequestSummary, type SessionCatalogReadProviderParams, type SessionCatalogSession, type SessionCatalogTerminalPlan, type SessionCatalogTranscriptItem, type SessionUpstreamActivity, type SessionUpstreamJsonValue, type SessionUpstreamKind, type SessionUpstreamProbe, type SessionsCatalogArchiveParams, type SessionsCatalogArchiveResult, type SessionsCatalogContinueParams, type SessionsCatalogContinueResult, type SessionsCatalogListParams, type SessionsCatalogListResult, type SessionsCatalogReadParams, type SessionsCatalogReadResult, classifyClaudeCliHistoryLine, classifyClaudeCliHistoryMessage, createSessionCatalogAdoptionCoordinator, deleteSessionUpstreamLink, importSessionCatalogHistory, isExternalUserText, listAdoptedSessionCatalogSessions, listSessionCatalogEntries, normalizeUserText, sessionCatalogAdoptedSessionKey, sessionCatalogAdoptedSourceKey, upsertSessionUpstreamLink };