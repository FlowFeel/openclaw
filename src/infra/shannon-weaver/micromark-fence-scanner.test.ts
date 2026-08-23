import { describe, expect, it } from "vitest";
import { extractCodeFences } from "./micromark-fence-scanner.js";

describe("Tier 1: extractCodeFences (Syntax Inspection)", () => {
  it("extracts multiple typed code blocks without backslash escaping", () => {
    const doc = `# Tool Specifications

\`\`\`json
{
  "tool": "system_probe",
  "action": "inspect"
}
\`\`\`

Some explanation text in between.

\`\`\`typescript
export function run(): boolean {
  return true;
}
\`\`\`
`;

    const blocks = extractCodeFences(doc);
    expect(blocks).toHaveLength(2);

    expect(blocks[0]?.language).toBe("json");
    expect(blocks[0]?.code).toContain('"tool": "system_probe"');
    expect(blocks[0]?.lineCount).toBe(4);

    expect(blocks[1]?.language).toBe("typescript");
    expect(blocks[1]?.code).toContain("export function run()");
  });

  it("handles empty code blocks gracefully", () => {
    const doc = "```bash\n```";
    const blocks = extractCodeFences(doc);
    expect(blocks).toHaveLength(1);
    expect(blocks[0]?.language).toBe("bash");
    expect(blocks[0]?.code).toBe("");
  });
});
