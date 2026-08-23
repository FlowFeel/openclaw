/**
 * BDD Scenario Suite: Dynamic Tool Capability & Policy Discovery
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/capability_discovery.feature
 */

import { Type } from "typebox";
import { describe, expect, it } from "vitest";
import type { AnyAgentTool } from "./common.js";
import { createSystemCapabilitiesTool } from "./system-capabilities-tool.js";
import type { SystemCapabilitiesResult } from "./system-capabilities-projector.js";

function mockTool(name: string, requiredCaps?: string[]): AnyAgentTool {
  return {
    name,
    label: name.toUpperCase(),
    description: `Performs ${name} operation`,
    parameters: Type.Object({ param1: Type.String() }),
    requiredClientCaps: requiredCaps,
    execute: async () => ({ content: [], details: {} }),
  };
}

describe("Feature: Dynamic Tool Capability & Policy Discovery (BDD)", () => {
  it("Scenario: Agent discovers active tool capabilities and parameter schemas", async () => {
    // Given the agent has access to tools ["read", "write", "edit", "system_probe"]
    const tools = [
      mockTool("read"),
      mockTool("write"),
      mockTool("edit"),
      mockTool("system_probe"),
    ];

    const tool = createSystemCapabilitiesTool({
      getTools: () => tools,
      gatewayVersion: "1.0.0",
      modelProvider: "anthropic",
      modelId: "claude-3-5-sonnet",
      contextWindowTokens: 200_000,
    });

    // When the agent invokes the "system_capabilities" tool
    const execution = await tool.execute("call_cap_1", {});
    const result = execution.details as SystemCapabilitiesResult;

    // Then the response lists all 4 tool capabilities with descriptions and parameter schemas
    expect(result.tools.length).toBe(4);
    expect(result.tools.map((t) => t.name)).toEqual(["read", "write", "edit", "system_probe"]);
    expect(result.tools[0]?.description).toBe("Performs read operation");
    expect(result.tools[0]?.parameters).toBeDefined();

    // And the response includes active model provider, model ID, and context window limits
    expect(result.modelProvider).toBe("anthropic");
    expect(result.modelId).toBe("claude-3-5-sonnet");
    expect(result.contextWindowTokens).toBe(200_000);

    // And the response includes a deterministic SHA-256 policy checksum
    expect(result.policyChecksum).toMatch(/^[a-f0-9]{64}$/);
  });

  it("Scenario: Agent discovers policy restrictions and sandboxed tools", async () => {
    // Given the runtime enforces a workspace-only sandboxing policy on file write and edit
    // And tool execution timeout is configured to 30000ms
    const tools = [mockTool("read"), mockTool("write")];

    const tool = createSystemCapabilitiesTool({
      getTools: () => tools,
      sandboxed: false,
      defaultTimeoutMs: 30000,
      clientCaps: ["browser", "inline-widgets"],
    });

    // When the agent invokes the "system_capabilities" tool
    const execution = await tool.execute("call_cap_2", {});
    const result = execution.details as SystemCapabilitiesResult;

    // Then the capability descriptor for "write" indicates isSandboxed=true
    const writeCap = result.tools.find((t) => t.name === "write");
    expect(writeCap?.isSandboxed).toBe(true);

    // And the timeoutMs policy value for all tools is 30000
    expect(result.tools.every((t) => t.timeoutMs === 30000)).toBe(true);

    // And the response includes the list of client capabilities declared by the connecting gateway
    expect(result.clientCapabilities).toEqual(["browser", "inline-widgets"]);
  });

  it("Scenario: Agent identifies tools denied by client capability gates", async () => {
    // Given the client connected without "inline-widgets" capability
    // And the "show_widget" tool is restricted by the client capability filter
    const activeTools = [mockTool("read")];
    const allTools = [
      mockTool("read"),
      mockTool("show_widget", ["inline-widgets"]),
    ];

    const tool = createSystemCapabilitiesTool({
      getTools: () => activeTools,
      getAllRegisteredTools: () => allTools,
      clientCaps: [],
    });

    // When the agent invokes the "system_capabilities" tool
    const execution = await tool.execute("call_cap_3", {});
    const result = execution.details as SystemCapabilitiesResult;

    // Then "show_widget" appears in the deniedTools list with reason "missing_client_cap: inline-widgets"
    expect(result.deniedTools).toEqual([
      { name: "show_widget", reason: "missing_client_cap: inline-widgets" },
    ]);

    // And "show_widget" is excluded from the active tools list
    expect(result.tools.map((t) => t.name)).toEqual(["read"]);
  });
});
