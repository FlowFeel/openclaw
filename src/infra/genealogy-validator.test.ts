import { describe, expect, it } from "vitest";
import { validateGenealogyFrontmatter } from "./genealogy-validator.js";

describe("validateGenealogyFrontmatter (Pure DFT Verifier)", () => {
  it("validates compliant frontmatter and extracts metadata", () => {
    const doc = `
---
title: "Transcript Persistence Invariants"
author: "OpenClaw Core Team"
date: "2026-08-23"
decision: "Two-phase SQLite commit before tool invocation"
rejected:
  - "Pure in-memory journal"
  - "Filesystem append log"
rationale: "SQLite WAL provides atomicity and zero-corruption crash recovery"
verified_by: "pnpm vitest run src/agents/session-transcript-repair.test.ts"
tags:
  - "persistence"
  - "sqlite"
---

# Document Body
Content here...
    `.trim();

    const result = validateGenealogyFrontmatter(doc);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.metadata.title).toBe("Transcript Persistence Invariants");
      expect(result.metadata.author).toBe("OpenClaw Core Team");
      expect(result.metadata.rejected).toEqual([
        "Pure in-memory journal",
        "Filesystem append log",
      ]);
      expect(result.metadata.tags).toEqual(["persistence", "sqlite"]);
    }
  });

  it("rejects frontmatter with missing required keys", () => {
    const invalidDoc = `
---
title: "Incomplete Doc"
author: "Anon"
date: "2026-08-23"
decision: "Tweak"
rationale: "Quick fix"
---
    `.trim();

    const result = validateGenealogyFrontmatter(invalidDoc);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.errors).toContain("missing_field: verified_by");
      expect(result.errors.some((e) => e.includes("rejected"))).toBe(true);
    }
  });

  it("handles missing frontmatter cleanly", () => {
    const result = validateGenealogyFrontmatter("# Plain Markdown\nNo frontmatter.");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.errors[0]).toContain("missing_frontmatter");
    }
  });
});
