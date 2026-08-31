/**
 * @dft:axiom V8.3 (O(1) Token-ID Rolling Hash Tripwire Invariance)
 * 
 * Computes a 64-bit Rabin-Karp rolling hash over raw integer token IDs.
 * Utilizes a flat 64 KB bitset collision table to detect generative loops
 * and repeating sequences in O(1) time without dynamic heap allocation.
 */

export interface TokenHasherConfig {
  readonly windowSize?: number; // default: 16
  readonly bitsetSizeBytes?: number; // default: 65536 (64 KB)
  readonly primeBase?: bigint; // default: 31337n
}

export class RabinKarpTokenHasher {
  private readonly windowSize: number;
  private readonly bitset: Uint8Array;
  private readonly bitmask: number;
  private readonly primeBase: bigint;
  private readonly windowBuffer: Int32Array;
  private windowIndex: number = 0;
  private windowCount: number = 0;
  private currentHash: bigint = 0n;
  private basePower: bigint = 1n;
  private totalTokens: number = 0;

  constructor(config: TokenHasherConfig = {}) {
    this.windowSize = Math.max(4, Math.min(128, config.windowSize ?? 16));
    const bitsetSize = config.bitsetSizeBytes ?? 65536;
    this.bitset = new Uint8Array(bitsetSize);
    this.bitmask = bitsetSize * 8 - 1;
    this.primeBase = config.primeBase ?? 31337n;
    this.windowBuffer = new Int32Array(this.windowSize);

    // Precalculate (primeBase ^ (windowSize - 1))
    let power = 1n;
    for (let i = 0; i < this.windowSize - 1; i++) {
      power = (power * this.primeBase) & 0xffffffffffffffffn;
    }
    this.basePower = power;
  }

  /**
   * Resets internal bitset and rolling window for a new generation turn.
   */
  public reset(): void {
    this.bitset.fill(0);
    this.windowBuffer.fill(0);
    this.windowIndex = 0;
    this.windowCount = 0;
    this.currentHash = 0n;
    this.totalTokens = 0;
  }

  /**
   * Pushes a single token ID into the rolling window.
   * Returns true if a collision (loop) is detected in O(1) time.
   */
  public pushToken(tokenId: number): boolean {
    this.totalTokens++;

    if (this.windowCount < this.windowSize) {
      this.windowBuffer[this.windowIndex] = tokenId;
      this.windowIndex = (this.windowIndex + 1) % this.windowSize;
      this.windowCount++;

      this.currentHash = ((this.currentHash * this.primeBase + BigInt(tokenId)) & 0xffffffffffffffffn);

      if (this.windowCount === this.windowSize) {
        return this.recordAndCheckCollision(this.currentHash);
      }
      return false;
    }

    // Rolling window update
    const oldToken = this.windowBuffer[this.windowIndex];
    this.windowBuffer[this.windowIndex] = tokenId;
    this.windowIndex = (this.windowIndex + 1) % this.windowSize;

    // H_t = ((H_{t-1} - oldToken * basePower) * primeBase + tokenId) & 0xFFFFFFFFFFFFFFFF
    const removeOld = (BigInt(oldToken) * this.basePower) & 0xffffffffffffffffn;
    let newHash = (this.currentHash - removeOld) & 0xffffffffffffffffn;
    newHash = ((newHash * this.primeBase) + BigInt(tokenId)) & 0xffffffffffffffffn;
    this.currentHash = newHash;

    return this.recordAndCheckCollision(this.currentHash);
  }

  /**
   * Pushes a sequence of token IDs and returns true on first collision.
   */
  public pushTokens(tokens: readonly number[]): boolean {
    for (let i = 0; i < tokens.length; i++) {
      if (this.pushToken(tokens[i])) {
        return true;
      }
    }
    return false;
  }

  public getTotalTokens(): number {
    return this.totalTokens;
  }

  public getCurrentHash(): bigint {
    return this.currentHash;
  }

  private recordAndCheckCollision(hash: bigint): boolean {
    // Map 64-bit hash to bitset index
    const bitIndex = Number(hash & BigInt(this.bitmask));
    const byteIndex = bitIndex >> 3;
    const bitOffset = bitIndex & 7;
    const mask = 1 << bitOffset;

    if ((this.bitset[byteIndex] & mask) !== 0) {
      return true; // Collision: loop tripwire triggered!
    }

    this.bitset[byteIndex] |= mask;
    return false;
  }
}
