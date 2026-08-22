import { n as InstalledPluginIndexRefreshReason, t as InstalledPluginIndex } from "./installed-plugin-index-types-COVojO1x.js";
import { DatabaseSync } from "node:sqlite";

//#region src/plugins/installed-plugin-index-store.d.ts
/** Freshness state for the persisted installed plugin index. */
type InstalledPluginIndexStoreState = "missing" | "fresh" | "stale";
type InstalledPluginIndexStoreInspection = {
  state: InstalledPluginIndexStoreState;
  refreshReasons: readonly InstalledPluginIndexRefreshReason[];
  persisted: InstalledPluginIndex | null;
  current: InstalledPluginIndex;
};
//#endregion
export { InstalledPluginIndexStoreInspection as t };