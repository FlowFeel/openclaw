import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { n as normalizeAccountId } from "./account-id-CIVg1QNG.js";
import { t as defineChannelSetupContract } from "./setup-contract-v3-D0s84.js";
import { t as formatDocsLink } from "./links-ClIwBcy4.js";
import { t as detectBinary } from "./detect-binary-vcrV2MAh.js";
import { t as createAccountListHelpers } from "./account-helpers-Dal2iRvY.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { i as createPatchedAccountSetupAdapter } from "./setup-helpers-t3GC4Z1N.js";
import { j as setSetupChannelEnabled } from "./setup-wizard-helpers-C8pTV3Ti.js";
import { s as createDetectedBinaryStatus } from "./setup-credential-ASZO-4c5.js";
import "./setup-oCHSAPND.js";
import "./channel-setup-BejEKHbw.js";
import "./setup-tools-DvrgjDew.js";
//#region extensions/raft/src/accounts.ts
const RAFT_CHANNEL_ID = "raft";
const { listAccountIds, resolveDefaultAccountId, resolveAccountConfig: resolveMergedRaftAccountConfig } = createAccountListHelpers(RAFT_CHANNEL_ID, {
	normalizeAccountId,
	omitKeys: ["defaultAccount"],
	implicitDefaultAccount: {
		channelKeys: ["profile"],
		envVars: ["RAFT_PROFILE"]
	}
});
const listRaftAccountIds = listAccountIds;
const resolveDefaultRaftAccountId = resolveDefaultAccountId;
function resolveRaftConfig(cfg) {
	return cfg.channels?.[RAFT_CHANNEL_ID];
}
function resolveRaftAccount(params) {
	const accountId = normalizeAccountId(params.accountId ?? resolveDefaultRaftAccountId(params.cfg));
	const channel = resolveRaftConfig(params.cfg);
	const merged = resolveMergedRaftAccountConfig(params.cfg, accountId);
	const configuredProfile = normalizeOptionalString(merged.profile);
	const envProfile = accountId === "default" ? normalizeOptionalString(process.env.RAFT_PROFILE) : void 0;
	const profile = configuredProfile ?? envProfile ?? null;
	return {
		accountId,
		name: normalizeOptionalString(merged.name),
		enabled: channel?.enabled !== false && merged.enabled !== false,
		configured: Boolean(profile),
		profile
	};
}
//#endregion
//#region extensions/raft/src/setup.ts
const raftSetupContract = defineChannelSetupContract({
	fields: { profile: {
		kind: "string",
		cli: {
			flags: "--profile <profile>",
			description: "Raft CLI profile"
		}
	} },
	legacyAdapter: createPatchedAccountSetupAdapter({
		channelKey: RAFT_CHANNEL_ID,
		buildPatch: (input) => {
			const profile = normalizeOptionalString(input.profile);
			return profile ? { profile } : {};
		},
		validateInput: ({ cfg, accountId, input }) => {
			if (normalizeOptionalString(input.profile) ?? resolveRaftAccount({
				cfg,
				accountId
			}).profile) return null;
			return "Raft requires a CLI profile.";
		}
	})
});
const raftSetupPlugin = {
	id: RAFT_CHANNEL_ID,
	meta: {
		id: RAFT_CHANNEL_ID,
		label: "Raft",
		selectionLabel: "Raft (CLI wake bridge)",
		docsPath: "/channels/raft",
		docsLabel: "raft",
		blurb: "Raft CLI wake bridge for human and agent collaboration.",
		order: 72
	},
	capabilities: { chatTypes: ["direct"] },
	setupContract: raftSetupContract,
	config: {
		listAccountIds: listRaftAccountIds,
		resolveAccount: (cfg, accountId) => resolveRaftAccount({
			cfg,
			accountId
		}),
		defaultAccountId: resolveDefaultRaftAccountId,
		isConfigured: (account) => account.configured,
		isEnabled: (account) => account.enabled
	},
	setupWizard: {
		channel: RAFT_CHANNEL_ID,
		resolveShouldPromptAccountIds: () => false,
		status: createDetectedBinaryStatus({
			channelLabel: "Raft",
			binaryLabel: "raft",
			configuredLabel: "configured",
			unconfiguredLabel: "needs a CLI profile",
			configuredHint: "configured",
			unconfiguredHint: "install and sign in to the Raft CLI",
			configuredScore: 1,
			unconfiguredScore: 4,
			resolveConfigured: ({ cfg, accountId }) => accountId ? resolveRaftAccount({
				cfg,
				accountId
			}).configured : listRaftAccountIds(cfg).some((resolvedAccountId) => resolveRaftAccount({
				cfg,
				accountId: resolvedAccountId
			}).configured),
			resolveBinaryPath: () => "raft",
			detectBinary
		}),
		introNote: {
			title: "Raft setup",
			lines: ["Create a Raft External Agent and sign in with the Raft CLI on this Gateway host.", `Docs: ${formatDocsLink("/channels/raft", "channels/raft")}`]
		},
		credentials: [],
		textInputs: [{
			inputKey: "profile",
			message: "Raft CLI profile",
			currentValue: ({ cfg, accountId }) => resolveRaftAccount({
				cfg,
				accountId
			}).profile ?? void 0,
			validate: ({ value }) => normalizeOptionalString(value) ? void 0 : "Required",
			normalizeValue: ({ value }) => normalizeOptionalString(value) ?? ""
		}],
		completionNote: {
			title: "Raft next steps",
			lines: ["Restart the Gateway, then send a Raft message to wake the agent.", `Docs: ${formatDocsLink("/channels/raft", "channels/raft")}`]
		},
		disable: (cfg) => setSetupChannelEnabled(cfg, RAFT_CHANNEL_ID, false)
	}
};
//#endregion
export { resolveRaftAccount as a, resolveDefaultRaftAccountId as i, RAFT_CHANNEL_ID as n, listRaftAccountIds as r, raftSetupPlugin as t };
