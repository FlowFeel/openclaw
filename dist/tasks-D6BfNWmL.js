import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { n as canonicalizeMainSessionAlias } from "./main-session-Bjm_i_Af.js";
import { Gi as validateTasksRecoveryParams, Hi as validateTasksCancelParams, Ui as validateTasksGetParams, Wi as validateTasksListParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { w as listTaskRecordPage, x as getTaskById } from "./task-registry-CYuVw6Rm.js";
import "./runtime-internal-BpHcKGAf.js";
import "./sessions-CBo4LOdS.js";
import { i as retrySubagentCompletionDelivery, n as dismissSubagentCompletionDelivery } from "./subagent-completion-delivery-DFUMUB9K.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as mapTaskSummary } from "./task-summary-CtXqyWq7.js";
//#region src/gateway/server-methods/tasks.ts
const DEFAULT_TASKS_LIST_LIMIT = 100;
const MAX_TASKS_LIST_LIMIT = 500;
const LEDGER_STATUS_TO_TASK_STATUSES = {
	queued: ["queued"],
	running: ["running"],
	completed: ["succeeded"],
	failed: ["failed", "lost"],
	timed_out: ["timed_out"],
	cancelled: ["cancelled"]
};
function normalizeTaskStatusFilter(status) {
	if (!status) return null;
	return new Set((Array.isArray(status) ? status : [status]).flatMap((value) => LEDGER_STATUS_TO_TASK_STATUSES[value] ?? []));
}
function parseCursor(cursor) {
	if (!cursor) return 0;
	if (!/^\d+$/.test(cursor.trim())) return null;
	const parsed = Number(cursor);
	return Number.isSafeInteger(parsed) ? parsed : null;
}
const tasksHandlers = {
	"tasks.list": ({ params, respond, context }) => {
		if (!assertValidParams(params, validateTasksListParams, "tasks.list", respond)) return;
		const cursor = parseCursor(params.cursor);
		if (cursor === null) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid tasks.list cursor"));
			return;
		}
		const statusFilter = normalizeTaskStatusFilter(params.status);
		const limit = Math.min(params.limit ?? DEFAULT_TASKS_LIST_LIMIT, MAX_TASKS_LIST_LIMIT);
		const requestedSessionKey = normalizeOptionalString(params.sessionKey);
		let sessionKey;
		if (requestedSessionKey) {
			const cfg = context.getRuntimeConfig();
			sessionKey = canonicalizeMainSessionAlias({
				cfg,
				agentId: parseAgentSessionKey(requestedSessionKey)?.agentId ?? normalizeOptionalString(params.agentId) ?? resolveDefaultAgentId(cfg),
				sessionKey: requestedSessionKey
			});
		}
		const page = listTaskRecordPage({
			offset: cursor,
			limit,
			statuses: statusFilter ? [...statusFilter] : void 0,
			agentId: params.agentId,
			sessionKey
		});
		const nextOffset = cursor + page.tasks.length;
		respond(true, {
			tasks: page.tasks.map((task) => mapTaskSummary(task)),
			...page.hasMore ? { nextCursor: String(nextOffset) } : {}
		});
	},
	"tasks.get": ({ params, respond }) => {
		if (!assertValidParams(params, validateTasksGetParams, "tasks.get", respond)) return;
		const taskId = params.taskId;
		const task = getTaskById(taskId);
		if (!task) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `task not found: ${taskId}`));
			return;
		}
		respond(true, { task: mapTaskSummary(task, { includePrompt: true }) });
	},
	"tasks.cancel": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateTasksCancelParams, "tasks.cancel", respond)) return;
		const taskId = params.taskId;
		const reason = normalizeOptionalString(params.reason);
		const { cancelDetachedTaskRunById } = await import("./task-executor-cancel.runtime.js");
		const result = await cancelDetachedTaskRunById({
			cfg: context.getRuntimeConfig(),
			taskId,
			...reason ? { reason } : {}
		});
		respond(true, {
			found: result.found,
			cancelled: result.cancelled,
			...result.reason ? { reason: result.reason } : {},
			...result.task ? { task: mapTaskSummary(result.task) } : {}
		});
	},
	"tasks.retry": async ({ params, respond }) => {
		if (!assertValidParams(params, validateTasksRecoveryParams, "tasks.retry", respond)) return;
		const results = [];
		for (const taskId of params.taskIds) {
			const result = await retrySubagentCompletionDelivery(taskId);
			results.push({
				taskId,
				ok: result.ok,
				...result.reason ? { reason: result.reason } : {},
				...result.duplicateRisk ? { duplicateRisk: true } : {},
				...result.task ? { task: mapTaskSummary(result.task, { includePrompt: true }) } : {}
			});
		}
		respond(true, { results });
	},
	"tasks.dismiss": ({ params, respond }) => {
		if (!assertValidParams(params, validateTasksRecoveryParams, "tasks.dismiss", respond)) return;
		respond(true, { results: params.taskIds.map((taskId) => {
			const result = dismissSubagentCompletionDelivery(taskId);
			return {
				taskId,
				ok: result.ok,
				...result.reason ? { reason: result.reason } : {},
				...result.task ? { task: mapTaskSummary(result.task, { includePrompt: true }) } : {}
			};
		}) });
	}
};
//#endregion
export { tasksHandlers };
