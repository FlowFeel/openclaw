import { g as onTrustedInternalDiagnosticEvent } from "./diagnostic-events-Dt41CZkD.js";
import { t as createSubsystemLogger } from "./subsystem-Cr19cPPQ.js";
import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-BJTPe7U8.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-BU55lNCH.js";
import { nt as normalizeSkillIndexName, o as readSkillProposalManifest, s as readSkillProposalRecord } from "./store-CR6r1z2u.js";
import { i as bumpSkillsSnapshotVersion } from "./symlink-targets-BsIBLVmY.js";
import fs, { realpathSync } from "node:fs";
import path, { isAbsolute, relative, resolve, sep } from "node:path";
//#region src/agents/utils/paths.ts
/**
* Agent path formatting helpers.
*
* Canonicalizes local paths and formats paths relative to a workspace when possible.
*/
/**
* Resolve a path to its canonical (real) form, following symlinks.
* Falls back to the raw path if resolution fails (e.g. the target does
* not exist yet), so that callers never crash on missing filesystem
* entries.
*/
function canonicalizePath(path) {
	try {
		return realpathSync(path);
	} catch {
		return path;
	}
}
/**
* Returns true if the value is NOT a package source (npm:, git:, etc.)
* or a URL protocol. Bare names and relative paths without ./ prefix
* are considered local.
*/
function isLocalPath(value) {
	const trimmed = value.trim();
	if (trimmed.startsWith("npm:") || trimmed.startsWith("git:") || trimmed.startsWith("github:") || trimmed.startsWith("http:") || trimmed.startsWith("https:") || trimmed.startsWith("ssh:")) return false;
	return true;
}
function resolveAgainstCwd(filePath, cwd) {
	return isAbsolute(filePath) ? resolve(filePath) : resolve(cwd, filePath);
}
function getCwdRelativePath(filePath, cwd) {
	const resolvedCwd = resolve(cwd);
	const relativePath = relative(resolvedCwd, resolveAgainstCwd(filePath, resolvedCwd));
	return relativePath === "" || relativePath !== ".." && !relativePath.startsWith(`..${sep}`) && !isAbsolute(relativePath) ? relativePath || "." : void 0;
}
function formatPathRelativeToCwdOrAbsolute(filePath, cwd) {
	const absolutePath = resolveAgainstCwd(filePath, cwd);
	return (getCwdRelativePath(absolutePath, cwd) ?? absolutePath).split(sep).join("/");
}
//#endregion
//#region src/skills/workshop/curator.ts
const STALE_AFTER_MS = 720 * 60 * 6e4;
const ARCHIVE_AFTER_MS = 2160 * 60 * 6e4;
const CURATOR_SWEEP_INTERVAL_MS = 1440 * 6e4;
const CURATOR_INITIAL_DELAY_MS = 5 * 6e4;
const DOCTOR_WEDGED_AFTER_MS = 10080 * 6e4;
const log = createSubsystemLogger("skills/curator");
const CURATOR_STATE_ID = 1;
const EMPTY_RESULT_JSON = "{}";
let loggedArchivedSkillReadFailure = false;
function curatorDb(options = {}) {
	const database = openOpenClawStateDatabase(options);
	return {
		database,
		kysely: getNodeSqliteKysely(database.db)
	};
}
function canonicalSkillKey(name) {
	const key = normalizeSkillIndexName(name);
	if (!key) throw new Error(`Invalid skill name: ${name}`);
	return key;
}
function recordSkillUsage(event, options = {}) {
	const rawSkillFile = event.skillFile?.trim();
	if (!rawSkillFile || !path.isAbsolute(rawSkillFile)) {
		log.debug(`skipping skill usage without file identity: ${event.skillName}`);
		return;
	}
	const skillFile = canonicalizePath(path.resolve(rawSkillFile));
	const skillKey = canonicalSkillKey(event.skillName);
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("skill_usage").values({
			skill_file: skillFile,
			skill_key: skillKey,
			skill_name: event.skillName,
			skill_source: event.skillSource,
			first_used_at_ms: event.ts,
			last_used_at_ms: event.ts,
			use_count: 1,
			last_agent_id: event.agentId ?? null
		}).onConflict((conflict) => conflict.column("skill_file").doUpdateSet((eb) => ({
			skill_key: skillKey,
			skill_name: event.skillName,
			skill_source: event.skillSource,
			first_used_at_ms: eb.fn("min", [eb.ref("first_used_at_ms"), eb.val(event.ts)]),
			last_used_at_ms: eb.fn("max", [eb.ref("last_used_at_ms"), eb.val(event.ts)]),
			use_count: eb("use_count", "+", 1),
			last_agent_id: eb.case().when("last_used_at_ms", "<=", event.ts).then(event.agentId ?? null).else(eb.ref("last_agent_id")).end()
		}))));
	}, options);
}
/** Register once per Gateway lifetime; listener failures never reach tool execution. */
function registerSkillUsageTracking(options = {}) {
	return onTrustedInternalDiagnosticEvent((event, metadata, privateData) => {
		if (!metadata.trusted || event.type !== "skill.used") return;
		try {
			recordSkillUsage({
				...event,
				skillFile: privateData.skillUsage?.skillFile
			}, options);
		} catch (error) {
			log.warn(`failed to record skill usage: ${String(error)}`);
		}
	});
}
function startSkillCuratorMaintenance(options) {
	const unregisterUsageTracking = (options.registerUsageTracking ?? registerSkillUsageTracking)();
	const sweep = options.runSweep ?? runSkillCuratorSweep;
	let sweepInFlight = null;
	const performSweep = () => {
		if (sweepInFlight) return sweepInFlight;
		sweepInFlight = sweep().then(() => void 0).catch(options.onError).finally(() => {
			sweepInFlight = null;
		});
		return sweepInFlight;
	};
	const initialSweep = setTimeout(() => void performSweep(), CURATOR_INITIAL_DELAY_MS);
	const sweepInterval = setInterval(() => void performSweep(), CURATOR_SWEEP_INTERVAL_MS);
	return () => {
		clearTimeout(initialSweep);
		clearInterval(sweepInterval);
		unregisterUsageTracking();
	};
}
async function loadCuratedSkills(options = {}) {
	const manifest = await readSkillProposalManifest({ env: options.env });
	const byFile = /* @__PURE__ */ new Map();
	const appliedRecords = [];
	for (const entry of manifest.proposals.toSorted((a, b) => a.id.localeCompare(b.id))) {
		if (entry.status !== "applied") continue;
		const record = await readSkillProposalRecord(entry.id, { env: options.env });
		if (!record || record.status !== "applied" || !record.appliedAt) continue;
		const appliedAtMs = Date.parse(record.appliedAt);
		if (!Number.isFinite(appliedAtMs)) continue;
		appliedRecords.push({
			appliedAtMs,
			record
		});
		if (record.kind !== "create" || record.createdBy !== "skill-workshop") continue;
		const skillKey = canonicalSkillKey(record.target.skillKey || record.target.skillName);
		const skillFile = canonicalizePath(record.target.skillFile);
		const existing = byFile.get(skillFile);
		if (existing && existing.lastAppliedAtMs > appliedAtMs) {
			existing.createdAtMs = Math.min(existing.createdAtMs, appliedAtMs);
			continue;
		}
		byFile.set(skillFile, {
			createdAtMs: Math.min(existing?.createdAtMs ?? appliedAtMs, appliedAtMs),
			description: record.description,
			lastAppliedAtMs: appliedAtMs,
			skillFile,
			skillKey,
			skillName: record.target.skillName
		});
	}
	for (const { appliedAtMs, record } of appliedRecords) {
		if (record.kind !== "update") continue;
		const skillFile = canonicalizePath(record.target.skillFile);
		const curated = byFile.get(skillFile);
		if (!curated) continue;
		if (appliedAtMs >= curated.lastAppliedAtMs) {
			curated.lastAppliedAtMs = appliedAtMs;
			curated.description = record.description;
		}
	}
	return [...byFile.values()].toSorted((a, b) => a.skillFile.localeCompare(b.skillFile));
}
function overlapTokens(value) {
	return new Set(value.toLowerCase().split(/[^a-z0-9]+/u).filter((token) => token.length > 2));
}
function tokenJaccard(left, right) {
	const intersection = [...left].filter((token) => right.has(token)).length;
	const union = (/* @__PURE__ */ new Set([...left, ...right])).size;
	return union === 0 ? 0 : intersection / union;
}
function detectOverlapCandidates(skills) {
	const candidates = [];
	for (let leftIndex = 0; leftIndex < skills.length; leftIndex += 1) for (let rightIndex = leftIndex + 1; rightIndex < skills.length; rightIndex += 1) {
		const left = skills[leftIndex];
		const right = skills[rightIndex];
		if (!left || !right) continue;
		if (path.dirname(path.dirname(path.dirname(left.skillFile))) !== path.dirname(path.dirname(path.dirname(right.skillFile)))) continue;
		const nameScore = tokenJaccard(overlapTokens(left.skillName), overlapTokens(right.skillName));
		const descriptionScore = tokenJaccard(overlapTokens(left.description), overlapTokens(right.description));
		const score = Math.max(nameScore, descriptionScore);
		if (score >= .5) candidates.push({
			left: left.skillKey,
			right: right.skillKey,
			score
		});
	}
	return candidates;
}
function desiredLifecycleState(ageMs) {
	if (ageMs > ARCHIVE_AFTER_MS) return "archived";
	if (ageMs > STALE_AFTER_MS) return "stale";
	return "active";
}
function writeSweepAttempt(nowMs, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("skill_curator_state").values({
			id: CURATOR_STATE_ID,
			last_attempt_at_ms: nowMs,
			last_success_at_ms: null,
			last_error: null,
			last_result_json: EMPTY_RESULT_JSON
		}).onConflict((conflict) => conflict.column("id").doUpdateSet({ last_attempt_at_ms: nowMs })));
	}, options);
}
function writeSweepFailure(nowMs, error, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).insertInto("skill_curator_state").values({
			id: CURATOR_STATE_ID,
			last_attempt_at_ms: nowMs,
			last_success_at_ms: null,
			last_error: String(error),
			last_result_json: EMPTY_RESULT_JSON
		}).onConflict((conflict) => conflict.column("id").doUpdateSet({
			last_attempt_at_ms: nowMs,
			last_error: String(error)
		})));
	}, options);
}
async function runSkillCuratorSweep(options = {}) {
	const nowMs = options.nowMs ?? Date.now();
	const startedAtMs = Date.now();
	writeSweepAttempt(nowMs, options);
	try {
		const curated = await loadCuratedSkills(options);
		const existingCurated = [];
		const result = runOpenClawStateWriteTransaction(({ db }) => {
			const kysely = getNodeSqliteKysely(db);
			const lifecycleRows = executeSqliteQuerySync(db, kysely.selectFrom("skill_lifecycle").selectAll()).rows;
			const usageRows = executeSqliteQuerySync(db, kysely.selectFrom("skill_usage").select(["skill_file", "last_used_at_ms"])).rows;
			const lifecycleByFile = new Map(lifecycleRows.map((row) => [row.skill_file, row]));
			const usageByFile = new Map(usageRows.map((row) => [row.skill_file, row.last_used_at_ms]));
			let stale = 0;
			let archived = 0;
			let pinnedSkipped = 0;
			for (const skill of curated) {
				const existing = lifecycleByFile.get(skill.skillFile);
				if (!fs.existsSync(skill.skillFile)) {
					for (const table of ["skill_lifecycle", "skill_usage"]) executeSqliteQuerySync(db, kysely.deleteFrom(table).where("skill_file", "=", skill.skillFile));
					continue;
				}
				existingCurated.push(skill);
				if (existing?.pinned === 1) {
					pinnedSkipped += 1;
					continue;
				}
				const createdAtMs = existing?.created_at_ms ?? skill.createdAtMs;
				const lastActivityMs = Math.max(usageByFile.get(skill.skillFile) ?? 0, skill.lastAppliedAtMs, createdAtMs);
				const desired = existing?.state === "archived" ? "archived" : desiredLifecycleState(nowMs - lastActivityMs);
				if (desired === "stale" && existing?.state !== "stale") stale += 1;
				if (desired === "archived" && existing?.state !== "archived") archived += 1;
				const stateChangedAtMs = existing?.state === desired ? existing.state_changed_at_ms : nowMs;
				executeSqliteQuerySync(db, kysely.insertInto("skill_lifecycle").values({
					skill_key: skill.skillKey,
					skill_name: skill.skillName,
					skill_file: skill.skillFile,
					state: desired,
					pinned: 0,
					state_changed_at_ms: stateChangedAtMs,
					created_at_ms: createdAtMs,
					archived_reason: desired === "archived" ? "unused for 90 days" : null
				}).onConflict((conflict) => conflict.column("skill_file").doUpdateSet({
					skill_key: skill.skillKey,
					skill_name: skill.skillName,
					state: desired,
					state_changed_at_ms: stateChangedAtMs,
					archived_reason: desired === "archived" ? "unused for 90 days" : null
				})));
			}
			return {
				stale,
				archived,
				pinnedSkipped
			};
		}, options);
		if (result.archived > 0) bumpSkillsSnapshotVersion({ reason: "workshop" });
		const sweepResult = {
			examined: curated.length,
			...result,
			durationMs: Math.max(0, Date.now() - startedAtMs),
			overlaps: detectOverlapCandidates(existingCurated)
		};
		runOpenClawStateWriteTransaction(({ db }) => {
			executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("skill_curator_state").set({
				last_success_at_ms: nowMs,
				last_error: null,
				last_result_json: JSON.stringify(sweepResult)
			}).where("id", "=", CURATOR_STATE_ID));
		}, options);
		return sweepResult;
	} catch (error) {
		writeSweepFailure(nowMs, error, options);
		throw error;
	}
}
function parseOverlapCandidates(value) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed.overlaps) ? parsed.overlaps.filter((entry) => Boolean(entry && typeof entry === "object" && typeof entry.left === "string" && typeof entry.right === "string" && typeof entry.score === "number")) : [];
	} catch {
		return [];
	}
}
function getSkillCuratorStatus(options = {}) {
	const { database, kysely } = curatorDb(options);
	const state = executeSqliteQueryTakeFirstSync(database.db, kysely.selectFrom("skill_curator_state").selectAll().where("id", "=", CURATOR_STATE_ID));
	const rows = executeSqliteQuerySync(database.db, kysely.selectFrom("skill_lifecycle").leftJoin("skill_usage", "skill_usage.skill_file", "skill_lifecycle.skill_file").select([
		"skill_lifecycle.skill_key as skillKey",
		"skill_lifecycle.skill_name as skillName",
		"skill_lifecycle.skill_file as skillFile",
		"skill_lifecycle.state as state",
		"skill_lifecycle.pinned as pinned",
		"skill_lifecycle.created_at_ms as createdAtMs",
		"skill_lifecycle.state_changed_at_ms as stateChangedAtMs",
		"skill_lifecycle.archived_reason as archivedReason",
		"skill_usage.last_used_at_ms as lastUsedAtMs",
		"skill_usage.use_count as useCount"
	]).orderBy("skill_lifecycle.skill_file", "asc")).rows;
	const counts = {
		active: 0,
		stale: 0,
		archived: 0
	};
	const skills = [];
	for (const row of rows) {
		const lifecycleState = row.state;
		counts[lifecycleState] += 1;
		skills.push({
			...row,
			state: lifecycleState,
			pinned: row.pinned === 1,
			lastUsedAtMs: row.lastUsedAtMs ?? null,
			useCount: row.useCount ?? 0
		});
	}
	return {
		lastAttemptAtMs: state?.last_attempt_at_ms ?? null,
		lastSuccessAtMs: state?.last_success_at_ms ?? null,
		lastError: state?.last_error ?? null,
		counts,
		skills,
		overlaps: parseOverlapCandidates(state?.last_result_json)
	};
}
function updateLifecyclePin(skill, pinned, options) {
	const skillKey = canonicalSkillKey(skill);
	const firstSkillFile = runOpenClawStateWriteTransaction(({ db }) => {
		const kysely = getNodeSqliteKysely(db);
		const first = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_lifecycle").select("skill_file").where("skill_key", "=", skillKey).orderBy("skill_file", "asc"));
		if (!first) return null;
		return executeSqliteQuerySync(db, kysely.updateTable("skill_lifecycle").set({ pinned: pinned ? 1 : 0 }).where("skill_key", "=", skillKey)).numAffectedRows === 0n ? null : first.skill_file;
	}, options);
	if (!firstSkillFile) throw new Error(`Curated skill not found: ${skill}`);
	return getSkillCuratorStatus(options).skills.find((entry) => entry.skillFile === firstSkillFile);
}
function pinCuratedSkill(skill, options = {}) {
	return updateLifecyclePin(skill, true, options);
}
function unpinCuratedSkill(skill, options = {}) {
	return updateLifecyclePin(skill, false, options);
}
function restoreCuratedSkill(skill, options = {}) {
	const skillKey = canonicalSkillKey(skill);
	const nowMs = options.nowMs ?? Date.now();
	const firstSkillFile = runOpenClawStateWriteTransaction(({ db }) => {
		const kysely = getNodeSqliteKysely(db);
		const first = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_lifecycle").select("skill_file").where("skill_key", "=", skillKey).where("state", "=", "archived").orderBy("skill_file", "asc"));
		if (!first) return null;
		return executeSqliteQuerySync(db, kysely.updateTable("skill_lifecycle").set({
			state: "active",
			state_changed_at_ms: nowMs,
			archived_reason: null
		}).where("skill_key", "=", skillKey).where("state", "=", "archived")).numAffectedRows === 0n ? null : first.skill_file;
	}, options);
	if (!firstSkillFile) throw new Error(`Archived curated skill not found: ${skill}`);
	bumpSkillsSnapshotVersion({
		reason: "workshop",
		changedPath: firstSkillFile
	});
	return getSkillCuratorStatus(options).skills.find((entry) => entry.skillFile === firstSkillFile);
}
function getArchivedSkillFiles(options = {}) {
	try {
		const { database, kysely } = curatorDb(options);
		const rows = executeSqliteQuerySync(database.db, kysely.selectFrom("skill_lifecycle").select("skill_file").where("state", "=", "archived").orderBy("skill_file", "asc")).rows;
		return new Set(rows.map((row) => row.skill_file));
	} catch (error) {
		if (!loggedArchivedSkillReadFailure) {
			loggedArchivedSkillReadFailure = true;
			log.warn("failed to read archived skill state; loading without lifecycle filtering", { error: String(error) });
		}
		return /* @__PURE__ */ new Set();
	}
}
function getSkillCuratorDoctorWarning(options = {}) {
	const status = getSkillCuratorStatus(options);
	if (status.lastAttemptAtMs === null) return null;
	const nowMs = options.nowMs ?? Date.now();
	const successTooOld = status.lastSuccessAtMs === null ? nowMs - status.lastAttemptAtMs > DOCTOR_WEDGED_AFTER_MS : status.lastAttemptAtMs - status.lastSuccessAtMs > DOCTOR_WEDGED_AFTER_MS && nowMs - status.lastSuccessAtMs > DOCTOR_WEDGED_AFTER_MS;
	if (!status.lastError && !successTooOld) return null;
	return `skill curator has not completed a sweep since ${status.lastSuccessAtMs ? new Date(status.lastSuccessAtMs).toISOString() : "its first attempt"} — check gateway logs`;
}
//#endregion
export { restoreCuratedSkill as a, canonicalizePath as c, pinCuratedSkill as i, formatPathRelativeToCwdOrAbsolute as l, getSkillCuratorDoctorWarning as n, startSkillCuratorMaintenance as o, getSkillCuratorStatus as r, unpinCuratedSkill as s, getArchivedSkillFiles as t, isLocalPath as u };
