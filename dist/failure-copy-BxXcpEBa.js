import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as buildProviderAuthRecoveryHint } from "./provider-auth-recovery-hint-BEr6j4jK.js";
//#region src/agents/auth-profiles/failure-copy.ts
function describeReason(reason, provider, allInCooldown) {
	if (allInCooldown) switch (reason) {
		case "auth":
		case "session_expired": return `Couldn't sign in to ${provider}. Your saved login looks expired or no longer works.`;
		case "auth_permanent": return `${provider} isn't accepting your saved login anymore.`;
		case "billing": return `${provider} rejected the request — looks like a billing issue on the account.`;
		case "rate_limit": return `${provider} is asking us to slow down. Please wait a moment before trying again.`;
		case "overloaded": return `${provider} is overloaded right now. Please wait a moment before trying again.`;
		case "timeout": return `${provider} hasn't been responding. Please wait a moment before trying again.`;
		case "model_not_found": return `${provider} can't find the model you're using right now.`;
		case "server_error": return `${provider} is having issues right now. Please wait a moment before trying again.`;
		default: return `Couldn't reach ${provider} with any of your saved logins right now.`;
	}
	switch (reason) {
		case "auth":
		case "session_expired": return `Couldn't sign in to ${provider}. Your saved login looks expired or no longer works.`;
		case "auth_permanent": return `${provider} isn't accepting your saved login.`;
		case "billing": return `${provider} rejected the request — looks like a billing issue on the account.`;
		default: return null;
	}
}
function shouldIncludeRecoveryHint(reason) {
	switch (reason) {
		case "auth":
		case "auth_permanent":
		case "session_expired":
		case "billing": return true;
		case "rate_limit":
		case "overloaded":
		case "timeout":
		case "tls_certificate":
		case "server_error":
		case "model_not_found":
		case "format": return false;
		default: return true;
	}
}
function diagnosticSuffix(cause, primary) {
	if (cause === void 0 || cause === null) return null;
	const text = formatErrorMessage(cause).trim();
	if (!text || primary.includes(text)) return null;
	return ` (${text})`;
}
/**
* Single source of truth for user-facing copy when an auth-profile rotation
* fails. Composes a reason-specific sentence with an actionable next-step
* derived from the provider's plugin manifest (`buildProviderAuthRecoveryHint`).
*
* Falls back to the underlying error's text when the reason maps to nothing
* actionable, so we never produce worse copy than the raw error.
*/
function formatAuthProfileFailureMessage(params) {
	const description = describeReason(params.reason, params.provider, params.allInCooldown);
	if (!description) {
		const causeText = params.cause ? formatErrorMessage(params.cause).trim() : "";
		if (causeText) return causeText;
		return `Couldn't reach ${params.provider} with any of your saved logins right now.`;
	}
	const hint = shouldIncludeRecoveryHint(params.reason) ? buildProviderAuthRecoveryHint({
		provider: params.provider,
		config: params.config,
		workspaceDir: params.workspaceDir,
		env: params.env
	}) : null;
	const suffix = diagnosticSuffix(params.cause, description);
	const parts = [description];
	if (hint) parts.push(hint);
	const message = parts.join(" ");
	return suffix ? `${message}${suffix}` : message;
}
//#endregion
export { formatAuthProfileFailureMessage as t };
