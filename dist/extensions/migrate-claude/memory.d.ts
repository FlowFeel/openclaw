import { r as MigrationItem } from "../../plugin-entry-d4GRo0oQ.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BVBvg-GU.js";

//#region extensions/migrate-claude/memory.d.ts
declare function buildMemoryItems(params: {
  source: ClaudeSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
  includeInstructions?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildMemoryItems };