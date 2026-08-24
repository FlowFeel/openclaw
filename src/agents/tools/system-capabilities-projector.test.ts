import { Type } from "typebox";
import { describe, expect, it } from "vitest";
import type { AnyAgentTool } from "./common.js";
import {
  calculatePolicyChecksum,
  projectSystemCapabilities,
} from "./system-capabilities-projector.js";

function createMockTool(
  name: string,
  requiredClientCaps?: string[],
): AnyAgentTool {
  return {
    name,
    label: `Mock ${name}`,
    description: `Description for ${name}`,
    parameters: Type.Object({ query: Type.String() }),
    requiredClientCaps,
    execute: async () => ({ content: [], details: {} }),
  };
}

describe("system-capabilities-projector (Pure DFT Verifier)", () => {
  it("projects active tools, model info, and calculates deterministic policy checksum", () => {
    const tools = [
      createMockTool("read"),
      createMockTool("write"),
      createMockTool("system_probe"),
    ];

    const result1 = projectSystemCapabilities({
      tools,
      gatewayVersion: "2.0.0",
      modelProvider: "anthropic",
      modelId: "claude-3-5-sonnet",
      contextWindowTokens: 200_000,
      clientCaps: ["browser"],
      nowMs: 1000000,
    });

    expect(result1.gatewayVersion).toBe("2.0.0");
    expect(result1.modelProvider).toBe("anthropic");
    expect(result1.modelId).toBe("claude-3-5-sonnet");
    expect(result1.contextWindowTokens).toBe(200_000);
    expect(result1.tools.length).toBe(3);
    expect(result1.policyChecksum).toBeDefined();

    // Checksum stability across identical inputs regardless of tool ordering
    const resultReordered = projectSystemCapabilities({
      tools: [tools[2]!, tools[0]!, tools[1]!],
      gatewayVersion: "2.0.0",
      modelProvider: "anthropic",
      modelId: "claude-3-5-sonnet",
      clientCaps: ["browser"],
      nowMs: 1000000,
    });

    expect(resultReordered.policyChecksum).toBe(result1.policyChecksum);
  });

  it("identifies denied tools based on missing client capabilities", () => {
    const activeTools = [createMockTool("read")];
    const allTools = [
      createMockTool("read"),
      createMockTool("show_widget", ["inline-widgets"]),
    ];

    const result = projectSystemCapabilities({
      tools: activeTools,
      allRegisteredTools: allTools,
      clientCaps: [], // client lacks inline-widgets
    });

    expect(result.tools.map((t) => t.name)).toEqual(["read"]);
    expect(result.deniedTools).toEqual([
      { name: "show_widget", reason: "missing_client_cap: inline-widgets" },
    ]);
  });

  it("parameterizes output detail with summary, compact, and detail modes", () => {
    const tools = [
      createMockTool("read"),
      createMockTool("write"),
      createMockTool("bash"),
    ];

    // Summary mode (concise keys)
    const summaryRes = projectSystemCapabilities({
      tools,
      mode: "summary",
    });
    expect(summaryRes.tools[0]?.parameters).toEqual({
      type: "object",
      keys: ["query"],
      required: ["query"],
      slots: { query: "string!" },
    });
    expect(summaryRes.tools[0]?.arity).toBe(1);
    expect(summaryRes.tools[0]?.tier).toBe("atomic");
    expect(summaryRes.tools[0]?.navigationHint).toBeDefined();

    // Compact mode (empty parameters)
    const compactRes = projectSystemCapabilities({
      tools,
      mode: "compact",
    });
    expect(compactRes.tools[0]?.parameters).toEqual({});

    // Detail mode (full schemas)
    const detailRes = projectSystemCapabilities({
      tools,
      mode: "detail",
    });
    expect(detailRes.tools[0]?.parameters).toHaveProperty("type", "object");
    expect(detailRes.tools[0]?.parameters).toHaveProperty("properties");

    // Filter tools selectively
    const filteredRes = projectSystemCapabilities({
      tools,
      mode: "detail",
      filterTools: ["write"],
    });
    expect(filteredRes.tools.length).toBe(1);
    expect(filteredRes.tools[0]?.name).toBe("write");
  });
});

