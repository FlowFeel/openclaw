import { a as MigrationProviderContext, r as MigrationItem } from "../../plugin-entry-rqx6-3xm.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-eTFqDstj.js";

//#region extensions/migrate-hermes/auth.d.ts
declare function buildAuthItems(params: {
  ctx: MigrationProviderContext;
  source: HermesSource;
  targets: PlannedMigrationTargets;
}): Promise<MigrationItem[]>;
declare function applyAuthItem(ctx: MigrationProviderContext, item: MigrationItem, targets: PlannedMigrationTargets): Promise<MigrationItem>;
//#endregion
export { applyAuthItem, buildAuthItems };