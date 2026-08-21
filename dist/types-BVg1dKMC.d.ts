//#region src/agents/embedded-agent-helpers/types.d.ts
/** Closed reason codes used by model failover and retry classification. */
type FailoverReason = "auth" | "auth_permanent" | "format" | "rate_limit" | "overloaded" | "billing" | "server_error" | "timeout" | "tls_certificate" | "context_overflow" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | "unknown";
//#endregion
export { FailoverReason as t };