/**
 * Lazy public entrypoint for the gateway server implementation.
 *
 * Keeping `server.impl` behind dynamic import lets light-weight callers import
 * server types and helpers without paying the full startup dependency graph.
 */
export { truncateCloseReason } from "./server/close-reason.js";
export type { GatewayServer, GatewayServerOptions } from "./server.impl.js";

async function emitStartupTrace(name: string, durationMs: number, totalMs: number): Promise<void> {
  if (!process.env.OPENCLAW_GATEWAY_STARTUP_TRACE) {
    return;
  }
  const { formatConsoleDiagnosticLine } = await import("../logging/json-console-line.js");
  const message = `[gateway] startup trace: ${name} ${durationMs.toFixed(1)}ms total=${totalMs.toFixed(1)}ms`;
  process.stderr.write(`${formatConsoleDiagnosticLine({ level: "info", message })}\n`);
}

async function loadServerImpl() {
  const startupStartedAt = performance.now();
  const before = performance.now();
  try {
    return await import("./server.impl.js");
  } finally {
    const now = performance.now();
    await emitStartupTrace("gateway.server-impl-import", now - before, now - startupStartedAt);
  }
}

/** Starts the gateway server after lazily loading the full server implementation. */
export async function startGatewayServer(
  ...args: Parameters<typeof import("./server.impl.js").startGatewayServer>
): ReturnType<typeof import("./server.impl.js").startGatewayServer> {
  try {
    const { installGatewayDeathRecordHook, globalDeathRecordStorage } = await import(
      "../infra/gateway-death-record/index.js"
    );
    installGatewayDeathRecordHook();
    const prev = globalDeathRecordStorage.readPrevious();
    if (prev) {
      // Diagnostic visibility for prior crash without blocking
      const reason = prev.reason ?? prev.signal ?? `exit code ${prev.exitCode}`;
      process.stderr.write(
        `[gateway] previous death record detected: ${reason} at ${new Date(prev.timestamp).toISOString()} (uptime: ${prev.uptimeSeconds}s, heap: ${prev.memory?.heapPct}%)\n`,
      );
    }
  } catch {
    // Non-blocking diagnostic hook
  }

  const mod = await loadServerImpl();
  return await mod.startGatewayServer(...args);
}

/** Clears prepared model-catalog generations between tests. */
export async function resetPreparedModelCatalogForTest(): Promise<void> {
  const mod = await loadServerImpl();
  await mod.resetPreparedModelCatalogForTest();
}
