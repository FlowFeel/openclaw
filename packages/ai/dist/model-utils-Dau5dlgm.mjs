import { a as requiresClaudeMandatoryAdaptiveThinking, l as resolveClaudeNativeThinkingLevelMap } from "./src-QkygScBs.mjs";
//#region packages/ai/src/model-utils.ts
/** Calculates and stores model cost fields from token usage and per-million pricing. */
function calculateCost(model, usage) {
	const cacheWrite1h = Math.min(usage.cacheWrite, Math.max(0, usage.cacheWrite1h ?? 0));
	const cacheWrite5m = usage.cacheWrite - cacheWrite1h;
	usage.cost.input = model.cost.input / 1e6 * usage.input;
	usage.cost.output = model.cost.output / 1e6 * usage.output;
	usage.cost.cacheRead = model.cost.cacheRead / 1e6 * usage.cacheRead;
	usage.cost.cacheWrite = (model.cost.cacheWrite * cacheWrite5m + model.cost.input * 2 * cacheWrite1h) / 1e6;
	usage.cost.total = usage.cost.input + usage.cost.output + usage.cost.cacheRead + usage.cost.cacheWrite;
	return usage.cost;
}
/** Replaces the catalog estimate when the provider reports an authoritative billed total. */
function applyProviderReportedUsageCost(usage, reportedCost) {
	if (typeof reportedCost !== "number" || !Number.isFinite(reportedCost) || reportedCost < 0) return;
	usage.cost.total = reportedCost;
	usage.cost.totalOrigin = "provider-billed";
}
const EXTENDED_THINKING_LEVELS = [
	"off",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
];
function resolveThinkingLevelMap(model) {
	return model.api === "anthropic-messages" ? resolveClaudeNativeThinkingLevelMap(model) ?? model.thinkingLevelMap : model.thinkingLevelMap;
}
/** Returns thinking levels exposed by a reasoning-capable model. */
function getSupportedThinkingLevels(model) {
	const mandatoryAdaptiveContract = model.api === "anthropic-messages" && requiresClaudeMandatoryAdaptiveThinking(model);
	if (!model.reasoning && !mandatoryAdaptiveContract) return ["off"];
	const thinkingLevelMap = resolveThinkingLevelMap(model);
	return EXTENDED_THINKING_LEVELS.filter((level) => {
		const mapped = thinkingLevelMap?.[level];
		if (mapped === null) return false;
		if (level === "xhigh" || level === "max") return mapped !== void 0;
		return true;
	});
}
/** Clamps a requested thinking level to the closest supported level for a model. */
function clampThinkingLevel(model, level) {
	const availableLevels = getSupportedThinkingLevels(model);
	if (availableLevels.includes(level)) return level;
	const requestedIndex = EXTENDED_THINKING_LEVELS.indexOf(level);
	if (requestedIndex === -1) return availableLevels[0] ?? "off";
	const thinkingLevelMap = resolveThinkingLevelMap(model);
	if ((level === "xhigh" || level === "max") && thinkingLevelMap?.[level] === null) {
		for (const candidate of EXTENDED_THINKING_LEVELS.slice(0, requestedIndex).toReversed()) if (availableLevels.includes(candidate)) return candidate;
	}
	for (const candidate of EXTENDED_THINKING_LEVELS.slice(requestedIndex)) if (availableLevels.includes(candidate)) return candidate;
	for (const candidate of EXTENDED_THINKING_LEVELS.slice(0, requestedIndex).toReversed()) if (availableLevels.includes(candidate)) return candidate;
	return availableLevels[0] ?? "off";
}
/** Compares model identity by provider and id. */
function modelsAreEqual(a, b) {
	if (!a || !b) return false;
	return a.id === b.id && a.provider === b.provider;
}
//#endregion
export { modelsAreEqual as a, getSupportedThinkingLevels as i, calculateCost as n, clampThinkingLevel as r, applyProviderReportedUsageCost as t };
