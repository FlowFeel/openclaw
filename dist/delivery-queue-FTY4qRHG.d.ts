import { r as OpenClawConfig } from "./types.openclaw-C7iFpWwX.js";
import { i as ReplyPayload } from "./reply-payload-DdceO6tf.js";
import { n as OutboundPayloadDeliveryOutcome, t as OutboundDeliveryResult } from "./deliver-types-x3Quhy_V.js";
import { n as QueuedDelivery, r as QueuedDeliveryPayload, t as MessageSentEvent } from "./message-sent-hook-GPmYApgS.js";

//#region src/infra/delivery-recovery.shared.d.ts
type DeliveryRecoveryDrainDecision = {
  match: boolean;
  bypassBackoff?: boolean;
};
//#endregion
//#region src/infra/outbound/delivery-queue-recovery.d.ts
type DeliverFn = (params: {
  cfg: OpenClawConfig;
} & QueuedDeliveryPayload & {
  payloads: ReturnType<typeof queuedPayloads>;
  deliveryQueueId?: string;
  deliveryQueueStateDir?: string;
  deliveryProducerClaimId?: string;
  deliveryProducerLeaseRequired?: boolean;
  skipQueue?: boolean;
  deferredDeliveryAdmissionPassed?: true;
  deferCommitHooks?: boolean;
  onMessageSentEvent?: (event: MessageSentEvent, sourceIndex: number) => void;
  onPayloadDeliveryOutcome?: (outcome: OutboundPayloadDeliveryOutcome) => void;
  onDeliveryResult?: (result: OutboundDeliveryResult) => Promise<void> | void;
}) => Promise<unknown>;
interface RecoveryLogger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}
declare function queuedPayloads(entry: QueuedDelivery): ReplyPayload[];
declare function drainPendingDeliveries(opts: {
  drainKey: string;
  logLabel: string;
  cfg: OpenClawConfig;
  log: RecoveryLogger;
  stateDir?: string;
  deliver: DeliverFn;
  selectEntry: (entry: QueuedDelivery, now: number) => DeliveryRecoveryDrainDecision;
}): Promise<void>;
//#endregion
export { drainPendingDeliveries as n, DeliverFn as t };