/**
 * @file arrival-probe.bdd.test.ts
 * @description Tier 3 BDD Behavioral Scenarios verifying single-pass arrival probe resolution,
 * elimination of the 6x 404 discovery tax, and concise capability projection.
 */

import { describe, expect, it } from "vitest";
import { createHabitatProbeTool } from "./habitat-probe-tool.js";
import { createSystemCapabilitiesTool } from "./system-capabilities-tool.js";
import { createSystemProbeTool } from "./system-probe-tool.js";
import { partitionSandwich } from "../../infra/shannon-weaver/sandwich-partitioner.js";


describe("Arrival Probe Behavioral Scenarios (Tier 3 BDD)", () => {
  it("Scenario 1: Agent eliminates 6x 404 discovery tax using single-pass habitat_probe", async () => {
    // Given a workspace habitat with some canonical files present and others absent
    const mockFiles: Record<string, string> = {
      "/workspace/AGENTS.md": "---\ntitle: Agent Policy & Constraints\n---\n# Rules\n1. Verify before execute.",
      "/workspace/SOUL.md": "# Flow Persona\nContinuous identity.",
      "/workspace/USER.md": "# Marsyas\nOperator background.",
      "/workspace/CHANNEL_MAP.md": "# Topology\nChannel route map.",
    };

    const habitatTool = createHabitatProbeTool({
      workspaceRoot: "/workspace",
      fileReader: {
        existsSync: (p: string) => Boolean(mockFiles[p]),
        statSync: (p: string) => ({ size: mockFiles[p]?.length || 0 }),
        readFileSync: (p: string) => mockFiles[p] || "",
      },
    });

    // When the agent executes habitat_probe on turn 1
    const probeResult = await habitatTool.execute("turn1-habitat-call", {});
    const payload = JSON.parse(probeResult.content[0].text);

    // Then all present files are mapped with summaries in 1 single call
    expect(payload.filesPresent.length).toBe(4);
    expect(payload.filesPresent.map((f: { path: string }) => f.path)).toEqual(
      expect.arrayContaining(["AGENTS.md", "SOUL.md", "USER.md", "CHANNEL_MAP.md"]),
    );

    // And absent files (e.g. MEMORY.md, CONTEXT_INDEX.md) are clearly declared absent without 404 noise
    expect(payload.filesMissing.length).toBeGreaterThan(0);
    const missingPaths = payload.filesMissing.map((f: { path: string }) => f.path);
    expect(missingPaths).toContain("MEMORY.md");
    expect(missingPaths).toContain("CONTEXT_INDEX.md");

    // And the generated Markdown summary is compact (< 250 tokens ~ 1000 chars)
    expect(payload.markdownSummary.length).toBeLessThan(1200);
  });

  it("Scenario 2: Agent queries system_capabilities with concise summary mode, preventing 70KB bloat", async () => {
    // Given 15 active tools with extensive parameter schemas
    const mockTools = Array.from({ length: 15 }, (_, i) => ({
      name: `tool_${i}`,
      label: `Tool ${i}`,
      description: `Description of tool ${i}`,
      parameters: {
        type: "object",
        properties: {
          arg1: { type: "string", description: "Long documentation ".repeat(20) },
          arg2: { type: "number", description: "More verbose description ".repeat(20) },
          arg3: { type: "object", properties: { nested: { type: "boolean" } } },
        },
        required: ["arg1"],
      },
      execute: async () => ({ content: [], details: {} }),
    }));

    const capsTool = createSystemCapabilitiesTool({
      getTools: () => mockTools,
      getAllRegisteredTools: () => mockTools,
      gatewayVersion: "2026.8.1-inferno",
      modelProvider: "openrouter",
      modelId: "deepseek-v4-flash-latest",
    });

    // When agent calls system_capabilities in default summary mode
    const summaryCall = await capsTool.execute("turn1-caps-call", { mode: "summary" });
    const summaryJson = summaryCall.content[0].text;

    // Then the summary response is concise and lightweight (< 12,000 chars / ~2.4k tokens vs ~70KB full schema)
    expect(summaryJson.length).toBeLessThan(12000);
    const summaryParsed = JSON.parse(summaryJson);
    expect(summaryParsed.tools.length).toBe(15);
    expect(summaryParsed.tools[0].parameters.keys).toEqual(["arg1", "arg2", "arg3"]);

    // When agent selectively filters a single tool in detail mode
    const detailCall = await capsTool.execute("turn1-detail-call", {
      mode: "detail",
      filterTools: ["tool_0"],
    });
    const detailParsed = JSON.parse(detailCall.content[0].text);
    expect(detailParsed.tools.length).toBe(1);
    expect(detailParsed.tools[0].parameters.properties).toBeDefined();
  });

  it("Scenario 3: Complete 5-channel arrival probe sequence operates strictly within 3,000 token budget", async () => {
    // 1. Identity & Health channel
    const probeTool = createSystemProbeTool();
    const probeRes = await probeTool.execute("probe-call", {});
    const probeLen = probeRes.content[0].text.length;

    // 2. Capability channel
    const capsTool = createSystemCapabilitiesTool();
    const capsRes = await capsTool.execute("caps-call", { mode: "summary" });
    const capsLen = capsRes.content[0].text.length;

    // 3. Habitat channel (1-call discovery)
    const habitatTool = createHabitatProbeTool({
      workspaceRoot: "/workspace",
      fileReader: {
        existsSync: () => true,
        statSync: () => ({ size: 500 }),
        readFileSync: () => "# Doc\nContent line.",
      },
    });
    const habitatRes = await habitatTool.execute("hab-call", {});
    const habitatLen = habitatRes.content[0].text.length;

    // 4. Normative read channel (Sandwich partitioned entry/exit)
    const agentsDoc = "# AGENTS.md\n" + "Policy instruction line.\n".repeat(100);
    const partitioned = partitionSandwich(agentsDoc, { entryLines: 20, exitLines: 20 });
    const readLen = (partitioned.entryText + partitioned.exitText).length;

    // Total characters across all 5 arrival channels
    const totalChars = probeLen + capsLen + habitatLen + readLen;
    // Estimated tokens (~4 chars/token)
    const estimatedTokens = Math.ceil(totalChars / 4);

    // Assert total arrival sequence is well within target (target <= 3,000 tokens)
    expect(estimatedTokens).toBeLessThan(2000);
  });
});
