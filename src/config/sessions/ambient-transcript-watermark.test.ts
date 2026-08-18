import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  readAmbientTranscriptWatermark,
  resolveAmbientTranscriptWatermarkKey,
  resolveAmbientTranscriptWatermarkLegacyKey,
  updateAmbientTranscriptWatermark,
} from "./ambient-transcript-watermark.js";
import { loadSessionEntry, replaceSessionEntry } from "./session-accessor.js";

describe("ambient transcript watermark", () => {
  let tempDir: string;
  let storePath: string;
  const sessionKey = "agent:main:telegram:group:-100123";
  const key = resolveAmbientTranscriptWatermarkKey({
    channel: "telegram",
    accountId: "default",
    conversationId: "-100123",
  });

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-ambient-watermark-"));
    storePath = path.join(tempDir, "sessions.json");
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("stamps and resolves the watermark for the current session id only", async () => {
    await replaceSessionEntry(
      { sessionKey, storePath },
      { sessionId: "before-reset", updatedAt: 1_700_000_000_000 },
    );

    await updateAmbientTranscriptWatermark({
      storePath,
      sessionKey,
      key,
      messageId: "11",
      timestampMs: 1_700_000_001_000,
    });

    const persistedEntry = loadSessionEntry({ sessionKey, storePath });
    if (!persistedEntry) {
      throw new Error("Expected persisted session entry");
    }
    expect(persistedEntry?.ambientTranscriptWatermarks?.[key]).toMatchObject({
      sessionId: "before-reset",
      messageId: "11",
      timestampMs: 1_700_000_001_000,
    });
    expect(readAmbientTranscriptWatermark(persistedEntry, key)).toMatchObject({
      sessionId: "before-reset",
      messageId: "11",
    });

    await replaceSessionEntry(
      { sessionKey, storePath },
      {
        ...persistedEntry,
        sessionId: "after-reset",
        updatedAt: 1_700_000_002_000,
      },
    );

    const resetEntry = loadSessionEntry({ sessionKey, storePath });
    expect(readAmbientTranscriptWatermark(resetEntry, key)).toBeUndefined();

    await updateAmbientTranscriptWatermark({
      storePath,
      sessionKey,
      key,
      messageId: "12",
      timestampMs: 1_700_000_002_000,
      expectedSessionId: "before-reset",
    });

    expect(
      readAmbientTranscriptWatermark(loadSessionEntry({ sessionKey, storePath }), key),
    ).toBeUndefined();

    await updateAmbientTranscriptWatermark({
      storePath,
      sessionKey,
      key,
      messageId: "12",
      timestampMs: 1_700_000_002_000,
      expectedSessionId: "after-reset",
    });

    expect(
      readAmbientTranscriptWatermark(loadSessionEntry({ sessionKey, storePath }), key),
    ).toMatchObject({
      sessionId: "after-reset",
      messageId: "12",
    });
  });

  it("ignores legacy watermarks without a session id", () => {
    fs.writeFileSync(
      storePath,
      JSON.stringify({
        [sessionKey]: {
          sessionId: "current-session",
          updatedAt: 1_700_000_000_000,
          ambientTranscriptWatermarks: {
            [key]: {
              messageId: "11",
              timestampMs: 1_700_000_001_000,
              updatedAt: 1_700_000_002_000,
            },
          },
        },
      }),
      "utf-8",
    );

    expect(
      readAmbientTranscriptWatermark(loadSessionEntry({ sessionKey, storePath }), key),
    ).toBeUndefined();
  });

  it("resolves a stable, human-readable ':'-joined key (SL-14)", () => {
    const structured = resolveAmbientTranscriptWatermarkKey({
      channel: "telegram",
      accountId: "default",
      conversationId: "-1004328838138",
    });
    expect(structured).toBe("wat:telegram:default:-1004328838138:");

    const threaded = resolveAmbientTranscriptWatermarkKey({
      channel: "telegram",
      accountId: "default",
      conversationId: "-1004328838138",
      threadId: 287,
    });
    expect(threaded).toBe("wat:telegram:default:-1004328838138:287");

    const accountless = resolveAmbientTranscriptWatermarkKey({
      channel: "telegram",
      conversationId: "-1004328838138",
    });
    expect(accountless).toBe("wat:telegram::-1004328838138:");
  });

  it("derives the legacy JSON composite key (pre-SL-14)", () => {
    expect(
      resolveAmbientTranscriptWatermarkLegacyKey({
        channel: "telegram",
        accountId: "default",
        conversationId: "-100123",
      }),
    ).toBe('["telegram","default","-100123",""]');
  });

  it("migrates: honors a pre-SL-14 watermark under the legacy key until overwritten", async () => {
    const legacyKey = resolveAmbientTranscriptWatermarkLegacyKey({
      channel: "telegram",
      accountId: "default",
      conversationId: "-100123",
    });
    // Seed a legacy-format watermark directly (as written by an old build).
    await replaceSessionEntry(
      { sessionKey, storePath },
      {
        sessionId: "before-reset",
        updatedAt: 1_700_000_000_000,
        ambientTranscriptWatermarks: {
          [legacyKey]: {
            sessionId: "before-reset",
            messageId: "9",
            timestampMs: 1_700_000_000_000,
            updatedAt: 1_700_000_000_000,
          },
        },
      },
    );
    const persisted = loadSessionEntry({ sessionKey, storePath });
    if (!persisted) {
      throw new Error("expected persisted entry");
    }
    // New-structure read falls back to the legacy watermark via legacyKey.
    expect(readAmbientTranscriptWatermark(persisted, key, legacyKey)).toMatchObject({
      sessionId: "before-reset",
      messageId: "9",
    });
    // Without legacyKey, the new key has no watermark yet.
    expect(readAmbientTranscriptWatermark(persisted, key)).toBeUndefined();
  });

  it("advanced to the new key: writes under the new key, legacy read ignored once present", async () => {
    await replaceSessionEntry(
      { sessionKey, storePath },
      { sessionId: "session-current", updatedAt: 1_700_000_000_000 },
    );
    const legacyKey = resolveAmbientTranscriptWatermarkLegacyKey({
      channel: "telegram",
      accountId: "default",
      conversationId: "-100123",
    });
    await updateAmbientTranscriptWatermark({
      storePath,
      sessionKey,
      key,
      legacyKey,
      messageId: "11",
      timestampMs: 1_700_000_001_000,
    });
    const persisted = loadSessionEntry({ sessionKey, storePath });
    if (!persisted) {
      throw new Error("expected persisted entry");
    }
    // New value stored under the structured key.
    expect(persisted.ambientTranscriptWatermarks?.[key]).toMatchObject({
      messageId: "11",
    });
    // Resolution prefers the new key.
    expect(readAmbientTranscriptWatermark(persisted, key, legacyKey)).toMatchObject({
      messageId: "11",
    });
  });
});
