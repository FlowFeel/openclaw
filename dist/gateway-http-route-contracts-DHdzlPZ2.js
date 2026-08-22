//#region src/gateway/gateway-http-route-contracts.ts
const GATEWAY_PROBE_ROUTES = /* @__PURE__ */ new Map([
	["/health", "live"],
	["/healthz", "live"],
	["/ready", "ready"],
	["/readyz", "ready"]
]);
const MCP_APP_STANDALONE_PATH = "/__openclaw__/mcp-app";
const MCP_APP_STANDALONE_VIEW_PATH = `${MCP_APP_STANDALONE_PATH}/view`;
function classifyGatewayProbePath(pathname) {
	for (const [root, status] of GATEWAY_PROBE_ROUTES) {
		if (pathname === root) return status;
		if (pathname.startsWith(`${root}/`)) return "namespace";
	}
	return "outside";
}
function classifyMcpAppStandalonePath(pathname) {
	if (pathname === "/__openclaw__/mcp-app") return "shell";
	if (pathname === MCP_APP_STANDALONE_VIEW_PATH) return "view";
	return pathname.startsWith(`/__openclaw__/mcp-app/`) ? "namespace" : "outside";
}
//#endregion
export { classifyMcpAppStandalonePath as i, MCP_APP_STANDALONE_VIEW_PATH as n, classifyGatewayProbePath as r, MCP_APP_STANDALONE_PATH as t };
