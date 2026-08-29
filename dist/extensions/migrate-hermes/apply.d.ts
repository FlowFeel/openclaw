import { a as MigrationProviderContext, i as MigrationPlan, n as MigrationApplyResult } from "../../plugin-entry-rqx6-3xm.js";

//#region extensions/migrate-hermes/apply.d.ts
declare function applyHermesPlan(params: {
  ctx: MigrationProviderContext;
  plan?: MigrationPlan;
  runtime?: MigrationProviderContext["runtime"];
}): Promise<MigrationApplyResult>;
//#endregion
export { applyHermesPlan };