import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { r as normalizeControlUiBasePath } from "./control-ui-shared-BqBD1Err.js";
import { g as validateApprovalResolveParams, m as validateApprovalHistoryParams, p as validateApprovalGetParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { n as isWellFormedApprovalId } from "./approval-id-BTRnO3t1.js";
import { l as listTerminalOperatorApprovals, o as getOperatorApprovalDetailed, t as OperatorApprovalHistoryCursorError } from "./operator-approval-store-BJ5KGqT7.js";
import { n as canResolveOperatorApproval, r as canReviewOperatorApproval, t as canAccessOperatorApproval } from "./operator-approval-authorization-CIsFNbyt.js";
import { p as respondApprovalStorageUnavailable } from "./approval-shared-Cs2GHmag.js";
import { t as publishAppliedApprovalResolution } from "./approval-publication-Be2TSgKd.js";
//#region src/gateway/server-methods/approval.ts
function buildApprovalSnapshot(record, controlUiBasePath) {
	const common = {
		id: record.id,
		status: record.status,
		presentation: record.presentation,
		urlPath: `${controlUiBasePath}/approve/${encodeURIComponent(record.id)}`,
		createdAtMs: record.createdAtMs,
		expiresAtMs: record.expiresAtMs
	};
	if (record.status === "pending") return common;
	if (record.resolvedAtMs === null || record.terminalReason === null) return null;
	const terminal = {
		...common,
		resolvedAtMs: record.resolvedAtMs,
		reason: record.terminalReason,
		source: {
			...record.source.agentId ? { agentId: record.source.agentId } : {},
			...record.source.sessionKey ? { sessionKey: record.source.sessionKey } : {}
		},
		...record.resolver ? { resolver: {
			kind: record.resolver.kind,
			...record.resolver.id ? { id: record.resolver.id } : {}
		} } : {}
	};
	if (record.status === "allowed") {
		if (record.decision !== "allow-once" && record.decision !== "allow-always") return null;
		return {
			...terminal,
			decision: record.decision
		};
	}
	if (record.status === "denied") return {
		...terminal,
		decision: "deny"
	};
	return terminal;
}
function resolveApprovalResolver(client) {
	const deviceId = normalizeOptionalString(client?.connect?.device?.id);
	if (deviceId) return {
		kind: "device",
		id: deviceId
	};
	return {
		kind: "runtime",
		id: normalizeOptionalString(client?.connect?.client?.id) ?? null
	};
}
function resolveLegacyApprovalLabel(client) {
	return normalizeOptionalString(client?.connect?.client?.displayName) ?? normalizeOptionalString(client?.connect?.client?.id) ?? null;
}
function respondApprovalNotFound(respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "approval not found", { details: { reason: ErrorCodes.APPROVAL_NOT_FOUND } }));
}
function readExactApprovalId(params) {
	if (!isRecord(params) || typeof params.id !== "string") return null;
	const id = params.id;
	return isWellFormedApprovalId(id) ? id : null;
}
function loadVisibleApproval(params) {
	if (!(params.allowApprovalRuntime ? canResolveOperatorApproval(params.client) : canReviewOperatorApproval(params.client))) return null;
	const liveRecord = params.execApprovalManager.getLiveSnapshot(params.id) ?? params.pluginApprovalManager.getLiveSnapshot(params.id) ?? params.systemAgentApprovalManager?.getLiveSnapshot(params.id);
	if (liveRecord && !canAccessOperatorApproval({
		client: params.client,
		allowApprovalRuntime: params.allowApprovalRuntime,
		binding: { reviewerDeviceIds: liveRecord.approvalReviewerDeviceIds }
	})) return null;
	let lookup;
	try {
		lookup = getOperatorApprovalDetailed({
			id: params.id,
			allowTransportRef: params.allowTransportRef,
			databaseOptions: params.databaseOptions
		});
	} catch (error) {
		const corrupt = {
			outcome: "corrupt",
			id: params.id
		};
		params.execApprovalManager.reconcileDurableLookup(corrupt);
		params.pluginApprovalManager.reconcileDurableLookup(corrupt);
		params.systemAgentApprovalManager?.reconcileDurableLookup(corrupt);
		throw error;
	}
	if (lookup.outcome === "found") {
		if (!canAccessOperatorApproval({
			client: params.client,
			allowApprovalRuntime: params.allowApprovalRuntime,
			binding: { reviewerDeviceIds: lookup.record.reviewerDeviceIds }
		})) return null;
		return (lookup.record.kind === "exec" ? params.execApprovalManager : lookup.record.kind === "plugin" ? params.pluginApprovalManager : params.systemAgentApprovalManager)?.reconcileDurableLookup(lookup) ?? null;
	}
	const missing = {
		outcome: lookup.outcome === "corrupt" ? "corrupt" : "missing",
		id: lookup.outcome === "corrupt" ? lookup.id ?? params.id : params.id
	};
	params.execApprovalManager.reconcileDurableLookup(missing);
	params.pluginApprovalManager.reconcileDurableLookup(missing);
	params.systemAgentApprovalManager?.reconcileDurableLookup(missing);
	return null;
}
function resolveLiveRecord(params) {
	return params.liveRecord ?? params.manager.getLiveSnapshot(params.id) ?? void 0;
}
function applyApprovalDecision(params) {
	const result = params.forceMalformedDeny ? params.manager.forceDenyDetailed(params.id, "malformed-verdict", params.resolver, "denied", void 0, false, params.localResolvedBy) : params.manager.resolveDetailed(params.id, params.decision, params.resolver, params.localResolvedBy);
	if (result.outcome === "decision-not-allowed") return applyApprovalDecision({
		...params,
		forceMalformedDeny: true
	});
	if (result.outcome === "not-found" || result.outcome === "corrupt") return { ok: false };
	const applied = result.outcome === "resolved" || result.outcome === "denied";
	return {
		ok: true,
		applied,
		record: result.record,
		liveRecord: applied ? resolveLiveRecord({
			manager: params.manager,
			id: params.id,
			liveRecord: result.liveRecord
		}) : result.liveRecord
	};
}
/** Creates kind-agnostic approval lookup and resolution handlers. */
function createApprovalHandlers(params) {
	return {
		"approval.history": ({ params: rawParams, respond, context }) => {
			if (!validateApprovalHistoryParams(rawParams)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid approval.history params"));
				return;
			}
			const historyParams = rawParams;
			let history;
			try {
				history = listTerminalOperatorApprovals({
					cursor: historyParams.cursor,
					limit: historyParams.limit,
					kind: historyParams.kind,
					databaseOptions: params.databaseOptions
				});
			} catch (error) {
				if (error instanceof OperatorApprovalHistoryCursorError) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid approval.history cursor"));
					return;
				}
				respondApprovalStorageUnavailable({
					context,
					respond,
					operation: "history",
					error
				});
				return;
			}
			const controlUiBasePath = normalizeControlUiBasePath(context.getRuntimeConfig()?.gateway?.controlUi?.basePath);
			respond(true, {
				items: history.records.flatMap((record) => {
					const snapshot = buildApprovalSnapshot(record, controlUiBasePath);
					return snapshot && snapshot.status !== "pending" ? [snapshot] : [];
				}),
				...history.nextCursor ? { nextCursor: history.nextCursor } : {}
			}, void 0);
		},
		"approval.get": ({ params: rawParams, respond, client, context }) => {
			if (!validateApprovalGetParams(rawParams)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid approval.get params"));
				return;
			}
			const id = readExactApprovalId(rawParams);
			let record;
			try {
				record = id ? loadVisibleApproval({
					id,
					client,
					execApprovalManager: params.execApprovalManager,
					pluginApprovalManager: params.pluginApprovalManager,
					systemAgentApprovalManager: params.systemAgentApprovalManager,
					databaseOptions: params.databaseOptions
				}) : null;
			} catch (error) {
				respondApprovalStorageUnavailable({
					context,
					respond,
					operation: "lookup",
					error
				});
				return;
			}
			const controlUiBasePath = normalizeControlUiBasePath(context.getRuntimeConfig()?.gateway?.controlUi?.basePath);
			const approval = record ? buildApprovalSnapshot(record, controlUiBasePath) : null;
			if (!approval) {
				respondApprovalNotFound(respond);
				return;
			}
			respond(true, { approval }, void 0);
		},
		"approval.resolve": async ({ params: rawParams, respond, client, context }) => {
			const id = readExactApprovalId(rawParams);
			let record;
			try {
				record = id ? loadVisibleApproval({
					id,
					client,
					allowApprovalRuntime: true,
					allowTransportRef: true,
					execApprovalManager: params.execApprovalManager,
					pluginApprovalManager: params.pluginApprovalManager,
					systemAgentApprovalManager: params.systemAgentApprovalManager,
					databaseOptions: params.databaseOptions
				}) : null;
			} catch (error) {
				respondApprovalStorageUnavailable({
					context,
					respond,
					operation: "lookup",
					error
				});
				return;
			}
			if (!id || !record) {
				respondApprovalNotFound(respond);
				return;
			}
			if (record.status !== "pending") {
				const controlUiBasePath = normalizeControlUiBasePath(context.getRuntimeConfig()?.gateway?.controlUi?.basePath);
				const approval = buildApprovalSnapshot(record, controlUiBasePath);
				if (!approval || approval.status === "pending") {
					respondApprovalNotFound(respond);
					return;
				}
				respond(true, {
					applied: false,
					approval
				}, void 0);
				return;
			}
			const resolver = resolveApprovalResolver(client);
			const localResolvedBy = resolveLegacyApprovalLabel(client);
			const validParams = validateApprovalResolveParams(rawParams);
			const resolveParams = validParams ? rawParams : null;
			const requestedDecision = resolveParams?.decision ?? null;
			const decisionAllowed = requestedDecision === "deny" || requestedDecision !== null && record.presentation.allowedDecisions.includes(requestedDecision);
			const kindMatches = resolveParams?.kind === record.presentation.kind;
			const forceMalformedDeny = !validParams || !kindMatches || !decisionAllowed;
			let resolution;
			try {
				resolution = record.kind === "exec" ? applyApprovalDecision({
					manager: params.execApprovalManager,
					id: record.id,
					decision: requestedDecision,
					forceMalformedDeny,
					resolver,
					localResolvedBy
				}) : record.kind === "plugin" ? applyApprovalDecision({
					manager: params.pluginApprovalManager,
					id: record.id,
					decision: requestedDecision,
					forceMalformedDeny,
					resolver,
					localResolvedBy
				}) : applyApprovalDecision({
					manager: params.systemAgentApprovalManager,
					id: record.id,
					decision: requestedDecision,
					forceMalformedDeny,
					resolver,
					localResolvedBy
				});
			} catch (error) {
				respondApprovalStorageUnavailable({
					context,
					respond,
					operation: "resolve",
					error
				});
				return;
			}
			if (!resolution.ok) {
				respondApprovalNotFound(respond);
				return;
			}
			const terminalRecord = resolution.record;
			if (terminalRecord.status === "pending") {
				respondApprovalNotFound(respond);
				return;
			}
			const approval = buildApprovalSnapshot(terminalRecord, normalizeControlUiBasePath(context.getRuntimeConfig()?.gateway?.controlUi?.basePath));
			if (!approval) {
				respondApprovalNotFound(respond);
				return;
			}
			respond(true, {
				applied: resolution.applied,
				approval
			}, void 0);
			if (resolution.applied && resolution.liveRecord) publishAppliedApprovalResolution({
				record: terminalRecord,
				liveRecord: resolution.liveRecord,
				context,
				forwarder: params.forwarder,
				iosPushDelivery: params.iosPushDelivery,
				pluginIosPushDelivery: params.pluginIosPushDelivery
			}).catch((error) => {
				context.logGateway?.error?.(`${terminalRecord.kind} approvals: unified resolve publication failed: ${String(error)}`);
			});
		}
	};
}
//#endregion
export { createApprovalHandlers };
