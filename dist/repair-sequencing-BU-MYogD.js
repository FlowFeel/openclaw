import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { t as expectDefined } from "./expect-CyE8FADM.js";
import "./src-COWbwBfI.js";
import { p as normalizeUniqueStringEntries } from "./string-normalization-CRyoFBPt.js";
import { t as sanitizeForLog } from "./ansi-DbP9Z_r_.js";
import { _ as pathExists, r as root } from "./fs-safe-DVaClkIX.js";
import { C as resolveStateDir } from "./paths-CL43LNS6.js";
import { f as resolveDefaultAgentId, i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { n as normalizeAccountId } from "./account-id-CIVg1QNG.js";
import { f as resolveAgentIdFromSessionKey } from "./session-key-DtTE9-Tg.js";
import { N as validateConfigObjectWithPlugins } from "./io-DCw4R0kD.js";
import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-BJTPe7U8.js";
import { h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-BU55lNCH.js";
import { n as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-2PkDmkRl.js";
import { i as GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA, r as normalizeChatChannelId } from "./ids-DcuH-YRr.js";
import "./registry-Ddw5GtUg.js";
import { t as normalizeAnyChannelId } from "./registry-normalize-0Yw0pQqw.js";
import "./agent-scope-DyEposw2.js";
import { a as resolveChannelDmAllowFrom, s as setCanonicalDmAllowFrom } from "./dm-access-Bq5cULcy.js";
import { i as materializePluginAutoEnableCandidates, t as applyPluginAutoEnable } from "./plugin-auto-enable-_DwpU41E.js";
import { D as validateSkillProposalRecord, O as validateSkillProposalRollback, V as hashSkillProposalContent, a as readSkillProposal, n as importLegacySkillProposal, v as readSkillProposalRollback } from "./store-CR6r1z2u.js";
import { t as removePathWithinRoot } from "./fs-safe-remove-CHFZ58Nt.js";
import { d as resolveWorkspaceStateIdentity } from "./workspace-state-store-BLsJEXll.js";
import { s as readChannelAllowFromStore } from "./pairing-store-CTy8U4zO.js";
import { n as maybeRepairCodexRoutes } from "./codex-route-warnings-DjZor_9F.js";
import { r as VERSION_BOUND_RUNTIME_PLUGIN_POLICY_IDS_BY_SURFACE } from "./configured-runtime-plugin-installs-BhHRpPZt.js";
import { d as isUpdatePackageSwapInProgress } from "./update-phase-BxFkFmnw.js";
import { t as asObjectRecord } from "./object-BsiS9JXh.js";
import { t as repairMissingConfiguredPluginInstalls } from "./missing-configured-plugin-install-nAPoV3DU.js";
import { n as maybeMigrateAuthProfileJsonStoresToSqlite, r as maybeRepairOpenAICodexAuthConfig, t as collectOpenAICodexAuthProfileStoreIdMap } from "./doctor-auth-flat-profiles-CU4E066U.js";
import { t as maybeRepairLegacyOAuthSidecarProfiles } from "./doctor-auth-oauth-sidecar-D-IKqiWr.js";
import { t as applyDoctorConfigMutation } from "./config-mutation-state-DO_xkJud.js";
import { o as maybeRepairPluginOpenClawHostLinks, r as maybeRepairStaleManagedNpmBundledPlugins } from "./doctor-plugin-registry-pBUS2M9t.js";
import { t as getDoctorChannelCapabilities } from "./channel-capabilities-CXsNRda6.js";
import { n as maybeRepairOpenPolicyAllowFrom, r as resolveAllowFromMode } from "./open-policy-allowfrom-S3reg1Ih.js";
import { n as hasAllowFromEntries, t as scanEmptyAllowlistPolicyWarnings } from "./empty-allowlist-scan-DUpxETVD.js";
import { n as maybeRepairBundledPluginLoadPaths } from "./bundled-plugin-load-paths-ImwtMLbM.js";
import { a as collectChannelDoctorRepairMutations, s as createChannelDoctorEmptyAllowlistPolicyHooks, t as collectChannelDoctorCompatibilityMutations } from "./channel-doctor-DKWNuONN.js";
import { n as maybeRepairContextEngineHostCompatibility } from "./context-engine-host-compat-CZ08hTvy.js";
import { r as maybeRepairExecSafeBinProfiles } from "./exec-safe-bins-BAlOY5fZ.js";
import { n as maybeRepairLegacyToolsBySenderKeys } from "./legacy-tools-by-sender-BPmUKE5J.js";
import { t as cleanupLegacyPluginDependencyState } from "./plugin-dependency-cleanup-BaOwFkXm.js";
import { t as repairStaleAgentModelRefs } from "./stale-agent-model-ref-repair-BpuFycZe.js";
import { n as maybeRepairStaleConfiguredAuthOrders } from "./stale-auth-order-kcITg7H7.js";
import { n as repairStaleOAuthProfileShadows } from "./stale-oauth-profile-shadows-CIMzxMF0.js";
import { r as maybeRepairStalePluginConfig } from "./stale-plugin-config-C8uWqvMj.js";
import { n as maybeRepairStaleSubagentAllowlists } from "./stale-subagent-allowlist-CTpN_RmO.js";
import { existsSync } from "node:fs";
import path from "node:path";
//#region src/infra/state-migrations.onboarding-recommendations.ts
const LEGACY_ONBOARDING_RECOMMENDATIONS_KEY = "primary";
/** Move the shipped singleton row into the default workspace during doctor repair. */
function migrateLegacyOnboardingRecommendationsScope(params) {
	const env = params.env ?? process.env;
	if (!existsSync(resolveOpenClawStateSqlitePath(env))) return {
		changes: [],
		warnings: []
	};
	try {
		const workspaceKey = resolveWorkspaceStateIdentity(resolveAgentWorkspaceDir(params.cfg, resolveDefaultAgentId(params.cfg), env)).workspaceKey;
		const outcome = runOpenClawStateWriteTransaction(({ db: database }) => {
			const db = getNodeSqliteKysely(database);
			if (!executeSqliteQueryTakeFirstSync(database, db.selectFrom("onboarding_recommendations").select("config_key").where("config_key", "=", LEGACY_ONBOARDING_RECOMMENDATIONS_KEY))) return "unchanged";
			if (executeSqliteQueryTakeFirstSync(database, db.selectFrom("onboarding_recommendations").select("config_key").where("config_key", "=", workspaceKey))) {
				executeSqliteQuerySync(database, db.deleteFrom("onboarding_recommendations").where("config_key", "=", LEGACY_ONBOARDING_RECOMMENDATIONS_KEY));
				return "removed-legacy";
			}
			executeSqliteQuerySync(database, db.updateTable("onboarding_recommendations").set({ config_key: workspaceKey }).where("config_key", "=", LEGACY_ONBOARDING_RECOMMENDATIONS_KEY));
			return "migrated";
		}, { env }, { operationLabel: "onboarding.recommendations.migrate-scope" });
		if (outcome === "migrated") return {
			changes: ["Migrated onboarding recommendation state to the default workspace scope."],
			warnings: []
		};
		if (outcome === "removed-legacy") return {
			changes: ["Removed ambiguous legacy onboarding recommendation state; kept the default workspace record."],
			warnings: []
		};
		return {
			changes: [],
			warnings: []
		};
	} catch (err) {
		return {
			changes: [],
			warnings: [`Failed migrating onboarding recommendation workspace scope: ${String(err)}`]
		};
	}
}
//#endregion
//#region src/commands/doctor-skill-workshop-sqlite.ts
/** Doctor-owned migration of Skill Workshop proposal metadata into shared SQLite. */
const WORKSHOP_DIR = "skill-workshop";
const PROPOSALS_DIR = `${WORKSHOP_DIR}/proposals`;
const MANIFEST_PATH = `${WORKSHOP_DIR}/proposals.json`;
const MAX_RECORD_BYTES = 1024 * 1024;
const MAX_ROLLBACK_BYTES = 128 * 1024 * 1024;
const PROPOSAL_ID_PATTERN = /^[a-z0-9][a-z0-9-]{5,120}$/;
function isNotFoundError(error) {
	const code = error.code;
	return code === "not-found" || code === "ENOENT";
}
async function readJson(rootDir, relativePath, maxBytes) {
	const read = await rootDir.read(relativePath, {
		hardlinks: "reject",
		maxBytes,
		symlinks: "reject"
	});
	return JSON.parse(read.buffer.toString("utf8"));
}
function proposalWorkspace(record) {
	return path.dirname(path.dirname(path.resolve(record.target.skillDir)));
}
function configuredAgentIds(config) {
	return [...new Set([resolveDefaultAgentId(config), ...listAgentIds(config)].map(normalizeAgentId))];
}
function inferOwnerAgentId(params) {
	if (params.record.origin?.agentId) return normalizeAgentId(params.record.origin.agentId);
	if (params.record.origin?.sessionKey) try {
		return resolveAgentIdFromSessionKey(params.record.origin.sessionKey, resolveDefaultAgentId(params.config));
	} catch {}
	const agentIds = configuredAgentIds(params.config);
	const workspaceMatches = agentIds.filter((agentId) => path.resolve(resolveAgentWorkspaceDir(params.config, agentId, params.env)) === path.resolve(params.workspaceDir));
	if (workspaceMatches.length === 1) return workspaceMatches[0];
	return agentIds.length === 1 ? agentIds[0] : void 0;
}
async function readLegacyRollback(stateRoot, proposalId) {
	try {
		const rollback = validateSkillProposalRollback(await readJson(stateRoot, `${PROPOSALS_DIR}/${proposalId}/rollback.json`, MAX_ROLLBACK_BYTES));
		if (!rollback.ok) throw new Error(rollback.error.message);
		if (rollback.value.proposalId !== proposalId) throw new Error("invalid rollback metadata");
		return rollback.value;
	} catch (error) {
		if (isNotFoundError(error)) return;
		throw error;
	}
}
async function verifyImportedProposal(params) {
	const imported = (await readSkillProposal(params.record.id, { env: params.env }, {}, { reconcile: false }))?.record;
	if (!imported || imported.draftHash !== params.record.draftHash || imported.target.skillFile !== params.record.target.skillFile) throw new Error("SQLite verification failed");
	if (params.rollback && !await readSkillProposalRollback(params.record.id, { env: params.env })) throw new Error("SQLite rollback verification failed");
}
async function migrateProposal(params) {
	const proposalDir = `${PROPOSALS_DIR}/${params.proposalId}`;
	const record = validateSkillProposalRecord(await readJson(params.stateRoot, `${proposalDir}/proposal.json`, MAX_RECORD_BYTES));
	if (!record.ok) throw new Error(record.error.message);
	if (record.value.id !== params.proposalId) throw new Error("invalid proposal metadata");
	if (hashSkillProposalContent((await params.stateRoot.read(`${proposalDir}/PROPOSAL.md`, {
		hardlinks: "reject",
		maxBytes: MAX_RECORD_BYTES,
		symlinks: "reject"
	})).buffer.toString("utf8")) !== record.value.draftHash) throw new Error("proposal draft hash does not match proposal metadata");
	const rollback = await readLegacyRollback(params.stateRoot, params.proposalId);
	const workspaceDir = proposalWorkspace(record.value);
	const ownerAgentId = inferOwnerAgentId({
		config: params.config,
		env: params.env,
		record: record.value,
		workspaceDir
	});
	if (!ownerAgentId) throw new Error("owning agent could not be inferred; legacy metadata was retained for manual recovery");
	const result = importLegacySkillProposal({
		record: record.value,
		rollback,
		ownerAgentId,
		workspaceDir,
		store: { env: params.env }
	});
	await verifyImportedProposal({
		env: params.env,
		record: record.value,
		rollback
	});
	if (rollback) await params.stateRoot.remove(`${proposalDir}/rollback.json`);
	await params.stateRoot.remove(`${proposalDir}/proposal.json`);
	return result;
}
/** Import verified legacy proposal sidecars, then remove only the imported JSON metadata. */
async function migrateLegacySkillWorkshopProposals(params) {
	const env = params.env ?? process.env;
	const stateDir = resolveStateDir(env);
	if (!await pathExists(path.join(stateDir, PROPOSALS_DIR))) {
		if (!await pathExists(path.join(stateDir, MANIFEST_PATH))) return {
			changes: [],
			warnings: [],
			detected: 0,
			migrated: 0
		};
		await removePathWithinRoot({
			rootDir: stateDir,
			relativePath: MANIFEST_PATH
		});
		return {
			changes: ["Removed the empty legacy Skill Workshop proposal index."],
			warnings: [],
			detected: 0,
			migrated: 0
		};
	}
	const stateRoot = await root(stateDir);
	let entries;
	try {
		entries = await stateRoot.list(PROPOSALS_DIR, { withFileTypes: true });
	} catch (error) {
		if (error.code === "not-found") return {
			changes: [],
			warnings: [],
			detected: 0,
			migrated: 0
		};
		return {
			changes: [],
			warnings: [`Failed to inspect legacy Skill Workshop proposals: ${String(error)}`],
			detected: 0,
			migrated: 0
		};
	}
	const proposalIds = entries.filter((entry) => entry.isDirectory && PROPOSAL_ID_PATTERN.test(entry.name)).map((entry) => entry.name).toSorted((left, right) => left.localeCompare(right));
	const warnings = [];
	let migrated = 0;
	for (const proposalId of proposalIds) try {
		await migrateProposal({
			config: params.config,
			env,
			proposalId,
			stateRoot
		});
		migrated += 1;
	} catch (error) {
		if (isNotFoundError(error)) {
			if (await readSkillProposal(proposalId, { env }, {}, { reconcile: false })) continue;
		}
		warnings.push(`Failed to migrate Skill Workshop proposal ${proposalId}: ${String(error)}`);
	}
	await removePathWithinRoot({
		rootDir: stateDir,
		relativePath: MANIFEST_PATH
	}).catch((error) => {
		if (!isNotFoundError(error)) warnings.push(`Failed to remove legacy Skill Workshop proposal index: ${String(error)}`);
	});
	return {
		changes: migrated > 0 ? [`Migrated ${migrated} Skill Workshop proposal${migrated === 1 ? "" : "s"} into shared SQLite.`] : [],
		warnings,
		detected: proposalIds.length,
		migrated
	};
}
//#endregion
//#region src/commands/doctor/shared/allowfrom-fallback-migration.ts
const PSEUDO_CHANNEL_KEYS = /* @__PURE__ */ new Set([
	"defaults",
	"modelByChannel",
	"tools"
]);
const ACCOUNT_SCHEMA_WILDCARD = "*";
const CHANNEL_GROUP_ALLOW_FROM_PATH = ["groupAllowFrom"];
const ACCOUNT_GROUP_ALLOW_FROM_PATH = [
	"accounts",
	ACCOUNT_SCHEMA_WILDCARD,
	"groupAllowFrom"
];
function isDisabled(record) {
	return record.enabled === false;
}
function normalizeAllowFrom(raw) {
	return normalizeUniqueStringEntries(Array.isArray(raw) ? raw : []);
}
function readGroupAllowFrom(record) {
	return normalizeAllowFrom(record.groupAllowFrom);
}
function readDmAllowFrom(params) {
	return normalizeAllowFrom(resolveChannelDmAllowFrom({
		account: params.account,
		parent: params.parent,
		mode: getDoctorChannelCapabilities(params.channelName).dmAllowFromMode
	}));
}
function readOwnDmAllowFrom(params) {
	return normalizeAllowFrom(resolveChannelDmAllowFrom({
		account: params.account,
		mode: getDoctorChannelCapabilities(params.channelName).dmAllowFromMode
	}));
}
function findGeneratedChannelConfigSchema(channelName) {
	const normalizedChannelId = normalizeAnyChannelId(channelName);
	return GENERATED_BUNDLED_CHANNEL_CONFIG_METADATA.find((entry) => entry.channelId === channelName || entry.channelId === normalizedChannelId)?.schema;
}
function schemaAllowsConfigPath(schema, path) {
	if (path.length === 0) return true;
	const node = asObjectRecord(schema);
	if (!node) return true;
	const anyOf = Array.isArray(node.anyOf) ? node.anyOf : void 0;
	if (anyOf) return anyOf.some((branch) => schemaAllowsConfigPath(branch, path));
	const oneOf = Array.isArray(node.oneOf) ? node.oneOf : void 0;
	if (oneOf) return oneOf.some((branch) => schemaAllowsConfigPath(branch, path));
	const allOf = Array.isArray(node.allOf) ? node.allOf : void 0;
	if (allOf) return allOf.every((branch) => schemaAllowsConfigPath(branch, path));
	const segment = expectDefined(path[0], "schema path segment");
	const rest = path.slice(1);
	const properties = asObjectRecord(node.properties);
	if (segment !== ACCOUNT_SCHEMA_WILDCARD && properties && Object.hasOwn(properties, segment)) return schemaAllowsConfigPath(expectDefined(properties[segment], "schema property"), rest);
	const additionalProperties = node.additionalProperties;
	if (additionalProperties === false) return false;
	if (additionalProperties && typeof additionalProperties === "object") return schemaAllowsConfigPath(additionalProperties, rest);
	return true;
}
function generatedSchemaAllowsGroupAllowFrom(channelName, path) {
	const schema = findGeneratedChannelConfigSchema(channelName);
	return schema !== void 0 && schemaAllowsConfigPath(schema, path);
}
function migrateRecord(params) {
	if (!params.canWriteGroupAllowFrom) return false;
	if (readGroupAllowFrom(params.account).length > 0) return false;
	if (params.parent && params.parentHadGroupAllowFrom) return false;
	const ownAllowFrom = readOwnDmAllowFrom(params);
	if (params.parent && ownAllowFrom.length === 0 && readGroupAllowFrom(params.parent).length > 0) return false;
	const allowFrom = readDmAllowFrom(params);
	if (allowFrom.length === 0) return false;
	params.account.groupAllowFrom = allowFrom;
	const noun = allowFrom.length === 1 ? "entry" : "entries";
	params.changes.push(`${params.prefix}.groupAllowFrom: copied ${allowFrom.length} sender ${noun} from allowFrom for explicit group allowlist.`);
	return true;
}
/** Copy legacy allowFrom entries into groupAllowFrom where channel metadata permits fallback. */
function maybeRepairGroupAllowFromFallback(cfg) {
	if (!asObjectRecord(cfg.channels)) return {
		config: cfg,
		changes: []
	};
	const next = structuredClone(cfg);
	const nextChannels = next.channels;
	const changes = [];
	for (const [channelName, channelConfig] of Object.entries(nextChannels)) {
		if (PSEUDO_CHANNEL_KEYS.has(channelName) || !channelConfig || typeof channelConfig !== "object") continue;
		if (isDisabled(channelConfig)) continue;
		if (!getDoctorChannelCapabilities(channelName).groupAllowFromFallbackToAllowFrom) continue;
		const hadGroupAllowFrom = readGroupAllowFrom(channelConfig).length > 0;
		migrateRecord({
			account: channelConfig,
			canWriteGroupAllowFrom: generatedSchemaAllowsGroupAllowFrom(channelName, CHANNEL_GROUP_ALLOW_FROM_PATH),
			channelName,
			changes,
			prefix: `channels.${channelName}`
		});
		const accounts = asObjectRecord(channelConfig.accounts);
		if (!accounts) continue;
		const canWriteAccountGroupAllowFrom = generatedSchemaAllowsGroupAllowFrom(channelName, ACCOUNT_GROUP_ALLOW_FROM_PATH);
		for (const [accountId, accountConfig] of Object.entries(accounts)) {
			const account = asObjectRecord(accountConfig);
			if (!account || isDisabled(account)) continue;
			migrateRecord({
				account,
				canWriteGroupAllowFrom: canWriteAccountGroupAllowFrom,
				channelName,
				changes,
				parent: channelConfig,
				parentHadGroupAllowFrom: hadGroupAllowFrom,
				prefix: `channels.${channelName}.accounts.${accountId}`
			});
		}
	}
	if (changes.length === 0) return {
		config: cfg,
		changes: []
	};
	return {
		config: next,
		changes
	};
}
//#endregion
//#region src/commands/doctor/shared/allowlist-policy-repair.ts
/** Restore missing allowFrom entries for allowlist DM policies from persisted pairing stores. */
async function maybeRepairAllowlistPolicyAllowFrom(cfg) {
	const channels = cfg.channels;
	if (!channels || typeof channels !== "object") return {
		config: cfg,
		changes: []
	};
	const next = structuredClone(cfg);
	const changes = [];
	const applyRecoveredAllowFrom = (params) => {
		const count = params.allowFrom.length;
		const noun = count === 1 ? "entry" : "entries";
		setCanonicalDmAllowFrom({
			entry: params.account,
			mode: params.mode,
			allowFrom: params.allowFrom,
			pathPrefix: params.prefix,
			changes,
			reason: `restored ${count} sender ${noun} from pairing store (dmPolicy="allowlist").`
		});
	};
	const recoverAllowFromForAccount = async (params) => {
		const dmEntry = params.account.dm;
		const dm = dmEntry && typeof dmEntry === "object" && !Array.isArray(dmEntry) ? dmEntry : void 0;
		if ((params.account.dmPolicy ?? dm?.policy) !== "allowlist") return;
		const topAllowFrom = params.account.allowFrom;
		const nestedAllowFrom = dm?.allowFrom;
		if (hasAllowFromEntries(topAllowFrom) || hasAllowFromEntries(nestedAllowFrom)) return;
		const normalizedChannelId = normalizeOptionalLowercaseString(normalizeChatChannelId(params.channelName) ?? params.channelName);
		if (!normalizedChannelId) return;
		const normalizedAccountId = normalizeAccountId(params.accountId) || "default";
		const recovered = normalizeUniqueStringEntries(await readChannelAllowFromStore(normalizedChannelId, process.env, normalizedAccountId).catch(() => []));
		if (recovered.length === 0) return;
		applyRecoveredAllowFrom({
			account: params.account,
			allowFrom: recovered,
			mode: resolveAllowFromMode(params.channelName),
			prefix: params.prefix
		});
	};
	const nextChannels = next.channels;
	for (const [channelName, channelConfig] of Object.entries(nextChannels)) {
		if (!channelConfig || typeof channelConfig !== "object") continue;
		if (channelConfig.enabled === false) continue;
		await recoverAllowFromForAccount({
			channelName,
			account: channelConfig,
			prefix: `channels.${channelName}`
		});
		const accounts = asObjectRecord(channelConfig.accounts);
		if (!accounts) continue;
		for (const [accountId, accountConfig] of Object.entries(accounts)) {
			if (!accountConfig || typeof accountConfig !== "object") continue;
			if (accountConfig.enabled === false) continue;
			await recoverAllowFromForAccount({
				channelName,
				account: accountConfig,
				accountId,
				prefix: `channels.${channelName}.accounts.${accountId}`
			});
		}
	}
	if (changes.length === 0) return {
		config: cfg,
		changes: []
	};
	return {
		config: next,
		changes
	};
}
//#endregion
//#region src/commands/doctor/shared/invalid-plugin-config.ts
const PLUGIN_CONFIG_ISSUE_RE = /^plugins\.entries\.([^.]+)\.config(?:\.|$)/;
function scanInvalidPluginConfig(cfg) {
	const validation = validateConfigObjectWithPlugins(cfg);
	if (validation.ok) return [];
	const hits = [];
	const seen = /* @__PURE__ */ new Set();
	for (const issue of validation.issues) {
		if (!issue.message.startsWith("invalid config:")) continue;
		const pluginId = issue.path.match(PLUGIN_CONFIG_ISSUE_RE)?.[1];
		if (!pluginId || seen.has(pluginId)) continue;
		seen.add(pluginId);
		hits.push({
			pluginId,
			pathLabel: `plugins.entries.${pluginId}.config`
		});
	}
	return hits;
}
/** Disable plugin entries and clear config when plugin validation marks their config invalid. */
function maybeRepairInvalidPluginConfig(cfg) {
	const hits = scanInvalidPluginConfig(cfg);
	if (hits.length === 0) return {
		config: cfg,
		changes: []
	};
	const next = structuredClone(cfg);
	const entries = asObjectRecord(next.plugins?.entries);
	if (!entries) return {
		config: cfg,
		changes: []
	};
	const quarantined = [];
	for (const hit of hits) {
		const entry = asObjectRecord(entries[hit.pluginId]);
		if (!entry) continue;
		if ("config" in entry) delete entry.config;
		entry.enabled = false;
		quarantined.push(hit.pluginId);
	}
	if (quarantined.length === 0) return {
		config: cfg,
		changes: []
	};
	return {
		config: next,
		changes: [sanitizeForLog(`- plugins.entries: quarantined ${quarantined.length} invalid plugin config${quarantined.length === 1 ? "" : "s"} (${quarantined.join(", ")})`)]
	};
}
//#endregion
//#region src/commands/doctor/repair-sequencing.ts
/** Run doctor auto-repairs in dependency order and collect sanitized user notes. */
async function runDoctorRepairSequence(params) {
	let state = params.state;
	const changeNotes = [];
	const warningNotes = [];
	const env = params.env ?? process.env;
	const sanitizeLines = (lines) => lines.map((line) => sanitizeForLog(line)).join("\n");
	const appendNotes = (notes, lines) => {
		if (lines && lines.length > 0) notes.push(sanitizeLines(lines));
	};
	const appendRepairNotes = (repair) => {
		appendNotes(changeNotes, repair.changes);
		appendNotes(warningNotes, repair.warnings);
		appendNotes(warningNotes, repair.notices);
	};
	const applyMutation = (mutation) => {
		if (mutation.changes.length > 0) {
			appendNotes(changeNotes, mutation.changes);
			state = applyDoctorConfigMutation({
				state,
				mutation,
				shouldRepair: true
			});
		}
		appendNotes(warningNotes, mutation.warnings);
	};
	const applyRepairStages = async (stages) => {
		for (const repair of stages) applyMutation(await repair(state.candidate));
	};
	for (const mutation of await collectChannelDoctorRepairMutations({
		cfg: state.candidate,
		doctorFixCommand: params.doctorFixCommand,
		env
	})) applyMutation(mutation);
	applyMutation(maybeRepairBundledPluginLoadPaths(state.candidate, env));
	maybeRepairStaleManagedNpmBundledPlugins({
		config: state.candidate,
		env,
		prompter: { shouldRepair: true }
	});
	await maybeRepairPluginOpenClawHostLinks({
		env,
		prompter: { shouldRepair: true }
	});
	const codexRouteRepair = maybeRepairCodexRoutes({
		cfg: state.candidate,
		env,
		shouldRepair: true,
		blockedProviderPlan: params.blockedCodexProviderPlan
	});
	applyMutation({
		config: codexRouteRepair.cfg,
		changes: codexRouteRepair.changes,
		warnings: codexRouteRepair.warnings
	});
	const openAICodexAuthProfileIdMap = collectOpenAICodexAuthProfileStoreIdMap({
		cfg: state.candidate,
		env
	});
	applyMutation(maybeRepairOpenAICodexAuthConfig(state.candidate, { profileIdMap: openAICodexAuthProfileIdMap }));
	applyMutation(await maybeRepairContextEngineHostCompatibility({
		cfg: state.candidate,
		doctorFixCommand: params.doctorFixCommand,
		env
	}));
	const missingConfiguredPluginInstallRepair = await repairMissingConfiguredPluginInstalls({
		cfg: state.candidate,
		env
	});
	if (missingConfiguredPluginInstallRepair.changes.length > 0) {
		appendNotes(changeNotes, missingConfiguredPluginInstallRepair.changes);
		applyMutation(applyPluginAutoEnable({
			config: state.candidate,
			env
		}));
		const repairedPluginIds = missingConfiguredPluginInstallRepair.repairedPluginIds ?? [];
		if (repairedPluginIds.length > 0) {
			applyMutation(materializePluginAutoEnableCandidates({
				config: state.candidate,
				env,
				candidates: repairedPluginIds.map((pluginId) => ({
					pluginId,
					kind: "configured-plugin-repaired"
				}))
			}));
			for (const mutation of collectChannelDoctorCompatibilityMutations(state.candidate, { env })) applyMutation(mutation);
			for (const mutation of await collectChannelDoctorRepairMutations({
				cfg: state.candidate,
				doctorFixCommand: params.doctorFixCommand,
				env
			})) applyMutation(mutation);
		}
	}
	appendNotes(warningNotes, missingConfiguredPluginInstallRepair.warnings);
	appendNotes(warningNotes, missingConfiguredPluginInstallRepair.notices);
	const failedPluginIds = missingConfiguredPluginInstallRepair.failedPluginIds ?? [];
	const hasUnscopedInstallRepairWarnings = missingConfiguredPluginInstallRepair.warnings.length > 0 && failedPluginIds.length === 0;
	const packageSwapInProgress = isUpdatePackageSwapInProgress(env);
	if (!packageSwapInProgress && failedPluginIds.length === 0 && !hasUnscopedInstallRepairWarnings) applyMutation(repairStaleAgentModelRefs(state.candidate, { env }));
	if (!packageSwapInProgress && !hasUnscopedInstallRepairWarnings) applyMutation(maybeRepairStalePluginConfig(state.candidate, env, {
		preservePluginIds: failedPluginIds,
		surfacePreservePluginIds: VERSION_BOUND_RUNTIME_PLUGIN_POLICY_IDS_BY_SURFACE
	}));
	await applyRepairStages([
		maybeRepairInvalidPluginConfig,
		maybeRepairAllowlistPolicyAllowFrom,
		maybeRepairOpenPolicyAllowFrom,
		maybeRepairGroupAllowFromFallback,
		maybeRepairStaleSubagentAllowlists
	]);
	appendNotes(warningNotes, scanEmptyAllowlistPolicyWarnings(state.candidate, {
		doctorFixCommand: params.doctorFixCommand,
		...createChannelDoctorEmptyAllowlistPolicyHooks({
			cfg: state.candidate,
			env
		})
	}));
	await applyRepairStages([maybeRepairLegacyToolsBySenderKeys, maybeRepairExecSafeBinProfiles]);
	appendRepairNotes(await migrateLegacySkillWorkshopProposals({
		config: state.candidate,
		env
	}));
	appendRepairNotes(await cleanupLegacyPluginDependencyState({ env }));
	appendRepairNotes(migrateLegacyOnboardingRecommendationsScope({
		cfg: state.candidate,
		env
	}));
	const legacyOAuthSidecarRepair = await maybeRepairLegacyOAuthSidecarProfiles({
		cfg: state.candidate,
		prompter: { confirmAutoFix: async () => true },
		emitNotes: false,
		env
	});
	appendRepairNotes(legacyOAuthSidecarRepair);
	const staleOAuthShadowRepair = await repairStaleOAuthProfileShadows({
		cfg: state.candidate,
		env
	});
	appendRepairNotes(staleOAuthShadowRepair);
	const authProfileSqliteMigration = await maybeMigrateAuthProfileJsonStoresToSqlite({
		cfg: state.candidate,
		prompter: { confirmAutoFix: async () => true },
		env,
		openAICodexAuthProfileIdMap
	});
	if (authProfileSqliteMigration.configChanged) state = applyDoctorConfigMutation({
		state,
		mutation: {
			config: state.candidate,
			changes: ["Auth profile SQLite migration updated auth.profiles."]
		},
		shouldRepair: true
	});
	appendRepairNotes(authProfileSqliteMigration);
	applyMutation(maybeRepairStaleConfiguredAuthOrders({
		cfg: state.candidate,
		env
	}));
	const authProfilesRepaired = legacyOAuthSidecarRepair.changes.length > 0 || staleOAuthShadowRepair.changes.length > 0 || authProfileSqliteMigration.changes.length > 0;
	return {
		state,
		changeNotes,
		warningNotes,
		authProfilesRepaired,
		...openAICodexAuthProfileIdMap.size > 0 ? { openAICodexAuthProfileIdMap } : {}
	};
}
//#endregion
export { runDoctorRepairSequence };
