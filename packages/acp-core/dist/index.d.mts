import { readBool, readNonNegativeInteger, readNumber, readString } from "./meta.mjs";
import { isParentOwnedBackgroundAcpSession, isRequesterParentOfBackgroundAcpSession } from "./session-interaction-mode.mjs";
import { AcpSessionLineageMeta, AcpSessionLineageRow, toAcpSessionLineageMeta } from "./session-lineage-meta.mjs";
import { AcpProvenanceMode, AcpServerOptions, AcpSession, AcpSessionRuntimeOptions, SessionAcpIdentity, SessionAcpIdentitySource, SessionAcpIdentityState, SessionAcpMeta, SessionId, normalizeAcpProvenanceMode } from "./types.mjs";
import { AcpSessionStore, createInMemorySessionStore, defaultAcpSessionStore } from "./session.mjs";
import { ACP_ERROR_CODES, AcpRuntimeError, AcpRuntimeErrorCode, formatAcpErrorChain, isAcpRuntimeError, toAcpRuntimeError, withAcpRuntimeErrorBoundary } from "./runtime/errors.mjs";
import { formatAcpRuntimeErrorText, toAcpRuntimeErrorText } from "./runtime/error-text.mjs";
import { ACP_SESSION_IDENTITY_RENDERER_VERSION, AcpSessionIdentifierRenderMode, resolveAcpSessionCwd, resolveAcpSessionIdentifierLinesFromIdentity, resolveAcpThreadSessionDetailLines } from "./runtime/session-identifiers.mjs";
import { AcpRuntime, AcpRuntimeCapabilities, AcpRuntimeControl, AcpRuntimeDoctorReport, AcpRuntimeEnsureInput, AcpRuntimeEvent, AcpRuntimeHandle, AcpRuntimePromptMode, AcpRuntimeSessionMode, AcpRuntimeStatus, AcpRuntimeTurn, AcpRuntimeTurnAttachment, AcpRuntimeTurnInput, AcpRuntimeTurnResult, AcpRuntimeTurnResultError, AcpSessionUpdateTag } from "./runtime/types.mjs";
import { createIdentityFromEnsure, createIdentityFromHandleEvent, createIdentityFromStatus, identityEquals, identityHasStableSessionId, isSessionIdentityPending, mergeSessionIdentity, resolveRuntimeHandleIdentifiersFromIdentity, resolveRuntimeResumeSessionId, resolveSessionIdentityFromMeta } from "./runtime/session-identity.mjs";

//#region packages/normalization-core/src/error-coercion.d.ts
/** Renders a non-Error cause as useful text without throwing. */
declare function stringifyNonErrorCause(value: unknown): string;
//#endregion
//#region packages/acp-core/src/error-format.d.ts
/** Installs a host-provided redactor used before ACP fallback secret-pattern redaction. */
declare function configureAcpErrorRedactor(redactor: ((value: string) => string) | undefined): void;
/** Redacts common provider, GitHub, HTTP, payment, bot, and private-key secrets from error text. */
declare function redactSensitiveText(value: string): string;
//#endregion
//#region packages/acp-core/src/structured-auth-redaction.d.ts
declare const HTTP_AUTH_SCHEME_PATTERN = "[A-Za-z0-9!#$%&'*+.^_`|~-]+";
declare const HTTP_AUTH_OPAQUE_CREDENTIAL_PATTERN: string;
declare const HTTP_AUTH_OPTIONAL_VALUE_WHITESPACE_PATTERN: string;
declare const HTTP_AUTH_REQUIRED_VALUE_WHITESPACE_PATTERN: string;
declare const HTTP_AUTH_LEGACY_VALUE_WHITESPACE_PATTERN: string;
declare const HTTP_AUTH_HEADER_BOUNDARY_PATTERN: string;
declare const HTTP_AUTH_SERIALIZED_QUOTE_PATTERN: string;
declare const CREDENTIAL_STYLE_HEADER_REDACT_PATTERN: string;
type StructuredAuthParamRange = {
  start: number;
  end: number;
};
declare function findStructuredAuthParamRanges(value: string): StructuredAuthParamRange[];
declare function redactStructuredAuthHeaders(value: string, replacement: string): string;
//#endregion
export { ACP_ERROR_CODES, ACP_SESSION_IDENTITY_RENDERER_VERSION, AcpProvenanceMode, AcpRuntime, AcpRuntimeCapabilities, AcpRuntimeControl, AcpRuntimeDoctorReport, AcpRuntimeEnsureInput, AcpRuntimeError, AcpRuntimeErrorCode, AcpRuntimeEvent, AcpRuntimeHandle, AcpRuntimePromptMode, AcpRuntimeSessionMode, AcpRuntimeStatus, AcpRuntimeTurn, AcpRuntimeTurnAttachment, AcpRuntimeTurnInput, AcpRuntimeTurnResult, AcpRuntimeTurnResultError, AcpServerOptions, AcpSession, AcpSessionIdentifierRenderMode, AcpSessionLineageMeta, AcpSessionLineageRow, AcpSessionRuntimeOptions, AcpSessionStore, AcpSessionUpdateTag, CREDENTIAL_STYLE_HEADER_REDACT_PATTERN, HTTP_AUTH_HEADER_BOUNDARY_PATTERN, HTTP_AUTH_LEGACY_VALUE_WHITESPACE_PATTERN, HTTP_AUTH_OPAQUE_CREDENTIAL_PATTERN, HTTP_AUTH_OPTIONAL_VALUE_WHITESPACE_PATTERN, HTTP_AUTH_REQUIRED_VALUE_WHITESPACE_PATTERN, HTTP_AUTH_SCHEME_PATTERN, HTTP_AUTH_SERIALIZED_QUOTE_PATTERN, SessionAcpIdentity, SessionAcpIdentitySource, SessionAcpIdentityState, SessionAcpMeta, SessionId, StructuredAuthParamRange, configureAcpErrorRedactor, createIdentityFromEnsure, createIdentityFromHandleEvent, createIdentityFromStatus, createInMemorySessionStore, defaultAcpSessionStore, findStructuredAuthParamRanges, formatAcpErrorChain, formatAcpRuntimeErrorText, identityEquals, identityHasStableSessionId, isAcpRuntimeError, isParentOwnedBackgroundAcpSession, isRequesterParentOfBackgroundAcpSession, isSessionIdentityPending, mergeSessionIdentity, normalizeAcpProvenanceMode, readBool, readNonNegativeInteger, readNumber, readString, redactSensitiveText, redactStructuredAuthHeaders, resolveAcpSessionCwd, resolveAcpSessionIdentifierLinesFromIdentity, resolveAcpThreadSessionDetailLines, resolveRuntimeHandleIdentifiersFromIdentity, resolveRuntimeResumeSessionId, resolveSessionIdentityFromMeta, stringifyNonErrorCause, toAcpRuntimeError, toAcpRuntimeErrorText, toAcpSessionLineageMeta, withAcpRuntimeErrorBoundary };