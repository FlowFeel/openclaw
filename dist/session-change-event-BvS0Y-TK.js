import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
import { a as loadGatewaySessionRow } from "./session-utils-list-Ci5hylG_.js";
import "./session-utils-DRzriWC1.js";
import { t as buildGatewaySessionEventFields } from "./session-event-payload-C_yXPv8I.js";
import { i as resolveVisibleActiveSessionRunState } from "./session-active-runs-BJUkv4It.js";
import { t as hasSessionChangeReceivers } from "./session-change-receivers-5IR8yVBT.js";
import { g as invalidateSessionSharingSnapshot } from "./session-sharing-CSGmZX63.js";
//#region src/gateway/server-methods/session-change-event.ts
const SESSIONS_CHANGED_DEBOUNCE_MS = 100;
const sessionsMutationVersions = /* @__PURE__ */ new WeakMap();
const pendingChangesByContext = /* @__PURE__ */ new WeakMap();
const pendingSessionChanges = /* @__PURE__ */ new Set();
function readSessionsMutationVersion(context) {
	return sessionsMutationVersions.get(context) ?? 0;
}
function sessionChangeKey(payload) {
	return `${payload.agentId ?? ""}\0${payload.sessionKey ?? ""}`;
}
function broadcastSessionsChanged(context, payload) {
	const connIds = context.getSessionEventSubscriberConnIds();
	if (!hasSessionChangeReceivers(connIds)) return;
	const sessionRow = payload.sessionKey ? loadGatewaySessionRow(payload.sessionKey, payload.sessionKey === "global" && payload.agentId ? { agentId: payload.agentId } : void 0) : null;
	const defaultAgentId = resolveDefaultAgentId(context.getRuntimeConfig());
	const activeRunState = sessionRow ? resolveVisibleActiveSessionRunState({
		context,
		requestedKey: payload.sessionKey ?? sessionRow.key,
		canonicalKey: sessionRow.key,
		sessionId: sessionRow.sessionId,
		agentId: sessionRow.key === "global" ? payload.agentId : void 0,
		defaultAgentId
	}) : null;
	context.broadcastToConnIds("sessions.changed", {
		...payload,
		ts: Date.now(),
		...sessionRow ? {
			...buildGatewaySessionEventFields({
				sessionRow,
				agentId: payload.agentId,
				hasActiveRun: activeRunState?.active,
				activeRunIds: activeRunState?.runIds
			}),
			effectiveFastMode: sessionRow.effectiveFastMode,
			effectiveFastModeSource: sessionRow.effectiveFastModeSource,
			fastAutoOnSeconds: sessionRow.fastAutoOnSeconds,
			traceLevel: sessionRow.traceLevel,
			pluginExtensions: sessionRow.pluginExtensions
		} : {}
	}, connIds, {
		...payload.agentId ? { agentId: payload.agentId } : {},
		dropIfSlow: true,
		...sessionRow?.key ? { sessionKeys: [sessionRow.key] } : {}
	});
}
function finishPendingSessionChange(pending) {
	if (pending.timer) {
		clearTimeout(pending.timer);
		pending.timer = null;
	}
	pendingSessionChanges.delete(pending);
	const byKey = pendingChangesByContext.get(pending.context);
	if (byKey?.get(pending.key) === pending) byKey.delete(pending.key);
	if (pending.dirty) broadcastSessionsChanged(pending.context, pending.payload);
}
/** Flush trailing notifications and release every debounce timer before gateway shutdown. */
function flushPendingSessionsChangedEvents(context) {
	for (const pending of pendingSessionChanges) if (!context || pending.context === context) finishPendingSessionChange(pending);
}
function emitSessionsChanged(context, payload) {
	sessionsMutationVersions.set(context, readSessionsMutationVersion(context) + 1);
	invalidateSessionSharingSnapshot(payload.sessionKey);
	if (!hasSessionChangeReceivers(context.getSessionEventSubscriberConnIds())) return;
	const key = sessionChangeKey(payload);
	const byKey = pendingChangesByContext.get(context) ?? /* @__PURE__ */ new Map();
	pendingChangesByContext.set(context, byKey);
	const pending = byKey.get(key);
	if (pending) {
		pending.payload = payload;
		pending.dirty = true;
		if (pending.timer) clearTimeout(pending.timer);
		pending.timer = setTimeout(() => finishPendingSessionChange(pending), SESSIONS_CHANGED_DEBOUNCE_MS);
		pending.timer.unref?.();
		return;
	}
	const next = {
		context,
		dirty: false,
		key,
		payload,
		timer: null
	};
	next.timer = setTimeout(() => finishPendingSessionChange(next), SESSIONS_CHANGED_DEBOUNCE_MS);
	next.timer.unref?.();
	byKey.set(key, next);
	pendingSessionChanges.add(next);
	broadcastSessionsChanged(context, payload);
}
//#endregion
export { flushPendingSessionsChangedEvents as n, readSessionsMutationVersion as r, emitSessionsChanged as t };
