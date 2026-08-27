import { n as ChannelSetupWizard } from "../../setup-wizard-types-D2FWxWEi.js";
import { u as ChannelSetupAdapter } from "../../manifest-registry-o_CvTWya.js";
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