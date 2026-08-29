import { describe, expect, it } from "vitest";
import { distillPlatformSnapshot } from "./platform-snapshot.js";

describe("platform-snapshot (Tier 1 Pure Invariants)", () => {
  it("distills composite snapshot with full telemetry and context health", () => {
    const snapshot = distillPlatformSnapshot({
      sessionId: "sess_42",
      platform: "linux",
      arch: "arm64",
      nodeVersion: "v22.0.0",
      workspaceRoot: "/home/ubuntu/agent",
      activeCwd: "/home/ubuntu/agent/src",
      activeTopic: "src/infra",
      toolCount: 14,
      isSandbox: false,
      contextTokenBudget: { usedTokens: 40_000, maxTokens: 200_000 },
    });

    expect(snapshot.schemaVersion).toBe("1.0.0");
    expect(snapshot.session.id).toBe("sess_42");
    expect(snapshot.session.activeCwd).toBe("/home/ubuntu/agent/src");
    expect(snapshot.session.activeTopic).toBe("src/infra");
    expect(snapshot.host.os).toBe("linux");
    expect(snapshot.host.sandbox).toBe(false);
    expect(snapshot.contextHealth?.utilizationPercent).toBe(20);
  });
});
