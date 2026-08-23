import { describe, expect, it } from "vitest";
import { partitionSandwich } from "./sandwich-partitioner.js";

describe("Tier 1: partitionSandwich (Dynamic Arity & Fence Safety)", () => {
  it("partitions documents dynamically with arbitrary budget parameters (e.g. k=20 vs k=40)", () => {
    const lines = Array.from({ length: 100 }, (_, i) => `Line ${i + 1}: descriptive text`);
    const doc = lines.join("\n");

    // Dynamic test 1: k_entry=20, k_exit=20
    const result20 = partitionSandwich(doc, { entryBudget: 20, exitBudget: 20 });
    expect(result20.entryBudget).toBe(20);
    expect(result20.entryLines).toBe(20);
    expect(result20.exitLines).toBe(20);
    expect(result20.bodyText).toContain("Line 21");
    expect(result20.bodyText).toContain("Line 80");

    // Dynamic test 2: k_entry=40, k_exit=40
    const result40 = partitionSandwich(doc, { entryBudget: 40, exitBudget: 40 });
    expect(result40.entryBudget).toBe(40);
    expect(result40.entryLines).toBe(40);
    expect(result40.exitLines).toBe(40);
    expect(result40.bodyText).toContain("Line 41");
    expect(result40.bodyText).toContain("Line 60");
  });

  it("safely extends entry cut to prevent severing code fences", () => {
    const docLines = [
      "# Header",
      "```typescript",
      ...Array.from({ length: 45 }, (_, i) => `const val_${i} = ${i};`),
      "```",
      "## Middle Section",
      ...Array.from({ length: 50 }, (_, i) => `Paragraph content ${i};`),
      "## Exit Section",
      ...Array.from({ length: 20 }, (_, i) => `- Pointer ${i}`),
    ];
    const doc = docLines.join("\n");

    const result = partitionSandwich(doc, { entryBudget: 20, exitBudget: 20 });
    // Code block began at line 1 and ended at line 47; entry must extend past closing fence
    expect(result.entryText).toContain("```typescript");
    expect(result.entryText).toContain("const val_44 = 44;\n```");
    expect(result.bodyText).toContain("## Middle Section");
  });

  it("handles short documents without artificial splitting", () => {
    const shortDoc = `# Quick Guide
- Parameter 1
- Parameter 2`;

    const result = partitionSandwich(shortDoc, { entryBudget: 40, exitBudget: 40 });
    expect(result.bodyText).toBe("");
    expect(result.entryText).toBe(shortDoc);
    expect(result.exitText).toBe(shortDoc);
  });
});
