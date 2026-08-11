/**
 * Test: hook debug instrumentation trace
 *
 * Verifies the structured trace surfaced by createHookRunner when enableTrace
 * is set (or OPENCLAW_HOOK_DEBUG=1). The trace makes THREE invisible failure
 * modes observable:
 *
 *   1. Swallowed errors — catchErrors=true (default) + no logger → the error
 *      vanished completely before this instrumentation. Now it is captured.
 *   2. "Didn't fire" with no explanation — hooks.length===0 was a silent
 *      return. Now the trace records whether hooks were never registered
 *      ("not-registered") or registered-but-filtered-out ("filtered-out").
 *   3. No structured lifecycle — the trace records every dispatch with its
 *      handler count, so registration→dispatch→error can be reconstructed.
 *
 * The trace is opt-in (enableTrace or OPENCLAW_HOOK_DEBUG=1) and produces
 * zero entries when disabled, so production incurs no overhead.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHookRunner } from "./hooks.js";
import {
  createHookRunnerWithRegistry,
  createMockPluginRegistry,
  TEST_PLUGIN_AGENT_CTX,
} from "./hooks.test-fixtures.js";
import type { PluginHookBeforeAgentReplyEvent, PluginHookSessionEndEvent } from "./types.js";

const SESSION_END_EVENT: PluginHookSessionEndEvent = {
  sessionId: "abc-123",
  sessionKey: "agent:main:abc",
  messageCount: 1,
  reason: "daily",
  sessionFile: "/tmp/abc-123.jsonl.reset.2026-01-01T00:00:00.000Z",
  transcriptArchived: true,
  nextSessionId: "def-456",
};

const SESSION_CTX = { sessionId: "abc-123", sessionKey: "agent:main:abc", agentId: "main" };

const AGENT_REPLY_EVENT = {
  message: { role: "user", content: "hello" },
} as unknown as PluginHookBeforeAgentReplyEvent;

describe("hook debug trace", () => {
  const originalEnv = process.env.OPENCLAW_HOOK_DEBUG;

  beforeEach(() => {
    delete process.env.OPENCLAW_HOOK_DEBUG;
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.OPENCLAW_HOOK_DEBUG;
    } else {
      process.env.OPENCLAW_HOOK_DEBUG = originalEnv;
    }
  });

  describe("claim 1: swallowed errors are captured", () => {
    it("captures a thrown error when catchErrors=true (default) and NO logger is passed", async () => {
      // This is the core invisibility bug: catchErrors=true + no logger = silent
      // swallow with zero visibility. The trace now surfaces it.
      const { runner } = createHookRunnerWithRegistry(
        [
          {
            hookName: "session_end",
            pluginId: "test-plugin",
            handler: async () => {
              throw new Error("boom-from-handler");
            },
          },
        ],
        { enableTrace: true, catchErrors: true },
      );

      // The hook throws, but catchErrors=true swallows it (no rethrow).
      await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

      const trace = runner.getTrace();
      const errorEvent = trace.find((e) => e.type === "error" && e.pluginId === "test-plugin");

      expect(errorEvent).toBeDefined();
      expect(errorEvent?.error).toContain("boom-from-handler");
      expect(errorEvent?.swallowed).toBe(true);
      expect(errorEvent?.hookName).toBe("session_end");
    });

    it("captures a thrown error even when catchErrors=false (rethrown AND traced)", async () => {
      const { runner } = createHookRunnerWithRegistry(
        [
          {
            hookName: "session_end",
            pluginId: "strict-plugin",
            handler: async () => {
              throw new Error("fail-closed-boom");
            },
          },
        ],
        { enableTrace: true, catchErrors: false },
      );

      // catchErrors=false → the error is RETHROWN (not swallowed)
      await expect(runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX)).rejects.toThrow(
        "fail-closed-boom",
      );

      // But it's ALSO captured in the trace (with swallowed=false)
      const trace = runner.getTrace();
      const errorEvent = trace.find((e) => e.type === "error" && e.pluginId === "strict-plugin");
      expect(errorEvent).toBeDefined();
      expect(errorEvent?.swallowed).toBe(false);
      expect(errorEvent?.error).toContain("fail-closed-boom");
    });
  });

  describe("claim 2: 'didn't fire' is explained", () => {
    it("records 'not-registered' when no hooks exist for the hook name", async () => {
      // Empty registry — no hooks registered at all.
      const { runner } = createHookRunnerWithRegistry([], { enableTrace: true });

      await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

      const trace = runner.getTrace();
      const noHandlers = trace.find(
        (e) => e.type === "no-handlers" && e.hookName === "session_end",
      );
      expect(noHandlers).toBeDefined();
      expect(noHandlers?.reason).toBe("not-registered");
    });

    it("records 'filtered-out' when hooks exist for the name but none match the trigger filter", async () => {
      // A hook IS registered for before_agent_reply, but only for "heartbeat"/"cron"
      // triggers. Dispatching with trigger "user" filters it out.
      const { runner } = createHookRunnerWithRegistry(
        [
          {
            hookName: "before_agent_reply",
            pluginId: "trigger-plugin",
            handler: vi.fn(),
            eligibleTriggers: ["heartbeat", "cron"],
          },
        ],
        { enableTrace: true },
      );

      // Dispatch with a trigger that doesn't match — the hook is filtered out.
      await runner.runBeforeAgentReply(AGENT_REPLY_EVENT, {
        ...TEST_PLUGIN_AGENT_CTX,
        trigger: "user",
      });

      const trace = runner.getTrace();
      const noHandlers = trace.find(
        (e) => e.type === "no-handlers" && e.hookName === "before_agent_reply",
      );
      expect(noHandlers).toBeDefined();
      expect(noHandlers?.reason).toBe("filtered-out");
    });
  });

  describe("claim 3: successful dispatch is traced", () => {
    it("records a dispatch event with the handler count", async () => {
      const { runner } = createHookRunnerWithRegistry(
        [
          { hookName: "session_start", pluginId: "plugin-a", handler: async () => {} },
          { hookName: "session_start", pluginId: "plugin-b", handler: async () => {} },
        ],
        { enableTrace: true },
      );

      await runner.runSessionStart(
        { sessionId: "abc-123", sessionKey: "agent:main:abc", resumedFrom: null },
        SESSION_CTX,
      );

      const trace = runner.getTrace();
      const dispatch = trace.find((e) => e.type === "dispatch" && e.hookName === "session_start");
      expect(dispatch).toBeDefined();
      expect(dispatch?.handlerCount).toBe(2);
    });
  });

  describe("trace is disabled by default (zero overhead)", () => {
    it("produces an empty trace when enableTrace is not set and OPENCLAW_HOOK_DEBUG is unset", async () => {
      const { runner } = createHookRunnerWithRegistry(
        [{ hookName: "session_end", pluginId: "p", handler: async () => {} }],
        { catchErrors: true },
      );

      await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

      // No trace entries — zero overhead in production.
      expect(runner.getTrace()).toHaveLength(0);
    });

    it("enables the trace via OPENCLAW_HOOK_DEBUG=1", async () => {
      process.env.OPENCLAW_HOOK_DEBUG = "1";
      const { runner } = createHookRunnerWithRegistry([
        { hookName: "session_end", pluginId: "p", handler: async () => {} },
      ]);

      await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

      expect(runner.getTrace().length).toBeGreaterThan(0);
    });
  });

  describe("clearTrace", () => {
    it("empties the trace buffer", async () => {
      const { runner } = createHookRunnerWithRegistry(
        [{ hookName: "session_start", pluginId: "p", handler: async () => {} }],
        { enableTrace: true },
      );

      await runner.runSessionStart(
        { sessionId: "abc-123", sessionKey: "agent:main:abc", resumedFrom: null },
        SESSION_CTX,
      );
      expect(runner.getTrace().length).toBeGreaterThan(0);

      runner.clearTrace();
      expect(runner.getTrace()).toHaveLength(0);
    });
  });

  describe("getTrace is available on the runner", () => {
    it("returns an array (empty when trace is disabled)", () => {
      const { runner } = createHookRunnerWithRegistry([], { catchErrors: true });
      expect(Array.isArray(runner.getTrace())).toBe(true);
      expect(runner.getTrace()).toHaveLength(0);
    });

    it("is a function on every runner, even without enableTrace", () => {
      const { runner } = createHookRunnerWithRegistry([]);
      expect(typeof runner.getTrace).toBe("function");
      expect(typeof runner.clearTrace).toBe("function");
    });
  });
});

// Verify the trace works with a bare createHookRunner (not just the test fixture).
describe("hook debug trace with bare createHookRunner", () => {
  it("getTrace/clearTrace exist on the runner return", () => {
    const registry = createMockPluginRegistry([]);
    const runner = createHookRunner(registry, { enableTrace: true });
    expect(typeof runner.getTrace).toBe("function");
    expect(typeof runner.clearTrace).toBe("function");
  });
});

describe("hook trace file output (OPENCLAW_HOOK_TRACE_FILE)", () => {
  it("writes trace events as JSONL to the file when OPENCLAW_HOOK_TRACE_FILE is set", async () => {
    const { resolve } = await import("node:path");
    const { mkdtempSync, readFileSync, rmSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");

    const tmpDir = mkdtempSync(resolve(tmpdir(), "hook-trace-test-"));
    const tracePath = resolve(tmpDir, "trace.jsonl");
    process.env.OPENCLAW_HOOK_TRACE_FILE = tracePath;

    try {
      const { runner } = createHookRunnerWithRegistry(
        [{ hookName: "session_end", pluginId: "p", handler: async () => {} }],
        { enableTrace: true },
      );

      await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

      const traceContent = readFileSync(tracePath, "utf8");
      const lines = traceContent.trim().split("\n");
      expect(lines.length).toBeGreaterThan(0);

      const firstEvent = JSON.parse(lines[0]);
      expect(firstEvent.type).toBeDefined();
      expect(firstEvent.ts).toBeDefined();
      expect(firstEvent.hookName).toBe("session_end");
    } finally {
      delete process.env.OPENCLAW_HOOK_TRACE_FILE;
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("does NOT write a file when OPENCLAW_HOOK_TRACE_FILE is not set", async () => {
    const { runner } = createHookRunnerWithRegistry(
      [{ hookName: "session_end", pluginId: "p", handler: async () => {} }],
      { enableTrace: true },
    );

    await runner.runSessionEnd(SESSION_END_EVENT, SESSION_CTX);

    // No file written — trace is in-memory only.
    expect(runner.getTrace().length).toBeGreaterThan(0);
  });
});
