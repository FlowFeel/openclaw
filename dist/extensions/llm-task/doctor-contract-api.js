import { n as parseModelRef } from "../../model-selection-normalize-Bae-aoqX.js";
import { u as asObjectRecord } from "../../runtime-doctor-DswhIJKY.js";
import "../../agent-runtime-D_YhRSYu.js";
//#region extensions/llm-task/doctor-contract-api.ts
const ENTRY_PATH = "plugins.entries.llm-task";
function preserveLiteralLegacyModelRefs(values) {
	return values.filter((value) => {
		if (value !== value.trim() || value === "*") return false;
		const normalized = parseModelRef(value, "");
		if (!normalized) return false;
		return `${normalized.provider}/${normalized.model}` === value;
	});
}
const legacyConfigRules = [{
	path: [
		"plugins",
		"entries",
		"llm-task",
		"config",
		"allowedModels"
	],
	message: `${ENTRY_PATH}.config.allowedModels moved to ${ENTRY_PATH}.llm.allowedCompletionModels. Run "openclaw doctor --fix".`
}, {
	path: [
		"plugins",
		"entries",
		"llm-task"
	],
	message: `${ENTRY_PATH} needs host-owned LLM model/profile permissions to preserve shipped tool parameters. Run "openclaw doctor --fix".`,
	match: (value) => {
		const llm = asObjectRecord(asObjectRecord(value)?.llm);
		return llm?.allowModelOverride === void 0 || llm.allowAuthProfileOverride === void 0;
	}
}];
function normalizeCompatibilityConfig({ cfg }) {
	const plugins = asObjectRecord(cfg.plugins);
	const entries = asObjectRecord(plugins?.entries);
	const entry = asObjectRecord(entries?.["llm-task"]);
	if (!entry) return {
		config: cfg,
		changes: []
	};
	const pluginConfig = asObjectRecord(entry.config) ?? {};
	const hadLegacyAllowedModels = Object.hasOwn(pluginConfig, "allowedModels");
	const legacyAllowedModelsValue = pluginConfig.allowedModels;
	const legacyAllowedModels = Array.isArray(legacyAllowedModelsValue) ? legacyAllowedModelsValue.filter((value) => typeof value === "string") : void 0;
	const migratedAllowedModels = !hadLegacyAllowedModels ? void 0 : !Array.isArray(legacyAllowedModelsValue) ? [] : legacyAllowedModelsValue.length === 0 ? void 0 : preserveLiteralLegacyModelRefs(legacyAllowedModels ?? []);
	const llm = asObjectRecord(entry.llm) ?? {};
	const nextLlm = {
		...llm,
		...llm.allowModelOverride === void 0 ? { allowModelOverride: true } : {},
		...llm.allowAuthProfileOverride === void 0 ? { allowAuthProfileOverride: true } : {},
		...llm.allowedCompletionModels === void 0 && migratedAllowedModels !== void 0 ? { allowedCompletionModels: migratedAllowedModels } : {}
	};
	const policyChanged = llm.allowModelOverride === void 0 || llm.allowAuthProfileOverride === void 0;
	if (!hadLegacyAllowedModels && !policyChanged) return {
		config: cfg,
		changes: []
	};
	const { allowedModels: _legacyAllowedModels, ...nextPluginConfig } = pluginConfig;
	const changes = [];
	if (hadLegacyAllowedModels) changes.push(llm.allowedCompletionModels !== void 0 ? `Removed ${ENTRY_PATH}.config.allowedModels; existing ${ENTRY_PATH}.llm.allowedCompletionModels remains authoritative.` : migratedAllowedModels !== void 0 ? `Moved ${ENTRY_PATH}.config.allowedModels to ${ENTRY_PATH}.llm.allowedCompletionModels.` : `Removed empty ${ENTRY_PATH}.config.allowedModels; unrestricted model selection remains unchanged.`);
	if (policyChanged) changes.push(`Enabled ${ENTRY_PATH}.llm model and auth-profile overrides to preserve shipped llm-task behavior.`);
	return {
		config: {
			...cfg,
			plugins: {
				...plugins,
				entries: {
					...entries,
					"llm-task": {
						...entry,
						llm: nextLlm,
						config: nextPluginConfig
					}
				}
			}
		},
		changes
	};
}
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };
