//#region src/auto-reply/reply/agent-runner-failure-copy.ts
const GENERIC_EXTERNAL_RUN_FAILURE_TEXT = "⚠️ Something went wrong while processing your request. Please try again, or use /new to start a fresh session.";
const HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT = "⚠️ Heartbeat check failed before it could produce an update. The main chat session remains available.";
const CONTROL_UI_LOG_HINT = "To view logs, run `openclaw logs --follow` in a terminal.";
/** Preserves raw errors on internal surfaces while making the log command actionable. */
function buildControlUiAgentFailureText(errorText) {
	return `⚠️ Agent failed before reply: ${errorText.trim().replace(/\.\s*$/, "")}.\n${CONTROL_UI_LOG_HINT}`;
}
/** True when text is exactly the generic external run failure copy. */
function isGenericExternalRunFailureText(text) {
	return text?.trim() === GENERIC_EXTERNAL_RUN_FAILURE_TEXT;
}
/** Replaces trailing generic failure text with heartbeat-specific copy. */
function replaceGenericExternalRunFailureText(text) {
	if (isGenericExternalRunFailureText(text)) return {
		text: HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT,
		replaced: true
	};
	const genericStart = text.indexOf(GENERIC_EXTERNAL_RUN_FAILURE_TEXT);
	if (genericStart < 0) return {
		text,
		replaced: false
	};
	if (text.slice(genericStart + 110).trim()) return {
		text,
		replaced: false
	};
	const prefix = text.slice(0, genericStart).trimEnd();
	return {
		text: prefix ? `${prefix} ${HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT}` : HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT,
		replaced: true
	};
}
//#endregion
export { replaceGenericExternalRunFailureText as i, HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT as n, buildControlUiAgentFailureText as r, GENERIC_EXTERNAL_RUN_FAILURE_TEXT as t };
