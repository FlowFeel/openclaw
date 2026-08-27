import { a as MigrationProviderContext, i as MigrationPlan } from "../../plugin-entry-CS8C3z51.js";
import { HermesSource } from "./source.js";

//#region extensions/migrate-hermes/memory.d.ts
declare function isMemoryOnlyMigration(ctx: MigrationProviderContext): boolean;
declare function buildHermesMemoryPlan(ctx: MigrationProviderContext, source: HermesSource): Promise<MigrationPlan>;
//#endregion
export { buildHermesMemoryPlan, isMemoryOnlyMigration };