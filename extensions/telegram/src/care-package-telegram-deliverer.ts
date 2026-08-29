/**
 * Telegram Outbound Care Package Deliverer.
 *
 * @dft
 * - Axiom A2: Isolated Telegram API delivery boundary & idempotency state manager.
 */

import {
  buildTopicCarePackageKey,
  shouldDeliverCarePackage,
} from "../../../src/infra/topic-projection/care-package-idempotency.js";
import { renderCarePackageTemplate } from "../../../src/infra/topic-projection/care-package-template-loader.js";

export interface CarePackageDeliveryInput {
  readonly chatId: string | number;
  readonly topicId: string | number;
  readonly topicTitle: string;
  readonly groupTitle?: string;
  readonly ownerName?: string;
  readonly timestampIso?: string;
}

export interface CarePackageDeliveryOptions {
  readonly enabled?: boolean;
  readonly templatePath?: string;
  readonly renderAtTopicCreate?: boolean;
}

export const GLOBAL_CARE_PACKAGE_SENT_KEYS = new Set<string>();

export interface CarePackageDeliveryDeps {
  readonly sentKeysSet?: Set<string>;
  readonly sendMessage: (chatId: string | number, text: string, options: { threadId: number }) => Promise<void>;
  readonly workspaceRoot?: string;
}

/**
 * Handles inbound topic creation events and dispatches the orientation drop if enabled & not yet delivered.
 */
export async function handleTopicCreatedCarePackageDrop(
  input: CarePackageDeliveryInput,
  options: CarePackageDeliveryOptions,
  deps: CarePackageDeliveryDeps,
): Promise<boolean> {
  const sentKeysSet = deps.sentKeysSet ?? GLOBAL_CARE_PACKAGE_SENT_KEYS;
  const isEnabled = options.enabled === true && options.renderAtTopicCreate !== false;
  if (!shouldDeliverCarePackage(sentKeysSet, input.chatId, input.topicId, isEnabled)) {
    return false;
  }

  const topicIdNum = typeof input.topicId === "number" ? input.topicId : Number.parseInt(String(input.topicId), 10);
  if (Number.isNaN(topicIdNum) || topicIdNum <= 0) {
    return false;
  }

  const renderedCard = await renderCarePackageTemplate(
    {
      topic_title: input.topicTitle,
      topic_id: input.topicId,
      group: input.groupTitle ?? String(input.chatId),
      owner: input.ownerName ?? "System",
      timestamp: input.timestampIso ?? new Date().toISOString(),
    },
    {
      workspaceRoot: deps.workspaceRoot,
      templatePath: options.templatePath,
    },
  );

  const idempotencyKey = buildTopicCarePackageKey(input.chatId, input.topicId);
  sentKeysSet.add(idempotencyKey);

  await deps.sendMessage(input.chatId, renderedCard, { threadId: topicIdNum });
  return true;
}
