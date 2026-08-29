import { describe, expect, it, vi } from "vitest";
import { resolveTelegramSendThreadSpec } from "./reply-parameters.js";
import {
  GLOBAL_CARE_PACKAGE_SENT_KEYS,
  handleTopicCreatedCarePackageDrop,
} from "./care-package-telegram-deliverer.js";

describe("CAP-77081-05: Topic Routing & Bot API Topic-Create Parity", () => {
  describe("H1: Explicit topic target precedence over sourceReplyRoute", () => {
    it("prefer explicit targetMessageThreadId over messageThreadId from sourceReplyRoute", () => {
      const spec = resolveTelegramSendThreadSpec({
        targetMessageThreadId: 3102, // Explicit target: "-1004328838138:topic:3102"
        messageThreadId: 1,         // From reply chain / sourceReplyRoute
        chatType: "group",
      });

      expect(spec).toBeDefined();
      expect(spec?.id).toBe(3102); // 3102 MUST WIN OVER 1
    });

    it("fallback to messageThreadId when no explicit targetMessageThreadId is set", () => {
      const spec = resolveTelegramSendThreadSpec({
        targetMessageThreadId: undefined,
        messageThreadId: 100,
        chatType: "group",
      });

      expect(spec).toBeDefined();
      expect(spec?.id).toBe(100);
    });
  });

  describe("H2: Bot API topic creation fires Care Package drop and deduplicates", () => {
    it("delivers Care Package on topic creation and prevents duplicate drops", async () => {
      const testSentKeys = new Set<string>();
      const sendMessage = vi.fn().mockResolvedValue(undefined);

      const deliveredFirst = await handleTopicCreatedCarePackageDrop(
        {
          chatId: "-1004328838138",
          topicId: 3102,
          topicTitle: "Architecture Forum",
          groupTitle: "Inferno Labs",
          ownerName: "gridclaw",
        },
        { enabled: true },
        {
          sentKeysSet: testSentKeys,
          sendMessage,
        },
      );

      expect(deliveredFirst).toBe(true);
      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith(
        "-1004328838138",
        expect.stringContaining("Architecture Forum"),
        { threadId: 3102 },
      );

      // Subsequent call (e.g. from native forum_topic_created service message) must be deduplicated
      const deliveredSecond = await handleTopicCreatedCarePackageDrop(
        {
          chatId: "-1004328838138",
          topicId: 3102,
          topicTitle: "Architecture Forum",
          groupTitle: "Inferno Labs",
          ownerName: "gridclaw",
        },
        { enabled: true },
        {
          sentKeysSet: testSentKeys,
          sendMessage,
        },
      );

      expect(deliveredSecond).toBe(false);
      expect(sendMessage).toHaveBeenCalledTimes(1); // 0 double drops
    });
  });
});
