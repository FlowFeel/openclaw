import { a as MigrationProviderContext, i as MigrationPlan } from "../../plugin-entry-DZ50A-uD.js";

//#region extensions/migrate-claude/plan.d.ts
declare function buildClaudePlan(ctx: MigrationProviderContext): Promise<MigrationPlan>;
//#endregion
export { buildClaudePlan };