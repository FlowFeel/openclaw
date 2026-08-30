import { describe, expect, it } from "vitest";
import {
  decorateWithBandwidthTelemetry,
  formatBandwidthTelemetry,
} from "./bandwidth-telemetry-envelope.js";
import { createInitialToolBudgetState, recordToolTurn } from "./tool-budget-controller.js";

describe("bandwidth-telemetry-envelope (Tier 1 & Tier 2 Telemetry Contracts)", () => {
  it("formats structured _bandwidth telemetry accurately", () => {
    let state = createInitialToolBudgetState();
    state = recordToolTurn(state, 4096);

    const envelope = formatBandwidthTelemetry(state, "optimal");
    expect(envelope._bandwidth.turns_used).toBe(1);
    expect(envelope._bandwidth.turns_remaining).toBe(2);
    expect(envelope._bandwidth.recon_budget).toBe("active");
    expect(envelope._bandwidth.bytes_ingested).toBe(4096);
    expect(envelope._bandwidth.search_efficiency).toBe("optimal");
  });

  it("decorates existing tool payload without mutating original object", () => {
    const original = { stdout: "hello world", exitCode: 0 };
    const state = createInitialToolBudgetState();

    const decorated = decorateWithBandwidthTelemetry(original, state, "suboptimal_linear_crawl");
    expect(decorated.stdout).toBe("hello world");
    expect(decorated.exitCode).toBe(0);
    expect(decorated._bandwidth.search_efficiency).toBe("suboptimal_linear_crawl");
    expect(decorated._bandwidth.turns_used).toBe(0);
  });
});
