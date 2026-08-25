import { describe, it, expect } from "vitest";
import { normalizeToolPath, cleanRawPathString } from "./path-normalizer.js";

describe("Degree 0: PathNormalizer Pure Invariants", () => {
  it("cleans raw file protocol and Windows backslashes", () => {
    expect(cleanRawPathString("file:///workspace/memory/notes.md")).toBe(
      "/workspace/memory/notes.md",
    );
    expect(cleanRawPathString("memory\\notes\\index.md")).toBe(
      "memory/notes/index.md",
    );
  });

  it("normalizes redundant leading /workspace/ prefixes cleanly", () => {
    const res1 = normalizeToolPath("/workspace/memory/notes.md");
    expect(res1.normalized).toBe("memory/notes.md");
    expect(res1.isWithinWorkspace).toBe(true);

    const res2 = normalizeToolPath("./workspace/AGENTS.md");
    expect(res2.normalized).toBe("AGENTS.md");
    expect(res2.isWithinWorkspace).toBe(true);
  });

  it("collapses relative .. and . segments correctly", () => {
    const res = normalizeToolPath("docs/../memory/./notes.md");
    expect(res.normalized).toBe("memory/notes.md");
    expect(res.isWithinWorkspace).toBe(true);
  });

  it("detects workspace breakout attempts", () => {
    const res = normalizeToolPath("../../etc/passwd");
    expect(res.isWithinWorkspace).toBe(false);
  });

  it("appends default extension when requested", () => {
    const res = normalizeToolPath("memory/notes", { defaultExtension: "md" });
    expect(res.normalized).toBe("memory/notes.md");
  });
});
