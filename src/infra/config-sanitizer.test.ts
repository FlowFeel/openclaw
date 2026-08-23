import { describe, expect, it } from "vitest";
import { sanitizeConfigForProbe } from "./config-sanitizer.js";

describe("sanitizeConfigForProbe (Pure DFT Verifier)", () => {
  it("passes primitive values unchanged", () => {
    expect(sanitizeConfigForProbe(42)).toBe(42);
    expect(sanitizeConfigForProbe("hello")).toBe("hello");
    expect(sanitizeConfigForProbe(true)).toBe(true);
    expect(sanitizeConfigForProbe(null)).toBe(null);
    expect(sanitizeConfigForProbe(undefined)).toBe(undefined);
  });

  it("redacts secret keys in top-level objects", () => {
    const raw = {
      channel: "telegram",
      telegramBotToken: "123456:ABC-DEF1234ghIkl",
      anthropicApiKey: "sk-ant-api03-secret12345",
      databasePassword: "my_db_password_99",
      activeModel: "claude-3-5-sonnet",
      concurrencyLimit: 4,
    };

    const sanitized = sanitizeConfigForProbe(raw);
    expect(sanitized).toEqual({
      channel: "telegram",
      telegramBotToken: "[REDACTED]",
      anthropicApiKey: "[REDACTED]",
      databasePassword: "[REDACTED]",
      activeModel: "claude-3-5-sonnet",
      concurrencyLimit: 4,
    });
  });

  it("redacts nested secrets across objects and arrays", () => {
    const raw = {
      models: {
        providers: [
          {
            name: "anthropic",
            apiKey: "sk-ant-12345",
            baseUrl: "https://api.anthropic.com",
          },
          {
            name: "custom",
            authHeader: "Bearer eyJhbGciOi...",
            webhookEndpoint: "https://hook.example.com/secret",
          },
        ],
      },
      tls: {
        privateKeyPath: "/etc/certs/private.key",
        certificate: "BEGIN CERTIFICATE...",
      },
    };

    const sanitized = sanitizeConfigForProbe(raw);
    expect(sanitized.models.providers[0]?.apiKey).toBe("[REDACTED]");
    expect(sanitized.models.providers[0]?.baseUrl).toBe("https://api.anthropic.com");
    expect(sanitized.models.providers[1]?.authHeader).toBe("[REDACTED]");
    expect(sanitized.models.providers[1]?.webhookEndpoint).toBe("[REDACTED]");
    expect(sanitized.tls.privateKeyPath).toBe("[REDACTED]");
    expect(sanitized.tls.certificate).toBe("[REDACTED]");
  });

  it("handles circular references gracefully without stack overflow", () => {
    const obj: Record<string, unknown> = { name: "gateway" };
    obj.self = obj;

    const sanitized = sanitizeConfigForProbe(obj);
    expect(sanitized.name).toBe("gateway");
    expect(sanitized.self).toBe("[CIRCULAR]");
  });
});
