import { describe, expect, it } from "vitest";
import {
  buildAgentSystemPrompt,
  buildDocsSection,
  buildOpenClawControlSection,
} from "../../../system-prompt.js";

describe("Upstream Artifact Elimination & Purge (Epic 21)", () => {
  it("buildDocsSection evaluates to empty array when no paths are provided", () => {
    const lines = buildDocsSection({
      isMinimal: false,
      readToolName: "read",
    });
    expect(lines).toEqual([]);
  });

  it("buildDocsSection uses local paths and inspect local source without upstream URLs", () => {
    const lines = buildDocsSection({
      docsPath: "/opt/docs",
      sourcePath: "/opt/source",
      isMinimal: false,
      readToolName: "read",
    });
    const joined = lines.join("\n");
    expect(joined).toContain("Docs: /opt/docs");
    expect(joined).toContain("Source: /opt/source");
    expect(joined).toContain("inspect local source");
    expect(joined).not.toContain("docs.openclaw.ai");
    expect(joined).not.toContain("github.com/openclaw/openclaw");
  });

  it("buildOpenClawControlSection returns empty array", () => {
    const lines = buildOpenClawControlSection({
      hasOpenClaw: true,
      hasGateway: true,
    });
    expect(lines).toEqual([]);
  });

  it("buildAgentSystemPrompt across all prompt modes contains zero upstream artifacts", () => {
    const modes = ["full", "minimal", "scaffold", "bare", "none"] as const;
    for (const promptMode of modes) {
      const prompt = buildAgentSystemPrompt({
        promptMode,
        runtimeInfo: {
          agentId: "main",
          sessionKey: "agent:main",
        },
      });

      expect(prompt).not.toContain("docs.openclaw.ai");
      expect(prompt).not.toContain("github.com/openclaw/openclaw");
      expect(prompt).not.toContain("running inside OpenClaw");
      expect(prompt).not.toContain("OpenClaw Control");
      expect(prompt).not.toContain("The AGENTS.md Tools section");
      expect(prompt).not.toContain("Never copy self");
    }
  });

  it("buildAgentSystemPrompt in promptMode 'none' returns only model identity line or empty", () => {
    const prompt = buildAgentSystemPrompt({
      promptMode: "none",
      runtimeInfo: {
        model: "custom/agent-model",
      },
    });
    expect(prompt).toBe("Current model identity: custom/agent-model.");
  });
});
