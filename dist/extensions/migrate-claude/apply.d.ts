import { a as MigrationProviderContext, i as MigrationPlan, n as MigrationApplyResult } from "../../plugin-entry-D2U6D_c3.js";

//#region extensions/migrate-claude/apply.d.ts
declare function applyClaudePlan(params: {
  ctx: MigrationProviderContext;
  plan?: MigrationPlan;
  runtime?: MigrationProviderContext["runtime"];
}): Promise<MigrationApplyResult>;
//#endregion
export { applyClaudePlan };