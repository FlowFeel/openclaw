import { n as sliceUtf16Safe } from "./utf16-slice-lH-m0h6-.js";
import { c as readEnvInt } from "./bash-tools.shared-0H8_zJuj.js";
import { n as createSessionSlug$1 } from "./session-slug-DUj8bbny.js";
//#region src/agents/bash-process-registry.ts
const DEFAULT_JOB_TTL_MS = 1800 * 1e3;
const MIN_JOB_TTL_MS = 60 * 1e3;
const MAX_JOB_TTL_MS = 10800 * 1e3;
const DEFAULT_PENDING_OUTPUT_CHARS = 3e4;
const MAX_FINISHED_SESSION_COUNT = 50;
const MAX_FINISHED_SESSION_OUTPUT_CHARS = 2e6;
function clampTtl(value) {
	if (value === void 0 || Number.isNaN(value)) return DEFAULT_JOB_TTL_MS;
	return Math.min(Math.max(value, MIN_JOB_TTL_MS), MAX_JOB_TTL_MS);
}
let jobTtlMs = clampTtl(readEnvInt("OPENCLAW_BASH_JOB_TTL_MS", "PI_BASH_JOB_TTL_MS"));
const runningSessions = /* @__PURE__ */ new Map();
const finishedSessions = /* @__PURE__ */ new Map();
const activeBackgroundExecSessionIds = /* @__PURE__ */ new Set();
let finishedSessionOutputChars = 0;
let sweeper = null;
function isSessionIdTaken(id) {
	return runningSessions.has(id) || finishedSessions.has(id) || activeBackgroundExecSessionIds.has(id);
}
/** Creates a unique short session id that avoids running and retained sessions. */
function createSessionSlug() {
	return createSessionSlug$1(isSessionIdTaken);
}
/** Adds a running session and starts retention sweeping if needed. */
function addSession(session) {
	runningSessions.set(session.id, session);
	startSweeper();
}
/** Returns a running session by id. */
function getSession(id) {
	return runningSessions.get(id);
}
/** Returns a retained finished background session by id. */
function getFinishedSession(id) {
	return finishedSessions.get(id);
}
function deleteFinishedSession(id) {
	const session = finishedSessions.get(id);
	if (!session) return false;
	finishedSessions.delete(id);
	finishedSessionOutputChars -= session.aggregated.length;
	return true;
}
/** Removes visible session records without changing live-process activity. */
function deleteSession(id) {
	runningSessions.delete(id);
	deleteFinishedSession(id);
}
/** Removes completed process records belonging to retired session identities. */
function clearFinishedSessionsForScopes(scopeKeys) {
	const retiredScopes = /* @__PURE__ */ new Set();
	for (const scopeKey of scopeKeys) {
		const normalizedScope = scopeKey.trim();
		if (normalizedScope) retiredScopes.add(normalizedScope);
	}
	if (retiredScopes.size === 0) return;
	for (const [id, session] of finishedSessions) if (session.scopeKey && retiredScopes.has(session.scopeKey)) deleteFinishedSession(id);
}
/** Appends process output while enforcing aggregate and pending-output caps. */
function appendOutput(session, stream, chunk) {
	session.pendingStdout ??= [];
	session.pendingStderr ??= [];
	session.pendingStdoutChars ??= sumPendingChars(session.pendingStdout);
	session.pendingStderrChars ??= sumPendingChars(session.pendingStderr);
	const buffer = stream === "stdout" ? session.pendingStdout : session.pendingStderr;
	const bufferChars = stream === "stdout" ? session.pendingStdoutChars : session.pendingStderrChars;
	const pendingCap = Math.min(session.pendingMaxOutputChars ?? DEFAULT_PENDING_OUTPUT_CHARS, session.maxOutputChars);
	buffer.push(chunk);
	let pendingChars = bufferChars + chunk.length;
	if (pendingChars > pendingCap) {
		session.truncated = true;
		pendingChars = capPendingBuffer(buffer, pendingChars, pendingCap);
	}
	if (stream === "stdout") session.pendingStdoutChars = pendingChars;
	else session.pendingStderrChars = pendingChars;
	session.totalOutputChars += chunk.length;
	const aggregated = trimWithCap(session.aggregated + chunk, session.maxOutputChars);
	session.truncated = session.truncated || aggregated.length < session.aggregated.length + chunk.length;
	session.aggregated = aggregated;
	session.tail = tail(session.aggregated, 2e3);
}
/** Drains pending stdout/stderr chunks returned by a process poll. */
function drainSession(session) {
	const stdout = session.pendingStdout.join("");
	const stderr = session.pendingStderr.join("");
	session.pendingStdout = [];
	session.pendingStderr = [];
	session.pendingStdoutChars = 0;
	session.pendingStderrChars = 0;
	return {
		stdout,
		stderr
	};
}
/** Moves a session to finished state and records exit metadata. */
function markExited(session, exitCode, exitSignal, status, exitReason, noOutputTimedOut) {
	activeBackgroundExecSessionIds.delete(session.id);
	session.exited = true;
	session.exitCode = exitCode;
	session.exitSignal = exitSignal;
	session.exitReason = exitReason;
	session.noOutputTimedOut = noOutputTimedOut;
	session.tail = tail(session.aggregated, 2e3);
	moveToFinished(session, status);
}
/** Marks a running session as reconnectable after the exec call returns. */
function markBackgrounded(session) {
	session.backgrounded = true;
	if (!session.exited) activeBackgroundExecSessionIds.add(session.id);
}
/** Returns the number of live background exec sessions without exposing process details. */
function getActiveBackgroundExecSessionCount() {
	return activeBackgroundExecSessionIds.size;
}
function moveToFinished(session, status) {
	runningSessions.delete(session.id);
	if (session.child) {
		session.child.stdin?.destroy?.();
		session.child.stdout?.destroy?.();
		session.child.stderr?.destroy?.();
		session.child.removeAllListeners();
		delete session.child;
	}
	if (session.stdin) {
		if (typeof session.stdin.destroy === "function") session.stdin.destroy();
		else if (typeof session.stdin.end === "function") session.stdin.end();
		try {
			session.stdin.destroyed = true;
		} catch {}
		delete session.stdin;
	}
	if (!session.backgrounded) return;
	deleteFinishedSession(session.id);
	finishedSessions.set(session.id, {
		id: session.id,
		command: session.command,
		scopeKey: session.scopeKey,
		startedAt: session.startedAt,
		endedAt: Date.now(),
		cwd: session.cwd,
		status,
		exitCode: session.exitCode,
		exitSignal: session.exitSignal,
		exitReason: session.exitReason,
		...session.noOutputTimedOut !== void 0 ? { noOutputTimedOut: session.noOutputTimedOut } : {},
		aggregated: session.aggregated,
		tail: session.tail,
		truncated: session.truncated,
		totalOutputChars: session.totalOutputChars
	});
	finishedSessionOutputChars += session.aggregated.length;
	while (finishedSessions.size > MAX_FINISHED_SESSION_COUNT || finishedSessions.size > 1 && finishedSessionOutputChars > MAX_FINISHED_SESSION_OUTPUT_CHARS) {
		const oldestSessionId = finishedSessions.keys().next().value;
		if (oldestSessionId === void 0) break;
		deleteFinishedSession(oldestSessionId);
	}
}
/** Returns the last `max` characters of text without adding ellipses. */
function tail(text, max = 2e3) {
	if (text.length <= max) return text;
	return sliceUtf16Safe(text, text.length - max);
}
function sumPendingChars(buffer) {
	let total = 0;
	for (const chunk of buffer) total += chunk.length;
	return total;
}
function capPendingBuffer(buffer, pendingCharsInput, cap) {
	let pendingChars = pendingCharsInput;
	if (pendingChars <= cap) return pendingChars;
	const last = buffer.at(-1);
	if (last && last.length >= cap) {
		buffer.length = 0;
		const kept = tail(last, cap);
		buffer.push(kept);
		return kept.length;
	}
	let dropCount = 0;
	while (dropCount < buffer.length) {
		const chunk = buffer[dropCount];
		if (chunk === void 0 || pendingChars - chunk.length < cap) break;
		pendingChars -= chunk.length;
		dropCount += 1;
	}
	if (dropCount > 0) buffer.splice(0, dropCount);
	if (buffer.length && pendingChars > cap) {
		const overflow = pendingChars - cap;
		const firstChunk = buffer.at(0);
		if (firstChunk !== void 0) {
			const trimmedChunk = sliceUtf16Safe(firstChunk, overflow);
			buffer[0] = trimmedChunk;
			pendingChars -= firstChunk.length - trimmedChunk.length;
		}
	}
	return pendingChars;
}
/** Keeps only the last `max` characters for bounded aggregate output storage. */
function trimWithCap(text, max) {
	return tail(text, max);
}
/** Lists backgrounded running sessions visible to reconnect/poll callers. */
function listRunningSessions() {
	return Array.from(runningSessions.values()).filter((s) => s.backgrounded);
}
/** Lists retained finished background sessions. */
function listFinishedSessions() {
	return Array.from(finishedSessions.values());
}
/** Test-only reset for in-memory registry state and retention timers. */
function resetProcessRegistryForTests() {
	runningSessions.clear();
	finishedSessions.clear();
	finishedSessionOutputChars = 0;
	activeBackgroundExecSessionIds.clear();
	stopSweeper();
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.bashProcessRegistryTestApi")] = { resetProcessRegistryForTests };
/** Overrides finished-session retention TTL, clamped to supported bounds. */
function setJobTtlMs(value) {
	if (value === void 0 || Number.isNaN(value)) return;
	jobTtlMs = clampTtl(value);
	stopSweeper();
	startSweeper();
}
function pruneFinishedSessions() {
	const cutoff = Date.now() - jobTtlMs;
	for (const [id, session] of finishedSessions.entries()) if (session.endedAt < cutoff) deleteFinishedSession(id);
}
function startSweeper() {
	if (sweeper) return;
	sweeper = setInterval(pruneFinishedSessions, Math.max(3e4, jobTtlMs / 6));
	sweeper.unref?.();
}
function stopSweeper() {
	if (!sweeper) return;
	clearInterval(sweeper);
	sweeper = null;
}
//#endregion
export { deleteSession as a, getFinishedSession as c, listRunningSessions as d, markBackgrounded as f, tail as h, createSessionSlug as i, getSession as l, setJobTtlMs as m, appendOutput as n, drainSession as o, markExited as p, clearFinishedSessionsForScopes as r, getActiveBackgroundExecSessionCount as s, addSession as t, listFinishedSessions as u };
