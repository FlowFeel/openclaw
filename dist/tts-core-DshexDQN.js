import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import "./number-coercion-IpMOa8nH.js";
import { C as resolveModelRefFromString, a as buildModelAliasIndex } from "./model-selection-shared-V7VmYFPH.js";
import { w as resolveDefaultModelForAgent } from "./codex-route-model-ref-BDwklqCa.js";
import "./model-selection-CZlE_kEq.js";
//#region src/tts/tts-core.ts
let defaultSummarizeTextDepsPromise;
function loadDefaultSummarizeTextDeps() {
	return defaultSummarizeTextDepsPromise ??= Promise.all([import("./simple-completion-runtime-BnmXQj8E.js"), import("./model-auth-CFB4LdRv.js")]).then(([completionRuntime, { requireApiKey }]) => ({
		completeWithPreparedSimpleCompletionModel: completionRuntime.completeWithPreparedSimpleCompletionModel,
		prepareSimpleCompletionModel: completionRuntime.prepareSimpleCompletionModel,
		requireApiKey
	}));
}
function resolveSummaryModelRef(cfg, config) {
	const defaultRef = resolveDefaultModelForAgent({ cfg });
	const override = normalizeOptionalString(config.summaryModel);
	if (!override) return {
		ref: defaultRef,
		source: "default"
	};
	const aliasIndex = buildModelAliasIndex({
		cfg,
		defaultProvider: defaultRef.provider
	});
	const resolved = resolveModelRefFromString({
		raw: override,
		defaultProvider: defaultRef.provider,
		aliasIndex
	});
	if (!resolved) return {
		ref: defaultRef,
		source: "default"
	};
	return {
		ref: resolved.ref,
		source: "summaryModel"
	};
}
function isTextContentBlock(block) {
	return block.type === "text";
}
/** Summarize long text before synthesis using the configured summary model. */
async function summarizeText(params, deps) {
	const { text, targetLength, cfg, config, timeoutMs } = params;
	if (targetLength < 100 || targetLength > 1e4) throw new Error(`Invalid targetLength: ${targetLength}`);
	const startTime = Date.now();
	const resolvedDeps = deps ?? await loadDefaultSummarizeTextDeps();
	const { ref } = resolveSummaryModelRef(cfg, config);
	const prepared = await resolvedDeps.prepareSimpleCompletionModel({
		cfg,
		provider: ref.provider,
		modelId: ref.model,
		useAsyncModelResolution: true
	});
	if ("error" in prepared) throw new Error(prepared.error);
	const completionModel = prepared.model;
	const providerKey = resolvedDeps.requireApiKey(prepared.auth, ref.provider);
	try {
		const controller = new AbortController();
		const resolvedTimeoutMs = resolveTimerTimeoutMs(timeoutMs, 1);
		const timeout = setTimeout(() => controller.abort(), resolvedTimeoutMs);
		try {
			const summary = (await resolvedDeps.completeWithPreparedSimpleCompletionModel({
				model: completionModel,
				auth: {
					...prepared.auth,
					apiKey: providerKey
				},
				context: { messages: [{
					role: "user",
					content: `You are an assistant that summarizes texts concisely while keeping the most important information. Summarize the text to approximately ${targetLength} characters. Maintain the original tone and style. Reply only with the summary, without additional explanations.\n\n<text_to_summarize>\n${text}\n</text_to_summarize>`,
					timestamp: Date.now()
				}] },
				cfg,
				options: {
					maxTokens: Math.ceil(targetLength / 2),
					temperature: .3,
					signal: controller.signal
				}
			})).content.filter(isTextContentBlock).map((block) => block.text.trim()).filter(Boolean).join(" ").trim();
			if (!summary) throw new Error("No summary returned");
			return {
				summary,
				latencyMs: Date.now() - startTime,
				inputLength: text.length,
				outputLength: summary.length
			};
		} finally {
			clearTimeout(timeout);
		}
	} catch (err) {
		if (err.name === "AbortError") throw new Error("Summarization timed out", { cause: err });
		throw err;
	}
}
//#endregion
export { summarizeText as t };
