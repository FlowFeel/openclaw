// Tests for resolveModelExecutionWorkerUrl — worker URL resolution.
//
// Prediction (Phase 3a-2): resolveModelExecutionWorkerUrl resolves the
// worker script URL from the current module URL. In production (path contains
// /dist/), it resolves to dist/agents/embedded-agent-runner/model-execution.worker.js.
// In dev/test (.ts source), it resolves to the sibling .ts file. This matches
// the compaction worker URL resolver pattern.
//
// Competing account: a broken resolver would produce wrong paths at runtime
// (e.g. point to a nonexistent worker file → worker spawn fails).
//
// Support: /dist/ path → dist/agents/embedded-agent-runner/model-execution.worker.js;
// .ts source → sibling .ts; .js source → sibling .js; default → .js extension.
//
// Refute: dist path → wrong subdirectory; .ts → .js (wrong extension).
import { describe, expect, it } from "vitest";
import { resolveModelExecutionWorkerUrl } from "./model-execution-worker.js";

describe("resolveModelExecutionWorkerUrl", () => {
  it("resolves to dist/agents/embedded-agent-runner/ for /dist/ module paths", () => {
    // Simulate a production build where this module is at
    // /repo/dist/agents/embedded-agent-runner/model-execution-worker.js
    const result = resolveModelExecutionWorkerUrl(
      "file:///repo/dist/agents/embedded-agent-runner/model-execution-worker.js",
    );

    expect(result.pathname).toBe(
      "/repo/dist/agents/embedded-agent-runner/model-execution.worker.js",
    );
  });

  it("resolves to dist/agents/embedded-agent-runner/ even from a hashed bundle", () => {
    // In production, the main chunk may have a hash: /repo/dist/main-abc123.js
    // The resolver should still find /dist/ and resolve relative to it.
    const result = resolveModelExecutionWorkerUrl("file:///repo/dist/chunk-abc123.js");

    expect(result.pathname).toBe(
      "/repo/dist/agents/embedded-agent-runner/model-execution.worker.js",
    );
  });

  it("resolves to a sibling .ts file in dev/test (source mode)", () => {
    // In dev/test, this module is at
    // src/agents/embedded-agent-runner/model-execution-worker.ts
    const result = resolveModelExecutionWorkerUrl(
      "file:///repo/src/agents/embedded-agent-runner/model-execution-worker.ts",
    );

    expect(result.pathname).toBe(
      "/repo/src/agents/embedded-agent-runner/model-execution.worker.ts",
    );
  });

  it("resolves to a sibling .js file when the source is .js", () => {
    const result = resolveModelExecutionWorkerUrl(
      "file:///repo/src/agents/embedded-agent-runner/model-execution-worker.js",
    );

    expect(result.pathname).toBe(
      "/repo/src/agents/embedded-agent-runner/model-execution.worker.js",
    );
  });

  it("defaults to .js extension when the source has no extension", () => {
    const result = resolveModelExecutionWorkerUrl(
      "file:///repo/src/agents/embedded-agent-runner/model-execution-worker",
    );

    expect(result.pathname).toBe(
      "/repo/src/agents/embedded-agent-runner/model-execution.worker.js",
    );
  });

  it("uses the last /dist/ marker (nested dist directories)", () => {
    // Edge case: if there's a nested /dist/ in the path, the resolver uses
    // the last occurrence (lastIndexOf), matching the compaction pattern.
    const result = resolveModelExecutionWorkerUrl(
      "file:///repo/dist/src/dist/agents/embedded-agent-runner/model-execution-worker.js",
    );

    // lastIndexOf finds the second /dist/, so the root is /repo/dist/src/dist/
    expect(result.pathname).toBe(
      "/repo/dist/src/dist/agents/embedded-agent-runner/model-execution.worker.js",
    );
  });

  it("returns a URL object (not a string)", () => {
    const result = resolveModelExecutionWorkerUrl("file:///repo/dist/foo.js");
    expect(result).toBeInstanceOf(URL);
    expect(result.protocol).toBe("file:");
  });
});
