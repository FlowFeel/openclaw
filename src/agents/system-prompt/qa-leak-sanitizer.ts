/**
 * Pure Model Identity & Sender Sanitizer (QA & Provenance Leak Purge).
 * Goldilocks decomposition unit (< 60 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 */

export const MODEL_IDENTITY_PREFIX = "Current model identity:";

export function buildModelIdentityPromptLine(model?: string): string | undefined {
  const trimmed = model?.trim();
  if (!trimmed) {
    return undefined;
  }
  // P0 fix: Delete the QA test artifact suffix ("Model question: answer this current-run value.")
  return `${MODEL_IDENTITY_PREFIX} ${trimmed}.`;
}

export function buildUserIdentitySection(ownerLine: string | undefined, isMinimal: boolean): string[] {
  if (!ownerLine || isMinimal) {
    return [];
  }
  return ["## Authorized Senders", ownerLine, ""];
}
