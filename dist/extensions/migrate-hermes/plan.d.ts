import { a as MigrationProviderContext, i as MigrationPlan } from "../../plugin-entry-rqx6-3xm.js";

//#region extensions/migrate-hermes/plan.d.ts
declare function buildHermesPlan(ctx: MigrationProviderContext): Promise<MigrationPlan>;
//#endregion
export { buildHermesPlan };