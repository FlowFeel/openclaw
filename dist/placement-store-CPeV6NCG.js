import { p as executeSqliteQuerySync } from "./node-sqlite-BJTPe7U8.js";
import { d as openOpenClawStateDatabase, h as runOpenClawStateWriteTransaction } from "./openclaw-state-db-BU55lNCH.js";
import { i as projectWorkspaceResultConflict } from "./workspace-conflicts-Vx0i_s3y.js";
import { _ as normalizeEpoch, a as hasWorkerWorkspacePendingResult, c as ensureLocal, d as getRequired, f as query, g as nextGeneration, h as assertRecordShape, i as createPlacementWorkspaceResultOps, l as find, m as canTransitionWorkerSessionPlacement, n as createPlacementTurnClaimOps, o as clearWorkerWorkspaceReconciliation, p as transitionValues, r as signalTurnClaimRelease, s as createPlacementWorkspaceJournalOps, u as fromRow, v as normalizeIdentity, y as required } from "./placement-turn-claims-BNwUEWk7.js";
import { randomUUID } from "node:crypto";
//#region src/gateway/worker-environments/placement-store.ts
function exactConflictPath(value) {
	if (typeof value !== "string" || value.length === 0) throw new Error("Worker placement conflict path is required");
	return value;
}
function updateTransition(db, current, to, patch, nowMs) {
	const values = transitionValues(current, to, patch, nowMs);
	if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", current.sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation).where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${current.sessionId} changed during transition`);
	return getRequired(db, current.sessionId);
}
function createWorkerSessionPlacementStore(options = {}) {
	const path = (options.database ?? openOpenClawStateDatabase()).path;
	const now = options.now ?? Date.now;
	const runtime = {
		path,
		instanceId: randomUUID(),
		now,
		read: () => openOpenClawStateDatabase({ path }).db,
		write: (operation) => runOpenClawStateWriteTransaction(({ db }) => operation(db), { path })
	};
	const { read, write } = runtime;
	const workspaceResultConflicts = /* @__PURE__ */ new Map();
	const withWorkspaceResultConflict = (record) => {
		if (!record) return;
		const conflict = workspaceResultConflicts.get(record.sessionId);
		return conflict ? {
			...record,
			workspaceResultConflict: conflict
		} : record;
	};
	const requireClaimOwner = (claim) => {
		const current = find(read(), required(claim.sessionId, "session id"));
		const persisted = current?.turnClaim;
		if (claim.owner.kind !== "worker" || current?.state !== "active" && current?.state !== "draining" || current.environmentId !== claim.owner.environmentId || current.activeOwnerEpoch !== claim.owner.ownerEpoch || persisted?.owner !== "worker" || persisted.claimId !== claim.claimId || persisted.runId !== claim.runId || persisted.generation !== claim.placementGeneration || persisted.ownerEpoch !== claim.owner.ownerEpoch) throw new Error(`Session ${claim.sessionId} workspace result conflict owner changed`);
	};
	return {
		...createPlacementTurnClaimOps(runtime),
		...createPlacementWorkspaceJournalOps(runtime),
		...createPlacementWorkspaceResultOps(runtime),
		get(sessionId) {
			return withWorkspaceResultConflict(find(read(), required(sessionId, "session id")));
		},
		getMany(sessionIds) {
			const normalizedIds = [...new Set(sessionIds.map((sessionId) => required(sessionId, "session id")))];
			const records = /* @__PURE__ */ new Map();
			const db = read();
			for (let offset = 0; offset < normalizedIds.length; offset += 250) {
				const chunk = normalizedIds.slice(offset, offset + 250);
				for (const row of executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().where("session_id", "in", chunk)).rows) {
					const record = fromRow(row);
					records.set(record.sessionId, withWorkspaceResultConflict(record));
				}
			}
			return records;
		},
		recordWorkspaceResultConflict(claim, conflict) {
			requireClaimOwner(claim);
			if (!conflict) {
				workspaceResultConflicts.delete(claim.sessionId);
				return;
			}
			const paths = conflict.paths.map(exactConflictPath);
			const stagedResultRef = required(conflict.stagedResultRef, "staged result ref");
			if (paths.length === 0 || !/^refs\/openclaw\/worker-results\/[A-Za-z0-9-]+$/u.test(stagedResultRef)) throw new Error("Cloud workspace result conflict projection is invalid");
			workspaceResultConflicts.set(claim.sessionId, projectWorkspaceResultConflict(paths, stagedResultRef, conflict.totalCount));
		},
		startDispatch(input) {
			const identity = normalizeIdentity(input);
			return write((db) => {
				const current = ensureLocal(db, identity, now());
				if (current.state !== "local" && current.state !== "reclaimed") throw new Error(`Cannot dispatch session ${identity.sessionId} from placement ${current.state}`);
				const updatedAtMs = now();
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set({
					state: "requested",
					environment_id: null,
					transition_generation: nextGeneration(current.generation),
					active_owner_epoch: null,
					workspace_base_manifest_ref: null,
					remote_workspace_dir: null,
					worker_bundle_hash: null,
					last_transcript_ack_cursor: null,
					last_live_event_ack_cursor: null,
					recovery_error: null,
					updated_at_ms: updatedAtMs,
					state_changed_at_ms: updatedAtMs
				}).where("session_id", "=", current.sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Session ${identity.sessionId} placement changed during dispatch barrier`);
				return getRequired(db, identity.sessionId);
			});
		},
		transition(input) {
			if (!canTransitionWorkerSessionPlacement(input.from, input.to)) throw new Error(`Illegal worker session placement transition: ${input.from} -> ${input.to}`);
			if (input.from === "draining" && input.to === "reconciling") throw new Error("Use startReconcile after fencing the drained worker environment");
			const sessionId = required(input.sessionId, "session id");
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== input.from || current.generation !== input.expectedGeneration) throw new Error(`Worker session placement ${sessionId} changed: expected ${input.from}@${input.expectedGeneration}, found ${current.state}@${current.generation}`);
				if (current.turnClaim) throw new Error(`Cannot transition session ${sessionId} during an active turn`);
				return updateTransition(db, current, input.to, input.patch ?? {}, now());
			});
		},
		startDrain(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== "active" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch) throw new Error(`Cannot drain stale worker placement for session ${sessionId}`);
				if (hasWorkerWorkspacePendingResult(db, sessionId)) throw new Error(`Cannot drain session ${sessionId} with a pending cloud workspace result`);
				const values = transitionValues(current, "draining", input.workspaceBaseManifestRef === void 0 ? {} : { workspaceBaseManifestRef: input.workspaceBaseManifestRef }, now());
				const turnClaim = current.turnClaim;
				if (turnClaim) {
					values.turn_claim_owner = turnClaim.owner;
					values.turn_claim_id = turnClaim.claimId;
					values.turn_claim_run_id = turnClaim.runId;
					values.turn_claim_generation = turnClaim.generation;
					values.turn_claim_owner_epoch = turnClaim.ownerEpoch;
				}
				assertRecordShape({
					state: "draining",
					environmentId,
					activeOwnerEpoch: ownerEpoch,
					workspaceBaseManifestRef: values.workspace_base_manifest_ref,
					remoteWorkspaceDir: values.remote_workspace_dir,
					workerBundleHash: values.worker_bundle_hash,
					lastTranscriptAckCursor: values.last_transcript_ack_cursor,
					lastLiveEventAckCursor: values.last_live_event_ack_cursor,
					recoveryError: values.recovery_error,
					turnClaim
				});
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", sessionId).where("state", "=", "active").where("transition_generation", "=", current.generation).where("environment_id", "=", environmentId).where("active_owner_epoch", "=", ownerEpoch)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during drain`);
				if (input.workspaceBaseManifestRef !== void 0) clearWorkerWorkspaceReconciliation(db, sessionId, input.workspaceBaseManifestRef);
				return getRequired(db, sessionId);
			});
		},
		finishReclaim(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			return write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== "active" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch || current.turnClaim !== null || hasWorkerWorkspacePendingResult(db, sessionId)) throw new Error(`Cannot finish stale worker reclaim for session ${sessionId}`);
				return updateTransition(db, current, "reclaimed", {}, now());
			});
		},
		startReconcile(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			const outcome = write((db) => {
				const current = getRequired(db, sessionId);
				if (current.state !== "draining" || current.generation !== input.expectedGeneration || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch) throw new Error(`Cannot reconcile stale worker placement for session ${sessionId}`);
				if (hasWorkerWorkspacePendingResult(db, sessionId)) throw new Error(`Cannot reconcile session ${sessionId} with a pending cloud workspace result`);
				const releasedClaim = current.turnClaim !== null;
				const values = transitionValues(current, "reconciling", {}, now());
				const update = query(db).updateTable("worker_session_placements").set(values).where("session_id", "=", sessionId).where("state", "=", "draining").where("transition_generation", "=", current.generation).where("environment_id", "=", environmentId).where("active_owner_epoch", "=", ownerEpoch);
				if (executeSqliteQuerySync(db, current.turnClaim ? update.where("turn_claim_owner", "=", "worker").where("turn_claim_id", "=", current.turnClaim.claimId).where("turn_claim_run_id", "=", current.turnClaim.runId).where("turn_claim_generation", "=", current.turnClaim.generation).where("turn_claim_owner_epoch", "=", current.turnClaim.ownerEpoch) : update.where("turn_claim_owner", "is", null)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during reconcile`);
				return {
					record: getRequired(db, sessionId),
					releasedClaim
				};
			});
			if (outcome.releasedClaim) signalTurnClaimRelease(path, sessionId);
			return outcome.record;
		},
		validateWorkerOwner(input) {
			const current = find(read(), required(input.sessionId, "session id"));
			return current?.state === "active" && current.environmentId === required(input.environmentId, "environment id") && current.activeOwnerEpoch === normalizeEpoch(input.ownerEpoch, "active owner epoch");
		},
		fail(input) {
			const sessionId = required(input.sessionId, "session id");
			const recoveryError = required(input.recoveryError, "recovery error");
			const outcome = write((db) => {
				const current = getRequired(db, sessionId);
				if (input.expectedGeneration !== void 0 && current.generation !== input.expectedGeneration) throw new Error(`Worker session placement ${sessionId} changed before failure`);
				if (current.state === "failed") {
					if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set({
						recovery_error: recoveryError,
						updated_at_ms: now()
					}).where("session_id", "=", sessionId).where("state", "=", "failed").where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during failure update`);
					return {
						record: getRequired(db, sessionId),
						releasedClaim: false
					};
				}
				if (!canTransitionWorkerSessionPlacement(current.state, "failed")) throw new Error(`Cannot fail worker session placement from ${current.state}`);
				const localClaim = current.turnClaim?.owner === "local" ? current.turnClaim : null;
				const updatedAtMs = now();
				if (executeSqliteQuerySync(db, query(db).updateTable("worker_session_placements").set({
					state: "failed",
					transition_generation: nextGeneration(current.generation),
					recovery_error: recoveryError,
					turn_claim_owner: localClaim ? "local" : null,
					turn_claim_id: localClaim?.claimId ?? null,
					turn_claim_run_id: localClaim?.runId ?? null,
					turn_claim_generation: localClaim?.generation ?? null,
					turn_claim_owner_epoch: null,
					updated_at_ms: updatedAtMs,
					state_changed_at_ms: updatedAtMs
				}).where("session_id", "=", sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Worker session placement ${sessionId} changed during failure`);
				return {
					record: getRequired(db, sessionId),
					releasedClaim: current.turnClaim?.owner === "worker"
				};
			});
			if (outcome.releasedClaim) signalTurnClaimRelease(path, sessionId);
			return outcome.record;
		},
		adoptActive(input) {
			const sessionId = required(input.sessionId, "session id");
			const environmentId = required(input.environmentId, "environment id");
			const ownerEpoch = normalizeEpoch(input.ownerEpoch, "active owner epoch");
			const current = getRequired(read(), sessionId);
			if (current.state !== "active" || current.environmentId !== environmentId || current.activeOwnerEpoch !== ownerEpoch || input.expectedGeneration !== void 0 && current.generation !== input.expectedGeneration) throw new Error(`Cannot adopt stale worker placement for session ${sessionId}`);
			return current;
		},
		listForReconcile() {
			const db = read();
			return executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().where("state", "not in", ["local", "reclaimed"]).orderBy("updated_at_ms").orderBy("session_id")).rows.map((row) => withWorkspaceResultConflict(fromRow(row)));
		},
		list() {
			const db = read();
			return executeSqliteQuerySync(db, query(db).selectFrom("worker_session_placements").selectAll().orderBy("session_id")).rows.map((row) => withWorkspaceResultConflict(fromRow(row)));
		}
	};
}
//#endregion
export { createWorkerSessionPlacementStore };
