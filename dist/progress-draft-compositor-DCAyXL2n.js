import { A as resolveChannelStreamingPreviewToolProgress, N as resolveChannelStreamingSuppressDefaultToolProgressMessages, S as resolveChannelProgressDraftMaxLines, a as createChannelProgressDraftGate, c as formatChannelProgressDraftText, d as isChannelProgressDraftWorkToolName, g as normalizeChannelProgressDraftLineIdentity, i as buildChannelProgressDraftLineForEntry, j as resolveChannelStreamingProgressCommentary, m as mergeChannelProgressDraftLine, x as resolveChannelProgressDraftMaxLineChars } from "./streaming-B45j2FQx.js";
import { a as sanitizeProgressStatusText, i as normalizeReasoningProgressLine, n as mergeReasoningProgressText, r as normalizeCommentaryProgressText, t as formatReasoningProgressDisplayLine } from "./progress-draft-status-text-DlvYwq2T.js";
//#region src/channels/progress-draft-events.ts
function createChannelProgressDraftEventHandlers(params) {
	const pushEvent = (input, detailMode) => {
		const lineOptions = detailMode ? { detailMode } : void 0;
		const line = params.buildLine ? params.buildLine(input, lineOptions) : buildChannelProgressDraftLineForEntry(params.entry, input, lineOptions);
		return params.pushLine(line, input.event === "tool" ? { toolName: input.name?.trim() } : {});
	};
	return {
		pushToolEvent: (payload) => {
			const { detailMode, ...input } = payload;
			return pushEvent({
				event: "tool",
				...input
			}, detailMode);
		},
		pushItemEvent: (payload) => {
			const { kind: itemKind, ...input } = payload;
			return pushEvent({
				event: "item",
				...input,
				itemKind
			});
		},
		pushApprovalEvent: (payload) => {
			return payload.phase === "requested" ? pushEvent({
				event: "approval",
				...payload
			}) : Promise.resolve(false);
		},
		pushCommandOutputEvent: (payload) => {
			return payload.phase === "end" ? pushEvent({
				event: "command-output",
				...payload
			}) : Promise.resolve(false);
		},
		pushPatchEvent: (payload) => {
			return payload.phase === "end" ? pushEvent({
				event: "patch",
				...payload
			}) : Promise.resolve(false);
		}
	};
}
//#endregion
//#region src/channels/progress-draft-lines.ts
/**
* Removes a keyed structured progress line while preserving plain text draft lines.
* Returns the original array when no line is removed so renderers can use identity as a no-op signal.
*/
function removeChannelProgressDraftLine(lines, id) {
	const lineId = id.trim();
	if (!lineId) return lines;
	const next = lines.filter((line) => typeof line !== "object" || line.id?.trim() !== lineId);
	return next.length === lines.length ? lines : next;
}
//#endregion
//#region src/channels/progress-receipt-tracker.ts
/** Tracks per-turn activity for compact progress receipts. */
function createChannelProgressReceiptTracker(params) {
	const now = params?.now ?? Date.now;
	let startedAt = now();
	let reasoningSteps = 0;
	let toolCalls = 0;
	let commentaryNotes = 0;
	let reasoningOpen = false;
	const seenCommentaryIds = /* @__PURE__ */ new Set();
	let lastCommentaryText = "";
	const closeReasoning = () => {
		if (!reasoningOpen) return;
		reasoningOpen = false;
		reasoningSteps += 1;
	};
	const reset = () => {
		startedAt = now();
		reasoningSteps = 0;
		toolCalls = 0;
		commentaryNotes = 0;
		reasoningOpen = false;
		seenCommentaryIds.clear();
		lastCommentaryText = "";
	};
	return {
		noteReasoning() {
			reasoningOpen = true;
		},
		closeReasoning,
		noteToolCall(toolName) {
			closeReasoning();
			if (isChannelProgressDraftWorkToolName(toolName)) toolCalls += 1;
		},
		noteCommentary(itemId, text) {
			const trimmed = text?.trim();
			if (!trimmed) return;
			if (itemId) {
				if (!seenCommentaryIds.has(itemId)) {
					seenCommentaryIds.add(itemId);
					commentaryNotes += 1;
				}
				return;
			}
			if (trimmed !== lastCommentaryText) {
				lastCommentaryText = trimmed;
				commentaryNotes += 1;
			}
		},
		reset,
		buildSummaryLine() {
			closeReasoning();
			const seconds = Math.max(1, Math.round((now() - startedAt) / 1e3));
			return [
				...reasoningSteps > 0 ? [`🧠 ${reasoningSteps} thought${reasoningSteps === 1 ? "" : "s"}`] : [],
				...commentaryNotes > 0 ? [`💬 ${commentaryNotes} note${commentaryNotes === 1 ? "" : "s"}`] : [],
				...toolCalls > 0 ? [`🛠️ ${toolCalls} tool call${toolCalls === 1 ? "" : "s"}`] : [],
				`⏱️ ${seconds}s`
			].join(" · ");
		}
	};
}
//#endregion
//#region src/channels/progress-draft-compositor.ts
const PROGRESS_STATUS_PREAMBLE_FRESH_MS = 2e4;
/** Creates a stateful compositor for one streaming channel reply. */
function createChannelProgressDraftCompositor(params) {
	const now = params.now ?? Date.now;
	const setTimeoutFn = params.setTimeoutFn ?? setTimeout;
	const clearTimeoutFn = params.clearTimeoutFn ?? clearTimeout;
	const reasoningLinePrefix = params.reasoningLinePrefix ?? "";
	const commentaryLinePrefix = params.commentaryLinePrefix ?? "";
	const commentaryItalics = params.commentaryItalics ?? true;
	const stripLaneItalics = (text) => text.split("\n").map((line) => line.replace(/^_(.*)_$/su, "$1")).join("\n");
	const previewToolProgressEnabled = params.active && resolveChannelStreamingPreviewToolProgress(params.entry, true, params.mode);
	const commentaryProgressEnabled = params.active && resolveChannelStreamingProgressCommentary(params.entry, false, params.mode);
	const thinkingProgressEnabled = params.active && (params.reasoningGate ?? previewToolProgressEnabled);
	const suppressDefaultToolProgressMessages = params.active && resolveChannelStreamingSuppressDefaultToolProgressMessages(params.entry, {
		draftStreamActive: true,
		previewToolProgressEnabled
	});
	let progressSuppressed = false;
	let lines = [];
	let lastRenderedText = "";
	let lastRenderedLines = lines;
	let reasoningRawText = "";
	let lastReasoningLine;
	let lastIdLessCommentaryId;
	let lastIdLessCommentaryBare = "";
	let preambleText = "";
	let preambleItemId;
	let preambleAt;
	let narrationText = "";
	let planSteps;
	let planExplanation = "";
	let finalReplyStarted = false;
	let finalReplyDelivered = false;
	let preambleExpiryTimer;
	const mergeReasoningProgress = (text, options) => {
		if (!text) return "";
		reasoningRawText = mergeReasoningProgressText(reasoningRawText, text, { snapshot: options?.snapshot === true });
		return normalizeReasoningProgressLine(reasoningRawText);
	};
	const clearPreambleExpiryTimer = () => {
		if (preambleExpiryTimer !== void 0) {
			clearTimeoutFn(preambleExpiryTimer);
			preambleExpiryTimer = void 0;
		}
	};
	const resolveStatusText = () => {
		const preambleIsFresh = preambleAt !== void 0 && now() - preambleAt < 2e4;
		const effectiveNarration = narrationText || planExplanation;
		return preambleText && (preambleIsFresh || !effectiveNarration) ? preambleText : effectiveNarration;
	};
	const formatDraftText = (draftLines = lines, options) => {
		const narration = resolveStatusText() || void 0;
		const linesRenderedByChannel = params.rendersRollingLinesNatively === true && Boolean(narration || planSteps?.length);
		return formatChannelProgressDraftText({
			entry: params.entry,
			lines: linesRenderedByChannel ? [] : draftLines,
			seed: params.seed,
			formatLine: options?.formatted === false ? void 0 : params.formatLine,
			narration,
			plan: planSteps
		});
	};
	const getSnapshot = () => {
		const statusHeadline = resolveStatusText();
		return {
			lines: lines.map((line) => typeof line === "string" ? line : { ...line }),
			...statusHeadline ? { statusHeadline } : {},
			...planSteps ? { plan: planSteps.map((entry) => ({ ...entry })) } : {},
			...planExplanation ? { planExplanation } : {}
		};
	};
	const clearProgressState = (suppressed) => {
		clearPreambleExpiryTimer();
		progressSuppressed = suppressed;
		lines = [];
		lastRenderedText = "";
		lastRenderedLines = lines;
		reasoningRawText = "";
		lastReasoningLine = void 0;
		lastIdLessCommentaryId = void 0;
		lastIdLessCommentaryBare = "";
		preambleText = "";
		preambleItemId = void 0;
		preambleAt = void 0;
		narrationText = "";
		planSteps = void 0;
		planExplanation = "";
	};
	const publish = async (options) => {
		const text = formatDraftText();
		const linesChanged = params.updateOnLineChange === true && lines !== lastRenderedLines;
		if (!text || text === lastRenderedText && !linesChanged) return false;
		lastRenderedText = text;
		lastRenderedLines = lines;
		await params.update(text, {
			...options,
			lines: [...lines]
		});
		return true;
	};
	const render = async (options) => {
		if (!params.active || params.mode !== "progress" || finalReplyStarted || finalReplyDelivered) return false;
		return await publish(options);
	};
	const schedulePreambleExpiryRefresh = () => {
		clearPreambleExpiryTimer();
		if (!preambleText || !narrationText || preambleAt === void 0 || !gate.hasStarted || finalReplyStarted || finalReplyDelivered) return;
		const remaining = PROGRESS_STATUS_PREAMBLE_FRESH_MS - (now() - preambleAt);
		if (remaining <= 0) return;
		preambleExpiryTimer = setTimeoutFn(() => {
			preambleExpiryTimer = void 0;
			render().catch((err) => {
				console.warn(`[progress-draft] channel progress status refresh failed: ${String(err)}`);
			});
		}, remaining);
	};
	const gate = createChannelProgressDraftGate({
		onStart: async () => {
			await render({ flush: true });
			schedulePreambleExpiryRefresh();
		},
		setTimeoutFn,
		clearTimeoutFn
	});
	/**
	* Commentary line identity. An explicit item id owns its line. Without one,
	* providers stream cumulative snapshots ("Checking" → "Checking the
	* workspace"), so a snapshot that continues the open line reuses its id and
	* updates in place; anything else starts a new line.
	*/
	const resolveCommentaryLineId = (commentary) => {
		if (commentary.itemId) return `commentary:${commentary.itemId}`;
		if (!commentary.normalized) return "";
		if (Boolean(lastIdLessCommentaryBare) && (commentary.bareNormalized.startsWith(lastIdLessCommentaryBare) || lastIdLessCommentaryBare.startsWith(commentary.bareNormalized)) && lastIdLessCommentaryId) return lastIdLessCommentaryId;
		return `commentary:${commentary.normalized}`;
	};
	const clearLine = async (lineId) => {
		const nextLines = removeChannelProgressDraftLine(lines, lineId);
		if (nextLines === lines) return;
		lines = nextLines;
		if (!gate.hasStarted) return;
		if (formatDraftText()) {
			await render();
			return;
		}
		lastRenderedText = "";
		await params.deleteCurrent?.();
	};
	const noteProgress = async (line, options) => {
		if (!params.active || finalReplyStarted || finalReplyDelivered) return false;
		if (options?.toolName !== void 0 && !isChannelProgressDraftWorkToolName(options.toolName)) return false;
		if (params.isEmptyLine?.(line)) return false;
		const normalized = normalizeChannelProgressDraftLineIdentity(line);
		if (!normalized || progressSuppressed) return false;
		if (params.mode !== "progress" && !previewToolProgressEnabled) return false;
		const progressLine = typeof line === "object" && line !== void 0 ? line : normalized;
		const shouldStoreLine = previewToolProgressEnabled;
		const nextLines = shouldStoreLine ? mergeChannelProgressDraftLine(lines, progressLine, { maxLines: resolveChannelProgressDraftMaxLines(params.entry) }) : lines;
		if (shouldStoreLine && nextLines === lines) return false;
		if (shouldStoreLine) {
			reasoningRawText = "";
			lastReasoningLine = void 0;
		}
		if (shouldStoreLine && params.tryNativeUpdate) {
			const text = formatDraftText(nextLines, { formatted: false });
			if (text && await params.tryNativeUpdate(text)) {
				lines = nextLines;
				lastRenderedText = text;
				lastRenderedLines = lines;
				return true;
			}
		}
		lines = nextLines;
		if (params.mode !== "progress") return shouldStoreLine ? await publish() : false;
		if (options?.startImmediately || params.shouldStartNow?.(line)) {
			const alreadyStarted = gate.hasStarted;
			await gate.startNow();
			if (!gate.hasStarted) return false;
			return alreadyStarted ? await render() : true;
		}
		const alreadyStarted = gate.hasStarted;
		const progressActive = await gate.noteWork();
		if ((alreadyStarted || progressActive) && gate.hasStarted) return await render();
		return false;
	};
	return {
		get previewToolProgressEnabled() {
			return previewToolProgressEnabled;
		},
		get commentaryProgressEnabled() {
			return commentaryProgressEnabled;
		},
		get suppressDefaultToolProgressMessages() {
			return suppressDefaultToolProgressMessages;
		},
		get hasStarted() {
			return gate.hasStarted;
		},
		get isVisible() {
			return gate.hasStarted && !finalReplyStarted && !finalReplyDelivered;
		},
		get hasStatusHeadline() {
			return Boolean(resolveStatusText());
		},
		get hasPlanProgress() {
			return Boolean(planSteps?.length);
		},
		getSnapshot,
		markFinalReplyStarted() {
			finalReplyStarted = true;
			gate.cancel();
			clearPreambleExpiryTimer();
		},
		markFinalReplyDelivered() {
			finalReplyDelivered = true;
			clearPreambleExpiryTimer();
		},
		beginNewTurn(options) {
			if (options?.force !== true && !finalReplyStarted && !finalReplyDelivered) return false;
			finalReplyStarted = false;
			finalReplyDelivered = false;
			gate.reset();
			clearProgressState(false);
			return true;
		},
		reset() {
			clearProgressState(false);
		},
		resetReasoningProgress() {
			reasoningRawText = "";
		},
		mergeReasoningProgress,
		suppress() {
			clearProgressState(true);
		},
		cancel() {
			gate.cancel();
			clearPreambleExpiryTimer();
		},
		start() {
			return gate.startNow();
		},
		async noteActivity(options) {
			if (!params.active || params.mode !== "progress" || progressSuppressed || finalReplyStarted || finalReplyDelivered) return false;
			if (options?.startImmediately) {
				await gate.startNow();
				return gate.hasStarted ? await render({ flush: true }) : false;
			}
			const alreadyStarted = gate.hasStarted;
			const progressActive = await gate.noteWork();
			if ((alreadyStarted || progressActive) && gate.hasStarted) return await render();
			return false;
		},
		pushToolProgress: noteProgress,
		...createChannelProgressDraftEventHandlers({
			entry: params.entry,
			pushLine: noteProgress,
			...params.buildProgressEventLine ? { buildLine: params.buildProgressEventLine } : {}
		}),
		async pushPlanProgress(steps, options) {
			if (!params.active || params.mode !== "progress" || progressSuppressed || finalReplyStarted || finalReplyDelivered) return false;
			planSteps = steps && steps.length > 0 ? steps.map((entry) => ({ ...entry })) : void 0;
			planExplanation = options?.explanation?.replace(/\s+/g, " ").trim() ?? "";
			if (!planSteps && !planExplanation) {
				if (!gate.hasStarted) return false;
				const rendered = await render();
				if (rendered || formatDraftText()) return rendered;
				lastRenderedText = "";
				await params.deleteCurrent?.();
				return true;
			}
			const alreadyStarted = gate.hasStarted;
			await gate.startNow();
			if (!gate.hasStarted) return false;
			if (alreadyStarted) await render();
			return true;
		},
		async pushPreambleHeadline(text, options) {
			if (!params.active || params.mode !== "progress" || progressSuppressed) return false;
			if (commentaryProgressEnabled) return false;
			if (finalReplyStarted || finalReplyDelivered) return false;
			const itemId = options?.itemId?.trim() || void 0;
			const normalized = sanitizeProgressStatusText(text ?? "").replace(/\s+/g, " ").trim();
			if (!normalized) {
				if (!itemId || itemId !== preambleItemId) return false;
				preambleText = "";
				preambleItemId = void 0;
				preambleAt = void 0;
				clearPreambleExpiryTimer();
				if (!gate.hasStarted) return false;
				const rendered = await render();
				if (rendered || formatDraftText()) return rendered;
				lastRenderedText = "";
				await params.deleteCurrent?.();
				return true;
			}
			const isNewPreambleItem = Boolean(itemId && itemId !== preambleItemId);
			if (isNewPreambleItem) preambleItemId = itemId;
			else if (!itemId) preambleItemId = void 0;
			if (normalized === preambleText && !isNewPreambleItem) return false;
			preambleText = normalized;
			preambleAt = now();
			schedulePreambleExpiryRefresh();
			return gate.hasStarted ? await render() : false;
		},
		async pushNarrationProgress(text) {
			if (!params.active || params.mode !== "progress" || progressSuppressed) return false;
			if (finalReplyStarted || finalReplyDelivered) return false;
			const normalized = text?.replace(/\s+/g, " ").trim() ?? "";
			if (normalized === narrationText) return false;
			if (!normalized) {
				narrationText = "";
				clearPreambleExpiryTimer();
				return await render();
			}
			narrationText = normalized;
			schedulePreambleExpiryRefresh();
			return gate.hasStarted ? await render() : false;
		},
		async pushReasoningProgress(text, options) {
			if (!params.active || params.mode !== "progress" || !text || progressSuppressed || finalReplyDelivered || !thinkingProgressEnabled) return false;
			const normalized = mergeReasoningProgress(text, options);
			if (!normalized) return false;
			const compactLine = formatReasoningProgressDisplayLine(normalized, resolveChannelProgressDraftMaxLineChars(params.entry));
			if (!compactLine) return false;
			const displayLine = `${reasoningLinePrefix}${compactLine}`;
			const priorIndex = lastReasoningLine === void 0 ? -1 : lines.lastIndexOf(lastReasoningLine);
			if (priorIndex >= 0) {
				lines = [...lines];
				lines[priorIndex] = displayLine;
			} else lines = [...lines, displayLine].slice(-resolveChannelProgressDraftMaxLines(params.entry));
			lastReasoningLine = displayLine;
			if (await gate.noteWork() && gate.hasStarted) return await render();
			return false;
		},
		async pushCommentaryProgress(text, options) {
			if (!params.active || params.mode !== "progress" || !commentaryProgressEnabled) return false;
			if (finalReplyStarted || finalReplyDelivered) return false;
			const itemId = options?.itemId?.trim();
			if (!text && !itemId) return false;
			const normalized = normalizeCommentaryProgressText(text ?? "");
			const bareNormalized = stripLaneItalics(normalized);
			const lineId = resolveCommentaryLineId({
				itemId,
				normalized,
				bareNormalized
			});
			if (!normalized) {
				if (lineId) await clearLine(lineId);
				return false;
			}
			const line = {
				id: lineId,
				text: `${commentaryLinePrefix}${commentaryItalics ? normalized : bareNormalized}`,
				kind: "item",
				label: "Commentary",
				prefix: false
			};
			lines = mergeChannelProgressDraftLine(lines, line, { maxLines: resolveChannelProgressDraftMaxLines(params.entry) });
			if (!itemId) {
				lastIdLessCommentaryId = lineId;
				lastIdLessCommentaryBare = bareNormalized;
			}
			const alreadyStarted = gate.hasStarted;
			await gate.startNow();
			if (!gate.hasStarted) return false;
			if (alreadyStarted) await render();
			return true;
		}
	};
}
//#endregion
export { createChannelProgressDraftCompositor as n, createChannelProgressReceiptTracker as r, PROGRESS_STATUS_PREAMBLE_FRESH_MS as t };
