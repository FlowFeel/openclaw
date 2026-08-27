import { r as MigrationItem } from "../../plugin-entry-DICCbWcY.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-CsZu5qLw.js";

//#region extensions/migrate-claude/memory.d.ts
declare function buildMemoryItems(params: {
  source: ClaudeSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
  includeInstructions?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildMemoryItems };