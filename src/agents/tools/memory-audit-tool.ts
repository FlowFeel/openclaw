/**
 * Agent-facing Memory Audit Tool.
 *
 * Allows agents to inspect their parsed memory sections, byte size, and budget consumption.
 */

import path from "node:path";
import { Type } from "typebox";
import {
  auditMemoryFile,
  DEFAULT_MEMORY_BUDGET_BYTES,
  type MemoryAuditResult,
} from "../../infra/memory-audit-tracer.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

export const MemoryAuditToolSchema = Type.Object(
  {
    file_path: Type.Optional(
      Type.String({
        description: "Optional path to memory file. Defaults to MEMORY.md in workspace.",
      }),
    ),
  },
  { additionalProperties: false },
);

export type CreateMemoryAuditToolOptions = {
  workspaceDir?: string;
  budgetBytes?: number;
};

export function createMemoryAuditTool(options: CreateMemoryAuditToolOptions = {}): AnyAgentTool {
  const resolvePath = (explicitPath?: string): string => {
    if (explicitPath && explicitPath.trim().length > 0) {
      return explicitPath.trim();
    }
    if (options.workspaceDir) {
      return path.join(options.workspaceDir, "MEMORY.md");
    }
    return path.join(process.cwd(), "MEMORY.md");
  };

  return {
    name: "memory_audit_inspect",
    label: "Memory Audit Inspector",
    description:
      "Inspect the parsed sections, byte budget allocation (default 8192B limit), and truncation diagnostics of the agent's MEMORY.md file.",
    parameters: MemoryAuditToolSchema,
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<ReturnType<typeof jsonResult<MemoryAuditResult>>> => {
      const p = (params && typeof params === "object" ? params : {}) as { file_path?: string };
      const targetPath = resolvePath(p.file_path);

      const result = auditMemoryFile(targetPath, options.budgetBytes ?? DEFAULT_MEMORY_BUDGET_BYTES);
      return jsonResult(result);
    },
  };
}
