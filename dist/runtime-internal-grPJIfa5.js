import { N as ensureTaskRegistryReady, P as reloadTaskRegistryFromStore, q as ensureTaskFlowRegistryReady, tt as reloadTaskFlowRegistryFromStore } from "./task-registry-Bs8cA6Tm.js";
//#region src/tasks/runtime-internal.ts
function ensureTaskRuntimeStateReady() {
	ensureTaskFlowRegistryReady();
	ensureTaskRegistryReady();
}
function reloadTaskRuntimeStateFromStore() {
	reloadTaskFlowRegistryFromStore();
	reloadTaskRegistryFromStore();
}
//#endregion
export { reloadTaskRuntimeStateFromStore as n, ensureTaskRuntimeStateReady as t };
