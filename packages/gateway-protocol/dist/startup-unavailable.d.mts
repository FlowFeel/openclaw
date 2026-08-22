//#region packages/gateway-protocol/src/startup-unavailable.d.ts
/** Structured error reason used while gateway startup sidecars are still initializing. */
declare const GATEWAY_STARTUP_UNAVAILABLE_REASON = "startup-sidecars";
/** Internal close cause that distinguishes startup retry closes from generic disconnects. */
declare const GATEWAY_STARTUP_PENDING_CLOSE_CAUSE = "startup-sidecars-pending";
/** WebSocket close code for temporary gateway unavailability. */
declare const GATEWAY_STARTUP_CLOSE_CODE = 1013;
/** Human-readable WebSocket close reason for temporary gateway startup unavailability. */
declare const GATEWAY_STARTUP_CLOSE_REASON = "gateway starting";
/** Default retry-after hint sent with startup-unavailable handshake errors. */
declare const GATEWAY_STARTUP_RETRY_AFTER_MS = 500;
/** Details payload attached to retryable startup-unavailable gateway errors. */
type GatewayStartupUnavailableDetails = {
  reason: typeof GATEWAY_STARTUP_UNAVAILABLE_REASON;
};
/** Builds the canonical startup-unavailable details payload. */
declare function gatewayStartupUnavailableDetails(): GatewayStartupUnavailableDetails;
/** Detects the structured retryable error emitted while startup sidecars are pending. */
declare function isRetryableGatewayStartupUnavailableError(error: unknown): boolean;
/** Resolves a bounded retry-after delay from a startup-unavailable error. */
declare function resolveGatewayStartupRetryAfterMs(error: unknown): number | null;
//#endregion
export { GATEWAY_STARTUP_CLOSE_CODE, GATEWAY_STARTUP_CLOSE_REASON, GATEWAY_STARTUP_PENDING_CLOSE_CAUSE, GATEWAY_STARTUP_RETRY_AFTER_MS, GATEWAY_STARTUP_UNAVAILABLE_REASON, gatewayStartupUnavailableDetails, isRetryableGatewayStartupUnavailableError, resolveGatewayStartupRetryAfterMs };