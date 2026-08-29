import { describe, expect, it } from "vitest";
import { BoundedToolFlightRecorder, type ToolLogEntry } from "./exec-flight-recorder.js";

describe("exec-flight-recorder (Tier 1 & Tier 4 Invariants)", () => {
  const createEntry = (id: string, overrides: Partial<ToolLogEntry> = {}): ToolLogEntry => ({
    id,
    timestamp: Date.now(),
    tool: "exec",
    command: `echo ${id}`,
    exitCode: 0,
    output: `Output for ${id}`,
    durationMs: 20,
    sessionId: "sess_1",
    ...overrides,
  });

  it("records entries and queries by pattern and tool", () => {
    const recorder = new BoundedToolFlightRecorder(10);
    recorder.record(createEntry("1", { command: "git status", output: "branch main" }));
    recorder.record(createEntry("2", { command: "pnpm test", output: "FAIL: math error", exitCode: 1 }));
    recorder.record(createEntry("3", { command: "ls -la", output: "total 4" }));

    const queryFailures = recorder.query({ failuresOnly: true });
    expect(queryFailures).toHaveLength(1);
    expect(queryFailures[0].command).toBe("pnpm test");

    const queryPattern = recorder.query({ pattern: "math" });
    expect(queryPattern).toHaveLength(1);
    expect(queryPattern[0].id).toBe("2");
  });

  it("enforces strict capacity ceiling under burst logging (Tier 4 Bounded Memory)", () => {
    const capacity = 25;
    const recorder = new BoundedToolFlightRecorder(capacity);

    for (let i = 0; i < 5000; i++) {
      recorder.record(createEntry(`item_${i}`, { output: `Chunk ${i} payload data` }));
    }

    expect(recorder.size()).toBe(capacity);
    const latest = recorder.query({ limit: 1 });
    expect(latest[0].id).toBe("item_4999");
  });
});
