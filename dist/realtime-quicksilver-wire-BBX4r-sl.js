import { r as truncateUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { Et as array, Rn as string, Tn as object, dn as literal, wn as number, yt as _enum } from "./schemas-CZ9Toj_c.js";
import { g as readResponseTextLimited, h as readProviderTextResponse } from "./provider-http-errors-Dm9G78mz.js";
import { d as resolveProviderRequestHeaders } from "./provider-request-config-DZemMjbU.js";
import "./provider-http-C8bsuM26.js";
import "./text-utility-runtime-D52Cj1WO.js";
import { n as isOpenAIGptLiveModel } from "./realtime-quicksilver-BdMyAyC5.js";
import { randomBytes } from "node:crypto";
//#region extensions/openai/realtime-quicksilver-wire.ts
const OPENAI_QUICKSILVER_APPEND_MAX_BYTES = 500;
const OPENAI_QUICKSILVER_DELEGATION_RESULT_MAX_CHARS = 1800;
const OPENAI_QUICKSILVER_CONTEXT_MAX_ENTRIES = 16;
const OPENAI_QUICKSILVER_CONTEXT_MAX_ITEM_CHARS = 800;
const OPENAI_QUICKSILVER_CONTEXT_MAX_UTF8_BYTES = 8e3;
const OPENAI_QUICKSILVER_CALL_URL = "https://api.openai.com/v1/live";
const OPENAI_REALTIME_CALL_URL = "https://api.openai.com/v1/realtime/calls";
const OPENAI_REALTIME_ERROR_BODY_MAX_BYTES = 16 * 1024;
const OPENAI_REALTIME_ERROR_DETAIL_MAX_CHARS = 500;
const OPENAI_REALTIME_SDP_ANSWER_MAX_BYTES = 256 * 1024;
const OPENAI_GPT_LIVE_WAITLIST_URL = "https://openai.com/form/gpt-live-1-in-the-api/";
const OPENAI_QUICKSILVER_VOICES = [
	"alloy",
	"ash",
	"ballad",
	"cedar",
	"coral",
	"echo",
	"marin",
	"sage",
	"shimmer",
	"verse"
];
const eventEnvelopeSchema = object({ type: string() }).passthrough();
const sessionStartedSchema = object({
	type: literal("session.started"),
	session: object({ expires_at: number().optional() }).passthrough()
}).passthrough();
const transcriptAddedSchema = object({ item: object({ text: string() }).passthrough() }).passthrough();
const outputAudioDeltaSchema = object({
	type: literal("output_audio.delta"),
	audio: string()
}).passthrough();
const turnDoneSchema = object({ turn: object({
	role: _enum(["user", "assistant"]),
	transcript: string()
}).passthrough() }).passthrough();
const delegationSchema = object({
	type: literal("delegation.created"),
	item: object({
		type: string(),
		target: string(),
		id: string().optional(),
		content: array(object({
			type: string(),
			text: string().optional()
		}).passthrough()).optional()
	}).passthrough()
}).passthrough();
var OpenAIQuicksilverCallError = class extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
		this.name = "OpenAIQuicksilverCallError";
	}
};
function resolveOpenAIQuicksilverVoice(value) {
	if (typeof value === "string") {
		const normalized = value.trim().toLowerCase();
		if (OPENAI_QUICKSILVER_VOICES.includes(normalized)) return normalized;
	}
	return "marin";
}
function buildOpenAIQuicksilverSession(params) {
	const initialItems = boundOpenAIQuicksilverContextItems(params.initialItems ?? []).map((item) => ({
		type: "message",
		role: item.role,
		content: [{
			type: item.role === "assistant" ? "output_text" : "input_text",
			text: item.text
		}]
	}));
	return {
		model: params.model,
		instructions: params.instructions?.trim() ?? "",
		audio: { output: { voice: resolveOpenAIQuicksilverVoice(params.voice) } },
		delegation: { type: "client" },
		...initialItems && initialItems.length > 0 ? { initial_items: initialItems } : {}
	};
}
/** Builds the direct Frameless Bidi WebSocket handshake used by Codex realtime v3. */
function buildOpenAIQuicksilverSessionUpdate(params) {
	const { model: _model, ...session } = buildOpenAIQuicksilverSession({
		model: "direct-websocket",
		...params
	});
	return {
		type: "session.update",
		session
	};
}
function buildOpenAIQuicksilverWebSocketUrl(model) {
	const url = new URL(OPENAI_QUICKSILVER_CALL_URL);
	url.protocol = "wss:";
	url.searchParams.set("model", model);
	return url.toString();
}
function truncateOpenAIQuicksilverContextText(text, maxBytes) {
	let result = "";
	let bytes = 0;
	let characters = 0;
	for (const character of text) {
		const characterBytes = Buffer.byteLength(character, "utf8");
		if (characters >= OPENAI_QUICKSILVER_CONTEXT_MAX_ITEM_CHARS || bytes + characterBytes > maxBytes) break;
		result += character;
		bytes += characterBytes;
		characters += 1;
	}
	return result;
}
function boundOpenAIQuicksilverContextItems(items) {
	let remainingBytes = OPENAI_QUICKSILVER_CONTEXT_MAX_UTF8_BYTES;
	const newestFirst = [];
	for (let index = items.length - 1; index >= 0 && newestFirst.length < OPENAI_QUICKSILVER_CONTEXT_MAX_ENTRIES; index -= 1) {
		const item = items[index];
		if (!item || remainingBytes <= 0) continue;
		const text = truncateOpenAIQuicksilverContextText(item.text, remainingBytes);
		if (!text) continue;
		newestFirst.push({
			role: item.role,
			text
		});
		remainingBytes -= Buffer.byteLength(text, "utf8");
	}
	return newestFirst.toReversed();
}
function openAIQuicksilverAuthHeaders(auth, requestIds) {
	return openAIRealtimeAuthHeaders({
		auth,
		requestIds,
		baseUrl: OPENAI_QUICKSILVER_CALL_URL,
		includeQuicksilverAlpha: true
	});
}
function openAIRealtimeAuthHeaders(params) {
	return {
		...resolveProviderRequestHeaders({
			provider: "openai",
			baseUrl: params.baseUrl,
			capability: "audio",
			transport: "http",
			defaultHeaders: {}
		}) ?? {},
		Authorization: `Bearer ${params.auth.token}`,
		...params.includeQuicksilverAlpha ? { "OpenAI-Alpha": "quicksilver=v2" } : {},
		"session-id": params.requestIds.sessionId,
		"thread-id": params.requestIds.threadId,
		"x-session-id": params.requestIds.realtimeSessionId,
		...params.auth.type === "oauth" ? { "chatgpt-account-id": params.auth.accountId } : {}
	};
}
function buildOpenAIQuicksilverMultipartBody(params) {
	const sessionJson = JSON.stringify(params.session);
	let boundary;
	do
		boundary = `openclaw-quicksilver-${randomBytes(18).toString("hex")}`;
	while (params.sdp.includes(boundary) || sessionJson.includes(boundary));
	return {
		body: [
			`--${boundary}\r\n`,
			"Content-Disposition: form-data; name=\"sdp\"\r\n",
			"Content-Type: application/sdp\r\n\r\n",
			params.sdp,
			"\r\n",
			`--${boundary}\r\n`,
			"Content-Disposition: form-data; name=\"session\"\r\n",
			"Content-Type: application/json\r\n\r\n",
			sessionJson,
			"\r\n",
			`--${boundary}--\r\n`
		].join(""),
		contentType: `multipart/form-data; boundary=${boundary}`
	};
}
function isOpenAIQuicksilverCallId(value) {
	return /^rtc_[\w-]+$/.test(value) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
function decodeOpenAIQuicksilverCallId(params) {
	const sessionId = params.openAiSessionId?.trim() ?? "";
	if (!params.location) {
		if (isOpenAIQuicksilverCallId(sessionId)) return sessionId;
		throw new OpenAIQuicksilverCallError(sessionId ? "GPT-Live call response returned an invalid openai-session-id" : "GPT-Live call response missing Location and openai-session-id headers");
	}
	let pathname;
	try {
		pathname = new URL(params.location, params.callUrl).pathname;
	} catch {
		if (isOpenAIQuicksilverCallId(sessionId)) return sessionId;
		throw new OpenAIQuicksilverCallError("GPT-Live call response returned an invalid Location");
	}
	const callId = pathname.split("/").filter(Boolean).find(isOpenAIQuicksilverCallId);
	if (!callId) {
		if (isOpenAIQuicksilverCallId(sessionId)) return sessionId;
		throw new OpenAIQuicksilverCallError("GPT-Live call response Location has no valid call id");
	}
	return callId;
}
function describeOpenAIQuicksilverCallError(status, detail) {
	const normalized = detail.toLowerCase();
	if (status === 403) return "GPT-Live rejected the session (403). This overloaded response most often means the voice or model is invalid for /v1/live. Accepted voices: alloy, ash, ballad, cedar, coral, echo, marin, sage, shimmer, verse. Accepted models: gpt-live-1-codex, gpt-live-1-boulder-alpha. Account access may also be unavailable; verify the selected ChatGPT OAuth profile and chatgpt-account-id.";
	if (status === 400 && (normalized.includes("model_not_found") || normalized.includes("does not exist or you do not have access"))) return `OpenAI Platform API-key access to /v1/live is waitlist-gated. Use a ChatGPT OAuth profile or request access at ${OPENAI_GPT_LIVE_WAITLIST_URL}`;
	if (status === 400 && normalized.includes("session.model") && normalized.includes("not allowed")) return "The GPT-Live model value is not permitted on /v1/live. Accepted values are gpt-live-1-codex and gpt-live-1-boulder-alpha.";
	return `GPT-Live call creation failed (${status})${detail ? `: ${detail}` : ""}`;
}
async function createOpenAIQuicksilverCall(params) {
	const isGptLive = isOpenAIGptLiveModel(params.session.model);
	const authHeaders = isGptLive ? openAIQuicksilverAuthHeaders(params.auth, params.requestIds) : openAIRealtimeAuthHeaders({
		auth: params.auth,
		requestIds: params.requestIds,
		baseUrl: OPENAI_REALTIME_CALL_URL,
		includeQuicksilverAlpha: false
	});
	const multipart = isGptLive ? buildOpenAIQuicksilverMultipartBody({
		sdp: params.sdp,
		session: params.session
	}) : void 0;
	const callUrl = isGptLive ? OPENAI_QUICKSILVER_CALL_URL : `${OPENAI_REALTIME_CALL_URL}?model=${encodeURIComponent(params.session.model)}`;
	const response = await (params.fetchImpl ?? fetch)(callUrl, {
		method: "POST",
		headers: {
			...authHeaders,
			"Content-Type": multipart?.contentType ?? "application/sdp"
		},
		body: multipart?.body ?? params.sdp,
		signal: params.signal
	});
	if (!response.ok) {
		const detail = (await readResponseTextLimited(response, OPENAI_REALTIME_ERROR_BODY_MAX_BYTES).catch(() => "")).trim().slice(0, OPENAI_REALTIME_ERROR_DETAIL_MAX_CHARS);
		throw new OpenAIQuicksilverCallError(isGptLive ? describeOpenAIQuicksilverCallError(response.status, detail) : `OpenAI Realtime call creation failed (${response.status})${detail ? `: ${detail}` : ""}`, response.status);
	}
	const answerSdp = await readProviderTextResponse(response, `${isGptLive ? "GPT-Live" : "OpenAI Realtime"} SDP answer`, { maxBytes: OPENAI_REALTIME_SDP_ANSWER_MAX_BYTES });
	if (!answerSdp.trim()) throw new OpenAIQuicksilverCallError(`${isGptLive ? "GPT-Live" : "OpenAI Realtime"} call creation returned an empty SDP answer`, response.status);
	if (!isGptLive) return {
		kind: "ga-realtime",
		status: response.status,
		answerSdp
	};
	const callId = decodeOpenAIQuicksilverCallId({
		location: response.headers.get("Location"),
		openAiSessionId: response.headers.get("openai-session-id"),
		callUrl: OPENAI_QUICKSILVER_CALL_URL
	});
	return {
		kind: "gpt-live",
		status: response.status,
		answerSdp,
		callId,
		sidebandUrl: `wss://api.openai.com/v1/live/${callId}`
	};
}
function readQuicksilverErrorMessage(value) {
	if (typeof value === "string" && value.trim()) return value.trim();
	if (value && typeof value === "object") {
		const record = value;
		if (typeof record.message === "string" && record.message.trim()) return record.message.trim();
		const error = record.error;
		if (error && typeof error === "object") {
			const nestedMessage = error.message;
			if (typeof nestedMessage === "string" && nestedMessage.trim()) return nestedMessage.trim();
		}
		if (typeof error === "string" && error.trim()) return error.trim();
		try {
			const serialized = JSON.stringify(error ?? value);
			if (serialized && serialized !== "{}") return serialized;
		} catch {}
	}
	return "GPT-Live sideband error";
}
function isFatalQuicksilverAuthError(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	const error = record.error && typeof record.error === "object" ? record.error : void 0;
	const status = record.status ?? error?.status;
	if (status === 401 || status === "401") return true;
	const code = typeof (record.code ?? error?.code) === "string" ? String(record.code ?? error?.code).toLowerCase() : "";
	return [
		"authentication_error",
		"invalid_api_key",
		"invalid_token",
		"token_expired"
	].includes(code);
}
function parseOpenAIQuicksilverEvent(payload) {
	let decoded;
	try {
		decoded = JSON.parse(payload);
	} catch {
		return null;
	}
	const envelope = eventEnvelopeSchema.safeParse(decoded);
	if (!envelope.success) return null;
	const eventType = envelope.data.type;
	if (eventType === "session.started") {
		const started = sessionStartedSchema.safeParse(decoded);
		if (!started.success) return {
			kind: "ignored",
			eventType
		};
		const expiresAt = started.data.session.expires_at;
		return {
			kind: "session-started",
			...expiresAt !== void 0 ? { expiresAt } : {}
		};
	}
	if (eventType === "input_transcript.added" || eventType === "output_transcript.added") {
		const transcript = transcriptAddedSchema.safeParse(decoded);
		return transcript.success ? {
			kind: "transcript-delta",
			role: eventType === "input_transcript.added" ? "user" : "assistant",
			text: transcript.data.item.text
		} : {
			kind: "ignored",
			eventType
		};
	}
	if (eventType === "turn.done") {
		const turn = turnDoneSchema.safeParse(decoded);
		return turn.success ? {
			kind: "transcript-done",
			role: turn.data.turn.role,
			text: turn.data.turn.transcript
		} : {
			kind: "ignored",
			eventType
		};
	}
	if (eventType === "output_audio.delta") {
		const audio = outputAudioDeltaSchema.safeParse(decoded);
		return audio.success ? {
			kind: "audio",
			data: audio.data.audio
		} : {
			kind: "ignored",
			eventType
		};
	}
	if (eventType === "session.updated") return {
		kind: "ignored",
		eventType
	};
	if (eventType === "delegation.created") {
		const delegation = delegationSchema.safeParse(decoded);
		if (!delegation.success) return {
			kind: "ignored",
			eventType
		};
		const { item } = delegation.data;
		if (item.type !== "delegation" || item.target !== "client" || !item.id) return {
			kind: "ignored",
			eventType
		};
		return {
			kind: "delegation",
			id: item.id,
			prompt: (item.content ?? []).filter((part) => part.type === "input_text").map((part) => part.text ?? "").join("")
		};
	}
	if (eventType === "error") return {
		kind: "error",
		message: readQuicksilverErrorMessage(decoded),
		fatalAuth: isFatalQuicksilverAuthError(decoded)
	};
	return {
		kind: "unknown",
		eventType
	};
}
function chunkOpenAIQuicksilverAppendText(text) {
	if (Buffer.byteLength(text, "utf8") <= OPENAI_QUICKSILVER_APPEND_MAX_BYTES) return [text];
	const chunks = [];
	let current = "";
	let currentBytes = 0;
	for (const character of text) {
		const characterBytes = Buffer.byteLength(character, "utf8");
		if (current && currentBytes + characterBytes > OPENAI_QUICKSILVER_APPEND_MAX_BYTES) {
			chunks.push(current);
			current = "";
			currentBytes = 0;
		}
		current += character;
		currentBytes += characterBytes;
	}
	if (current) chunks.push(current);
	return chunks;
}
/** Bound completed delegation output while preserving under-limit text byte-for-byte. */
function boundOpenAIQuicksilverDelegationResult(text) {
	if (text.length <= OPENAI_QUICKSILVER_DELEGATION_RESULT_MAX_CHARS) return text;
	return `${truncateUtf16Safe(text, OPENAI_QUICKSILVER_DELEGATION_RESULT_MAX_CHARS - 16).trimEnd()} [truncated]`;
}
//#endregion
export { buildOpenAIQuicksilverWebSocketUrl as a, openAIQuicksilverAuthHeaders as c, buildOpenAIQuicksilverSessionUpdate as i, parseOpenAIQuicksilverEvent as l, boundOpenAIQuicksilverDelegationResult as n, chunkOpenAIQuicksilverAppendText as o, buildOpenAIQuicksilverSession as r, createOpenAIQuicksilverCall as s, boundOpenAIQuicksilverContextItems as t, resolveOpenAIQuicksilverVoice as u };
