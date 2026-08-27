import { n as OpenClawConfig } from "../../types.openclaw-C0MxgyRv.js";
import { k as ProviderAuthResult } from "../../types-BNarcMbg.js";
import { readClaudeCliCredentialsForSetup } from "./cli-auth-seam.js";
//#region extensions/anthropic/cli-migration.d.ts
type ClaudeCliCredential = NonNullable<ReturnType<typeof readClaudeCliCredentialsForSetup>>;
/** Build the config migration result for adopting Claude CLI-backed Anthropic defaults. */
declare function buildAnthropicCliMigrationResult(config: OpenClawConfig, credential?: ClaudeCliCredential | null): ProviderAuthResult;
//#endregion
export { buildAnthropicCliMigrationResult };