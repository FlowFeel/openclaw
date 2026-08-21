import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as getRegisteredDetachedTaskLifecycleRuntime } from "./detached-task-runtime-state-DznXlyTF.js";
import { n as cancelTaskById, t as assertTaskCancellationReadyById, x as getTaskById } from "./task-registry-C6MCtVnT.js";
import "./runtime-internal-CRNvpCAc.js";
//#region src/tasks/task-executor-cancel.runtime.ts
async function cancelDetachedTaskRunById(params) {
	const task = getTaskById(params.taskId);
	const registeredRuntime = getRegisteredDetachedTaskLifecycleRuntime();
	if (!task) {
		if (registeredRuntime) {
			const cancelled = await registeredRuntime.cancelDetachedTaskRunById(params);
			if (cancelled.found) return cancelled;
		}
		return cancelTaskById(params);
	}
	try {
		assertTaskCancellationReadyById(task.taskId);
	} catch (error) {
		return {
			found: true,
			cancelled: false,
			reason: formatErrorMessage(error),
			task
		};
	}
	if (registeredRuntime) {
		const cancelled = await registeredRuntime.cancelDetachedTaskRunById(params);
		if (cancelled.found) return cancelled;
	}
	return cancelTaskById(params);
}
//#endregion
export { cancelDetachedTaskRunById };
