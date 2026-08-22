import { r as hasGlobalHooks } from "./hook-runner-global-CRNklGqK.js";
//#region src/plugins/restart-recovery-hook-safety.ts
const RESTART_RECOVERY_UNSAFE_REPLY_HOOKS = [
	"before_dispatch",
	"before_agent_reply",
	"before_agent_run",
	"before_message_write",
	"reply_dispatch"
];
const RESTART_RECOVERY_UNSAFE_CHAT_ADMISSION_HOOKS = [
	"before_dispatch",
	"before_agent_run",
	"before_message_write",
	"reply_dispatch"
];
function findRestartRecoveryUnsafeReplyHook(ctx) {
	return RESTART_RECOVERY_UNSAFE_REPLY_HOOKS.find((hookName) => hookName === "before_agent_reply" ? hasGlobalHooks("before_agent_reply", ctx) : hasGlobalHooks(hookName));
}
/** Initial chat admission defers before_agent_reply until after its durable checkpoint. */
function findRestartRecoveryUnsafeChatAdmissionHook() {
	return RESTART_RECOVERY_UNSAFE_CHAT_ADMISSION_HOOKS.find((hookName) => hasGlobalHooks(hookName));
}
//#endregion
export { findRestartRecoveryUnsafeReplyHook as n, findRestartRecoveryUnsafeChatAdmissionHook as t };
