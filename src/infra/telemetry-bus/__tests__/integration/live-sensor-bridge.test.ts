/**
 * Tier 2 Integration Tests: Live Sensor Telemetry Bridge & peek / tokenomics_snr.
 */

import { describe, expect, it } from "vitest";
import { peek } from "../../../../agents/tools/envelope-tools.js";
import { tokenomics_snr, noise_inspect } from "../../../../agents/tools/tokenomics-tools.js";
import { registerActiveSessionTap } from "../../live-session-tap.js";

describe("Live Sensor Telemetry Bridge (Tier 2 Integration)", () => {
  it("resolves live token breakdown and changelog through peek()", async () => {
    registerActiveSessionTap({
      turns: [
        { role: "system", content: "System prompt instructions for testing live bus." },
        { role: "user", content: "User prompt message requesting analysis." },
      ],
      modelLimitTokens: 100000,
      releaseVersion: "1.2.0",
      changelog: ["Upgraded live telemetry bus tap"],
    });

    const resF1 = await peek("F1");
    expect(resF1.path).toBe("F1");
    const f1 = resF1.result as any;
    expect(f1.usedTokens).toBeGreaterThan(0);
    expect(f1.breakdown).toBeDefined();
    expect(f1.breakdown.systemPromptTokens).toBeGreaterThan(0);

    const resRelease = await peek("platform.version");
    expect(resRelease.result).toBe("1.2.0");
  });

  it("executes tokenomics_snr as zero-argument live sensor reading active turns", () => {
    registerActiveSessionTap({
      turns: [
        { role: "system", content: "You are the assistant." },
        { role: "user", content: "A meaningful user instruction without noise." },
      ],
    });

    // Zero-arg invocation
    const snr = tokenomics_snr();
    expect(snr.snrPercent).toBeGreaterThanOrEqual(0);
    expect(snr.tier).toBeDefined();

    const noise = noise_inspect();
    expect(noise.topSources).toBeDefined();
  });
});
