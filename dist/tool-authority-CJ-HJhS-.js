//#region src/worker/tool-authority.ts
const WORKER_LOCAL_TOOL_NAMES = [
	"read",
	"write",
	"edit",
	"apply_patch",
	"exec",
	"process"
];
const WORKER_LOCAL_TOOL_NAME_SET = new Set(WORKER_LOCAL_TOOL_NAMES);
function isWorkerLocalToolName(value) {
	return typeof value === "string" && WORKER_LOCAL_TOOL_NAME_SET.has(value);
}
//#endregion
export { isWorkerLocalToolName as n, WORKER_LOCAL_TOOL_NAMES as t };
