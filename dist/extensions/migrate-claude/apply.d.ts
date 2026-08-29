import { a as MigrationProviderContext, i as MigrationPlan, n as MigrationApplyResult } from "../../plugin-entry-d4GRo0oQ.js";

//#region extensions/migrate-claude/apply.d.ts
declare function applyClaudePlan(params: {
  ctx: MigrationProviderContext;
  plan?: MigrationPlan;
  runtime?: MigrationProviderContext["runtime"];
}): Promise<MigrationApplyResult>;
//#endregion
export { applyClaudePlan };