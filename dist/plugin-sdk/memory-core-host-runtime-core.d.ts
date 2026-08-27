import { ft as MemoryCitationsMode, n as OpenClawConfig } from "../types.openclaw-B-6RRL7F.js";
import { Ar as MemoryPluginRuntime, Ei as registerMemoryCapability, Hi as AnyAgentTool, Ni as resolveSessionTranscriptsDirForAgent, Pi as resolveMemorySearchConfig, Ri as DEFAULT_AGENT_COMPACTION_RESERVE_TOKENS_FLOOR, Ti as listMemoryCorpusSupplements, Ui as asToolParamsRecord, Wi as readFiniteNumberParam, Xi as jsonResult, Yi as readStringParam, jr as MemoryPromptSectionBuilder, kr as MemoryFlushPlan, qi as readPositiveIntegerParam, wi as clearMemoryPluginState, yr as MemoryCorpusSearchResult } from "../types-CrfqAVvH.js";
import { n as getRuntimeConfig } from "../config-gPwpaYa_.js";
import { t as resolveStateDir } from "../paths-ckrEvGsP.js";
import { i as resolveDefaultAgentId, t as resolveSessionAgentIds } from "../model-selection-B9HPZ60v.js";
import { n as parseAgentSessionKey } from "../session-key-utils-Dnjnq3Ss.js";
import { s as resolveRememberAcrossConversations } from "../config-utils-Bicq1PDp.js";
import { w as resolveMemoryDreamingPluginConfig } from "../dreaming-C9nNenUU.js";

//#region src/agents/current-time.d.ts
type CronStyleNow = {
  userTimezone: string;
  formattedTime: string;
  timeLine: string;
};
type TimeConfigLike = {
  agents?: {
    defaults?: {
      userTimezone?: string;
      timeFormat?: "auto" | "12" | "24";
    };
  };
};
/** Resolve localized and UTC current-time text for agent prompts. */
declare function resolveCronStyleNow(cfg: TimeConfigLike, nowMs: number): CronStyleNow;
//#endregion
//#region src/auto-reply/tokens.d.ts
/** Token that marks an auto-reply response as intentionally silent. */
declare const SILENT_REPLY_TOKEN = "NO_REPLY";
//#endregion
//#region src/config/byte-size.d.ts
/**
 * Parse an optional byte-size value from config.
 * Accepts non-negative numbers or strings like "2mb".
 */
declare function parseNonNegativeByteSize(value: unknown): number | null;
//#endregion
export { type AnyAgentTool, DEFAULT_AGENT_COMPACTION_RESERVE_TOKENS_FLOOR, type MemoryCitationsMode, type MemoryCorpusSearchResult, type MemoryFlushPlan, type MemoryPluginRuntime, type MemoryPromptSectionBuilder, type OpenClawConfig, SILENT_REPLY_TOKEN, asToolParamsRecord, clearMemoryPluginState, getRuntimeConfig, jsonResult, listMemoryCorpusSupplements, parseAgentSessionKey, parseNonNegativeByteSize, readFiniteNumberParam, readPositiveIntegerParam, readStringParam, registerMemoryCapability, resolveCronStyleNow, resolveDefaultAgentId, resolveMemoryDreamingPluginConfig, resolveMemorySearchConfig, resolveRememberAcrossConversations, resolveSessionAgentIds, resolveSessionTranscriptsDirForAgent, resolveStateDir };