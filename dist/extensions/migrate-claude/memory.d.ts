import { r as MigrationItem } from "../../plugin-entry-D2U6D_c3.js";
import { ClaudeSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-DGMYhMnF.js";

//#region extensions/migrate-claude/memory.d.ts
declare function buildMemoryItems(params: {
  source: ClaudeSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
  includeInstructions?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildMemoryItems };