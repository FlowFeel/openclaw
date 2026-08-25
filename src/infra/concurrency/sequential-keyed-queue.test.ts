import { describe, it, expect } from "vitest";
import { SequentialKeyedQueue } from "./sequential-keyed-queue.js";

describe("Degree 0: SequentialKeyedQueue Pure Invariants", () => {
  it("executes tasks for the same key in strict FIFO sequence", async () => {
    const queue = new SequentialKeyedQueue();
    const order: number[] = [];

    const task1 = queue.runExclusive("session:1", async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
      order.push(1);
      return "res1";
    });

    const task2 = queue.runExclusive("session:1", async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      order.push(2);
      return "res2";
    });

    const task3 = queue.runExclusive("session:1", async () => {
      order.push(3);
      return "res3";
    });

    const results = await Promise.all([task1, task2, task3]);
    expect(order).toEqual([1, 2, 3]);
    expect(results).toEqual(["res1", "res2", "res3"]);
    expect(queue.queueCount).toBe(0);
    expect(queue.collisionsAvoided).toBe(2);
  });

  it("executes tasks for different keys concurrently without blocking", async () => {
    const queue = new SequentialKeyedQueue();
    const startTimes: Record<string, number> = {};

    const taskA = queue.runExclusive("session:A", async () => {
      startTimes["A"] = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 40));
      return "A_done";
    });

    const taskB = queue.runExclusive("session:B", async () => {
      startTimes["B"] = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 40));
      return "B_done";
    });

    await Promise.all([taskA, taskB]);
    expect(Math.abs(startTimes["A"] - startTimes["B"])).toBeLessThan(25);
    expect(queue.queueCount).toBe(0);
  });

  it("propagates errors without breaking subsequent tasks in the queue", async () => {
    const queue = new SequentialKeyedQueue();
    const executed: string[] = [];

    const task1 = queue.runExclusive("session:fail", async () => {
      throw new Error("Task 1 boom");
    });

    const task2 = queue.runExclusive("session:fail", async () => {
      executed.push("task2");
      return "task2_ok";
    });

    await expect(task1).rejects.toThrow("Task 1 boom");
    const res2 = await task2;
    expect(res2).toBe("task2_ok");
    expect(executed).toEqual(["task2"]);
    expect(queue.queueCount).toBe(0);
  });
});
