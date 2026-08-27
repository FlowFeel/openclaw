import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { O as resolveNonNegativeIntegerOption, j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import { u as withTimeout } from "./fs-safe-DVaClkIX.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import "./with-timeout-C4AhiECB.js";
import { t as levenshteinDistance } from "./levenshtein-distance-Doc-S5DZ.js";
import { i as getActiveMemorySearchManager, t as authorizeActiveMemorySearchHits } from "./memory-runtime-iam6N0Dd.js";
import { S as parseRealtimeVoiceAgentConsultArgs } from "./realtime-session-harness-bu55PsqP.js";
import "./agent-run-control-CtHK8YNN.js";
import "./provider-resolver-Cdi3A0NB.js";
import "./audio-energy-o8vC-5VK.js";
//#region src/talk/activation-name.ts
/**
* Realtime voice activation-name matching for direct spoken address.
*
* The matcher accepts short names at the leading or trailing edge of a
* transcript, strips the name before agent routing, and keeps fuzzy matching
* conservative so ordinary dictation does not trigger Talk turns.
*/
const REALTIME_VOICE_ACTIVATION_NAME_MAX_WORDS = 2;
/** Count alphanumeric words in a configured activation name. */
function realtimeVoiceActivationNameWordCount(value) {
	return Array.from(value.matchAll(/[a-z0-9]+/gi)).length;
}
/** Normalize configured activation names while preserving word boundaries. */
function normalizeRealtimeVoiceActivationName(value) {
	return value.toLowerCase().replace(/\s+/g, " ").trim() || void 0;
}
/** Extract the supported leading activation-name prefix from a longer phrase. */
function normalizeRealtimeVoiceActivationNamePrefix(value, maxWords = 2) {
	const words = Array.from(value.matchAll(/[a-z0-9]+/gi), (match) => match[0]);
	if (words.length === 0) return;
	return words.slice(0, maxWords).join(" ");
}
/** Validate the configured activation name length bound. */
function isSupportedRealtimeVoiceActivationName(value, maxWords = 2) {
	const wordCount = realtimeVoiceActivationNameWordCount(value);
	return wordCount >= 1 && wordCount <= maxWords;
}
/** Normalize and reject unsupported activation names in one reusable step. */
function normalizeSupportedRealtimeVoiceActivationName(value, maxWords = 2) {
	if (typeof value !== "string") return;
	const normalized = normalizeRealtimeVoiceActivationName(value);
	return normalized && isSupportedRealtimeVoiceActivationName(normalized, maxWords) ? normalized : void 0;
}
/** Prefer longer names first so nested names match the most specific option. */
function sortRealtimeVoiceActivationNames(names) {
	return names.toSorted((left, right) => right.length - left.length || left.localeCompare(right));
}
/** Match and strip a configured activation name from either transcript edge. */
function matchRealtimeVoiceActivationName(text, activationNames, maxWords = 2) {
	const preparedActivationNames = [];
	for (const activationName of activationNames) {
		const normalizedActivationName = normalizeActivationNameCandidate(activationName);
		if (!normalizedActivationName) continue;
		preparedActivationNames.push({
			activationName,
			compact: compactActivationName(normalizedActivationName)
		});
	}
	if (preparedActivationNames.length === 0) return;
	const candidates = [...leadingActivationNameCandidates(text, maxWords), ...trailingActivationNameCandidates(text, maxWords)].map((candidate) => ({
		candidate,
		compact: compactActivationName(candidate.heardName)
	})).toSorted((left, right) => right.compact.length - left.compact.length);
	for (const { candidate, compact: heardCompact } of candidates) for (const { activationName, compact: activationCompact } of preparedActivationNames) {
		const exactMatch = heardCompact === activationCompact;
		const fuzzyMatch = isFuzzyActivationNameMatch(candidate, heardCompact, activationCompact);
		if (exactMatch || fuzzyMatch) return {
			allowed: true,
			text: stripEdgeActivationNameCandidate(text, candidate),
			activationName,
			heardName: candidate.heardName,
			match: exactMatch ? "exact" : "fuzzy",
			edge: candidate.edge
		};
	}
}
function normalizeActivationNameCandidate(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim() || void 0;
}
function compactActivationName(value) {
	return value.replace(/[^a-z0-9]+/g, "");
}
function leadingActivationNameCandidates(text, maxWords) {
	const nameStart = /^\s*(?:(?:hey|ok|okay)(?:\s*[-,:;]+\s*|\s+))?/i.exec(text)?.[0].length ?? 0;
	const candidates = [];
	const candidateStarts = nameStart > 0 ? [0, nameStart] : [0];
	for (const startIndex of candidateStarts) {
		const tokenPattern = /[a-z0-9]+/gi;
		tokenPattern.lastIndex = startIndex;
		const startCandidates = [];
		for (let wordCount = 0; wordCount < maxWords; wordCount += 1) {
			const token = tokenPattern.exec(text);
			if (!token) break;
			const previousEndIndex = wordCount === 0 ? startIndex : startCandidates[wordCount - 1]?.endIndex;
			const between = text.slice(previousEndIndex, token.index);
			if (wordCount > 0 && !/^[\s'-]+$/.test(between)) break;
			const endIndex = token.index + token[0].length;
			const heardName = normalizeActivationNameCandidate(text.slice(startIndex, endIndex));
			if (!heardName) break;
			const boundary = text.slice(endIndex).match(/^\s*([,.:;!?-]|$)/);
			startCandidates.push({
				edge: "leading",
				heardName,
				startIndex,
				endIndex,
				strongBoundary: Boolean(boundary)
			});
		}
		candidates.push(...startCandidates);
	}
	return candidates;
}
function trailingActivationNameCandidates(text, maxWords) {
	const tokens = Array.from(text.matchAll(/[a-z0-9]+/gi));
	const candidates = [];
	const tokenCount = Math.min(tokens.length, maxWords);
	for (let wordCount = 1; wordCount <= tokenCount; wordCount += 1) {
		const startToken = tokens[tokens.length - wordCount];
		const endToken = tokens[tokens.length - 1];
		if (!startToken || !endToken?.[0]) break;
		const startIndex = startToken.index ?? 0;
		const endIndex = (endToken.index ?? 0) + endToken[0].length;
		if (!/^\s*(?:[,.:;!?-]+\s*)?$/.test(text.slice(endIndex))) break;
		if (!/(^|[\s,.:;!?-])$/.test(text.slice(0, startIndex))) break;
		const directAddressBoundary = /(^|[,.:;!?-]\s*)$/.test(text.slice(0, startIndex));
		const trailingQuestion = /\?\s*$/.test(text);
		if (wordCount > 1) {
			const previousToken = tokens[tokens.length - wordCount + 1];
			const between = previousToken ? text.slice(startIndex + startToken[0].length, previousToken.index) : "";
			if (!/^[\s'-]+$/.test(between)) break;
		}
		const heardName = normalizeActivationNameCandidate(text.slice(startIndex, endIndex));
		if (!heardName) break;
		candidates.push({
			edge: "trailing",
			heardName,
			startIndex,
			endIndex,
			strongBoundary: directAddressBoundary && trailingQuestion
		});
	}
	return candidates;
}
function hasOnlyPhoneticSubstitutions(left, right) {
	if (left.length !== right.length) return false;
	const vowels = /* @__PURE__ */ new Set([
		"a",
		"e",
		"i",
		"o",
		"u",
		"y"
	]);
	const liquids = /* @__PURE__ */ new Set(["l", "r"]);
	let substitutions = 0;
	for (let index = 0; index < left.length; index += 1) {
		const leftChar = left[index];
		const rightChar = right[index];
		if (leftChar === rightChar) continue;
		const vowelLike = vowels.has(leftChar ?? "") && vowels.has(rightChar ?? "");
		const liquidLike = liquids.has(leftChar ?? "") && liquids.has(rightChar ?? "");
		if (!vowelLike && !liquidLike) return false;
		substitutions += 1;
	}
	return substitutions > 0;
}
function commonPrefixLength(left, right) {
	const limit = Math.min(left.length, right.length);
	for (let index = 0; index < limit; index += 1) if (left[index] !== right[index]) return index;
	return limit;
}
function isFuzzyActivationNameMatch(candidate, heardCompact, activationCompact) {
	if (!heardCompact || !activationCompact || activationCompact.length < 5) return false;
	if (!candidate.strongBoundary) return false;
	if (heardCompact[0] !== activationCompact[0]) return false;
	const distance = levenshteinDistance(heardCompact, activationCompact);
	if (candidate.edge === "trailing") return heardCompact.length === activationCompact.length && hasOnlyPhoneticSubstitutions(heardCompact, activationCompact);
	if (distance <= 1) return true;
	if (distance === 2 && heardCompact.length >= 4 && activationCompact.length >= 5 && (heardCompact.length !== activationCompact.length || hasOnlyPhoneticSubstitutions(heardCompact, activationCompact) || commonPrefixLength(heardCompact, activationCompact) >= 6)) return true;
	if (distance === 3 && heardCompact.length >= 7 && activationCompact.length >= 7 && heardCompact.length !== activationCompact.length && commonPrefixLength(heardCompact, activationCompact) >= 5) return true;
	return false;
}
function stripEdgeActivationNameCandidate(text, candidate) {
	if (candidate.edge === "leading") return text.slice(candidate.endIndex).replace(/^\s*(?:[-,:;.!?]+\s*)?/, "").trim();
	return text.slice(0, candidate.startIndex).replace(/\s*(?:[-,:;.!?]+\s*)?$/, "").trim();
}
//#endregion
//#region src/talk/consult-transcript.ts
/**
* Transcript guardrails for realtime voice agent consults.
*
* ASR often emits partial fragments or polite closings that should not trigger
* an OpenClaw consult. This classifier names those skip reasons for callers.
*/
const REALTIME_VOICE_CONSULT_TRAILING_FRAGMENT_WORDS = /* @__PURE__ */ new Set([
	"a",
	"about",
	"an",
	"and",
	"as",
	"at",
	"because",
	"but",
	"by",
	"for",
	"from",
	"in",
	"of",
	"on",
	"or",
	"so",
	"that",
	"the",
	"then",
	"to",
	"with"
]);
/** Classify transcript text that is empty, incomplete, fragmented, or non-actionable. */
function classifySkippableRealtimeVoiceConsultTranscript(text) {
	const normalized = text.replace(/\s+/g, " ").trim().toLowerCase();
	if (!normalized) return "empty";
	if (/(\.\.\.|…)\s*$/.test(normalized)) return "incomplete-transcript";
	const lastWord = normalized.match(/[a-z']+$/)?.[0]?.replace(/^'+|'+$/g, "");
	if (lastWord && REALTIME_VOICE_CONSULT_TRAILING_FRAGMENT_WORDS.has(lastWord)) return "trailing-fragment";
	if (!normalized.includes("?") && (/^(i'?ll|i will) be (right )?back\b/.test(normalized) || /\b(see you|bye(?:-bye)?|goodbye)\b/.test(normalized))) return "non-actionable-closing";
}
//#endregion
//#region src/talk/turn-context-tracker.ts
const DEFAULT_REALTIME_VOICE_TURN_CONTEXT_LIMIT = 32;
const DEFAULT_REALTIME_VOICE_IGNORED_CONTEXT_TTL_MS = 1e4;
function createRealtimeVoiceTurnContextTracker(options = {}) {
	const turns = [];
	let recentIgnoredContext;
	let nextId = 0;
	const owner = Symbol("realtimeVoiceTurnContextTracker");
	const now = options.now ?? Date.now;
	const limit = resolveNonNegativeIntegerOption(options.limit, DEFAULT_REALTIME_VOICE_TURN_CONTEXT_LIMIT);
	const ignoredContextTtlMs = resolveNonNegativeIntegerOption(options.ignoredContextTtlMs, DEFAULT_REALTIME_VOICE_IGNORED_CONTEXT_TTL_MS);
	const deferUntilAudio = options.deferUntilAudio === true;
	const prune = () => {
		for (let index = turns.length - 1; index >= 0; index -= 1) {
			const turn = turns[index];
			if (turn?.closed && !turn.hasAudio) turns.splice(index, 1);
		}
		while (turns.length > limit) {
			const completedIndex = turns.findIndex((turn) => turn.closed);
			turns.splice(Math.max(completedIndex, 0), 1);
		}
	};
	const expireClosedTurnsBeforeLaterAudio = () => {
		let hasLaterAudio = false;
		for (let index = turns.length - 1; index >= 0; index -= 1) {
			const turn = turns[index];
			if (!turn?.hasAudio) continue;
			if (turn.closed && hasLaterAudio) {
				turns.splice(index, 1);
				continue;
			}
			hasLaterAudio = true;
		}
	};
	const prepareForAudioContextRead = () => {
		prune();
		expireClosedTurnsBeforeLaterAudio();
	};
	const owns = (handle) => handle[owner] === true;
	return {
		open(context, ...extra) {
			const startedAt = now();
			const handle = {
				...extra[0] ?? {},
				[owner]: true,
				id: `realtime-turn:${startedAt}:${++nextId}`,
				context,
				hasAudio: false,
				closed: false,
				startedAt
			};
			if (!deferUntilAudio) {
				turns.push(handle);
				prune();
			}
			return handle;
		},
		markAudio(handle) {
			if (!owns(handle)) return;
			handle.hasAudio = true;
			handle.lastAudioAt = now();
			if (!turns.includes(handle)) {
				turns.push(handle);
				prune();
			}
		},
		close(handle) {
			if (!owns(handle)) return;
			handle.closed = true;
			if (!turns.includes(handle)) return;
			prune();
		},
		consumeAudioContext() {
			prepareForAudioContextRead();
			const index = turns.findIndex((turn) => turn.hasAudio);
			if (index < 0) return;
			const [turn] = turns.splice(index, 1);
			prune();
			return turn?.context;
		},
		peekAudioTurn() {
			prepareForAudioContextRead();
			return turns.find((turn) => turn.hasAudio);
		},
		hasAudioContext() {
			prepareForAudioContextRead();
			return turns.some((turn) => turn.hasAudio);
		},
		rememberIgnoredContext(context) {
			if (context === void 0) return;
			recentIgnoredContext = {
				context,
				createdAt: now()
			};
		},
		consumeIgnoredContext() {
			const recent = recentIgnoredContext;
			recentIgnoredContext = void 0;
			if (!recent || now() - recent.createdAt > ignoredContextTtlMs) return;
			return recent.context;
		},
		size() {
			prune();
			return turns.length;
		},
		clear() {
			turns.length = 0;
			recentIgnoredContext = void 0;
		}
	};
}
//#endregion
//#region src/talk/fast-context-runtime.ts
/**
* Fast context lookup for realtime voice consults.
*
* When memory/session search can answer quickly, Talk can return concise
* context without launching a full agent consult; otherwise callers may fall
* back to the normal consult flow.
*/
const MAX_SNIPPET_CHARS = 700;
var RealtimeFastContextTimeoutError = class extends Error {
	constructor(timeoutMs) {
		super(`fast context lookup timed out after ${timeoutMs}ms`);
		this.name = "RealtimeFastContextTimeoutError";
	}
};
function normalizeSnippet(text) {
	const normalized = text.replace(/\s+/g, " ").trim();
	if (normalized.length <= MAX_SNIPPET_CHARS) return normalized;
	return `${truncateUtf16Safe(normalized, MAX_SNIPPET_CHARS - 1).trimEnd()}...`;
}
function buildSearchQuery(args) {
	const parsed = parseRealtimeVoiceAgentConsultArgs(args);
	return [parsed.question, parsed.context].filter(Boolean).join("\n\n");
}
function resolveLabels(labels) {
	return {
		audienceLabel: labels?.audienceLabel?.trim() || "person",
		contextName: labels?.contextName?.trim() || "OpenClaw memory context"
	};
}
function buildContextText(params) {
	const hits = params.hits.map((hit, index) => {
		const location = `${hit.path}:${hit.startLine}-${hit.endLine}`;
		return `${index + 1}. [${hit.source}] ${location}\n${normalizeSnippet(hit.snippet)}`;
	}).join("\n\n");
	return [
		`Fast ${params.labels.contextName} found for the live ${params.labels.audienceLabel}.`,
		`Use this context only if it answers the ${params.labels.audienceLabel}'s question. If it is not relevant, say briefly that you do not have that context handy.`,
		`Question:\n${params.query}`,
		`Context:\n${hits}`
	].join("\n\n");
}
function buildMissText(query, labels) {
	return [
		`No relevant ${labels.contextName} was found quickly for the live ${labels.audienceLabel}.`,
		`Answer briefly that you do not have that context handy. Do not keep checking unless the ${labels.audienceLabel} asks you to.`,
		`Question:\n${query}`
	].join("\n\n");
}
async function lookupFastContext(params) {
	const memory = await getActiveMemorySearchManager({
		cfg: params.cfg,
		agentId: params.agentId
	});
	if (!memory.manager) return {
		status: "unavailable",
		error: memory.error ?? "no active memory manager"
	};
	const rawHits = await memory.manager.search(params.query, {
		maxResults: params.config.maxResults,
		sessionKey: params.sessionKey,
		sources: params.config.sources
	});
	return {
		status: "hits",
		hits: await authorizeActiveMemorySearchHits({
			cfg: params.cfg,
			agentId: params.agentId,
			requesterSessionKey: params.sessionKey,
			sandboxed: false,
			hits: rawHits
		})
	};
}
/** Try to answer a realtime consult from fast memory/session context. */
async function resolveRealtimeVoiceFastContextConsult(params) {
	if (!params.config.enabled) return { handled: false };
	const labels = resolveLabels(params.labels);
	const query = buildSearchQuery(params.args);
	try {
		const timeoutMs = resolveTimerTimeoutMs(params.config.timeoutMs, 1);
		const lookup = await withTimeout(lookupFastContext({
			cfg: params.cfg,
			agentId: params.agentId,
			sessionKey: params.sessionKey,
			config: params.config,
			query
		}), timeoutMs, { createError: () => new RealtimeFastContextTimeoutError(timeoutMs) });
		if (lookup.status === "unavailable") {
			params.logger.debug?.(`[talk] fast context unavailable: ${lookup.error}`);
			return params.config.fallbackToConsult ? { handled: false } : {
				handled: true,
				result: { text: buildMissText(query, labels) }
			};
		}
		const { hits } = lookup;
		if (hits.length === 0) return params.config.fallbackToConsult ? { handled: false } : {
			handled: true,
			result: { text: buildMissText(query, labels) }
		};
		return {
			handled: true,
			result: { text: buildContextText({
				query,
				hits,
				labels
			}) }
		};
	} catch (error) {
		const message = formatErrorMessage(error);
		params.logger.debug?.(`[talk] fast context lookup failed: ${message}`);
		return params.config.fallbackToConsult ? { handled: false } : {
			handled: true,
			result: { text: buildMissText(query, labels) }
		};
	}
}
//#endregion
//#region src/talk/realtime-session-lifecycle.ts
const REALTIME_VOICE_MAX_PENDING_AUDIO_CHUNKS = 320;
const REALTIME_VOICE_MAX_PENDING_AUDIO_BYTES = 1024 * 1024;
function createRealtimeVoiceAudioQueue(overflowPolicy) {
	let chunks = [];
	let bytes = 0;
	const clear = () => {
		chunks = [];
		bytes = 0;
	};
	return {
		clear,
		drain: () => {
			const drained = chunks;
			clear();
			return drained;
		},
		enqueue: (audio) => {
			if (audio.byteLength > REALTIME_VOICE_MAX_PENDING_AUDIO_BYTES) return false;
			if (overflowPolicy === "reject-newest" && (chunks.length >= REALTIME_VOICE_MAX_PENDING_AUDIO_CHUNKS || bytes + audio.byteLength > REALTIME_VOICE_MAX_PENDING_AUDIO_BYTES)) return false;
			while (chunks.length >= REALTIME_VOICE_MAX_PENDING_AUDIO_CHUNKS || bytes + audio.byteLength > REALTIME_VOICE_MAX_PENDING_AUDIO_BYTES) {
				const dropped = chunks.shift();
				if (!dropped) return false;
				bytes -= dropped.byteLength;
			}
			const chunk = Buffer.from(audio);
			chunks.push(chunk);
			bytes += chunk.byteLength;
			return true;
		}
	};
}
var RealtimeVoiceSessionLifecycle = class {
	constructor(label) {
		this.label = label;
		this.state = { phase: "idle" };
		this.pendingAudio = createRealtimeVoiceAudioQueue("reject-newest");
	}
	connect(start) {
		if (this.isReady()) return Promise.resolve();
		if (this.connectPromise) return this.connectPromise;
		const promise = start(this.createFreshConnection());
		this.connectPromise = promise;
		const clear = () => {
			if (this.connectPromise === promise) this.connectPromise = void 0;
		};
		promise.then(clear, clear);
		return promise;
	}
	reconnect(connection) {
		const state = this.currentState(connection);
		if (!state || state.phase !== "retry-wait" || state.terminalOutcome) return;
		const nextConnection = this.createConnection(state.controller);
		state.connection = nextConnection;
		state.phase = "connecting";
		return nextConnection;
	}
	ready(connection) {
		const state = this.currentState(connection);
		if (!state || state.phase !== "connecting" || state.terminalOutcome) return false;
		state.phase = "ready";
		state.retryAttempts = 0;
		return true;
	}
	retry(connection, maxAttempts) {
		const state = this.currentState(connection);
		if (!state || state.phase === "retry-wait" || state.terminalOutcome) return;
		if (state.retryAttempts >= maxAttempts) return "exhausted";
		state.retryAttempts += 1;
		state.phase = "retry-wait";
		return {
			attempt: state.retryAttempts,
			signal: state.controller.signal
		};
	}
	createConnectAttempt(options) {
		let settled = false;
		let ready = false;
		let startupFailed = false;
		let resolvePromise;
		let rejectPromise;
		const promise = new Promise((resolve, reject) => {
			resolvePromise = resolve;
			rejectPromise = reject;
		});
		let removeAbortListener = () => {};
		let timeout;
		const cleanup = () => {
			if (timeout) clearTimeout(timeout);
			removeAbortListener();
		};
		const resolve = (providerReady = false) => {
			if (settled) return;
			settled = true;
			ready = providerReady;
			cleanup();
			resolvePromise();
		};
		const reject = (error) => {
			if (settled) return;
			settled = true;
			cleanup();
			rejectPromise(error);
		};
		const rejectStartup = (error) => {
			if (settled || !this.acceptsEvents(options.connection) || ready) return false;
			startupFailed = true;
			reject(error);
			return true;
		};
		const startTimeout = () => {
			if (settled || timeout) return;
			timeout = setTimeout(() => {
				if (this.isCurrent(options.connection) && !ready && this.terminalOutcome(options.connection) !== "completed") {
					startupFailed = true;
					options.onTimeout();
					reject(options.timeoutError());
				}
			}, options.timeoutMs);
		};
		const onAbort = () => {
			const outcome = this.terminalOutcome(options.connection);
			options.onAbort(outcome);
			if (outcome === "completed") {
				resolve();
				return;
			}
			const reason = options.connection.signal.reason;
			reject(reason instanceof Error ? reason : new Error(String(reason)));
		};
		options.connection.signal.addEventListener("abort", onAbort, { once: true });
		removeAbortListener = () => options.connection.signal.removeEventListener("abort", onAbort);
		if (options.connection.signal.aborted) onAbort();
		return {
			promise,
			get ready() {
				return ready;
			},
			get settled() {
				return settled;
			},
			get startupFailed() {
				return startupFailed;
			},
			reject,
			rejectStartup,
			resolve,
			startTimeout
		};
	}
	cancel() {
		const state = this.state;
		if (state.phase === "terminal") return false;
		this.connectPromise = void 0;
		this.pendingAudio.clear();
		if (!("controller" in state)) {
			this.state = {
				phase: "terminal",
				terminalOutcome: "completed"
			};
			return true;
		}
		state.phase = "terminal";
		state.terminalOutcome = "completed";
		state.controller.abort(/* @__PURE__ */ new Error(`${this.label} realtime voice session canceled`));
		return true;
	}
	failure(connection) {
		const state = this.currentState(connection);
		if (!state || state.terminalOutcome) return false;
		this.pendingAudio.clear();
		state.phase = "terminal";
		state.terminalOutcome = "error";
		state.controller.abort(/* @__PURE__ */ new Error(`${this.label} realtime voice session failed`));
		return true;
	}
	close(connection, outcome) {
		const state = this.currentState(connection);
		if (!state) return;
		this.pendingAudio.clear();
		if (!state.terminalOutcome) {
			state.phase = "terminal";
			state.terminalOutcome = outcome;
			state.controller.abort(/* @__PURE__ */ new Error(`${this.label} realtime voice session closed`));
		}
		if (state.terminalNotified) return;
		state.terminalNotified = true;
		return state.terminalOutcome;
	}
	currentConnection() {
		return "connection" in this.state ? this.state.connection : void 0;
	}
	isCurrent(connection) {
		return this.currentState(connection) !== void 0;
	}
	acceptsEvents(connection) {
		const phase = this.currentState(connection)?.phase;
		return phase === "connecting" || phase === "ready";
	}
	isReady() {
		return this.state.phase === "ready";
	}
	phase() {
		return this.state.phase;
	}
	terminalOutcome(connection) {
		return this.currentState(connection)?.terminalOutcome;
	}
	enqueuePendingAudio(audio) {
		return this.pendingAudio.enqueue(audio);
	}
	drainPendingAudio() {
		return this.pendingAudio.drain();
	}
	createFreshConnection() {
		if ("controller" in this.state) this.state.controller.abort(/* @__PURE__ */ new Error(`${this.label} realtime voice connection replaced`));
		const controller = new AbortController();
		const connection = this.createConnection(controller);
		this.state = {
			connection,
			controller,
			phase: "connecting",
			retryAttempts: 0,
			terminalNotified: false
		};
		return connection;
	}
	createConnection(controller) {
		return {
			id: Symbol(`${this.label.toLowerCase()}-realtime-voice-connection`),
			signal: controller.signal
		};
	}
	currentState(connection) {
		return "connection" in this.state && this.state.connection.id === connection.id ? this.state : void 0;
	}
};
//#endregion
export { classifySkippableRealtimeVoiceConsultTranscript as a, matchRealtimeVoiceActivationName as c, normalizeSupportedRealtimeVoiceActivationName as d, realtimeVoiceActivationNameWordCount as f, createRealtimeVoiceTurnContextTracker as i, normalizeRealtimeVoiceActivationName as l, createRealtimeVoiceAudioQueue as n, REALTIME_VOICE_ACTIVATION_NAME_MAX_WORDS as o, sortRealtimeVoiceActivationNames as p, resolveRealtimeVoiceFastContextConsult as r, isSupportedRealtimeVoiceActivationName as s, RealtimeVoiceSessionLifecycle as t, normalizeRealtimeVoiceActivationNamePrefix as u };
