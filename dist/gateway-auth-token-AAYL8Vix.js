import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { l as readConfigFileSnapshot } from "./io-BsQc3Kgy.js";
import "./config-BBVHtcXg.js";
import { t as assertExplicitGatewayAuthModeWhenBothConfigured } from "./auth-mode-policy-BeQbXCXc.js";
import "./auth-B6R6zmCG.js";
import { n as resolveGatewayAuth } from "./auth-resolve-C1oJ1k2J.js";
import { r as isTerminalInteractive } from "./terminal-interactivity-Bmck99HR.js";
import { t as resolveCommandSecretRefsViaGateway } from "./command-secret-gateway-DuqIhMgA.js";
//#region src/commands/gateway-auth-token.ts
/** Reveal the configured shared Gateway token only to an explicitly interactive operator. */
async function gatewayAuthTokenCommand(runtime = defaultRuntime, options = {}) {
	if (!(options.interactive ?? isTerminalInteractive())) throw new Error("Refusing to print the Gateway token outside an interactive terminal. Run `openclaw gateway auth-token --show` directly in a terminal on the Gateway host.");
	const snapshot = await readConfigFileSnapshot();
	if (!snapshot.valid) throw new Error("Gateway config is invalid. Run `openclaw doctor --fix`, then try again.");
	const cfg = snapshot.sourceConfig ?? snapshot.config;
	if (cfg.gateway?.mode === "remote") throw new Error("This command must run on the Gateway host; the current config is in remote mode.");
	const env = options.env ?? process.env;
	assertExplicitGatewayAuthModeWhenBothConfigured(cfg);
	const configuredAuth = resolveGatewayAuth({
		authConfig: cfg.gateway?.auth,
		env,
		tailscaleMode: cfg.gateway?.tailscale?.mode
	});
	if (configuredAuth.mode !== "token") throw new Error(`Gateway auth mode is ${configuredAuth.mode}; there is no active shared token to reveal.`);
	const { resolvedConfig } = await resolveCommandSecretRefsViaGateway({
		config: cfg,
		commandName: "gateway auth-token",
		targetIds: /* @__PURE__ */ new Set(["gateway.auth.token"]),
		mode: "enforce_resolved",
		allowedPaths: /* @__PURE__ */ new Set(["gateway.auth.token"])
	});
	const resolvedAuth = resolveGatewayAuth({
		authConfig: resolvedConfig.gateway?.auth,
		env,
		tailscaleMode: resolvedConfig.gateway?.tailscale?.mode
	});
	if (resolvedAuth.mode !== "token" || !resolvedAuth.token) throw new Error("No configured Gateway token is available. Run `openclaw doctor --generate-gateway-token`, restart the Gateway, then try again.");
	runtime.writeStdout(`${resolvedAuth.token}\n`);
}
//#endregion
export { gatewayAuthTokenCommand };
