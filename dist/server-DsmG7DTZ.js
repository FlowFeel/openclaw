import { t as truncateCloseReason } from "./close-reason-D2Hhty2p.js";
//#region src/gateway/server.ts
async function emitStartupTrace(name, durationMs, totalMs) {
	if (!process.env.OPENCLAW_GATEWAY_STARTUP_TRACE) return;
	const { formatConsoleDiagnosticLine } = await import("./json-console-line-WKSC9ltu.js");
	const message = `[gateway] startup trace: ${name} ${durationMs.toFixed(1)}ms total=${totalMs.toFixed(1)}ms`;
	process.stderr.write(`${formatConsoleDiagnosticLine({
		level: "info",
		message
	})}\n`);
}
async function loadServerImpl() {
	const startupStartedAt = performance.now();
	const before = performance.now();
	try {
		return await import("./server.impl-K45XAVbl.js");
	} finally {
		const now = performance.now();
		await emitStartupTrace("gateway.server-impl-import", now - before, now - startupStartedAt);
	}
}
/** Starts the gateway server after lazily loading the full server implementation. */
async function startGatewayServer(...args) {
	return await (await loadServerImpl()).startGatewayServer(...args);
}
/** Clears prepared model-catalog generations between tests. */
async function resetPreparedModelCatalogForTest() {
	await (await loadServerImpl()).resetPreparedModelCatalogForTest();
}
//#endregion
export { resetPreparedModelCatalogForTest, startGatewayServer, truncateCloseReason };
