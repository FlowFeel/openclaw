import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./core-QIH5yboB.js";
import "./plugin-config-runtime-AmbPKaTK.js";
import "./config-mutation-lKBWBI19.js";
import "./runtime-config-snapshot-DMy4JPO5.js";
import "./text-utility-runtime-Dwuhfjgs.js";
//#region extensions/browser/src/sdk-config.ts
/**
* Browser-local SDK config bridge plus Browser-specific default port helpers.
*/
const DEFAULT_BROWSER_CDP_PORT_RANGE_START = 18800;
const DEFAULT_BROWSER_CDP_PORT_RANGE_END = 18899;
const DEFAULT_BROWSER_CDP_PORT_RANGE_SPAN = DEFAULT_BROWSER_CDP_PORT_RANGE_END - DEFAULT_BROWSER_CDP_PORT_RANGE_START;
/** Default loopback port for the Browser control server. */
const DEFAULT_BROWSER_CONTROL_PORT = 18791;
function isValidPort(port) {
	return Number.isFinite(port) && port > 0 && port <= 65535;
}
function clampPort(port, fallback) {
	return isValidPort(port) ? port : fallback;
}
function derivePort(base, offset, fallback) {
	return clampPort(base + offset, fallback);
}
/** Derives the Browser control port from the gateway port. */
function deriveDefaultBrowserControlPort(gatewayPort) {
	return derivePort(gatewayPort, 2, DEFAULT_BROWSER_CONTROL_PORT);
}
/** Derives the managed Chrome CDP port range from the Browser control port. */
function deriveDefaultBrowserCdpPortRange(browserControlPort) {
	const start = derivePort(browserControlPort, 9, DEFAULT_BROWSER_CDP_PORT_RANGE_START);
	const end = start + DEFAULT_BROWSER_CDP_PORT_RANGE_SPAN;
	if (end <= 65535) return {
		start,
		end
	};
	return {
		start: DEFAULT_BROWSER_CDP_PORT_RANGE_START,
		end: DEFAULT_BROWSER_CDP_PORT_RANGE_END
	};
}
const DEFAULT_TRUTHY = [
	"true",
	"1",
	"yes",
	"on"
];
const DEFAULT_FALSY = [
	"false",
	"0",
	"no",
	"off"
];
function matchesBooleanToken(value, tokens) {
	return tokens.includes(value);
}
/** Parses common string booleans with optional custom truthy/falsy tokens. */
function parseBooleanValue(value, options = {}) {
	if (typeof value === "boolean") return value;
	if (typeof value !== "string") return;
	const normalized = normalizeOptionalLowercaseString(value);
	if (!normalized) return;
	const candidates = [[true, options.truthy ?? DEFAULT_TRUTHY], [false, options.falsy ?? DEFAULT_FALSY]];
	for (const [parsed, tokens] of candidates) if (matchesBooleanToken(normalized, tokens)) return parsed;
}
//#endregion
export { parseBooleanValue as i, deriveDefaultBrowserCdpPortRange as n, deriveDefaultBrowserControlPort as r, DEFAULT_BROWSER_CONTROL_PORT as t };
