import { i as OpenClawConfig } from "./types.openclaw-DfLlB8Bo.js";
import { t as getAcpSessionManager } from "./manager-uHa6noSq.js";
import { ht as DetachedTaskTerminalState } from "./types-w_qIN0HD2.js";
import { n as cancelActiveCronTaskRun } from "./active-run-cancellation-D2egNSpJ.js";
//#region src/agents/bash-process-control.d.ts
declare function cancelBackgroundExecSession(sessionId: string): boolean;
//#endregion
//#region src/agents/subagent-control.d.ts
type SubagentKillTargetState = {
  state: "finalizing";
} | {
  state: "terminal";
  task: DetachedTaskTerminalState;
};
/** Kills every currently controlled child run and its descendants. */
/** Admin kill path for a subagent session key, bypassing caller ownership checks. */
declare function killSubagentRunAdmin(params: {
  cfg: OpenClawConfig;
  sessionKey: string;
}): Promise<{
  found: false;
  killed: boolean;
  runId?: undefined;
  sessionKey?: undefined;
  cascadeKilled?: undefined;
  error?: undefined;
} | {
  found: true;
  killed: boolean;
  runId: string;
  sessionKey: string;
  cascadeKilled: number;
  error: string;
} | {
  runId: string;
  sessionKey: string;
  cascadeKilled: number;
  targetState?: SubagentKillTargetState | undefined;
  found: true;
  killed: boolean;
  error?: undefined;
} | {
  runId: string;
  sessionKey: string;
  cascadeKilled: number;
  cascadeLabels: string[] | undefined;
  targetState?: SubagentKillTargetState | undefined;
  found: true;
  killed: boolean;
  error?: undefined;
}>;
//#endregion
export { cancelActiveCronTaskRun, cancelBackgroundExecSession, getAcpSessionManager, killSubagentRunAdmin };