import { r as MigrationItem } from "../../plugin-entry-CS8C3z51.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BT2ucdLL.js";

//#region extensions/migrate-hermes/skills.d.ts
declare function buildSkillItems(params: {
  source: HermesSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildSkillItems };