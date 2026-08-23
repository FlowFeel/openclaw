import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createMemoryAuditTool } from "./memory-audit-tool.js";
import type { MemoryAuditResult } from "../../infra/memory-audit-tracer.js";

describe("memory_audit_inspect tool", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "memory-tool-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("inspects valid MEMORY.md file", async () => {
    const memoryFile = path.join(tempDir, "MEMORY.md");
    fs.writeFileSync(memoryFile, "# Identity\nOpenClaw agent\n# Goals\nAssist user");

    const tool = createMemoryAuditTool({ workspaceDir: tempDir });
    const execution = await tool.execute("call_1", {});

    const result = execution.details as MemoryAuditResult;
    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      expect(result.sections.length).toBe(2);
      expect(result.sections[0]?.heading).toBe("Identity");
      expect(result.sections[1]?.heading).toBe("Goals");
    }
  });
});
