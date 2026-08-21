import { a as deleteTaskRegistryRecordFromSqlite, c as loadTaskRegistryStateFromSqlite, d as upsertTaskRegistryRecordToSqlite, i as deleteTaskDeliveryStateFromSqlite, l as saveTaskRegistryStateToSqlite, n as closeTaskRegistryDatabase, o as listTaskRegistryRecordsByOwnerKeyFromSqlite, p as upsertTaskWithDeliveryStateToSqlite, r as deleteTaskAndDeliveryStateFromSqlite, u as upsertTaskDeliveryStateToSqlite } from "./task-registry.store.sqlite-7VY-WxbM.js";
//#region src/tasks/task-registry.store.ts
const defaultTaskRegistryStore = {
	loadSnapshot: loadTaskRegistryStateFromSqlite,
	saveSnapshot: saveTaskRegistryStateToSqlite,
	listTasksForOwnerKey: listTaskRegistryRecordsByOwnerKeyFromSqlite,
	upsertTaskWithDeliveryState: upsertTaskWithDeliveryStateToSqlite,
	upsertTask: upsertTaskRegistryRecordToSqlite,
	deleteTaskWithDeliveryState: deleteTaskAndDeliveryStateFromSqlite,
	deleteTask: deleteTaskRegistryRecordFromSqlite,
	upsertDeliveryState: upsertTaskDeliveryStateToSqlite,
	deleteDeliveryState: deleteTaskDeliveryStateFromSqlite,
	close: closeTaskRegistryDatabase
};
let configuredTaskRegistryStore = defaultTaskRegistryStore;
let configuredTaskRegistryObservers = null;
function getTaskRegistryStore() {
	return configuredTaskRegistryStore;
}
function getTaskRegistryObservers() {
	return configuredTaskRegistryObservers;
}
function configureTaskRegistryRuntime(params) {
	if (params.store) configuredTaskRegistryStore = params.store;
	if ("observers" in params) configuredTaskRegistryObservers = params.observers ?? null;
}
function resetTaskRegistryRuntimeForTests() {
	configuredTaskRegistryStore.close?.();
	configuredTaskRegistryStore = defaultTaskRegistryStore;
	configuredTaskRegistryObservers = null;
}
//#endregion
export { resetTaskRegistryRuntimeForTests as i, getTaskRegistryObservers as n, getTaskRegistryStore as r, configureTaskRegistryRuntime as t };
