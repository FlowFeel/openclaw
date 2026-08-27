import { a as MigrationProviderContext, r as MigrationItem } from "../../plugin-entry-V3twzgF5.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BbflXLyB.js";

//#region extensions/migrate-hermes/secrets.d.ts
declare function buildSecretItems(params: {
  config: Record<string, unknown>;
  ctx: MigrationProviderContext;
  source: HermesSource;
  targets: PlannedMigrationTargets;
}): Promise<MigrationItem[]>;
declare function applySecretItem(ctx: MigrationProviderContext, item: MigrationItem, targets: PlannedMigrationTargets): Promise<MigrationItem>;
//#endregion
export { applySecretItem, buildSecretItems };