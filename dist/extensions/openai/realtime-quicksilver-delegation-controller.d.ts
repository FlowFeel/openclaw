import { g as PluginLogger, z as RealtimeVoiceAgentConsultRunner } from "../../plugin-entry-DZ50A-uD.js";
import { n as OpenAIQuicksilverInboundEvent } from "../../realtime-quicksilver-wire-D5CFFb_y.js";
import { t as OpenAIQuicksilverSocket } from "../../realtime-quicksilver-sideband-Dz6zybpI.js";
import { RawData } from "ws";

//#region extensions/openai/realtime-quicksilver-delegation-controller.d.ts
type OpenAIQuicksilverDelegationControllerOptions = {
  getSocket: () => OpenAIQuicksilverSocket | undefined;
  isCanceledError?: (error: unknown) => boolean;
  logger: Pick<PluginLogger, "debug" | "warn">;
  onFatalError: (error: Error) => void;
  onSessionStarted?: (expiresAt: number | undefined) => void;
  onTranscript?: (role: "user" | "assistant", text: string, done: boolean) => void;
  onWireEventType?: (eventType: string) => void;
  runAgentConsult: RealtimeVoiceAgentConsultRunner;
  signal: AbortSignal;
};
/** Owns the provider's single active delegation and its once-consumed transcript context. */
declare class OpenAIQuicksilverDelegationController {
  private readonly options;
  private activeDelegationId;
  private consultController;
  private partialTranscriptRole;
  private pendingDelegation;
  private stopped;
  private transcript;
  constructor(options: OpenAIQuicksilverDelegationControllerOptions);
  handleFrame(data: RawData, isBinary: boolean): void;
  handleEvent(event: OpenAIQuicksilverInboundEvent): void;
  sendToActiveDelegation(text: string, channel: "speakable" | "commentary"): void;
  stop(reason: Error): void;
  private appendTranscript;
  private startDelegation;
  private launchDelegation;
  private runDelegation;
  private sendAppend;
  private fail;
}
//#endregion
export { OpenAIQuicksilverDelegationController };