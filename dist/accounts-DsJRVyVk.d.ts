import { Z as GoogleChatAccountConfig } from "./types.openclaw-B2WvMv3k.js";
import { g as tryReadSecretFileSync } from "./accounts-CDFmMDSo.js";
//#region extensions/googlechat/src/accounts.d.ts
type CredentialUnavailableDiagnostic = Extract<ReturnType<typeof tryReadSecretFileSync>, {
  status: "configured_unavailable";
}>["diagnostic"];
type GoogleChatCredentialSource = "file" | "inline" | "env" | "none";
type ResolvedGoogleChatAccount = {
  accountId: string;
  name?: string;
  enabled: boolean;
  config: GoogleChatAccountConfig;
  credentialSource: GoogleChatCredentialSource;
  credentials?: Record<string, unknown>;
  credentialsFile?: string;
  tokenStatus?: "available" | "configured_unavailable" | "missing";
  credentialDiagnostics?: CredentialUnavailableDiagnostic[];
};
//#endregion
export { ResolvedGoogleChatAccount as t };