import { describe, expect, it } from "vitest";
import {
  getAvailablePromptSections,
  isCacheStableSection,
  isMechanicSection,
} from "../../registry.js";

describe("Tier 1 Unit: System Prompt Primitive Registry", () => {
  it("enumerates all 28 section primitives with descriptors", () => {
    const catalog = getAvailablePromptSections();
    expect(catalog.length).toBeGreaterThanOrEqual(28);

    const ids = catalog.map((s) => s.id);
    expect(ids).toContain("tools");
    expect(ids).toContain("identity");
    expect(ids).toContain("safety");
    expect(ids).toContain("tool-call-style");
    expect(ids).toContain("messaging");
    expect(ids).toContain("reactions");
  });

  it("correctly identifies core mechanics sections", () => {
    expect(isMechanicSection("tools")).toBe(true);
    expect(isMechanicSection("temporal")).toBe(true);
    expect(isMechanicSection("runtime")).toBe(true);
    expect(isMechanicSection("cache-boundary")).toBe(true);
    expect(isMechanicSection("project-context-stable")).toBe(true);
  });

  it("correctly identifies zero-cost non-mechanic primitives", () => {
    expect(isMechanicSection("identity")).toBe(false);
    expect(isMechanicSection("safety")).toBe(false);
    expect(isMechanicSection("tool-call-style")).toBe(false);
    expect(isMechanicSection("execution-bias")).toBe(false);
    expect(isMechanicSection("messaging")).toBe(false);
    expect(isMechanicSection("reactions")).toBe(false);
  });

  it("classifies cache stability correctly across boundary", () => {
    expect(isCacheStableSection("identity")).toBe(true);
    expect(isCacheStableSection("safety")).toBe(true);
    expect(isCacheStableSection("tools")).toBe(true);
    expect(isCacheStableSection("temporal")).toBe(false);
    expect(isCacheStableSection("runtime")).toBe(false);
    expect(isCacheStableSection("messaging")).toBe(false);
  });
});
