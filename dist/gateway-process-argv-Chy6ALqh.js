import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { l as normalizeStringEntries } from "./string-normalization-CRyoFBPt.js";
//#region src/infra/gateway-process-argv.ts
function normalizeProcArg(arg) {
	return normalizeLowercaseStringOrEmpty(arg.replaceAll("\\", "/"));
}
const ENTRY_CANDIDATES = [
	"dist/index.js",
	"dist/entry.js",
	"openclaw.mjs",
	"scripts/run-node.mjs",
	"src/entry.ts",
	"src/index.ts"
];
function parseProcCmdline(raw) {
	return normalizeStringEntries(raw.split("\0"));
}
function isOpenClawCommandArgv(args, command) {
	const normalized = args.map(normalizeProcArg);
	const exe = (normalized[0] ?? "").replace(/\.(bat|cmd|exe)$/i, "");
	if (!normalized.includes(normalizeProcArg(command))) return false;
	if (normalized.some((arg) => ENTRY_CANDIDATES.some((entry) => arg.endsWith(entry)))) return true;
	return exe.endsWith("/openclaw") || exe === "openclaw";
}
function isOpenClawProcessArgv(args) {
	if (isGatewayArgv(args, { allowGatewayBinary: true })) return true;
	const normalized = args.map(normalizeProcArg);
	const exe = (normalized[0] ?? "").replace(/\.(bat|cmd|exe)$/i, "");
	return exe === "openclaw" || exe.endsWith("/openclaw") || normalized.some((arg) => arg === "openclaw" || arg.endsWith("/openclaw") || arg === "openclaw.mjs" || arg.endsWith("/openclaw.mjs")) || normalized.includes("agent") && normalized.some((arg) => ENTRY_CANDIDATES.some((entry) => arg.endsWith(entry)));
}
function isGatewayArgv(args, opts) {
	const exe = (args.map(normalizeProcArg)[0] ?? "").replace(/\.(bat|cmd|exe)$/i, "");
	const isGatewayBinary = exe.endsWith("/openclaw-gateway") || exe === "openclaw-gateway";
	if (!isOpenClawCommandArgv(args, "gateway")) return opts?.allowGatewayBinary === true && isGatewayBinary;
	return true;
}
//#endregion
export { parseProcCmdline as i, isOpenClawCommandArgv as n, isOpenClawProcessArgv as r, isGatewayArgv as t };
