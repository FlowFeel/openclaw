import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { resolveLiterateMarkdownSurface } from "./literate-surface-resolver.js";

describe("LiterateSurfaceResolver", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "lit-test-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("Scenario 1: Resolves single-file frontmatter redirect (Axiom L1)", async () => {
    await fs.mkdir(path.join(tmpDir, "soul"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "soul", "identity.md"),
      `---
uri: soul/identity
owner: faustyrollbot
---

# Operating Notes

We build sovereign autonomous agents.
`,
      "utf8",
    );

    const identityDoc = `---
uri: identity/index
owner: faustyrollbot
redirect: soul/identity.md
---

# IDENTITY

→ \`soul/identity.md\`
`;

    const resolved = await resolveLiterateMarkdownSurface(identityDoc, {
      workspaceDir: tmpDir,
      currentFilePath: path.join(tmpDir, "IDENTITY.md"),
    });

    expect(resolved).toContain("redirect: soul/identity.md");
    expect(resolved).toContain("# Operating Notes");
    expect(resolved).toContain("We build sovereign autonomous agents.");
    expect(resolved).not.toContain("→ `soul/identity.md`");
  });

  it("Scenario 2: Aggregates directory-level markdown surfaces (Axiom L1)", async () => {
    await fs.mkdir(path.join(tmpDir, "soul"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "soul", "collaboration.md"),
      `---
title: Collaboration
---
Augmentation principle: prompts that add surface work better.
`,
      "utf8",
    );
    await fs.writeFile(
      path.join(tmpDir, "soul", "routing.md"),
      `---
title: Routing Conventions
---
Score this paper = run the WCI.
`,
      "utf8",
    );

    const soulDoc = `---
uri: soul/index
redirect: soul/
---

# Vibe Index
`;

    const resolved = await resolveLiterateMarkdownSurface(soulDoc, {
      workspaceDir: tmpDir,
      currentFilePath: path.join(tmpDir, "SOUL.md"),
    });

    expect(resolved).toContain("Surface: Collaboration");
    expect(resolved).toContain("Augmentation principle");
    expect(resolved).toContain("Surface: Routing Conventions");
    expect(resolved).toContain("Score this paper = run the WCI");
  });

  it("Scenario 3: Prevents cyclic transclusion loops (Axiom L2)", async () => {
    await fs.writeFile(
      path.join(tmpDir, "A.md"),
      `---
redirect: B.md
---
Content A
`,
      "utf8",
    );
    await fs.writeFile(
      path.join(tmpDir, "B.md"),
      `---
redirect: A.md
---
Content B
`,
      "utf8",
    );

    const rawA = await fs.readFile(path.join(tmpDir, "A.md"), "utf8");
    const resolved = await resolveLiterateMarkdownSurface(rawA, {
      workspaceDir: tmpDir,
      currentFilePath: path.join(tmpDir, "A.md"),
    });

    // Should resolve B once and not recurse infinitely
    expect(resolved).toContain("Content B");
  });

  it("Scenario 4: Rejects directory escape / path traversal (Axiom L3)", async () => {
    const maliciousDoc = `---
redirect: ../../../../etc/passwd
---
Escaping
`;

    const resolved = await resolveLiterateMarkdownSurface(maliciousDoc, {
      workspaceDir: tmpDir,
      currentFilePath: path.join(tmpDir, "ATTACK.md"),
    });

    // Should fail safe and return unexpanded doc
    expect(resolved).toBe(maliciousDoc);
  });
});
