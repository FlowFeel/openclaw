import { o as redactSensitiveUrlLikeString } from "./redact-sensitive-url-YLuImt1m.js";
import "./src-COWbwBfI.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import { c as redactSensitiveText } from "./redact-DUpJZuMu.js";
import { t as assertExperimentalClawsEnabled } from "./experimental-BMzbGmT5.js";
import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import { l as normalizeWindowsPathForComparison } from "./path-D8zNGPJM.js";
import { r as root } from "./fs-safe-DVaClkIX.js";
import { i as resolvePathViaExistingAncestorSync } from "./root-path-B97MrUcQ.js";
import { c as assertNoSymlinkParents } from "./regular-file-jv7y-frB.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { t as sleep } from "./sleep-Ce8zcpEF.js";
import { r as readFileDescriptorBoundedSync } from "./boundary-file-read-CPk48AYJ.js";
import "./boundary-path-8uj3r-Aa.js";
import { a as writeRuntimeJson, r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { i as listAgentIds, m as toAgentEntriesRecord, n as listAgentEntries, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { t as DEFAULT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import "./path-guards-C3glTcy2.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { h as runOpenClawStateWriteTransaction, u as openExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-BU55lNCH.js";
import "./agent-scope-DyEposw2.js";
import { S as normalizeClawHubSha256Integrity } from "./clawhub-Clykbwlp.js";
import { t as parseDurationMs } from "./parse-duration-Be19e01j.js";
import { h as redactSensitiveArgv } from "./io.audit-CVIGoBrK.js";
import { l as AVATAR_MAX_BYTES, n as isAvatarDataUrl, r as isAvatarHttpUrl } from "./avatar-policy-BX3hGmH_.js";
import { _ as resolveToolProfilePolicy, p as expandToolGroups } from "./tool-policy-CrjVfI-s.js";
import { r as normalizeConfiguredMcpServers } from "./mcp-config-normalize-UWWF1cpp.js";
import { a as transformConfigFileWithRetry } from "./mutate-j69oSRi2.js";
import "./config-UtpOr1Uw.js";
import { t as resolveLocalProviderAuthEvidence } from "./provider-auth-evidence-COXV0_R-.js";
import { i as resolveSandboxConfigForAgent } from "./config-Cp0gVUpH.js";
import { a as loadCronJobsStoreWithConfigJobsReadOnly, c as resolveCronJobsStorePath } from "./store-865CL89i.js";
import { t as openLocalAgentAvatarFile } from "./identity-avatar-file-GibViNHN.js";
import { n as maintainClawPackageLifecycleLease, t as acquireClawPackageLifecycleLease } from "./claw-package-lifecycle-lease-CHOJplxB.js";
import { n as preflightSkillFromClawHub, t as installSkillFromClawHub } from "./clawhub-DgSLScUf.js";
import { r as resolveHeartbeatSummaryForAgent } from "./heartbeat-summary-S-VZc34p.js";
import { o as resolveRememberAcrossConversations } from "./config-utils-dp-ljmDA.js";
import { n as callGatewayFromCli } from "./gateway-rpc-DDZpjK7K.js";
import { n as setConfiguredMcpServer, r as unsetConfiguredMcpServer, t as listConfiguredMcpServers } from "./mcp-config-2xsKbArn.js";
import { t as withPluginLifecycleLease } from "./plugin-lifecycle-lease-Cz3f3Szj.js";
import { t as installPluginFromClawHub } from "./clawhub-CE8R--1P.js";
import { a as readClawInstallRecord, c as updateClawInstallRecord, i as persistClawPackageRef, l as updateClawInstallRecordStatus, n as deleteClawInstallRecord, r as persistClawInstallRecord, s as readClawPackageRefs, t as CLAW_PACKAGE_REF_SCHEMA_VERSION, u as updateClawPackageRefStatus } from "./provenance-CmnK8gTm.js";
import { A as digestClawMcpServer, B as clawCronGatewayJobMatchesRef, C as CLAW_ADD_PLAN_SCHEMA_VERSION, D as CLAW_MCP_REF_SCHEMA_VERSION, E as CLAW_OUTPUT_STABILITY, F as upsertClawMcpServerRef, G as upsertClawCronRef, H as deleteClawCronRef, I as ClawRemoveError, L as CLAW_CRON_REF_SCHEMA_VERSION, M as planClawMcpServerRemoval, N as readClawMcpServerRefs, O as ClawMcpInstallError, P as readClawMcpServerRefsByName, R as ClawCronInstallError, S as CLAW_REMOVE_PLAN_SCHEMA_VERSION, T as CLAW_INSPECT_RESULT_SCHEMA_VERSION, U as installClawCronJobs, V as clawCronSchedulerJobFromResult, W as readClawCronRefs, _ as parseClawManifest, a as CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION, b as preflightPluginInstall, c as deleteClawWorkspaceFileRecord, d as upsertClawWorkspaceFile, f as readClawManifestFile, g as clawManifestWorkspaceConflictsWithPath, h as MAX_MANAGED_WORKSPACE_BYTES, i as readClawStatus, j as installClawMcpServers, k as deleteClawMcpServerRef, l as readClawWorkspaceActionSource, m as MAX_MANAGED_FILE_BYTES, n as applyClawRemovePlan, o as ClawWorkspaceWriteError, p as MAX_CLAW_MANIFEST_BYTES, r as buildClawRemovePlan, s as createClawWorkspaceFiles, t as CLAW_REMOVE_RESULT_SCHEMA_VERSION, u as readClawWorkspaceFiles, v as parseClawOpenClawProfile, w as CLAW_BOOTSTRAP_FILE_NAMES, x as resolveInstalledClawHubPlugin, y as isPortableClawAvatar, z as clawCronGatewayInput } from "./lifecycle-state-DejuxCrm.js";
import { t as findOverlappingWorkspaceAgentIds } from "./agent-delete-safety-DPcBADNK.js";
import { t as runPluginUninstallCommand } from "./plugins-uninstall-command-CYrHLhwb.js";
import { t as runPluginInstallCommand } from "./plugins-install-command-DnZRNX5A.js";
import { createHash } from "node:crypto";
import { closeSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { lstat, mkdir, realpath, rm, rmdir } from "node:fs/promises";
import { homedir } from "node:os";
import { stringify } from "yaml";
//#region src/claws/packages.ts
var ClawPackageInstallError = class extends Error {
	constructor(code, message, installedPackages) {
		super(message);
		this.code = code;
		this.installedPackages = installedPackages;
		this.name = "ClawPackageInstallError";
	}
};
function packageFromAction(action) {
	const details = action.details;
	if (details?.kind !== "skill" && details?.kind !== "plugin") throw new Error(`Package action ${JSON.stringify(action.id)} has no valid package kind.`);
	if (details.source !== "clawhub" || !details.ref || !details.version || !details.integrity || !normalizeClawHubSha256Integrity(details.integrity)) throw new Error(`Package action ${JSON.stringify(action.id)} is not a pinned ClawHub package with integrity.`);
	if (details.ownerAction !== "install" && details.ownerAction !== "reuse") throw new Error(`Package action ${JSON.stringify(action.id)} has no planned owner state.`);
	if (details.kind === "plugin" && !details.installId) throw new Error(`Package action ${JSON.stringify(action.id)} has no resolved plugin id.`);
	return {
		kind: details.kind,
		source: details.source,
		ref: details.ref,
		version: details.version,
		integrity: details.integrity,
		ownerAction: details.ownerAction,
		...details.installId ? { installId: details.installId } : {},
		...details.riskWarning ? { riskWarning: details.riskWarning } : {}
	};
}
function installerRuntime(runtime) {
	return {
		log: (value) => runtime.log(value),
		error: (value) => runtime.error(value),
		exit: (code) => {
			throw new Error(`Plugin installer exited with code ${code}.`);
		}
	};
}
function ownerInstallIsNewerThanRefs(installedAt, refs) {
	const timestamp = Date.parse(installedAt ?? "");
	return Number.isFinite(timestamp) && refs.length > 0 && refs.every((candidate) => timestamp > candidate.updatedAtMs);
}
function resolveClawPluginSetupRequirements(params) {
	const providers = params.setup?.providers ?? [];
	if (providers.some((provider) => (provider.envVars ?? []).some((name) => Boolean(params.env[name]?.trim())) || resolveLocalProviderAuthEvidence(provider.authEvidence, params.env))) return [];
	return providers.flatMap((provider) => {
		const envVars = provider.envVars ?? [];
		const authEvidence = provider.authEvidence ?? [];
		if (envVars.length === 0 && authEvidence.length === 0) return [];
		return [{
			kind: "plugin-setup",
			plugin: params.pluginId,
			provider: provider.id,
			envVars,
			authMethods: provider.authMethods ?? []
		}];
	});
}
async function preflightClawPackage(pkg, workspaceDir, options = {}) {
	if (pkg.kind === "skill") {
		const result = await preflightSkillFromClawHub({
			workspaceDir,
			slug: pkg.ref,
			version: pkg.version,
			acknowledgeClawHubRisk: true
		});
		return result.ok ? result : {
			ok: false,
			code: result.code,
			message: result.error
		};
	}
	const result = await (options.deps?.preflightPlugin ?? preflightPluginInstall)({
		clawhubPackage: pkg.ref,
		rawSpec: `clawhub:${pkg.ref}@${pkg.version}`,
		expectedVersion: pkg.version
	});
	if (!result.ok && result.code !== "plugin_version_conflict") return {
		ok: false,
		code: result.code,
		message: result.error
	};
	const probe = await (options.deps?.probePlugin ?? installPluginFromClawHub)({
		spec: `clawhub:${pkg.ref}@${pkg.version}`,
		dryRun: true,
		acknowledgeClawHubRisk: true
	});
	if (!probe.ok) return {
		ok: false,
		code: probe.code ?? "plugin_preflight_failed",
		message: probe.error
	};
	const integrity = probe.clawhub.integrity ? normalizeClawHubSha256Integrity(probe.clawhub.integrity) : null;
	if (!integrity) return {
		ok: false,
		code: "plugin_integrity_unavailable",
		message: `Plugin ${pkg.ref}@${pkg.version} did not resolve an artifact integrity.`
	};
	if (!result.ok) return {
		ok: false,
		code: result.code,
		installedVersion: result.installedVersion,
		integrity,
		installId: probe.pluginId,
		...probe.warning ? { warning: probe.warning } : {},
		message: `Plugin ${pkg.ref}@${pkg.version} conflicts with installed version ${result.installedVersion}.`
	};
	if (result.action === "reuse" && (result.installedId !== probe.pluginId || !result.installedIntegrity || normalizeClawHubSha256Integrity(result.installedIntegrity) !== integrity)) return {
		ok: false,
		code: "plugin_integrity_conflict",
		message: `Plugin ${pkg.ref}@${pkg.version} is installed as ${result.installedId} with integrity ${result.installedIntegrity ?? "unknown"}, expected ${probe.pluginId} with ${integrity}.`
	};
	const requirements = resolveClawPluginSetupRequirements({
		pluginId: probe.pluginId,
		setup: probe.setup,
		env: options.env ?? process.env
	});
	return {
		ok: true,
		action: result.action,
		integrity,
		installId: probe.pluginId,
		...requirements.length > 0 ? { requirements } : {},
		...probe.warning ? { warning: probe.warning } : {}
	};
}
async function installClawPackages(plan, options = {}) {
	if (!plan.actions.some((action) => action.kind === "package" && action.details?.kind === "plugin")) return await installClawPackagesUnlocked(plan, options);
	return await withPluginLifecycleLease({
		...options.env ? { env: options.env } : {},
		...options.path ? { path: options.path } : {},
		...options.database ? { database: options.database } : {}
	}, async () => await installClawPackagesUnlocked(plan, options));
}
async function installClawPackagesUnlocked(plan, options) {
	const deps = options.deps ?? {};
	const installPlugin = deps.installPlugin ?? runPluginInstallCommand;
	const uninstallPlugin = deps.uninstallPlugin ?? runPluginUninstallCommand;
	const probePlugin = deps.probePlugin ?? installPluginFromClawHub;
	const installSkill = deps.installSkill ?? installSkillFromClawHub;
	const preflightPlugin = deps.preflightPlugin ?? preflightPluginInstall;
	const preflightSkill = deps.preflightSkill ?? preflightSkillFromClawHub;
	const persistPackageRef = deps.persistPackageRef ?? persistClawPackageRef;
	const completePackageRef = deps.completePackageRef ?? updateClawPackageRefStatus;
	const readPackageRefs = deps.readPackageRefs ?? readClawPackageRefs;
	const acquirePackageLease = deps.acquirePackageLease ?? acquireClawPackageLifecycleLease;
	const resolvePlugin = deps.resolvePlugin ?? resolveInstalledClawHubPlugin;
	const runtime = options.runtime ?? defaultRuntime;
	const installedPackages = [];
	const installedPlugins = [];
	for (const action of plan.actions.filter((candidate) => candidate.kind === "package")) {
		let packageLease = null;
		try {
			const pkg = packageFromAction(action);
			const acquiredLease = acquirePackageLease(pkg.kind === "skill" ? {
				kind: pkg.kind,
				source: pkg.source,
				ref: pkg.ref,
				workspace: plan.agent.workspace
			} : {
				kind: pkg.kind,
				source: pkg.source,
				ref: pkg.ref
			}, {
				env: options.env,
				path: options.path,
				required: true
			});
			if (!acquiredLease) throw new Error(`Could not acquire package lifecycle lease for ${pkg.ref}.`);
			packageLease = maintainClawPackageLifecycleLease(acquiredLease);
			if (pkg.kind === "skill") {
				const preflight = await preflightSkill({
					workspaceDir: plan.agent.workspace,
					slug: pkg.ref,
					version: pkg.version,
					expectedIntegrity: pkg.integrity,
					acknowledgeClawHubRisk: true
				});
				packageLease.assertCurrent();
				if (!preflight.ok) throw new Error(preflight.error);
				if (preflight.action !== pkg.ownerAction || preflight.warning !== pkg.riskWarning || normalizeClawHubSha256Integrity(preflight.integrity) !== normalizeClawHubSha256Integrity(pkg.integrity)) throw new ClawPackageInstallError("package_owner_state_changed", `Skill ${pkg.ref}@${pkg.version} changed after planning; run add --dry-run again.`, installedPackages);
				if (preflight.action === "reuse") {
					installedPackages.push(persistPackageRef(plan, pkg, {
						...options,
						status: "complete",
						relationship: "managed",
						origin: "pre-existing",
						independentOwner: true
					}));
					continue;
				}
				let packageRef = persistPackageRef(plan, pkg, {
					...options,
					status: "pending",
					relationship: "managed",
					origin: "claw-introduced",
					independentOwner: false
				});
				installedPackages.push(packageRef);
				options.onExternalMutation?.(pkg);
				const installed = await installSkill({
					workspaceDir: plan.agent.workspace,
					slug: pkg.ref,
					version: pkg.version,
					expectedIntegrity: pkg.integrity,
					acknowledgeClawHubRisk: true,
					clawManaged: true
				});
				packageLease.assertCurrent();
				if (!installed.ok) throw new Error(installed.error);
				packageRef = completePackageRef(packageRef, "complete", options);
				installedPackages[installedPackages.length - 1] = packageRef;
				continue;
			}
			const probe = await probePlugin({
				spec: `clawhub:${pkg.ref}@${pkg.version}`,
				dryRun: true,
				acknowledgeClawHubRisk: true
			});
			if (!probe.ok) throw new Error(probe.error);
			const probeIntegrity = probe.clawhub.integrity ? normalizeClawHubSha256Integrity(probe.clawhub.integrity) : null;
			if (probe.pluginId !== pkg.installId || probeIntegrity !== normalizeClawHubSha256Integrity(pkg.integrity) || probe.warning !== pkg.riskWarning) throw new ClawPackageInstallError("package_owner_state_changed", `Plugin ${pkg.ref}@${pkg.version} identity or trust state changed after planning; run add --dry-run again.`, installedPackages);
			const preflight = await preflightPlugin({
				clawhubPackage: pkg.ref,
				rawSpec: `clawhub:${pkg.ref}@${pkg.version}`,
				expectedVersion: pkg.version
			});
			packageLease.assertCurrent();
			if (!preflight.ok) throw new Error(preflight.code === "plugin_version_conflict" ? `Plugin ${pkg.ref}@${pkg.version} conflicts with installed version ${preflight.installedVersion}.` : preflight.error);
			if (preflight.action !== pkg.ownerAction) throw new ClawPackageInstallError("package_owner_state_changed", `Plugin ${pkg.ref}@${pkg.version} owner state changed from ${pkg.ownerAction} to ${preflight.action}; run add --dry-run again.`, installedPackages);
			if (!pkg.installId) throw new ClawPackageInstallError("plugin_identity_unresolved", `Plugin ${pkg.ref}@${pkg.version} has no resolved install identity.`, installedPackages);
			if (preflight.action === "reuse") {
				if (preflight.installedId !== pkg.installId || !preflight.installedIntegrity || normalizeClawHubSha256Integrity(preflight.installedIntegrity) !== normalizeClawHubSha256Integrity(pkg.integrity)) throw new ClawPackageInstallError("package_owner_state_changed", `Plugin ${pkg.ref}@${pkg.version} identity changed after planning; run add --dry-run again.`, installedPackages);
				const existingRefs = readPackageRefs({
					...options,
					kind: pkg.kind,
					source: pkg.source,
					ref: pkg.ref,
					version: pkg.version
				});
				const inheritsClawOrigin = existingRefs.length > 0 && existingRefs.every((candidate) => candidate.origin === "claw-introduced" && !candidate.independentOwner) && !ownerInstallIsNewerThanRefs(preflight.installedAt, existingRefs);
				installedPackages.push(persistPackageRef(plan, pkg, {
					...options,
					status: "complete",
					relationship: "referenced",
					origin: inheritsClawOrigin ? "claw-introduced" : "pre-existing",
					independentOwner: !inheritsClawOrigin
				}));
				continue;
			}
			let packageRef = persistPackageRef(plan, pkg, {
				...options,
				status: "pending",
				relationship: "referenced",
				origin: "claw-introduced",
				independentOwner: false
			});
			installedPackages.push(packageRef);
			options.onExternalMutation?.(pkg);
			await installPlugin({
				raw: `clawhub:${pkg.ref}@${pkg.version}`,
				opts: {
					acknowledgeClawHubRisk: true,
					expectedIntegrity: pkg.integrity,
					expectedPluginId: pkg.installId
				},
				invalidateRuntimeCache: false,
				clawManaged: true,
				runtime: installerRuntime(runtime)
			});
			installedPlugins.push({
				installId: pkg.installId,
				packageIndex: installedPackages.length - 1
			});
			packageLease.assertCurrent();
			packageRef = completePackageRef(packageRef, "complete", options);
			installedPackages[installedPackages.length - 1] = packageRef;
		} catch (error) {
			try {
				packageLease?.release();
				packageLease = null;
			} catch {}
			const pending = installedPackages.at(-1);
			if (pending?.status === "pending") try {
				installedPackages[installedPackages.length - 1] = completePackageRef(pending, "failed", options);
			} catch {}
			const rollbackErrors = [];
			for (const installedPlugin of installedPlugins.toReversed()) {
				const packageRef = installedPackages[installedPlugin.packageIndex];
				if (!packageRef) continue;
				let rollbackLease = null;
				try {
					const acquiredRollbackLease = acquirePackageLease({
						kind: "plugin",
						source: "clawhub",
						ref: packageRef.ref
					}, {
						env: options.env,
						path: options.path,
						required: true
					});
					if (!acquiredRollbackLease) throw new Error(`Could not acquire package lifecycle lease for ${packageRef.ref}.`, { cause: error });
					rollbackLease = maintainClawPackageLifecycleLease(acquiredRollbackLease);
					if (readPackageRefs({
						...options,
						kind: "plugin",
						source: "clawhub",
						ref: packageRef.ref,
						version: packageRef.version,
						integrity: packageRef.integrity
					}).filter((ref) => ref.agentId !== plan.agent.finalId && (ref.status === "pending" || ref.status === "complete")).length > 0) {
						rollbackErrors.push(`kept plugin ${installedPlugin.installId} because another Claw now references it`);
						continue;
					}
					const currentRefs = readPackageRefs({
						...options,
						kind: "plugin",
						source: "clawhub",
						ref: packageRef.ref,
						version: packageRef.version
					});
					if (currentRefs.some((candidate) => candidate.independentOwner)) {
						rollbackErrors.push(`kept plugin ${installedPlugin.installId} because it now has a direct owner`);
						continue;
					}
					const installed = await resolvePlugin({ clawhubPackage: packageRef.ref });
					const installedIntegrity = installed.status === "found" && installed.record.integrity ? normalizeClawHubSha256Integrity(installed.record.integrity) : null;
					if (installed.status !== "found" || installed.pluginId !== installedPlugin.installId || installed.installedVersion !== packageRef.version || installedIntegrity !== normalizeClawHubSha256Integrity(packageRef.integrity) || ownerInstallIsNewerThanRefs(installed.record.installedAt, currentRefs)) {
						rollbackErrors.push(`kept plugin ${installedPlugin.installId} because its installed identity changed after Claw installation`);
						continue;
					}
					await uninstallPlugin(installedPlugin.installId, {
						force: true,
						invalidateRuntimeCache: false,
						clawManaged: true
					}, installerRuntime(runtime));
					rollbackLease.assertCurrent();
					installedPackages[installedPlugin.packageIndex] = completePackageRef(installedPackages[installedPlugin.packageIndex] ?? packageRef, "rolled_back", options);
				} catch (rollbackError) {
					rollbackErrors.push(`could not remove plugin ${installedPlugin.installId}: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
					continue;
				} finally {
					try {
						rollbackLease?.release();
					} catch {}
				}
			}
			const message = error instanceof Error ? error.message : String(error);
			if (rollbackErrors.length > 0) throw new ClawPackageInstallError("package_rollback_failed", `${message} Rollback incomplete: ${rollbackErrors.join("; ")}.`, installedPackages);
			if (error instanceof ClawPackageInstallError) throw new ClawPackageInstallError(error.code, error.message, installedPackages);
			throw new ClawPackageInstallError("package_install_failed", message, installedPackages);
		} finally {
			try {
				packageLease?.release();
			} catch {}
		}
	}
	return installedPackages;
}
//#endregion
//#region src/claws/add.ts
const CLAW_ADD_RESULT_SCHEMA_VERSION = "openclaw.clawAddResult.v1";
var ClawAddMutationError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "ClawAddMutationError";
	}
};
function hasUnsupportedMutationActions(plan) {
	return plan.actions.some((action) => ![
		"agent",
		"workspace",
		"workspaceFile",
		"package",
		"mcpServer",
		"cronJob"
	].includes(action.kind));
}
function statusAtLeast(status, phase) {
	const order = {
		pending: 0,
		partial: 0,
		workspace_ready: 1,
		config_committed: 2,
		complete: 3
	};
	return order[status] >= order[phase];
}
function markInstallStatus(agentId, status, expectedStatuses, options) {
	(options.updateRecord ?? updateClawInstallRecordStatus)(agentId, status, {
		...options,
		expectedStatuses
	});
}
function clearUnownedInstallRecord(agentId, expectedStatuses, options) {
	(options.deleteRecord ?? deleteClawInstallRecord)(agentId, {
		...options,
		expectedStatuses
	});
}
function sameCommittedAgent(existingAgent, plan) {
	return stableStringify(existingAgent) === stableStringify(plan.agent.config);
}
function workspacePathKey(value) {
	return process.platform === "win32" ? normalizeWindowsPathForComparison(value) : value;
}
function assertWorkspacePathUnchanged(workspace) {
	const canonicalWorkspace = resolvePathViaExistingAncestorSync(workspace);
	if (workspacePathKey(canonicalWorkspace) !== workspacePathKey(workspace)) throw new ClawAddMutationError("workspace_path_changed", `Workspace ancestry changed after planning: expected ${JSON.stringify(workspace)}, resolved ${JSON.stringify(canonicalWorkspace)}.`);
}
function partialResult(params) {
	return {
		schemaVersion: CLAW_ADD_RESULT_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: false,
		mutationAllowed: true,
		planIntegrity: params.plan.planIntegrity,
		status: "partial",
		claw: params.plan.claw,
		agent: params.plan.agent,
		workspaceCreated: params.workspaceCreated,
		configCommitted: params.configCommitted,
		workspaceFiles: params.workspaceFiles ?? [],
		packages: params.packages ?? [],
		mcpServers: params.mcpServers ?? [],
		cronJobs: params.cronJobs ?? [],
		installRecord: {
			...params.installRecord,
			status: params.installStatus ?? "partial",
			updatedAtMs: params.nowMs ?? Date.now()
		},
		error: params.error
	};
}
async function applyClawAddPlan(plan, options = {}) {
	if (plan.blockers.length > 0) throw new ClawAddMutationError("plan_blocked", "The Claw add plan contains blockers.");
	if (hasUnsupportedMutationActions(plan)) throw new ClawAddMutationError("unsupported_components", "This build cannot add one or more declared Claw component kinds.");
	if (options.consentPlanIntegrity !== plan.planIntegrity) throw new ClawAddMutationError("plan_integrity_mismatch", "Consent does not match the current Claw add plan; run add --dry-run again.");
	const persistRecord = options.persistRecord ?? persistClawInstallRecord;
	let installRecord;
	try {
		installRecord = persistRecord(plan, {
			...options,
			status: "pending"
		});
	} catch (error) {
		throw new ClawAddMutationError("provenance_failed", error.message);
	}
	const installPackages = options.installPackages ?? installClawPackages;
	let packages = [];
	const workspace = resolve(resolveUserPath(plan.agent.workspace));
	const workspacePhaseRecorded = statusAtLeast(installRecord.status, "workspace_ready");
	const workspaceState = workspacePhaseRecorded ? await lstat(workspace).catch((error) => {
		if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") return;
		throw error;
	}) : void 0;
	if (workspaceState && !workspaceState.isDirectory()) throw new ClawAddMutationError("workspace_collision", `Workspace ${JSON.stringify(workspace)} is no longer a directory.`);
	let workspaceCreated = workspaceState?.isDirectory() ?? false;
	let configCommitted = statusAtLeast(installRecord.status, "config_committed");
	try {
		assertWorkspacePathUnchanged(workspace);
		await mkdir(dirname(workspace), { recursive: true });
		assertWorkspacePathUnchanged(workspace);
	} catch (error) {
		clearUnownedInstallRecord(plan.agent.finalId, ["pending", "partial"], options);
		if (error instanceof ClawAddMutationError) throw error;
		throw new ClawAddMutationError("workspace_parent_failed", `Could not create parent directory for workspace ${JSON.stringify(workspace)}: ${error.message}`);
	}
	if (!workspaceCreated) {
		try {
			await mkdir(workspace);
			workspaceCreated = true;
		} catch (error) {
			markInstallStatus(plan.agent.finalId, "partial", ["pending", "partial"], options);
			return partialResult({
				plan,
				installRecord,
				workspaceCreated: false,
				configCommitted: false,
				packages,
				error: {
					code: "workspace_collision",
					message: `Could not create new workspace ${JSON.stringify(workspace)}: ${error.message}`
				},
				nowMs: options.nowMs
			});
		}
		try {
			if (!workspacePhaseRecorded) markInstallStatus(plan.agent.finalId, "workspace_ready", [
				"pending",
				"partial",
				"workspace_ready"
			], options);
		} catch (error) {
			if (await rmdir(workspace).then(() => true).catch(() => false)) try {
				clearUnownedInstallRecord(plan.agent.finalId, ["pending", "partial"], options);
			} catch {}
			throw new ClawAddMutationError("provenance_failed", error.message);
		}
	}
	try {
		await (options.commitConfig ?? (async (transform) => {
			await transformConfigFileWithRetry({
				afterWrite: { mode: "auto" },
				transform: (config) => ({ nextConfig: transform(config) })
			});
		}))((config) => {
			const existingAgents = listAgentEntries(config);
			const agentsToPreserve = existingAgents.length > 0 ? existingAgents : [{
				id: DEFAULT_AGENT_ID,
				default: true
			}];
			const configWithPreservedAgents = {
				...config,
				agents: {
					...config.agents,
					entries: Object.fromEntries(agentsToPreserve.map(({ id, ...entry }) => [id, entry]))
				}
			};
			const normalizedAgentId = normalizeAgentId(plan.agent.finalId);
			const existingAgent = agentsToPreserve.find((agent) => normalizeAgentId(agent.id) === normalizedAgentId);
			if (existingAgent) {
				if (sameCommittedAgent(existingAgent, plan)) {
					configCommitted = true;
					return config;
				}
				throw new ClawAddMutationError("agent_id_collision", "Agent " + JSON.stringify(plan.agent.finalId) + " was created after planning.");
			}
			if (findOverlappingWorkspaceAgentIds(configWithPreservedAgents, plan.agent.finalId, workspace).length > 0) throw new ClawAddMutationError("workspace_collision", "Workspace " + JSON.stringify(workspace) + " is already assigned to an agent.");
			const nextConfig = {
				...config,
				agents: {
					...config.agents,
					entries: Object.fromEntries([...agentsToPreserve, plan.agent.config].map(({ id, ...entry }) => [id, entry]))
				}
			};
			configCommitted = true;
			return nextConfig;
		});
		markInstallStatus(plan.agent.finalId, "config_committed", ["workspace_ready", "config_committed"], options);
	} catch (error) {
		let installStatus = "workspace_ready";
		if (!configCommitted) {
			if (await rmdir(workspace).then(() => true).catch(() => false)) {
				workspaceCreated = false;
				installStatus = "partial";
				markInstallStatus(plan.agent.finalId, "partial", ["workspace_ready", "partial"], options);
			}
		}
		return partialResult({
			plan,
			installRecord,
			workspaceCreated,
			configCommitted,
			packages,
			installStatus,
			error: {
				code: error instanceof ClawAddMutationError ? error.code : "config_commit_failed",
				message: error instanceof Error ? error.message : String(error)
			},
			nowMs: options.nowMs
		});
	}
	const createFiles = options.createWorkspaceFiles ?? createClawWorkspaceFiles;
	let workspaceFiles = [];
	try {
		workspaceFiles = await createFiles(plan, options);
	} catch (error) {
		const workspaceError = error instanceof ClawWorkspaceWriteError ? error : new ClawWorkspaceWriteError([{
			level: "error",
			code: "workspace_file_io_error",
			phase: "mutation",
			path: "$.workspace",
			message: error instanceof Error ? error.message : String(error)
		}], workspaceFiles);
		markInstallStatus(plan.agent.finalId, "config_committed", ["config_committed"], options);
		return {
			schemaVersion: CLAW_ADD_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: false,
			mutationAllowed: true,
			planIntegrity: plan.planIntegrity,
			status: "partial",
			claw: plan.claw,
			agent: plan.agent,
			workspaceCreated,
			configCommitted,
			workspaceFiles: workspaceError.createdFiles,
			packages,
			mcpServers: [],
			cronJobs: [],
			installRecord: {
				...installRecord,
				status: "config_committed",
				updatedAtMs: options.nowMs ?? Date.now()
			},
			error: {
				code: "workspace_files_failed",
				message: workspaceError.message,
				diagnostics: workspaceError.diagnostics
			}
		};
	}
	let cronJobs = [];
	try {
		packages = await installPackages(plan, options);
	} catch (error) {
		const packageError = error instanceof ClawPackageInstallError ? error : new ClawPackageInstallError("package_install_failed", error instanceof Error ? error.message : String(error), packages);
		return partialResult({
			plan,
			installRecord,
			workspaceCreated,
			configCommitted,
			workspaceFiles,
			packages: packageError.installedPackages,
			installStatus: "config_committed",
			error: {
				code: packageError.code,
				message: packageError.message
			},
			nowMs: options.nowMs
		});
	}
	const installMcpServers = options.installMcpServers ?? installClawMcpServers;
	let mcpServers = [];
	try {
		mcpServers = await installMcpServers(plan, options);
	} catch (error) {
		const mcpError = error instanceof ClawMcpInstallError ? error : new ClawMcpInstallError("mcp_install_failed", error instanceof Error ? error.message : String(error), mcpServers);
		markInstallStatus(plan.agent.finalId, "config_committed", ["config_committed"], options);
		return partialResult({
			plan,
			installRecord,
			workspaceCreated,
			configCommitted,
			workspaceFiles,
			packages,
			mcpServers: mcpError.mcpServers,
			installStatus: "config_committed",
			error: {
				code: mcpError.code,
				message: mcpError.message
			},
			nowMs: options.nowMs
		});
	}
	const installCronJobs = options.installCronJobs ?? installClawCronJobs;
	try {
		cronJobs = await installCronJobs(plan, {
			...options,
			gateway: options.cronGateway
		});
	} catch (error) {
		const cronError = error instanceof ClawCronInstallError ? error : new ClawCronInstallError("cron_install_failed", error instanceof Error ? error.message : String(error), cronJobs);
		markInstallStatus(plan.agent.finalId, "config_committed", ["config_committed"], options);
		return partialResult({
			plan,
			installRecord,
			workspaceCreated,
			configCommitted,
			workspaceFiles,
			packages,
			mcpServers,
			cronJobs: cronError.cronJobs,
			installStatus: "config_committed",
			error: {
				code: cronError.code,
				message: cronError.message
			},
			nowMs: options.nowMs
		});
	}
	try {
		markInstallStatus(plan.agent.finalId, "complete", ["config_committed", "complete"], options);
		return {
			schemaVersion: CLAW_ADD_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: false,
			mutationAllowed: true,
			planIntegrity: plan.planIntegrity,
			status: "complete",
			claw: plan.claw,
			agent: plan.agent,
			workspaceCreated,
			configCommitted,
			packages,
			mcpServers,
			cronJobs,
			workspaceFiles,
			installRecord: {
				...installRecord,
				status: "complete",
				updatedAtMs: options.nowMs ?? Date.now()
			}
		};
	} catch (error) {
		return partialResult({
			plan,
			installRecord,
			workspaceCreated,
			configCommitted,
			workspaceFiles,
			packages,
			mcpServers,
			cronJobs,
			error: {
				code: "provenance_failed",
				message: error.message
			}
		});
	}
}
//#endregion
//#region src/claws/export.ts
const CLAW_EXPORT_RESULT_SCHEMA_VERSION = "openclaw.clawExportResult.v1";
const MAX_EXPORT_FILE_BYTES = 1024 * 1024;
function decodeUtf8(content) {
	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(content);
	} catch {
		return;
	}
}
var ClawExportError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "ClawExportError";
	}
};
function portableAgent(agent, avatar) {
	const identity = {
		...agent.identity?.name ? { name: agent.identity.name } : {},
		...agent.identity?.theme ? { theme: agent.identity.theme } : {},
		...agent.identity?.emoji ? { emoji: agent.identity.emoji } : {},
		...avatar ? { avatar } : {}
	};
	return {
		id: agent.id,
		...agent.name ? { name: agent.name } : {},
		...agent.description ? { description: agent.description } : {},
		...Object.keys(identity).length > 0 ? { identity } : {}
	};
}
function portableOpenClawProfile(agent) {
	const tools = {
		...agent.tools?.profile ? { profile: agent.tools.profile } : {},
		...agent.tools?.allow?.length ? { allow: agent.tools.allow } : {},
		...agent.tools?.alsoAllow?.length ? { alsoAllow: agent.tools.alsoAllow } : {},
		...agent.tools?.deny?.length ? { deny: agent.tools.deny } : {},
		...agent.tools?.fs?.workspaceOnly === true ? { fs: { workspaceOnly: true } } : {}
	};
	const settings = {
		...agent.groupChat?.mentionPatterns?.length ? { groupChat: { mentionPatterns: agent.groupChat.mentionPatterns } } : {},
		...agent.sandbox ? { sandbox: {
			...agent.sandbox.mode ? { mode: agent.sandbox.mode } : {},
			...agent.sandbox.scope ? { scope: agent.sandbox.scope } : {},
			...agent.sandbox.workspaceAccess ? { workspaceAccess: agent.sandbox.workspaceAccess } : {}
		} } : {},
		...Object.keys(tools).length > 0 ? { tools } : {},
		...agent.memory?.search ? { memory: { search: {
			...agent.memory.search.enabled !== void 0 ? { enabled: agent.memory.search.enabled } : {},
			...agent.memory.search.rememberAcrossConversations !== void 0 ? { rememberAcrossConversations: agent.memory.search.rememberAcrossConversations } : {},
			...agent.memory.search.sources?.length ? { sources: agent.memory.search.sources } : {}
		} } } : {},
		...agent.heartbeat ? { heartbeat: {
			...agent.heartbeat.every ? { every: agent.heartbeat.every } : {},
			...agent.heartbeat.activeHours ? { activeHours: {
				...agent.heartbeat.activeHours.start ? { start: agent.heartbeat.activeHours.start } : {},
				...agent.heartbeat.activeHours.end ? { end: agent.heartbeat.activeHours.end } : {},
				...agent.heartbeat.activeHours.timezone ? { timezone: agent.heartbeat.activeHours.timezone } : {}
			} } : {},
			...agent.heartbeat.lightContext !== void 0 ? { lightContext: agent.heartbeat.lightContext } : {},
			...agent.heartbeat.isolatedSession !== void 0 ? { isolatedSession: agent.heartbeat.isolatedSession } : {},
			...agent.heartbeat.timeoutSeconds !== void 0 ? { timeoutSeconds: agent.heartbeat.timeoutSeconds } : {}
		} } : {},
		...agent.humanDelay ? { humanDelay: {
			...agent.humanDelay.mode ? { mode: agent.humanDelay.mode } : {},
			...agent.humanDelay.minMs !== void 0 ? { minMs: agent.humanDelay.minMs } : {},
			...agent.humanDelay.maxMs !== void 0 ? { maxMs: agent.humanDelay.maxMs } : {}
		} } : {}
	};
	return Object.keys(settings).length > 0 ? {
		schemaVersion: 1,
		agent: settings
	} : void 0;
}
function normalizedRelativePath(value) {
	return value.split(sep).join("/");
}
function comparePortableText(left, right) {
	return left < right ? -1 : left > right ? 1 : 0;
}
function isClawBootstrapFileName(value) {
	return CLAW_BOOTSTRAP_FILE_NAMES.includes(value);
}
function readPortableAvatar(params) {
	const source = params.agent.identity?.avatar?.trim();
	if (!source) return {};
	if (isAvatarHttpUrl(source)) return {};
	if (isAvatarDataUrl(source)) return isPortableClawAvatar(source) ? { source } : {};
	const opened = openLocalAgentAvatarFile({
		cfg: params.config,
		agentId: params.agent.id,
		source
	});
	if (!opened.ok) return {};
	try {
		const content = readFileDescriptorBoundedSync(opened.file.fd, AVATAR_MAX_BYTES);
		const path = normalizedRelativePath(relative(params.workspace, opened.file.path));
		return {
			source: path,
			sidecar: {
				path,
				content
			}
		};
	} catch {
		return {};
	} finally {
		closeSync(opened.file.fd);
	}
}
function derivativePackageVersion(manifest, contents) {
	const hash = createHash("sha256").update(JSON.stringify(manifest));
	for (const file of contents.toSorted((left, right) => comparePortableText(left.path, right.path))) hash.update(file.path).update("\0").update(file.content).update("\0");
	return `0.0.0-export.${hash.digest("hex")}`;
}
function portableMcpServer(server) {
	const common = {
		...server.toolFilter && typeof server.toolFilter === "object" ? { toolFilter: server.toolFilter } : {},
		...typeof server.timeout === "number" ? { timeout: server.timeout } : {},
		...typeof server.connectTimeout === "number" ? { connectTimeout: server.connectTimeout } : {}
	};
	if (typeof server.url === "string") {
		if (server.transport !== "sse" && server.transport !== "streamable-http") throw new Error("Managed remote MCP server has an unsupported transport.");
		return {
			url: server.url,
			transport: server.transport,
			...server.auth === "oauth" ? { auth: "oauth" } : {},
			...common
		};
	}
	if (typeof server.command !== "string") throw new Error("Managed MCP server has neither a command nor a remote URL.");
	return {
		command: server.command,
		...server.transport === "stdio" ? { transport: server.transport } : {},
		...Array.isArray(server.args) ? { args: server.args } : {},
		...server.env && typeof server.env === "object" ? { env: server.env } : {},
		...common
	};
}
async function exportClawAgent(agentId, outputDirectory, options) {
	const record = (await readClawStatus(agentId, options)).records.find((candidate) => candidate.install.agentId === agentId);
	if (!record) throw new ClawExportError("claw_not_found", `No installed Claw agent matches ${JSON.stringify(agentId)}.`);
	if (record.install.status !== "complete") throw new ClawExportError("install_incomplete", `Installed Claw agent ${JSON.stringify(agentId)} is in ${JSON.stringify(record.install.status)} state; finish or repair it before export.`);
	const agent = listAgentEntries(options.config).find((candidate) => candidate.id === agentId);
	if (!agent) throw new ClawExportError("agent_missing", `Installed Claw agent ${JSON.stringify(agentId)} is missing from config.`);
	const currentWorkspace = await realpath(resolve(resolveAgentWorkspaceDir(options.config, agentId))).catch(() => resolve(resolveAgentWorkspaceDir(options.config, agentId)));
	if (currentWorkspace !== record.install.workspace) throw new ClawExportError("workspace_changed", `Agent ${JSON.stringify(agentId)} now resolves to workspace ${JSON.stringify(currentWorkspace)} instead of its recorded Claw workspace ${JSON.stringify(record.install.workspace)}.`);
	if (record.agentState !== "present") throw new ClawExportError("agent_drifted", `Agent ${JSON.stringify(agentId)} no longer matches its recorded Claw configuration.`);
	const driftedFiles = record.workspaceFiles.filter((file) => file.state !== "unchanged");
	if (driftedFiles.length > 0) throw new ClawExportError("workspace_files_drifted", `Cannot export drifted managed files: ${driftedFiles.map((file) => `${file.path} (${file.state})`).join(", ")}.`);
	const driftedPackages = record.packages.filter((pkg) => pkg.state !== "present");
	if (driftedPackages.length > 0) throw new ClawExportError("packages_drifted", `Cannot export drifted packages: ${driftedPackages.map((pkg) => `${pkg.kind}:${pkg.ref}@${pkg.version} (${pkg.state})`).join(", ")}.`);
	const unresolvedCronJobs = record.cronJobs.filter((cron) => cron.status !== "complete" || !cron.schedulerJobId);
	const unavailableMcpServers = record.mcpServers.filter((server) => server.state !== "present");
	if (unavailableMcpServers.length > 0) throw new ClawExportError("mcp_servers_unavailable", `Cannot export MCP servers with unresolved ownership or drift: ${unavailableMcpServers.map((server) => server.name).join(", ")}.`);
	if (unresolvedCronJobs.length > 0) throw new ClawExportError("cron_jobs_unavailable", `Cannot export cron declarations with unresolved ownership: ${unresolvedCronJobs.map((cron) => cron.manifestId).join(", ")}.`);
	const workspace = await root(record.install.workspace, {
		hardlinks: "reject",
		maxBytes: MAX_EXPORT_FILE_BYTES,
		symlinks: "reject"
	});
	const allContents = await Promise.all(record.workspaceFiles.map(async (file) => ({
		path: normalizedRelativePath(file.path),
		content: await workspace.readBytes(file.path, { maxBytes: MAX_EXPORT_FILE_BYTES })
	})));
	const soul = allContents.find((file) => file.path === "SOUL.md");
	const decodedSoul = soul ? decodeUtf8(soul.content) : void 0;
	let clawMarkdownBody = soul && decodedSoul !== void 0 && decodedSoul.trim().length > 0 ? soul.content : void 0;
	const contents = allContents.filter((file) => file !== soul || !clawMarkdownBody);
	const avatar = readPortableAvatar({
		config: options.config,
		agent,
		workspace: record.install.workspace
	});
	const managedPaths = new Set(contents.map((file) => file.path));
	if (avatar.sidecar && !managedPaths.has(avatar.sidecar.path)) contents.push(avatar.sidecar);
	const bootstrapFiles = {};
	const files = [];
	for (const file of contents) {
		const source = `workspace/${file.path}`;
		if (isClawBootstrapFileName(file.path)) bootstrapFiles[file.path] = { source };
		else files.push({
			source,
			path: file.path
		});
	}
	const configuredMcpServers = normalizeConfiguredMcpServers(options.sourceMcpServers ?? options.config.mcp?.servers);
	const openClawProfile = portableOpenClawProfile(agent);
	const openClawProfilePath = "profiles/openclaw.yml";
	const openClawProfileRaw = openClawProfile ? Buffer.from(stringify(openClawProfile)) : void 0;
	const manifest = {
		schemaVersion: 1,
		agent: portableAgent(agent, avatar.source),
		...openClawProfile ? { metadata: { "openclaw.config": openClawProfilePath } } : {},
		workspace: {
			bootstrapFiles,
			files
		},
		packages: record.packages.map((pkg) => ({
			kind: pkg.kind,
			source: pkg.source,
			ref: pkg.ref,
			version: pkg.version
		})).toSorted((left, right) => {
			return comparePortableText(`${left.kind}:${left.ref}:${left.version}`, `${right.kind}:${right.ref}:${right.version}`);
		}),
		mcpServers: Object.fromEntries(record.mcpServers.map((ref) => [ref.name, portableMcpServer(configuredMcpServers[ref.name])])),
		cronJobs: record.cronJobs.map((cron) => cron.job).toSorted((left, right) => left.id.localeCompare(right.id))
	};
	const serializeClawMarkdown = (body) => Buffer.concat([Buffer.from(`---\n${stringify(manifest)}---\n`), ...body ? [body] : []]);
	let clawMarkdownRaw = serializeClawMarkdown(clawMarkdownBody);
	if (clawMarkdownBody && clawMarkdownRaw.byteLength > 1048576) {
		clawMarkdownBody = void 0;
		contents.push(soul);
		bootstrapFiles["SOUL.md"] = { source: "workspace/SOUL.md" };
		clawMarkdownRaw = serializeClawMarkdown(void 0);
	}
	if (clawMarkdownRaw.byteLength > 1048576) throw new ClawExportError("claw_manifest_oversized", `Exported CLAW.md exceeds ${MAX_CLAW_MANIFEST_BYTES} bytes.`);
	if (contents.reduce((total, file) => total + file.content.byteLength, 0) + (clawMarkdownBody?.byteLength ?? 0) > 4194304) throw new ClawExportError("workspace_files_oversized", `Exported workspace content exceeds ${MAX_MANAGED_WORKSPACE_BYTES} aggregate bytes.`);
	const parsed = parseClawManifest(manifest);
	if (!parsed.ok) throw new ClawExportError("export_manifest_invalid", parsed.diagnostics.map((diagnostic) => diagnostic.message).join("; "));
	if (openClawProfile) {
		const parsedProfile = parseClawOpenClawProfile(openClawProfile);
		if (!parsedProfile.ok) throw new ClawExportError("export_openclaw_profile_invalid", parsedProfile.diagnostics.map((diagnostic) => diagnostic.message).join("; "));
	}
	const target = resolve(resolveUserPath(outputDirectory));
	await mkdir(dirname(target), { recursive: true });
	try {
		await mkdir(target);
	} catch (error) {
		throw new ClawExportError("output_collision", `Export directory ${JSON.stringify(target)} must not already exist: ${error.message}`);
	}
	const filesWritten = [];
	try {
		const output = await root(target, {
			hardlinks: "reject",
			maxBytes: MAX_EXPORT_FILE_BYTES,
			symlinks: "reject"
		});
		for (const file of contents) {
			const path = `workspace/${file.path}`;
			await output.write(path, file.content, {
				mkdir: true,
				overwrite: false
			});
			filesWritten.push(path);
		}
		if (openClawProfileRaw) {
			await output.write(openClawProfilePath, openClawProfileRaw, {
				mkdir: true,
				overwrite: false
			});
			filesWritten.push(openClawProfilePath);
		}
		const packageJson = {
			name: `openclaw-claw-${record.install.agentId}`,
			version: derivativePackageVersion(manifest, [
				...contents,
				...clawMarkdownBody ? [{
					path: "CLAW.md#body",
					content: clawMarkdownBody
				}] : [],
				...openClawProfileRaw ? [{
					path: openClawProfilePath,
					content: openClawProfileRaw
				}] : []
			]),
			type: "module",
			openclaw: { claw: "CLAW.md" }
		};
		await output.write("package.json", Buffer.from(`${JSON.stringify(packageJson, null, 2)}\n`), { overwrite: false });
		filesWritten.push("package.json");
		await output.write("CLAW.md", clawMarkdownRaw, { overwrite: false });
		filesWritten.push("CLAW.md");
	} catch (error) {
		await rm(target, {
			recursive: true,
			force: true
		}).catch(() => void 0);
		throw new ClawExportError("export_write_failed", error instanceof Error ? error.message : String(error));
	}
	return {
		schemaVersion: CLAW_EXPORT_RESULT_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		agentId,
		outputDirectory: target,
		manifest,
		...openClawProfile ? { openClawProfile } : {},
		filesWritten
	};
}
//#endregion
//#region src/claws/lifecycle.ts
const AGENT_ID_PATTERN = /^[a-z][a-z0-9_-]{0,63}$/;
function capabilityChange(change) {
	return {
		...change,
		classification: "escalation",
		requiresDistinctConsent: true,
		digest: `sha256:${createHash("sha256").update(stableStringify(change.effect)).digest("hex")}`
	};
}
function canonicalWorkspacePath(value) {
	return resolvePathViaExistingAncestorSync(resolve(resolveUserPath(value)));
}
function blocker(code, path, message) {
	return {
		level: "error",
		code,
		phase: "plan",
		path,
		message
	};
}
function blockedWorkspaceFileAction(params) {
	return {
		kind: "workspaceFile",
		id: params.id,
		action: "write",
		target: params.target,
		source: params.source,
		blocked: true,
		reason: params.reason
	};
}
function workspaceSourceErrorCode(error) {
	if (error instanceof FsSafeError) {
		if (error.code === "too-large") return "workspace_source_too_large";
		if (error.code === "symlink" || error.code === "hardlink" || error.code === "path-mismatch") return "workspace_source_unsafe";
	}
	if (error instanceof Error && error.message.includes("symlinked directory")) return "workspace_source_unsafe";
	return "workspace_source_invalid";
}
function workspaceSourceMessage(code, sourcePath) {
	if (code === "workspace_source_too_large") return `Workspace source ${JSON.stringify(sourcePath)} exceeds ${MAX_MANAGED_FILE_BYTES} bytes.`;
	if (code === "workspace_sources_too_large") return `Workspace sources exceed ${MAX_MANAGED_WORKSPACE_BYTES} aggregate bytes.`;
	if (code === "workspace_source_unsafe") return `Workspace source ${JSON.stringify(sourcePath)} must be a regular, non-symlinked, non-hardlinked file.`;
	return `Workspace source ${JSON.stringify(sourcePath)} must resolve to a file inside the Claw package.`;
}
async function inspectWorkspaceFileAction(params) {
	const requestedSource = resolve(params.source.packageRoot, params.sourcePath);
	const requestedTarget = resolve(params.workspace, params.targetPath);
	try {
		await assertNoSymlinkParents({
			rootDir: params.source.packageRoot,
			targetPath: requestedSource,
			allowMissing: false,
			messagePrefix: "Workspace source"
		});
		const opened = await params.sourceRoot.open(params.sourcePath, {
			hardlinks: "reject",
			symlinks: "reject"
		});
		await opened[Symbol.asyncDispose]();
		if (opened.stat.size > 1048576) throw new FsSafeError("too-large", `file exceeds limit of ${MAX_MANAGED_FILE_BYTES} bytes (got ${opened.stat.size})`);
		return { pending: {
			sourcePath: params.sourcePath,
			manifestPath: params.manifestPath,
			byteLength: opened.stat.size,
			action: {
				kind: "workspaceFile",
				id: params.id,
				action: "write",
				target: requestedTarget,
				source: opened.realPath,
				details: { expectedState: "absent" },
				blocked: false
			}
		} };
	} catch (error) {
		const code = workspaceSourceErrorCode(error);
		const message = workspaceSourceMessage(code, params.sourcePath);
		const diagnostic = blocker(code, params.manifestPath, message);
		return {
			action: blockedWorkspaceFileAction({
				id: params.id,
				target: requestedTarget,
				source: requestedSource,
				reason: diagnostic.message
			}),
			blocker: diagnostic
		};
	}
}
async function buildClawAddPlan(params) {
	const context = params.context ?? {};
	const finalId = context.agentId ?? params.manifest.agent.id;
	const workspace = canonicalWorkspacePath(context.workspace ?? resolve(homedir(), ".openclaw", `workspace-${finalId}`));
	const packageRoot = await realpath(params.source.packageRoot).catch(() => params.source.packageRoot);
	const manifestPath = resolvePathViaExistingAncestorSync(resolve(params.source.manifestPath));
	const source = {
		...params.source,
		packageRoot,
		manifestPath
	};
	const sourceRoot = await root(packageRoot);
	const blockers = [];
	const actions = [];
	const capabilityChanges = [];
	const readinessRequirements = [];
	if (!AGENT_ID_PATTERN.test(finalId)) blockers.push(blocker("invalid_agent_id", "$.agent.id", `Final agent id ${JSON.stringify(finalId)} is not a valid portable agent id.`));
	const agentBlocked = new Set(context.existingAgentIds ?? []).has(finalId);
	const openClawAgentSettings = params.openClawProfile?.agent ?? {};
	const agentConfig = {
		...params.manifest.agent,
		...openClawAgentSettings,
		id: finalId,
		workspace
	};
	if (agentBlocked) blockers.push(blocker("agent_id_collision", "$.agent.id", `Agent id ${JSON.stringify(finalId)} already exists; Claws never merge into existing agents.`));
	actions.push({
		kind: "agent",
		id: finalId,
		action: "create",
		target: `agents.entries[${JSON.stringify(finalId)}]`,
		details: {
			...agentConfig,
			expectedState: "absent"
		},
		blocked: agentBlocked || !AGENT_ID_PATTERN.test(finalId)
	});
	const agentCapabilityEffect = {
		...openClawAgentSettings.sandbox ? { sandbox: openClawAgentSettings.sandbox } : {},
		...openClawAgentSettings.tools ? { tools: openClawAgentSettings.tools } : {},
		...openClawAgentSettings.memory ? { memory: openClawAgentSettings.memory } : {},
		...openClawAgentSettings.heartbeat ? { heartbeat: openClawAgentSettings.heartbeat } : {}
	};
	if (Object.keys(agentCapabilityEffect).length > 0) capabilityChanges.push(capabilityChange({
		kind: "agent",
		id: finalId,
		path: "agent",
		action: "create",
		reason: "The new agent declares sandbox, tool, memory-search, or recurring heartbeat capabilities.",
		effect: agentCapabilityEffect
	}));
	const configuredWorkspaceConflict = new Set([...context.existingWorkspacePaths ?? []].map((path) => canonicalWorkspacePath(path))).has(workspace);
	const workspaceExistsOnDisk = await lstat(workspace).then(() => true).catch(() => false);
	const resumableWorkspace = context.resumableWorkspace ? canonicalWorkspacePath(context.resumableWorkspace) : void 0;
	const workspaceBlocked = configuredWorkspaceConflict || workspaceExistsOnDisk && resumableWorkspace !== workspace;
	if (workspaceBlocked) blockers.push(blocker("workspace_collision", "$.workspace", `Workspace ${JSON.stringify(workspace)} already exists; a Claw requires a new workspace.`));
	actions.push({
		kind: "workspace",
		id: finalId,
		action: "create",
		target: workspace,
		details: { expectedState: "absent" },
		blocked: workspaceBlocked,
		...workspaceBlocked ? { reason: `Workspace ${JSON.stringify(workspace)} already exists.` } : {}
	});
	const pendingWorkspaceFiles = [];
	async function addWorkspaceFileInspection(fileParams) {
		const result = await inspectWorkspaceFileAction({
			sourceRoot,
			source,
			workspace,
			sourcePath: fileParams.sourcePath,
			targetPath: fileParams.targetPath,
			id: fileParams.id,
			manifestPath: fileParams.manifestPath
		});
		const action = result.pending?.action ?? result.action;
		if (!action) throw new Error("Claw workspace source inspection did not produce an action");
		action.blocked ||= workspaceBlocked;
		if (workspaceBlocked) action.reason = `Workspace ${JSON.stringify(workspace)} already exists.`;
		actions.push(action);
		if (result.pending) pendingWorkspaceFiles.push(result.pending);
		if (result.blocker) blockers.push(result.blocker);
	}
	if (params.clawMarkdownBody && params.clawMarkdownBody.toString("utf8").trim().length > 0) if (clawManifestWorkspaceConflictsWithPath(params.manifest, "SOUL.md")) {
		const diagnostic = blocker("claw_body_soul_conflict", "$.workspace", "CLAW.md body content and an explicit SOUL.md workspace declaration cannot both be present.");
		blockers.push(diagnostic);
		actions.push({
			kind: "workspaceFile",
			id: "SOUL.md",
			action: "write",
			target: resolve(workspace, "SOUL.md"),
			source: source.manifestPath,
			sourceKind: "clawMarkdownBody",
			blocked: true,
			reason: diagnostic.message
		});
	} else {
		const pending = {
			sourcePath: source.manifestPath,
			manifestPath: "$body",
			byteLength: params.clawMarkdownBody.byteLength,
			content: params.clawMarkdownBody,
			action: {
				kind: "workspaceFile",
				id: "SOUL.md",
				action: "write",
				target: resolve(workspace, "SOUL.md"),
				source: source.manifestPath,
				sourceKind: "clawMarkdownBody",
				details: { expectedState: "absent" },
				blocked: false
			}
		};
		pendingWorkspaceFiles.push(pending);
		actions.push(pending.action);
	}
	for (const name of CLAW_BOOTSTRAP_FILE_NAMES) {
		const declaration = params.manifest.workspace.bootstrapFiles[name];
		if (!declaration) continue;
		await addWorkspaceFileInspection({
			sourcePath: declaration.source,
			targetPath: name,
			id: name,
			manifestPath: `$.workspace.bootstrapFiles.${name}`
		});
	}
	for (const [index, file] of params.manifest.workspace.files.entries()) await addWorkspaceFileInspection({
		sourcePath: file.source,
		targetPath: file.path,
		id: file.path,
		manifestPath: `$.workspace.files[${index}]`
	});
	if (pendingWorkspaceFiles.reduce((total, pending) => total + pending.byteLength, 0) > 4194304) {
		const diagnostic = blocker("workspace_sources_too_large", "$.workspace", workspaceSourceMessage("workspace_sources_too_large", ""));
		blockers.push(diagnostic);
		for (const pending of pendingWorkspaceFiles) {
			pending.action.blocked = true;
			pending.action.reason = diagnostic.message;
		}
	} else for (const pending of pendingWorkspaceFiles) {
		if (pending.content) {
			pending.action.digest = `sha256:${createHash("sha256").update(pending.content).digest("hex")}`;
			continue;
		}
		try {
			await assertNoSymlinkParents({
				rootDir: source.packageRoot,
				targetPath: resolve(source.packageRoot, pending.sourcePath),
				allowMissing: false,
				messagePrefix: "Workspace source"
			});
			const read = await sourceRoot.read(pending.sourcePath, {
				hardlinks: "reject",
				maxBytes: MAX_MANAGED_FILE_BYTES,
				symlinks: "reject"
			});
			pending.action.source = read.realPath;
			pending.action.digest = `sha256:${createHash("sha256").update(read.buffer).digest("hex")}`;
		} catch (error) {
			const code = workspaceSourceErrorCode(error);
			const message = workspaceSourceMessage(code, pending.sourcePath);
			const diagnostic = blocker(code, pending.manifestPath, message);
			pending.action.blocked = true;
			pending.action.reason = diagnostic.message;
			blockers.push(diagnostic);
		}
	}
	for (const pkg of params.manifest.packages) {
		const preflight = context.packagePreflight ? await context.packagePreflight(pkg, workspace) : {
			ok: false,
			code: "package_install_unavailable",
			message: "Package preflight is unavailable."
		};
		const diagnostic = preflight.ok ? void 0 : blocker(preflight.code ?? "package_install_unavailable", "$.packages", preflight.message ?? "Package preflight failed.");
		if (diagnostic) blockers.push(diagnostic);
		if (preflight.ok && preflight.requirements) readinessRequirements.push(...preflight.requirements);
		actions.push({
			kind: "package",
			id: `${pkg.kind}:${pkg.ref}`,
			action: "install",
			target: `${pkg.source}:${pkg.ref}@${pkg.version}`,
			digest: preflight.integrity,
			details: {
				...pkg,
				...preflight.integrity ? { integrity: preflight.integrity } : {},
				...preflight.installId ? { installId: preflight.installId } : {},
				...preflight.warning ? { riskWarning: preflight.warning } : {},
				...preflight.requirements ? { prerequisites: preflight.requirements } : {},
				expectedState: !preflight.ok ? "unresolved" : preflight.action === "reuse" ? "present-exact" : "absent",
				ownerAction: preflight.action
			},
			blocked: !preflight.ok,
			...diagnostic ? { reason: diagnostic.message } : {}
		});
		capabilityChanges.push(capabilityChange({
			kind: "package",
			id: `${pkg.kind}:${pkg.ref}`,
			path: `packages.${pkg.kind}.${pkg.ref}`,
			action: "install",
			reason: "The Claw declares downloadable package content or executable code.",
			effect: {
				kind: pkg.kind,
				source: pkg.source,
				ref: pkg.ref,
				version: pkg.version,
				integrity: preflight.integrity ?? "unresolved",
				...preflight.installId ? { installId: preflight.installId } : {},
				...preflight.warning ? { riskWarning: preflight.warning } : {}
			}
		}));
	}
	const existingMcpServerNames = new Set(context.existingMcpServerNames ?? []);
	for (const [name, server] of Object.entries(params.manifest.mcpServers)) {
		const existingServer = context.existingMcpServers?.[name];
		const exactExisting = existingServer !== void 0 && digestClawMcpServer(existingServer) === digestClawMcpServer(server);
		const blocked = !exactExisting && (existingMcpServerNames.has(name) || existingServer !== void 0);
		if (blocked) blockers.push(blocker("mcp_server_collision", `$.mcpServers.${name}`, `MCP server ${JSON.stringify(name)} already exists with different or unresolved configuration and will not be overwritten.`));
		if ("env" in server) for (const value of Object.values(server.env ?? {})) readinessRequirements.push({
			kind: "environment",
			mcpServer: name,
			name: value.slice(2, -1)
		});
		if ("auth" in server && server.auth === "oauth") readinessRequirements.push({
			kind: "oauth",
			mcpServer: name
		});
		actions.push({
			kind: "mcpServer",
			id: name,
			action: "configure",
			target: `mcp.servers.${name}`,
			details: {
				...server,
				expectedState: exactExisting ? "present-exact" : "absent",
				prerequisites: readinessRequirements.filter((requirement) => requirement.kind !== "plugin-setup" && requirement.mcpServer === name)
			},
			blocked
		});
		capabilityChanges.push(capabilityChange({
			kind: "mcpServer",
			id: name,
			path: `mcpServers.${name}`,
			action: "configure",
			reason: "The Claw declares an MCP execution or network tool surface.",
			effect: {
				...server,
				..."env" in server && server.env ? { env: Object.keys(server.env).toSorted() } : {}
			}
		}));
	}
	for (const job of params.manifest.cronJobs) {
		actions.push({
			kind: "cronJob",
			id: job.id,
			action: "schedule",
			target: `cron:${job.id}:agent=${finalId}`,
			details: {
				...job,
				agentId: finalId,
				expectedState: "absent",
				...job.delivery?.channel === "last" ? { deliveryResolution: "local-channel-state:last" } : {}
			},
			blocked: false
		});
		capabilityChanges.push(capabilityChange({
			kind: "cronJob",
			id: job.id,
			path: `cronJobs.${job.id}`,
			action: "schedule",
			reason: "The Claw declares recurring scheduled work.",
			effect: {
				...job,
				agentId: finalId
			}
		}));
	}
	capabilityChanges.sort((left, right) => `${left.kind}:${left.id}:${left.path}`.localeCompare(`${right.kind}:${right.id}:${right.path}`));
	const planIntegrity = `sha256:${createHash("sha256").update(stableStringify({
		manifestSchemaVersion: params.manifest.schemaVersion,
		clawIntegrity: source.integrity,
		finalId,
		workspace,
		actions,
		capabilityChanges,
		blockers
	})).digest("hex")}`;
	return {
		schemaVersion: CLAW_ADD_PLAN_SCHEMA_VERSION,
		manifestSchemaVersion: params.manifest.schemaVersion,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: true,
		mutationAllowed: false,
		planIntegrity,
		claw: source,
		agent: {
			requestedId: params.manifest.agent.id,
			finalId,
			workspace,
			config: agentConfig
		},
		summary: {
			totalActions: actions.length,
			agentActions: actions.filter((action) => action.kind === "agent").length,
			workspaceActions: actions.filter((action) => action.kind === "workspace" || action.kind === "workspaceFile").length,
			packageActions: actions.filter((action) => action.kind === "package").length,
			mcpServerActions: actions.filter((action) => action.kind === "mcpServer").length,
			cronJobActions: actions.filter((action) => action.kind === "cronJob").length,
			blockedActions: actions.filter((action) => action.blocked).length,
			capabilityEscalations: capabilityChanges.length
		},
		actions,
		capabilityChanges,
		readiness: {
			ready: readinessRequirements.length === 0,
			requirements: readinessRequirements
		},
		blockers,
		diagnostics: params.diagnostics ?? []
	};
}
//#endregion
//#region src/cli/claws-cli.gateway-readiness.ts
const CLAW_AGENT_RELOAD_TIMEOUT_MS = 15e3;
const CLAW_AGENT_RELOAD_POLL_MS = 100;
async function waitUntilGatewayConfigApplied() {
	const deadline = Date.now() + CLAW_AGENT_RELOAD_TIMEOUT_MS;
	let lastError;
	while (Date.now() < deadline) {
		try {
			const response = await callGatewayFromCli("config.get", { timeout: "5000" }, {});
			if (typeof response.configRevisionHash === "string" && response.configRevisionHash === response.appliedConfigHash) return;
			lastError = void 0;
		} catch (error) {
			lastError = error;
		}
		await sleep(CLAW_AGENT_RELOAD_POLL_MS);
	}
	const suffix = lastError instanceof Error ? `: ${lastError.message}` : "";
	throw new Error(`Gateway did not apply the Claw agent configuration in time${suffix}`);
}
//#endregion
//#region src/claws/cron-update.ts
var ClawCronUpdateError = class extends Error {
	constructor(message, partial = false) {
		super(message);
		this.partial = partial;
		this.name = "ClawCronUpdateError";
	}
};
function digest$4(value) {
	return `sha256:${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}
function targetRef(params) {
	return {
		schemaVersion: CLAW_CRON_REF_SCHEMA_VERSION,
		agentId: params.agentId,
		manifestId: params.job.id,
		declarationKey: `claw:${params.agentId}:${params.job.id}`,
		...params.schedulerJobId ? { schedulerJobId: params.schedulerJobId } : {},
		status: "pending",
		job: params.job,
		createdAtMs: params.previous?.createdAtMs ?? params.nowMs,
		updatedAtMs: params.nowMs
	};
}
async function applyClawCronUpdate(updatePlan, targetManifest, options) {
	const actions = updatePlan.actions.filter((action) => action.kind === "cronJob" && action.action !== "unchanged");
	if (actions.length === 0) return {
		appliedIds: [],
		rollback: async () => void 0
	};
	if (!options.cronGateway) throw new ClawCronUpdateError("Claw cron updates require the gateway cron API.");
	if (!options.cronGateway.get) throw new ClawCronUpdateError("Claw cron updates require the gateway cron.get API.");
	const gateway = options.cronGateway;
	const readRefs = options.readRefs ?? readClawCronRefs;
	const upsertRef = options.upsertRef ?? upsertClawCronRef;
	const deleteRef = options.deleteRef ?? deleteClawCronRef;
	const currentRefs = new Map(readRefs(updatePlan.agentId, options).map((ref) => [ref.manifestId, ref]));
	const targetJobs = new Map(targetManifest.cronJobs.map((job) => [job.id, job]));
	const undo = [];
	const appliedIds = [];
	const nowMs = options.nowMs ?? Date.now();
	const add = async (ref) => {
		let raw;
		try {
			raw = await gateway.add(clawCronGatewayInput(updatePlan.agentId, ref));
		} catch (error) {
			throw new ClawCronUpdateError(error instanceof Error ? error.message : String(error), true);
		}
		const result = clawCronSchedulerJobFromResult(raw);
		if (!result) throw new ClawCronUpdateError("cron.add returned no scheduler job id.", true);
		return result.id;
	};
	const rollback = async () => {
		const failures = [];
		for (const revert of undo.toReversed()) try {
			await revert();
		} catch (error) {
			failures.push(error instanceof Error ? error.message : String(error));
		}
		if (failures.length > 0) throw new ClawCronUpdateError(failures.join("; "));
	};
	try {
		for (const action of actions) {
			const previous = currentRefs.get(action.id);
			if (previous && action.currentDigest && digest$4(previous.job) !== action.currentDigest) throw new ClawCronUpdateError(`Cron declaration ${JSON.stringify(action.id)} changed after planning.`);
			if (previous?.schedulerJobId) {
				const live = await gateway.get(previous.schedulerJobId);
				if (!clawCronGatewayJobMatchesRef(updatePlan.agentId, previous, live)) throw new ClawCronUpdateError(`Cron declaration ${JSON.stringify(action.id)} changed after planning.`);
			}
			if (action.action === "remove") {
				if (!previous?.schedulerJobId || previous.status !== "complete") throw new ClawCronUpdateError(`Cron declaration ${JSON.stringify(action.id)} is no longer safely removable.`);
				upsertRef({
					...previous,
					status: "pending",
					updatedAtMs: nowMs
				}, options);
				try {
					await gateway.remove(previous.schedulerJobId);
				} catch (error) {
					throw new ClawCronUpdateError(error instanceof Error ? error.message : String(error), true);
				}
				undo.push(async () => {
					const restoredId = await add(previous);
					upsertRef({
						...previous,
						schedulerJobId: restoredId,
						updatedAtMs: nowMs
					}, options);
				});
				deleteRef(updatePlan.agentId, action.id, options);
				appliedIds.push(action.id);
				continue;
			}
			const job = targetJobs.get(action.id);
			if (!job) throw new ClawCronUpdateError(`Target cron declaration ${JSON.stringify(action.id)} is missing.`);
			const pending = targetRef({
				agentId: updatePlan.agentId,
				job,
				previous,
				nowMs
			});
			upsertRef(pending, options);
			const schedulerJobId = await add(pending);
			if (action.action === "change") {
				if (!previous?.schedulerJobId || schedulerJobId !== previous.schedulerJobId) {
					try {
						await gateway.remove(schedulerJobId);
						if (previous) upsertRef(previous, options);
					} catch (error) {
						throw new ClawCronUpdateError(`cron.add did not converge and cleanup failed: ${error instanceof Error ? error.message : String(error)}`, true);
					}
					throw new ClawCronUpdateError(`cron.add did not converge declaration ${JSON.stringify(action.id)} on its owned scheduler job.`);
				}
				undo.push(async () => {
					const restoredId = await add(previous);
					upsertRef({
						...previous,
						schedulerJobId: restoredId,
						updatedAtMs: nowMs
					}, options);
				});
			} else undo.push(async () => {
				await gateway.remove(schedulerJobId);
				deleteRef(updatePlan.agentId, action.id, options);
			});
			upsertRef({
				...pending,
				schedulerJobId,
				status: "complete"
			}, options);
			appliedIds.push(action.id);
		}
	} catch (error) {
		try {
			await rollback();
		} catch (rollbackError) {
			throw new ClawCronUpdateError(`${error instanceof Error ? error.message : String(error)}; rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`, true);
		}
		throw new ClawCronUpdateError(error instanceof Error ? error.message : String(error), error instanceof ClawCronUpdateError && error.partial);
	}
	return {
		appliedIds,
		rollback
	};
}
//#endregion
//#region src/claws/mcp-update.ts
var ClawMcpUpdateError = class extends Error {
	constructor(message, partial = false) {
		super(message);
		this.partial = partial;
		this.name = "ClawMcpUpdateError";
	}
};
async function applyClawMcpUpdate(updatePlan, targetManifest, options) {
	const actions = updatePlan.actions.filter((action) => action.kind === "mcpServer" && action.action !== "unchanged");
	if (actions.length === 0) return {
		appliedNames: [],
		rollback: async () => void 0
	};
	const setServer = options.setServer ?? setConfiguredMcpServer;
	const unsetServer = options.unsetServer ?? unsetConfiguredMcpServer;
	const readRefs = options.readRefs ?? readClawMcpServerRefs;
	const planRemoval = options.planRemoval ?? planClawMcpServerRemoval;
	const upsertRef = options.upsertRef ?? upsertClawMcpServerRef;
	const deleteRef = options.deleteRef ?? deleteClawMcpServerRef;
	const currentRefs = new Map(readRefs(updatePlan.agentId, options).map((ref) => [ref.name, ref]));
	const currentServers = normalizeConfiguredMcpServers(options.sourceMcpServers);
	const undo = [];
	const appliedNames = [];
	const nowMs = options.nowMs ?? Date.now();
	let configMutationUncertain = false;
	const rollback = async () => {
		const failures = [];
		for (const revert of undo.toReversed()) try {
			await revert();
		} catch (error) {
			failures.push(error instanceof Error ? error.message : String(error));
		}
		if (failures.length > 0) throw new ClawMcpUpdateError(failures.join("; "));
	};
	try {
		for (const action of actions) {
			const name = action.id;
			const previousRef = currentRefs.get(name);
			const previousServer = currentServers[name];
			if (action.action === "add" && (previousServer || previousRef)) throw new ClawMcpUpdateError(`MCP server ${JSON.stringify(name)} appeared after planning and was not claimed.`);
			if (previousServer && !previousRef) throw new ClawMcpUpdateError(`MCP server ${JSON.stringify(name)} is not owned by this Claw.`);
			if (action.action === "release") {
				if (!previousRef) throw new ClawMcpUpdateError(`MCP reference ${JSON.stringify(name)} disappeared.`);
				if (previousServer !== void 0 && digestClawMcpServer(previousServer) === previousRef.configDigest && planRemoval(previousRef, options).action !== "release") throw new ClawMcpUpdateError(`MCP server ${JSON.stringify(name)} is no longer safely releasable.`);
				deleteRef(updatePlan.agentId, name, options);
				undo.push(async () => upsertRef(previousRef, options));
				appliedNames.push(name);
				continue;
			}
			if (action.action === "remove") {
				if (!previousServer || !previousRef) throw new ClawMcpUpdateError(`MCP server ${JSON.stringify(name)} disappeared.`);
				if (planRemoval(previousRef, options).action !== "remove") throw new ClawMcpUpdateError(`MCP server ${JSON.stringify(name)} gained another owner after planning.`);
				upsertRef({
					...previousRef,
					status: "pending",
					updatedAtMs: nowMs
				}, options);
				configMutationUncertain = true;
				const removed = await unsetServer({
					name,
					expectedServer: previousServer
				});
				configMutationUncertain = false;
				if (!removed.ok) throw new Error(removed.error);
				undo.push(async () => {
					const restored = await setServer({
						name,
						server: previousServer,
						createOnly: true,
						recordIndependentOwner: false
					});
					if (!restored.ok) throw new Error(restored.error);
					upsertRef(previousRef, options);
				});
				deleteRef(updatePlan.agentId, name, options);
				appliedNames.push(name);
				continue;
			}
			const targetServer = targetManifest.mcpServers[name];
			if (!targetServer) throw new ClawMcpUpdateError(`Target MCP declaration ${JSON.stringify(name)} is missing.`);
			const targetRef = {
				schemaVersion: CLAW_MCP_REF_SCHEMA_VERSION,
				agentId: updatePlan.agentId,
				name,
				configDigest: digestClawMcpServer(targetServer),
				relationship: previousRef?.relationship ?? "managed",
				origin: previousRef?.origin ?? "claw-introduced",
				independentOwner: previousRef?.independentOwner ?? false,
				status: "pending",
				createdAtMs: previousRef?.createdAtMs ?? nowMs,
				updatedAtMs: nowMs
			};
			upsertRef(targetRef, options);
			configMutationUncertain = true;
			const written = await setServer({
				name,
				server: targetServer,
				...previousServer ? { expectedServer: previousServer } : { createOnly: true },
				recordIndependentOwner: false
			});
			configMutationUncertain = false;
			if (!written.ok) throw new Error(written.error);
			undo.push(async () => {
				if (previousServer && previousRef) {
					const restored = await setServer({
						name,
						server: previousServer,
						expectedServer: targetServer,
						recordIndependentOwner: false
					});
					if (!restored.ok) throw new Error(restored.error);
					upsertRef(previousRef, options);
				} else {
					const removed = await unsetServer({
						name,
						expectedServer: targetServer
					});
					if (!removed.ok) throw new Error(removed.error);
					deleteRef(updatePlan.agentId, name, options);
				}
			});
			upsertRef({
				...targetRef,
				status: "complete"
			}, options);
			appliedNames.push(name);
		}
	} catch (error) {
		try {
			await rollback();
		} catch (rollbackError) {
			throw new ClawMcpUpdateError(`${error instanceof Error ? error.message : String(error)}; rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`, true);
		}
		throw new ClawMcpUpdateError(error instanceof Error ? error.message : String(error), configMutationUncertain || error instanceof ClawMcpUpdateError && error.partial);
	}
	return {
		appliedNames,
		rollback
	};
}
//#endregion
//#region src/claws/package-update-provenance.ts
function digestClawPackageRef(ref) {
	return `sha256:${createHash("sha256").update(stableStringify(ref)).digest("hex")}`;
}
function replaceClawPackageRefExpected(expected, replacement, options = {}) {
	const identity = expected ?? replacement;
	if (!identity) throw new Error("Package reference replacement requires an identity.");
	runOpenClawStateWriteTransaction(({ db }) => {
		if (expected) {
			const result = db.prepare(`DELETE FROM claw_package_refs
            WHERE agent_id = @agent_id
              AND package_kind = @package_kind
              AND package_source = @package_source
              AND package_ref = @package_ref
              AND package_version = @package_version
              AND package_integrity = @package_integrity
              AND schema_version = @schema_version
              AND claw_name = @claw_name
              AND package_status = @package_status
              AND relationship = @relationship
              AND origin = @origin
              AND independent_owner = @independent_owner
              AND installed_at_ms = @installed_at_ms
              AND updated_at_ms = @updated_at_ms`).run({
				agent_id: expected.agentId,
				package_kind: expected.kind,
				package_source: expected.source,
				package_ref: expected.ref,
				package_version: expected.version,
				package_integrity: expected.integrity,
				schema_version: expected.schemaVersion,
				claw_name: expected.clawName,
				package_status: expected.status,
				relationship: expected.relationship,
				origin: expected.origin,
				independent_owner: expected.independentOwner ? 1 : 0,
				installed_at_ms: expected.installedAtMs,
				updated_at_ms: expected.updatedAtMs
			});
			if (Number(result.changes) !== 1) throw new Error(`Package reference ${JSON.stringify(`${expected.kind}:${expected.ref}`)} changed after planning.`);
		} else if (db.prepare(`SELECT 1 FROM claw_package_refs
            WHERE agent_id = ? AND package_kind = ? AND package_source = ? AND package_ref = ?`).get(identity.agentId, identity.kind, identity.source, identity.ref)) throw new Error(`Package reference ${JSON.stringify(`${identity.kind}:${identity.ref}`)} appeared after planning.`);
		if (replacement) db.prepare(`INSERT INTO claw_package_refs (
           agent_id, package_kind, package_source, package_ref, package_version, package_integrity,
           schema_version, claw_name, package_status, relationship, origin, independent_owner,
           installed_at_ms, updated_at_ms
         ) VALUES (
           @agent_id, @package_kind, @package_source, @package_ref, @package_version, @package_integrity,
           @schema_version, @claw_name, @package_status, @relationship, @origin,
           @independent_owner, @installed_at_ms, @updated_at_ms
         )`).run({
			agent_id: replacement.agentId,
			package_kind: replacement.kind,
			package_source: replacement.source,
			package_ref: replacement.ref,
			package_version: replacement.version,
			package_integrity: replacement.integrity,
			schema_version: replacement.schemaVersion,
			claw_name: replacement.clawName,
			package_status: replacement.status,
			relationship: replacement.relationship,
			origin: replacement.origin,
			independent_owner: replacement.independentOwner ? 1 : 0,
			installed_at_ms: replacement.installedAtMs,
			updated_at_ms: replacement.updatedAtMs
		});
	}, options);
}
//#endregion
//#region src/claws/package-update.ts
var ClawPackageUpdateError = class extends Error {
	constructor(message, partial) {
		super(message);
		this.partial = partial;
		this.name = "ClawPackageUpdateError";
	}
};
function digest$3(value) {
	return `sha256:${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}
function packageKey(value) {
	return `${value.kind}:${value.ref}`;
}
async function applyClawPackageUpdate(updatePlan, targetManifest, targetAddPlan, options) {
	const actions = updatePlan.actions.filter((action) => action.kind === "package" && action.action !== "unchanged");
	if (actions.length === 0) return {
		appliedIds: [],
		rollback: async () => void 0
	};
	const installPackages = options.installPackages ?? installClawPackages;
	const readRefs = options.readRefs ?? readClawPackageRefs;
	const replaceExpected = options.replaceExpected ?? replaceClawPackageRefExpected;
	const currentRefs = new Map(readRefs({
		...options,
		agentId: updatePlan.agentId
	}).map((ref) => [packageKey(ref), ref]));
	const allRefs = readRefs(options);
	const targets = new Map(targetManifest.packages.map((pkg) => [packageKey(pkg), pkg]));
	const undo = [];
	const externalMutations = [];
	const appliedIds = [];
	const rollback = async () => {
		const failures = [];
		for (const revert of undo.toReversed()) try {
			await revert();
		} catch (error) {
			failures.push(error instanceof Error ? error.message : String(error));
		}
		if (externalMutations.length > 0) failures.push(`package artifacts may have been retained: ${externalMutations.join(", ")}`);
		if (failures.length > 0) throw new ClawPackageUpdateError(failures.join("; "), externalMutations.length > 0);
	};
	try {
		for (const action of actions) {
			const previous = currentRefs.get(action.id);
			if (previous && action.currentDigest && digestClawPackageRef(previous) !== action.currentDigest) throw new ClawPackageUpdateError(`Package reference ${JSON.stringify(action.id)} changed after planning.`, false);
			if (action.action === "release" || action.action === "remove") {
				if (!previous) throw new ClawPackageUpdateError(`Package reference ${JSON.stringify(action.id)} disappeared.`, false);
				replaceExpected(previous, void 0, options);
				undo.push(async () => replaceExpected(void 0, previous, options));
				appliedIds.push(action.id);
				continue;
			}
			const target = targets.get(action.id);
			const targetAction = targetAddPlan.actions.find((candidate) => candidate.kind === "package" && candidate.id === action.id);
			if (!target || !targetAction) throw new ClawPackageUpdateError(`Target package action ${JSON.stringify(action.id)} is missing.`, false);
			const targetIntegrity = targetAction.details?.integrity;
			if (typeof targetIntegrity !== "string") throw new ClawPackageUpdateError(`Target package action ${JSON.stringify(action.id)} has no resolved integrity.`, false);
			if (target.kind === "plugin" && allRefs.some((ref) => ref.agentId !== updatePlan.agentId && ref.kind === "plugin" && ref.source === target.source && ref.ref === target.ref && ref.version !== target.version)) throw new ClawPackageUpdateError(`Plugin ${JSON.stringify(target.ref)} has another Claw owner pinned to a different version.`, false);
			const nowMs = options.nowMs ?? Date.now();
			const reusesExistingArtifact = targetAction.details?.ownerAction === "reuse";
			let claimed = {
				schemaVersion: CLAW_PACKAGE_REF_SCHEMA_VERSION,
				agentId: updatePlan.agentId,
				clawName: targetAddPlan.claw.name,
				kind: target.kind,
				source: target.source,
				ref: target.ref,
				version: target.version,
				integrity: targetIntegrity,
				status: "pending",
				relationship: target.kind === "skill" ? "managed" : "referenced",
				origin: reusesExistingArtifact ? "pre-existing" : "claw-introduced",
				independentOwner: reusesExistingArtifact,
				installedAtMs: nowMs,
				updatedAtMs: nowMs
			};
			replaceExpected(previous, claimed, options);
			undo.push(async () => replaceExpected(claimed, previous, options));
			const installed = (await installPackages({
				...targetAddPlan,
				actions: [targetAction]
			}, {
				...options,
				deps: {
					...options.packageDeps,
					preflightPlugin: async (params) => {
						const preflight = await (options.packageDeps?.preflightPlugin ?? preflightPluginInstall)(params);
						const conflictingOwner = readRefs(options).some((ref) => ref.agentId !== updatePlan.agentId && ref.kind === "plugin" && ref.source === target.source && ref.ref === target.ref && ref.version !== target.version);
						return !preflight.ok && preflight.code === "plugin_version_conflict" && !conflictingOwner && previous?.origin === "claw-introduced" && !previous.independentOwner && previous.version === preflight.installedVersion && target.version === preflight.expectedVersion ? {
							ok: true,
							action: "install",
							request: preflight.request
						} : preflight;
					},
					persistPackageRef: (_plan, _pkg, persistOptions) => {
						const next = {
							...claimed,
							status: persistOptions?.status ?? "complete",
							relationship: persistOptions?.relationship ?? claimed.relationship,
							origin: persistOptions?.origin ?? claimed.origin,
							independentOwner: persistOptions?.independentOwner ?? claimed.independentOwner,
							updatedAtMs: nowMs
						};
						replaceExpected(claimed, next, options);
						claimed = next;
						return next;
					},
					completePackageRef: (ref, status) => {
						const next = {
							...ref,
							status,
							updatedAtMs: nowMs
						};
						replaceExpected(claimed, next, options);
						claimed = next;
						return next;
					}
				},
				onExternalMutation: () => {
					externalMutations.push(`${target.kind}:${target.ref}@${target.version}`);
				}
			})).find((ref) => packageKey(ref) === action.id && ref.version === target.version);
			if (!installed) throw new ClawPackageUpdateError(`Package installer did not return exact ownership for ${JSON.stringify(action.id)}.`, true);
			if (digest$3(installed) !== digest$3(claimed)) {
				replaceExpected(claimed, installed, options);
				claimed = installed;
			}
			appliedIds.push(action.id);
		}
	} catch (error) {
		if (externalMutations.length > 0) throw new ClawPackageUpdateError(`${error instanceof Error ? error.message : String(error)}; package artifact outcome requires reconciliation`, true);
		try {
			await rollback();
		} catch (rollbackError) {
			throw new ClawPackageUpdateError(`${error instanceof Error ? error.message : String(error)}; rollback incomplete: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`, externalMutations.length > 0);
		}
		throw new ClawPackageUpdateError(error instanceof Error ? error.message : String(error), error instanceof ClawPackageUpdateError ? error.partial : false);
	}
	return {
		appliedIds,
		rollback
	};
}
//#endregion
//#region src/claws/update-capability-changes.ts
function capabilityValue(summary, digestSource = summary) {
	return {
		summary,
		digest: `sha256:${createHash("sha256").update(stableStringify(digestSource)).digest("hex")}`
	};
}
function getPath(value, path) {
	let current = value;
	for (const segment of path) {
		if (!current || typeof current !== "object" || !Object.hasOwn(current, segment)) return;
		current = current[segment];
	}
	return current;
}
function sameValue(left, right) {
	return stableStringify(left) === stableStringify(right);
}
function summarizeAgentCapability(value) {
	return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? String(value) : stableStringify(value);
}
function rankedValue(value, rank) {
	return typeof value === "string" ? rank[value] ?? 0 : 0;
}
function compareRankedCapability(current, desired, rank) {
	const currentRank = rankedValue(current, rank);
	const desiredRank = rankedValue(desired, rank);
	return desiredRank > currentRank ? "escalation" : desiredRank < currentRank ? "reduction" : "neutral";
}
function classifyToolSet(current, desired) {
	if (!Array.isArray(current) || !Array.isArray(desired)) return "neutral";
	const currentTools = new Set(current.filter((value) => typeof value === "string"));
	const desiredTools = new Set(desired.filter((value) => typeof value === "string"));
	if (currentTools.has("*") !== desiredTools.has("*")) return desiredTools.has("*") ? "escalation" : "reduction";
	if (desiredTools.has("*")) return "neutral";
	if ([...desiredTools].some((tool) => !currentTools.has(tool))) return "escalation";
	return [...currentTools].some((tool) => !desiredTools.has(tool)) ? "reduction" : "neutral";
}
function classifyHeartbeatEvery(current, desired) {
	const toInterval = (value) => {
		if (value === "disabled") return 0;
		if (typeof value !== "string") return;
		try {
			return Math.max(0, parseDurationMs(value, { defaultUnit: "m" }));
		} catch {
			return;
		}
	};
	const currentMs = toInterval(current);
	const desiredMs = toInterval(desired);
	if (currentMs === void 0 || desiredMs === void 0 || currentMs === desiredMs) return "neutral";
	if (currentMs === 0) return "escalation";
	if (desiredMs === 0) return "reduction";
	return desiredMs < currentMs ? "escalation" : "reduction";
}
function classifyAgentCapability(path, current, desired, currentAgentExists) {
	if (path === "tools.profile" || path === "tools.allow" || path === "tools.deny") {
		if (!currentAgentExists && desired !== void 0) return "escalation";
		if (desired === void 0) return "escalation";
		if (current === void 0) return "reduction";
	}
	if (path === "tools.alsoAllow") {
		if (!currentAgentExists && desired !== void 0) return "escalation";
		if (desired === void 0) return "reduction";
		if (current === void 0) return "escalation";
	}
	if (desired === void 0) return "reduction";
	if (current === void 0) return "escalation";
	if (path === "sandbox.workspaceAccess") return compareRankedCapability(current, desired, {
		none: 0,
		ro: 1,
		rw: 2
	});
	if (path === "sandbox.mode") return compareRankedCapability(current, desired, {
		all: 0,
		"non-main": 1,
		off: 2
	});
	if (path === "sandbox.scope") return compareRankedCapability(current, desired, {
		session: 0,
		agent: 1,
		shared: 2
	});
	if (path === "heartbeat.every") return classifyHeartbeatEvery(current, desired);
	if (path === "heartbeat.isolatedSession") return desired === true ? "reduction" : "escalation";
	if (path === "heartbeat.timeoutSeconds") return typeof current === "number" && typeof desired === "number" && desired < current ? "reduction" : "escalation";
	if (path === "tools.fs.workspaceOnly") return desired === true ? "reduction" : "escalation";
	if (path === "memory.search.enabled") return desired === false ? "reduction" : "escalation";
	if (path === "memory.search.rememberAcrossConversations") return desired === true ? "escalation" : "reduction";
	if (path === "memory.search.sources") {
		if (!Array.isArray(current) || !Array.isArray(desired)) return desired === void 0 ? "reduction" : "escalation";
		const currentSources = new Set(current);
		return desired.some((source) => !currentSources.has(source)) ? "escalation" : "reduction";
	}
	if (path === "tools.deny") {
		if (!Array.isArray(current) || !Array.isArray(desired)) return "escalation";
		const desiredTools = new Set(desired.filter((value) => typeof value === "string"));
		if (current.some((value) => typeof value === "string" && !desiredTools.has(value))) return "escalation";
		const currentTools = new Set(current.filter((value) => typeof value === "string"));
		return desired.some((value) => typeof value === "string" && !currentTools.has(value)) ? "reduction" : "neutral";
	}
	if ((path === "tools.profile" || path === "tools.allow" || path === "tools.alsoAllow") && Array.isArray(current) && Array.isArray(desired)) return classifyToolSet(current, desired);
	return path.startsWith("sandbox.") || path.startsWith("tools.") || path.startsWith("heartbeat.") || path.startsWith("memory.search.") ? "escalation" : "neutral";
}
function resolveProfileCapabilities(value) {
	if (typeof value !== "string") return value;
	const policy = resolveToolProfilePolicy(value);
	return policy?.allow ? expandToolGroups(policy.allow).toSorted() : value;
}
function pushAgentCapabilityChanges(params) {
	for (const field of [
		["sandbox", "mode"],
		["sandbox", "scope"],
		["sandbox", "workspaceAccess"],
		["tools", "profile"],
		["tools", "allow"],
		["tools", "alsoAllow"],
		["tools", "deny"],
		[
			"tools",
			"fs",
			"workspaceOnly"
		],
		[
			"memory",
			"search",
			"enabled"
		],
		[
			"memory",
			"search",
			"rememberAcrossConversations"
		],
		[
			"memory",
			"search",
			"sources"
		],
		["heartbeat", "every"],
		["heartbeat", "activeHours"],
		["heartbeat", "isolatedSession"],
		["heartbeat", "timeoutSeconds"]
	]) {
		const sandboxField = field[0] === "sandbox" ? field.slice(1) : void 0;
		const heartbeatField = field[0] === "heartbeat" ? field.slice(1) : void 0;
		const memorySearchField = field[0] === "memory" && field[1] === "search" ? field.slice(2) : void 0;
		const effectiveToolField = field[0] === "tools" && (field[1] === "profile" || field[1] === "alsoAllow" || field[1] === "fs") ? field.slice(1) : void 0;
		const currentValue = sandboxField ? getPath(params.currentSandbox, sandboxField) : heartbeatField ? getPath(params.currentHeartbeat, heartbeatField) : memorySearchField ? getPath(params.currentMemorySearch, memorySearchField) : effectiveToolField ? getPath(params.currentTools, effectiveToolField) : getPath(params.currentAgent, field);
		const desiredValue = sandboxField ? getPath(params.desiredSandbox, sandboxField) : heartbeatField ? getPath(params.desiredHeartbeat, heartbeatField) : memorySearchField ? getPath(params.desiredMemorySearch, memorySearchField) : effectiveToolField ? getPath(params.desiredTools, effectiveToolField) : getPath(params.desiredAgent, field);
		const profileField = field[0] === "tools" && field[1] === "profile";
		const current = profileField ? resolveProfileCapabilities(currentValue) : currentValue;
		const desired = profileField ? resolveProfileCapabilities(desiredValue) : desiredValue;
		if (sameValue(current, desired)) continue;
		const path = field.join(".");
		const classification = classifyAgentCapability(path, current, desired, params.currentAgent !== void 0);
		params.changes.push({
			kind: "agent",
			id: params.agentId,
			path: `agent.${path}`,
			action: "change",
			classification,
			requiresDistinctConsent: classification === "escalation",
			reason: `Agent capability field ${path} changes in the target manifest.`,
			effect: profileField ? {
				path,
				current: currentValue,
				desired: desiredValue,
				currentCapabilities: current,
				desiredCapabilities: desired
			} : {
				path,
				current,
				desired
			},
			...currentValue === void 0 ? {} : { current: capabilityValue(summarizeAgentCapability(currentValue), profileField ? {
				value: currentValue,
				resolvedCapabilities: current
			} : current) },
			...desiredValue === void 0 ? {} : { desired: capabilityValue(summarizeAgentCapability(desiredValue), profileField ? {
				value: desiredValue,
				resolvedCapabilities: desired
			} : desired) }
		});
	}
}
function resolveHeartbeat(config, agentId) {
	const defaults = config.agents?.defaults?.heartbeat;
	const overrides = listAgentEntries(config).find((agent) => agent.id === agentId)?.heartbeat;
	return {
		...defaults,
		...overrides,
		every: resolveHeartbeatSummaryForAgent(config, agentId).every
	};
}
function resolvePortableTools(config, agentId) {
	const globalTools = config.tools;
	const agentTools = listAgentEntries(config).find((agent) => agent.id === agentId)?.tools;
	return {
		profile: agentTools?.profile ?? globalTools?.profile,
		alsoAllow: agentTools?.alsoAllow ?? globalTools?.alsoAllow,
		fs: { workspaceOnly: agentTools?.fs?.workspaceOnly ?? globalTools?.fs?.workspaceOnly ?? false }
	};
}
function resolvePortableMemorySearch(config, agentId) {
	const defaults = config.memory?.search;
	const overrides = listAgentEntries(config).find((agent) => agent.id === agentId)?.memory?.search;
	const enabled = overrides?.enabled ?? defaults?.enabled ?? true;
	const rememberAcrossConversations = resolveRememberAcrossConversations(config, agentId);
	const sessionMemory = rememberAcrossConversations || (overrides?.experimental?.sessionMemory ?? defaults?.experimental?.sessionMemory ?? false);
	const configuredSources = overrides?.sources ?? defaults?.sources ?? ["memory"];
	const sources = /* @__PURE__ */ new Set();
	for (const source of configuredSources) if (source === "memory" || source === "sessions" && sessionMemory) sources.add(source);
	if (rememberAcrossConversations) sources.add("sessions");
	if (sources.size === 0) sources.add("memory");
	return {
		enabled,
		rememberAcrossConversations,
		sources: [...sources].toSorted()
	};
}
function prepareCapabilityComparisonConfig(config, entries, preferredDefaultAgentId) {
	const comparisonEntries = entries.some((entry) => entry.default === true) ? entries : entries.map((entry) => entry.id === preferredDefaultAgentId ? {
		...entry,
		default: true
	} : entry);
	const { list: _legacyList, ...agents } = config.agents ?? {};
	return {
		...config,
		agents: {
			...agents,
			entries: toAgentEntriesRecord(comparisonEntries)
		}
	};
}
function pushResolvedAgentCapabilityChanges(params) {
	const currentAgents = listAgentEntries(params.config);
	const currentIndex = currentAgents.findIndex((agent) => agent.id === params.agentId);
	const currentAgent = currentIndex === -1 ? void 0 : currentAgents[currentIndex];
	const desiredAgents = [...currentAgents];
	if (currentIndex === -1) desiredAgents.push(params.desiredAgent);
	else desiredAgents[currentIndex] = params.desiredAgent;
	const currentConfig = prepareCapabilityComparisonConfig(params.config, currentAgents, params.agentId);
	const desiredConfig = prepareCapabilityComparisonConfig(params.config, desiredAgents, params.agentId);
	pushAgentCapabilityChanges({
		changes: params.changes,
		agentId: params.agentId,
		currentAgent,
		desiredAgent: params.desiredAgent,
		currentSandbox: currentAgent ? resolveSandboxConfigForAgent(currentConfig, params.agentId) : void 0,
		desiredSandbox: resolveSandboxConfigForAgent(desiredConfig, params.agentId),
		currentHeartbeat: currentAgent ? resolveHeartbeat(currentConfig, params.agentId) : void 0,
		desiredHeartbeat: resolveHeartbeat(desiredConfig, params.agentId),
		currentMemorySearch: currentAgent ? resolvePortableMemorySearch(params.config, params.agentId) : void 0,
		desiredMemorySearch: resolvePortableMemorySearch(desiredConfig, params.agentId),
		currentTools: currentAgent ? resolvePortableTools(params.config, params.agentId) : void 0,
		desiredTools: resolvePortableTools(desiredConfig, params.agentId)
	});
}
function packageCapabilityChange(params) {
	if (params.pkg.kind !== "plugin" || params.action === "unchanged") return;
	const reduction = params.desiredVersion === void 0;
	return {
		kind: "package",
		id: `plugin:${params.pkg.ref}`,
		path: `packages.plugin.${params.pkg.ref}`,
		action: params.action,
		classification: reduction ? "reduction" : "escalation",
		requiresDistinctConsent: !reduction,
		reason: reduction ? "Target manifest removes or releases plugin executable code." : "Target manifest adds or changes plugin executable code.",
		effect: {
			kind: params.pkg.kind,
			ref: params.pkg.ref,
			...params.desiredVersion ? { version: params.desiredVersion } : {},
			...params.integrity ? { integrity: params.integrity } : {},
			...params.installId ? { installId: params.installId } : {},
			...params.riskWarning ? { riskWarning: params.riskWarning } : {}
		},
		...params.currentVersion ? { current: capabilityValue(`version ${params.currentVersion}`) } : {},
		...params.desiredVersion ? { desired: capabilityValue(`version ${params.desiredVersion}`) } : {}
	};
}
function summarizeMcpCapability(server) {
	if (!server || typeof server !== "object") return "not configured";
	const value = server;
	const summary = [];
	if (typeof value.command === "string") summary.push(`local process (${Array.isArray(value.args) ? value.args.length : 0} args)`);
	else if (typeof value.url === "string") summary.push("remote server");
	else summary.push("configured server");
	if (value.auth !== void 0) summary.push("auth configured");
	if (value.toolFilter !== void 0) summary.push("tool filter configured");
	if (value.env && typeof value.env === "object") summary.push(`${Object.keys(value.env).length} env entries`);
	return summary.join("; ");
}
function summarizeMcpCapabilityEffect(server) {
	if (!server || typeof server !== "object") return { configured: false };
	const value = server;
	return {
		connection: typeof value.command === "string" ? "local-process" : typeof value.url === "string" ? "remote-server" : "configured-server",
		...typeof value.transport === "string" ? { transport: value.transport } : {},
		...typeof value.command === "string" ? {
			commandConfigured: true,
			argumentCount: Array.isArray(value.args) ? value.args.length : 0
		} : {},
		...value.auth !== void 0 ? { authConfigured: true } : {},
		...value.toolFilter !== void 0 ? { toolFilterConfigured: true } : {},
		...value.env && typeof value.env === "object" ? { envEntryCount: Object.keys(value.env).length } : {}
	};
}
function mcpCapabilityChange(params) {
	if (params.action === "unchanged") return;
	const reduction = params.desired === void 0;
	return {
		kind: "mcpServer",
		id: params.id,
		path: `mcpServers.${params.id}`,
		action: params.action,
		classification: reduction ? "reduction" : "escalation",
		requiresDistinctConsent: !reduction,
		reason: reduction ? "Target manifest removes or releases an MCP tool surface." : "Target manifest adds, restores, or changes an MCP tool surface.",
		effect: params.desired === void 0 ? { removed: true } : summarizeMcpCapabilityEffect(params.desired),
		...params.current === void 0 ? {} : { current: capabilityValue(summarizeMcpCapability(params.current), params.current) },
		...params.desired === void 0 ? {} : { desired: capabilityValue(summarizeMcpCapability(params.desired), params.desired) }
	};
}
function summarizeCronCapability(cron) {
	if (!cron || typeof cron !== "object") return "not configured";
	const value = cron;
	const schedule = value.schedule;
	return `schedule ${schedule ? Object.keys(schedule).find((key) => key !== "timezone") ?? "configured" : "configured"}; session ${typeof value.session === "string" ? value.session : "default"}; payload withheld`;
}
function summarizeCronCapabilityEffect(cron) {
	if (!cron || typeof cron !== "object") return { configured: false };
	const value = cron;
	const schedule = value.schedule;
	return {
		schedule: schedule && typeof schedule === "object" ? Object.keys(schedule).find((key) => key !== "timezone") ?? "configured" : "configured",
		timezoneConfigured: typeof schedule?.timezone === "string",
		session: typeof value.session === "string" ? value.session : "default",
		deliveryConfigured: value.delivery !== void 0,
		payloadWithheld: true
	};
}
function cronCapabilityChange(params) {
	if (params.action === "unchanged") return;
	const reduction = params.desired === void 0;
	return {
		kind: "cronJob",
		id: params.id,
		path: `cronJobs.${params.id}`,
		action: params.action,
		classification: reduction ? "reduction" : "escalation",
		requiresDistinctConsent: !reduction,
		reason: reduction ? "Target manifest removes a scheduled automation." : "Target manifest adds, restores, or changes a scheduled automation.",
		effect: params.desired === void 0 ? { removed: true } : summarizeCronCapabilityEffect(params.desired),
		...params.current === void 0 ? {} : { current: capabilityValue(summarizeCronCapability(params.current), params.current) },
		...params.desired === void 0 ? {} : { desired: capabilityValue(summarizeCronCapability(params.desired), params.desired) }
	};
}
//#endregion
//#region src/claws/update-plan-types.ts
const CLAW_UPDATE_PLAN_SCHEMA_VERSION = "openclaw.clawUpdatePlan.v1";
//#endregion
//#region src/claws/update-plan-empty.ts
function makeEmptyClawUpdatePlan(params) {
	const plan = {
		schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: true,
		mutationAllowed: false,
		found: params.found ?? false,
		agentId: params.agentId,
		...params.currentClaw ? { currentClaw: params.currentClaw } : {},
		...params.source ? { targetClaw: {
			name: params.source.name,
			version: params.source.version,
			integrity: params.source.integrity
		} } : {},
		summary: {
			totalActions: 0,
			added: 0,
			changed: 0,
			removed: 0,
			released: 0,
			unchanged: 0,
			manual: 0,
			blocked: 0,
			capabilityChanges: 0,
			capabilityEscalations: 0
		},
		actions: [],
		capabilityChanges: [],
		blockers: params.blockers,
		diagnostics: params.diagnostics ?? []
	};
	return {
		...plan,
		planIntegrity: params.digest(plan)
	};
}
//#endregion
//#region src/claws/update-plan-summary.ts
function summarizeClawUpdatePlan(actions, capabilityChanges) {
	return {
		totalActions: actions.length,
		added: actions.filter((action) => action.action === "add").length,
		changed: actions.filter((action) => action.action === "change").length,
		removed: actions.filter((action) => action.action === "remove").length,
		released: actions.filter((action) => action.action === "release").length,
		unchanged: actions.filter((action) => action.action === "unchanged").length,
		manual: actions.filter((action) => action.action === "manual").length,
		blocked: actions.filter((action) => action.blocked).length,
		capabilityChanges: capabilityChanges.length,
		capabilityEscalations: capabilityChanges.filter((change) => change.requiresDistinctConsent).length
	};
}
//#endregion
//#region src/claws/update-plan.ts
function digest$2(value) {
	return `sha256:${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}
function diagnostic(code, path, message) {
	return {
		level: "error",
		code,
		phase: "plan",
		path,
		message
	};
}
function manualState(state) {
	return state === "modified" || state === "unsafe" || state === "pending" || state === "failed";
}
async function buildClawUpdatePlan(params) {
	const ownsDatabase = !params.stateOptions?.database;
	const database = params.stateOptions?.database ?? await openExistingOpenClawStateDatabaseReadOnly(params.stateOptions);
	if (!database) return makeEmptyClawUpdatePlan({
		agentId: params.agentId,
		source: params.targetSource,
		blockers: [diagnostic("claw_not_found", "$", `No installed Claw agent matches ${JSON.stringify(params.agentId)}.`)],
		diagnostics: params.diagnostics,
		digest: digest$2
	});
	if (!database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_installs'").get()) {
		if (ownsDatabase) database.walMaintenance.close();
		return makeEmptyClawUpdatePlan({
			agentId: params.agentId,
			source: params.targetSource,
			blockers: [diagnostic("claw_not_found", "$", `No installed Claw agent matches ${JSON.stringify(params.agentId)}.`)],
			diagnostics: params.diagnostics,
			digest: digest$2
		});
	}
	const readOnlyStateOptions = {
		...params.stateOptions,
		database,
		readOnly: true
	};
	try {
		const status = await readClawStatus(params.agentId, {
			...readOnlyStateOptions,
			config: params.config,
			sourceMcpServers: params.sourceMcpServers
		});
		if (status.records.length === 0) return makeEmptyClawUpdatePlan({
			agentId: params.agentId,
			source: params.targetSource,
			blockers: [diagnostic("claw_not_found", "$", `No installed Claw agent matches ${JSON.stringify(params.agentId)}.`)],
			diagnostics: params.diagnostics,
			digest: digest$2
		});
		if (status.records.length > 1) return makeEmptyClawUpdatePlan({
			agentId: params.agentId,
			source: params.targetSource,
			found: true,
			blockers: [diagnostic("claw_ambiguous", "$", `Claw name ${JSON.stringify(params.agentId)} matches multiple agents; use an agent id.`)],
			diagnostics: params.diagnostics,
			digest: digest$2
		});
		const record = status.records[0];
		const agentId = record.install.agentId;
		if (record.install.claw.name !== params.targetSource.name) return makeEmptyClawUpdatePlan({
			agentId,
			source: params.targetSource,
			found: true,
			currentClaw: {
				name: record.install.claw.name,
				version: record.install.claw.version,
				integrity: record.install.claw.integrity
			},
			blockers: [diagnostic("claw_identity_mismatch", "$.name", `Target package ${JSON.stringify(params.targetSource.name)} does not match installed Claw ${JSON.stringify(record.install.claw.name)}.`)],
			diagnostics: params.diagnostics,
			digest: digest$2
		});
		const packageKey = (value) => `${value.kind}:${value.ref}`;
		const packagePreflights = /* @__PURE__ */ new Map();
		const targetPlan = await buildClawAddPlan({
			manifest: params.targetManifest,
			clawMarkdownBody: params.targetClawMarkdownBody,
			openClawProfile: params.targetOpenClawProfile,
			source: params.targetSource,
			diagnostics: params.diagnostics,
			context: {
				agentId,
				workspace: record.install.workspace,
				packagePreflight: async (pkg) => {
					const result = params.packagePreflight ? await params.packagePreflight(pkg, record.install.workspace) : {
						ok: false,
						code: "package_install_unavailable",
						message: "Package preflight is unavailable."
					};
					packagePreflights.set(packageKey(pkg), result);
					return result;
				}
			}
		});
		const blockers = targetPlan.blockers.filter((entry) => entry.code !== "workspace_collision" && entry.code !== "agent_id_collision" && !entry.path.startsWith("$.packages"));
		const actions = [];
		const capabilityChanges = [];
		const desiredAgentDigest = digest$2(targetPlan.agent.config);
		const agentAction = record.agentState === "modified" ? "manual" : record.agentState === "missing" ? "change" : record.install.agentConfigDigest === desiredAgentDigest ? "unchanged" : "change";
		actions.push({
			kind: "agent",
			id: agentId,
			action: agentAction,
			target: `agents.entries[${JSON.stringify(agentId)}]`,
			blocked: agentAction === "manual",
			reason: agentAction === "manual" ? "Live agent config changed after installation and must be reconciled manually." : record.agentState === "missing" ? "Owned agent config is missing and would be restored from the target manifest." : agentAction === "unchanged" ? "Owned agent config already matches the target manifest." : "Target manifest changes owned agent config.",
			...record.agentState === "missing" ? {} : { currentDigest: record.install.agentConfigDigest },
			desiredDigest: desiredAgentDigest
		});
		pushResolvedAgentCapabilityChanges({
			changes: capabilityChanges,
			agentId,
			config: params.config,
			desiredAgent: targetPlan.agent.config
		});
		const targetFiles = new Map(targetPlan.actions.filter((action) => action.kind === "workspaceFile").map((action) => [action.id, action]));
		const currentFiles = new Map(record.workspaceFiles.map((file) => [file.path, file]));
		let workspace;
		let workspaceState = "present";
		try {
			const workspaceStat = await lstat(record.install.workspace);
			if (!workspaceStat.isDirectory() || workspaceStat.isSymbolicLink()) workspaceState = "unsafe";
			else workspace = await root(record.install.workspace, {
				hardlinks: "reject",
				symlinks: "reject"
			});
		} catch (error) {
			workspaceState = error && typeof error === "object" && "code" in error && error.code === "ENOENT" ? "missing" : "unsafe";
		}
		for (const [path, target] of targetFiles) {
			const current = currentFiles.get(path);
			if (!target.digest) {
				actions.push({
					kind: "workspaceFile",
					id: path,
					action: "manual",
					target: `${record.install.workspace}:${path}`,
					blocked: true,
					reason: target.reason ?? "Target workspace source could not be verified."
				});
				continue;
			}
			let unownedDestination = workspaceState === "unsafe" ? "unsafe" : "absent";
			if (!current) {
				if (workspace) try {
					unownedDestination = await workspace.exists(path) ? "occupied" : "absent";
				} catch {
					unownedDestination = "unsafe";
				}
			}
			const currentFileRequiresManual = current !== void 0 && manualState(current.state) && !(workspaceState === "missing" && current.state === "unsafe");
			const action = workspaceState === "unsafe" ? "manual" : !current && unownedDestination !== "absent" ? "manual" : !current ? "add" : currentFileRequiresManual ? "manual" : current.contentDigest === target.digest && current.state === "unchanged" ? "unchanged" : "change";
			actions.push({
				kind: "workspaceFile",
				id: path,
				action,
				target: `${record.install.workspace}:${path}`,
				blocked: action === "manual",
				reason: unownedDestination === "occupied" ? "Workspace path already exists without Claw ownership and must be preserved." : unownedDestination === "unsafe" ? "Workspace path is unsafe to inspect and cannot be claimed automatically." : workspaceState === "missing" && current ? "Owned workspace is missing and this file would be restored." : action === "add" ? "Target manifest adds a managed workspace file." : action === "manual" ? "Local workspace content changed or became unsafe and must be reconciled manually." : action === "unchanged" ? "Managed workspace content already matches the target source." : "Target source changes or restores managed workspace content.",
				...current ? { currentDigest: current.contentDigest } : {},
				...current ? { currentPresent: current.state !== "missing" } : {},
				desiredDigest: target.digest
			});
		}
		for (const current of record.workspaceFiles) {
			if (targetFiles.has(current.path)) continue;
			const manual = workspaceState === "unsafe" || manualState(current.state) && !(workspaceState === "missing" && current.state === "unsafe");
			actions.push({
				kind: "workspaceFile",
				id: current.path,
				action: manual ? "manual" : "remove",
				target: `${current.workspace}:${current.path}`,
				blocked: manual,
				reason: manual ? "Target removes this file, but local drift must be preserved manually." : "Target manifest removes this managed workspace file.",
				currentDigest: current.contentDigest,
				currentPresent: current.state !== "missing"
			});
		}
		const allPackages = readClawPackageRefs(readOnlyStateOptions);
		const currentPackages = new Map(record.packages.map((pkg) => [packageKey(pkg), pkg]));
		const targetPackages = new Map(params.targetManifest.packages.map((pkg) => [packageKey(pkg), pkg]));
		for (const [key, target] of targetPackages) {
			const current = currentPackages.get(key);
			const preflight = packagePreflights.get(key);
			const requiresPackageMutation = !current || current.origin === "claw-introduced" && !current.independentOwner && (current.state === "missing" || current.version !== target.version);
			const expectedOwnedPluginUpgradeConflict = target.kind === "plugin" && current?.state === "present" && current.origin === "claw-introduced" && !current.independentOwner && current.version !== target.version && preflight?.code === "plugin_version_conflict" && preflight.installedVersion === current.version;
			const failedPackageMutationPreflight = requiresPackageMutation && !preflight?.ok && !expectedOwnedPluginUpgradeConflict;
			const conflictingPluginPin = target.kind === "plugin" && allPackages.some((candidate) => candidate.agentId !== agentId && candidate.kind === target.kind && candidate.source === target.source && candidate.ref === target.ref && candidate.version !== target.version);
			const unresolvedCurrent = current && [
				"modified",
				"ambiguous",
				"incomplete"
			].includes(current.state);
			const independentlyOwnedMutation = current && (current.origin === "pre-existing" || current.independentOwner) && (current.state === "missing" || current.version !== target.version);
			const action = conflictingPluginPin || unresolvedCurrent || independentlyOwnedMutation || failedPackageMutationPreflight ? "manual" : !current ? "add" : current.state === "missing" ? "change" : current.version === target.version ? "unchanged" : "change";
			actions.push({
				kind: "package",
				id: key,
				action,
				target: `${target.source}:${target.ref}@${target.version}`,
				blocked: action === "manual",
				reason: action === "manual" ? conflictingPluginPin ? "Another Claw pins an incompatible version of this shared plugin." : independentlyOwnedMutation ? "Package is independently owned and cannot be restored or changed by this Claw." : failedPackageMutationPreflight ? preflight?.message ?? "Package preflight failed." : `Current package lifecycle state is ${current?.state ?? "unknown"} and must be reconciled manually.` : action === "add" ? "Target manifest adds a package reference." : action === "unchanged" ? "Recorded package reference already matches the exact target version." : "Target manifest changes the exact package version.",
				...current ? { currentDigest: digestClawPackageRef(current) } : {},
				desiredDigest: digest$2({
					package: target,
					integrity: preflight?.integrity,
					installId: preflight?.installId,
					riskWarning: preflight?.warning
				})
			});
			const capabilityChange = packageCapabilityChange({
				pkg: target,
				action,
				currentVersion: current?.version,
				desiredVersion: target.version,
				integrity: preflight?.integrity,
				installId: preflight?.installId,
				riskWarning: preflight?.warning
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
			if (failedPackageMutationPreflight) {
				const index = params.targetManifest.packages.findIndex((pkg) => packageKey(pkg) === key);
				blockers.push(diagnostic(preflight?.code ?? "package_install_unavailable", `$.packages[${index}]`, preflight?.message ?? "Package preflight failed."));
			}
		}
		for (const [key, current] of currentPackages) if (!targetPackages.has(key)) {
			const manual = current.state !== "present";
			const action = manual ? "manual" : "release";
			actions.push({
				kind: "package",
				id: key,
				action,
				target: `${current.source}:${current.ref}@${current.version}`,
				blocked: manual,
				reason: manual ? `Target removes this package, but current lifecycle state is ${current.state}.` : "Target manifest releases this package dependency while preserving the artifact.",
				currentDigest: digestClawPackageRef(current)
			});
			const capabilityChange = packageCapabilityChange({
				pkg: current,
				action,
				currentVersion: current.version
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
		}
		const configuredMcpServers = normalizeConfiguredMcpServers(params.sourceMcpServers);
		const currentMcp = new Map(record.mcpServers.map((server) => [server.name, server]));
		for (const [name, target] of Object.entries(params.targetManifest.mcpServers)) {
			const current = currentMcp.get(name);
			const desiredDigest = digestClawMcpServer(target);
			const unownedLiveServer = !current && Object.hasOwn(configuredMcpServers, name);
			const sharedWithOtherClaws = current && readClawMcpServerRefsByName(name, readOnlyStateOptions).some((candidate) => candidate.agentId !== agentId);
			const independentlyOwnedMutation = current !== void 0 && (current.origin === "pre-existing" || current.independentOwner) && (current.configDigest !== desiredDigest || current.state !== "present");
			const sharedChange = sharedWithOtherClaws && current?.configDigest !== desiredDigest;
			const action = unownedLiveServer || independentlyOwnedMutation || sharedChange ? "manual" : !current ? "add" : manualState(current.state) ? "manual" : current.configDigest === desiredDigest && current.state === "present" ? "unchanged" : "change";
			actions.push({
				kind: "mcpServer",
				id: name,
				action,
				target: `mcp.servers.${name}`,
				blocked: action === "manual",
				reason: unownedLiveServer ? "MCP server name already exists without this Claw's ownership." : independentlyOwnedMutation ? "MCP server is independently owned and cannot be restored or changed by this Claw." : sharedChange ? "Another Claw shares this MCP declaration and blocks changing global config." : action === "manual" ? "MCP ownership is unresolved or live config drifted and must be reconciled manually." : action === "unchanged" ? "Owned MCP config digest already matches the target declaration." : `Target manifest ${action === "add" ? "adds" : "changes or restores"} this MCP declaration.`,
				...current ? { currentDigest: current.configDigest } : {},
				desiredDigest
			});
			const capabilityChange = mcpCapabilityChange({
				id: name,
				action,
				current: current ? configuredMcpServers[name] : void 0,
				desired: target
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
		}
		for (const current of record.mcpServers) {
			if (Object.hasOwn(params.targetManifest.mcpServers, current.name)) continue;
			const manual = current.state === "pending" || current.state === "failed";
			const sharedOrIndependent = current.relationship === "referenced" || current.origin === "pre-existing" || current.independentOwner || readClawMcpServerRefsByName(current.name, readOnlyStateOptions).some((candidate) => candidate.agentId !== agentId);
			const ownerAction = current.state === "present" && !sharedOrIndependent ? "remove" : "release";
			const action = manual ? "manual" : ownerAction;
			actions.push({
				kind: "mcpServer",
				id: current.name,
				action,
				target: `mcp.servers.${current.name}`,
				blocked: manual,
				reason: manual ? "Target removes this MCP declaration, but ownership is incomplete." : ownerAction === "release" ? "Target manifest releases this Claw's reference while preserving shared or independently owned MCP config." : "Target manifest removes this solely owned MCP declaration.",
				currentDigest: current.configDigest
			});
			const capabilityChange = mcpCapabilityChange({
				id: current.name,
				action,
				current: configuredMcpServers[current.name]
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
		}
		const currentCron = new Map(record.cronJobs.map((cron) => [cron.manifestId, cron]));
		for (const target of params.targetManifest.cronJobs) {
			const current = currentCron.get(target.id);
			const desiredDigest = digest$2(target);
			const unresolved = current && (current.status !== "complete" || !current.schedulerJobId);
			const action = !current ? "add" : unresolved ? "manual" : digest$2(current.job) === desiredDigest ? "unchanged" : "change";
			actions.push({
				kind: "cronJob",
				id: target.id,
				action,
				target: current?.schedulerJobId ?? `claw:${agentId}:${target.id}`,
				blocked: action === "manual",
				reason: action === "manual" ? "Cron ownership is unresolved and must be reconciled with the gateway." : action === "unchanged" ? "Recorded cron declaration already matches the target manifest." : `Target manifest ${action === "add" ? "adds" : "changes"} this cron declaration.`,
				...current ? { currentDigest: digest$2(current.job) } : {},
				desiredDigest
			});
			const capabilityChange = cronCapabilityChange({
				id: target.id,
				action,
				current: current?.job,
				desired: target
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
		}
		for (const current of record.cronJobs) {
			if (params.targetManifest.cronJobs.some((cron) => cron.id === current.manifestId)) continue;
			const manual = current.status !== "complete" || !current.schedulerJobId;
			const action = manual ? "manual" : "remove";
			actions.push({
				kind: "cronJob",
				id: current.manifestId,
				action,
				target: current.schedulerJobId ?? current.declarationKey,
				blocked: manual,
				reason: manual ? "Target removes this cron declaration, but scheduler ownership is unresolved." : "Target manifest removes this owned cron declaration.",
				currentDigest: digest$2(current.job)
			});
			const capabilityChange = cronCapabilityChange({
				id: current.manifestId,
				action,
				current: current.job
			});
			if (capabilityChange) capabilityChanges.push(capabilityChange);
		}
		actions.sort((left, right) => `${left.kind}:${left.id}`.localeCompare(`${right.kind}:${right.id}`));
		capabilityChanges.sort((left, right) => `${left.kind}:${left.id}:${left.path}`.localeCompare(`${right.kind}:${right.id}:${right.path}`));
		const plan = {
			schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: true,
			mutationAllowed: false,
			found: true,
			agentId,
			currentClaw: {
				name: record.install.claw.name,
				version: record.install.claw.version,
				integrity: record.install.claw.integrity
			},
			targetClaw: {
				name: params.targetSource.name,
				version: params.targetSource.version,
				integrity: params.targetSource.integrity
			},
			summary: summarizeClawUpdatePlan(actions, capabilityChanges),
			actions,
			capabilityChanges,
			blockers,
			diagnostics: params.diagnostics ?? []
		};
		return {
			...plan,
			planIntegrity: digest$2(plan)
		};
	} finally {
		if (ownsDatabase) database.walMaintenance.close();
	}
}
//#endregion
//#region src/claws/workspace-update.ts
const MAX_UPDATE_FILE_BYTES = 1024 * 1024;
var ClawWorkspaceUpdateError = class extends Error {
	constructor(message, partial = false) {
		super(message);
		this.partial = partial;
		this.name = "ClawWorkspaceUpdateError";
	}
};
function digest$1(content) {
	return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}
async function applyClawWorkspaceUpdate(updatePlan, targetAddPlan, options = {}) {
	const actions = updatePlan.actions.filter((action) => action.kind === "workspaceFile" && action.action !== "unchanged");
	if (actions.length === 0) return {
		appliedPaths: [],
		rollback: async () => void 0
	};
	const workspaceRoot = resolve(targetAddPlan.agent.workspace);
	const packageRoot = resolve(targetAddPlan.claw.packageRoot);
	const workspace = await root(workspaceRoot, {
		hardlinks: "reject",
		maxBytes: MAX_UPDATE_FILE_BYTES,
		symlinks: "reject"
	});
	const source = await root(packageRoot, {
		hardlinks: "reject",
		maxBytes: MAX_UPDATE_FILE_BYTES,
		symlinks: "reject"
	});
	const currentRefs = new Map(readClawWorkspaceFiles(updatePlan.agentId, options).map((record) => [record.path, record]));
	const targetActions = new Map(targetAddPlan.actions.filter((action) => action.kind === "workspaceFile").map((action) => [action.id, action]));
	const undo = [];
	const appliedPaths = [];
	const rollback = async () => {
		const failures = [];
		for (const revert of undo.toReversed()) try {
			await revert();
		} catch (error) {
			failures.push(error instanceof Error ? error.message : String(error));
		}
		if (failures.length > 0) throw new ClawWorkspaceUpdateError(failures.join("; "), true);
	};
	try {
		for (const action of actions) {
			const path = action.id;
			const previousRef = currentRefs.get(path);
			const existed = await workspace.exists(path);
			const previousContent = existed ? await workspace.readBytes(path, { maxBytes: MAX_UPDATE_FILE_BYTES }) : void 0;
			if (action.currentPresent === true && !existed) throw new ClawWorkspaceUpdateError(`Workspace file ${JSON.stringify(path)} disappeared after planning.`);
			if (action.currentPresent === false && existed) throw new ClawWorkspaceUpdateError(`Workspace file ${JSON.stringify(path)} appeared after planning.`);
			if (previousContent && action.currentDigest && digest$1(previousContent) !== action.currentDigest) throw new ClawWorkspaceUpdateError(`Workspace file ${JSON.stringify(path)} changed after planning.`);
			if (action.action === "add" && existed) throw new ClawWorkspaceUpdateError(`Workspace destination ${JSON.stringify(path)} appeared after planning.`);
			if (action.action === "remove") {
				undo.push(async () => {
					if (await workspace.exists(path)) throw new Error(`Workspace file ${JSON.stringify(path)} appeared before rollback.`);
					if (previousContent) await workspace.write(path, previousContent, {
						mkdir: true,
						overwrite: true
					});
					if (previousRef) upsertClawWorkspaceFile(previousRef, options);
				});
				if (existed) await workspace.remove(path);
				deleteClawWorkspaceFileRecord(updatePlan.agentId, path, options);
				appliedPaths.push(path);
				continue;
			}
			const target = targetActions.get(path);
			if (!target?.source || !target.digest) throw new ClawWorkspaceUpdateError(`Target workspace action ${JSON.stringify(path)} lacks source provenance.`);
			const resolvedSource = await readClawWorkspaceActionSource({
				action: target,
				packageRoot,
				sourceRoot: source
			});
			const content = resolvedSource.content;
			if (digest$1(content) !== target.digest || target.digest !== action.desiredDigest) throw new ClawWorkspaceUpdateError(`Workspace source for ${JSON.stringify(path)} changed after planning.`);
			const nowMs = options.nowMs ?? Date.now();
			const record = {
				schemaVersion: CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION,
				agentId: updatePlan.agentId,
				workspace: workspace.rootReal,
				path,
				sourcePath: resolvedSource.sourceRelative.replaceAll(sep, "/"),
				contentDigest: target.digest,
				status: "complete",
				createdAtMs: previousRef?.createdAtMs ?? nowMs,
				updatedAtMs: nowMs
			};
			undo.push(async () => {
				if (!await workspace.exists(path)) throw new Error(`Workspace file ${JSON.stringify(path)} disappeared before rollback.`);
				if (digest$1(await workspace.readBytes(path, { maxBytes: MAX_UPDATE_FILE_BYTES })) !== target.digest) throw new Error(`Workspace file ${JSON.stringify(path)} changed before rollback.`);
				if (previousContent) await workspace.write(path, previousContent, {
					mkdir: true,
					overwrite: true
				});
				else if (await workspace.exists(path)) await workspace.remove(path);
				if (previousRef) upsertClawWorkspaceFile(previousRef, options);
				else deleteClawWorkspaceFileRecord(updatePlan.agentId, path, options);
			});
			await workspace.write(path, content, {
				mkdir: true,
				overwrite: existed
			});
			upsertClawWorkspaceFile(record, options);
			appliedPaths.push(path);
		}
	} catch (error) {
		try {
			await rollback();
		} catch (rollbackError) {
			throw new ClawWorkspaceUpdateError(`${error instanceof Error ? error.message : String(error)}; rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`, true);
		}
		throw error;
	}
	return {
		appliedPaths,
		rollback
	};
}
//#endregion
//#region src/claws/update-apply.ts
const CLAW_UPDATE_RESULT_SCHEMA_VERSION = "openclaw.clawUpdateResult.v1";
function digest(value) {
	return `sha256:${createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}
var ClawUpdateMutationError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "ClawUpdateMutationError";
	}
};
function comparablePlan(plan) {
	return {
		found: plan.found,
		agentId: plan.agentId,
		currentClaw: plan.currentClaw,
		targetClaw: plan.targetClaw,
		actions: plan.actions,
		capabilityChanges: plan.capabilityChanges,
		blockers: plan.blockers
	};
}
async function applyClawUpdatePlan(plan, params, options) {
	if (options.consentPlanIntegrity !== plan.planIntegrity) throw new ClawUpdateMutationError("plan_integrity_mismatch", "Consent does not match the current Claw update plan; run update --dry-run again.");
	if (!plan.found || plan.blockers.length > 0 || plan.actions.some((action) => action.blocked)) throw new ClawUpdateMutationError("update_blocked", "The Claw update plan contains blockers or manual actions.");
	const fresh = await (options.rebuildPlan ?? buildClawUpdatePlan)({
		agentId: plan.agentId,
		targetManifest: params.targetManifest,
		targetClawMarkdownBody: params.targetClawMarkdownBody,
		targetOpenClawProfile: params.targetOpenClawProfile,
		targetSource: params.targetSource,
		config: options.config,
		sourceMcpServers: options.sourceMcpServers,
		stateOptions: options,
		packagePreflight: options.packagePreflight
	});
	if (fresh.planIntegrity !== plan.planIntegrity || stableStringify(comparablePlan(fresh)) !== stableStringify(comparablePlan(plan))) throw new ClawUpdateMutationError("update_changed", "Claw-owned state changed after update planning; build a new dry-run plan.");
	const actionable = fresh.actions.filter((action) => action.action !== "unchanged");
	const unsupported = actionable.filter((action) => action.kind !== "agent" && action.kind !== "workspaceFile" && action.kind !== "mcpServer" && action.kind !== "cronJob" && action.kind !== "package");
	if (unsupported.length > 0) throw new ClawUpdateMutationError("unsupported_update_actions", `This update slice cannot yet apply: ${unsupported.map((action) => `${action.kind}:${action.id}`).join(", ")}.`);
	if (!fresh.currentClaw || !fresh.targetClaw) throw new ClawUpdateMutationError("update_invalid", "The Claw update plan lacks identity.");
	const buildAddPlan = options.buildAddPlan ?? buildClawAddPlan;
	const currentInstall = (options.readInstall ?? readClawInstallRecord)(fresh.agentId, options);
	if (!currentInstall) throw new ClawUpdateMutationError("update_changed", "The Claw install record disappeared.");
	const partialMutation = (message) => {
		try {
			updateClawInstallRecordStatus(fresh.agentId, "partial", options);
		} catch {}
		return new ClawUpdateMutationError("update_partial", message);
	};
	const targetAddPlan = await buildAddPlan({
		manifest: params.targetManifest,
		clawMarkdownBody: params.targetClawMarkdownBody,
		openClawProfile: params.targetOpenClawProfile,
		source: params.targetSource,
		context: {
			agentId: fresh.agentId,
			workspace: currentInstall.workspace,
			packagePreflight: async (pkg, workspace) => {
				const preflight = options.packagePreflight ? await options.packagePreflight(pkg, workspace) : {
					ok: false,
					code: "package_install_unavailable",
					message: "Package preflight is unavailable."
				};
				const action = fresh.actions.find((candidate) => candidate.kind === "package" && candidate.id === `${pkg.kind}:${pkg.ref}`);
				return !preflight.ok && pkg.kind === "plugin" && preflight.code === "plugin_version_conflict" && action?.action === "change" ? {
					ok: true,
					action: "install",
					...preflight.integrity ? { integrity: preflight.integrity } : {},
					...preflight.installId ? { installId: preflight.installId } : {},
					...preflight.warning ? { warning: preflight.warning } : {}
				} : preflight;
			}
		}
	});
	if (targetAddPlan.blockers.some((blocker) => blocker.code !== "agent_id_collision" && blocker.code !== "workspace_collision")) throw new ClawUpdateMutationError("update_target_blocked", "The target Claw cannot be safely materialized for update.");
	const targetPackages = new Map(params.targetManifest.packages.map((pkg) => [`${pkg.kind}:${pkg.ref}`, pkg]));
	for (const action of fresh.actions.filter((candidate) => candidate.kind === "package" && candidate.action !== "release" && candidate.action !== "remove")) {
		const target = targetPackages.get(action.id);
		const details = targetAddPlan.actions.find((candidate) => candidate.kind === "package" && candidate.id === action.id)?.details;
		if (!target || action.desiredDigest !== digest({
			package: target,
			integrity: details?.integrity,
			installId: details?.installId,
			riskWarning: details?.riskWarning
		})) throw new ClawUpdateMutationError("update_changed", `Resolved package ${JSON.stringify(action.id)} changed after update planning; build a new dry-run plan.`);
	}
	const applyWorkspace = options.applyWorkspace ?? applyClawWorkspaceUpdate;
	let workspaceExecution;
	try {
		workspaceExecution = await applyWorkspace(fresh, targetAddPlan, options);
	} catch (error) {
		if (error instanceof ClawWorkspaceUpdateError && error.partial) throw partialMutation(error.message);
		throw new ClawUpdateMutationError("workspace_update_failed", error instanceof Error ? error.message : String(error));
	}
	const applyMcp = options.applyMcp ?? applyClawMcpUpdate;
	let mcpExecution;
	try {
		mcpExecution = await applyMcp(fresh, params.targetManifest, options);
	} catch (error) {
		const partial = error instanceof ClawMcpUpdateError && error.partial;
		try {
			await workspaceExecution.rollback();
		} catch (rollbackError) {
			throw partialMutation(`${error instanceof Error ? error.message : String(error)}; workspace rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		if (partial) throw partialMutation(`${error.message}; MCP config write outcome is uncertain`);
		throw new ClawUpdateMutationError("mcp_update_failed", error instanceof Error ? error.message : String(error));
	}
	const applyPackage = options.applyPackage ?? applyClawPackageUpdate;
	let packageExecution;
	try {
		packageExecution = await applyPackage(fresh, params.targetManifest, targetAddPlan, options);
	} catch (error) {
		const rollbackFailures = [];
		try {
			await mcpExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`MCP rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await workspaceExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`workspace rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		if (error instanceof ClawPackageUpdateError && error.partial) rollbackFailures.unshift("package artifact rollback is unavailable");
		if (rollbackFailures.length > 0) throw partialMutation(`${error instanceof Error ? error.message : String(error)}; ${rollbackFailures.join("; ")}`);
		throw new ClawUpdateMutationError("package_update_failed", error instanceof Error ? error.message : String(error));
	}
	const agentAction = fresh.actions.find((action) => action.kind === "agent");
	const commit = options.commitConfig ?? (async (transform) => {
		await transformConfigFileWithRetry({
			afterWrite: { mode: "auto" },
			transform: (config) => ({ nextConfig: transform(config) })
		});
	});
	let previousAgent;
	let agentChanged = false;
	const rollbackAgent = async () => {
		if (!agentChanged) return;
		await commit((config) => {
			const current = listAgentEntries(config).find((agent) => agent.id === fresh.agentId);
			const targetDigest = `sha256:${createHash("sha256").update(stableStringify(targetAddPlan.agent.config)).digest("hex")}`;
			if ((current ? `sha256:${createHash("sha256").update(stableStringify(current)).digest("hex")}` : void 0) !== targetDigest) throw new Error("The agent changed before rollback.");
			const nextEntries = { ...config.agents?.entries };
			if (previousAgent) {
				const { id: _id, ...previousEntry } = previousAgent;
				nextEntries[fresh.agentId] = previousEntry;
			} else delete nextEntries[fresh.agentId];
			return {
				...config,
				agents: {
					...config.agents,
					entries: nextEntries
				}
			};
		});
		agentChanged = false;
	};
	if (agentAction?.action === "change") try {
		await commit((config) => {
			const current = listAgentEntries(config).find((agent) => agent.id === fresh.agentId);
			previousAgent = current;
			if (agentAction.currentDigest !== void 0) {
				if (!current) throw new ClawUpdateMutationError("agent_changed", "The owned agent entry disappeared during update.");
				if (`sha256:${createHash("sha256").update(stableStringify(current)).digest("hex")}` !== agentAction.currentDigest) throw new ClawUpdateMutationError("agent_changed", "The owned agent entry changed during update.");
			}
			const nextEntries = { ...config.agents?.entries };
			const { id: _id, ...targetEntry } = targetAddPlan.agent.config;
			nextEntries[fresh.agentId] = targetEntry;
			agentChanged = true;
			return {
				...config,
				agents: {
					...config.agents,
					entries: nextEntries
				}
			};
		});
	} catch (error) {
		const rollbackFailures = [];
		try {
			await rollbackAgent();
		} catch (rollbackError) {
			rollbackFailures.push(`agent rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await packageExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`package rollback incomplete: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await mcpExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`MCP rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await workspaceExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`workspace rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		if (rollbackFailures.length > 0) throw partialMutation(`${error instanceof Error ? error.message : String(error)}; ${rollbackFailures.join("; ")}`);
		if (error instanceof ClawUpdateMutationError) throw error;
		throw new ClawUpdateMutationError("agent_update_failed", error instanceof Error ? error.message : String(error));
	}
	const persistInstall = options.persistInstall ?? updateClawInstallRecord;
	const applyCron = options.applyCron ?? applyClawCronUpdate;
	let cronExecution;
	try {
		cronExecution = await applyCron(fresh, params.targetManifest, options);
	} catch (error) {
		if (error instanceof ClawCronUpdateError && error.partial) {
			try {
				persistInstall(targetAddPlan, {
					...options,
					expectedClaw: fresh.currentClaw,
					status: "partial"
				});
			} catch (persistError) {
				throw partialMutation(`${error.message}; cron gateway mutation outcome is uncertain; provenance update failed: ${persistError instanceof Error ? persistError.message : String(persistError)}`);
			}
			throw partialMutation(`${error.message}; cron gateway mutation outcome is uncertain`);
		}
		const rollbackFailures = [];
		try {
			await rollbackAgent();
		} catch (rollbackError) {
			rollbackFailures.push(`agent rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await packageExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`package rollback incomplete: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await mcpExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`MCP rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await workspaceExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`workspace rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		if (rollbackFailures.length > 0) throw partialMutation(`${error instanceof Error ? error.message : String(error)}; ${rollbackFailures.join("; ")}`);
		throw new ClawUpdateMutationError("cron_update_failed", error instanceof Error ? error.message : String(error));
	}
	let installRecord;
	try {
		installRecord = persistInstall(targetAddPlan, {
			...options,
			expectedClaw: fresh.currentClaw
		});
	} catch (error) {
		const rollbackFailures = [];
		try {
			await rollbackAgent();
		} catch (rollbackError) {
			rollbackFailures.push(`agent rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await packageExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`package rollback incomplete: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await cronExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`cron rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await mcpExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`MCP rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		try {
			await workspaceExecution.rollback();
		} catch (rollbackError) {
			rollbackFailures.push(`workspace rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
		}
		if (rollbackFailures.length > 0) throw partialMutation(`${error instanceof Error ? error.message : String(error)}; ${rollbackFailures.join("; ")}`);
		throw new ClawUpdateMutationError("provenance_update_failed", error instanceof Error ? error.message : String(error));
	}
	return {
		schemaVersion: CLAW_UPDATE_RESULT_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: false,
		mutationAllowed: true,
		status: "complete",
		agentId: fresh.agentId,
		previousClaw: fresh.currentClaw,
		targetClaw: fresh.targetClaw,
		appliedActions: actionable,
		installRecord
	};
}
//#endregion
//#region src/cli/claws-cli-update-output.ts
function logClawUpdatePlanSummary(plan, runtime) {
	runtime.log(`Agent: ${plan.agentId}`);
	runtime.log(`Update actions: ${plan.summary.totalActions}`);
	runtime.log(`Add: ${plan.summary.added}; change: ${plan.summary.changed}; remove: ${plan.summary.removed}; release: ${plan.summary.released}; unchanged: ${plan.summary.unchanged}; manual: ${plan.summary.manual}`);
	runtime.log(`Capability changes: ${plan.summary.capabilityChanges}; escalations requiring explicit review: ${plan.summary.capabilityEscalations}`);
	runtime.log(`Plan integrity: ${plan.planIntegrity}`);
	if (plan.summary.capabilityEscalations > 0) runtime.log("Capability consent: the exact plan-integrity token binds every ! change disclosed below.");
	for (const change of plan.capabilityChanges) {
		const current = change.current?.summary ?? "unset";
		const desired = change.desired?.summary ?? "unset";
		runtime.log(`  ${change.requiresDistinctConsent ? "!" : "-"} ${change.path}: ${current} -> ${desired} (${change.action})`);
		runtime.log(redactSensitiveText(`      effect: ${JSON.stringify(change.effect)}`));
	}
	if (plan.blockers.length > 0) runtime.error(plan.blockers.map((diagnostic) => `${diagnostic.level.toUpperCase()} ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}`).join("\n"));
}
//#endregion
//#region src/cli/claws-update-cli.runtime.ts
function formatDiagnostics$1(diagnostics) {
	return diagnostics.map((diagnostic) => `${diagnostic.level.toUpperCase()} ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}`).join("\n");
}
function logExperimentalWarning$1(runtime) {
	runtime.log("Experimental: Claws contracts may change while RFC 0016 is under review.");
}
async function runClawsUpdateCommand(target, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	if (!opts.dryRun && (!opts.yes || !opts.planIntegrity)) {
		const message = "Claw update requires explicit consent; pass --dry-run to preview or --yes with --plan-integrity to apply supported actions.";
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			ok: false,
			error: {
				code: "consent_required",
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
		return;
	}
	const listedMcpServers = await listConfiguredMcpServers();
	if (!listedMcpServers.ok) {
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: true,
			mutationAllowed: false,
			valid: false,
			diagnostics: [{
				level: "error",
				code: "mcp_config_unavailable",
				phase: "plan",
				path: "$.mcpServers",
				message: listedMcpServers.error
			}]
		});
		else runtime.error(listedMcpServers.error);
		runtime.exit(1);
		return;
	}
	const config = listedMcpServers.config;
	let source = opts.from;
	if (!source) {
		const database = await openExistingOpenClawStateDatabaseReadOnly();
		let status = { records: [] };
		if (database) try {
			if (database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_installs'").get()) status = await readClawStatus(target, {
				database,
				readOnly: true,
				sourceMcpServers: listedMcpServers.mcpServers
			});
		} finally {
			database.walMaintenance.close();
		}
		if (status.records.length !== 1) {
			const message = status.records.length === 0 ? `No installed Claw agent matches ${JSON.stringify(target)}.` : `Claw name ${JSON.stringify(target)} matches multiple agents; use an agent id.`;
			if (opts.json) writeRuntimeJson(runtime, {
				schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
				stability: CLAW_OUTPUT_STABILITY,
				dryRun: true,
				mutationAllowed: false,
				valid: false,
				diagnostics: [{
					level: "error",
					code: status.records.length === 0 ? "claw_not_found" : "claw_ambiguous",
					phase: "plan",
					path: "$",
					message
				}]
			});
			else runtime.error(message);
			runtime.exit(1);
			return;
		}
		const recorded = status.records[0].install.claw;
		source = recorded.kind === "package" ? recorded.packageRoot : recorded.manifestPath;
	}
	const loaded = await readClawManifestFile(source);
	if (!loaded.ok) {
		const diagnostics = opts.from ? loaded.diagnostics : [...loaded.diagnostics, {
			level: "error",
			code: "recorded_source_unavailable",
			phase: "plan",
			path: "$",
			message: "The recorded Claw source is unavailable; pass --from to override it."
		}];
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_UPDATE_PLAN_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: true,
			mutationAllowed: false,
			valid: false,
			diagnostics
		});
		else runtime.error(formatDiagnostics$1(diagnostics));
		runtime.exit(1);
		return;
	}
	const plan = await buildClawUpdatePlan({
		agentId: target,
		targetManifest: loaded.manifest,
		targetClawMarkdownBody: loaded.clawMarkdownBody,
		targetOpenClawProfile: loaded.openClawProfile,
		targetSource: loaded.source,
		config,
		sourceMcpServers: listedMcpServers.mcpServers,
		packagePreflight: preflightClawPackage,
		diagnostics: loaded.diagnostics
	});
	if (opts.dryRun || plan.blockers.length > 0 || plan.actions.some((action) => action.blocked)) {
		if (opts.json) writeRuntimeJson(runtime, plan);
		else {
			logExperimentalWarning$1(runtime);
			runtime.log(`Claw update plan: ${plan.currentClaw?.name ?? target} ${plan.currentClaw?.version ?? "unknown"} -> ${plan.targetClaw?.version ?? "unknown"}`);
			runtime.log(`Plan integrity: ${plan.planIntegrity}`);
			logClawUpdatePlanSummary(plan, runtime);
		}
		if (plan.blockers.length > 0 || plan.actions.some((action) => action.blocked)) runtime.exit(1);
		return;
	}
	try {
		const result = await applyClawUpdatePlan(plan, {
			targetManifest: loaded.manifest,
			targetClawMarkdownBody: loaded.clawMarkdownBody,
			targetOpenClawProfile: loaded.openClawProfile,
			targetSource: loaded.source
		}, {
			config,
			sourceMcpServers: listedMcpServers.mcpServers,
			consentPlanIntegrity: opts.planIntegrity,
			packagePreflight: preflightClawPackage,
			cronGateway: {
				add: async (input) => await callGatewayFromCli("cron.add", {}, input),
				get: async (id) => await callGatewayFromCli("cron.get", {}, { id }),
				remove: async (id) => await callGatewayFromCli("cron.remove", {}, { id })
			}
		});
		if (opts.json) {
			writeRuntimeJson(runtime, result);
			return;
		}
		logExperimentalWarning$1(runtime);
		runtime.log(`Updated agent: ${result.agentId}`);
		runtime.log(`Claw version: ${result.previousClaw.version} -> ${result.targetClaw.version}`);
	} catch (error) {
		const code = error instanceof ClawUpdateMutationError ? error.code : "update_failed";
		const message = error instanceof Error ? error.message : String(error);
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_UPDATE_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			status: code === "update_partial" ? "partial" : "failed",
			error: {
				code,
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
	}
}
//#endregion
//#region src/cli/claws-cli.runtime.ts
function formatDiagnostics(diagnostics) {
	return diagnostics.map((diagnostic) => `${diagnostic.level.toUpperCase()} ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}`).join("\n");
}
function logExperimentalWarning(runtime) {
	runtime.log("Experimental: Claws contracts may change while RFC 0016 is under review.");
}
function logClawAddPlanSummary(plan, runtime) {
	runtime.log(`Agent: ${plan.agent.finalId}`);
	runtime.log(`Workspace: ${plan.agent.workspace}`);
	runtime.log(`Actions: ${plan.summary.totalActions}`);
	runtime.log(`Packages: ${plan.summary.packageActions}`);
	runtime.log(`MCP servers: ${plan.summary.mcpServerActions}`);
	for (const action of plan.actions.filter((candidate) => candidate.kind === "mcpServer")) {
		const server = action.details;
		const target = typeof server?.url === "string" ? redactSensitiveUrlLikeString(server.url) : typeof server?.command === "string" ? redactSensitiveArgv([server.command, ...Array.isArray(server.args) ? server.args.filter((arg) => typeof arg === "string") : []]).join(" ") : "invalid declaration";
		runtime.log(`  MCP ${action.id}: ${target}`);
	}
	runtime.log(`Cron jobs: ${plan.summary.cronJobActions}`);
	if (plan.capabilityChanges.length > 0) {
		runtime.log(`Capability escalations (${plan.capabilityChanges.length}):`);
		for (const change of plan.capabilityChanges) runtime.log(redactSensitiveText(`  ! ${change.kind}:${change.id} ${JSON.stringify(change.effect)}`));
		runtime.log("The plan integrity binds every capability line above.");
	}
	if (plan.summary.blockedActions > 0) runtime.log(`Blocked actions: ${plan.summary.blockedActions}`);
}
function matchingResumeRecord(plan, opts) {
	if (opts.dryRun || !opts.yes || !opts.planIntegrity) return;
	const record = readClawInstallRecord(plan.agent.finalId);
	if (!record || record.status === "complete" || record.planIntegrity !== opts.planIntegrity || record.workspace !== plan.agent.workspace || record.claw.kind !== plan.claw.kind || record.claw.name !== plan.claw.name || record.claw.version !== plan.claw.version || record.claw.integrity !== plan.claw.integrity) return;
	return record;
}
function failNonDryRun(opts, runtime) {
	if (opts.dryRun) return false;
	if (opts.yes && opts.planIntegrity) return false;
	const code = opts.yes ? "plan_integrity_required" : "consent_required";
	const message = opts.yes ? "Claw add consent must include --plan-integrity from the exact dry-run plan." : "Claw add requires explicit consent; pass --dry-run to preview or --yes with --plan-integrity to create the new agent and workspace.";
	if (opts.json) writeRuntimeJson(runtime, {
		schemaVersion: CLAW_ADD_PLAN_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		ok: false,
		error: {
			code,
			message
		}
	});
	else runtime.error(message);
	runtime.exit(1);
	return true;
}
function requireRemoveConsent(opts, runtime) {
	if (opts.dryRun || opts.yes && opts.planIntegrity) return false;
	const code = opts.yes ? "plan_integrity_required" : "consent_required";
	const message = opts.yes ? "Claw remove consent must include --plan-integrity from the exact dry-run plan." : "Claw remove requires explicit consent; pass --dry-run to preview or --yes with --plan-integrity to remove owned state.";
	if (opts.json) writeRuntimeJson(runtime, {
		schemaVersion: CLAW_REMOVE_PLAN_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		ok: false,
		error: {
			code,
			message
		}
	});
	else runtime.error(message);
	runtime.exit(1);
	return true;
}
async function runClawsInspectCommand(sourcePath, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	const result = await readClawManifestFile(sourcePath);
	if (!result.ok) {
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_INSPECT_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			valid: false,
			diagnostics: result.diagnostics
		});
		else runtime.error(formatDiagnostics(result.diagnostics));
		runtime.exit(1);
		return;
	}
	const payload = {
		schemaVersion: CLAW_INSPECT_RESULT_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		valid: true,
		source: result.source,
		manifest: result.manifest,
		...result.openClawProfile ? { openClawProfile: result.openClawProfile } : {},
		diagnostics: result.diagnostics
	};
	if (opts.json) {
		writeRuntimeJson(runtime, payload);
		return;
	}
	logExperimentalWarning(runtime);
	runtime.log(`Claw: ${result.source.name}@${result.source.version}`);
	runtime.log(`Agent: ${result.manifest.agent.name ?? result.manifest.agent.id}`);
	runtime.log(`Packages: ${result.manifest.packages.length}`);
	runtime.log(`MCP servers: ${Object.keys(result.manifest.mcpServers).length}`);
	runtime.log(`Cron jobs: ${result.manifest.cronJobs.length}`);
}
async function runClawsAddCommand(sourcePath, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	if (failNonDryRun(opts, runtime)) return;
	const result = await readClawManifestFile(sourcePath);
	if (!result.ok) {
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_ADD_PLAN_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			valid: false,
			diagnostics: result.diagnostics
		});
		else runtime.error(formatDiagnostics(result.diagnostics));
		runtime.exit(1);
		return;
	}
	const config = getRuntimeConfig();
	const listedMcpServers = await listConfiguredMcpServers();
	if (!listedMcpServers.ok) {
		runtime.error(listedMcpServers.error);
		runtime.exit(1);
		return;
	}
	const existingAgentIds = listAgentIds(config);
	const existingWorkspacePaths = existingAgentIds.map((agentId) => resolveAgentWorkspaceDir(config, agentId));
	const cronStore = await loadCronJobsStoreWithConfigJobsReadOnly(resolveCronJobsStorePath());
	const basePlanContext = {
		...opts.agentId ? { agentId: opts.agentId } : {},
		...opts.workspace ? { workspace: opts.workspace } : {},
		existingAgentIds,
		existingWorkspacePaths,
		existingMcpServers: listedMcpServers.mcpServers,
		existingCronJobIds: cronStore.store.jobs.map((job) => job.id),
		packagePreflight: preflightClawPackage
	};
	let plan = await buildClawAddPlan({
		manifest: result.manifest,
		clawMarkdownBody: result.clawMarkdownBody,
		openClawProfile: result.openClawProfile,
		source: result.source,
		diagnostics: result.diagnostics,
		context: basePlanContext
	});
	const resumeRecord = matchingResumeRecord(plan, opts);
	if (resumeRecord && plan.blockers.length > 0) {
		const canResumeWorkspace = resumeRecord.status === "workspace_ready" || resumeRecord.status === "config_committed";
		const committedAgent = listAgentEntries(config).find((agent) => stableStringify(agent) === stableStringify(plan.agent.config));
		const canResumeAgent = resumeRecord.status === "config_committed" || resumeRecord.status === "workspace_ready" && committedAgent !== void 0;
		plan = await buildClawAddPlan({
			manifest: result.manifest,
			clawMarkdownBody: result.clawMarkdownBody,
			openClawProfile: result.openClawProfile,
			source: result.source,
			diagnostics: result.diagnostics,
			context: {
				...basePlanContext,
				existingAgentIds: canResumeAgent ? existingAgentIds.filter((agentId) => agentId !== resumeRecord.agentId) : existingAgentIds,
				existingWorkspacePaths: canResumeWorkspace ? existingAgentIds.filter((agentId) => agentId !== resumeRecord.agentId).map((agentId) => resolveAgentWorkspaceDir(config, agentId)) : existingWorkspacePaths,
				...canResumeWorkspace ? { resumableWorkspace: resumeRecord.workspace } : {}
			}
		});
	}
	if (plan.blockers.length > 0) {
		if (opts.json) writeRuntimeJson(runtime, plan);
		else {
			logExperimentalWarning(runtime);
			logClawAddPlanSummary(plan, runtime);
			runtime.error(formatDiagnostics(plan.blockers));
		}
		runtime.exit(1);
		return;
	}
	if (opts.dryRun) {
		if (opts.json) writeRuntimeJson(runtime, plan);
		else {
			logExperimentalWarning(runtime);
			runtime.log(`Claw add plan: ${plan.claw.name}@${plan.claw.version}`);
			logClawAddPlanSummary(plan, runtime);
		}
		return;
	}
	if (opts.planIntegrity !== plan.planIntegrity) {
		const message = "The consented Claw plan no longer matches; run add --dry-run again.";
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_ADD_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			status: "failed",
			planIntegrity: plan.planIntegrity,
			error: {
				code: "plan_integrity_mismatch",
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
		return;
	}
	let addResult;
	try {
		addResult = await applyClawAddPlan(plan, {
			consentPlanIntegrity: opts.planIntegrity,
			runtime: opts.json ? {
				...runtime,
				log: () => void 0
			} : runtime,
			cronGateway: {
				add: async (input) => await callGatewayFromCli("cron.add", {}, input),
				list: async (agentId) => await callGatewayFromCli("cron.list", {}, {
					agentId,
					includeDisabled: true
				}),
				waitUntilAgentAvailable: async () => await waitUntilGatewayConfigApplied()
			}
		});
	} catch (error) {
		const code = error instanceof ClawAddMutationError ? error.code : "add_failed";
		const message = error.message;
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_ADD_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			status: "failed",
			error: {
				code,
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
		return;
	}
	if (opts.json) writeRuntimeJson(runtime, addResult);
	else {
		logExperimentalWarning(runtime);
		runtime.log(`Added agent: ${addResult.agent.finalId}`);
		runtime.log(`Workspace: ${addResult.agent.workspace}`);
		runtime.log(`Status: ${addResult.status}`);
	}
	if (addResult.status !== "complete") runtime.exit(1);
}
async function runClawsStatusCommand(target, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	const status = await readClawStatus(target);
	if (opts.json) writeRuntimeJson(runtime, status);
	else {
		logExperimentalWarning(runtime);
		runtime.log(`Installed Claws: ${status.summary.claws}`);
		for (const record of status.records) {
			runtime.log(`${record.install.agentId}: ${record.install.claw.name}@${record.install.claw.version} (${record.install.status})`);
			runtime.log(`  Agent: ${record.agentState}; files: ${record.workspaceFiles.length}; packages: ${record.packages.length}`);
		}
	}
	if (target && status.records.length === 0) runtime.exit(1);
}
async function runClawsRemoveCommand(target, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	if (requireRemoveConsent(opts, runtime)) return;
	const selected = opts.removeReferenced ?? [];
	if (opts.removeUnused && selected.length > 0) {
		runtime.error("Choose either --remove-unused or --remove-referenced, not both.");
		runtime.exit(1);
		return;
	}
	if (opts.forceReferenced && selected.length === 0) {
		runtime.error("--force-referenced requires at least one --remove-referenced selector.");
		runtime.exit(1);
		return;
	}
	const referencedCleanup = selected.length ? {
		mode: "remove-selected",
		selected,
		allowConflicts: Boolean(opts.forceReferenced)
	} : opts.removeUnused ? { mode: "remove-if-unused" } : { mode: "retain" };
	const plan = await buildClawRemovePlan(target, { referencedCleanup });
	if (opts.dryRun || plan.blockers.length > 0) {
		if (opts.json) writeRuntimeJson(runtime, plan);
		else {
			logExperimentalWarning(runtime);
			runtime.log(`Remove actions: ${plan.actions.length}`);
			runtime.log(`Plan integrity: ${plan.planIntegrity}`);
			for (const action of plan.actions.filter((candidate) => candidate.kind === "packageRef")) runtime.log(`  Package ${action.target}: ${action.action}${action.reason ? ` (${action.reason})` : ""}`);
			for (const action of plan.actions.filter((candidate) => candidate.kind === "mcpServer")) runtime.log(`  MCP ${action.id}: ${action.action}${action.reason ? ` (${action.reason})` : ""}`);
			if (plan.blockers.length > 0) runtime.error(plan.blockers.map((blocker) => blocker.message).join("\n"));
		}
		if (plan.blockers.length > 0) runtime.exit(1);
		return;
	}
	try {
		const result = await applyClawRemovePlan(plan, {
			consentPlanIntegrity: opts.planIntegrity,
			referencedCleanup,
			cronGateway: {
				get: async (id) => await callGatewayFromCli("cron.get", {}, { id }),
				remove: async (id) => await callGatewayFromCli("cron.remove", {}, { id })
			}
		});
		if (opts.json) writeRuntimeJson(runtime, result);
		else {
			logExperimentalWarning(runtime);
			runtime.log(`Removed agent: ${result.agentId}`);
			runtime.log(`Status: ${result.status}`);
			for (const pkg of result.packages) runtime.log(`  Package ${pkg.kind}:${pkg.ref}@${pkg.version}: ${pkg.action}${pkg.reason ? ` (${pkg.reason})` : ""}`);
			runtime.log(`Package references released: ${result.packageRefsReleased}`);
		}
		if (result.status !== "complete") runtime.exit(1);
	} catch (error) {
		const code = error instanceof ClawRemoveError ? error.code : "remove_failed";
		const message = error instanceof Error ? error.message : String(error);
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_REMOVE_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			status: "failed",
			error: {
				code,
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
	}
}
async function runClawsExportCommand(agentId, opts, runtime = defaultRuntime) {
	assertExperimentalClawsEnabled();
	try {
		const listedMcpServers = await listConfiguredMcpServers();
		if (!listedMcpServers.ok) throw new ClawExportError("mcp_config_unavailable", listedMcpServers.error);
		const result = await exportClawAgent(agentId, opts.out, {
			config: getRuntimeConfig(),
			sourceMcpServers: listedMcpServers.mcpServers
		});
		if (opts.json) {
			writeRuntimeJson(runtime, result);
			return;
		}
		logExperimentalWarning(runtime);
		runtime.log(`Exported agent: ${result.agentId}`);
		runtime.log(`Package directory: ${result.outputDirectory}`);
		runtime.log(`Workspace files: ${result.manifest.workspace.files.length + Object.keys(result.manifest.workspace.bootstrapFiles).length}`);
		runtime.log(`Packages: ${result.manifest.packages.length}`);
	} catch (error) {
		const code = error instanceof ClawExportError ? error.code : "export_failed";
		const message = error instanceof Error ? error.message : String(error);
		if (opts.json) writeRuntimeJson(runtime, {
			schemaVersion: CLAW_EXPORT_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			status: "failed",
			error: {
				code,
				message
			}
		});
		else runtime.error(message);
		runtime.exit(1);
	}
}
//#endregion
export { runClawsAddCommand, runClawsExportCommand, runClawsInspectCommand, runClawsRemoveCommand, runClawsStatusCommand, runClawsUpdateCommand };
