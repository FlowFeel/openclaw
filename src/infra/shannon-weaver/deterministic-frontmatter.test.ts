import { describe, expect, it } from "vitest";
import { extractFrontmatter } from "./deterministic-frontmatter.js";

describe("Tier 1: extractFrontmatter (Pure Index Slicing)", () => {
  it("extracts valid YAML 1.2 frontmatter with strict typing", () => {
    const doc = `---
title: "Agent Architecture"
country: NO
status: active
budget: 40
tags:
  - fast-path
  - dft
---
# Document Header
Body content here.`;

    const result = extractFrontmatter(doc);
    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter.title).toBe("Agent Architecture");
    // YAML 1.2 core schema keeps "NO" as string, not boolean false!
    expect(result.frontmatter.country).toBe("NO");
    expect(result.frontmatter.budget).toBe(40);
    expect(result.frontmatter.tags).toEqual(["fast-path", "dft"]);
    expect(result.body).toBe("# Document Header\nBody content here.");
  });

  it("handles markdown documents with zero frontmatter cleanly", () => {
    const doc = `# Pure Markdown
No frontmatter fences exist here.`;

    const result = extractFrontmatter(doc);
    expect(result.hasFrontmatter).toBe(false);
    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe(doc);
  });

  it("handles unclosed frontmatter gracefully without catastrophic backtracking", () => {
    // Pathological input that causes ReDoS in naive regex
    const unclosedDoc = "---" + "\na: b".repeat(5000);
    const start = performance.now();
    const result = extractFrontmatter(unclosedDoc);
    const elapsed = performance.now() - start;

    expect(result.hasFrontmatter).toBe(false);
    expect(elapsed).toBeLessThan(10); // Must complete in <10ms
  });

  it("handles thematic break '---' in body without confusing it for frontmatter fence", () => {
    const doc = `---
id: test-01
---
First section
---
Second section`;

    const result = extractFrontmatter(doc);
    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter.id).toBe("test-01");
    expect(result.body).toContain("First section\n---\nSecond section");
  });
});
