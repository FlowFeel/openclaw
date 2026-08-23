import { describe, expect, it } from "vitest";
import { resolveHabitatTopology } from "./habitat-resolver.js";

describe("resolveHabitatTopology pure invariant contracts (Tier 1)", () => {
  it("resolves canonical habitat files with in-memory virtual reader in a single pass", () => {
    const mockFiles: Record<string, string> = {
      "/workspace/AGENTS.md": "---\ntitle: Agent Policy\n---\n# Rules\n1. Be helpful.",
      "/workspace/SOUL.md": "# Flow Persona\nCore continuity.",
      "/workspace/USER.md": "Human User Profile.",
    };

    const mockReader = {
      existsSync: (p: string) => Boolean(mockFiles[p]),
      statSync: (p: string) => ({ size: mockFiles[p]?.length || 0 }),
      readFileSync: (p: string) => mockFiles[p] || "",
    };

    const result = resolveHabitatTopology({
      workspaceRoot: "/workspace",
      fileReader: mockReader,
    });

    expect(result.workspaceRoot).toBe("/workspace");
    expect(result.filesPresent.length).toBe(3);
    expect(result.filesMissing.length).toBeGreaterThan(0);

    const agentsFile = result.filesPresent.find((f) => f.path === "AGENTS.md");
    expect(agentsFile).toBeDefined();
    expect(agentsFile?.exists).toBe(true);
    expect(agentsFile?.summary).toBe("Agent Policy");

    const soulFile = result.filesPresent.find((f) => f.path === "SOUL.md");
    expect(soulFile?.summary).toBe("Flow Persona");

    // Confirms missing files are reported cleanly without 404 throws
    const missingMem = result.filesMissing.find((f) => f.path === "MEMORY.md");
    expect(missingMem).toBeDefined();
    expect(missingMem?.exists).toBe(false);

    expect(result.markdownSummary).toContain("# Habitat Topology");
    expect(result.markdownSummary).toContain("`AGENTS.md`");
    expect(result.markdownSummary).toContain("`MEMORY.md`");
  });

  it("supports custom role extensions and overrides", () => {
    const mockFiles: Record<string, string> = {
      "/app/custom/POLICY.md": "# Custom Security Policy",
    };

    const mockReader = {
      existsSync: (p: string) => Boolean(mockFiles[p]),
      statSync: (p: string) => ({ size: mockFiles[p]?.length || 0 }),
      readFileSync: (p: string) => mockFiles[p] || "",
    };

    const result = resolveHabitatTopology({
      workspaceRoot: "/app",
      customRoles: {
        security: "custom/POLICY.md",
      },
      fileReader: mockReader,
    });

    const secFile = result.filesPresent.find((f) => f.role === "security");
    expect(secFile).toBeDefined();
    expect(secFile?.path).toBe("custom/POLICY.md");
    expect(secFile?.summary).toBe("Custom Security Policy");
  });
});
