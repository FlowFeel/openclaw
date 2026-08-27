import { describe, expect, it } from "vitest";
import {
  mergeSectionOverrides,
  normalizeSectionOverride,
  resolveInjectedSectionLines,
} from "../../injector.js";

describe("Tier 1 Unit: System Prompt Section Injector", () => {
  it("normalizes single strings with newlines", () => {
    const res = normalizeSectionOverride("Line 1\nLine 2");
    expect(res).toEqual(["Line 1", "Line 2"]);
  });

  it("normalizes string arrays", () => {
    const res = normalizeSectionOverride(["Line 1", "Line 2\nLine 3"]);
    expect(res).toEqual(["Line 1", "Line 2", "Line 3"]);
  });

  it("returns undefined for null, undefined, or empty string", () => {
    expect(normalizeSectionOverride(null)).toBeUndefined();
    expect(normalizeSectionOverride(undefined)).toBeUndefined();
    expect(normalizeSectionOverride("")).toBeUndefined();
    expect(normalizeSectionOverride("   ")).toBeUndefined();
  });

  it("merges config defaults with session overrides prioritizing session overrides", () => {
    const config = { identity: "Config Persona", safety: "Config Safety" };
    const session = { identity: "Session Persona", messaging: "Session Messaging" };
    const merged = mergeSectionOverrides(config, session);

    expect(merged.identity).toBe("Session Persona");
    expect(merged.safety).toBe("Config Safety");
    expect(merged.messaging).toBe("Session Messaging");
  });

  it("resolves injected section override when present", () => {
    const overrides = { identity: "Custom Persona" };
    const lines = resolveInjectedSectionLines("identity", overrides, () => ["Fallback"]);
    expect(lines).toEqual(["Custom Persona"]);
  });

  it("forces empty array when override is null or empty string", () => {
    const overrides = { safety: null };
    const lines = resolveInjectedSectionLines("safety", overrides, () => ["Fallback Safety"]);
    expect(lines).toEqual([]);
  });

  it("calls fallback provider when section is not in overrides map", () => {
    const lines = resolveInjectedSectionLines("safety", undefined, () => ["Fallback Safety"]);
    expect(lines).toEqual(["Fallback Safety"]);
  });
});
