import { n as XaiRealtimeVoiceProtocol, r as RealtimeVoiceSessionConnection } from "../../realtime-voice-protocol-DqQeyk9g.js";
import { _ as XaiRealtimeEvent } from "../../realtime-voice-config-DdTOsoln.js";

//#region extensions/xai/realtime-voice-events.d.ts
declare class XaiRealtimeMalformedAudioError extends Error {}
declare abstract class XaiRealtimeVoiceEvents extends XaiRealtimeVoiceProtocol {
  private assistantTranscriptBuffer;
  private assistantTranscriptFinalized;
  private inputTranscriptReplacements;
  protected abstract acceptsEvent(connection: RealtimeVoiceSessionConnection): boolean;
  protected abstract onSessionUpdated(connection: RealtimeVoiceSessionConnection): void;
  protected handleEvent(event: XaiRealtimeEvent, connection: RealtimeVoiceSessionConnection): void;
  protected resetInputTranscripts(): void;
  private emitCompletedToolCall;
  private appendAssistantTranscriptDelta;
  private flushAssistantTranscript;
  private resetAssistantTranscript;
  private inputTranscriptKey;
  private handleErrorEvent;
  private describeServerEvent;
}
//#endregion
export { XaiRealtimeMalformedAudioError, XaiRealtimeVoiceEvents };