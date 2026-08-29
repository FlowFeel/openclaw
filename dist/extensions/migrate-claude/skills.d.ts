import { r as MigrationItem } from "../../plugin-entry-d4GRo0oQ.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BVBvg-GU.js";

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