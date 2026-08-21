import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import { h as normalizeToolName } from "./tool-policy-CrjVfI-s.js";
import { r as isToolAllowedByPolicyName } from "./tool-policy-match-BJgxicXr.js";
//#region src/agents/inherited-tool-deny.ts
/**
* Normalizes inherited tool allow/deny lists and ACP compatibility errors.
*/
const ACP_UNSUPPORTED_INHERITED_TOOL_DENY = [
	"apply_patch",
	"edit",
	"exec",
	"fs_delete",
	"fs_move",
	"fs_write",
	"process",
	"read",
	"shell",
	"spawn",
	"write"
];
const ACP_REQUIRED_INHERITED_TOOL_ALLOW = [
	"apply_patch",
	"edit",
	"exec",
	"process",
	"read",
	"write"
];
function normalizeInheritedToolDenylist(value) {
	if (!Array.isArray(value)) return [];
	return uniqueStrings(value.flatMap((entry) => {
		const normalized = typeof entry === "string" ? normalizeToolName(entry) : "";
		return normalized ? [normalized] : [];
	}));
}
function inheritedToolDenyPatch(value) {
	const inheritedToolDeny = normalizeInheritedToolDenylist(value);
	return inheritedToolDeny.length > 0 ? { inheritedToolDeny } : {};
}
function normalizeInheritedToolAllowlist(value) {
	return normalizeInheritedToolDenylist(value);
}
function inheritedToolAllowPatch(value) {
	const inheritedToolAllow = normalizeInheritedToolAllowlist(value);
	return inheritedToolAllow.length > 0 ? { inheritedToolAllow } : {};
}
function findAcpUnsupportedInheritedToolDeny(value) {
	const inheritedToolDeny = normalizeInheritedToolDenylist(value);
	if (inheritedToolDeny.length === 0) return;
	return ACP_UNSUPPORTED_INHERITED_TOOL_DENY.find((toolName) => !isToolAllowedByPolicyName(toolName, { deny: inheritedToolDeny }));
}
function findAcpUnsupportedInheritedToolAllow(value) {
	const inheritedToolAllow = normalizeInheritedToolAllowlist(value);
	if (inheritedToolAllow.length === 0) return;
	return ACP_REQUIRED_INHERITED_TOOL_ALLOW.find((toolName) => !isToolAllowedByPolicyName(toolName, { allow: inheritedToolAllow }));
}
function formatAcpInheritedToolDenyError(toolName) {
	return `runtime="acp" is unavailable because the requester denies ${toolName}. Use runtime="subagent".`;
}
function formatAcpInheritedToolAllowError(toolName) {
	return `runtime="acp" is unavailable because the requester does not allow ${toolName}. Use runtime="subagent".`;
}
//#endregion
export { inheritedToolAllowPatch as a, normalizeInheritedToolDenylist as c, formatAcpInheritedToolDenyError as i, findAcpUnsupportedInheritedToolDeny as n, inheritedToolDenyPatch as o, formatAcpInheritedToolAllowError as r, normalizeInheritedToolAllowlist as s, findAcpUnsupportedInheritedToolAllow as t };
