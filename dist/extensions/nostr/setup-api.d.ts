import { n as ChannelSetupWizard } from "../../setup-wizard-types-B677hB7z.js";
import { u as ChannelSetupAdapter } from "../../manifest-registry-Cbr_emsE.js";
//#region extensions/nostr/src/setup-surface.d.ts
declare const nostrSetupAdapter: ChannelSetupAdapter<{
  name?: string;
  privateKey?: string;
  relayUrls?: string;
  useEnv?: boolean;
}>;
declare const nostrSetupWizard: ChannelSetupWizard;
//#endregion
export { nostrSetupAdapter, nostrSetupWizard };