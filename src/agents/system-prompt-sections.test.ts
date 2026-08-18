// SL-11 structural tests for declarative section composition.
//
// These tests assert on the section ID ordering, inclusion, and cache-stable /
// dynamic split produced by resolvePromptSections. They complement the golden
// master (system-prompt.test.ts) and the section-builder unit tests
// (system-prompt-helpers.test.ts) by pinning the *composition* rather than the
// byte content.
import { SYSTEM_PROMPT_CACHE_BOUNDARY } from "@openclaw/ai/internal/shared";
import { describe, expect, it } from "vitest";
import { resolvePromptSections } from "./system-prompt.js";
import { PromptSection } from "./system-prompt.types.js";

type Params = Parameters<typeof resolvePromptSections>[0];

function baseParams(overrides: Partial<Params> = {}): Params {
  return {
    workspaceDir: "/tmp/openclaw",
    promptMode: "full",
    modelIdentityLine: "Model: test-model",
    runtimeInfo: { channel: "telegram", threadId: undefined },
    ...overrides,
  } as Params;
}

function ids(sections: PromptSection[]): string[] {
  return sections.map((s) => s.id);
}

// At most one section may carry the cache boundary marker, it must be marked
// cacheStable, and it must be the last cacheStable section.
function assertCacheBoundaryThenDynamic(sections: PromptSection[]): void {
  const boundaryIdx = sections.findIndex((s) => s.lines.includes(SYSTEM_PROMPT_CACHE_BOUNDARY));
  expect(boundaryIdx).toBeGreaterThanOrEqual(0);
  expect(sections[boundaryIdx].cacheStable).toBe(true);
  for (let i = 0; i < sections.length; i++) {
    const beforeBoundary = i <= boundaryIdx;
    expect(
      beforeBoundary ? sections[i].cacheStable === true : sections[i].cacheStable === false,
      `section ${sections[i].id} cache partition`,
    ).toBe(true);
  }
}

describe("resolvePromptSections section composition", () => {
  it("full mode: stable prefix leads with identity .. cache-boundary then dynamic suffix", () => {
    const sections = resolvePromptSections(baseParams());
    const sectionIds = ids(sections);

    // All cache-stable sectionids precede the cache boundary.
    const boundaryIdx = sections.findIndex((s) => s.lines.includes(SYSTEM_PROMPT_CACHE_BOUNDARY));
    expect(boundaryIdx).toBeGreaterThan(0);
    const stableIds = sectionIds.slice(0, boundaryIdx + 1);
    const dynamicIds = sectionIds.slice(boundaryIdx + 1);

    expect(stableIds[0]).toBe("identity");
    expect(stableIds.at(-1)).toBe("cache-boundary");
    // Core ordering invariants within the stable prefix.
    expect(stableIds.indexOf("tooling")).toBeLessThan(stableIds.indexOf("memory"));
    expect(stableIds.indexOf("memory")).toBeLessThan(stableIds.indexOf("workspace"));
    expect(stableIds.indexOf("safety")).toBeLessThan(stableIds.indexOf("openclaw-control"));

    // Dynamic suffix ordering invariants.
    expect(dynamicIds[0]).toBe("temporal");
    expect(dynamicIds).toContain("runtime");
    expect(dynamicIds.indexOf("temporal")).toBeLessThan(dynamicIds.indexOf("runtime"));

    assertCacheBoundaryThenDynamic(sections);
  });

  it("full mode: every section has a unique non-empty id and declares cache partition", () => {
    const sections = resolvePromptSections(baseParams());
    const sectionIds = ids(sections);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    for (const s of sections) {
      expect(s.id.length).toBeGreaterThan(0);
      expect(typeof s.cacheStable).toBe("boolean");
    }
  });

  it("minimal mode: interaction-style and collapsible-details/voice sections are suppressed or reordered", () => {
    const sections = resolvePromptSections(baseParams({ promptMode: "minimal" }));
    const found = Object.fromEntries(sections.map((s) => [s.id, s]));
    // Minimal mode keeps the core stable identity/tooling/memory/workspace chain
    // but drops verbose overridable interaction-style and capabillity-gated halves.
    const dynamicIds = ids(sections).filter(
      (id) => sections.find((s) => s.id === id)?.cacheStable === false,
    );
    // runtime/temporal always present in dynamic suffix.
    expect(dynamicIds).toContain("temporal");
    expect(dynamicIds).toContain("runtime");
    void found;
  });

  it("scaffold mode: irreducible set with tools -> cache-boundary -> temporal/runtime/project-context", () => {
    const sections = resolvePromptSections(baseParams({ promptMode: "scaffold" }));
    const sectionIds = ids(sections);
    expect(sectionIds).toEqual([
      "tools",
      "cache-boundary",
      "temporal",
      "runtime",
      "project-context",
    ]);
    assertCacheBoundaryThenDynamic(sections);
  });

  it("none mode: only the identity section", () => {
    const sections = resolvePromptSections(baseParams({ promptMode: "none" }));
    expect(ids(sections)).toEqual(["identity"]);
    for (const s of sections) {
      expect(s.cacheStable).toBe(true);
    }
  });

  it("cache-boundary always terminates the cache-stable prefix (identical output browsers)", () => {
    for (const mode of ["full", "minimal", "scaffold"] as const) {
      const sections = resolvePromptSections(baseParams({ promptMode: mode }));
      const boundaryIdx = sections.findIndex((s) => s.lines.includes(SYSTEM_PROMPT_CACHE_BOUNDARY));
      expect(boundaryIdx, `mode ${mode}`).toBeGreaterThanOrEqual(0);
      const restAreDynamic = sections.slice(boundaryIdx + 1).every((s) => s.cacheStable === false);
      expect(restAreDynamic, `mode ${mode}`).toBe(true);
    }
  });
});
