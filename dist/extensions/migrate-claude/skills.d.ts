import { r as MigrationItem } from "../../plugin-entry-DICCbWcY.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-CsZu5qLw.js";

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