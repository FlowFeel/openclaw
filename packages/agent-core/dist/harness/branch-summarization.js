import { resolveAgentCoreCompleteFn } from "../runtime-deps.js";
import { asAgentMessage, convertToLlm, createBranchSummaryMessage, createCompactionSummaryMessage, createCustomMessage } from "./messages.js";
import { S as ok, _ as extractSummaryText, b as BranchSummaryError, g as extractFileOpsFromMessage, h as createFileOps, m as computeFileLists, r as SUMMARIZATION_SYSTEM_PROMPT, s as estimateTokens, v as formatFileOperations, x as err, y as serializeConversation } from "../compaction-DXKvu1iT.js";
//#region packages/agent-core/src/harness/compaction/branch-summarization.ts
/** Collect entries that should be summarized before navigating to a different session tree entry. */
function collectEntriesForBranchSummaryFromBranches(oldBranch, targetBranch) {
	const oldPath = new Set(oldBranch.map((entry) => entry.id));
	let commonAncestorId = null;
	for (const targetEntry of targetBranch.toReversed()) if (oldPath.has(targetEntry.id)) {
		commonAncestorId = targetEntry.id;
		break;
	}
	const firstSummarizedIndex = commonAncestorId === null ? 0 : oldBranch.findIndex((entry) => entry.id === commonAncestorId) + 1;
	return {
		entries: oldBranch.slice(firstSummarizedIndex),
		commonAncestorId
	};
}
function getMessageFromEntry(entry) {
	switch (entry.type) {
		case "message": return entry.message;
		case "custom_message": return asAgentMessage(createCustomMessage(entry.customType, entry.content, entry.display, entry.details, entry.timestamp));
		case "branch_summary": return asAgentMessage(createBranchSummaryMessage(entry.summary, entry.fromId, entry.timestamp));
		case "compaction": return asAgentMessage(createCompactionSummaryMessage(entry.summary, entry.tokensBefore, entry.timestamp));
		case "thinking_level_change":
		case "model_change":
		case "custom":
		case "label":
		case "session_info":
		case "reset":
		case "leaf": return;
	}
}
/** Prepare branch entries for summarization within an optional token budget. */
function prepareBranchEntries(entries, tokenBudget = 0) {
	const messages = [];
	const fileOps = createFileOps();
	let totalTokens = 0;
	for (const entry of entries) if (entry.type === "branch_summary" && !entry.fromHook && entry.details) {
		const details = entry.details;
		if (Array.isArray(details.readFiles)) for (const f of details.readFiles) fileOps.read.add(f);
		if (Array.isArray(details.modifiedFiles)) for (const f of details.modifiedFiles) fileOps.edited.add(f);
	}
	for (const entry of entries.toReversed()) {
		const message = getMessageFromEntry(entry);
		if (!message) continue;
		extractFileOpsFromMessage(message, fileOps);
		const tokens = estimateTokens(message);
		if (tokenBudget > 0 && totalTokens + tokens > tokenBudget) {
			if (entry.type === "compaction" || entry.type === "branch_summary") {
				if (totalTokens < tokenBudget * .9) {
					messages.unshift(message);
					totalTokens += tokens;
				}
			}
			break;
		}
		messages.unshift(message);
		totalTokens += tokens;
	}
	return {
		messages,
		fileOps,
		totalTokens
	};
}
const BRANCH_SUMMARY_PREAMBLE = `The user explored a different conversation branch before returning here.
Summary of that exploration:

`;
const BRANCH_SUMMARY_PROMPT = `Create a structured summary of this conversation branch for context when returning later.

Use this EXACT format:

## Goal
[What was the user trying to accomplish in this branch?]

## Constraints & Preferences
- [Any constraints, preferences, or requirements mentioned]
- [Or "(none)" if none were mentioned]

## Progress
### Done
- [x] [Completed tasks/changes]

### In Progress
- [ ] [Work that was started but not finished]

### Blocked
- [Issues preventing progress, if any]

## Key Decisions
- **[Decision]**: [Brief rationale]

## Next Steps
1. [What should happen next to continue this work]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;
/** Generate a summary for abandoned branch entries. */
async function generateBranchSummary(entries, options) {
	const { model, apiKey, headers, signal, customInstructions, replaceInstructions, reserveTokens = 16384 } = options;
	const contextWindow = model.contextWindow || 128e3;
	const maxSummaryOutputTokens = Math.min(2048, Math.max(1, Math.floor(contextWindow / 4)), model.maxTokens > 0 ? model.maxTokens : 2048);
	const usableReserveTokens = reserveTokens < contextWindow ? reserveTokens : Math.floor(contextWindow / 2);
	const { messages, fileOps } = prepareBranchEntries(entries, Math.max(1, contextWindow - Math.max(maxSummaryOutputTokens, usableReserveTokens)));
	if (messages.length === 0) return ok({
		summary: "No content to summarize",
		readFiles: [],
		modifiedFiles: []
	});
	const conversationText = serializeConversation(convertToLlm(messages));
	let instructions;
	if (replaceInstructions && customInstructions) instructions = customInstructions;
	else if (customInstructions) instructions = `${BRANCH_SUMMARY_PROMPT}\n\nAdditional focus: ${customInstructions}`;
	else instructions = BRANCH_SUMMARY_PROMPT;
	const context = {
		systemPrompt: SUMMARIZATION_SYSTEM_PROMPT,
		messages: [{
			role: "user",
			content: [{
				type: "text",
				text: `<conversation>\n${conversationText}\n</conversation>\n\n${instructions}`
			}],
			timestamp: Date.now()
		}]
	};
	const streamOptions = {
		apiKey,
		headers,
		signal,
		maxTokens: maxSummaryOutputTokens
	};
	const response = options.streamFn ? await (await options.streamFn(model, context, streamOptions)).result() : await resolveAgentCoreCompleteFn(options.runtime)(model, context, streamOptions);
	if (response.stopReason === "aborted") return err(new BranchSummaryError("aborted", response.errorMessage || "Branch summary aborted"));
	if (response.stopReason === "error") return err(new BranchSummaryError("summarization_failed", `Branch summary failed: ${response.errorMessage || "Unknown error"}`));
	const summaryText = extractSummaryText(response);
	if (summaryText === void 0) return err(new BranchSummaryError("summarization_failed", "Branch summary failed: model returned no summary text"));
	let summary = BRANCH_SUMMARY_PREAMBLE + summaryText;
	const { readFiles, modifiedFiles } = computeFileLists(fileOps);
	summary += formatFileOperations(readFiles, modifiedFiles);
	return ok({
		summary,
		readFiles,
		modifiedFiles
	});
}
//#endregion
export { collectEntriesForBranchSummaryFromBranches, generateBranchSummary, prepareBranchEntries };
