import { describe, it, expect } from "vitest";
import { TelegramSessionGuard } from "./telegram-session-guard.js";

describe("Degree 1: TelegramSessionGuard Contract & Concurrency Invariants", () => {
  it("serializes concurrent turns on the same sessionKey and returns execution results", async () => {
    const guard = new TelegramSessionGuard();
    const executionOrder: string[] = [];

    const p1 = guard.executeGuardedTurn({
      sessionKey: "agent:main:telegram:group:-100:topic:1",
      executeTurn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
        executionOrder.push("turn1");
        return "reply1";
      },
    });

    const p2 = guard.executeGuardedTurn({
      sessionKey: "agent:main:telegram:group:-100:topic:1",
      executeTurn: async () => {
        executionOrder.push("turn2");
        return "reply2";
      },
    });

    const [r1, r2] = await Promise.all([p1, p2]);
    expect(executionOrder).toEqual(["turn1", "turn2"]);
    expect(r1.value).toBe("reply1");
    expect(r2.value).toBe("reply2");
    expect(r1.status).toBe("executed");
    expect(r2.status).toBe("executed");
  });

  it("transparently retries and recovers from transient optimistic session collisions", async () => {
    const guard = new TelegramSessionGuard({ initialBackoffMs: 5 });
    let attempts = 0;
    const retryLog: number[] = [];

    const result = await guard.executeGuardedTurn({
      sessionKey: "agent:main:telegram:group:-100:topic:1",
      executeTurn: async () => {
        attempts++;
        if (attempts === 1) {
          throw new Error('Session "agent:main:telegram:group:-100:topic:1" changed while starting work. Retry.');
        }
        return "recovered_reply";
      },
      onRetry: (attempt) => {
        retryLog.push(attempt);
      },
    });

    expect(result.value).toBe("recovered_reply");
    expect(result.status).toBe("retried");
    expect(result.attempts).toBe(2);
    expect(retryLog).toEqual([1]);
  });
});
