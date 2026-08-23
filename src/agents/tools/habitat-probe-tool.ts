/**
 * @file habitat-probe-tool.ts
 * @description Agent-facing single-pass habitat topology resolution tool.
 * Resolves workspace canonical files, roles, summaries, and missing document targets in a single call.
 */

import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";
import {
  resolveHabitatTopology,
  type HabitatTopologyResult,
  type HabitatProbeOptions,
} from "../../infra/habitat/index.js";

export const HabitatProbeToolSchema = Type.Object(
  {
    detailLevel: Type.Optional(
      Type.Union([Type.Literal("compact"), Type.Literal("full")], {
        description: "Detail level for the habitat summary (default: compact).",
      }),
    ),
    workspaceRoot: Type.Optional(
      Type.String({
        description: "Explicit workspace root directory to probe (default: current workspace).",
      }),
    ),
  },
  { additionalProperties: false },
);

export type CreateHabitatProbeToolOptions = HabitatProbeOptions;

export function createHabitatProbeTool(options: CreateHabitatProbeToolOptions = {}): AnyAgentTool {
  return {
    name: "habitat_probe",
    label: "Habitat Probe",
    description:
      "Inspect and map the canonical files and roles of the current workspace habitat (AGENTS.md, SOUL.md, USER.md, MEMORY.md, etc.) in a single call, avoiding speculative 404 file searches.",
    parameters: HabitatProbeToolSchema,
    execute: async (
      _toolCallId: string,
      params: { detailLevel?: "compact" | "full"; workspaceRoot?: string } = {},
    ): Promise<ReturnType<typeof jsonResult<HabitatTopologyResult>>> => {
      const mergedOptions: HabitatProbeOptions = {
        ...options,
        workspaceRoot: params.workspaceRoot || options.workspaceRoot,
        detailLevel: params.detailLevel || options.detailLevel || "compact",
      };

      const result = resolveHabitatTopology(mergedOptions);
      return jsonResult(result);
    },
  };
}
