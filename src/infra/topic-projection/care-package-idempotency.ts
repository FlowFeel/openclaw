/**
 * Pure Topic Care Package Idempotency Decision Core.
 *
 * @dft
 * - Axiom A1: Zero I/O, pure key construction and set membership math.
 */

/**
 * Builds a unique, canonical key for topic care package delivery tracking.
 */
export function buildTopicCarePackageKey(
  chatId: string | number,
  topicId: string | number,
): string {
  return `topic:care_package:sent:${String(chatId)}:${String(topicId)}`;
}

/**
 * Evaluates whether a care package orientation drop should be delivered.
 */
export function shouldDeliverCarePackage(
  sentKeysSet: ReadonlySet<string>,
  chatId: string | number,
  topicId: string | number,
  isEnabled: boolean = false,
): boolean {
  if (!isEnabled) {
    return false;
  }
  const key = buildTopicCarePackageKey(chatId, topicId);
  return !sentKeysSet.has(key);
}
