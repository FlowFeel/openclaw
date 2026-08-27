import { n as OpenClawConfig } from "../../types.openclaw-B2WvMv3k.js";
import { k as ProviderAuthResult } from "../../types-DOjBC-h-.js";
import { readClaudeCliCredentialsForSetup } from "./cli-auth-seam.js";
//#region extensions/anthropic/cli-migration.d.ts
type ClaudeCliCredential = NonNullable<ReturnType<typeof readClaudeCliCredentialsForSetup>>;
/** Build the config migration result for adopting Claude CLI-backed Anthropic defaults. */
declare function buildAnthropicCliMigrationResult(config: OpenClawConfig, credential?: ClaudeCliCredential | null): ProviderAuthResult;
//#endregion
export { buildAnthropicCliMigrationResult };