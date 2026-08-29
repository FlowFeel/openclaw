import { n as OpenClawConfig } from "../../types.openclaw-B_WTBPdp.js";
import { ut as ChannelLegacyStateMigrationPlan } from "../../setup-wizard-types-CdHl9mdg.js";
//#region extensions/telegram/src/state-migrations.d.ts
declare function detectTelegramLegacyStateMigrations(params: {
  cfg: OpenClawConfig;
  env: NodeJS.ProcessEnv;
  stateDir?: string;
}): Promise<ChannelLegacyStateMigrationPlan[]>;
//#endregion
export { detectTelegramLegacyStateMigrations };