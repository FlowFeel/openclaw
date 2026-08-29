/**
 * Vitest suite for pure Care Package Template Interpolation & Idempotency logic.
 */

import { describe, expect, it } from "vitest";
import {
  buildTopicCarePackageKey,
  shouldDeliverCarePackage,
} from "./care-package-idempotency.js";
import {
  interpolateCarePackageTemplate,
  type CarePackageVariables,
} from "./care-package-template-engine.js";

describe("Care Package Pure Template Engine (Axiom A1)", () => {
  it("interpolates all standard variables in template", () => {
    const template = "Welcome to {{topic_title}} (ID: {{topic_id}}) in {{group}} created by {{owner}} at {{timestamp}}!";
    const vars: CarePackageVariables = {
      topic_title: "Incident Remediation",
      topic_id: 1042,
      group: "Foundry Core",
      owner: "gridclaw",
      timestamp: "2026-08-29 10:00:00 UTC",
    };

    const rendered = interpolateCarePackageTemplate(template, vars);
    expect(rendered).toBe(
      "Welcome to Incident Remediation (ID: 1042) in Foundry Core created by gridclaw at 2026-08-29 10:00:00 UTC!",
    );
  });

  it("leaves unknown placeholders intact and handles empty text", () => {
    expect(interpolateCarePackageTemplate("", { topic_title: "t", topic_id: 1, group: "g", owner: "o", timestamp: "ts" })).toBe("");
    expect(interpolateCarePackageTemplate("Hello {{unknown_var}}!", { topic_title: "t", topic_id: 1, group: "g", owner: "o", timestamp: "ts" })).toBe("Hello {{unknown_var}}!");
  });
});

describe("Care Package Idempotency Math (Axiom A1)", () => {
  it("generates canonical idempotency key", () => {
    expect(buildTopicCarePackageKey("-1001234", 99)).toBe("topic:care_package:sent:-1001234:99");
  });

  it("evaluates delivery readiness based on config and set inclusion", () => {
    const set = new Set<string>();

    expect(shouldDeliverCarePackage(set, "-1001234", 99, false)).toBe(false);
    expect(shouldDeliverCarePackage(set, "-1001234", 99, true)).toBe(true);

    set.add("topic:care_package:sent:-1001234:99");
    expect(shouldDeliverCarePackage(set, "-1001234", 99, true)).toBe(false);
  });
});
