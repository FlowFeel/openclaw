//#region extensions/openai/realtime-quicksilver-audio-buffer.ts
const RELAY_FRAME_SAMPLES = 480;
const MAX_PENDING_RELAY_FRAMES = 250;
const OPENAI_QUICKSILVER_RELAY_FRAME_BYTES = RELAY_FRAME_SAMPLES * 2;
const OPENAI_QUICKSILVER_MAX_PENDING_AUDIO_BYTES = 960 * MAX_PENDING_RELAY_FRAMES;
function appendOpenAIQuicksilverPendingAudio(pending, incoming) {
	const evenLength = incoming.length - incoming.length % 2;
	if (evenLength === 0) return pending;
	const audio = incoming.subarray(0, evenLength);
	if (audio.length >= OPENAI_QUICKSILVER_MAX_PENDING_AUDIO_BYTES) return Buffer.from(audio.subarray(audio.length - OPENAI_QUICKSILVER_MAX_PENDING_AUDIO_BYTES));
	const pendingBytes = Math.min(pending.length, OPENAI_QUICKSILVER_MAX_PENDING_AUDIO_BYTES - audio.length);
	return Buffer.concat([pending.subarray(pending.length - pendingBytes), audio], pendingBytes + audio.length);
}
//#endregion
export { appendOpenAIQuicksilverPendingAudio as n, OPENAI_QUICKSILVER_RELAY_FRAME_BYTES as t };
