import { p as ReplyPayload } from "../types-CRVkfhst.js";
import { n as OpenClawConfig } from "../types.openclaw-ymL1Xg7f.js";
import { F as OutboundDeliveryResult, I as OutboundPayloadDeliveryOutcome } from "../types.adapters-v3071mf5.js";
import { n as QueuedDelivery, r as QueuedDeliveryPayload, t as MessageSentEvent } from "../message-sent-hook-BpwneFtw.js";
import { t as DeliveryRecoveryDrainDecision } from "../delivery-recovery.shared-BwhGmgIz.js";

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
declare function drainPendingDeliveries$1(opts: {
  drainKey: string;
  logLabel: string;
  cfg: OpenClawConfig;
  log: RecoveryLogger;
  stateDir?: string;
  deliver: DeliverFn;
  selectEntry: (entry: QueuedDelivery, now: number) => DeliveryRecoveryDrainDecision;
}): Promise<void>;
//#endregion
//#region src/plugin-sdk/delivery-queue-runtime.d.ts
type DrainPendingDeliveriesOptions = Omit<Parameters<typeof drainPendingDeliveries$1>[0], "deliver"> & {
  /** Optional delivery implementation for tests or plugin-owned send paths. */deliver?: DeliverFn;
};
/**
 * Drain queued outbound payloads after a channel reconnect or transport recovery.
 * When no deliver function is provided, the heavy outbound delivery runtime is
 * loaded lazily so importing this SDK subpath does not eagerly bind send internals.
 */
declare function drainPendingDeliveries(opts: DrainPendingDeliveriesOptions): Promise<void>;
//#endregion
export { drainPendingDeliveries };