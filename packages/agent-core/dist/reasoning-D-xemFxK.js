import { resolveClaudeFable5ModelIdentity, resolveClaudeOpus5ModelIdentity, resolveClaudeSonnet5ModelIdentity } from "@openclaw/llm-core";
//#region packages/agent-core/src/reasoning.ts
const ENABLED_THINKING_LEVELS = /* @__PURE__ */ new Set([
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
]);
function isEnabledThinkingLevel(value) {
	return ENABLED_THINKING_LEVELS.has(value);
}
function resolveAgentReasoningOption(model, thinkingLevel) {
	if (thinkingLevel !== "off") return thinkingLevel;
	const offFallback = model.thinkingLevelMap?.off ?? ((model.api === "anthropic-messages" || model.api === "bedrock-converse-stream") && resolveClaudeFable5ModelIdentity(model) ? "low" : void 0);
	if (isEnabledThinkingLevel(offFallback)) return offFallback;
	return model.api === "anthropic-messages" && (resolveClaudeSonnet5ModelIdentity(model) || resolveClaudeOpus5ModelIdentity(model)) ? "off" : void 0;
}
//#endregion
export { resolveAgentReasoningOption as t };
