import { gt as PluginRuntime } from "../../plugin-entry-D2U6D_c3.js";
import { n as OpenClawConfig } from "../../types.openclaw-_47ZKysp.js";
import { t as getPluginRuntimeGatewayRequestScope } from "../../plugin-runtime-Cp_AnYDe.js";
import { n as resolveNostrAccount, r as NostrProfile, t as ResolvedNostrAccount } from "../../types-DiyNE9yO.js";
import { t as nostrPlugin } from "../../channel-C5CFU23W.js";
import { IncomingMessage, ServerResponse } from "node:http";

//#region extensions/nostr/src/nostr-profile-http.d.ts
interface NostrProfileHttpContext {
  /** Get current profile from config */
  getConfigProfile: (accountId: string) => NostrProfile | undefined;
  /** Update profile in config (after successful publish) */
  updateConfigProfile: (accountId: string, profile: NostrProfile) => Promise<void>;
  /** Get account's public key and relays */
  getAccountInfo: (accountId: string) => {
    pubkey: string;
    relays: string[];
  } | null;
  /** Logger */
  log?: {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
  };
}
declare function createNostrProfileHttpHandler(ctx: NostrProfileHttpContext): (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
//#endregion
//#region extensions/nostr/src/runtime.d.ts
declare const setNostrRuntime: (next: PluginRuntime) => void, getNostrRuntime: () => PluginRuntime;
//#endregion
export { type OpenClawConfig, type PluginRuntime, type ResolvedNostrAccount, createNostrProfileHttpHandler, getNostrRuntime, getPluginRuntimeGatewayRequestScope, nostrPlugin, resolveNostrAccount, setNostrRuntime };