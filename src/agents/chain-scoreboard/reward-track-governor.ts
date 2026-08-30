/**
 * Pure reward track governor for Shannon-Weaver Agent Telemetry.
 * Maps chainScore to reward tiers and unlockable runtime privileges.
 */

export type RewardTier = "Bronze" | "Silver" | "Gold" | "Diamond";

export interface TierPrivilegeDetails {
  readonly tier: RewardTier;
  readonly badge: string;
  readonly unlockedPrivilege: string;
  readonly minScore: number;
  readonly callLimit: number;
}

export const REWARD_TIER_MATRIX: Record<RewardTier, TierPrivilegeDetails> = Object.freeze({
  Diamond: Object.freeze({
    tier: "Diamond" as const,
    badge: "💎",
    unlockedPrivilege: "Autonomous multi-turn background execution without intermediate turn checks",
    minScore: 99,
    callLimit: 12,
  }),
  Gold: Object.freeze({
    tier: "Gold" as const,
    badge: "🟢",
    unlockedPrivilege: "Extended autonomous leash on background subagents (runTimeoutSeconds raised)",
    minScore: 95,
    callLimit: 8,
  }),
  Silver: Object.freeze({
    tier: "Silver" as const,
    badge: "⚪",
    unlockedPrivilege: "Priority tool execution; relaxed validation overhead",
    minScore: 85,
    callLimit: 5,
  }),
  Bronze: Object.freeze({
    tier: "Bronze" as const,
    badge: "🟡",
    unlockedPrivilege: "Standard nominal baseline; standard tool timeouts",
    minScore: 0,
    callLimit: 3,
  }),
});

/**
 * Purely classifies the reward tier and unlocked privilege based on chain score.
 */
export function classifyRewardTier(chainScore: number): TierPrivilegeDetails {
  if (chainScore >= 99) return REWARD_TIER_MATRIX.Diamond;
  if (chainScore >= 95) return REWARD_TIER_MATRIX.Gold;
  if (chainScore >= 85) return REWARD_TIER_MATRIX.Silver;
  return REWARD_TIER_MATRIX.Bronze;
}
