/**
 * @dft:axiom V8.4 (Deterministic Tool Signature Halt Invariance)
 * 
 * Computes canonical, key-sorted 32-bit hashes over tool invocations.
 * Maintains a bounded depth-k LIFO stack (k <= 4).
 * Halts execution immediately if an identical tool signature repeats within k steps.
 */

export interface ToolInvocationSignature {
  readonly toolName: string;
  readonly paramsHash: number;
  readonly canonicalSignature: string;
  readonly timestamp: number;
}

export interface ToolHaltResult {
  readonly shouldHalt: boolean;
  readonly reason?: string;
  readonly duplicateSignature?: string;
  readonly depth: number;
}

/**
 * 32-bit FNV-1a hash over canonical UTF-8 string.
 */
export function fnv1a32(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Deterministically sorts object keys and serializes scalar parameters.
 */
export function canonicalizeParams(params: unknown): string {
  if (params === null || params === undefined) {
    return "";
  }
  if (typeof params !== "object") {
    return String(params);
  }
  if (Array.isArray(params)) {
    return "[" + params.map(canonicalizeParams).join(",") + "]";
  }

  const obj = params as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  const entries: string[] = [];
  for (const k of keys) {
    const val = obj[k];
    if (val !== undefined) {
      entries.push(`${k}:${canonicalizeParams(val)}`);
    }
  }
  return "{" + entries.join(",") + "}";
}

export class ToolFingerprintStack {
  private readonly maxDepth: number;
  private readonly stack: ToolInvocationSignature[] = [];

  constructor(maxDepth: number = 4) {
    this.maxDepth = Math.max(2, Math.min(10, maxDepth));
  }

  public reset(): void {
    this.stack.length = 0;
  }

  /**
   * Pushes a tool invocation and checks for duplicate signatures within depth k.
   */
  public pushAndCheckHalt(toolName: string, params: unknown): ToolHaltResult {
    const canonical = canonicalizeParams(params);
    const paramsHash = fnv1a32(canonical);
    const signatureHex = `0x${paramsHash.toString(16).padStart(8, "0")}`;
    const canonicalSignature = `${toolName}:${signatureHex}`;
    const now = Date.now();

    // Check if identical signature exists in the active stack
    const duplicate = this.stack.find((item) => item.canonicalSignature === canonicalSignature);

    if (duplicate) {
      return {
        shouldHalt: true,
        reason: "duplicate_tool_signature_halt",
        duplicateSignature: canonicalSignature,
        depth: this.stack.length + 1,
      };
    }

    // Push into bounded ring
    this.stack.push({
      toolName,
      paramsHash,
      canonicalSignature,
      timestamp: now,
    });

    if (this.stack.length > this.maxDepth) {
      this.stack.shift();
    }

    return {
      shouldHalt: false,
      depth: this.stack.length,
    };
  }

  public getDepth(): number {
    return this.stack.length;
  }

  public getSignatures(): readonly ToolInvocationSignature[] {
    return this.stack;
  }
}
