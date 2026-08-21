//#region packages/gateway-protocol/src/gateway-error-details.d.ts
/** Gateway JSON-RPC style error codes shared by clients and server handlers. */
declare const ErrorCodes: {
  /** Client has not completed account/device linking for this gateway. */readonly NOT_LINKED: "NOT_LINKED"; /** Device exists but still needs an explicit pairing approval. */
  readonly NOT_PAIRED: "NOT_PAIRED"; /** Agent turn exceeded the gateway wait window. */
  readonly AGENT_TIMEOUT: "AGENT_TIMEOUT"; /** Request payload failed protocol validation or method preconditions. */
  readonly INVALID_REQUEST: "INVALID_REQUEST"; /** Authenticated caller lacks permission for the requested operation. */
  readonly FORBIDDEN: "FORBIDDEN"; /** Approval resolution referenced a missing or expired approval request. */
  readonly APPROVAL_NOT_FOUND: "APPROVAL_NOT_FOUND"; /** Gateway service or required backend is temporarily unavailable. */
  readonly UNAVAILABLE: "UNAVAILABLE";
};
/** Closed set of canonical gateway error code strings. */
type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
/** Stable discriminants for structured method-level failures. */
declare const GatewayErrorDetailCodes: {
  readonly MISSING_SCOPE: "MISSING_SCOPE";
  readonly MCP_APP_VIEW_EXPIRED: "MCP_APP_VIEW_EXPIRED";
  readonly SESSION_COMPANION_BUSY: "SESSION_COMPANION_BUSY";
  readonly UNKNOWN_AGENT_ID: "UNKNOWN_AGENT_ID";
  readonly WIZARD_NOT_FOUND: "WIZARD_NOT_FOUND";
};
/** Missing operator-scope details shared by WebSocket and HTTP responses. */
type MissingScopeErrorDetails = {
  code: typeof GatewayErrorDetailCodes.MISSING_SCOPE;
  missingScope: string;
  requiredScopes: string[];
};
type McpAppViewExpiredErrorDetails = {
  code: typeof GatewayErrorDetailCodes.MCP_APP_VIEW_EXPIRED;
};
/** Unknown agent details carried by agent-scoped method validation failures. */
type UnknownAgentIdErrorDetails = {
  code: typeof GatewayErrorDetailCodes.UNKNOWN_AGENT_ID;
  agentId: string;
};
/** Missing or expired process-local setup wizard session. */
type WizardNotFoundErrorDetails = {
  code: typeof GatewayErrorDetailCodes.WIZARD_NOT_FOUND;
};
/** Structured details emitted by method-level failures. */
type GatewayErrorDetails = MissingScopeErrorDetails | McpAppViewExpiredErrorDetails | UnknownAgentIdErrorDetails | WizardNotFoundErrorDetails;
/** Reads validated missing-scope details from an untrusted protocol payload. */
declare function readMissingScopeErrorDetails(details: unknown): MissingScopeErrorDetails | null;
declare function isMcpAppViewExpiredError(error: unknown): boolean;
/**
 * Reads a method-level missing-scope failure, preferring structured details.
 * The message fallback keeps clients compatible with gateways predating structured details.
 */
declare function readMissingScopeError(error: unknown): MissingScopeErrorDetails | null;
//#endregion
export { McpAppViewExpiredErrorDetails as a, WizardNotFoundErrorDetails as c, readMissingScopeErrorDetails as d, GatewayErrorDetails as i, isMcpAppViewExpiredError as l, ErrorCodes as n, MissingScopeErrorDetails as o, GatewayErrorDetailCodes as r, UnknownAgentIdErrorDetails as s, ErrorCode as t, readMissingScopeError as u };