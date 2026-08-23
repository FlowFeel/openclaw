import { describe, expect, it } from "vitest";
import { createHabitatProbeTool } from "./habitat-probe-tool.js";

describe("habitat_probe Agent Tool (Tier 2 Boundary Harness)", () => {
  it("executes habitat_probe and returns structured JSON payload with markdown summary", async () => {
    const mockFiles: Record<string, string> = {
      "/workspace/AGENTS.md": "---\ntitle: Agent Policy\n---\n# Rules\n1. Be helpful.",
      "/workspace/SOUL.md": "# Flow Persona\nCore continuity.",
    };

    const tool = createHabitatProbeTool({
      workspaceRoot: "/workspace",
      fileReader: {
        existsSync: (p: string) => Boolean(mockFiles[p]),
        statSync: (p: string) => ({ size: mockFiles[p]?.length || 0 }),
        readFileSync: (p: string) => mockFiles[p] || "",
      },
    });

    expect(tool.name).toBe("habitat_probe");
    expect(tool.description).toContain("canonical files");

    const result = await tool.execute("test-call-1", { detailLevel: "compact" });
    const payload = JSON.parse(result.content[0].text);

    expect(payload.workspaceRoot).toBe("/workspace");
    expect(payload.filesPresent.length).toBe(2);
    expect(payload.markdownSummary).toContain("# Habitat Topology");
    expect(payload.markdownSummary).toContain("`AGENTS.md`");
    expect(payload.markdownSummary).toContain("`SOUL.md`");
  });
});
