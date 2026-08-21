import { S as requireActivePluginRegistry } from "./runtime-WkCmQTS9.js";
//#region src/tasks/detached-task-runtime-state.ts
const getRegistrations = () => requireActivePluginRegistry().detachedTaskRuntimes;
function getRegisteredDetachedTaskLifecycleRuntime() {
	return getRegistrations()[0]?.runtime;
}
//#endregion
export { getRegisteredDetachedTaskLifecycleRuntime as t };
