import { describe, expect, it } from "vitest";
import { resolveDocumentPath, listConfiguredRoles } from "./role-resolver.js";

describe("Tier 1: resolveDocumentPath (Abstract Role Arity)", () => {
  const defaultParams = {
    workspaceRoot: "/workspace/agent-01",
  };

  it("resolves default canonical habitat paths when no custom mapping is provided", () => {
    expect(resolveDocumentPath(defaultParams, "identity")).toBe("/workspace/agent-01/AGENTS.md");
    expect(resolveDocumentPath(defaultParams, "persona")).toBe("/workspace/agent-01/SOUL.md");
    expect(resolveDocumentPath(defaultParams, "workingMemory")).toBe("/workspace/agent-01/MEMORY.md");
    expect(resolveDocumentPath(defaultParams, "channelTopology")).toBe("/workspace/agent-01/CHANNEL_MAP.md");
    expect(resolveDocumentPath(defaultParams, "contextIndex")).toBe("/workspace/agent-01/CONTEXT_INDEX.md");
  });

  it("resolves arbitrary custom role mappings when configured", () => {
    const customParams = {
      workspaceRoot: "/workspace/custom",
      roleMapping: {
        identity: "config/agent_manifest.yaml",
        customAnalytics: "metrics/telemetry.md",
        channelTopology: "/var/run/topology.md", // Absolute path
      },
    };

    expect(resolveDocumentPath(customParams, "identity")).toBe("/workspace/custom/config/agent_manifest.yaml");
    expect(resolveDocumentPath(customParams, "customAnalytics")).toBe("/workspace/custom/metrics/telemetry.md");
    expect(resolveDocumentPath(customParams, "channelTopology")).toBe("/var/run/topology.md");
  });

  it("lists all combined configured roles cleanly", () => {
    const customParams = {
      workspaceRoot: "/workspace/test",
      roleMapping: {
        customTooling: "docs/tools.md",
      },
    };

    const roles = listConfiguredRoles(customParams);
    expect(roles.identity).toBe("AGENTS.md");
    expect(roles.customTooling).toBe("docs/tools.md");
  });
});
