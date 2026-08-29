import { $n as CliBackendConfig, Qn as CliBackendAuthEpochMode, _r as CliBackendToolAvailabilityEnforcement, ar as CliBackendParseJsonlEvent, cr as CliBackendPlugin, dr as CliBackendResolveExecutionArgs, er as CliBackendExecutionMode, fr as CliBackendResolveExecutionArgsContext, gr as CliBackendToolAvailability, hr as CliBackendThinkingLevel, ir as CliBackendNormalizeConfigContext, lr as CliBackendPrepareExecutionContext, mr as CliBackendSideQuestionToolMode, nr as CliBackendLiveSessionRequirement, or as CliBackendParseJsonlEventContext, pr as CliBackendRuntimeArtifactPolicy, rr as CliBackendNativeToolMode, sr as CliBackendParsedJsonlEvent, tr as CliBackendJsonlUsage, ur as CliBackendPreparedExecution } from "../types-CtdP6tZL.js";

//#region src/agents/cli-watchdog-defaults.d.ts
declare const CLI_FRESH_WATCHDOG_DEFAULTS: {
  readonly noOutputTimeoutRatio: 0.8;
  readonly minMs: 180000;
  readonly maxMs: 600000;
};
declare const CLI_RESUME_WATCHDOG_DEFAULTS: {
  readonly noOutputTimeoutRatio: 0.3;
  readonly minMs: 60000;
  readonly maxMs: 180000;
};
//#endregion
export { CLI_FRESH_WATCHDOG_DEFAULTS, CLI_RESUME_WATCHDOG_DEFAULTS, type CliBackendAuthEpochMode, type CliBackendConfig, type CliBackendExecutionMode, type CliBackendJsonlUsage, type CliBackendLiveSessionRequirement, type CliBackendNativeToolMode, type CliBackendNormalizeConfigContext, type CliBackendParseJsonlEvent, type CliBackendParseJsonlEventContext, type CliBackendParsedJsonlEvent, type CliBackendPlugin, type CliBackendPrepareExecutionContext, type CliBackendPreparedExecution, type CliBackendResolveExecutionArgs, type CliBackendResolveExecutionArgsContext, type CliBackendRuntimeArtifactPolicy, type CliBackendSideQuestionToolMode, type CliBackendThinkingLevel, type CliBackendToolAvailability, type CliBackendToolAvailabilityEnforcement };