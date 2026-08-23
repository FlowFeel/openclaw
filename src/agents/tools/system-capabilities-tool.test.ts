import { describe, expect, it } from "vitest";
import { createSystemCapabilitiesTool } from "./system-capabilities-tool.js";
import type { SystemCapabilitiesResult } from "./system-capabilities-projector.js";

describe("system_capabilities agent tool", () => {
  it("has the expected tool descriptor", () => {
    const tool = createSystemCapabilitiesTool();
    expect(tool.name).toBe("system_capabilities");
    expect(tool.label).toBe("System Capabilities");
    expect(tool.description).toContain("Discover the active tool capabilities");
  });

  it("executes and returns structured capability projection with policy checksum", async () => {
    const tool = createSystemCapabilitiesTool({
      gatewayVersion: "1.2.0",
      modelProvider: "anthropic",
      modelId: "claude-3-5-sonnet",
      contextWindowTokens: 200_000,
      clientCaps: ["web"],
    });

    const execution = await tool.execute("call_1", {});
    const result = execution.details as SystemCapabilitiesResult;

    expect(result.gatewayVersion).toBe("1.2.0");
    expect(result.modelProvider).toBe("anthropic");
    expect(result.modelId).toBe("claude-3-5-sonnet");
    expect(result.contextWindowTokens).toBe(200_000);
    expect(result.clientCapabilities).toEqual(["web"]);
    expect(result.policyChecksum).toBeDefined();
  });
});
