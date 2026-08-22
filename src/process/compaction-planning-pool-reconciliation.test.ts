// Integration tests for compaction pool reconciliation (2a).
//
// Prediction (2a): the former CompactionPlanningWorkerPool (dedicated
// single-worker pool) has been retired. compaction-planning-worker.ts now
// uses TopicAffineWorkerPool<CompactionPlanningWorkerValue> directly — one
// pool abstraction for all request-response workers. The pool is lazily
// created (not in test mode) and terminateCompactionPlanningPool() terminates
// it on shutdown.
//
// Competing account: the old CompactionPlanningWorkerPool class might still
// exist (duplicate abstraction), or terminateCompactionPlanningPool might
// not terminate the pool (leak), or the pool might be created in test mode
// (interfering with tests).
//
// Support: compaction-planning-worker.ts imports TopicAffineWorkerPool (not
// a CompactionPlanningWorkerPool); no CompactionPlanningWorkerPool class
// exists; terminateCompactionPlanningPool is exported and terminates the
// pool; the pool is disabled in test mode (VITEST env).
//
// Refute: CompactionPlanningWorkerPool class still exists; pool created in
// test mode; terminateCompactionPlanningPool doesn't terminate.
import { describe, expect, it } from "vitest";

describe("compaction pool reconciliation (2a)", () => {
  it("compaction-planning-worker.ts imports TopicAffineWorkerPool (not a dedicated pool class)", async () => {
    // Read the source file and verify it imports TopicAffineWorkerPool.
    // This is a structural test — it verifies the reconciliation happened.
    const fs = await import("node:fs");
    const path = await import("node:path");
    const sourcePath = path.join(__dirname, "..", "agents", "compaction-planning-worker.ts");
    const source = fs.readFileSync(sourcePath, "utf-8");

    // Prediction: the file imports TopicAffineWorkerPool.
    expect(source).toContain("TopicAffineWorkerPool");

    // The old CompactionPlanningWorkerPool class should NOT exist.
    // (It was deleted in commit c7430e08.)
    expect(source).not.toContain("class CompactionPlanningWorkerPool");
  });

  it("no CompactionPlanningWorkerPool file exists (retired in 2a)", async () => {
    // The former compaction-planning-pool.ts was deleted in 2a.
    const fs = await import("node:fs");
    const path = await import("node:path");
    const poolFilePath = path.join(__dirname, "..", "agents", "compaction-planning-pool.ts");

    // Prediction: the file does not exist (deleted in 2a).
    expect(fs.existsSync(poolFilePath)).toBe(false);
  });

  it("terminateCompactionPlanningPool is exported", async () => {
    // Prediction: terminateCompactionPlanningPool is exported from
    // compaction-planning-worker.ts and is wired into runtime cleanup.
    const module = await import("../agents/compaction-planning-worker.js");

    expect(typeof module.terminateCompactionPlanningPool).toBe("function");
  });

  it("terminateCompactionPlanningPool is safe to call when pool was never created", async () => {
    // In test mode, resolvePool() returns null (pool disabled). Calling
    // terminateCompactionPlanningPool should be a safe no-op.
    const { terminateCompactionPlanningPool } =
      await import("../agents/compaction-planning-worker.js");

    // Should not throw — pool is null in test mode.
    await expect(terminateCompactionPlanningPool()).resolves.toBeUndefined();
  });

  it("pool is disabled in test mode (VITEST env check)", async () => {
    // Read the source and verify the VITEST env check exists.
    const fs = await import("node:fs");
    const path = await import("node:path");
    const sourcePath = path.join(__dirname, "..", "agents", "compaction-planning-worker.ts");
    const source = fs.readFileSync(sourcePath, "utf-8");

    // Prediction: resolvePool checks process.env.VITEST and returns null.
    // This prevents the pool from interfering with vitest tests.
    expect(source).toContain("process.env.VITEST");
    expect(source).toContain("return null");
  });

  it("runtime-setup.ts imports terminateCompactionPlanningPool for cleanup", async () => {
    // Prediction: runtime-setup.ts calls terminateCompactionPlanningPool
    // in its cleanup function (wired into gateway lifetime sidecar).
    const fs = await import("node:fs");
    const path = await import("node:path");
    const sourcePath = path.join(__dirname, "runtime-setup.ts");
    const source = fs.readFileSync(sourcePath, "utf-8");

    expect(source).toContain("terminateCompactionPlanningPool");
  });
});
