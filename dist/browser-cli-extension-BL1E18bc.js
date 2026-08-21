import { g as resolveGatewayPort } from "./paths-CL43LNS6.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { r as getRuntimeConfig } from "./io-BsQc3Kgy.js";
import { r as theme } from "./theme-vjDs9tao.js";
import { n as info, t as danger } from "./globals-Cw62Mq_M.js";
import { o as isLoopbackHost } from "./net-B22ilI8B.js";
import { n as runCommandWithRuntime } from "./cli-utils-BWiGwzB-.js";
import "./sdk-config-CaXc3uHz.js";
import { r as resolveBrowserConfig } from "./config-B2k8sZ1m.js";
import "./tmp-openclaw-dir-BK3eq-mf.js";
import { t as ensureExtensionRelayToken } from "./relay-auth-CEcYLBuF.js";
import "./core-api-DlefJ9Ou.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
//#region extensions/browser/src/cli/browser-cli-extension-pairing.ts
function resolveLocalPairingGatewayUrl(params) {
	if (params.configuredRemote) return params.configuredRemote;
	if (params.tlsEnabled) throw new Error("Gateway TLS pairing requires --gateway-url wss://<certificate-host>[:port]");
	return `ws://127.0.0.1:${params.gatewayPort}`;
}
//#endregion
//#region extensions/browser/src/cli/browser-cli-extension.ts
/**
* `openclaw browser extension` CLI: locate the unpacked Chrome extension and
* print the pairing string that connects it to this install's relay.
*/
/** Absolute path to the bundled unpacked Chrome extension directory. */
function resolveChromeExtensionDir(pluginRoot) {
	if (pluginRoot) return path.join(pluginRoot, "chrome-extension");
	const here = path.dirname(fileURLToPath(import.meta.url));
	return path.resolve(here, "..", "..", "chrome-extension");
}
function firstExtensionProfile(resolved) {
	for (const [name, profile] of Object.entries(resolved.profiles)) if (profile.driver === "extension") return {
		name,
		relayPort: profile.cdpPort ?? resolved.extensionRelayPorts[name] ?? resolved.extensionRelayDefaultPort
	};
	return null;
}
/** Gateway route path for the remote extension relay (see gateway-relay-route.ts). */
const GATEWAY_EXTENSION_RELAY_PATH = "/browser/extension";
/** Resolve a safe direct-Gateway relay URL, preserving an optional proxy base path. */
function buildRemoteGatewayRelayUrl(raw) {
	let url;
	try {
		url = new URL(raw.trim());
	} catch {
		throw new Error("--gateway-url must be a valid ws:// or wss:// URL");
	}
	const secure = url.protocol === "wss:";
	const localPlaintext = url.protocol === "ws:" && isLoopbackHost(url.hostname);
	if (!secure && !localPlaintext) throw new Error("--gateway-url must use wss:// (ws:// is allowed only for loopback)");
	if (url.username || url.password || url.search || url.hash) throw new Error("--gateway-url must not include credentials, a query, or a fragment");
	const basePath = url.pathname.replace(/\/+$/, "");
	url.pathname = `${basePath}${GATEWAY_EXTENSION_RELAY_PATH}`;
	return url.toString();
}
async function buildPairingString(gatewayUrl) {
	const cfg = getRuntimeConfig();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	const token = await ensureExtensionRelayToken();
	const relayPort = firstExtensionProfile(resolved)?.relayPort ?? resolved.extensionRelayDefaultPort;
	const gateway = gatewayUrl?.trim();
	if (gateway) {
		const relayUrl = new URL(buildRemoteGatewayRelayUrl(gateway));
		relayUrl.searchParams.set("gateway", gateway);
		return {
			pairing: `${relayUrl.toString()}#${token}`,
			relayPort,
			remote: true
		};
	}
	const directGatewayUrl = resolveLocalPairingGatewayUrl({
		configuredRemote: cfg.gateway?.mode === "remote" ? cfg.gateway.remote?.url?.trim() : "",
		gatewayPort: resolveGatewayPort(cfg),
		tlsEnabled: cfg.gateway?.tls?.enabled === true
	});
	const relayUrl = new URL(`ws://127.0.0.1:${relayPort}/extension`);
	relayUrl.searchParams.set("gateway", directGatewayUrl);
	return {
		pairing: `${relayUrl.toString()}#${token}`,
		relayPort,
		remote: false
	};
}
/**
* Resolve the local relay CDP endpoint for third-party CDP clients
* (Puppeteer, chrome-devtools-mcp, raw WebSocket). Creates the host-local
* relay secret on first use, mirroring `pair`.
*/
async function buildCdpEndpoint() {
	const cfg = getRuntimeConfig();
	const resolved = resolveBrowserConfig(cfg.browser, cfg);
	const token = await ensureExtensionRelayToken();
	const relayPort = firstExtensionProfile(resolved)?.relayPort ?? resolved.extensionRelayDefaultPort;
	return {
		browserUrl: `http://127.0.0.1:${relayPort}`,
		wsEndpoint: `ws://127.0.0.1:${relayPort}/cdp`,
		headers: { Authorization: `Bearer ${token}` }
	};
}
/** Register `openclaw browser extension {path,pair,cdp}`. */
function registerBrowserExtensionCommands(browser, _parentOpts, pluginRoot) {
	const extension = browser.command("extension").description("Chrome extension: print the load path and pairing string");
	extension.command("path").description("Print the unpacked Chrome extension directory (Load unpacked)").action(() => {
		defaultRuntime.log(resolveChromeExtensionDir(pluginRoot));
	});
	extension.command("pair").description("Print the pairing string to paste into the OpenClaw extension popup").option("--json", "Print the pairing string as JSON").option("--gateway-url <url>", "Print a remote pairing string for a Chrome on another machine (e.g. wss://gateway.example.com)").action(async (opts) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const result = await buildPairingString(opts.gatewayUrl);
			if (opts.json === true) {
				defaultRuntime.writeJson({
					pairingString: result.pairing,
					relayPort: result.relayPort,
					remote: result.remote
				});
				return;
			}
			const setupLine = result.remote ? info("Remote pairing: load and pair the extension on the machine running Chrome; it connects to this gateway over wss://.") : info("Run this on the machine that hosts the browser (gateway host or browser node).");
			defaultRuntime.log([
				setupLine,
				info("1. Load the extension: chrome://extensions → Developer mode → Load unpacked →"),
				`   ${resolveChromeExtensionDir(pluginRoot)}`,
				info("2. Open the OpenClaw popup and paste this pairing string:"),
				"",
				theme.heading(result.pairing),
				"",
				info("The token is a host-local secret; keep it private.")
			].join("\n"));
		}, (err) => {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		});
	});
	extension.command("cdp").description("Print the relay CDP endpoint and auth header for external CDP clients").option("--json", "Print the endpoint as JSON").action(async (opts) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			const endpoint = await buildCdpEndpoint();
			if (opts.json === true) {
				defaultRuntime.writeJson(endpoint);
				return;
			}
			defaultRuntime.log([
				info("Relay CDP endpoint (pair the extension first):"),
				`browserUrl: ${endpoint.browserUrl}`,
				`wsEndpoint: ${endpoint.wsEndpoint}`,
				`header:     Authorization: ${endpoint.headers.Authorization}`,
				"",
				info("Example (chrome-devtools-mcp):"),
				`  npx chrome-devtools-mcp --wsEndpoint ${endpoint.wsEndpoint} \\`,
				`    --wsHeaders '${JSON.stringify(endpoint.headers)}'`,
				"",
				info("The token is a host-local secret; keep it private.")
			].join("\n"));
		}, (err) => {
			defaultRuntime.error(danger(String(err)));
			defaultRuntime.exit(1);
		});
	});
}
//#endregion
export { registerBrowserExtensionCommands };
