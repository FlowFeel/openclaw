import { n as OpenClawConfig } from "./types.openclaw-B2WvMv3k.js";
import { n as ChannelSetupWizard, t as ChannelSetupDmPolicy } from "./setup-wizard-types-C896ZHgy.js";
import { d as ChannelSetupInput, f as RuntimeEnv } from "./manifest-registry-BChEetzl.js";
//#endregion
//#region extensions/zalo/src/setup-core.d.ts
declare const zaloSetupAdapter: {
  singleAccountKeysToMove: string[];
  resolveAccountId?: ((params: {
    cfg: OpenClawConfig;
    accountId?: string;
    input?: ChannelSetupInput | undefined;
  }) => string) | undefined;
  prepareAccountConfigInput?: ((params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: ChannelSetupInput;
    runtime: RuntimeEnv;
  }) => ChannelSetupInput | Promise<ChannelSetupInput>) | undefined;
  resolveBindingAccountId?: (params: {
    cfg: OpenClawConfig;
    agentId: string;
    accountId?: string;
  }) => string | undefined;
  applyAccountName?: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    name?: string;
  }) => OpenClawConfig;
  applyAccountConfig: (params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: ChannelSetupInput;
  }) => OpenClawConfig;
  afterAccountConfigWritten?: ((params: {
    previousCfg: OpenClawConfig;
    cfg: OpenClawConfig;
    accountId: string;
    input: ChannelSetupInput;
    runtime: RuntimeEnv;
  }) => Promise<void> | void) | undefined;
  validateInput?: ((params: {
    cfg: OpenClawConfig;
    accountId: string;
    input: ChannelSetupInput;
  }) => string | null) | undefined;
  namedAccountPromotionKeys?: readonly string[];
  resolveSingleAccountPromotionTarget?: (params: {
    channel: Record<string, unknown>;
  }) => string | undefined;
};
declare const zaloDmPolicy: ChannelSetupDmPolicy & {
  promptAllowFrom: NonNullable<ChannelSetupDmPolicy["promptAllowFrom"]>;
};
declare function createZaloSetupWizardProxy(loadWizard: () => Promise<ChannelSetupWizard>): ChannelSetupWizard;
declare namespace setup_surface_d_exports {
  export { zaloSetupAdapter, zaloSetupWizard$1 as zaloSetupWizard };
}
declare const zaloSetupWizard$1: ChannelSetupWizard;
//#endregion
//#region extensions/zalo/setup-api.d.ts
type SetupSurfaceModule = typeof setup_surface_d_exports;
declare const zaloSetupWizard: SetupSurfaceModule["zaloSetupWizard"];
//#endregion
export { zaloSetupAdapter as i, createZaloSetupWizardProxy as n, zaloDmPolicy as r, zaloSetupWizard as t };