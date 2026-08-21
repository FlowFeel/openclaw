import { h as getNodeSqliteKysely, m as executeSqliteQueryTakeFirstSync, p as executeSqliteQuerySync } from "./node-sqlite-B_0DgpUE.js";
import { a as sha256Hex } from "./crypto-digest-CmUwt1S-.js";
import { d as tryParsePersistedExecApprovals, o as normalizeExecApprovalsInternal } from "./exec-approvals-config-DrfE-I9X.js";
//#region src/infra/exec-approvals-sqlite.ts
const EXEC_APPROVALS_CONFIG_KEY = "current";
const EXEC_APPROVALS_MUTATION_LEASE_SCOPE = "exec-approvals";
const EXEC_APPROVALS_MUTATION_LEASE_KEY = "mutation";
var ExecApprovalsMutationFencedError = class extends Error {
	constructor() {
		super("Exec approvals cannot be changed while agent deletion is in progress; retry.");
		this.name = "ExecApprovalsMutationFencedError";
	}
};
function assertExecApprovalsMutationAllowed(params) {
	if (params.leaseOwner) {
		params.leaseOwner.assertOwnedInTransaction(params.db);
		return;
	}
	if (executeSqliteQueryTakeFirstSync(params.db, getNodeSqliteKysely(params.db).selectFrom("state_leases").select("owner").where("scope", "=", "exec-approvals").where("lease_key", "=", "mutation").where("expires_at", ">", params.now ?? Date.now()))) throw new ExecApprovalsMutationFencedError();
}
function hashExecApprovalsRaw(raw) {
	return raw === null ? `missing:${sha256Hex("")}` : sha256Hex(raw);
}
function serializeExecApprovals(file) {
	return `${JSON.stringify(file, null, 2)}\n`;
}
function readExecApprovalsConfigRow(db) {
	return executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("exec_approvals_config").select("raw_json").where("config_key", "=", EXEC_APPROVALS_CONFIG_KEY));
}
function snapshotFromExecApprovalsRow(params) {
	const raw = params.row?.raw_json ?? null;
	if (raw === null) return {
		path: params.path,
		exists: false,
		raw: null,
		file: normalizeExecApprovalsInternal({
			version: 1,
			agents: {}
		}),
		hash: hashExecApprovalsRaw(null)
	};
	const parsed = tryParsePersistedExecApprovals(raw);
	if (!parsed) params.onMalformed?.();
	return {
		path: params.path,
		exists: true,
		raw,
		file: parsed ?? normalizeExecApprovalsInternal({
			version: 1,
			defaults: {
				security: "deny",
				ask: "off",
				askFallback: "deny",
				autoAllowSkills: false
			},
			agents: {}
		}),
		hash: hashExecApprovalsRaw(raw)
	};
}
function projectionValues(file) {
	const normalized = normalizeExecApprovalsInternal(file);
	const agents = Object.values(normalized.agents ?? {});
	return {
		socket_path: normalized.socket?.path ?? null,
		has_socket_token: normalized.socket?.token ? 1 : 0,
		default_security: normalized.defaults?.security ?? null,
		default_ask: normalized.defaults?.ask ?? null,
		default_ask_fallback: normalized.defaults?.askFallback ?? null,
		auto_allow_skills: normalized.defaults?.autoAllowSkills === void 0 ? null : normalized.defaults.autoAllowSkills ? 1 : 0,
		agent_count: agents.length,
		allowlist_count: agents.reduce((total, agent) => total + (agent.allowlist?.length ?? 0), 0)
	};
}
function writeExecApprovalsConfigRow(params) {
	assertExecApprovalsMutationAllowed({
		db: params.db,
		leaseOwner: params.leaseOwner
	});
	const raw = params.raw ?? serializeExecApprovals(params.file);
	const values = {
		config_key: EXEC_APPROVALS_CONFIG_KEY,
		raw_json: raw,
		...projectionValues(params.file),
		updated_at_ms: params.now ?? Date.now()
	};
	executeSqliteQuerySync(params.db, getNodeSqliteKysely(params.db).insertInto("exec_approvals_config").values(values).onConflict((conflict) => conflict.column("config_key").doUpdateSet({
		raw_json: values.raw_json,
		socket_path: values.socket_path,
		has_socket_token: values.has_socket_token,
		default_security: values.default_security,
		default_ask: values.default_ask,
		default_ask_fallback: values.default_ask_fallback,
		auto_allow_skills: values.auto_allow_skills,
		agent_count: values.agent_count,
		allowlist_count: values.allowlist_count,
		updated_at_ms: values.updated_at_ms
	})));
}
function deleteExecApprovalsConfigRow(db, leaseOwner) {
	assertExecApprovalsMutationAllowed({
		db,
		leaseOwner
	});
	executeSqliteQuerySync(db, getNodeSqliteKysely(db).deleteFrom("exec_approvals_config").where("config_key", "=", EXEC_APPROVALS_CONFIG_KEY));
}
//#endregion
export { readExecApprovalsConfigRow as a, writeExecApprovalsConfigRow as c, projectionValues as i, EXEC_APPROVALS_MUTATION_LEASE_SCOPE as n, serializeExecApprovals as o, deleteExecApprovalsConfigRow as r, snapshotFromExecApprovalsRow as s, EXEC_APPROVALS_MUTATION_LEASE_KEY as t };
