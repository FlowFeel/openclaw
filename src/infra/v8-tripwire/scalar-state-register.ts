/**
 * @dft:axiom V8.2 (Compact Scalar Register <= 6 Tokens Invariance)
 * 
 * Formats a single static 4-tuple fixed at the prompt root:
 * Slot_0 = [B: b | D: d | S: s]
 * 
 * Where:
 * - b is remaining token budget percentage (0-100)
 * - d is current turn tool call depth (0-12)
 * - s is state bitflags (0-255)
 */

export interface ScalarStateFlags {
  readonly isDegradedSNR?: boolean; // 0x01
  readonly isCircuitWarning?: boolean; // 0x02
  readonly isCacheAffinity?: boolean; // 0x04
  readonly isCompactionPending?: boolean; // 0x08
}

export interface ScalarStateParams {
  readonly budgetPercent: number;
  readonly callDepth: number;
  readonly flags?: ScalarStateFlags | number;
}

export function encodeScalarStateFlags(flags?: ScalarStateFlags | number): number {
  if (typeof flags === "number") {
    return flags & 0xff;
  }
  if (!flags) {
    return 0;
  }
  let mask = 0;
  if (flags.isDegradedSNR) mask |= 0x01;
  if (flags.isCircuitWarning) mask |= 0x02;
  if (flags.isCacheAffinity) mask |= 0x04;
  if (flags.isCompactionPending) mask |= 0x08;
  return mask;
}

export function formatScalarStateRegister(params: ScalarStateParams): string {
  const b = Math.max(0, Math.min(100, Math.round(params.budgetPercent)));
  const d = Math.max(0, Math.min(99, Math.round(params.callDepth)));
  const s = encodeScalarStateFlags(params.flags);

  return `[B: ${b} | D: ${d} | S: ${s}]`;
}

export function parseScalarStateRegister(header: string): ScalarStateParams | null {
  const match = header.match(/\[B:\s*(\d+)\s*\|\s*D:\s*(\d+)\s*\|\s*S:\s*(\d+)\]/);
  if (!match) {
    return null;
  }
  return {
    budgetPercent: parseInt(match[1], 10),
    callDepth: parseInt(match[2], 10),
    flags: parseInt(match[3], 10),
  };
}
