import { _ as uniqueStrings } from "./string-normalization-CRyoFBPt.js";
import "./account-id-CIVg1QNG.js";
import { t as defineChannelSetupContract } from "./setup-contract-v3-D0s84.js";
import { t as createSetupTranslator } from "./i18n-BYpJa9f7.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import "./routing-ofUAgwWc.js";
import { N as splitSetupEntries, s as createStandardChannelSetupStatus, x as patchTopLevelChannelConfigSection } from "./setup-wizard-helpers-C8pTV3Ti.js";
import "./setup-oCHSAPND.js";
import "./channel-setup-BejEKHbw.js";
//#region extensions/nostr/src/default-relays.ts
const DEFAULT_RELAYS = ["wss://relay.damus.io", "wss://nos.lol"];
//#endregion
//#region extensions/nostr/src/setup-adapter.ts
const channel = "nostr";
function buildNostrSetupPatch(accountId, patch) {
	return {
		...accountId !== "default" ? { defaultAccount: accountId } : {},
		...patch
	};
}
function parseRelayUrls(raw) {
	const relays = [];
	for (const entry of splitSetupEntries(raw)) {
		try {
			const parsed = new URL(entry);
			if (parsed.protocol !== "ws:" && parsed.protocol !== "wss:") return {
				relays: [],
				error: `Relay must use ws:// or wss:// (${entry})`
			};
		} catch {
			return {
				relays: [],
				error: `Invalid relay URL: ${entry}`
			};
		}
		relays.push(entry);
	}
	return { relays: uniqueStrings(relays) };
}
function createNostrSetupAdapter(params) {
	return {
		resolveAccountId: ({ cfg, accountId }) => params.resolveAccountId(cfg, accountId),
		applyAccountName: ({ cfg, accountId, name }) => patchTopLevelChannelConfigSection({
			cfg,
			channel,
			patch: buildNostrSetupPatch(accountId, name?.trim() ? { name: name.trim() } : {})
		}),
		validateInput: ({ input }) => {
			if (!input.useEnv) {
				const privateKey = input.privateKey?.trim();
				if (!privateKey) return "Nostr requires --private-key or --use-env.";
				if (!params.validatePrivateKey(privateKey)) return "Nostr private key must be valid nsec or 64-character hex.";
			}
			if (input.relayUrls?.trim()) return parseRelayUrls(input.relayUrls).error ?? null;
			return null;
		},
		applyAccountConfig: ({ cfg, accountId, input }) => {
			const relayResult = input.relayUrls?.trim() ? parseRelayUrls(input.relayUrls) : { relays: [] };
			return patchTopLevelChannelConfigSection({
				cfg,
				channel,
				enabled: true,
				clearFields: input.useEnv ? ["privateKey"] : void 0,
				patch: buildNostrSetupPatch(accountId, {
					...input.useEnv ? {} : { privateKey: input.privateKey?.trim() },
					...relayResult.relays.length > 0 ? { relays: relayResult.relays } : {}
				})
			});
		}
	};
}
function createNostrSetupContract(adapter) {
	return defineChannelSetupContract({
		fields: {
			privateKey: {
				kind: "string",
				sensitive: true,
				cli: {
					flags: "--private-key <key>",
					description: "Nostr private key"
				}
			},
			relayUrls: {
				kind: "string",
				cli: {
					flags: "--relay-urls <urls>",
					description: "Nostr relay URLs"
				}
			},
			useEnv: {
				kind: "boolean",
				cli: {
					flags: "--use-env",
					description: "Use NOSTR_PRIVATE_KEY"
				}
			}
		},
		adapter
	});
}
function createNostrSetupStatus(resolveAccount) {
	const t = createSetupTranslator();
	return createStandardChannelSetupStatus({
		channelLabel: "Nostr",
		configuredLabel: t("wizard.channels.statusConfigured"),
		unconfiguredLabel: t("wizard.channels.statusNeedsPrivateKey"),
		configuredHint: t("wizard.channels.statusConfigured"),
		unconfiguredHint: t("wizard.channels.statusNeedsPrivateKey"),
		configuredScore: 1,
		unconfiguredScore: 0,
		includeStatusLine: true,
		resolveConfigured: ({ cfg, accountId }) => resolveAccount({
			cfg,
			accountId
		}).configured,
		resolveExtraStatusLines: ({ cfg }) => {
			return [`Relays: ${resolveAccount({ cfg }).relays.length || DEFAULT_RELAYS.length}`];
		}
	});
}
//#endregion
export { parseRelayUrls as a, createNostrSetupStatus as i, createNostrSetupAdapter as n, DEFAULT_RELAYS as o, createNostrSetupContract as r, buildNostrSetupPatch as t };
