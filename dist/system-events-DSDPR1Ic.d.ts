import { t as DeliveryContext } from "./delivery-context.types-CgrQeDKp.js";

//#region src/infra/system-events.d.ts
type SystemEvent = {
  text: string;
  ts: number;
  contextKey?: string | null;
  deliveryContext?: DeliveryContext;
};
type SystemEventOptions = {
  sessionKey: string;
  contextKey?: string | null;
  deliveryContext?: DeliveryContext; /** Replace the pending event for this context and delivery route. Requires contextKey. */
  replace?: boolean;
};
declare function enqueueSystemEvent(text: string, options: SystemEventOptions): boolean;
declare function peekSystemEventEntries(sessionKey: string): SystemEvent[];
declare function resetSystemEventsForTest(): void;
//#endregion
export { peekSystemEventEntries as n, resetSystemEventsForTest as r, enqueueSystemEvent as t };