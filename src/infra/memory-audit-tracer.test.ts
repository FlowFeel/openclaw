import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  auditMemoryFile,
  parseAndAuditMemoryMarkdown,
} from "./memory-audit-tracer.js";

describe("parseAndAuditMemoryMarkdown (Pure DFT Verifier)", () => {
  it("parses sections within budget and classifies as healthy", () => {
    const markdown = `
# User Profile
User name: Alice
Preferred tone: Direct and concise

# System Preferences
Theme: Dark mode
Enable sound: false

# Topic Notes
Working on OpenClaw telemetry improvements.
    `.trim();

    const result = parseAndAuditMemoryMarkdown(markdown, "MEMORY.md", 8192);

    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      expect(result.sections.length).toBe(3);
      expect(result.sections.map((s) => s.heading)).toEqual([
        "User Profile",
        "System Preferences",
        "Topic Notes",
      ]);
      expect(result.budgetUtilizationPercent).toBeGreaterThan(0);
      expect(result.budgetUtilizationPercent).toBeLessThan(100);
      expect(result.sections.every((s) => !s.isTruncated)).toBe(true);
    }
  });

  it("detects budget overflow and flags truncated status", () => {
    const largeContent = "# Section 1\n" + "A".repeat(5000) + "\n# Section 2\n" + "B".repeat(5000);
    const result = parseAndAuditMemoryMarkdown(largeContent, "MEMORY.md", 4000);

    expect(result.status).toBe("truncated");
    if (result.status === "truncated") {
      expect(result.totalBytes).toBeGreaterThan(10000);
      expect(result.truncatedBytes).toBeGreaterThan(6000);
      expect(result.warning).toContain("Memory file exceeds budget");
    }
  });

  it("handles empty markdown correctly", () => {
    const result = parseAndAuditMemoryMarkdown("   ", "EMPTY.md", 8192);
    expect(result.status).toBe("empty");
  });
});

describe("auditMemoryFile (Subsystem Tests)", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "memory-audit-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("returns missing status when file does not exist", () => {
    const missing = path.join(tempDir, "nonexistent.md");
    const result = auditMemoryFile(missing);
    expect(result.status).toBe("missing");
  });

  it("audits file on disk", () => {
    const filePath = path.join(tempDir, "MEMORY.md");
    fs.writeFileSync(filePath, "# Active Context\nWorking on Phase 4.");

    const result = auditMemoryFile(filePath, 8192);
    expect(result.status).toBe("healthy");
  });
});
