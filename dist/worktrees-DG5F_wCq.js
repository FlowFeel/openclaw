import { i as listAgentIds, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import "./agent-scope-DyEposw2.js";
import { t as ADMIN_SCOPE } from "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Da as validateWorktreesListParams, Ea as validateWorktreesGcParams, Oa as validateWorktreesRemoveParams, Ta as validateWorktreesCreateParams, ka as validateWorktreesRestoreParams, wa as validateWorktreesBranchesParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { c as resolveWorktreeCleanupLimits, o as WorktreeSnapshotError, s as managedWorktrees } from "./service-BBNHKAQG.js";
import { t as createManagedWorktreeOwnerProtection } from "./owner-protection-DHucJbGJ.js";
import fs from "node:fs";
import fs$1 from "node:fs/promises";
//#region src/gateway/server-methods/worktrees.ts
function invalidParams(respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "invalid worktrees parameters"));
}
function createWorktreesHandlers(service) {
	return {
		"worktrees.list": async ({ params, respond }) => {
			if (!validateWorktreesListParams(params)) {
				invalidParams(respond);
				return;
			}
			respond(true, { worktrees: await service.list() }, void 0);
		},
		"worktrees.create": async ({ params, respond }) => {
			if (!validateWorktreesCreateParams(params)) {
				invalidParams(respond);
				return;
			}
			respond(true, await service.create({
				repoRoot: params.repoRoot,
				name: params.name,
				baseRef: params.baseRef,
				ownerKind: "manual"
			}), void 0);
		},
		"worktrees.remove": async ({ params, respond }) => {
			if (!validateWorktreesRemoveParams(params)) {
				invalidParams(respond);
				return;
			}
			try {
				const result = await service.remove({
					id: params.id,
					reason: "manual-delete",
					force: params.force
				});
				respond(true, {
					removed: result.removed,
					...result.snapshotRef ? { snapshotRef: result.snapshotRef } : {},
					...result.snapshotError ? { snapshotError: result.snapshotError } : {}
				}, void 0);
			} catch (error) {
				if (error instanceof WorktreeSnapshotError) {
					respond(true, {
						removed: false,
						snapshotError: error.snapshotError
					}, void 0);
					return;
				}
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, String(error)));
			}
		},
		"worktrees.restore": async ({ params, respond }) => {
			if (!validateWorktreesRestoreParams(params)) {
				invalidParams(respond);
				return;
			}
			respond(true, await service.restore({ id: params.id }), void 0);
		},
		"worktrees.branches": async ({ params, respond, context, client }) => {
			if (!validateWorktreesBranchesParams(params)) {
				invalidParams(respond);
				return;
			}
			if (!(Array.isArray(client?.connect.scopes) ? client.connect.scopes : []).includes("operator.admin")) {
				const cfg = context.getRuntimeConfig();
				const requested = await fs$1.realpath(params.repoRoot).catch(() => null);
				if (!(requested !== null && listAgentIds(cfg).some((agentId) => {
					try {
						return fs.realpathSync(resolveAgentWorkspaceDir(cfg, agentId)) === requested;
					} catch {
						return false;
					}
				}))) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `worktrees.branches outside configured agent workspaces requires gateway scope: ${ADMIN_SCOPE}`));
					return;
				}
			}
			respond(true, params.includeRepositoryStatus ? await service.listRepositoryBranches(params.repoRoot, { includeRepositoryStatus: true }) : await service.listRepositoryBranches(params.repoRoot), void 0);
		},
		"worktrees.gc": async ({ params, respond, context }) => {
			if (!validateWorktreesGcParams(params)) {
				invalidParams(respond);
				return;
			}
			const cfg = context.getRuntimeConfig();
			const limits = resolveWorktreeCleanupLimits();
			respond(true, await service.gc({
				limits,
				shouldProtectOwner: createManagedWorktreeOwnerProtection(cfg)
			}), void 0);
		}
	};
}
const worktreesHandlers = createWorktreesHandlers(managedWorktrees);
//#endregion
export { worktreesHandlers };
