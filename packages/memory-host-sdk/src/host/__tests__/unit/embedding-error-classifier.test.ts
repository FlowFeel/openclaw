import { describe, expect, it } from "vitest";
import {
  classifyEmbeddingError,
  EmbeddingProviderUnreachableError,
} from "../../embedding-error-classifier.js";

describe("Tier 1 Unit: classifyEmbeddingError", () => {
  it("classifies ECONNREFUSED as terminal unreachable error", () => {
    const error = new Error("connect ECONNREFUSED 127.0.0.1:11434");
    (error as { code?: string }).code = "ECONNREFUSED";

    const result = classifyEmbeddingError(error);
    expect(result.kind).toBe("TERMINAL_UNREACHABLE");
    expect(result.isTerminal).toBe(true);
    expect(result.code).toBe("ECONNREFUSED");
  });

  it("classifies ENOTFOUND and ETIMEDOUT as terminal unreachable errors", () => {
    const notFound = new Error("getaddrinfo ENOTFOUND ollama.internal");
    expect(classifyEmbeddingError(notFound).isTerminal).toBe(true);

    const timedOut = new Error("connect ETIMEDOUT 10.0.0.12:11434");
    expect(classifyEmbeddingError(timedOut).isTerminal).toBe(true);
  });

  it("classifies rate limit errors as transient", () => {
    const rateLimit = new Error("HTTP 429 Too Many Requests: Rate limit exceeded");
    const result = classifyEmbeddingError(rateLimit);
    expect(result.kind).toBe("TRANSIENT_RATE_LIMIT");
    expect(result.isTerminal).toBe(false);
  });

  it("classifies generic errors as malformed payload", () => {
    const generic = new Error("Invalid json token at position 0");
    const result = classifyEmbeddingError(generic);
    expect(result.kind).toBe("MALFORMED_PAYLOAD");
    expect(result.isTerminal).toBe(false);
  });

  it("instantiates EmbeddingProviderUnreachableError with correct properties", () => {
    const err = new EmbeddingProviderUnreachableError("connection refused", "ECONNREFUSED");
    expect(err.name).toBe("EmbeddingProviderUnreachableError");
    expect(err.code).toBe("ECONNREFUSED");
    expect(err.isTerminal).toBe(true);
    expect(err.message).toContain("ECONNREFUSED");
  });
});
