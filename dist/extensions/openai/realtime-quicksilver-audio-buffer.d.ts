//#region extensions/openai/realtime-quicksilver-audio-buffer.d.ts
declare const OPENAI_QUICKSILVER_RELAY_FRAME_BYTES: number;
declare function appendOpenAIQuicksilverPendingAudio(pending: Buffer, incoming: Buffer): Buffer;
//#endregion
export { OPENAI_QUICKSILVER_RELAY_FRAME_BYTES, appendOpenAIQuicksilverPendingAudio };