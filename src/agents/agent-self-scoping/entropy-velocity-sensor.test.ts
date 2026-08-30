import { describe, expect, it } from "vitest";
import {
  createInitialEntropySensor,
  recordToolSample,
} from "./entropy-velocity-sensor.js";

describe("entropy-velocity-sensor (Tier 1 & Tier 4 Invariants)", () => {
  it("initializes with high velocity grade", () => {
    const sensor = createInitialEntropySensor(5);
    expect(sensor.velocityGrade).toBe("high");
    expect(sensor.samples).toHaveLength(0);
  });

  it("detects stalled loops on 3 consecutive errors", () => {
    let sensor = createInitialEntropySensor(5);
    sensor = recordToolSample(sensor, { tool: "read", isError: true, outputSignature: "ENOENT" });
    sensor = recordToolSample(sensor, { tool: "read", isError: true, outputSignature: "ENOENT" });
    sensor = recordToolSample(sensor, { tool: "read", isError: true, outputSignature: "ENOENT" });

    expect(sensor.velocityGrade).toBe("stalled");
  });

  it("detects declining velocity on duplicate consecutive operations", () => {
    let sensor = createInitialEntropySensor(5);
    sensor = recordToolSample(sensor, {
      tool: "read",
      target: "config.yaml",
      isError: false,
      outputSignature: "sig_1",
    });
    sensor = recordToolSample(sensor, {
      tool: "read",
      target: "config.yaml",
      isError: false,
      outputSignature: "sig_1",
    });

    expect(sensor.velocityGrade).toBe("declining");
  });

  it("enforces strict sliding window bounds under burst load (Tier 4)", () => {
    let sensor = createInitialEntropySensor(5);
    for (let i = 0; i < 1000; i++) {
      sensor = recordToolSample(sensor, {
        tool: "exec",
        target: `cmd_${i}`,
        isError: false,
        outputSignature: `out_${i}`,
      });
    }

    expect(sensor.samples.length).toBe(5);
    expect(sensor.velocityGrade).toBe("high");
  });
});
