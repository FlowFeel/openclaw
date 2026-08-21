import { d as isRootHelpInvocation, n as getCommandPathWithRootOptions, o as getPrimaryCommand, u as isHelpOrVersionInvocation } from "./argv-D6QuZiS5.js";
import { i as isValueToken, n as consumeRootOptionToken } from "./cli-root-options-tXk2lfs9.js";
//#region src/cli/argv-invocation.ts
const AGENT_PARENT_BOOLEAN_FLAGS = /* @__PURE__ */ new Set([
	"--local",
	"--deliver",
	"--json"
]);
const AGENT_PARENT_VALUE_FLAGS = /* @__PURE__ */ new Set([
	"-m",
	"--message",
	"--message-file",
	"-t",
	"--to",
	"--session-key",
	"--session-id",
	"--agent",
	"--model",
	"--thinking",
	"--verbose",
	"--channel",
	"--reply-to",
	"--reply-channel",
	"--reply-account",
	"--timeout"
]);
function consumeAgentParentOption(args, index) {
	const arg = args[index];
	if (!arg?.startsWith("-") || arg === "--") return 0;
	const equalsIndex = arg.indexOf("=");
	const flag = equalsIndex === -1 ? arg : arg.slice(0, equalsIndex);
	if (AGENT_PARENT_BOOLEAN_FLAGS.has(flag)) return equalsIndex === -1 ? 1 : 0;
	if (!AGENT_PARENT_VALUE_FLAGS.has(flag)) return 0;
	if (equalsIndex !== -1) return arg.slice(equalsIndex + 1).trim() ? 1 : 0;
	return isValueToken(args[index + 1]) ? 2 : 0;
}
function resolveAgentCommandPath(argv) {
	const args = argv.slice(2);
	let sawAgent = false;
	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];
		if (!arg || arg === "--") break;
		if (!sawAgent) {
			const rootConsumed = consumeRootOptionToken(args, index);
			if (rootConsumed > 0) {
				index += rootConsumed - 1;
				continue;
			}
			if (arg.startsWith("-")) continue;
			if (arg !== "agent") return null;
			sawAgent = true;
			continue;
		}
		const rootConsumed = consumeRootOptionToken(args, index);
		if (rootConsumed > 0) {
			index += rootConsumed - 1;
			continue;
		}
		if (arg.startsWith("-")) {
			const consumed = consumeAgentParentOption(args, index);
			if (consumed === 0) return ["agent"];
			index += consumed - 1;
			continue;
		}
		return ["agent", arg];
	}
	return sawAgent ? ["agent"] : null;
}
/** Resolves startup policy paths while consuming known parent-command option values. */
function resolveCliStartupCommandPath(argv) {
	return resolveAgentCommandPath(argv) ?? getCommandPathWithRootOptions(argv, 2);
}
/** Resolves command path and help/version mode from a raw process argv array. */
function resolveCliArgvInvocation(argv) {
	return {
		argv,
		commandPath: resolveCliStartupCommandPath(argv),
		primary: getPrimaryCommand(argv),
		hasHelpOrVersion: isHelpOrVersionInvocation(argv),
		isRootHelpInvocation: isRootHelpInvocation(argv)
	};
}
//#endregion
export { resolveCliStartupCommandPath as n, resolveCliArgvInvocation as t };
