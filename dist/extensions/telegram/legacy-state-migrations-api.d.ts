import { n as OpenClawConfig } from "../../types.openclaw-B2WvMv3k.js";
import { ut as ChannelLegacyStateMigrationPlan } from "../../setup-wizard-types-C896ZHgy.js";
//#region extensions/telegram/src/state-migrations.d.ts
declare function detectTelegramLegacyStateMigrations(params: {
  cfg: OpenClawConfig;
  env: NodeJS.ProcessEnv;
  stateDir?: string;
}): Promise<ChannelLegacyStateMigrationPlan[]>;
//#endregion
export { detectTelegramLegacyStateMigrations };