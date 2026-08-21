import "./src-COWbwBfI.js";
import { t as stableStringify } from "./stable-stringify-DoZ6Yalc.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-D9eH245j.js";
import { createHash } from "node:crypto";
//#region src/claws/provenance.ts
const CLAW_INSTALL_RECORD_SCHEMA_VERSION = "openclaw.clawInstallRecord.v1";
function rowToInstall(row) {
	return {
		schemaVersion: CLAW_INSTALL_RECORD_SCHEMA_VERSION,
		claw: {
			kind: row.source_kind,
			name: row.claw_name,
			version: row.claw_version,
			packageRoot: row.package_root,
			manifestPath: row.manifest_path,
			integrityKind: row.integrity_kind,
			integrity: row.integrity,
			byteLength: Number(row.source_byte_length)
		},
		manifestSchemaVersion: Number(row.manifest_schema_version),
		planIntegrity: row.plan_integrity,
		agentId: row.agent_id,
		workspace: row.workspace,
		agentConfigDigest: row.agent_config_digest,
		agentOwnedPaths: JSON.parse(row.agent_owned_paths_json),
		status: row.status,
		addedAtMs: Number(row.added_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function digestAgentConfig(plan) {
	return `sha256:${createHash("sha256").update(stableStringify(plan.agent.config)).digest("hex")}`;
}
function agentOwnedPaths(plan) {
	return plan.actions.filter((action) => action.kind === "agent").map((action) => action.target);
}
function rowToRecord(row) {
	return {
		schemaVersion: CLAW_INSTALL_RECORD_SCHEMA_VERSION,
		claw: {
			kind: row.source_kind,
			name: row.claw_name,
			version: row.claw_version,
			packageRoot: row.package_root,
			manifestPath: row.manifest_path,
			integrityKind: row.integrity_kind,
			integrity: row.integrity,
			byteLength: Number(row.source_byte_length)
		},
		manifestSchemaVersion: Number(row.manifest_schema_version),
		planIntegrity: row.plan_integrity,
		agentId: row.agent_id,
		workspace: row.workspace,
		agentConfigDigest: row.agent_config_digest,
		agentOwnedPaths: JSON.parse(row.agent_owned_paths_json),
		status: row.status,
		addedAtMs: Number(row.added_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function selectClawInstallRow(db, agentId) {
	return db.prepare(`SELECT agent_id, schema_version, source_kind, claw_name, claw_version,
              package_root, manifest_path, integrity_kind, integrity, source_byte_length,
              manifest_schema_version, plan_integrity, workspace, agent_config_digest,
              agent_owned_paths_json, status, added_at_ms, updated_at_ms
         FROM claw_installs
        WHERE agent_id = ?`).get(agentId);
}
function getClawInstallRow(agentId, options) {
	return selectClawInstallRow(openOpenClawStateDatabase(options).db, agentId);
}
function readClawInstallRecord(agentId, options = {}) {
	const row = getClawInstallRow(agentId, options);
	return row ? rowToRecord(row) : void 0;
}
function isSameInstallAttempt(row, plan, agentConfigDigest, ownedPaths) {
	return row.schema_version === CLAW_INSTALL_RECORD_SCHEMA_VERSION && row.source_kind === plan.claw.kind && row.claw_name === plan.claw.name && row.claw_version === plan.claw.version && row.package_root === plan.claw.packageRoot && row.manifest_path === plan.claw.manifestPath && row.integrity_kind === plan.claw.integrityKind && row.integrity === plan.claw.integrity && Number(row.source_byte_length) === plan.claw.byteLength && Number(row.manifest_schema_version) === plan.manifestSchemaVersion && row.plan_integrity === plan.planIntegrity && row.workspace === plan.agent.workspace && row.agent_config_digest === agentConfigDigest && row.agent_owned_paths_json === JSON.stringify(ownedPaths);
}
function persistClawInstallRecord(plan, options = {}) {
	const nowMs = options.nowMs ?? Date.now();
	const status = options.status ?? "complete";
	const agentConfigDigest = digestAgentConfig(plan);
	const ownedPaths = agentOwnedPaths(plan);
	return runOpenClawStateWriteTransaction(({ db }) => {
		const existing = selectClawInstallRow(db, plan.agent.finalId);
		if (existing) {
			if (existing.status !== "complete" && isSameInstallAttempt(existing, plan, agentConfigDigest, ownedPaths)) return rowToRecord(existing);
			throw new Error(`Claw install record for agent ${JSON.stringify(plan.agent.finalId)} already exists.`);
		}
		db.prepare(`INSERT INTO claw_installs (
         agent_id, schema_version, source_kind, claw_name, claw_version,
         package_root, manifest_path, integrity_kind, integrity, source_byte_length,
         manifest_schema_version, plan_integrity, workspace, agent_config_digest,
         agent_owned_paths_json,
         status, added_at_ms, updated_at_ms
       ) VALUES (
         @agent_id, @schema_version, @source_kind, @claw_name, @claw_version,
         @package_root, @manifest_path, @integrity_kind, @integrity, @source_byte_length,
         @manifest_schema_version, @plan_integrity, @workspace, @agent_config_digest,
         @agent_owned_paths_json,
         @status, @added_at_ms, @updated_at_ms
       )`).run({
			agent_id: plan.agent.finalId,
			schema_version: CLAW_INSTALL_RECORD_SCHEMA_VERSION,
			source_kind: plan.claw.kind,
			claw_name: plan.claw.name,
			claw_version: plan.claw.version,
			package_root: plan.claw.packageRoot,
			manifest_path: plan.claw.manifestPath,
			integrity_kind: plan.claw.integrityKind,
			integrity: plan.claw.integrity,
			source_byte_length: plan.claw.byteLength,
			manifest_schema_version: plan.manifestSchemaVersion,
			plan_integrity: plan.planIntegrity,
			workspace: plan.agent.workspace,
			agent_config_digest: agentConfigDigest,
			agent_owned_paths_json: JSON.stringify(ownedPaths),
			status,
			added_at_ms: nowMs,
			updated_at_ms: nowMs
		});
		return {
			schemaVersion: CLAW_INSTALL_RECORD_SCHEMA_VERSION,
			claw: plan.claw,
			manifestSchemaVersion: plan.manifestSchemaVersion,
			planIntegrity: plan.planIntegrity,
			agentId: plan.agent.finalId,
			workspace: plan.agent.workspace,
			agentConfigDigest,
			agentOwnedPaths: ownedPaths,
			status,
			addedAtMs: nowMs,
			updatedAtMs: nowMs
		};
	}, options);
}
function updateClawInstallRecordStatus(agentId, status, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		const expectedStatuses = options.expectedStatuses ?? [];
		const expectedClause = expectedStatuses.length > 0 ? ` AND status IN (${expectedStatuses.map(() => "?").join(", ")})` : "";
		if (db.prepare(`UPDATE claw_installs
            SET status = ?, updated_at_ms = ?
          WHERE agent_id = ?${expectedClause}`).run(status, options.nowMs ?? Date.now(), agentId, ...expectedStatuses).changes !== 1) throw new Error(`Claw install record for agent ${JSON.stringify(agentId)} did not match the expected phase.`);
	}, options);
}
function deleteClawInstallRecord(agentId, options = {}) {
	runOpenClawStateWriteTransaction(({ db }) => {
		const expectedStatuses = options.expectedStatuses ?? [];
		const expectedClause = expectedStatuses.length > 0 ? ` AND status IN (${expectedStatuses.map(() => "?").join(", ")})` : "";
		if (db.prepare(`DELETE FROM claw_installs WHERE agent_id = ?${expectedClause}`).run(agentId, ...expectedStatuses).changes !== 1) throw new Error(`Claw install record for agent ${JSON.stringify(agentId)} did not match the expected phase.`);
	}, options);
}
function readClawInstallRecords(options = {}) {
	return openOpenClawStateDatabase(options).db.prepare(`SELECT schema_version, source_kind, claw_name, claw_version, package_root,
              manifest_path, integrity_kind, integrity, source_byte_length,
              manifest_schema_version, plan_integrity, agent_id, workspace,
              agent_config_digest, agent_owned_paths_json, status, added_at_ms,
              updated_at_ms
         FROM claw_installs
        ORDER BY agent_id`).all().map(rowToInstall);
}
const CLAW_PACKAGE_REF_SCHEMA_VERSION = "openclaw.clawPackageRef.v1";
function updateClawInstallRecord(plan, options = {}) {
	const current = readClawInstallRecord(plan.agent.finalId, options);
	if (!current) throw new Error(`No Claw install record exists for agent ${JSON.stringify(plan.agent.finalId)}.`);
	const updatedAtMs = options.nowMs ?? Date.now();
	const status = options.status ?? "complete";
	const agentConfigDigest = digestAgentConfig(plan);
	const ownedAgentPaths = plan.actions.filter((action) => action.kind === "agent").map((action) => action.target);
	runOpenClawStateWriteTransaction(({ db }) => {
		const result = db.prepare(`UPDATE claw_installs
            SET source_kind = @source_kind,
                claw_name = @claw_name,
                claw_version = @claw_version,
                package_root = @package_root,
                manifest_path = @manifest_path,
                integrity_kind = @integrity_kind,
                integrity = @integrity,
                source_byte_length = @source_byte_length,
                manifest_schema_version = @manifest_schema_version,
                plan_integrity = @plan_integrity,
                workspace = @workspace,
                agent_config_digest = @agent_config_digest,
                agent_owned_paths_json = @agent_owned_paths_json,
                status = @status,
                updated_at_ms = @updated_at_ms
          WHERE agent_id = @agent_id
            AND claw_version = @expected_claw_version
            AND integrity = @expected_integrity`).run({
			agent_id: plan.agent.finalId,
			source_kind: plan.claw.kind,
			claw_name: plan.claw.name,
			claw_version: plan.claw.version,
			package_root: plan.claw.packageRoot,
			manifest_path: plan.claw.manifestPath,
			integrity_kind: plan.claw.integrityKind,
			integrity: plan.claw.integrity,
			source_byte_length: plan.claw.byteLength,
			manifest_schema_version: plan.manifestSchemaVersion,
			plan_integrity: plan.planIntegrity,
			workspace: plan.agent.workspace,
			agent_config_digest: agentConfigDigest,
			agent_owned_paths_json: JSON.stringify(ownedAgentPaths),
			status,
			updated_at_ms: updatedAtMs,
			expected_claw_version: options.expectedClaw?.version ?? current.claw.version,
			expected_integrity: options.expectedClaw?.integrity ?? current.claw.integrity
		});
		if (Number(result.changes) !== 1) throw new Error(`Claw install record changed for agent ${JSON.stringify(plan.agent.finalId)}.`);
	}, options);
	return {
		schemaVersion: CLAW_INSTALL_RECORD_SCHEMA_VERSION,
		claw: plan.claw,
		manifestSchemaVersion: plan.manifestSchemaVersion,
		planIntegrity: plan.planIntegrity,
		agentId: plan.agent.finalId,
		workspace: plan.agent.workspace,
		agentConfigDigest,
		agentOwnedPaths: ownedAgentPaths,
		status,
		addedAtMs: current.addedAtMs,
		updatedAtMs
	};
}
function rowToPackageRef(row) {
	return {
		schemaVersion: CLAW_PACKAGE_REF_SCHEMA_VERSION,
		agentId: row.agent_id,
		clawName: row.claw_name,
		kind: row.package_kind,
		source: row.package_source,
		ref: row.package_ref,
		version: row.package_version,
		integrity: row.package_integrity,
		status: row.package_status,
		relationship: row.relationship,
		origin: row.origin,
		independentOwner: Number(row.independent_owner) === 1,
		installedAtMs: Number(row.installed_at_ms),
		updatedAtMs: Number(row.updated_at_ms)
	};
}
function persistClawPackageRef(plan, pkg, options = {}) {
	const nowMs = options.nowMs ?? Date.now();
	let record = {
		schemaVersion: CLAW_PACKAGE_REF_SCHEMA_VERSION,
		agentId: plan.agent.finalId,
		clawName: plan.claw.name,
		kind: pkg.kind,
		source: pkg.source,
		ref: pkg.ref,
		version: pkg.version,
		integrity: pkg.integrity,
		status: options.status ?? "complete",
		relationship: options.relationship ?? (pkg.kind === "skill" ? "managed" : "referenced"),
		origin: options.origin ?? "claw-introduced",
		independentOwner: options.independentOwner ?? false,
		installedAtMs: nowMs,
		updatedAtMs: nowMs
	};
	runOpenClawStateWriteTransaction(({ db }) => {
		const existing = db.prepare(`SELECT schema_version, agent_id, claw_name, package_kind, package_source,
                package_ref, package_version, package_integrity, package_status, relationship, origin,
                independent_owner,
                installed_at_ms, updated_at_ms
           FROM claw_package_refs
          WHERE agent_id = @agent_id
            AND package_kind = @package_kind
            AND package_source = @package_source
            AND package_ref = @package_ref
            AND package_version = @package_version`).get({
			agent_id: record.agentId,
			package_kind: record.kind,
			package_source: record.source,
			package_ref: record.ref,
			package_version: record.version
		});
		if (existing) {
			const previous = rowToPackageRef(existing);
			if (previous.integrity !== record.integrity) throw new Error(`Claw package reference ${record.kind}:${record.ref}@${record.version} changed integrity from ${previous.integrity} to ${record.integrity}.`);
			record = {
				...record,
				relationship: previous.relationship,
				origin: previous.origin === "claw-introduced" ? "claw-introduced" : record.origin,
				independentOwner: previous.independentOwner || record.independentOwner,
				installedAtMs: previous.installedAtMs
			};
			db.prepare(`UPDATE claw_package_refs
            SET schema_version = @schema_version,
                claw_name = @claw_name,
                package_status = @package_status,
                relationship = @relationship,
                origin = @origin,
                independent_owner = @independent_owner,
                updated_at_ms = @updated_at_ms
          WHERE agent_id = @agent_id
            AND package_kind = @package_kind
            AND package_source = @package_source
            AND package_ref = @package_ref
            AND package_version = @package_version
            AND package_integrity = @package_integrity`).run({
				agent_id: record.agentId,
				package_kind: record.kind,
				package_source: record.source,
				package_ref: record.ref,
				package_version: record.version,
				package_integrity: record.integrity,
				schema_version: record.schemaVersion,
				claw_name: record.clawName,
				package_status: record.status,
				relationship: record.relationship,
				origin: record.origin,
				independent_owner: record.independentOwner ? 1 : 0,
				updated_at_ms: record.updatedAtMs
			});
			return;
		}
		db.prepare(`INSERT INTO claw_package_refs (
         agent_id, package_kind, package_source, package_ref, package_version,
         package_integrity, schema_version, claw_name, package_status, relationship, origin,
         independent_owner,
         installed_at_ms,
         updated_at_ms
       ) VALUES (
         @agent_id, @package_kind, @package_source, @package_ref, @package_version,
         @package_integrity, @schema_version, @claw_name, @package_status, @relationship, @origin,
         @independent_owner,
         @installed_at_ms,
         @updated_at_ms
       )`).run({
			agent_id: record.agentId,
			package_kind: record.kind,
			package_source: record.source,
			package_ref: record.ref,
			package_version: record.version,
			package_integrity: record.integrity,
			schema_version: record.schemaVersion,
			claw_name: record.clawName,
			package_status: record.status,
			relationship: record.relationship,
			origin: record.origin,
			independent_owner: record.independentOwner ? 1 : 0,
			installed_at_ms: record.installedAtMs,
			updated_at_ms: record.updatedAtMs
		});
	}, options);
	return record;
}
function updateClawPackageRefStatus(ref, status, options = {}) {
	const nowMs = options.nowMs ?? Date.now();
	runOpenClawStateWriteTransaction(({ db }) => {
		db.prepare(`UPDATE claw_package_refs
          SET package_status = @package_status, updated_at_ms = @updated_at_ms
        WHERE agent_id = @agent_id
          AND package_kind = @package_kind
          AND package_source = @package_source
          AND package_ref = @package_ref
          AND package_version = @package_version
          AND package_integrity = @package_integrity`).run({
			agent_id: ref.agentId,
			package_kind: ref.kind,
			package_source: ref.source,
			package_ref: ref.ref,
			package_version: ref.version,
			package_integrity: ref.integrity,
			package_status: status,
			updated_at_ms: nowMs
		});
	}, options);
	return {
		...ref,
		status,
		updatedAtMs: nowMs
	};
}
function readClawPackageRefs(options = {}) {
	const database = openOpenClawStateDatabase(options);
	if (options.readOnly && !database.db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'claw_package_refs'").get()) return [];
	const conditions = [];
	const params = {};
	for (const [column, value] of [
		["agent_id", options.agentId],
		["package_kind", options.kind],
		["package_source", options.source],
		["package_ref", options.ref],
		["package_version", options.version],
		["package_integrity", options.integrity],
		["package_status", options.status]
	]) if (value !== void 0) {
		conditions.push(`${column} = @${column}`);
		params[column] = value;
	}
	const where = conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
	return database.db.prepare(`SELECT schema_version, agent_id, claw_name, package_kind, package_source,
              package_ref, package_version, package_integrity, package_status, relationship, origin,
              independent_owner,
              installed_at_ms,
              updated_at_ms
         FROM claw_package_refs${where}
        ORDER BY agent_id, package_kind, package_ref`).all(params).map(rowToPackageRef);
}
//#endregion
export { readClawInstallRecord as a, updateClawInstallRecord as c, persistClawPackageRef as i, updateClawInstallRecordStatus as l, deleteClawInstallRecord as n, readClawInstallRecords as o, persistClawInstallRecord as r, readClawPackageRefs as s, CLAW_PACKAGE_REF_SCHEMA_VERSION as t, updateClawPackageRefStatus as u };
