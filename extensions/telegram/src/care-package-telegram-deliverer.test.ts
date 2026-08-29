/**
 * Contract test suite for Telegram Care Package Deliverer Boundary (Axiom A2).
 */

import { describe, expect, it, vi } from "vitest";
import {
  handleTopicCreatedCarePackageDrop,
  type CarePackageDeliveryInput,
} from "./care-package-telegram-deliverer.js";

describe("Telegram Care Package Deliverer (Axiom A2 Boundary)", () => {
  it("dispatches orientation drop on new topic creation when enabled", async () => {
    const sentKeysSet = new Set<string>();
    const sendMessage = vi.fn().mockResolvedValue(undefined);

    const input: CarePackageDeliveryInput = {
      chatId: "-100888",
      topicId: 42,
      topicTitle: "Deploy Pipeline",
      groupTitle: "Ops Team",
      ownerName: "edphillips",
      timestampIso: "2026-08-29T10:00:00Z",
    };

    const delivered = await handleTopicCreatedCarePackageDrop(
      input,
      { enabled: true },
      { sentKeysSet, sendMessage },
    );

    expect(delivered).toBe(true);
    expect(sendMessage).toHaveBeenCalledOnce();
    expect(sendMessage).toHaveBeenCalledWith(
      "-100888",
      expect.stringContaining("Deploy Pipeline"),
      { threadId: 42 },
    );
    expect(sentKeysSet.has("topic:care_package:sent:-100888:42")).toBe(true);
  });

  it("is strictly idempotent and skips delivery if already sent or disabled", async () => {
    const sentKeysSet = new Set<string>();
    const sendMessage = vi.fn().mockResolvedValue(undefined);

    const input: CarePackageDeliveryInput = {
      chatId: "-100888",
      topicId: 42,
      topicTitle: "Deploy Pipeline",
    };

    // Disabled -> No delivery
    let delivered = await handleTopicCreatedCarePackageDrop(
      input,
      { enabled: false },
      { sentKeysSet, sendMessage },
    );
    expect(delivered).toBe(false);
    expect(sendMessage).not.toHaveBeenCalled();

    // First delivery when enabled
    delivered = await handleTopicCreatedCarePackageDrop(
      input,
      { enabled: true },
      { sentKeysSet, sendMessage },
    );
    expect(delivered).toBe(true);
    expect(sendMessage).toHaveBeenCalledOnce();

    // Second delivery -> Idempotent skip
    delivered = await handleTopicCreatedCarePackageDrop(
      input,
      { enabled: true },
      { sentKeysSet, sendMessage },
    );
    expect(delivered).toBe(false);
    expect(sendMessage).toHaveBeenCalledOnce();
  });
});
