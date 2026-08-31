import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveLiterateMarkdownSurface } from "./literate-surface-resolver.js";

describe("CAP-LIT-01: Literate Markdown Surface Resolver", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-lit-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe("Scenario 1: Single file redirect with frontmatter", () => {
    it("transcludes target file content while preserving parent frontmatter", () => {
      const soulDir = path.join(tempDir, "soul");
      fs.mkdirSync(soulDir);

      const targetPath = path.join(soulDir, "identity.md");
      fs.writeFileSync(
        targetPath,
        "---\nname: sovereign-one\n---\n# Real Identity\nSovereign Phosphene Agent",
      );

      const rootIdentity = path.join(tempDir, "IDENTITY.md");
      const rootContent = "---\nredirect: soul/identity.md\n---\n→ soul/identity.md";

      const result = resolveLiterateMarkdownSurface({
        workspaceDir: tempDir,
        filePath: rootIdentity,
        rawContent: rootContent,
      });

      expect(result.redirected).toBe(true);
      expect(result.content).toContain("redirect: soul/identity.md");
      expect(result.content).toContain("# Real Identity");
      expect(result.content).toContain("Sovereign Phosphene Agent");
      expect(result.content).not.toContain("→ soul/identity.md");
    });
  });

  describe("Scenario 2: Directory aggregation redirect", () => {
    it("aggregates all markdown surfaces in the target directory", () => {
      const soulDir = path.join(tempDir, "soul");
      fs.mkdirSync(soulDir);

      fs.writeFileSync(path.join(soulDir, "01-core.md"), "# Core Philosophy\nAxioms over rules.");
      fs.writeFileSync(
        path.join(soulDir, "02-routing.md"),
        "# Routing Rules\nDeterministic dispatch.",
      );

      const rootSoul = path.join(tempDir, "SOUL.md");
      const rootContent = "---\nredirect: soul/\n---\n→ soul/";

      const result = resolveLiterateMarkdownSurface({
        workspaceDir: tempDir,
        filePath: rootSoul,
        rawContent: rootContent,
      });

      expect(result.redirected).toBe(true);
      expect(result.content).toContain("### Surface: 01 CORE (soul/01-core.md)");
      expect(result.content).toContain("Axioms over rules.");
      expect(result.content).toContain("### Surface: 02 ROUTING (soul/02-routing.md)");
      expect(result.content).toContain("Deterministic dispatch.");
    });
  });

  describe("Scenario 3: Cyclic redirect protection", () => {
    it("terminates gracefully without infinite loop when files point to each other", () => {
      const fileA = path.join(tempDir, "fileA.md");
      const fileB = path.join(tempDir, "fileB.md");

      fs.writeFileSync(fileA, "---\nredirect: fileB.md\n---\n→ fileB.md");
      fs.writeFileSync(fileB, "---\nredirect: fileA.md\n---\n→ fileA.md");

      const result = resolveLiterateMarkdownSurface({
        workspaceDir: tempDir,
        filePath: fileA,
        rawContent: fs.readFileSync(fileA, "utf-8"),
      });

      expect(result).toBeDefined();
    });
  });

  describe("Scenario 4: Directory traversal protection", () => {
    it("rejects redirect targets pointing outside the workspace", () => {
      const rootIdentity = path.join(tempDir, "IDENTITY.md");
      const rootContent = "---\nredirect: ../../etc/passwd\n---\n→ ../../etc/passwd";

      const result = resolveLiterateMarkdownSurface({
        workspaceDir: tempDir,
        filePath: rootIdentity,
        rawContent: rootContent,
      });

      expect(result.redirected).toBe(false);
      expect(result.content).toBe(rootContent);
    });
  });
});
