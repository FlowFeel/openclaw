import { r as MigrationItem } from "../../plugin-entry-D2U6D_c3.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-DGMYhMnF.js";

//#region extensions/migrate-claude/skills.d.ts
declare function buildSkillItems(params: {
  source: ClaudeSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
declare function applyGeneratedSkillItem(item: MigrationItem, opts?: {
  overwrite?: boolean;
}): Promise<MigrationItem>;
//#endregion
export { applyGeneratedSkillItem, buildSkillItems };