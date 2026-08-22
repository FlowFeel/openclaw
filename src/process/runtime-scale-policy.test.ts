// Tests for the pure runtime scale policy (§3.1 — kernel tested without threads).
import { describe, expect, it } from "vitest";
import {
  MAX_WORKER_COUNT,
  resolveRuntimeScale,
  type HostCapabilities,
  type RuntimeConfig,
} from "./runtime-scale-policy.js";

describe("resolveRuntimeScale", () => {
  const singleCpu: HostCapabilities = { availableParallelism: 1 };
  const eightCpu: HostCapabilities = { availableParallelism: 8 };
  const sixtyFourCpu: HostCapabilities = { availableParallelism: 64 };

  describe("auto (default)", () => {
    it("resolves to Scale 0 on a 1-CPU host", () => {
      const result = resolveRuntimeScale({}, singleCpu);
      expect(result.scale).toBe(0);
      expect(result.poolSize).toBe(0);
      expect(result.isolation).toBe("auto");
      expect(result.reason).toContain("Scale 0");
    });

    it("resolves to Scale 1 on a >1-CPU host", () => {
      const result = resolveRuntimeScale({}, eightCpu);
      expect(result.scale).toBe(1);
      expect(result.poolSize).toBe(8);
      expect(result.isolation).toBe("auto");
      expect(result.reason).toContain("Scale 1");
    });

    it("caps poolSize at MAX_WORKER_COUNT", () => {
      const result = resolveRuntimeScale({}, sixtyFourCpu);
      expect(result.scale).toBe(1);
      expect(result.poolSize).toBe(MAX_WORKER_COUNT);
    });
  });

  describe("disabled", () => {
    it("always resolves to Scale 0 regardless of CPUs", () => {
      const result = resolveRuntimeScale({ isolation: "disabled" }, eightCpu);
      expect(result.scale).toBe(0);
      expect(result.poolSize).toBe(0);
      expect(result.isolation).toBe("disabled");
    });
  });

  describe("in-process", () => {
    it("resolves to Scale 1 with the requested workerCount", () => {
      const result = resolveRuntimeScale({ isolation: "in-process", workerCount: 4 }, eightCpu);
      expect(result.scale).toBe(1);
      expect(result.poolSize).toBe(4);
      expect(result.isolation).toBe("in-process");
    });

    it("defaults poolSize to availableParallelism when workerCount omitted", () => {
      const result = resolveRuntimeScale({ isolation: "in-process" }, eightCpu);
      expect(result.scale).toBe(1);
      expect(result.poolSize).toBe(8);
    });

    it("forces Scale 1 even on a 1-CPU host", () => {
      const result = resolveRuntimeScale({ isolation: "in-process", workerCount: 2 }, singleCpu);
      expect(result.scale).toBe(1);
      expect(result.poolSize).toBe(2);
    });

    it("clamps workerCount to MAX_WORKER_COUNT", () => {
      const result = resolveRuntimeScale({ isolation: "in-process", workerCount: 999 }, eightCpu);
      expect(result.poolSize).toBe(MAX_WORKER_COUNT);
    });
  });

  describe("remote", () => {
    it("resolves to Scale 2", () => {
      const result = resolveRuntimeScale({ isolation: "remote" }, eightCpu);
      expect(result.scale).toBe(2);
      expect(result.poolSize).toBe(0);
      expect(result.isolation).toBe("remote");
    });
  });

  describe("determinism (A2)", () => {
    it("same inputs always yield the same output", () => {
      const config: RuntimeConfig = { isolation: "in-process", workerCount: 4 };
      const host: HostCapabilities = { availableParallelism: 8 };
      const a = resolveRuntimeScale(config, host);
      const b = resolveRuntimeScale(config, host);
      expect(a).toEqual(b);
    });
  });
});
