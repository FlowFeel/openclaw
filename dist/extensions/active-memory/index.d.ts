import { t as OpenClawPluginDefinition } from "../../types-CFJXaPHi.js";
import { c as OpenClawPluginConfigSchema, l as OpenClawPluginDefinition$1 } from "../../plugin-entry-rqx6-3xm.js";
import { isMissingRegisteredMemoryToolsError, normalizePluginConfig, setMinimumTimeoutMsForTests, setSetupGraceTimeoutMsForTests } from "./config.js";
import { buildMetadata, buildPromptPrefix } from "./prompt.js";
import { buildSearchQuery } from "./query.js";
import { buildCacheKey, buildCircuitBreakerKey, getCachedResult, getCircuitBreakerEntry, isCircuitBreakerOpen, setCachedResult, shouldCacheResult } from "./recall-state.js";
import { buildPluginStatusLine } from "./session.js";
import { readPartialAssistantText, setTimeoutPartialDataGraceMsForTests } from "./transcript-result.js";
import { readActiveMemorySearchDebug } from "./transcript-watch.js";
import { hasUsableMemoryResultInSessionRecord } from "./transcript.js";

//#region extensions/active-memory/index.d.ts
/** Plugin entry registering Active Memory hooks, tools, config schema, and doctor cleanup. */
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
declare const testing: {
  buildSearchQuery: typeof buildSearchQuery;
  buildCacheKey: typeof buildCacheKey;
  buildCircuitBreakerKey: typeof buildCircuitBreakerKey;
  buildMetadata: typeof buildMetadata;
  buildPluginStatusLine: typeof buildPluginStatusLine;
  buildPromptPrefix: typeof buildPromptPrefix;
  getCachedResult: typeof getCachedResult;
  hasUsableMemoryResultInSessionRecord: typeof hasUsableMemoryResultInSessionRecord;
  isCircuitBreakerOpen: typeof isCircuitBreakerOpen;
  isMissingRegisteredMemoryToolsError: typeof isMissingRegisteredMemoryToolsError;
  normalizePluginConfig: typeof normalizePluginConfig;
  readActiveMemorySearchDebug: typeof readActiveMemorySearchDebug;
  readPartialAssistantText: typeof readPartialAssistantText;
  shouldCacheResult: typeof shouldCacheResult;
  resetActiveRecallCacheForTests(): void;
  setMinimumTimeoutMsForTests: typeof setMinimumTimeoutMsForTests;
  setSetupGraceTimeoutMsForTests: typeof setSetupGraceTimeoutMsForTests;
  setTimeoutPartialDataGraceMsForTests: typeof setTimeoutPartialDataGraceMsForTests;
  setCachedResult: typeof setCachedResult;
  getCircuitBreakerEntry: typeof getCircuitBreakerEntry;
};
//#endregion
export { testing as __testing, testing, _default as default };