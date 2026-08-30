/**
 * Agent Activity & Execution Observability Tool.
 *
 * Allows agents and operators to introspect recent tool activity, latency distributions,
 * command histories, and error frequencies for self-diagnosis and avoiding loops.
 */

import { Type } from "typebox";
import { type RawChainSample } from "../chain-scoreboard/chain-metrics-calculator.js";
import { classifyRewardTier } from "../chain-scoreboard/reward-track-governor.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

export interface ActivityTraceEvent extends RawChainSample {
  readonly timestamp?: number;
  readonly status?: "ok" | "error";
}

export interface ActivityInspectionResult {
  readonly totalCalls: number;
  readonly errorCount: number;
  readonly totalDurationMs: number;
  readonly circuitBreaker: {
    readonly callLimit: number;
    readonly remainingCalls: number;
    readonly isCapReached: boolean;
    readonly tier: string;
  };
  readonly recentActivity: readonly ActivityTraceEvent[];
}

export const ActivityInspectToolSchema = Type.Object(
  {
    limit: Type.Optional(
      Type.Integer({
        minimum: 1,
        maximum: 50,
        description: "Maximum number of recent tool execution records to return (defaults to 10).",
      }),
    ),
  },
  { additionalProperties: false },
);

export type CreateActivityInspectToolOptions = {
  getRecentActivity?: () => readonly ActivityTraceEvent[];
  chainScore?: number;
};

export function createActivityInspectTool(
  options: CreateActivityInspectToolOptions = {},
): AnyAgentTool {
  return {
    name: "activity_inspect",
    label: "Activity & Tool Trace Inspector",
    description:
      "Inspect recent tool execution activity, execution latencies, command targets, and circuit breaker status in the active session. Use to diagnose tool stalls, avoid repetitive looping, and manage turn runway.",
    parameters: ActivityInspectToolSchema,
    execute: async (_toolCallId: string, params: unknown) => {
      const p = (params && typeof params === "object" ? params : {}) as { limit?: number };
      const limit = Math.max(1, Math.min(50, p.limit ?? 10));

      const activity = options.getRecentActivity ? options.getRecentActivity() : [];
      const totalCalls = activity.length;
      const errorCount = activity.filter((a) => Boolean(a.isError)).length;
      const totalDurationMs = activity.reduce((acc, a) => acc + (a.durationMs ?? 0), 0);

      const score = options.chainScore ?? (totalCalls === 0 ? 100 : Math.max(0, 100 - (totalCalls - 1) * 8 - errorCount * 12));
      const tierInfo = classifyRewardTier(score);

      const callLimit = tierInfo.callLimit;
      const remainingCalls = Math.max(0, callLimit - totalCalls);
      const isCapReached = totalCalls >= callLimit;

      const recentActivity = activity.slice(-limit);

      const result: ActivityInspectionResult = {
        totalCalls,
        errorCount,
        totalDurationMs,
        circuitBreaker: {
          callLimit,
          remainingCalls,
          isCapReached,
          tier: tierInfo.tier,
        },
        recentActivity,
      };

      return jsonResult(result);
    },
  };
}
