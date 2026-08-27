import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as canonicalizeBase64 } from "./base64-KcXAb-1x.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./media-runtime-BSg_PCVr.js";
import { y as readXaiRealtimeErrorDetail } from "./realtime-voice-config-B0IVSa2N.js";
import { n as XaiRealtimeVoiceProtocol } from "./realtime-voice-protocol-o4eCn6eq.js";
//#region extensions/xai/realtime-voice-events.ts
var XaiRealtimeMalformedAudioError = class extends Error {};
var XaiRealtimeVoiceEvents = class extends XaiRealtimeVoiceProtocol {
	constructor(..._args) {
		super(..._args);
		this.assistantTranscriptBuffer = "";
		this.assistantTranscriptFinalized = false;
		this.inputTranscriptReplacements = /* @__PURE__ */ new Map();
	}
	handleEvent(event, connection) {
		this.config.onEvent?.({
			direction: "server",
			type: event.type,
			detail: this.describeServerEvent(event),
			...event.item_id ? { itemId: event.item_id } : {},
			...event.response_id ?? event.response?.id ? { responseId: event.response_id ?? event.response?.id } : {}
		});
		if (!this.acceptsEvent(connection)) return;
		switch (event.type) {
			case "session.created": return;
			case "conversation.created": {
				const conversationId = normalizeOptionalString(event.conversation?.id);
				if (conversationId) this.conversationId = conversationId;
				return;
			}
			case "conversation.item.created":
			case "conversation.item.added": {
				const item = event.item;
				const callId = normalizeOptionalString(item?.call_id);
				if (item?.type === "function_call_output" && callId) {
					this.pendingToolResultAcks.delete(callId);
					return;
				}
				if (event.type === "conversation.item.created") this.emitCompletedToolCall(item, event);
				return;
			}
			case "session.updated":
				this.onSessionUpdated(connection);
				return;
			case "response.created":
				this.responseActive = true;
				this.responseCreateInFlight = false;
				this.markQueue = [];
				this.lastAssistantItemId = null;
				this.responseStartTimestamp = null;
				this.resetAssistantTranscript();
				return;
			case "response.output_audio.delta": {
				const audioDelta = event.delta ?? event.data;
				if (!audioDelta) return;
				const canonicalAudio = canonicalizeBase64(audioDelta);
				if (!canonicalAudio) throw new XaiRealtimeMalformedAudioError("xAI realtime voice stream returned malformed base64 audio data");
				this.emitAudioWithPlaybackMark(Buffer.from(canonicalAudio, "base64"));
				if (event.item_id && event.item_id !== this.lastAssistantItemId) {
					this.lastAssistantItemId = event.item_id;
					this.responseStartTimestamp = this.latestMediaTimestamp;
				} else if (this.responseStartTimestamp === null) this.responseStartTimestamp = this.latestMediaTimestamp;
				this.responseActive = true;
				return;
			}
			case "input_audio_buffer.speech_started":
				this.handleServerVadBargeIn();
				return;
			case "response.text.delta":
			case "response.output_text.delta":
			case "response.output_audio_transcript.delta":
				if (event.delta) this.appendAssistantTranscriptDelta(event.delta);
				return;
			case "response.text.done":
			case "response.output_text.done":
			case "response.output_audio_transcript.done":
				this.flushAssistantTranscript(event.transcript ?? event.text);
				return;
			case "conversation.item.input_audio_transcription.delta":
				if (event.delta) this.config.onTranscript?.("user", event.delta, false);
				return;
			case "conversation.item.input_audio_transcription.updated":
				if (event.transcript) this.inputTranscriptReplacements.set(this.inputTranscriptKey(event), event.transcript);
				return;
			case "conversation.item.input_audio_transcription.completed": {
				const key = this.inputTranscriptKey(event);
				const transcript = event.transcript ?? this.inputTranscriptReplacements.get(key);
				this.inputTranscriptReplacements.delete(key);
				if (transcript) this.config.onTranscript?.("user", transcript, true);
				return;
			}
			case "conversation.item.input_audio_transcription.failed":
				this.inputTranscriptReplacements.delete(this.inputTranscriptKey(event));
				this.config.onError?.(new Error(readXaiRealtimeErrorDetail(event.error)));
				return;
			case "response.done": {
				const status = event.response?.status;
				const output = event.response?.output ?? [];
				if (status === void 0 || status === "completed") for (const item of output) this.emitCompletedToolCall(item, event);
				const terminalTranscript = output.filter((item) => item.type === "message" && item.role === "assistant").flatMap((item) => item.content ?? []).map((content) => content.transcript ?? content.text ?? "").join("");
				this.flushAssistantTranscript(terminalTranscript);
				this.responseActive = false;
				this.responseCreateInFlight = false;
				this.responseCancelInFlight = false;
				if (status === "failed" || status === "incomplete") {
					const details = event.response?.status_details;
					const error = isRecord(details) ? details.error : void 0;
					const reason = isRecord(details) ? normalizeOptionalString(details.reason) : void 0;
					const message = error ? readXaiRealtimeErrorDetail(error) : `xAI realtime voice response ${status}${reason ? `: ${reason}` : ""}`;
					this.config.onError?.(new Error(message));
				}
				this.flushPendingResponseCreate();
				return;
			}
			case "response.function_call_arguments.delta": {
				const key = event.item_id ?? "unknown";
				const existing = this.toolCallBuffers.get(key);
				if (existing && event.delta) existing.args += event.delta;
				else if (event.item_id) this.toolCallBuffers.set(event.item_id, {
					name: event.name ?? "",
					callId: event.call_id ?? "",
					args: event.delta ?? ""
				});
				return;
			}
			case "response.function_call_arguments.done": {
				const key = event.item_id ?? "unknown";
				const buffered = this.toolCallBuffers.get(key);
				this.emitToolCallOnce({
					itemId: event.item_id,
					callId: buffered?.callId || event.call_id,
					name: buffered?.name || event.name,
					rawArgs: event.arguments ?? buffered?.args
				});
				this.toolCallBuffers.delete(key);
				return;
			}
			case "error": this.handleErrorEvent(event.error);
			default:
		}
	}
	resetInputTranscripts() {
		this.inputTranscriptReplacements.clear();
	}
	emitCompletedToolCall(item, event) {
		if (item?.type === "function_call" && (!item.status || item.status === "completed")) this.emitToolCallOnce({
			itemId: item.id ?? event.item_id,
			callId: item.call_id,
			name: item.name,
			rawArgs: item.arguments
		});
	}
	appendAssistantTranscriptDelta(delta) {
		if (this.assistantTranscriptFinalized) {
			this.assistantTranscriptBuffer = "";
			this.assistantTranscriptFinalized = false;
		}
		this.assistantTranscriptBuffer += delta;
		this.config.onTranscript?.("assistant", delta, false);
	}
	flushAssistantTranscript(finalTranscript) {
		if (this.assistantTranscriptFinalized) return;
		const transcript = finalTranscript || this.assistantTranscriptBuffer;
		if (transcript) {
			this.config.onTranscript?.("assistant", transcript, true);
			this.assistantTranscriptFinalized = true;
		}
		this.assistantTranscriptBuffer = "";
	}
	resetAssistantTranscript() {
		this.assistantTranscriptBuffer = "";
		this.assistantTranscriptFinalized = false;
	}
	inputTranscriptKey(event) {
		return event.item_id ?? event.response_id ?? "default";
	}
	handleErrorEvent(error) {
		const detail = readXaiRealtimeErrorDetail(error);
		if (detail.startsWith("Conversation already has an active response in progress:")) {
			this.responseActive = true;
			this.responseCreateInFlight = false;
			this.responseCreatePending = true;
			return;
		}
		if (detail === "Cancellation failed: no active response found") {
			this.responseActive = false;
			this.responseCancelInFlight = false;
			this.flushPendingResponseCreate();
			return;
		}
		this.config.onError?.(new Error(detail));
	}
	describeServerEvent(event) {
		if (event.type === "error" || event.type === "conversation.item.input_audio_transcription.failed") return readXaiRealtimeErrorDetail(event.error);
		if (event.type !== "response.done") return;
		const status = event.response?.status;
		const details = event.response?.status_details === void 0 ? void 0 : JSON.stringify(event.response.status_details);
		return [status ? `status=${status}` : void 0, details].filter(Boolean).join(" ") || void 0;
	}
};
//#endregion
export { XaiRealtimeVoiceEvents as n, XaiRealtimeMalformedAudioError as t };
