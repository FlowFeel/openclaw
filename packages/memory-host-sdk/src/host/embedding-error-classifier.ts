/**
 * Deterministic Network Error Classifier for Embedding Backends.
 * Goldilocks decomposition unit (< 80 LOC).
 * 
 * @dft:axiom A1 (Plane Separation)
 */

export type EmbeddingErrorKind = "TERMINAL_UNREACHABLE" | "TRANSIENT_RATE_LIMIT" | "MALFORMED_PAYLOAD";

const UNREACHABLE_SOCKET_CODES = new Set([
  "ECONNREFUSED",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EHOSTUNREACH",
  "EAI_AGAIN",
  "ECONNRESET",
]);

export class EmbeddingProviderUnreachableError extends Error {
  public readonly code: string;
  public readonly isTerminal = true;

  constructor(message: string, code = "ECONNREFUSED") {
    super(`Embedding provider unreachable [${code}]: ${message}`);
    this.name = "EmbeddingProviderUnreachableError";
    this.code = code;
  }
}

/**
 * Classifies an unknown error from an embedding fetch into a deterministic category.
 */
export function classifyEmbeddingError(error: unknown): {
  kind: EmbeddingErrorKind;
  isTerminal: boolean;
  code: string;
  message: string;
} {
  const message = error instanceof Error ? error.message : String(error);
  const code = (error as { code?: string })?.code ?? (error as { cause?: { code?: string } })?.cause?.code ?? "UNKNOWN";

  if (UNREACHABLE_SOCKET_CODES.has(code) || /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|fetch failed/i.test(message)) {
    return {
      kind: "TERMINAL_UNREACHABLE",
      isTerminal: true,
      code: code !== "UNKNOWN" ? code : "ECONNREFUSED",
      message,
    };
  }

  if (/rate limit|429|too many requests|overloaded/i.test(message)) {
    return {
      kind: "TRANSIENT_RATE_LIMIT",
      isTerminal: false,
      code: "RATE_LIMIT",
      message,
    };
  }

  return {
    kind: "MALFORMED_PAYLOAD",
    isTerminal: false,
    code,
    message,
  };
}
