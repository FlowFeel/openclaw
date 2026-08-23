/**
 * BDD Scenario Suite: Structured Genealogy Schema Validation
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/structured_genealogy.feature
 */

import { describe, expect, it } from "vitest";
import { validateGenealogyFrontmatter } from "./genealogy-validator.js";

describe("Feature: Structured Genealogy Schema Validation (BDD)", () => {
  it("Scenario: Validator confirms compliant YAML frontmatter", () => {
    // Given a markdown document containing valid frontmatter:
    const markdown = `
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
  - "invariants"
---

# Document body...
    `.trim();

    // When the genealogy validator evaluates the document
    const result = validateGenealogyFrontmatter(markdown);

    // Then the validation result is "valid"
    expect(result.valid).toBe(true);
    if (result.valid) {
      // And all 7 required schema fields are extracted correctly
      expect(result.metadata.title).toBe("Transcript Persistence Invariants");
      expect(result.metadata.author).toBe("OpenClaw Core Team");
      expect(result.metadata.date).toBe("2026-08-23");
      expect(result.metadata.decision).toBe("Two-phase SQLite commit before tool invocation");
      expect(result.metadata.rationale).toBe("SQLite WAL provides atomicity and zero-corruption crash recovery");
      expect(result.metadata.verified_by).toBe("pnpm vitest run src/agents/session-transcript-repair.test.ts");

      // And the rejected alternatives list contains 2 entries
      expect(result.metadata.rejected.length).toBe(2);
      expect(result.metadata.rejected).toEqual([
        "Pure in-memory journal",
        "Filesystem append log",
      ]);
    }
  });

  it("Scenario: Validator rejects frontmatter with missing required fields", () => {
    // Given a markdown document missing "rejected" and "verified_by" frontmatter keys:
    const invalidMarkdown = `
---
title: "Unverified Doc"
author: "Anon"
date: "2026-08-23"
decision: "Ad-hoc tweak"
rationale: "No alternatives considered"
tags:
  - "misc"
---
    `.trim();

    // When the genealogy validator evaluates the document
    const result = validateGenealogyFrontmatter(invalidMarkdown);

    // Then the validation result is "invalid"
    expect(result.valid).toBe(false);
    if (!result.valid) {
      // And the error list contains "missing_field: rejected"
      expect(result.errors.some((e) => e.includes("rejected"))).toBe(true);
      // And the error list contains "missing_field: verified_by"
      expect(result.errors).toContain("missing_field: verified_by");
    }
  });
});
