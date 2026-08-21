//#region packages/gateway-client/src/timeouts.d.ts
/** Maximum delay Node timers can represent without overflow warnings. */
declare const MAX_SAFE_TIMEOUT_DELAY_MS = 2147483647;
/** Default server-side window for gateway preauth handshakes. */
declare const DEFAULT_PREAUTH_HANDSHAKE_TIMEOUT_MS = 15000;
/** Starts the browser-safe deadline that covers Gateway connect preparation and hello. */
declare function startGatewayConnectTimeout(onTimeout: () => void): ReturnType<typeof setTimeout>;
/** Clears either pending Gateway handshake phase without retaining its timer. */
declare function clearGatewayConnectTimeout(timer: ReturnType<typeof setTimeout> | null): null;
/** Default deadline for a single non-streaming Gateway request. */
declare const DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS = 30000;
/** Minimum client watchdog delay for connect challenge setup. */
declare const MIN_CONNECT_CHALLENGE_TIMEOUT_MS = 250;
/** Default maximum client watchdog delay, aligned with the preauth server timeout. */
declare const MAX_CONNECT_CHALLENGE_TIMEOUT_MS = 15000;
/** Clamps arbitrary timer delays to Node's safe range and an optional floor. */
declare function resolveSafeTimeoutDelayMs(delayMs: number, opts?: {
  minMs?: number;
}): number;
/** Adds grace time while preserving safe timer bounds if inputs overflow or are invalid. */
declare function addSafeTimeoutDelayGraceMs(delayMs: number, graceMs: number, opts?: {
  minMs?: number;
}): number;
/** Resolves optional timeout values through a fallback and safe timer clamp. */
declare function resolveFiniteTimeoutDelayMs(delayMs: number | null | undefined, fallbackMs: number, opts?: {
  minMs?: number;
}): number;
/** Clamps connect challenge watchdog timeouts to the gateway-supported range. */
declare function clampConnectChallengeTimeoutMs(timeoutMs: number, maxTimeoutMs?: number): number;
/** Reads the connect challenge watchdog override from the process environment. */
declare function getConnectChallengeTimeoutMsFromEnv(env?: NodeJS.ProcessEnv): number | undefined;
/** Resolves the client watchdog timeout using explicit, env, then preauth defaults. */
declare function resolveConnectChallengeTimeoutMs(timeoutMs?: number | null, params?: {
  env?: NodeJS.ProcessEnv;
  configuredTimeoutMs?: number | null;
}): number;
/** Resolves the server preauth timeout from env, explicit config, or default. */
declare function resolvePreauthHandshakeTimeoutMs(params?: {
  env?: NodeJS.ProcessEnv;
  configuredTimeoutMs?: number | null;
}): number;
//#endregion
export { DEFAULT_GATEWAY_REQUEST_TIMEOUT_MS, DEFAULT_PREAUTH_HANDSHAKE_TIMEOUT_MS, MAX_CONNECT_CHALLENGE_TIMEOUT_MS, MAX_SAFE_TIMEOUT_DELAY_MS, MIN_CONNECT_CHALLENGE_TIMEOUT_MS, addSafeTimeoutDelayGraceMs, clampConnectChallengeTimeoutMs, clearGatewayConnectTimeout, getConnectChallengeTimeoutMsFromEnv, resolveConnectChallengeTimeoutMs, resolveFiniteTimeoutDelayMs, resolvePreauthHandshakeTimeoutMs, resolveSafeTimeoutDelayMs, startGatewayConnectTimeout };