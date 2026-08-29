import { r as matrixSetupAdapter, t as matrixOnboardingAdapter } from "../../setup-surface-BkfQT3WS.js";

//#region extensions/matrix/src/setup-contract.d.ts
declare const singleAccountKeysToMove: ("textChunkLimit" | "streaming" | "responsePrefix" | "mediaMaxMb" | "replyToMode" | "homeserver" | "userId" | "accessToken" | "password" | "deviceName" | "avatarUrl" | "initialSyncLimit" | "deviceId" | "dangerouslyAllowNameMatching" | "allowBots" | "actions" | "dm" | "reactionNotifications" | "ackReaction" | "threadBindings" | "autoJoin" | "ackReactionScope" | "groups" | "rooms" | "encryption" | "allowlistOnly" | "threadReplies" | "startupVerification" | "startupVerificationCooldownHours" | "autoJoinAllowlist")[];
declare const namedAccountPromotionKeys: ("name" | "homeserver" | "userId" | "accessToken" | "password" | "deviceName" | "avatarUrl" | "initialSyncLimit" | "deviceId" | "encryption")[];
declare function resolveSingleAccountPromotionTarget(params: {
  channel: Record<string, unknown>;
}): string;
//#endregion
export { matrixSetupAdapter, matrixOnboardingAdapter as matrixSetupWizard, namedAccountPromotionKeys, resolveSingleAccountPromotionTarget, singleAccountKeysToMove };