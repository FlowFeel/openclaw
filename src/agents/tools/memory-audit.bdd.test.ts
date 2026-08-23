/**
 * BDD Scenario Suite: Memory Audit Trace & Non-Blocking Agent Signal Bus
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/memory_audit_and_signals.feature
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AgentSignalBus } from "../../infra/agent-signal-bus.js";
import { createAgentSignalTool } from "./agent-signal-tool.js";
import { createMemoryAuditTool } from "./memory-audit-tool.js";
import type { MemoryAuditResult } from "../../infra/memory-audit-tracer.js";

describe("Feature: Memory Audit Trace & Non-Blocking Agent Signal Bus (BDD)", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "memory-bdd-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("Scenario: Agent inspects loaded memory sections and byte budget allocation", async () => {
    // Given a workspace containing "MEMORY.md" with 3 sections ("User Profile", "System Preferences", "Topic Notes")
    const memoryPath = path.join(tempDir, "MEMORY.md");
    const content = `
# User Profile
User name: Alice
Preferred tone: Direct and concise
${"A".repeat(800)}

# System Preferences
Theme: Dark mode
Enable sound: false
${"B".repeat(800)}

# Topic Notes
Working on OpenClaw telemetry improvements.
${"C".repeat(700)}
    `.trim();

    fs.writeFileSync(memoryPath, content);

    // And total memory size is within the 8192 byte bootstrap budget
    const tool = createMemoryAuditTool({ workspaceDir: tempDir, budgetBytes: 8192 });

    // When the agent invokes the "memory_audit_inspect" tool
    const execution = await tool.execute("call_mem_1", {});
    const result = execution.details as MemoryAuditResult;

    // Then the memory audit status is "healthy"
    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      // And the total memory bytes is approximately 2400-2500 bytes
      expect(result.totalBytes).toBeGreaterThan(2300);
      expect(result.totalBytes).toBeLessThan(3000);

      // And the response lists all 3 parsed sections with headings and byte lengths
      expect(result.sections.length).toBe(3);
      expect(result.sections.map((s) => s.heading)).toEqual([
        "User Profile",
        "System Preferences",
        "Topic Notes",
      ]);
      expect(result.sections.every((s) => s.byteLength > 700)).toBe(true);

      // And the budget utilization percentage is within expected range (<40%)
      expect(result.budgetUtilizationPercent).toBeGreaterThan(25);
      expect(result.budgetUtilizationPercent).toBeLessThan(40);
    }
  });

  it("Scenario: Agent detects truncated memory sections exceeding byte budget", async () => {
    // Given a workspace containing "MEMORY.md" whose total size is 12000 bytes
    // And the maximum allowed memory budget is 8192 bytes
    const memoryPath = path.join(tempDir, "MEMORY.md");
    const largeContent = "# Big Section\n" + "X".repeat(12000);
    fs.writeFileSync(memoryPath, largeContent);

    const tool = createMemoryAuditTool({ workspaceDir: tempDir, budgetBytes: 8192 });

    // When the agent invokes the "memory_audit_inspect" tool
    const execution = await tool.execute("call_mem_2", {});
    const result = execution.details as MemoryAuditResult;

    // Then the memory audit status is "truncated"
    expect(result.status).toBe("truncated");
    if (result.status === "truncated") {
      // And the response indicates excess bytes skipped or truncated
      expect(result.truncatedBytes).toBeGreaterThan(3800);
      // And the warning message warns about exceeding budget
      expect(result.warning).toContain("Memory file exceeds budget");
    }
  });

  it("Scenario: Agent emits a non-blocking diagnostic signal to operator telemetry", async () => {
    // Given an active agent turn encountering an unindexed knowledge topic
    const bus = new AgentSignalBus(100);
    const signalTool = createAgentSignalTool({ signalBus: bus, sessionId: "sess_bdd" });

    // When the agent invokes the "emit_agent_signal" tool with level/topic/message
    const execution = await signalTool.execute("call_sig_1", {
      level: "warn",
      topic: "knowledge_gap",
      message: "Missing documentation for custom RPC transport",
    });

    // Then the signal is recorded in the diagnostics telemetry ring buffer
    const signals = bus.getSignals({ topic: "knowledge_gap" });
    expect(signals.length).toBe(1);
    expect(signals[0]?.message).toBe("Missing documentation for custom RPC transport");
    expect(signals[0]?.level).toBe("warn");

    // And the tool execution returns status "acknowledged" with signal ID and timestamp
    const res = execution.details as { status: string; signalId: string; timestamp: number };
    expect(res.status).toBe("acknowledged");
    expect(res.signalId).toBeDefined();
    expect(res.timestamp).toBeGreaterThan(0);
  });
});
