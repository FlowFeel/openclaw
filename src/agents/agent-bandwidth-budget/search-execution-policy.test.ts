import { describe, expect, it } from "vitest";
import {
  assessSearchOperation,
  clampPayloadBytes,
} from "./search-execution-policy.js";

describe("search-execution-policy (Tier 1 Pure Invariants)", () => {
  it("assesses targeted grep commands as optimal", () => {
    const res = assessSearchOperation({
      toolName: "exec",
      commandText: "grep -rn 'handleTelegramWebhook' src/",
      responseBytes: 512,
    });
    expect(res.efficiency).toBe("optimal");
    expect(res.advisoryComment).toBeUndefined();
  });

  it("detects unfiltered directory crawling as suboptimal", () => {
    const res = assessSearchOperation({
      toolName: "exec",
      commandText: "find src/agents/",
      responseBytes: 1024,
    });
    expect(res.efficiency).toBe("suboptimal_linear_crawl");
    expect(res.advisoryComment).toContain("Unfiltered directory listing detected");
  });

  it("flags oversized payloads and clamps byte length", () => {
    const res = assessSearchOperation({
      toolName: "read",
      filePath: "large_bundle.js",
      responseBytes: 32768,
    }, 16384);
    expect(res.efficiency).toBe("oversized_payload");
    expect(res.advisoryComment).toContain("exceeds recommended recon limit");

    const hugeText = "A".repeat(20000);
    const clamped = clampPayloadBytes(hugeText, 1000);
    expect(Buffer.byteLength(clamped, "utf8")).toBeLessThanOrEqual(1050);
    expect(clamped).toContain("[TRUNCATED: Exceeded 1000B limit]");
  });
});
