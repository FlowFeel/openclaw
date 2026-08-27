import "./src-COWbwBfI.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import { r as root } from "./fs-safe-DVaClkIX.js";
import { c as assertNoSymlinkParents } from "./regular-file-jv7y-frB.js";
import { c as resolveAgentDir, n as listAgentEntries } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { r as isDangerousHostEnvVarName } from "./host-env-security-D4EXCIbD.js";
import { t as parseClawHubPluginSpec } from "./clawhub-spec-CzLwxQg_.js";
import { At as boolean, Et as array, Nn as record, Rn as string, Tn as object, Xn as union, dn as literal, wn as number, yt as _enum } from "./schemas-CZ9Toj_c.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-BU55lNCH.js";
import "./agent-scope-DyEposw2.js";
import { S as normalizeClawHubSha256Integrity } from "./clawhub-Clykbwlp.js";
import { a as sha256Hex } from "./crypto-digest-CmUwt1S-.js";
import { n as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-COVyHO2A.js";
import { t as parseDurationMs } from "./parse-duration-Be19e01j.js";
import { a as isSupportedLocalAvatarExtension, d as isRenderableAvatarImageDataUrl, u as AVATAR_MAX_DATA_URL_CHARS } from "./avatar-policy-BX3hGmH_.js";
import { _ as resolveToolProfilePolicy } from "./tool-policy-CrjVfI-s.js";
import { r as normalizeConfiguredMcpServers, t as canonicalizeConfiguredMcpServer } from "./mcp-config-normalize-UWWF1cpp.js";
import "./config-UtpOr1Uw.js";
import { i as closeOpenClawAgentDatabaseByPath, it as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db--PLC25lY.js";
import "./installed-plugin-index-records-D-ObTfAD.js";
import { c as resolveSessionTranscriptsDirForAgent } from "./paths-DSnYpBD3.js";
import { i as deleteWorkspaceState, s as prepareWorkspaceStateDeletion } from "./workspace-state-store-BLsJEXll.js";
import { c as prepareLegacyWorkspaceStateReset, l as removeLegacyWorkspaceStateForReset } from "./workspace-legacy-state-C6Thdnz2.js";
import { c as moveToTrash } from "./onboard-helpers-BlDftc97.js";
import { t as normalizeCronJobCreate } from "./normalize-CupkFhHE.js";
import { n as createTrustedCronScheduledToolPolicy } from "./scheduled-tool-policy-wGs9bS6c.js";
import "./sessions-CBo4LOdS.js";
import { n as maintainClawPackageLifecycleLease, t as acquireClawPackageLifecycleLease } from "./claw-package-lifecycle-lease-CHOJplxB.js";
import { _ as resolveWorkspaceSkillInstallDir, a as resolveClawHubSkillStatusLinkSync, b as hasCommittedSkillChangeHooks, g as normalizeTrackedSkillSlug, p as untrackClawHubSkill, u as digestClawHubSkillTree, x as snapshotCommittedSkillArtifactBestEffort, y as dispatchCommittedSkillChangeBestEffort } from "./clawhub-DgSLScUf.js";
import { t as applyDefaultCronToolsAllow } from "./tools-allow-BSqnFkMT.js";
import { t as computeNextRunAtMs } from "./schedule-DgfSgRvu.js";
import { a as pruneAgentConfig } from "./agents.config-DbZD5Wjd.js";
import { n as setConfiguredMcpServer, r as unsetConfiguredMcpServer, t as listConfiguredMcpServers } from "./mcp-config-2xsKbArn.js";
import { t as withPluginLifecycleLease } from "./plugin-lifecycle-lease-Cz3f3Szj.js";
import { l as updateClawInstallRecordStatus, o as readClawInstallRecords, s as readClawPackageRefs, u as updateClawPackageRefStatus } from "./provenance-CmnK8gTm.js";
import { t as resolveCronJobConfigRevision } from "./config-revision-81P86BPA.js";
import { n as deleteAgentConfigEntry, t as AgentConfigPreconditionError } from "./agents-config-mutations-0fNSA6kW.js";
import { t as findOverlappingWorkspaceAgentIds } from "./agent-delete-safety-DPcBADNK.js";
import { t as runPluginUninstallCommand } from "./plugins-uninstall-command-Do2H_DcG.js";
import { r as resolvePluginInstallRequestContext } from "./plugin-install-config-policy-DKfm5jDQ.js";
import { createHash, randomUUID } from "node:crypto";
import path, { basename, dirname, isAbsolute, relative, resolve, sep } from "node:path";
import fs, { realpath, stat } from "node:fs/promises";
import { isScalar, parseDocument, visit } from "yaml";
//#region src/claws/cron.ts
const CLAW_CRON_REF_SCHEMA_VERSION = "openclaw.clawCronRef.v1";
var ClawCronInstallError = class extends Error {
	constructor(code, message, cronJobs) {
		super(message);
		this.code = code;
		this.cronJobs = cronJobs;
		this.name = "ClawCronInstallError";
	}
};
function rowToRef$1(row) {
	return {
		schemaVersion: CLAW_CRON_REF_SCHEMA_VERSION,
		agentId: row.agent_id,
		manifestId: row.manifest_id,
		declarationKey: row.declaration_key,
		...row.scheduler_job_id ? { schedulerJobId: row.scheduler_job_id } : {},
		status: row.status,
		job: JSON.parse(row.job_json),
		...row.error ? { error: row.error } : {},
		createdAtMs: Number(row.created_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function persistPendingRef$1(plan, job, options) {
	const nowMs = options.nowMs ?? Date.now();
	const declarationKey = `claw:${plan.agent.finalId}:${job.id}`;
	const existing = openOpenClawStateDatabase(options).db.prepare(`SELECT schema_version, agent_id, manifest_id, declaration_key, scheduler_job_id,
              status, job_json, error, created_at_ms, updated_at_ms
         FROM claw_cron_refs
        WHERE agent_id = ? AND manifest_id = ?`).get(plan.agent.finalId, job.id);
	if (existing) {
		const ref = rowToRef$1(existing);
		if (ref.declarationKey !== declarationKey || JSON.stringify(ref.job) !== JSON.stringify(job)) throw new ClawCronInstallError("cron_provenance_conflict", `Cron declaration ${JSON.stringify(job.id)} differs from its pending ownership record.`, [ref]);
		if (ref.status === "complete") return ref;
		return updateRef$1(ref, { status: "pending" }, options);
	}
	const record = {
		schemaVersion: CLAW_CRON_REF_SCHEMA_VERSION,
		agentId: plan.agent.finalId,
		manifestId: job.id,
		declarationKey,
		status: "pending",
		job,
		createdAtMs: nowMs,
		updatedAtMs: nowMs
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_cron_refs (
         agent_id, manifest_id, schema_version, declaration_key, scheduler_job_id,
         status, job_json, error, created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @manifest_id, @schema_version, @declaration_key, NULL,
         @status, @job_json, NULL, @created_at_ms, @updated_at_ms
       )`).run({
			agent_id: record.agentId,
			manifest_id: record.manifestId,
			schema_version: record.schemaVersion,
			declaration_key: record.declarationKey,
			status: record.status,
			job_json: JSON.stringify(record.job),
			created_at_ms: nowMs,
			updated_at_ms: nowMs
		});
	}, options);
	return record;
}
function updateRef$1(ref, update, options) {
	const updated = {
		...ref,
		...update,
		updatedAtMs: options.nowMs ?? Date.now()
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`UPDATE claw_cron_refs
          SET scheduler_job_id = @scheduler_job_id,
              status = @status,
              error = @error,
              updated_at_ms = @updated_at_ms
        WHERE agent_id = @agent_id AND manifest_id = @manifest_id`).run({
			agent_id: ref.agentId,
			manifest_id: ref.manifestId,
			scheduler_job_id: update.schedulerJobId ?? null,
			status: update.status,
			error: update.error ?? null,
			updated_at_ms: updated.updatedAtMs
		});
	}, options);
	return updated;
}
function clawCronSchedulerJobFromResult(value) {
	if (!value || typeof value !== "object") return;
	const record = value;
	if (typeof record.id === "string" && record.id) return { id: record.id };
	const job = record.job;
	if (job && typeof job === "object" && typeof job.id === "string") return { id: job.id };
}
function schedulerJobByDeclarationKey(value, declarationKey) {
	if (!value || typeof value !== "object") return;
	const jobs = value.jobs;
	if (!Array.isArray(jobs)) return;
	const matches = jobs.filter((job) => Boolean(job) && typeof job === "object" && job.declarationKey === declarationKey && typeof job.id === "string");
	const match = matches.length === 1 ? matches[0] : void 0;
	return match ? { id: match.id } : void 0;
}
function clawCronGatewayInput(agentId, ref) {
	const job = ref.job;
	return {
		name: job.name ?? job.id,
		declarationKey: ref.declarationKey,
		...job.name ? { displayName: job.name } : {},
		owner: { agentId },
		enabled: true,
		agentId,
		schedule: {
			kind: "cron",
			expr: job.schedule.cron,
			...job.schedule.timezone ? { tz: job.schedule.timezone } : {}
		},
		sessionTarget: job.session === "main" ? `session:agent:${agentId}:main` : job.session,
		wakeMode: "now",
		payload: {
			kind: "agentTurn",
			message: job.message
		},
		delivery: job.delivery ? {
			mode: job.delivery.mode,
			...job.delivery.channel ? { channel: job.delivery.channel } : {}
		} : { mode: "none" }
	};
}
function clawCronGatewayJobMatchesRef(agentId, ref, value) {
	if (!value || typeof value !== "object") return false;
	const live = value;
	const expected = normalizeCronJobCreate(clawCronGatewayInput(agentId, ref));
	if (!expected || typeof live.id !== "string" || typeof live.createdAtMs !== "number" || typeof live.updatedAtMs !== "number" || !live.state) return false;
	const comparableLive = {
		...live,
		payload: { ...live.payload }
	};
	applyDefaultCronToolsAllow(expected);
	applyDefaultCronToolsAllow(comparableLive);
	const expectedWithPolicy = {
		...expected,
		...comparableLive.scheduledToolPolicy ? { scheduledToolPolicy: createTrustedCronScheduledToolPolicy() } : {}
	};
	try {
		return resolveCronJobConfigRevision({
			...expectedWithPolicy,
			id: live.id,
			createdAtMs: live.createdAtMs,
			updatedAtMs: live.updatedAtMs,
			state: live.state
		}) === resolveCronJobConfigRevision(comparableLive);
	} catch {
		return false;
	}
}
async function installClawCronJobs(plan, options = {}) {
	const actions = plan.actions.filter((action) => action.kind === "cronJob");
	if (actions.length === 0) return [];
	if (!options.gateway) throw new ClawCronInstallError("cron_gateway_required", "Claw automations require the gateway-owned cron.add API.", []);
	const refs = [];
	let agentAvailable = false;
	for (const action of actions) {
		const details = action.details;
		if (!details?.id) throw new ClawCronInstallError("cron_plan_invalid", `Cron action ${action.id} is invalid.`, refs);
		const pending = persistPendingRef$1(plan, {
			id: details.id,
			...details.name ? { name: details.name } : {},
			schedule: details.schedule,
			session: details.session,
			message: details.message,
			...details.delivery ? { delivery: details.delivery } : {}
		}, options);
		refs.push(pending);
		if (pending.status === "complete" && pending.schedulerJobId) continue;
		let result;
		try {
			if (!agentAvailable) {
				await options.gateway.waitUntilAgentAvailable?.(plan.agent.finalId);
				agentAvailable = true;
			}
			if (options.gateway.list) result = schedulerJobByDeclarationKey(await options.gateway.list(plan.agent.finalId), pending.declarationKey);
			result ??= clawCronSchedulerJobFromResult(await options.gateway.add(clawCronGatewayInput(plan.agent.finalId, pending)));
			if (!result) throw new Error("cron.add returned no scheduler job id");
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			refs[refs.length - 1] = updateRef$1(pending, {
				status: "pending",
				error: message
			}, options);
			throw new ClawCronInstallError("cron_install_failed", message, refs);
		}
		try {
			refs[refs.length - 1] = updateRef$1(pending, {
				status: "complete",
				schedulerJobId: result.id
			}, options);
		} catch (error) {
			throw new ClawCronInstallError("cron_provenance_failed", `cron.add succeeded, but its scheduler id could not be persisted: ${error instanceof Error ? error.message : String(error)}`, refs);
		}
	}
	return refs;
}
function readClawCronRefs(agentId, options = {}) {
	const database = openOpenClawStateDatabase(options);
	if (options.readOnly && !database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_cron_refs'").get()) return [];
	return database.db.prepare(`SELECT schema_version, agent_id, manifest_id, declaration_key, scheduler_job_id,
              status, job_json, error, created_at_ms, updated_at_ms
         FROM claw_cron_refs
        WHERE agent_id = ?
        ORDER BY manifest_id`).all(agentId).map(rowToRef$1);
}
function deleteClawCronRef(agentId, manifestId, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare("DELETE FROM claw_cron_refs WHERE agent_id = ? AND manifest_id = ?").run(agentId, manifestId);
	}, options);
}
function markClawCronRefRemoved(agentId, manifestId, options = {}) {
	const ref = readClawCronRefs(agentId, options).find((candidate) => candidate.manifestId === manifestId);
	return ref ? updateRef$1(ref, { status: "removed" }, options) : void 0;
}
function upsertClawCronRef(ref, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_cron_refs (
         agent_id, manifest_id, schema_version, declaration_key, scheduler_job_id,
         status, job_json, error, created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @manifest_id, @schema_version, @declaration_key, @scheduler_job_id,
         @status, @job_json, @error, @created_at_ms, @updated_at_ms
       )
       ON CONFLICT(agent_id, manifest_id) DO UPDATE SET
         schema_version = excluded.schema_version,
         declaration_key = excluded.declaration_key,
         scheduler_job_id = excluded.scheduler_job_id,
         status = excluded.status,
         job_json = excluded.job_json,
         error = excluded.error,
         updated_at_ms = excluded.updated_at_ms`).run({
			agent_id: ref.agentId,
			manifest_id: ref.manifestId,
			schema_version: ref.schemaVersion,
			declaration_key: ref.declarationKey,
			scheduler_job_id: ref.schedulerJobId ?? null,
			status: ref.status,
			job_json: JSON.stringify(ref.job),
			error: ref.error ?? null,
			created_at_ms: ref.createdAtMs,
			updated_at_ms: ref.updatedAtMs
		});
	}, options);
}
//#endregion
//#region src/claws/lifecycle-delete-support.ts
var ClawRemoveError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "ClawRemoveError";
	}
};
function clawStateTableExists(db, name) {
	return Boolean(db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name));
}
function rowToWorkspaceFile$1(row) {
	return {
		schemaVersion: row.schema_version,
		agentId: row.agent_id,
		workspace: row.workspace,
		path: row.target_path,
		sourcePath: row.source_path,
		contentDigest: row.content_digest,
		status: row.status,
		createdAtMs: Number(row.created_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function readAllClawWorkspaceFiles(options) {
	const database = openOpenClawStateDatabase(options);
	if (!clawStateTableExists(database.db, "claw_workspace_files")) return [];
	return database.db.prepare(`SELECT schema_version, agent_id, workspace, target_path, source_path,
              content_digest, status, created_at_ms, updated_at_ms
         FROM claw_workspace_files
        ORDER BY agent_id, target_path`).all().map(rowToWorkspaceFile$1);
}
function synthesizeOrphanInstall(params) {
	const updatedAtMs = params.updatedAtMs ?? 0;
	return {
		schemaVersion: "openclaw.clawInstallRecord.v1",
		claw: {
			kind: "development",
			name: params.clawName ?? `orphan:${params.agentId}`,
			version: "0.0.0",
			packageRoot: "",
			manifestPath: "",
			integrityKind: "development-snapshot",
			integrity: "sha256:orphan",
			byteLength: 0
		},
		manifestSchemaVersion: 1,
		planIntegrity: "sha256:orphan",
		agentId: params.agentId,
		workspace: params.workspace ?? "",
		agentConfigDigest: "sha256:missing",
		agentOwnedPaths: [],
		status: "partial",
		addedAtMs: updatedAtMs,
		updatedAtMs
	};
}
function deletionEffects(config, agentId, fallbackWorkspace = "") {
	const agent = listAgentEntries(config).find((candidate) => candidate.id === agentId);
	const pruned = pruneAgentConfig(config, agentId);
	const workspace = agent?.workspace ?? fallbackWorkspace;
	const agentDir = resolveAgentDir(config, agentId);
	const sessionsDir = resolveSessionTranscriptsDirForAgent(agentId);
	const workspaceSharedWith = workspace ? findOverlappingWorkspaceAgentIds(config, agentId, workspace) : [];
	return {
		pruned,
		workspace,
		agentDir,
		sessionsDir,
		workspaceSharedWith,
		workspaceRetained: workspaceSharedWith.length > 0
	};
}
/** Inventories cron jobs that would retain a reference to a removed agent. */
function readAttachedCronJobs(agentId, options) {
	const database = openOpenClawStateDatabase(options);
	if (!clawStateTableExists(database.db, "cron_jobs")) return [];
	return database.db.prepare(`SELECT job_id AS id, name, enabled, agent_id AS agentId, owner_agent_id AS ownerAgentId
         FROM cron_jobs
        WHERE agent_id = ? OR owner_agent_id = ?
        ORDER BY job_id`).all(agentId, agentId).map((row) => {
		const value = row;
		return {
			id: value.id,
			name: value.name,
			enabled: value.enabled === 1,
			agentId: value.agentId,
			ownerAgentId: value.ownerAgentId
		};
	});
}
/** Returns true when removing a workspace would discard anything outside Claw provenance. */
async function workspaceContainsUntrackedEntries(workspaceRoot, trackedPaths) {
	const tracked = new Set(trackedPaths.map((entry) => path.normalize(entry)));
	const trackedDirectories = /* @__PURE__ */ new Set();
	for (const trackedPath of tracked) {
		let parent = path.dirname(trackedPath);
		while (parent && parent !== ".") {
			trackedDirectories.add(parent);
			const next = path.dirname(parent);
			if (next === parent) break;
			parent = next;
		}
	}
	const walk = async (absoluteDir, relativeDir = "") => {
		const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
		for (const entry of entries) {
			const relativeEntry = path.join(relativeDir, entry.name);
			if (entry.isDirectory() && !entry.isSymbolicLink()) {
				if (!trackedDirectories.has(path.normalize(relativeEntry))) return true;
				if (await walk(path.join(absoluteDir, entry.name), relativeEntry)) return true;
				continue;
			}
			if (!tracked.has(path.normalize(relativeEntry))) return true;
		}
		return false;
	};
	try {
		return await walk(workspaceRoot);
	} catch (error) {
		return error.code !== "ENOENT";
	}
}
/** Applies canonical post-config filesystem cleanup and reports every failed effect. */
async function cleanupClawAgentFilesystem(params) {
	const errors = [];
	const trashPath = params.trashPath ?? moveToTrash;
	const workspaceSharedWith = params.targets.workspaceDir ? findOverlappingWorkspaceAgentIds(params.nextConfig, params.agentId, params.targets.workspaceDir) : [];
	if (params.targets.workspaceDir && !params.retainWorkspace && workspaceSharedWith.length === 0) {
		const legacyPlan = prepareLegacyWorkspaceStateReset(params.targets.workspaceDir);
		const statePlan = prepareWorkspaceStateDeletion(params.targets.workspaceDir);
		if (await trashPath(params.targets.workspaceDir, params.runtime)) try {
			const legacyCleanup = await removeLegacyWorkspaceStateForReset(legacyPlan);
			for (const warning of legacyCleanup.warnings) params.runtime.log(warning);
			deleteWorkspaceState(statePlan);
		} catch (error) {
			errors.push(error instanceof Error ? error.message : String(error));
		}
		else errors.push(`Could not trash workspace ${params.targets.workspaceDir}.`);
	}
	if (!await trashPath(params.targets.agentDir, params.runtime)) errors.push(`Could not trash agent state ${params.targets.agentDir}.`);
	if (!await trashPath(params.targets.sessionsDir, params.runtime)) errors.push(`Could not trash session transcripts ${params.targets.sessionsDir}.`);
	return errors;
}
const clawRemoveQuietRuntime = {
	log: (..._args) => void 0,
	error: (..._args) => void 0,
	exit: (code) => {
		throw new Error(`Unexpected exit during Claw removal cleanup: ${code ?? 1}`);
	}
};
async function inspectClawWorkspaceFile(record) {
	try {
		const workspace = await root(record.workspace, {
			hardlinks: "reject",
			maxBytes: 1024 * 1024,
			symlinks: "reject"
		});
		if (!await workspace.exists(record.path)) return {
			...record,
			state: "missing"
		};
		const content = await workspace.readBytes(record.path, { maxBytes: 1024 * 1024 });
		const digest = `sha256:${createHash("sha256").update(content).digest("hex")}`;
		return {
			...record,
			state: digest === record.contentDigest ? "unchanged" : "modified"
		};
	} catch (error) {
		if (error.code === "ENOENT") return {
			...record,
			state: "missing"
		};
		return {
			...record,
			state: "unsafe",
			message: error instanceof Error ? error.message : String(error)
		};
	}
}
async function removeClawWorkspaceFile(record) {
	if (record.state === "missing") return {
		path: record.path,
		action: "missing"
	};
	if (record.state === "modified") return {
		path: record.path,
		action: "retainedModified"
	};
	try {
		const workspace = await root(record.workspace, {
			hardlinks: "reject",
			maxBytes: 1024 * 1024,
			symlinks: "reject"
		});
		if (!await workspace.exists(record.path)) return {
			path: record.path,
			action: "missing"
		};
		const stagedPath = `${record.path}.openclaw-claw-remove-${randomUUID()}`;
		await workspace.move(record.path, stagedPath, { overwrite: false });
		const content = await workspace.readBytes(stagedPath, { maxBytes: 1024 * 1024 });
		if (`sha256:${createHash("sha256").update(content).digest("hex")}` !== record.contentDigest) {
			await workspace.move(stagedPath, record.path, { overwrite: false });
			return {
				path: record.path,
				action: "retainedModified"
			};
		}
		await workspace.remove(stagedPath);
		return {
			path: record.path,
			action: "deleted"
		};
	} catch (error) {
		return {
			path: record.path,
			action: "error",
			message: error instanceof FsSafeError ? `${error.code}: ${error.message}` : String(error)
		};
	}
}
function releaseClawRemoveRows(agentId, files, complete, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		if (clawStateTableExists(db, "claw_workspace_files")) for (const file of files.filter((candidate) => candidate.action !== "error")) db.prepare("DELETE FROM claw_workspace_files WHERE agent_id = ? AND target_path = ?").run(agentId, file.path);
		if (!complete) return;
		if (clawStateTableExists(db, "claw_package_refs")) db.prepare("DELETE FROM claw_package_refs WHERE agent_id = ?").run(agentId);
		if (clawStateTableExists(db, "claw_installs")) db.prepare("DELETE FROM claw_installs WHERE agent_id = ?").run(agentId);
	}, options);
}
//#endregion
//#region src/claws/lifecycle-config-removal.ts
function digestClawAgentConfig(agent) {
	return `sha256:${createHash("sha256").update(stableStringify(agent)).digest("hex")}`;
}
function digestClawAgentRemovalSurface(config, agentId) {
	const normalizedId = normalizeAgentId(agentId);
	const surface = {
		bindings: (config.bindings ?? []).filter((binding) => normalizeAgentId(binding.agentId) === normalizedId),
		agentToAgentAllow: (config.tools?.agentToAgent?.allow ?? []).filter((entry) => entry === normalizedId)
	};
	return `sha256:${createHash("sha256").update(stableStringify(surface)).digest("hex")}`;
}
async function claimClawAgentConfigRemoval(params) {
	if (params.commitConfig) {
		let result;
		await params.commitConfig((config) => {
			const effects = deletionEffects(config, params.agentId, params.fallbackWorkspace);
			const agent = listAgentEntries(config).find((candidate) => candidate.id === params.agentId);
			if (agent && digestClawAgentConfig(agent) !== params.expectedDigest || digestClawAgentRemovalSurface(config, params.agentId) !== params.expectedRemovalSurfaceDigest) throw params.onModified();
			result = {
				agentRemoved: Boolean(agent),
				...params.trashPath ? { cleanupTargets: {
					workspaceDir: effects.workspace,
					agentDir: effects.agentDir,
					sessionsDir: effects.sessionsDir
				} } : {},
				configBeforeDelete: config,
				nextConfig: effects.pruned.config
			};
			return effects.pruned.config;
		});
		if (!result) throw new Error("Claw config removal did not run its commit transform.");
		return result;
	}
	const configBeforeDelete = params.config ?? getRuntimeConfig();
	try {
		const committed = await deleteAgentConfigEntry({
			agentId: params.agentId,
			allowConfigSizeDrop: true,
			allowMissing: params.expectedState === "missing",
			fallbackWorkspace: params.fallbackWorkspace,
			validateConfig: (config) => {
				if (digestClawAgentRemovalSurface(config, params.agentId) !== params.expectedRemovalSurfaceDigest) throw params.onModified();
			},
			validate: (agent) => {
				if (params.expectedState === "missing") throw params.onModified();
				if (digestClawAgentConfig(agent) !== params.expectedDigest) throw params.onModified();
			}
		});
		const fallbackEffects = deletionEffects(configBeforeDelete, params.agentId, params.fallbackWorkspace);
		return {
			agentRemoved: Boolean(committed.result),
			cleanupTargets: committed.result ?? {
				workspaceDir: fallbackEffects.workspace,
				agentDir: fallbackEffects.agentDir,
				sessionsDir: fallbackEffects.sessionsDir
			},
			configBeforeDelete,
			nextConfig: committed.nextConfig
		};
	} catch (error) {
		if (!(error instanceof AgentConfigPreconditionError)) throw error;
		const latestConfig = getRuntimeConfig();
		if (listAgentEntries(latestConfig).some((agent) => agent.id === params.agentId)) throw params.onModified();
		const effects = deletionEffects(latestConfig, params.agentId, params.fallbackWorkspace);
		return {
			agentRemoved: false,
			cleanupTargets: {
				workspaceDir: effects.workspace,
				agentDir: effects.agentDir,
				sessionsDir: effects.sessionsDir
			},
			configBeforeDelete,
			nextConfig: latestConfig
		};
	}
}
//#endregion
//#region src/claws/mcp.ts
const CLAW_MCP_REF_SCHEMA_VERSION = "openclaw.clawMcpServerRef.v1";
var ClawMcpInstallError = class extends Error {
	constructor(code, message, mcpServers) {
		super(message);
		this.code = code;
		this.mcpServers = mcpServers;
		this.name = "ClawMcpInstallError";
	}
};
function mcpServerFromActionDetails(details) {
	const { expectedState: _expectedState, prerequisites: _prerequisites, ...server } = details;
	return "command" in server || "url" in server ? server : void 0;
}
function rowToRef(row) {
	return {
		schemaVersion: CLAW_MCP_REF_SCHEMA_VERSION,
		agentId: row.agent_id,
		name: row.name,
		configDigest: row.config_digest,
		relationship: row.relationship,
		origin: row.origin,
		independentOwner: Number(row.independent_owner) === 1,
		status: row.status,
		...row.error ? { error: row.error } : {},
		createdAtMs: Number(row.created_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function digestClawMcpServer(server) {
	const canonical = canonicalizeConfiguredMcpServer(server);
	return `sha256:${createHash("sha256").update(stableStringify(canonical)).digest("hex")}`;
}
function persistPendingRef(plan, name, server, ownership, options) {
	const nowMs = options.nowMs ?? Date.now();
	const configDigest = digestClawMcpServer(server);
	const existing = openOpenClawStateDatabase(options).db.prepare(`SELECT schema_version, agent_id, name, config_digest, relationship, origin,
              independent_owner, status, error,
              created_at_ms, updated_at_ms
         FROM claw_mcp_server_refs
        WHERE agent_id = ? AND name = ?`).get(plan.agent.finalId, name);
	if (existing) {
		const ref = rowToRef(existing);
		if (ref.configDigest !== configDigest || ref.status === "failed") throw new ClawMcpInstallError("mcp_provenance_conflict", `MCP server ${JSON.stringify(name)} differs from its ownership record.`, [ref]);
		return {
			ref,
			existing: true
		};
	}
	const ref = {
		schemaVersion: CLAW_MCP_REF_SCHEMA_VERSION,
		agentId: plan.agent.finalId,
		name,
		configDigest,
		...ownership,
		status: "pending",
		createdAtMs: nowMs,
		updatedAtMs: nowMs
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_mcp_server_refs (
         agent_id, name, schema_version, config_digest, relationship, origin,
         independent_owner, status, error,
         created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @name, @schema_version, @config_digest, @relationship, @origin,
         @independent_owner, @status, NULL,
         @created_at_ms, @updated_at_ms
       )`).run({
			agent_id: ref.agentId,
			name: ref.name,
			schema_version: ref.schemaVersion,
			config_digest: ref.configDigest,
			relationship: ref.relationship,
			origin: ref.origin,
			independent_owner: ref.independentOwner ? 1 : 0,
			status: ref.status,
			created_at_ms: nowMs,
			updated_at_ms: nowMs
		});
	}, options);
	return {
		ref,
		existing: false
	};
}
function updateRef(ref, update, options) {
	const updated = {
		...ref,
		...update,
		updatedAtMs: options.nowMs ?? Date.now()
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`UPDATE claw_mcp_server_refs
          SET status = @status, error = @error, updated_at_ms = @updated_at_ms
        WHERE agent_id = @agent_id AND name = @name`).run({
			agent_id: ref.agentId,
			name: ref.name,
			status: update.status,
			error: update.error ?? null,
			updated_at_ms: updated.updatedAtMs
		});
	}, options);
	return updated;
}
async function installClawMcpServers(plan, options = {}) {
	const setMcpServer = options.setMcpServer ?? setConfiguredMcpServer;
	const listMcpServers = options.listMcpServers ?? listConfiguredMcpServers;
	const refs = [];
	for (const action of plan.actions.filter((candidate) => candidate.kind === "mcpServer")) {
		const server = action.details ? mcpServerFromActionDetails(action.details) : void 0;
		if (!server) throw new ClawMcpInstallError("mcp_plan_invalid", `MCP server action ${JSON.stringify(action.id)} is invalid.`, refs);
		const listed = await listMcpServers();
		if (!listed.ok) throw new ClawMcpInstallError("mcp_preflight_failed", listed.error, refs);
		const configured = listed.mcpServers[action.id];
		const configDigest = digestClawMcpServer(server);
		if (configured && digestClawMcpServer(configured) !== configDigest) throw new ClawMcpInstallError("mcp_config_conflict", `MCP server ${JSON.stringify(action.id)} already exists with different configuration.`, refs);
		const existingRefs = readClawMcpServerRefsByName(action.id, options);
		const inheritsClawOrigin = existingRefs.length > 0 && existingRefs.every((candidate) => candidate.origin === "claw-introduced" && !candidate.independentOwner);
		const ownership = configured ? {
			relationship: "referenced",
			origin: inheritsClawOrigin ? "claw-introduced" : "pre-existing",
			independentOwner: !inheritsClawOrigin
		} : {
			relationship: "managed",
			origin: "claw-introduced",
			independentOwner: false
		};
		const pendingResult = persistPendingRef(plan, action.id, server, ownership, options);
		const pending = pendingResult.ref;
		refs.push(pending);
		if (pending.status === "complete") continue;
		if (pendingResult.existing) {
			if (configured) {
				if (digestClawMcpServer(configured) !== pending.configDigest) throw new ClawMcpInstallError("mcp_reconcile_conflict", `MCP server ${JSON.stringify(action.id)} changed after an ambiguous write.`, refs);
				refs[refs.length - 1] = updateRef(pending, { status: "complete" }, options);
				continue;
			}
		}
		if (configured) {
			refs[refs.length - 1] = updateRef(pending, { status: "complete" }, options);
			continue;
		}
		let result;
		try {
			result = await setMcpServer({
				name: action.id,
				server,
				createOnly: true,
				recordIndependentOwner: false
			});
		} catch (error) {
			throw new ClawMcpInstallError("mcp_install_uncertain", error instanceof Error ? error.message : String(error), refs);
		}
		if (!result.ok) {
			refs[refs.length - 1] = updateRef(pending, {
				status: "failed",
				error: result.error
			}, options);
			throw new ClawMcpInstallError("mcp_install_failed", result.error, refs);
		}
		try {
			refs[refs.length - 1] = updateRef(pending, { status: "complete" }, options);
		} catch (error) {
			throw new ClawMcpInstallError("mcp_provenance_failed", `MCP server was configured, but ownership could not be persisted: ${error instanceof Error ? error.message : String(error)}`, refs);
		}
	}
	return refs;
}
function readClawMcpServerRefs(agentId, options = {}) {
	const database = openOpenClawStateDatabase(options);
	if (options.readOnly && !database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_mcp_server_refs'").get()) return [];
	return database.db.prepare(`SELECT schema_version, agent_id, name, config_digest, relationship, origin,
              independent_owner, status, error,
              created_at_ms, updated_at_ms
         FROM claw_mcp_server_refs
        WHERE agent_id = ?
        ORDER BY name`).all(agentId).map(rowToRef);
}
function readClawMcpServerRefsByName(name, options = {}) {
	const database = openOpenClawStateDatabase(options);
	if (options.readOnly && !database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_mcp_server_refs'").get()) return [];
	return database.db.prepare(`SELECT schema_version, agent_id, name, config_digest, relationship, origin,
              independent_owner, status, error,
              created_at_ms, updated_at_ms
         FROM claw_mcp_server_refs
        WHERE name = ?
        ORDER BY agent_id`).all(name).map(rowToRef);
}
function clawMcpRemovalSelector(ref) {
	return `mcp:${ref.name}`;
}
function planClawMcpServerRemoval(ref, options = {}) {
	const affectedClawAgentIds = readClawMcpServerRefsByName(ref.name, options).filter((candidate) => candidate.agentId !== ref.agentId).map((candidate) => candidate.agentId).toSorted();
	const cleanup = options.referencedCleanup ?? { mode: "retain" };
	const explicitlySelected = cleanup.mode === "remove-selected" && (cleanup.selected ?? []).includes(clawMcpRemovalSelector(ref));
	const conflicts = affectedClawAgentIds.length > 0 || ref.independentOwner || ref.origin === "pre-existing";
	const release = (reason, blocked = false) => ({
		ref,
		action: "release",
		blocked,
		affectedClawAgentIds,
		reason
	});
	if (ref.relationship === "managed") {
		if (explicitlySelected) return release("--remove-referenced only accepts resources with a referenced relationship.", true);
		if (affectedClawAgentIds.length > 0) return release("Another Claw still references this MCP server.");
		if (ref.independentOwner) return release("MCP server has a current non-Claw owner.");
		return {
			ref,
			action: "remove",
			blocked: false,
			affectedClawAgentIds
		};
	}
	if (!explicitlySelected && cleanup.mode !== "remove-if-unused") return release("Referenced resources are retained unless a cleanup mode selects them.");
	if (!explicitlySelected && conflicts) return release(affectedClawAgentIds.length > 0 ? "Another Claw still references this MCP server." : "MCP server has a current non-Claw owner or pre-existing origin.");
	if (explicitlySelected && conflicts && !cleanup.allowConflicts) return release("Selected MCP server has other Claw dependents, a non-Claw owner, or pre-existing origin; explicit conflict override is required.", true);
	return {
		ref,
		action: "remove",
		blocked: false,
		affectedClawAgentIds
	};
}
function reconcileClawMcpServerRefs(agentId, configuredServers, options = {}) {
	return readClawMcpServerRefs(agentId, options).map((ref) => {
		if (ref.status !== "pending") return ref;
		const configured = configuredServers[ref.name];
		return configured && digestClawMcpServer(configured) === ref.configDigest ? updateRef(ref, { status: "complete" }, options) : ref;
	});
}
function deleteClawMcpServerRef(agentId, name, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare("DELETE FROM claw_mcp_server_refs WHERE agent_id = ? AND name = ?").run(agentId, name);
	}, options);
}
function upsertClawMcpServerRef(ref, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_mcp_server_refs (
         agent_id, name, schema_version, config_digest, relationship, origin,
         independent_owner, status, error,
         created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @name, @schema_version, @config_digest, @relationship, @origin,
         @independent_owner, @status, @error,
         @created_at_ms, @updated_at_ms
       )
       ON CONFLICT(agent_id, name) DO UPDATE SET
         schema_version = excluded.schema_version,
         config_digest = excluded.config_digest,
         relationship = excluded.relationship,
         origin = excluded.origin,
         independent_owner = excluded.independent_owner,
         status = excluded.status,
         error = excluded.error,
         updated_at_ms = excluded.updated_at_ms`).run({
			agent_id: ref.agentId,
			name: ref.name,
			schema_version: ref.schemaVersion,
			config_digest: ref.configDigest,
			relationship: ref.relationship,
			origin: ref.origin,
			independent_owner: ref.independentOwner ? 1 : 0,
			status: ref.status,
			error: ref.error ?? null,
			created_at_ms: ref.createdAtMs,
			updated_at_ms: ref.updatedAtMs
		});
	}, options);
}
//#endregion
//#region src/claws/lifecycle-mcp-removal.ts
async function removeClawMcpServers(params) {
	const listed = params.options.sourceMcpServers ? void 0 : params.options.listMcpServers ? await params.options.listMcpServers() : params.options.config ? void 0 : await listConfiguredMcpServers();
	if (listed && !listed.ok) throw new ClawRemoveError("mcp_config_unavailable", listed.error);
	const configured = listed?.ok ? listed.mcpServers : normalizeConfiguredMcpServers(params.options.sourceMcpServers ?? params.options.config?.mcp?.servers);
	const unsetMcpServer = params.options.unsetMcpServer ?? unsetConfiguredMcpServer;
	const mcpServers = [];
	for (const server of params.servers) {
		if (planClawMcpServerRemoval(server, params.options).action === "release") {
			deleteClawMcpServerRef(params.agentId, server.name, params.options);
			mcpServers.push({
				name: server.name,
				action: server.state === "missing" ? "missing" : "released"
			});
			continue;
		}
		const expectedServer = configured[server.name];
		if (!expectedServer) {
			if (server.state === "present") throw new ClawRemoveError("mcp_cleanup_changed", `MCP server ${JSON.stringify(server.name)} disappeared during removal.`);
			deleteClawMcpServerRef(params.agentId, server.name, params.options);
			mcpServers.push({
				name: server.name,
				action: "missing"
			});
			continue;
		}
		if (digestClawMcpServer(expectedServer) !== server.configDigest) throw new ClawRemoveError("mcp_cleanup_changed", `MCP server ${JSON.stringify(server.name)} changed during removal.`);
		try {
			const result = await unsetMcpServer({
				name: server.name,
				expectedServer
			});
			if (!result.ok) throw new Error(result.error);
			deleteClawMcpServerRef(params.agentId, server.name, params.options);
			mcpServers.push({
				name: server.name,
				action: result.removed ? "removed" : "missing"
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			mcpServers.push({
				name: server.name,
				action: "error",
				message
			});
			return {
				mcpServers,
				error: message
			};
		}
	}
	return { mcpServers };
}
//#endregion
//#region src/claws/types.ts
const CLAW_ADD_PLAN_SCHEMA_VERSION = "openclaw.clawAddPlan.v1";
const CLAW_INSPECT_RESULT_SCHEMA_VERSION = "openclaw.clawInspect.v1";
const CLAW_OUTPUT_STABILITY = "experimental";
const CLAW_BOOTSTRAP_FILE_NAMES = [
	"AGENTS.md",
	"SOUL.md",
	"IDENTITY.md",
	"TOOLS.md",
	"HEARTBEAT.md"
];
//#endregion
//#region src/claws/lifecycle-remove-contract.ts
const CLAW_REMOVE_PLAN_SCHEMA_VERSION = "openclaw.clawRemovePlan.v1";
//#endregion
//#region src/plugins/plugin-install-preflight.ts
/** Resolves one installed plugin by its stable ClawHub package identity. */
async function resolveInstalledClawHubPlugin(params) {
	const records = await (params.loadInstallRecords ?? loadInstalledPluginIndexInstallRecords)();
	const matches = Object.entries(records).filter(([, record]) => (record.clawhubPackage ?? parseClawHubPluginSpec(record.spec ?? "")?.name ?? parseClawHubPluginSpec(record.resolvedSpec ?? "")?.name) === params.clawhubPackage);
	if (matches.length === 0) return { status: "missing" };
	if (matches.length > 1) return {
		status: "ambiguous",
		pluginIds: matches.map(([pluginId]) => pluginId).toSorted()
	};
	const match = matches[0];
	if (!match) return { status: "missing" };
	const [pluginId, record] = match;
	return {
		status: "found",
		pluginId,
		record,
		installedVersion: record.resolvedVersion ?? record.version
	};
}
async function preflightPluginInstall(params) {
	const resolved = resolvePluginInstallRequestContext({
		rawSpec: params.rawSpec,
		...params.marketplace ? { marketplace: params.marketplace } : {},
		installKind: "plugin"
	});
	if (!resolved.ok) return {
		ok: false,
		code: "invalid_plugin_spec",
		error: resolved.error
	};
	const records = await (params.loadInstallRecords ?? loadInstalledPluginIndexInstallRecords)();
	const installedEntry = Object.entries(records).find(([, record]) => (record.clawhubPackage ?? parseClawHubPluginSpec(record.spec ?? "")?.name) === params.clawhubPackage);
	const installedId = installedEntry?.[0];
	const installed = installedEntry?.[1];
	const installedVersion = installed?.resolvedVersion ?? installed?.version;
	if (!installedVersion || !installedId) return {
		ok: true,
		action: "install",
		request: resolved.request
	};
	if (installedVersion === params.expectedVersion) return {
		ok: true,
		action: "reuse",
		request: resolved.request,
		installedId,
		installedVersion,
		...installed?.integrity ? { installedIntegrity: installed.integrity } : {},
		...installed?.installedAt ? { installedAt: installed.installedAt } : {}
	};
	return {
		ok: false,
		code: "plugin_version_conflict",
		request: resolved.request,
		installedVersion,
		expectedVersion: params.expectedVersion
	};
}
//#endregion
//#region src/skills/lifecycle/clawhub-uninstall.ts
async function planClawHubSkillUninstall(params) {
	let slug;
	try {
		slug = normalizeTrackedSkillSlug(params.slug);
	} catch (error) {
		return {
			ok: false,
			code: "ambiguous",
			error: String(error)
		};
	}
	const targetDir = resolveWorkspaceSkillInstallDir(params.workspaceDir, slug);
	const link = resolveClawHubSkillStatusLinkSync({
		workspaceDir: params.workspaceDir,
		skillDir: targetDir,
		skillKey: slug
	});
	if (!link) return {
		ok: false,
		code: "missing",
		error: `Skill ${JSON.stringify(slug)} is not a tracked ClawHub install.`
	};
	if (!link.valid || !link.skillFile || !link.fileTreeSha256) return {
		ok: false,
		code: "ambiguous",
		error: link.valid ? `Skill ${JSON.stringify(slug)} has no complete installed-file digest.` : link.reason
	};
	if (link.installedVersion !== params.expectedVersion) return {
		ok: false,
		code: "modified",
		error: `Skill ${JSON.stringify(slug)} is at ${link.installedVersion}, expected ${params.expectedVersion}.`
	};
	const skillFilePath = path.join(targetDir, link.skillFile.path);
	let content;
	try {
		const stat = await fs.lstat(targetDir);
		if (!stat.isDirectory() || stat.isSymbolicLink()) return {
			ok: false,
			code: "ambiguous",
			error: `Skill ${JSON.stringify(slug)} is not a regular managed directory.`
		};
		content = await fs.readFile(skillFilePath);
	} catch (error) {
		return {
			ok: false,
			code: "missing",
			error: String(error)
		};
	}
	if (sha256Hex(content) !== link.skillFile.sha256) return {
		ok: false,
		code: "modified",
		error: `Skill ${JSON.stringify(slug)} has local SKILL.md changes.`
	};
	let fileTreeSha256;
	try {
		fileTreeSha256 = await digestClawHubSkillTree(targetDir);
	} catch (error) {
		return {
			ok: false,
			code: "ambiguous",
			error: String(error)
		};
	}
	if (fileTreeSha256 !== link.fileTreeSha256) return {
		ok: false,
		code: "modified",
		error: `Skill ${JSON.stringify(slug)} has local file changes.`
	};
	return {
		ok: true,
		plan: {
			workspaceDir: params.workspaceDir,
			slug,
			version: link.installedVersion,
			installedAt: link.installedAt,
			targetDir,
			skillFilePath: link.skillFile.path,
			skillFileSha256: link.skillFile.sha256,
			fileTreeSha256
		}
	};
}
async function applyClawHubSkillUninstall(plan, deps = {}) {
	const current = await planClawHubSkillUninstall({
		workspaceDir: plan.workspaceDir,
		slug: plan.slug,
		expectedVersion: plan.version
	});
	if (!current.ok) return {
		ok: false,
		error: current.error
	};
	const shouldDispatchChange = hasCommittedSkillChangeHooks();
	const before = shouldDispatchChange ? await snapshotCommittedSkillArtifactBestEffort({
		skillDir: plan.targetDir,
		skillKey: plan.slug,
		source: "clawhub",
		sourceVersion: plan.version
	}) : void 0;
	const stagedDir = `${plan.targetDir}.openclaw-skill-remove-${randomUUID()}`;
	let staged = false;
	let restoreTracking;
	const rename = deps.rename ?? fs.rename;
	try {
		await rename(plan.targetDir, stagedDir);
		staged = true;
		if (sha256Hex(await (deps.readFile ?? fs.readFile)(path.join(stagedDir, plan.skillFilePath))) !== plan.skillFileSha256) {
			await rename(stagedDir, plan.targetDir);
			return {
				ok: false,
				error: `Skill ${JSON.stringify(plan.slug)} changed during removal.`
			};
		}
		if (await digestClawHubSkillTree(stagedDir) !== plan.fileTreeSha256) {
			await rename(stagedDir, plan.targetDir);
			return {
				ok: false,
				error: `Skill ${JSON.stringify(plan.slug)} changed during removal.`
			};
		}
		restoreTracking = await (deps.untrack ?? untrackClawHubSkill)(plan.workspaceDir, plan.slug);
		await (deps.removeDir ?? fs.rm)(stagedDir, {
			recursive: true,
			force: false
		});
		if (shouldDispatchChange) await dispatchCommittedSkillChangeBestEffort({
			action: "removed",
			source: "clawhub",
			workspaceDir: plan.workspaceDir,
			before
		});
		return { ok: true };
	} catch (error) {
		const rollbackErrors = [];
		try {
			await restoreTracking?.();
		} catch (rollbackError) {
			rollbackErrors.push(`could not restore lockfile: ${String(rollbackError)}`);
		}
		if (staged) try {
			await rename(stagedDir, plan.targetDir);
		} catch (rollbackError) {
			rollbackErrors.push(`could not restore skill directory: ${String(rollbackError)}`);
		}
		return {
			ok: false,
			error: `${String(error)}${rollbackErrors.length > 0 ? `; rollback incomplete: ${rollbackErrors.join("; ")}` : ""}`
		};
	}
}
//#endregion
//#region src/claws/package-remove.ts
function sameArtifact(left, right) {
	return left.kind === right.kind && left.source === right.source && left.ref === right.ref;
}
function sameVersionedArtifact(left, right) {
	return sameArtifact(left, right) && left.version === right.version;
}
function clawPackageRemovalSelector(packageRef) {
	return `${packageRef.kind}:${packageRef.ref}@${packageRef.version}`;
}
function sameRecordedState(left, right) {
	return left.status === right.status && left.relationship === right.relationship && left.origin === right.origin && (left.independentOwner === right.independentOwner || right.independentOwner && !left.independentOwner);
}
function otherClawAgentIds(params) {
	return params.refs.filter((candidate) => {
		if (candidate.agentId === params.packageRef.agentId || !sameArtifact(candidate, params.packageRef) || params.statuses && !params.statuses.has(candidate.status)) return false;
		if (params.packageRef.kind === "plugin") return true;
		return params.installs.some((install) => install.agentId === candidate.agentId && install.workspace === params.workspace);
	}).map((candidate) => candidate.agentId).toSorted();
}
function hasAnotherClawOwner(params) {
	return otherClawAgentIds(params).length > 0;
}
function ownerInstallIsNewer(installedAt, packageRef) {
	const timestamp = typeof installedAt === "number" ? installedAt : Date.parse(installedAt ?? "");
	return Number.isFinite(timestamp) && timestamp > packageRef.updatedAtMs;
}
function pluginIntegrityMatches(actual, expected) {
	if (!actual) return false;
	const normalizedActual = normalizeClawHubSha256Integrity(actual);
	const normalizedExpected = normalizeClawHubSha256Integrity(expected);
	return normalizedActual && normalizedExpected ? normalizedActual === normalizedExpected : actual === expected;
}
async function inspectClawPackage(install, packageRef, deps = {}) {
	if (packageRef.status !== "complete") return {
		...packageRef,
		state: "incomplete",
		message: "Package installation is incomplete."
	};
	if (packageRef.kind === "plugin") {
		const resolution = await (deps.resolvePlugin ?? resolveInstalledClawHubPlugin)({ clawhubPackage: packageRef.ref });
		if (resolution.status !== "found") return {
			...packageRef,
			state: resolution.status,
			message: resolution.status === "ambiguous" ? "Installed plugin identity is ambiguous." : "Installed plugin is missing."
		};
		if (resolution.installedVersion !== packageRef.version || !pluginIntegrityMatches(resolution.record.integrity, packageRef.integrity)) return {
			...packageRef,
			state: "modified",
			message: "Installed plugin version changed after the Claw was added."
		};
		return {
			...packageRef,
			independentOwner: packageRef.independentOwner || ownerInstallIsNewer(resolution.record.installedAt, packageRef),
			state: "present"
		};
	}
	if (!install.workspace) return {
		...packageRef,
		state: "ambiguous",
		message: "Skill workspace provenance is missing."
	};
	const skill = await (deps.planSkill ?? planClawHubSkillUninstall)({
		workspaceDir: install.workspace,
		slug: packageRef.ref,
		expectedVersion: packageRef.version
	});
	return skill.ok ? {
		...packageRef,
		independentOwner: packageRef.independentOwner || ownerInstallIsNewer(skill.plan.installedAt, packageRef),
		state: "present"
	} : {
		...packageRef,
		state: skill.code,
		message: skill.error
	};
}
async function planClawPackageRemovals(install, packages, options = {}) {
	const deps = options.deps ?? {};
	const cleanup = options.referencedCleanup ?? { mode: "retain" };
	const selected = new Set(cleanup.selected ?? []);
	const allRefs = (deps.readPackageRefs ?? readClawPackageRefs)(options);
	let cachedInstalls;
	const allInstalls = () => cachedInstalls ??= (deps.readInstallRecords ?? readClawInstallRecords)(options);
	const decisions = [];
	for (const packageRef of packages) {
		const affectedClawAgentIds = otherClawAgentIds({
			packageRef,
			workspace: install.workspace,
			refs: allRefs,
			installs: packageRef.kind === "plugin" || !install.workspace ? [] : allInstalls(),
			statuses: /* @__PURE__ */ new Set(["pending", "complete"])
		});
		const retain = (reason) => {
			decisions.push({
				packageRef,
				workspace: install.workspace,
				action: "retain",
				reason,
				affectedClawAgentIds
			});
		};
		if (packageRef.status !== "complete") {
			retain("Package installation is incomplete.");
			continue;
		}
		const selector = clawPackageRemovalSelector(packageRef);
		const explicitlySelected = cleanup.mode === "remove-selected" && selected.has(selector);
		const managedCleanup = packageRef.relationship === "managed";
		if (explicitlySelected && managedCleanup) {
			decisions.push({
				packageRef,
				workspace: install.workspace,
				action: "retain",
				blocked: true,
				reason: "--remove-referenced only accepts resources with a referenced relationship.",
				affectedClawAgentIds
			});
			continue;
		}
		if (!managedCleanup && !explicitlySelected && cleanup.mode !== "remove-if-unused") {
			retain("Referenced resources are retained unless a cleanup mode selects them.");
			continue;
		}
		if (!explicitlySelected && affectedClawAgentIds.length > 0) {
			retain("Another Claw still references this package.");
			continue;
		}
		if (!explicitlySelected && (packageRef.independentOwner || packageRef.origin === "pre-existing")) {
			retain("Package has a current non-Claw owner or pre-existing origin.");
			continue;
		}
		let pluginId;
		let ownerIsNewer;
		let skillPlan;
		if (packageRef.kind === "plugin") {
			const resolution = await (deps.resolvePlugin ?? resolveInstalledClawHubPlugin)({ clawhubPackage: packageRef.ref });
			if (resolution.status !== "found") {
				retain(resolution.status === "ambiguous" ? "Installed plugin identity is ambiguous." : "Installed plugin is missing.");
				continue;
			}
			if (resolution.installedVersion !== packageRef.version || !pluginIntegrityMatches(resolution.record.integrity, packageRef.integrity)) {
				retain("Installed plugin changed after the Claw was added.");
				continue;
			}
			pluginId = resolution.pluginId;
			ownerIsNewer = ownerInstallIsNewer(resolution.record.installedAt, packageRef);
		} else {
			if (!install.workspace) {
				retain("Skill workspace provenance is missing.");
				continue;
			}
			const skill = await (deps.planSkill ?? planClawHubSkillUninstall)({
				workspaceDir: install.workspace,
				slug: packageRef.ref,
				expectedVersion: packageRef.version
			});
			if (!skill.ok) {
				retain(skill.error);
				continue;
			}
			skillPlan = skill.plan;
			ownerIsNewer = ownerInstallIsNewer(skill.plan.installedAt, packageRef);
		}
		const independentlyOwned = packageRef.independentOwner || ownerIsNewer;
		const hasConflicts = affectedClawAgentIds.length > 0 || independentlyOwned || packageRef.origin === "pre-existing";
		if (!explicitlySelected && hasConflicts) {
			retain(affectedClawAgentIds.length > 0 ? "Another Claw still references this package." : "Package has a current non-Claw owner or pre-existing origin.");
			continue;
		}
		if (!explicitlySelected && packageRef.origin !== "claw-introduced") {
			retain("Only Claw-introduced referenced resources qualify for remove-if-unused.");
			continue;
		}
		if (explicitlySelected && hasConflicts && !cleanup.allowConflicts) {
			decisions.push({
				packageRef,
				workspace: install.workspace,
				action: "retain",
				blocked: true,
				reason: "Selected resource has other Claw dependents, a non-Claw owner, or pre-existing origin; explicit conflict override is required.",
				affectedClawAgentIds,
				...pluginId ? { pluginId } : {},
				...skillPlan ? { skillPlan } : {}
			});
			continue;
		}
		decisions.push({
			packageRef,
			workspace: install.workspace,
			action: "uninstall",
			...explicitlySelected && cleanup.allowConflicts ? { allowConflicts: true } : {},
			affectedClawAgentIds,
			...pluginId ? { pluginId } : {},
			...skillPlan ? { skillPlan } : {}
		});
	}
	return decisions;
}
async function applyClawPackageRemovals(decisions, options = {}) {
	if (!decisions.some((decision) => decision.packageRef.kind === "plugin")) return await applyClawPackageRemovalsUnlocked(decisions, options);
	return await withPluginLifecycleLease({
		...options.env ? { env: options.env } : {},
		...options.path ? { path: options.path } : {},
		...options.database ? { database: options.database } : {}
	}, async () => await applyClawPackageRemovalsUnlocked(decisions, options));
}
async function applyClawPackageRemovalsUnlocked(decisions, options) {
	const deps = options.deps ?? {};
	const results = [];
	for (const decision of decisions) {
		const base = {
			kind: decision.packageRef.kind,
			ref: decision.packageRef.ref,
			version: decision.packageRef.version
		};
		let packageLease = null;
		let claimed = false;
		let externalMutationStarted = false;
		try {
			const leaseArtifact = decision.packageRef.kind === "skill" ? {
				kind: decision.packageRef.kind,
				source: decision.packageRef.source,
				ref: decision.packageRef.ref,
				workspace: decision.workspace
			} : {
				kind: decision.packageRef.kind,
				source: decision.packageRef.source,
				ref: decision.packageRef.ref
			};
			const acquiredLease = (deps.acquirePackageLease ?? acquireClawPackageLifecycleLease)(leaseArtifact, {
				env: options.env,
				path: options.path,
				required: true
			});
			if (!acquiredLease) throw new Error(`Could not acquire package lifecycle lease for ${decision.packageRef.ref}.`);
			packageLease = maintainClawPackageLifecycleLease(acquiredLease);
			const currentRefs = (deps.readPackageRefs ?? readClawPackageRefs)(options);
			const currentInstalls = decision.packageRef.kind === "plugin" ? [] : (deps.readInstallRecords ?? readClawInstallRecords)(options);
			const currentRef = currentRefs.find((candidate) => candidate.agentId === decision.packageRef.agentId && sameVersionedArtifact(candidate, decision.packageRef));
			if (decision.blocked) throw new Error(decision.reason ?? "Package cleanup is blocked.");
			if (decision.action === "retain") {
				if (!currentRef || !sameRecordedState(currentRef, decision.packageRef)) throw new Error(`Package ${decision.packageRef.ref}@${decision.packageRef.version} ownership changed after removal planning.`);
				if (currentRef.status === "complete") {
					(deps.claimPackageRef ?? updateClawPackageRefStatus)(currentRef, "pending", options);
					claimed = true;
				}
				if (decision.reason === "Another Claw still references this package.") {
					const postClaimRefs = (deps.readPackageRefs ?? readClawPackageRefs)(options);
					const postClaimInstalls = decision.packageRef.kind === "plugin" ? [] : (deps.readInstallRecords ?? readClawInstallRecords)(options);
					if (!hasAnotherClawOwner({
						packageRef: decision.packageRef,
						workspace: decision.workspace,
						refs: postClaimRefs,
						installs: postClaimInstalls,
						statuses: /* @__PURE__ */ new Set(["complete"])
					})) throw new Error(`Package ${decision.packageRef.ref}@${decision.packageRef.version} no longer has another surviving Claw owner.`);
				}
				results.push({
					...base,
					action: "retained",
					reason: decision.reason
				});
				continue;
			}
			const sharedPackage = hasAnotherClawOwner({
				packageRef: decision.packageRef,
				workspace: decision.workspace,
				refs: currentRefs,
				installs: currentInstalls,
				statuses: /* @__PURE__ */ new Set(["complete"])
			});
			if (!currentRef || currentRef.status !== "complete" || !sameRecordedState(currentRef, decision.packageRef) || sharedPackage && !decision.allowConflicts) throw new Error(`Package ${decision.packageRef.ref}@${decision.packageRef.version} ownership changed after removal planning.`);
			(deps.claimPackageRef ?? updateClawPackageRefStatus)(currentRef, "pending", options);
			claimed = true;
			const postClaimRefs = (deps.readPackageRefs ?? readClawPackageRefs)(options);
			const postClaimInstalls = decision.packageRef.kind === "plugin" ? [] : (deps.readInstallRecords ?? readClawInstallRecords)(options);
			const postClaimRef = postClaimRefs.find((candidate) => candidate.agentId === decision.packageRef.agentId && sameVersionedArtifact(candidate, decision.packageRef));
			const postClaimShared = hasAnotherClawOwner({
				packageRef: decision.packageRef,
				workspace: decision.workspace,
				refs: postClaimRefs,
				installs: postClaimInstalls,
				statuses: /* @__PURE__ */ new Set(["complete"])
			});
			if (!postClaimRef || postClaimRef.status !== "pending" || postClaimRef.relationship !== decision.packageRef.relationship || postClaimRef.origin !== decision.packageRef.origin || postClaimRef.independentOwner !== decision.packageRef.independentOwner && !decision.packageRef.independentOwner || postClaimShared && !decision.allowConflicts) throw new Error(`Package ${decision.packageRef.ref}@${decision.packageRef.version} ownership changed while claiming removal.`);
			if (decision.packageRef.kind === "plugin") {
				if (!decision.pluginId) throw new Error("Plugin removal plan is missing canonical install identity.");
				const resolution = await (deps.resolvePlugin ?? resolveInstalledClawHubPlugin)({ clawhubPackage: decision.packageRef.ref });
				if (resolution.status !== "found" || resolution.pluginId !== decision.pluginId || resolution.installedVersion !== decision.packageRef.version || !pluginIntegrityMatches(resolution.record.integrity, decision.packageRef.integrity) || ownerInstallIsNewer(resolution.record.installedAt, decision.packageRef)) throw new Error(`Plugin ${decision.packageRef.ref}@${decision.packageRef.version} changed after removal planning.`);
				externalMutationStarted = true;
				await (deps.uninstallPlugin ?? runPluginUninstallCommand)(decision.pluginId, {
					force: true,
					invalidateRuntimeCache: false,
					clawManaged: true
				});
			} else {
				if (!decision.skillPlan) throw new Error("Skill removal plan is missing canonical uninstall state.");
				externalMutationStarted = true;
				const removed = await (deps.uninstallSkill ?? applyClawHubSkillUninstall)(decision.skillPlan);
				if (!removed.ok) throw new Error(removed.error);
			}
			packageLease.assertCurrent();
			(deps.claimPackageRef ?? updateClawPackageRefStatus)(decision.packageRef, "complete", options);
			results.push({
				...base,
				action: "uninstalled"
			});
		} catch (error) {
			if (claimed) try {
				(deps.claimPackageRef ?? updateClawPackageRefStatus)(decision.packageRef, externalMutationStarted ? "failed" : "complete", options);
			} catch {}
			results.push({
				...base,
				action: "error",
				reason: error instanceof Error ? error.message : String(error)
			});
		} finally {
			try {
				packageLease?.release();
			} catch {}
		}
	}
	return results;
}
//#endregion
//#region src/claws/schema-portability.ts
const EXACT_VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const PACKAGE_NAME_PATTERN = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;
const WINDOWS_INVALID_PATH_CHARS = /[<>:"|?*]/;
const WINDOWS_RESERVED_PATH_SEGMENT = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
const BASE64_PAYLOAD_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
function isExactSemVer(value) {
	return EXACT_VERSION_PATTERN.test(value);
}
function isCanonicalClawHubPackageName(value) {
	return PACKAGE_NAME_PATTERN.test(value);
}
function isSafeClawRelativePath(value) {
	const normalized = value.replaceAll("\\", "/");
	if (normalized.startsWith("/") || /^[A-Za-z]:\//.test(normalized)) return false;
	return normalized.split("/").every((segment) => segment !== "" && segment !== "." && segment !== ".." && !WINDOWS_INVALID_PATH_CHARS.test(segment) && !Array.from(segment).some((character) => character.charCodeAt(0) <= 31) && !segment.endsWith(".") && !segment.endsWith(" ") && !WINDOWS_RESERVED_PATH_SEGMENT.test(segment));
}
function portableClawPathKey(value) {
	return value.replaceAll("\\", "/").normalize("NFC").toLowerCase();
}
function conflictsWithClawPath(targets, candidate) {
	for (const target of targets) if (target === candidate || target.startsWith(`${candidate}/`) || candidate.startsWith(`${target}/`)) return true;
	return false;
}
function isPortableClawAvatar(value) {
	if (isRenderableAvatarImageDataUrl(value)) {
		if (value.length > AVATAR_MAX_DATA_URL_CHARS) return false;
		const comma = value.indexOf(",");
		if (comma < 0) return false;
		const metadata = value.slice(0, comma);
		const payload = value.slice(comma + 1);
		try {
			const base64 = /;base64(?:;|$)/i.test(metadata);
			if (payload.length === 0 || base64 && !BASE64_PAYLOAD_PATTERN.test(payload)) return false;
			const bytes = base64 ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload), "utf8");
			return bytes.byteLength > 0 && bytes.byteLength <= 2097152;
		} catch {
			return false;
		}
	}
	return isSafeClawRelativePath(value) && isSupportedLocalAvatarExtension(value);
}
function isValidClawTimezone(value) {
	try {
		new Intl.DateTimeFormat("en-US", { timeZone: value }).format();
		return true;
	} catch {
		return false;
	}
}
function packageManagerArtifacts(command, args) {
	const executable = command.split(/[\\/]/).at(-1)?.replace(/\.(?:cmd|exe)$/i, "").toLowerCase();
	let start = 0;
	if (executable === "pnpm" || executable === "yarn") {
		if (args[0] !== "dlx") return;
		start = 1;
	} else if (executable !== "npx" && executable !== "pnpx" && executable !== "bunx") return;
	const selected = [];
	let positional;
	for (let index = start; index < args.length; index += 1) {
		const value = args[index];
		if (!value) continue;
		if (value === "--") {
			positional = args[index + 1] ?? "";
			break;
		}
		if (value === "-p" || value === "--package") {
			selected.push(args[index + 1] ?? "");
			index += 1;
			continue;
		}
		if (value.startsWith("--package=")) {
			selected.push(value.slice(10));
			continue;
		}
		if (positional === void 0 && !value.startsWith("-")) {
			positional = value;
			break;
		}
	}
	return selected.length > 0 ? selected : [positional ?? ""];
}
function isClawPackageManagerArtifactPinned(command, args) {
	const artifacts = packageManagerArtifacts(command, args);
	if (artifacts === void 0) return;
	return artifacts.every((artifact) => {
		const separator = artifact.lastIndexOf("@");
		const scopedSlash = artifact.startsWith("@") ? artifact.indexOf("/") : -1;
		return separator > 0 && separator > scopedSlash && isExactSemVer(artifact.slice(separator + 1));
	});
}
//#endregion
//#region src/claws/schema.ts
const nonEmptyString = string().min(1).refine((value) => value.length === value.trim().length && value.length > 0, "Value must not have leading or trailing whitespace.");
const optionalString = nonEmptyString.optional();
function clawManifestWorkspaceConflictsWithPath(manifest, path) {
	const targets = /* @__PURE__ */ new Set();
	for (const name of CLAW_BOOTSTRAP_FILE_NAMES) if (manifest.workspace.bootstrapFiles[name]) targets.add(portableClawPathKey(name));
	for (const file of manifest.workspace.files) targets.add(portableClawPathKey(file.path));
	return conflictsWithClawPath(targets, portableClawPathKey(path));
}
const agentId = nonEmptyString.regex(/^[a-z][a-z0-9_-]{0,63}$/, "Agent id must start with a lowercase letter and contain only lowercase letters, digits, underscores, or hyphens.");
const exactVersion = nonEmptyString.refine(isExactSemVer, "Package version must be an exact semantic version.");
const clawHubPackageName = nonEmptyString.refine(isCanonicalClawHubPackageName, "ClawHub package references must use their canonical lowercase name.");
const portableEnvKey = /^[A-Za-z_][A-Za-z0-9_]*$/;
const packageRelativePath = nonEmptyString.refine(isSafeClawRelativePath, { message: "Path must be package-relative and must not contain traversal segments." });
const agentSchema = object({
	id: agentId,
	name: optionalString,
	description: optionalString,
	identity: object({
		name: optionalString,
		theme: optionalString,
		emoji: optionalString,
		avatar: nonEmptyString.refine(isPortableClawAvatar, { message: "Avatar must be a bounded image data URL or managed workspace-relative image path." }).optional()
	}).strict().optional()
}).strict();
const openClawProfileSchema = object({
	schemaVersion: literal(1),
	agent: object({
		groupChat: object({ mentionPatterns: array(nonEmptyString).min(1).optional() }).strict().optional(),
		sandbox: object({
			mode: _enum([
				"off",
				"non-main",
				"all"
			]).optional(),
			scope: _enum([
				"session",
				"agent",
				"shared"
			]).optional(),
			workspaceAccess: _enum([
				"none",
				"ro",
				"rw"
			]).optional()
		}).strict().optional(),
		tools: object({
			profile: nonEmptyString.refine((value) => resolveToolProfilePolicy(value) !== void 0, "Tool profile must name a registered OpenClaw built-in profile.").optional(),
			allow: array(nonEmptyString).min(1).optional(),
			alsoAllow: array(nonEmptyString).min(1).optional(),
			deny: array(nonEmptyString).min(1).optional(),
			fs: object({ workspaceOnly: literal(true).optional() }).strict().optional()
		}).strict().superRefine((tools, ctx) => {
			if (tools.allow && tools.alsoAllow) ctx.addIssue({
				code: "custom",
				path: ["alsoAllow"],
				message: "Agent tools cannot set both allow and alsoAllow; use allow alone or profile with alsoAllow."
			});
		}).optional(),
		memory: object({ search: object({
			enabled: boolean().optional(),
			rememberAcrossConversations: boolean().optional(),
			sources: array(_enum(["memory", "sessions"])).min(1).optional()
		}).strict().superRefine((search, ctx) => {
			if (search.sources?.includes("sessions") && search.rememberAcrossConversations !== true) ctx.addIssue({
				code: "custom",
				path: ["rememberAcrossConversations"],
				message: "The sessions source requires rememberAcrossConversations: true in the OpenClaw profile."
			});
		}).optional() }).strict().optional(),
		heartbeat: object({
			every: nonEmptyString.refine((value) => {
				try {
					parseDurationMs(value, { defaultUnit: "m" });
					return true;
				} catch {
					return false;
				}
			}, "Invalid heartbeat duration.").optional(),
			activeHours: object({
				start: nonEmptyString.regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).optional(),
				end: nonEmptyString.regex(/^(?:(?:[01]\d|2[0-3]):[0-5]\d|24:00)$/).optional(),
				timezone: nonEmptyString.refine(isValidClawTimezone, "Invalid IANA timezone.").optional()
			}).strict().optional(),
			lightContext: boolean().optional(),
			isolatedSession: boolean().optional(),
			timeoutSeconds: number().int().positive().optional()
		}).strict().optional(),
		humanDelay: object({
			mode: _enum([
				"off",
				"natural",
				"custom"
			]).optional(),
			minMs: number().int().nonnegative().optional(),
			maxMs: number().int().nonnegative().optional()
		}).strict().optional()
	}).strict()
}).strict();
const workspaceSourceSchema = object({ source: packageRelativePath }).strict();
const bootstrapFilesSchema = object(Object.fromEntries(CLAW_BOOTSTRAP_FILE_NAMES.map((name) => [name, workspaceSourceSchema.optional()]))).partial().strict();
const workspaceFileSchema = object({
	source: packageRelativePath,
	path: packageRelativePath
}).strict();
const workspaceSchema = object({
	bootstrapFiles: bootstrapFilesSchema.optional().default({}),
	files: array(workspaceFileSchema).optional().default([])
}).strict().default({
	bootstrapFiles: {},
	files: []
});
const packageSchema = object({
	kind: _enum(["skill", "plugin"]),
	source: literal("clawhub"),
	ref: clawHubPackageName,
	version: exactVersion
}).strict();
const environmentReference = nonEmptyString.regex(/^\$\{[A-Z_][A-Z0-9_]*\}$/, "MCP environment values must be unresolved ${ENV_VAR} references.");
const mcpServerCommonShape = {
	toolFilter: object({
		include: array(nonEmptyString).min(1).optional(),
		exclude: array(nonEmptyString).min(1).optional()
	}).strict().superRefine((filter, ctx) => {
		for (const field of ["include", "exclude"]) {
			const seen = /* @__PURE__ */ new Set();
			for (const [index, value] of (filter[field] ?? []).entries()) {
				if (value.includes("?") || value.includes("[") || value.includes("]")) ctx.addIssue({
					code: "custom",
					path: [field, index],
					message: "Tool filters support only exact names and * wildcards."
				});
				if (seen.has(value)) ctx.addIssue({
					code: "custom",
					path: [field, index],
					message: "Tool filter entries must be unique."
				});
				seen.add(value);
			}
		}
	}).optional(),
	timeout: number().finite().positive().optional(),
	connectTimeout: number().finite().positive().optional()
};
const mcpServerSchema = union([object({
	command: nonEmptyString,
	transport: literal("stdio").optional(),
	args: array(nonEmptyString).optional(),
	env: record(nonEmptyString.regex(portableEnvKey, "Invalid portable environment key."), environmentReference).optional(),
	...mcpServerCommonShape
}).strict().superRefine((server, ctx) => {
	if (isClawPackageManagerArtifactPinned(server.command, server.args ?? []) === false) ctx.addIssue({
		code: "custom",
		path: ["args"],
		message: "Package-manager MCP commands must select one exact immutable package version."
	});
	for (const key of Object.keys(server.env ?? {})) if (isDangerousHostEnvVarName(key)) ctx.addIssue({
		code: "custom",
		path: ["env", key],
		message: "Environment key is blocked by the spawned-process safety policy."
	});
}), object({
	url: nonEmptyString.url(),
	transport: _enum(["sse", "streamable-http"]),
	auth: literal("oauth").optional(),
	...mcpServerCommonShape
}).strict().superRefine((server, ctx) => {
	const url = new URL(server.url);
	const loopback = [
		"localhost",
		"127.0.0.1",
		"[::1]"
	].includes(url.hostname);
	if (url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) ctx.addIssue({
		code: "custom",
		path: ["url"],
		message: "Remote MCP URLs must use HTTPS, except HTTP on an exact loopback host."
	});
	if (url.username || url.password || url.hash) ctx.addIssue({
		code: "custom",
		path: ["url"],
		message: "Remote MCP URLs must not contain user information or fragments."
	});
})]);
const cronJobSchema = object({
	id: agentId,
	name: optionalString,
	schedule: object({
		cron: nonEmptyString,
		timezone: nonEmptyString
	}).strict(),
	session: _enum(["main", "isolated"]),
	message: nonEmptyString,
	delivery: object({
		mode: _enum(["none", "announce"]),
		channel: literal("last").optional()
	}).strict().optional()
}).strict().superRefine((job, ctx) => {
	if (job.schedule.cron.trim().split(/\s+/).length !== 5) ctx.addIssue({
		code: "custom",
		path: ["schedule", "cron"],
		message: "Cron schedule must use exactly five fields."
	});
	if (job.delivery?.mode === "none" && job.delivery.channel !== void 0 || job.delivery?.mode === "announce" && job.delivery.channel !== "last") ctx.addIssue({
		code: "custom",
		path: ["delivery"],
		message: "Delivery must be { mode: \"none\" } or { mode: \"announce\", channel: \"last\" }."
	});
	try {
		computeNextRunAtMs({
			kind: "cron",
			expr: job.schedule.cron,
			tz: job.schedule.timezone
		}, Date.now());
	} catch {
		ctx.addIssue({
			code: "custom",
			path: ["schedule", "cron"],
			message: "Invalid cron expression or timezone."
		});
	}
});
const manifestSchema = object({
	schemaVersion: literal(1),
	agent: agentSchema,
	metadata: record(nonEmptyString, string()).optional().default({}),
	workspace: workspaceSchema.optional().default({
		bootstrapFiles: {},
		files: []
	}),
	packages: array(packageSchema).optional().default([]),
	mcpServers: record(nonEmptyString.regex(/^[a-z][a-z0-9_-]{0,63}$/, "Invalid MCP server name."), mcpServerSchema).optional().default({}),
	cronJobs: array(cronJobSchema).optional().default([])
}).strict().superRefine((manifest, ctx) => {
	const workspaceTargets = /* @__PURE__ */ new Set();
	for (const name of CLAW_BOOTSTRAP_FILE_NAMES) if (manifest.workspace.bootstrapFiles[name]) workspaceTargets.add(portableClawPathKey(name));
	manifest.workspace.files.forEach((file, index) => {
		const destinationKey = portableClawPathKey(file.path);
		if (conflictsWithClawPath(workspaceTargets, destinationKey)) ctx.addIssue({
			code: "custom",
			path: [
				"workspace",
				"files",
				index,
				"path"
			],
			message: `Workspace destination ${JSON.stringify(file.path)} is declared more than once.`
		});
		workspaceTargets.add(destinationKey);
	});
	const packageKeys = /* @__PURE__ */ new Set();
	manifest.packages.forEach((pkg, index) => {
		const key = `${pkg.kind}:${pkg.source}:${pkg.ref.toLowerCase()}`;
		if (packageKeys.has(key)) ctx.addIssue({
			code: "custom",
			path: ["packages", index],
			message: `Package ${JSON.stringify(pkg.ref)} is declared more than once for ${pkg.kind}.`
		});
		packageKeys.add(key);
	});
	const managedPaths = new Set(manifest.workspace.files.map((file) => portableClawPathKey(file.path)));
	const avatar = manifest.agent.identity?.avatar;
	if (avatar && !isRenderableAvatarImageDataUrl(avatar) && !managedPaths.has(portableClawPathKey(avatar))) ctx.addIssue({
		code: "custom",
		path: [
			"agent",
			"identity",
			"avatar"
		],
		message: "Workspace-relative avatar must match a workspace.files destination."
	});
	const cronIds = /* @__PURE__ */ new Set();
	manifest.cronJobs.forEach((job, index) => {
		if (cronIds.has(job.id)) ctx.addIssue({
			code: "custom",
			path: [
				"cronJobs",
				index,
				"id"
			],
			message: `Cron job id ${JSON.stringify(job.id)} is declared more than once.`
		});
		cronIds.add(job.id);
	});
});
function formatIssuePath(path) {
	if (path.length === 0) return "$";
	return `$${path.map((part) => typeof part === "number" ? `[${part}]` : `.${String(part)}`).join("")}`;
}
function diagnosticsFromZodError(error) {
	return error.issues.map((issue) => ({
		level: "error",
		code: "invalid_manifest",
		phase: "schema",
		path: formatIssuePath(issue.path),
		message: issue.message
	}));
}
function parseClawManifest(value) {
	const parsed = manifestSchema.safeParse(value);
	if (!parsed.success) return {
		ok: false,
		diagnostics: diagnosticsFromZodError(parsed.error)
	};
	return {
		ok: true,
		manifest: parsed.data,
		diagnostics: []
	};
}
function parseClawOpenClawProfile(value) {
	const parsed = openClawProfileSchema.safeParse(value);
	if (!parsed.success) return {
		ok: false,
		diagnostics: diagnosticsFromZodError(parsed.error)
	};
	return {
		ok: true,
		profile: parsed.data,
		diagnostics: []
	};
}
//#endregion
//#region src/claws/openclaw-profile.ts
const MAX_PROFILE_BYTES = 256 * 1024;
function diagnostic$1(code, message, path = "$") {
	return {
		level: "error",
		code,
		phase: "parse",
		path,
		message
	};
}
function parseProfileYaml(raw, path) {
	const document = parseDocument(raw.startsWith("﻿") ? raw.slice(1) : raw, {
		prettyErrors: false,
		uniqueKeys: true
	});
	if (document.errors.length > 0) return {
		ok: false,
		diagnostics: document.errors.map((error) => diagnostic$1("invalid_openclaw_profile", `Could not parse ${path}: ${error.message}`))
	};
	let unsupportedFeature;
	visit(document, {
		Alias() {
			unsupportedFeature ??= "aliases";
		},
		Node(_key, node) {
			if (node.anchor) unsupportedFeature ??= "anchors";
			else if (node.tag) unsupportedFeature ??= "explicit tags";
		},
		Pair(_key, pair) {
			if (isScalar(pair.key) && pair.key.value === "<<") unsupportedFeature ??= "merge keys";
		}
	});
	if (unsupportedFeature) return {
		ok: false,
		diagnostics: [diagnostic$1("unsupported_openclaw_profile_yaml_feature", `${path} uses ${unsupportedFeature}; OpenClaw profile YAML must map directly to JSON data.`)]
	};
	try {
		return {
			ok: true,
			value: document.toJSON()
		};
	} catch (error) {
		return {
			ok: false,
			diagnostics: [diagnostic$1("invalid_openclaw_profile", `Could not parse ${path}: ${error.message}`)]
		};
	}
}
async function readProfileFile(packageRoot, path) {
	return (await (await root(packageRoot)).read(path, {
		hardlinks: "reject",
		maxBytes: MAX_PROFILE_BYTES,
		nonBlockingRead: true,
		symlinks: "reject"
	})).buffer;
}
async function readClawOpenClawProfile(params) {
	const declaredPath = params.manifest.metadata?.["openclaw.config"];
	if (declaredPath === void 0) return { ok: true };
	if (declaredPath.includes("\\") || !isSafeClawRelativePath(declaredPath) || !/\.ya?ml$/i.test(declaredPath)) return {
		ok: false,
		diagnostics: [diagnostic$1("invalid_openclaw_profile_path", "metadata.openclaw.config must reference a forward-slash package-relative .yml or .yaml file.", "$.metadata.openclaw.config")]
	};
	let raw;
	try {
		raw = await readProfileFile(params.packageRoot, declaredPath);
	} catch (error) {
		const unsafe = error instanceof FsSafeError && (error.code === "hardlink" || error.code === "symlink" || error.code === "path-mismatch");
		const tooLarge = error instanceof FsSafeError && error.code === "too-large";
		return {
			ok: false,
			diagnostics: [diagnostic$1(unsafe ? "openclaw_profile_unsafe" : tooLarge ? "openclaw_profile_too_large" : "openclaw_profile_read_failed", unsafe ? "The OpenClaw profile must be a regular, non-symlinked, non-hardlinked file." : tooLarge ? `The OpenClaw profile exceeds ${MAX_PROFILE_BYTES} bytes.` : `Could not read ${declaredPath}: ${error.message}`, "$.metadata.openclaw.config")]
		};
	}
	const yaml = parseProfileYaml(raw.toString("utf8"), declaredPath);
	if (!yaml.ok) return yaml;
	const parsed = parseClawOpenClawProfile(yaml.value);
	if (!parsed.ok) return {
		ok: false,
		diagnostics: parsed.diagnostics.map((entry) => ({
			...entry,
			path: `$.metadata.openclaw.config${entry.path.slice(1)}`
		}))
	};
	return {
		ok: true,
		profile: parsed.profile,
		raw,
		path: declaredPath
	};
}
//#endregion
//#region src/claws/source-limits.ts
const MAX_CLAW_MANIFEST_BYTES = 1024 * 1024;
const MAX_MANAGED_FILE_BYTES = 1024 * 1024;
const MAX_MANAGED_WORKSPACE_BYTES = 4 * MAX_MANAGED_FILE_BYTES;
//#endregion
//#region src/claws/reader.ts
const CLAW_MARKDOWN_FILENAME = "CLAW.md";
const MAX_CLAW_PACKAGE_JSON_BYTES = 256 * 1024;
async function readBoundedFile(path, maxBytes) {
	return (await (await root(dirname(path))).read(basename(path), {
		hardlinks: "reject",
		maxBytes,
		nonBlockingRead: true,
		symlinks: "reject"
	})).buffer;
}
function fileDiagnostic(code, message, path = "$") {
	return {
		level: "error",
		code,
		phase: "parse",
		path,
		message
	};
}
function isContained(root, candidate) {
	const child = relative(root, candidate);
	return child !== ".." && !child.startsWith(`..${sep}`) && !isAbsolute(child);
}
function updateSnapshotHash(hash, label, bytes) {
	hash.update(`${Buffer.byteLength(label, "utf8")}:${label}:${bytes.byteLength}:`, "utf8");
	hash.update(bytes);
}
function workspaceSourceDiagnostic(error, sourcePath) {
	if (error instanceof FsSafeError && error.code === "too-large") return fileDiagnostic("workspace_source_too_large", `Workspace source ${JSON.stringify(sourcePath)} exceeds ${MAX_MANAGED_FILE_BYTES} bytes.`, "$.workspace");
	if (error instanceof FsSafeError && (error.code === "symlink" || error.code === "hardlink" || error.code === "path-mismatch") || error instanceof Error && error.message.includes("symlinked directory")) return fileDiagnostic("workspace_source_unsafe", `Workspace source ${JSON.stringify(sourcePath)} must be a regular, non-symlinked, non-hardlinked file.`, "$.workspace");
	return fileDiagnostic("workspace_source_invalid", `Workspace source ${JSON.stringify(sourcePath)} must resolve inside the Claw source.`, "$.workspace");
}
async function buildDevelopmentSnapshot(params) {
	const hash = createHash("sha256");
	let byteLength = 0;
	const add = (label, bytes) => {
		updateSnapshotHash(hash, label, bytes);
		byteLength += bytes.byteLength;
	};
	add("canonical-source", Buffer.from(params.source.manifestPath, "utf8"));
	add("manifest", params.manifestRaw);
	if (params.openClawProfile) add(`profile:${params.openClawProfile.path.replaceAll("\\", "/")}`, params.openClawProfile.raw);
	if (params.source.kind === "package") {
		const packageJson = params.source.packageJsonRaw;
		if (!packageJson) return {
			ok: false,
			diagnostics: [fileDiagnostic("package_read_failed", "Could not snapshot package.json.")]
		};
		add("package.json", packageJson);
	}
	const declaredSources = [...Object.values(params.manifest.workspace.bootstrapFiles).filter((entry) => entry !== void 0).map((entry) => entry.source), ...params.manifest.workspace.files.map((entry) => entry.source)].toSorted((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
	const sourceRoot = await root(params.source.packageRoot);
	const openedSources = [];
	const workspaceSources = [];
	try {
		let workspaceByteLength = 0;
		for (const sourcePath of declaredSources) try {
			await assertNoSymlinkParents({
				rootDir: params.source.packageRoot,
				targetPath: resolve(params.source.packageRoot, sourcePath),
				allowMissing: false,
				messagePrefix: "Workspace source"
			});
			const opened = await sourceRoot.open(sourcePath, {
				hardlinks: "reject",
				symlinks: "reject"
			});
			if (opened.stat.size > 1048576) {
				await opened[Symbol.asyncDispose]();
				throw new FsSafeError("too-large", `file exceeds limit of ${MAX_MANAGED_FILE_BYTES} bytes (got ${opened.stat.size})`);
			}
			workspaceByteLength += opened.stat.size;
			openedSources.push({
				sourcePath,
				opened
			});
		} catch (error) {
			return {
				ok: false,
				diagnostics: [workspaceSourceDiagnostic(error, sourcePath)]
			};
		}
		if (workspaceByteLength > 4194304) return {
			ok: false,
			diagnostics: [fileDiagnostic("workspace_sources_too_large", `Workspace sources exceed ${MAX_MANAGED_WORKSPACE_BYTES} aggregate bytes.`, "$.workspace")]
		};
		let readWorkspaceByteLength = 0;
		for (const { sourcePath, opened } of openedSources) {
			const bytes = await opened.handle.readFile();
			if (bytes.byteLength > 1048576) return {
				ok: false,
				diagnostics: [workspaceSourceDiagnostic(new FsSafeError("too-large", "workspace source grew while reading"), sourcePath)]
			};
			readWorkspaceByteLength += bytes.byteLength;
			if (readWorkspaceByteLength > 4194304) return {
				ok: false,
				diagnostics: [fileDiagnostic("workspace_sources_too_large", `Workspace sources exceed ${MAX_MANAGED_WORKSPACE_BYTES} aggregate bytes.`, "$.workspace")]
			};
			const normalizedSourcePath = sourcePath.replaceAll("\\", "/");
			const digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
			add(`workspace:${sourcePath.replaceAll("\\", "/")}`, bytes);
			workspaceSources.push({
				sourcePath: normalizedSourcePath,
				realPath: opened.realPath,
				byteLength: bytes.byteLength,
				digest
			});
		}
	} finally {
		await Promise.all(openedSources.map(({ opened }) => opened[Symbol.asyncDispose]()));
	}
	return {
		ok: true,
		integrity: `sha256:${hash.digest("hex")}`,
		byteLength,
		workspaceSources
	};
}
function parsePackageJson(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return;
	const record = value;
	const openclaw = record.openclaw;
	if (!openclaw || typeof openclaw !== "object" || Array.isArray(openclaw)) return;
	const claw = openclaw.claw;
	if (typeof record.name !== "string" || !isCanonicalClawHubPackageName(record.name) || typeof record.version !== "string" || !isExactSemVer(record.version) || typeof claw !== "string" || claw.trim() === "") return;
	return {
		name: record.name,
		version: record.version,
		openclaw: { claw }
	};
}
async function readJson(path, code, maxBytes) {
	let raw;
	try {
		raw = await readBoundedFile(path, maxBytes);
	} catch (error) {
		const tooLarge = error instanceof RangeError || error instanceof FsSafeError && error.code === "too-large";
		return {
			ok: false,
			diagnostics: [fileDiagnostic(tooLarge ? `${code}_too_large` : code, tooLarge ? `${path} exceeds ${maxBytes} bytes.` : `Could not read ${path}: ${error.message}`)]
		};
	}
	try {
		return {
			ok: true,
			raw,
			value: JSON.parse(raw.toString("utf8"))
		};
	} catch (error) {
		return {
			ok: false,
			diagnostics: [fileDiagnostic("invalid_json", `Could not parse ${path}: ${error.message}`)]
		};
	}
}
function parseClawMarkdown(raw, path) {
	const markdown = raw.length >= 3 && raw[0] === 239 && raw[1] === 187 && raw[2] === 191 ? raw.subarray(3) : raw;
	const match = markdown.toString("latin1").match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
	if (!match) return {
		ok: false,
		diagnostics: [fileDiagnostic("missing_claw_frontmatter", `${path} must start with a YAML frontmatter block delimited by --- lines.`)]
	};
	const frontmatterBytes = Buffer.from(match[1] ?? "", "latin1");
	const body = markdown.subarray(match[0].length);
	let frontmatter;
	try {
		frontmatter = new TextDecoder("utf-8", { fatal: true }).decode(frontmatterBytes);
		new TextDecoder("utf-8", { fatal: true }).decode(body);
	} catch {
		return {
			ok: false,
			diagnostics: [fileDiagnostic("invalid_claw_markdown_utf8", `${path} must contain valid UTF-8.`)]
		};
	}
	const document = parseDocument(frontmatter, {
		prettyErrors: false,
		uniqueKeys: true
	});
	if (document.errors.length > 0) return {
		ok: false,
		diagnostics: document.errors.map((error) => fileDiagnostic("invalid_claw_frontmatter", `Could not parse ${path}: ${error.message}`))
	};
	let unsupportedFeature;
	visit(document, {
		Alias() {
			unsupportedFeature ??= "aliases";
		},
		Node(_key, node) {
			if (node.anchor) unsupportedFeature ??= "anchors";
			else if (node.tag) unsupportedFeature ??= "explicit tags";
		},
		Pair(_key, pair) {
			if (isScalar(pair.key) && pair.key.value === "<<") unsupportedFeature ??= "merge keys";
		}
	});
	if (unsupportedFeature) return {
		ok: false,
		diagnostics: [fileDiagnostic("unsupported_claw_yaml_feature", `${path} uses ${unsupportedFeature}; CLAW.md frontmatter must map directly to JSON data.`)]
	};
	try {
		return {
			ok: true,
			value: document.toJSON(),
			body
		};
	} catch (error) {
		return {
			ok: false,
			diagnostics: [fileDiagnostic("invalid_claw_frontmatter", `Could not parse ${path}: ${error.message}`)]
		};
	}
}
function parseClawManifestDocument(raw, path) {
	if (basename(path).toLowerCase() === CLAW_MARKDOWN_FILENAME.toLowerCase()) return parseClawMarkdown(raw, path);
	try {
		return {
			ok: true,
			value: JSON.parse(raw.toString("utf8"))
		};
	} catch (error) {
		return {
			ok: false,
			diagnostics: [fileDiagnostic("invalid_json", `Could not parse ${path}: ${error.message}`)]
		};
	}
}
async function readClawDocument(path, code, manifestFormatPath = path) {
	let raw;
	try {
		raw = await readBoundedFile(path, MAX_CLAW_MANIFEST_BYTES);
	} catch (error) {
		const tooLarge = error instanceof RangeError || error instanceof FsSafeError && error.code === "too-large";
		return {
			ok: false,
			diagnostics: [fileDiagnostic(tooLarge ? `${code}_too_large` : code, tooLarge ? `${path} exceeds ${MAX_CLAW_MANIFEST_BYTES} bytes.` : `Could not read ${path}: ${error.message}`)]
		};
	}
	const parsed = parseClawManifestDocument(raw, manifestFormatPath);
	return parsed.ok ? {
		...parsed,
		raw
	} : parsed;
}
async function resolvePackageSource(packageRoot) {
	const packageRootReal = await realpath(packageRoot).catch(() => void 0);
	if (!packageRootReal) return {
		ok: false,
		diagnostics: [fileDiagnostic("package_read_failed", `Could not resolve ${packageRoot}.`)]
	};
	const packageJsonResult = await readJson(resolve(packageRootReal, "package.json"), "package_read_failed", MAX_CLAW_PACKAGE_JSON_BYTES);
	if (!packageJsonResult.ok) return packageJsonResult;
	const packageJson = parsePackageJson(packageJsonResult.value);
	if (!packageJson) return {
		ok: false,
		diagnostics: [fileDiagnostic("invalid_package_metadata", "package.json must declare non-empty name, version, and openclaw.claw fields.")]
	};
	if (isAbsolute(packageJson.openclaw.claw)) return {
		ok: false,
		diagnostics: [fileDiagnostic("manifest_escapes_package", "openclaw.claw must be package-relative.")]
	};
	const declaredManifestPath = resolve(packageRootReal, packageJson.openclaw.claw);
	const manifestPath = await realpath(declaredManifestPath).catch(() => void 0);
	if (!manifestPath || !isContained(packageRootReal, manifestPath)) return {
		ok: false,
		diagnostics: [fileDiagnostic("manifest_escapes_package", "The declared Claw manifest must resolve inside its package root.")]
	};
	return {
		ok: true,
		source: {
			kind: "package",
			name: packageJson.name,
			version: packageJson.version,
			packageRoot: packageRootReal,
			manifestPath,
			packageJsonRaw: packageJsonResult.raw,
			manifestFormatPath: declaredManifestPath
		}
	};
}
async function resolveSource(path) {
	const inputPath = resolve(path);
	const inputStat = await stat(inputPath).catch(() => void 0);
	if (!inputStat) return {
		ok: false,
		diagnostics: [fileDiagnostic("read_failed", `Could not resolve Claw source ${inputPath}.`)]
	};
	if (inputStat.isDirectory()) return resolvePackageSource(inputPath);
	if (!inputStat.isFile()) return {
		ok: false,
		diagnostics: [fileDiagnostic("unsupported_source", "Claw source must be a file or directory.")]
	};
	const manifestPath = await realpath(inputPath);
	const packageRoot = await realpath(dirname(manifestPath));
	return {
		ok: true,
		source: {
			kind: "development",
			name: `local:${basename(manifestPath).replace(/\.json$/i, "")}`,
			version: "0.0.0-development",
			packageRoot,
			manifestPath,
			manifestFormatPath: inputPath
		}
	};
}
async function readClawManifestFile(path) {
	const sourceResult = await resolveSource(path);
	if (!sourceResult.ok) return sourceResult;
	const manifestResult = await readClawDocument(sourceResult.source.manifestPath, "read_failed", sourceResult.source.manifestFormatPath);
	if (!manifestResult.ok) return manifestResult;
	const parsed = parseClawManifest(manifestResult.value);
	if (!parsed.ok) return parsed;
	const hasMarkdownBody = manifestResult.body !== void 0 && manifestResult.body.toString("utf8").trim().length > 0;
	if (hasMarkdownBody && clawManifestWorkspaceConflictsWithPath(parsed.manifest, "SOUL.md")) return {
		ok: false,
		diagnostics: [fileDiagnostic("claw_body_soul_conflict", "CLAW.md body content and an explicit SOUL.md workspace declaration cannot both be present.", "$.workspace")]
	};
	const profile = await readClawOpenClawProfile({
		packageRoot: sourceResult.source.packageRoot,
		manifest: parsed.manifest
	});
	if (!profile.ok) return profile;
	const snapshot = await buildDevelopmentSnapshot({
		source: sourceResult.source,
		manifest: parsed.manifest,
		manifestRaw: manifestResult.raw,
		...profile.raw && profile.path ? { openClawProfile: {
			path: profile.path,
			raw: profile.raw
		} } : {}
	});
	if (!snapshot.ok) return snapshot;
	const resolvedSource = sourceResult.source;
	const source = {
		kind: resolvedSource.kind,
		name: resolvedSource.name,
		version: resolvedSource.version,
		packageRoot: resolvedSource.packageRoot,
		manifestPath: resolvedSource.manifestPath,
		integrityKind: "development-snapshot",
		integrity: snapshot.integrity,
		byteLength: snapshot.byteLength
	};
	return {
		ok: true,
		manifest: parsed.manifest,
		...hasMarkdownBody ? { clawMarkdownBody: manifestResult.body } : {},
		...profile.profile ? { openClawProfile: profile.profile } : {},
		source,
		snapshot: { workspaceSources: snapshot.workspaceSources },
		diagnostics: parsed.diagnostics
	};
}
//#endregion
//#region src/claws/workspace.ts
const CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION = "openclaw.clawWorkspaceFileRecord.v1";
const MAX_CLAW_WORKSPACE_FILE_BYTES = 1024 * 1024;
var ClawWorkspaceWriteError = class extends Error {
	constructor(diagnostics, createdFiles) {
		super("Claw workspace file creation failed");
		this.diagnostics = diagnostics;
		this.createdFiles = createdFiles;
		this.name = "ClawWorkspaceWriteError";
	}
};
var ClawWorkspaceSourceAliasError = class extends Error {};
function rowToWorkspaceFile(row) {
	return {
		schemaVersion: CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION,
		agentId: row.agent_id,
		workspace: row.workspace,
		path: row.target_path,
		sourcePath: row.source_path,
		contentDigest: row.content_digest,
		status: row.status,
		createdAtMs: Number(row.created_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function diagnostic(action, code, message) {
	return {
		level: "error",
		code,
		phase: "mutation",
		path: `$.workspace[${JSON.stringify(action.id)}]`,
		message
	};
}
function contentDigest(content) {
	return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}
function containedRelativePath(root, path) {
	const child = relative(root, path);
	if (child === ".." || child.startsWith(`..${sep}`) || isAbsolute(child)) return;
	return child;
}
async function readClawWorkspaceActionSource(params) {
	if (!params.action.source) throw new Error("Workspace file action lacks a source.");
	const sourcePath = resolve(params.action.source);
	const sourceRelative = containedRelativePath(params.packageRoot, sourcePath);
	if (!sourceRelative) throw new Error("Workspace file source must remain inside the Claw package.");
	const read = await params.sourceRoot.read(sourceRelative, {
		hardlinks: "reject",
		maxBytes: MAX_CLAW_WORKSPACE_FILE_BYTES,
		symlinks: "reject"
	});
	if (resolve(read.realPath) !== sourcePath) throw new ClawWorkspaceSourceAliasError("Workspace source no longer resolves to the consented file.");
	if (params.action.sourceKind !== "clawMarkdownBody") return {
		content: read.buffer,
		sourcePath,
		sourceRelative
	};
	const parsed = parseClawMarkdown(read.buffer, sourcePath);
	if (!parsed.ok) throw new Error(parsed.diagnostics.map((item) => item.message).join("; "));
	return {
		content: parsed.body,
		sourcePath,
		sourceRelative
	};
}
function persistWorkspaceFile(record, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_workspace_files (
         agent_id, target_path, schema_version, workspace, source_path,
         content_digest, status, created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @target_path, @schema_version, @workspace, @source_path,
         @content_digest, @status, @created_at_ms, @updated_at_ms
       )`).run({
			agent_id: record.agentId,
			target_path: record.path,
			schema_version: record.schemaVersion,
			workspace: record.workspace,
			source_path: record.sourcePath,
			content_digest: record.contentDigest,
			status: record.status,
			created_at_ms: record.createdAtMs,
			updated_at_ms: record.updatedAtMs
		});
	}, options);
}
function readWorkspaceFile(agentId, targetPath, options) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const row = db.prepare(`SELECT schema_version, agent_id, workspace, target_path, source_path,
              content_digest, status, created_at_ms, updated_at_ms
         FROM claw_workspace_files
        WHERE agent_id = ? AND target_path = ?`).get(agentId, targetPath);
		if (!row) return;
		if (row.schema_version !== "openclaw.clawWorkspaceFileRecord.v1" || row.status !== "pending" && row.status !== "complete" && row.status !== "failed") throw new Error(`Claw workspace file ${JSON.stringify(targetPath)} has unsupported provenance state.`);
		return {
			schemaVersion: CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION,
			agentId: row.agent_id,
			workspace: row.workspace,
			path: row.target_path,
			sourcePath: row.source_path,
			contentDigest: row.content_digest,
			status: row.status,
			createdAtMs: Number(row.created_at_ms),
			updatedAtMs: Number(row.updated_at_ms)
		};
	}, options);
}
function sameWorkspaceFileOwner(existing, expected) {
	return existing.schemaVersion === expected.schemaVersion && existing.agentId === expected.agentId && existing.workspace === expected.workspace && existing.path === expected.path && existing.sourcePath === expected.sourcePath && existing.contentDigest === expected.contentDigest;
}
function updateWorkspaceFileStatus(record, expectedStatuses, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		const expectedPlaceholders = expectedStatuses.map(() => "?").join(", ");
		const result = db.prepare(`UPDATE claw_workspace_files
          SET status = ?, updated_at_ms = ?
        WHERE agent_id = ? AND target_path = ?
          AND status IN (${expectedPlaceholders})`).run(record.status, record.updatedAtMs, record.agentId, record.path, ...expectedStatuses);
		if (Number(result.changes) !== 1) throw new Error(`Claw workspace file ${JSON.stringify(record.path)} changed ownership state concurrently.`);
	}, options);
}
function upsertClawWorkspaceFile(record, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`INSERT INTO claw_workspace_files (
         agent_id, target_path, schema_version, workspace, source_path,
         content_digest, status, created_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @target_path, @schema_version, @workspace, @source_path,
         @content_digest, @status, @created_at_ms, @updated_at_ms
       )
       ON CONFLICT(agent_id, target_path) DO UPDATE SET
         schema_version = excluded.schema_version,
         workspace = excluded.workspace,
         source_path = excluded.source_path,
         content_digest = excluded.content_digest,
         status = excluded.status,
         created_at_ms = excluded.created_at_ms,
         updated_at_ms = excluded.updated_at_ms`).run({
			agent_id: record.agentId,
			target_path: record.path,
			schema_version: record.schemaVersion,
			workspace: record.workspace,
			source_path: record.sourcePath,
			content_digest: record.contentDigest,
			status: record.status,
			created_at_ms: record.createdAtMs,
			updated_at_ms: record.updatedAtMs
		});
	}, options);
}
function deleteClawWorkspaceFileRecord(agentId, path, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare("DELETE FROM claw_workspace_files WHERE agent_id = ? AND target_path = ?").run(agentId, path);
	}, options);
}
function workspaceFileActions(plan) {
	return plan.actions.filter((action) => action.kind === "workspaceFile");
}
function readClawWorkspaceFiles(agentId, options = {}) {
	const database = openOpenClawStateDatabase(options);
	if (options.readOnly && !database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_workspace_files'").get()) return [];
	return database.db.prepare(`SELECT schema_version, agent_id, workspace, target_path, source_path,
              content_digest, status, created_at_ms, updated_at_ms
         FROM claw_workspace_files
        WHERE agent_id = ?
        ORDER BY target_path`).all(agentId).map(rowToWorkspaceFile);
}
async function createClawWorkspaceFiles(plan, options = {}) {
	const actions = workspaceFileActions(plan);
	if (actions.length === 0) return [];
	const workspaceRoot = await realpath(resolve(plan.agent.workspace));
	const packageRoot = await realpath(resolve(plan.claw.packageRoot));
	const source = await root(packageRoot, {
		hardlinks: "reject",
		maxBytes: MAX_CLAW_WORKSPACE_FILE_BYTES,
		symlinks: "reject"
	});
	const workspace = await root(workspaceRoot, {
		hardlinks: "reject",
		maxBytes: MAX_CLAW_WORKSPACE_FILE_BYTES,
		symlinks: "reject"
	});
	const createdFiles = [];
	const nowMs = options.nowMs ?? Date.now();
	for (const action of actions) try {
		if (!action.source || !action.digest) throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_file_plan_invalid", "File action lacks source or digest.")], createdFiles);
		const targetRelative = containedRelativePath(workspaceRoot, resolve(action.target));
		if (!targetRelative) throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_file_path_escape", "Workspace file source and destination must remain inside their owned roots.")], createdFiles);
		const resolvedSource = await readClawWorkspaceActionSource({
			action,
			packageRoot,
			sourceRoot: source
		});
		const digest = contentDigest(resolvedSource.content);
		if (digest !== action.digest) throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_source_changed", `Workspace source for ${JSON.stringify(action.id)} changed after planning.`)], createdFiles);
		const expectedRecord = {
			schemaVersion: CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION,
			agentId: plan.agent.finalId,
			workspace: workspace.rootReal,
			path: targetRelative.replaceAll(sep, "/"),
			sourcePath: resolvedSource.sourceRelative.replaceAll(sep, "/"),
			contentDigest: digest,
			status: "pending",
			createdAtMs: nowMs,
			updatedAtMs: nowMs
		};
		const existingRecord = readWorkspaceFile(expectedRecord.agentId, expectedRecord.path, options);
		if (existingRecord && !sameWorkspaceFileOwner(existingRecord, expectedRecord)) throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_file_ownership_conflict", `Workspace destination ${JSON.stringify(targetRelative)} is already claimed by different Claw provenance.`)], createdFiles);
		if (await workspace.exists(targetRelative)) {
			if (!existingRecord || existingRecord.status === "failed") throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_file_collision", `Workspace destination ${JSON.stringify(targetRelative)} already exists.`)], createdFiles);
			if (contentDigest((await workspace.read(targetRelative, {
				hardlinks: "reject",
				maxBytes: MAX_CLAW_WORKSPACE_FILE_BYTES,
				symlinks: "reject"
			})).buffer) !== expectedRecord.contentDigest) throw new ClawWorkspaceWriteError([diagnostic(action, "workspace_file_drift", `Claw-owned workspace destination ${JSON.stringify(targetRelative)} no longer matches its recorded content.`)], createdFiles);
			const previousStatus = existingRecord.status;
			existingRecord.status = "complete";
			existingRecord.updatedAtMs = nowMs;
			updateWorkspaceFileStatus(existingRecord, [previousStatus], options);
			createdFiles.push(existingRecord);
			continue;
		}
		const record = existingRecord ?? expectedRecord;
		if (existingRecord) {
			const previousStatus = record.status;
			record.status = "pending";
			record.updatedAtMs = nowMs;
			updateWorkspaceFileStatus(record, [previousStatus], options);
		} else persistWorkspaceFile(record, options);
		try {
			await workspace.write(targetRelative, resolvedSource.content, {
				mkdir: true,
				overwrite: false
			});
			record.status = "complete";
			updateWorkspaceFileStatus(record, ["pending"], options);
			createdFiles.push(record);
		} catch (error) {
			record.status = "failed";
			try {
				updateWorkspaceFileStatus(record, ["pending"], options);
			} catch {
				record.status = "pending";
			}
			createdFiles.push(record);
			throw error;
		}
	} catch (error) {
		if (error instanceof ClawWorkspaceWriteError) throw error;
		throw new ClawWorkspaceWriteError([diagnostic(action, error instanceof ClawWorkspaceSourceAliasError ? "workspace_file_path_alias" : error instanceof FsSafeError ? `workspace_file_${error.code}` : "workspace_file_io_error", error instanceof Error ? error.message : String(error))], createdFiles);
	}
	return createdFiles;
}
//#endregion
//#region src/claws/lifecycle-status.ts
const CLAW_STATUS_SCHEMA_VERSION = "openclaw.clawStatus.v1";
function inspectMcpServer(ref, configuredServers) {
	if (ref.status === "pending" || ref.status === "failed") return {
		...ref,
		state: ref.status
	};
	const server = configuredServers[ref.name];
	if (!server) return {
		...ref,
		state: "missing"
	};
	return {
		...ref,
		state: digestClawMcpServer(server) === ref.configDigest ? "present" : "modified"
	};
}
async function readClawStatus(target, options = {}) {
	const config = options.config ?? getRuntimeConfig();
	const listedMcp = options.sourceMcpServers ? void 0 : options.listMcpServers ? await options.listMcpServers() : options.config ? void 0 : await listConfiguredMcpServers();
	if (listedMcp && !listedMcp.ok) throw new ClawRemoveError("mcp_config_unavailable", listedMcp.error);
	const sourceConfig = listedMcp?.ok ? listedMcp.config : config;
	const configuredMcpServers = normalizeConfiguredMcpServers(options.sourceMcpServers ?? sourceConfig.mcp?.servers);
	const allInstalls = readClawInstallRecords(options);
	const installAgentIds = new Set(allInstalls.map((install) => install.agentId));
	const allPackageRefs = readClawPackageRefs(options);
	const allWorkspaceFiles = readAllClawWorkspaceFiles(options);
	const orphanAgentIds = /* @__PURE__ */ new Set();
	for (const packageRef of allPackageRefs) if (!installAgentIds.has(packageRef.agentId)) orphanAgentIds.add(packageRef.agentId);
	for (const file of allWorkspaceFiles) if (!installAgentIds.has(file.agentId)) orphanAgentIds.add(file.agentId);
	const orphanInstalls = [...orphanAgentIds].map((agentId) => {
		const packageRef = allPackageRefs.find((candidate) => candidate.agentId === agentId);
		const file = allWorkspaceFiles.find((candidate) => candidate.agentId === agentId);
		return synthesizeOrphanInstall({
			agentId,
			clawName: packageRef?.clawName,
			workspace: file?.workspace,
			updatedAtMs: Math.max(packageRef?.updatedAtMs ?? 0, file?.updatedAtMs ?? 0)
		});
	});
	const installs = [...allInstalls, ...orphanInstalls].filter((install) => !target || install.agentId === target || install.claw.name === target);
	const records = [];
	for (const install of installs) {
		const agent = listAgentEntries(config).find((candidate) => candidate.id === install.agentId);
		const packageRefs = allPackageRefs.filter((packageRef) => packageRef.agentId === install.agentId);
		const workspaceFiles = installAgentIds.has(install.agentId) ? readClawWorkspaceFiles(install.agentId, options) : allWorkspaceFiles.filter((file) => file.agentId === install.agentId);
		records.push({
			install,
			...installAgentIds.has(install.agentId) ? {} : { orphaned: true },
			agentState: !agent ? "missing" : digestClawAgentConfig(agent) === install.agentConfigDigest ? "present" : "modified",
			workspaceFiles: await Promise.all(workspaceFiles.map(inspectClawWorkspaceFile)),
			packages: await Promise.all(packageRefs.map((packageRef) => inspectClawPackage(install, packageRef, options.packageDeps))),
			mcpServers: (options.readOnly ? readClawMcpServerRefs(install.agentId, options) : reconcileClawMcpServerRefs(install.agentId, configuredMcpServers, options)).map((ref) => inspectMcpServer(ref, configuredMcpServers)),
			cronJobs: readClawCronRefs(install.agentId, options)
		});
	}
	return {
		schemaVersion: CLAW_STATUS_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		...target ? { target } : {},
		records,
		summary: {
			claws: records.length,
			partial: records.filter((record) => record.install.status !== "complete").length,
			missingAgents: records.filter((record) => record.agentState === "missing").length,
			driftedFiles: records.flatMap((record) => record.workspaceFiles).filter((file) => file.state !== "unchanged").length,
			packageRefs: records.flatMap((record) => record.packages).length,
			missingPackages: records.flatMap((record) => record.packages).filter((pkg) => pkg.state === "missing").length,
			driftedPackages: records.flatMap((record) => record.packages).filter((pkg) => pkg.state === "modified" || pkg.state === "ambiguous").length,
			incompletePackages: records.flatMap((record) => record.packages).filter((pkg) => pkg.state === "incomplete").length,
			mcpServerRefs: records.flatMap((record) => record.mcpServers).length,
			driftedMcpServers: records.flatMap((record) => record.mcpServers).filter((server) => server.state === "modified" || server.state === "missing").length,
			unresolvedMcpServerRefs: records.flatMap((record) => record.mcpServers).filter((server) => server.state === "pending" || server.state === "failed").length,
			cronRefs: records.flatMap((record) => record.cronJobs).length,
			unresolvedCronRefs: records.flatMap((record) => record.cronJobs).filter((cron) => cron.status !== "complete" || !cron.schedulerJobId).length
		}
	};
}
//#endregion
//#region src/claws/package-remove-plan.ts
function projectClawPackageRemovePlan(params) {
	const selected = new Set(params.cleanup?.selected ?? []);
	const blockers = [];
	const actions = params.decisions.map((decision) => {
		const pkg = decision.packageRef;
		const selector = clawPackageRemovalSelector(pkg);
		selected.delete(selector);
		if (decision.blocked) blockers.push({
			code: "referenced_cleanup_requires_override",
			message: `${selector}: ${decision.reason ?? "explicit conflict override is required"}`
		});
		const inspected = params.inspections.find((candidate) => candidate.kind === pkg.kind && candidate.source === pkg.source && candidate.ref === pkg.ref && candidate.version === pkg.version);
		return {
			kind: "packageRef",
			id: selector,
			action: decision.action === "uninstall" ? "uninstall" : "release",
			target: `${pkg.source}:${pkg.ref}@${pkg.version}`,
			blocked: Boolean(decision.blocked),
			details: {
				expectedState: inspected?.state ?? "incomplete",
				status: pkg.status,
				relationship: pkg.relationship,
				origin: pkg.origin,
				independentOwner: pkg.independentOwner,
				affectedClawAgentIds: decision.affectedClawAgentIds,
				cleanupMode: params.cleanup?.mode ?? "retain",
				availableCleanupModes: pkg.relationship === "referenced" ? [
					"retain",
					"remove-if-unused",
					"remove-selected"
				] : ["remove"]
			},
			...decision.reason ? { reason: decision.reason } : {}
		};
	});
	for (const selector of selected) blockers.push({
		code: "referenced_cleanup_not_found",
		message: `Selected referenced resource ${JSON.stringify(selector)} is not owned by this Claw.`
	});
	return {
		actions,
		blockers
	};
}
//#endregion
//#region src/claws/lifecycle-state.ts
const CLAW_REMOVE_RESULT_SCHEMA_VERSION = "openclaw.clawRemoveResult.v1";
async function buildClawRemovePlan(target, options = {}) {
	const status = await readClawStatus(target, options);
	const blockers = [];
	if (status.records.length === 0) blockers.push({
		code: "claw_not_found",
		message: `No installed Claw matches ${JSON.stringify(target)}.`
	});
	else if (status.records.length > 1) blockers.push({
		code: "claw_ambiguous",
		message: `Claw name ${JSON.stringify(target)} matches multiple agents; use an agent id.`
	});
	const record = status.records.length === 1 ? status.records[0] : void 0;
	if (record?.agentState === "modified") blockers.push({
		code: "agent_modified",
		message: `Agent ${JSON.stringify(record.install.agentId)} changed after add.`
	});
	for (const file of record?.workspaceFiles ?? []) if (file.state === "unsafe") blockers.push({
		code: "workspace_file_unsafe",
		message: `${file.path}: ${file.message ?? "unsafe file"}`
	});
	for (const server of record?.mcpServers ?? []) if (server.state === "pending") blockers.push({
		code: "mcp_cleanup_uncertain",
		message: `MCP server ${JSON.stringify(server.name)} has ${server.state} ownership state and must be reconciled before removal.`
	});
	for (const cron of record?.cronJobs ?? []) if (cron.status !== "removed" && (cron.status !== "complete" || !cron.schedulerJobId)) blockers.push({
		code: "cron_cleanup_uncertain",
		message: `Cron declaration ${JSON.stringify(cron.manifestId)} has ${cron.status} ownership state and must be reconciled before removal.`
	});
	const actions = [];
	if (record) {
		const selectedResources = options.referencedCleanup?.selected ?? [];
		const packageCleanup = options.referencedCleanup ? {
			...options.referencedCleanup,
			selected: selectedResources.filter((selector) => !selector.startsWith("mcp:"))
		} : void 0;
		const mcpCleanup = options.referencedCleanup ? {
			...options.referencedCleanup,
			selected: selectedResources.filter((selector) => selector.startsWith("mcp:"))
		} : void 0;
		const packagePlan = projectClawPackageRemovePlan({
			decisions: await planClawPackageRemovals(record.install, record.packages, {
				...options,
				deps: options.packageDeps,
				referencedCleanup: packageCleanup
			}),
			inspections: record.packages,
			cleanup: packageCleanup
		});
		blockers.push(...packagePlan.blockers);
		const effects = deletionEffects(options.config ?? getRuntimeConfig(), record.install.agentId, record.install.workspace);
		const workspaceHasModifiedFiles = record.workspaceFiles.some((file) => file.state === "modified");
		const workspaceHasUntrackedEntries = await workspaceContainsUntrackedEntries(record.install.workspace, record.workspaceFiles.map((file) => file.path));
		const attachedJobs = readAttachedCronJobs(record.install.agentId, options);
		const ownedSchedulerJobIds = new Set(record.cronJobs.filter((cron) => cron.status !== "removed" && cron.schedulerJobId).map((cron) => cron.schedulerJobId));
		for (const job of attachedJobs.filter((candidate) => !ownedSchedulerJobIds.has(candidate.id))) blockers.push({
			code: "agent_job_attached",
			message: `Cron job ${JSON.stringify(job.id)} still references agent ${JSON.stringify(record.install.agentId)}; reassign or remove it first.`
		});
		actions.push({
			kind: "agent",
			id: record.install.agentId,
			action: "remove",
			target: `agents.entries[${JSON.stringify(record.install.agentId)}]`,
			blocked: record.agentState === "modified",
			details: {
				expectedState: record.agentState,
				configDigest: record.install.agentConfigDigest,
				removalSurfaceDigest: digestClawAgentRemovalSurface(options.config ?? getRuntimeConfig(), record.install.agentId),
				ownedPaths: record.install.agentOwnedPaths
			},
			...record.agentState === "modified" ? { reason: "Agent config digest changed." } : {}
		});
		if (effects.pruned.removedBindings > 0) actions.push({
			kind: "configBinding",
			id: record.install.agentId,
			action: "remove",
			target: `bindings[agentId=${record.install.agentId}]`,
			blocked: record.agentState === "modified",
			details: { count: effects.pruned.removedBindings }
		});
		if (effects.pruned.removedAllow > 0) actions.push({
			kind: "agentAllow",
			id: record.install.agentId,
			action: "remove",
			target: `tools.agentToAgent.allow[${record.install.agentId}]`,
			blocked: record.agentState === "modified",
			details: { count: effects.pruned.removedAllow }
		});
		if (effects.workspace) actions.push({
			kind: "workspace",
			id: record.install.agentId,
			action: effects.workspaceRetained || workspaceHasModifiedFiles || workspaceHasUntrackedEntries ? "retain" : "trash",
			target: effects.workspace,
			blocked: record.agentState === "modified",
			details: {
				retained: effects.workspaceRetained || workspaceHasModifiedFiles || workspaceHasUntrackedEntries,
				sharedWith: effects.workspaceSharedWith
			},
			...effects.workspaceRetained ? { reason: "Workspace overlaps another agent." } : workspaceHasModifiedFiles ? { reason: "Workspace contains locally modified Claw-managed files." } : workspaceHasUntrackedEntries ? { reason: "Workspace contains files or directories not managed by this Claw." } : {}
		});
		if (effects.agentDir) actions.push({
			kind: "agentState",
			id: record.install.agentId,
			action: "trash",
			target: effects.agentDir,
			blocked: record.agentState === "modified"
		});
		actions.push({
			kind: "sessionIndex",
			id: record.install.agentId,
			action: "delete",
			target: `session store entries for agent:${record.install.agentId}`,
			blocked: record.agentState === "modified"
		});
		actions.push({
			kind: "sessionTranscripts",
			id: record.install.agentId,
			action: "trash",
			target: effects.sessionsDir,
			blocked: record.agentState === "modified"
		});
		for (const job of attachedJobs) actions.push({
			kind: "scheduledJob",
			id: job.id,
			action: "retain",
			target: `cron_jobs:${job.id}`,
			blocked: true,
			reason: "Operator-owned scheduled work must be reassigned or removed explicitly.",
			details: {
				name: job.name,
				enabled: job.enabled,
				agentId: job.agentId,
				ownerAgentId: job.ownerAgentId
			}
		});
		for (const file of record.workspaceFiles) actions.push({
			kind: "workspaceFile",
			id: file.path,
			action: file.state === "unchanged" ? "delete" : "retain",
			target: `${file.workspace}:${file.path}`,
			blocked: file.state === "unsafe",
			details: {
				expectedState: file.state,
				contentDigest: file.contentDigest,
				workspace: file.workspace
			},
			...file.state === "modified" ? { reason: "Local content changed; preserve the file." } : {}
		});
		actions.push(...packagePlan.actions);
		const unmatchedMcpSelectors = new Set(mcpCleanup?.selected ?? []);
		for (const server of record.mcpServers) {
			const blocked = server.state === "pending";
			const decision = planClawMcpServerRemoval(server, {
				...options,
				referencedCleanup: mcpCleanup
			});
			unmatchedMcpSelectors.delete(clawMcpRemovalSelector(server));
			if (decision.blocked) blockers.push({
				code: "referenced_cleanup_requires_override",
				message: `${clawMcpRemovalSelector(server)}: ${decision.reason ?? "explicit conflict override is required"}`
			});
			actions.push({
				kind: "mcpServer",
				id: server.name,
				action: blocked ? "retain" : decision.action,
				target: `mcp.servers.${server.name}`,
				blocked,
				details: {
					expectedState: server.state,
					configDigest: server.configDigest,
					relationship: server.relationship,
					origin: server.origin,
					independentOwner: server.independentOwner,
					affectedClawAgentIds: decision.affectedClawAgentIds,
					cleanupMode: mcpCleanup?.mode ?? "retain",
					availableCleanupModes: server.relationship === "referenced" ? [
						"retain",
						"remove-if-unused",
						"remove-selected"
					] : ["remove"]
				},
				...blocked ? { reason: `MCP ownership state is ${server.state}.` } : decision.reason ? { reason: decision.reason } : {}
			});
		}
		for (const selector of unmatchedMcpSelectors) blockers.push({
			code: "referenced_cleanup_not_found",
			message: `Selected referenced resource ${JSON.stringify(selector)} is not owned by this Claw.`
		});
		for (const cron of record.cronJobs) {
			const blocked = cron.status !== "removed" && (cron.status !== "complete" || !cron.schedulerJobId);
			actions.push({
				kind: "cronJob",
				id: cron.manifestId,
				action: blocked ? "retain" : "remove",
				target: cron.schedulerJobId ?? cron.declarationKey,
				blocked,
				details: {
					expectedStatus: cron.status,
					declarationKey: cron.declarationKey,
					schedulerJobId: cron.schedulerJobId,
					job: cron.job
				},
				...blocked ? { reason: `Cron ownership state is ${cron.status}.` } : {}
			});
		}
		actions.push({
			kind: "installRecord",
			id: record.install.agentId,
			action: "remove",
			target: `claw_installs:${record.install.agentId}`,
			blocked: false,
			details: {
				expectedStatus: record.install.status,
				planIntegrity: record.install.planIntegrity,
				sourceIntegrity: record.install.claw.integrity
			}
		});
	}
	const planIdentity = {
		target,
		agentId: record?.install.agentId,
		actions,
		blockers
	};
	return {
		schemaVersion: CLAW_REMOVE_PLAN_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: true,
		mutationAllowed: false,
		planIntegrity: `sha256:${createHash("sha256").update(stableStringify(planIdentity)).digest("hex")}`,
		target,
		...record ? { agentId: record.install.agentId } : {},
		actions,
		blockers
	};
}
async function applyClawRemovePlan(plan, options = {}) {
	if (options.consentPlanIntegrity !== plan.planIntegrity) throw new ClawRemoveError("plan_integrity_mismatch", "Consent does not match the current Claw remove plan; run remove --dry-run again.");
	if (plan.blockers.length > 0 || !plan.agentId) throw new ClawRemoveError("remove_blocked", "The Claw remove plan contains blockers.");
	if ((await buildClawRemovePlan(plan.target, options)).planIntegrity !== plan.planIntegrity) throw new ClawRemoveError("remove_changed", "Claw-owned state changed after remove planning.");
	const agentId = plan.agentId;
	const expectedRemovalSurfaceDigest = plan.actions.find((action) => action.kind === "agent" && action.id === agentId)?.details?.removalSurfaceDigest;
	if (typeof expectedRemovalSurfaceDigest !== "string") throw new ClawRemoveError("remove_changed", "Claw remove plan is missing config state.");
	const record = (await readClawStatus(plan.agentId, options)).records[0];
	if (!record || record.agentState === "modified" || record.workspaceFiles.some((file) => file.state === "unsafe") || record.mcpServers.some((server) => server.state === "pending")) throw new ClawRemoveError("remove_changed", "Claw-owned state changed after remove planning.");
	const packageDecisions = await planClawPackageRemovals(record.install, record.packages, {
		...options,
		deps: options.packageDeps,
		referencedCleanup: options.referencedCleanup ? {
			...options.referencedCleanup,
			selected: (options.referencedCleanup.selected ?? []).filter((selector) => !selector.startsWith("mcp:"))
		} : void 0
	});
	const plannedPackages = plan.actions.filter((action) => action.kind === "packageRef").map((action) => `${action.id}:${action.action}`).toSorted();
	const currentPackages = packageDecisions.map((decision) => `${decision.packageRef.kind}:${decision.packageRef.ref}@${decision.packageRef.version}:${decision.action === "uninstall" ? "uninstall" : "release"}`).toSorted();
	if (JSON.stringify(plannedPackages) !== JSON.stringify(currentPackages)) throw new ClawRemoveError("remove_changed", "Package ownership changed after remove planning.");
	const plannedMcpServers = plan.actions.filter((action) => action.kind === "mcpServer").map((action) => `${action.id}:${action.action}`).toSorted();
	const currentMcpServers = record.mcpServers.map((server) => `${server.name}:${planClawMcpServerRemoval(server, options).action}`).toSorted();
	if (JSON.stringify(plannedMcpServers) !== JSON.stringify(currentMcpServers)) throw new ClawRemoveError("remove_changed", "MCP ownership changed after remove planning.");
	const mcpRemoval = await removeClawMcpServers({
		agentId: plan.agentId,
		servers: record.mcpServers,
		options
	});
	const mcpServers = mcpRemoval.mcpServers;
	if (mcpRemoval.error) {
		updateClawInstallRecordStatus(agentId, "partial", options);
		return {
			schemaVersion: CLAW_REMOVE_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: false,
			status: "partial",
			agentId,
			agentRemoved: false,
			workspaceFiles: [],
			packages: [],
			mcpServers,
			cronJobs: [],
			packageRefsReleased: 0,
			error: {
				code: "mcp_cleanup_failed",
				message: mcpRemoval.error
			}
		};
	}
	const cronJobs = [];
	for (const cron of record.cronJobs) {
		if (cron.status !== "removed" && (!cron.schedulerJobId || cron.status !== "complete")) throw new ClawRemoveError("cron_cleanup_uncertain", `Cron declaration ${JSON.stringify(cron.manifestId)} is not safely removable.`);
		if (cron.status !== "removed" && (!options.cronGateway?.get || !options.cronGateway.remove)) throw new ClawRemoveError("cron_gateway_required", "Claw cron jobs require the gateway-owned cron.get and cron.remove APIs.");
		try {
			if (cron.status !== "removed") {
				const live = await options.cronGateway.get(cron.schedulerJobId);
				if (live != null && !clawCronGatewayJobMatchesRef(plan.agentId, cron, live)) throw new Error(`Cron declaration ${JSON.stringify(cron.manifestId)} changed after planning.`);
				if (live != null) try {
					await options.cronGateway.remove(cron.schedulerJobId);
				} catch (removeError) {
					if (await options.cronGateway.get(cron.schedulerJobId) != null) throw removeError;
				}
				markClawCronRefRemoved(plan.agentId, cron.manifestId, options);
			}
			deleteClawCronRef(plan.agentId, cron.manifestId, options);
			cronJobs.push({
				manifestId: cron.manifestId,
				schedulerJobId: cron.schedulerJobId,
				action: "removed"
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			cronJobs.push({
				manifestId: cron.manifestId,
				schedulerJobId: cron.schedulerJobId,
				action: "error",
				message
			});
			updateClawInstallRecordStatus(agentId, "partial", options);
			return {
				schemaVersion: CLAW_REMOVE_RESULT_SCHEMA_VERSION,
				stability: CLAW_OUTPUT_STABILITY,
				dryRun: false,
				status: "partial",
				agentId: plan.agentId,
				agentRemoved: false,
				workspaceFiles: [],
				packages: [],
				mcpServers,
				cronJobs,
				packageRefsReleased: 0,
				error: {
					code: "cron_cleanup_failed",
					message
				}
			};
		}
	}
	const { agentRemoved, cleanupTargets, configBeforeDelete, nextConfig: committedNextConfig } = await claimClawAgentConfigRemoval({
		agentId,
		expectedDigest: record.install.agentConfigDigest,
		expectedRemovalSurfaceDigest,
		expectedState: record.agentState,
		fallbackWorkspace: record.install.workspace,
		config: options.config,
		commitConfig: options.commitConfig,
		trashPath: options.trashPath,
		onModified: () => new ClawRemoveError("agent_modified", "Agent config changed during remove.")
	});
	if (!options.commitConfig || options.purgeSessions) await (options.purgeSessions ?? (await import("./cleanup-service-CpdtOs5s.js")).purgeAgentSessionStoreEntries)(configBeforeDelete, agentId);
	closeOpenClawAgentDatabaseByPath(resolveOpenClawAgentSqlitePath({
		agentId,
		env: options.env
	}));
	const packages = await applyClawPackageRemovals(packageDecisions.toSorted((left, right) => Number(left.packageRef.relationship === "referenced") - Number(right.packageRef.relationship === "referenced")), {
		...options,
		deps: options.packageDeps
	});
	const packageErrors = packages.filter((pkg) => pkg.action === "error");
	if (packageErrors.length > 0) {
		updateClawInstallRecordStatus(agentId, "partial", options);
		return {
			schemaVersion: CLAW_REMOVE_RESULT_SCHEMA_VERSION,
			stability: CLAW_OUTPUT_STABILITY,
			dryRun: false,
			status: "partial",
			agentId: plan.agentId,
			agentRemoved,
			workspaceFiles: [],
			packages,
			mcpServers,
			cronJobs,
			packageRefsReleased: 0,
			error: {
				code: "package_cleanup_failed",
				message: packageErrors.map((pkg) => pkg.reason).join("; ")
			}
		};
	}
	const workspaceFiles = [];
	for (const file of record.workspaceFiles) workspaceFiles.push(await removeClawWorkspaceFile(file));
	const cleanupErrors = workspaceFiles.filter((file) => file.action === "error").map((file) => file.message ?? `Could not remove ${file.path}.`);
	if (cleanupErrors.length === 0 && cleanupTargets && committedNextConfig) {
		const workspaceHasRemainingEntries = await workspaceContainsUntrackedEntries(cleanupTargets.workspaceDir, record.workspaceFiles.map((file) => file.path));
		cleanupErrors.push(...await cleanupClawAgentFilesystem({
			agentId,
			nextConfig: committedNextConfig,
			targets: cleanupTargets,
			runtime: clawRemoveQuietRuntime,
			trashPath: options.trashPath,
			retainWorkspace: workspaceHasRemainingEntries || workspaceFiles.some((file) => file.action === "retainedModified")
		}));
	}
	const complete = cleanupErrors.length === 0;
	if (!complete) updateClawInstallRecordStatus(agentId, "partial", options);
	releaseClawRemoveRows(plan.agentId, workspaceFiles, complete, options);
	return {
		schemaVersion: CLAW_REMOVE_RESULT_SCHEMA_VERSION,
		stability: CLAW_OUTPUT_STABILITY,
		dryRun: false,
		status: complete ? "complete" : "partial",
		agentId: plan.agentId,
		agentRemoved,
		workspaceFiles,
		packages,
		mcpServers,
		cronJobs,
		packageRefsReleased: complete ? record.packages.length : 0,
		...complete ? {} : { error: {
			code: "workspace_cleanup_failed",
			message: cleanupErrors.join("; ")
		} }
	};
}
//#endregion
export { digestClawMcpServer as A, clawCronGatewayJobMatchesRef as B, CLAW_ADD_PLAN_SCHEMA_VERSION as C, CLAW_MCP_REF_SCHEMA_VERSION as D, CLAW_OUTPUT_STABILITY as E, upsertClawMcpServerRef as F, upsertClawCronRef as G, deleteClawCronRef as H, ClawRemoveError as I, CLAW_CRON_REF_SCHEMA_VERSION as L, planClawMcpServerRemoval as M, readClawMcpServerRefs as N, ClawMcpInstallError as O, readClawMcpServerRefsByName as P, ClawCronInstallError as R, CLAW_REMOVE_PLAN_SCHEMA_VERSION as S, CLAW_INSPECT_RESULT_SCHEMA_VERSION as T, installClawCronJobs as U, clawCronSchedulerJobFromResult as V, readClawCronRefs as W, parseClawManifest as _, CLAW_WORKSPACE_FILE_RECORD_SCHEMA_VERSION as a, preflightPluginInstall as b, deleteClawWorkspaceFileRecord as c, upsertClawWorkspaceFile as d, readClawManifestFile as f, clawManifestWorkspaceConflictsWithPath as g, MAX_MANAGED_WORKSPACE_BYTES as h, readClawStatus as i, installClawMcpServers as j, deleteClawMcpServerRef as k, readClawWorkspaceActionSource as l, MAX_MANAGED_FILE_BYTES as m, applyClawRemovePlan as n, ClawWorkspaceWriteError as o, MAX_CLAW_MANIFEST_BYTES as p, buildClawRemovePlan as r, createClawWorkspaceFiles as s, CLAW_REMOVE_RESULT_SCHEMA_VERSION as t, readClawWorkspaceFiles as u, parseClawOpenClawProfile as v, CLAW_BOOTSTRAP_FILE_NAMES as w, resolveInstalledClawHubPlugin as x, isPortableClawAvatar as y, clawCronGatewayInput as z };
