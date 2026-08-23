import { r as MigrationItem } from "../../plugin-entry-i32wLQY9.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-HF1sqiQe.js";

//#region extensions/migrate-hermes/skills.d.ts
declare function buildSkillItems(params: {
  source: HermesSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildSkillItems };