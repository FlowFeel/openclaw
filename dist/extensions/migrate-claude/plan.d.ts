import { a as MigrationProviderContext, i as MigrationPlan } from "../../plugin-entry-DICCbWcY.js";

//#region extensions/migrate-claude/plan.d.ts
declare function buildClaudePlan(ctx: MigrationProviderContext): Promise<MigrationPlan>;
//#endregion
export { buildClaudePlan };