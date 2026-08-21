import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import { r as root } from "./fs-safe-DVaClkIX.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import "./utils-Bs67j6-3.js";
import { c as resolveAgentDir, m as toAgentEntriesRecord, n as listAgentEntries, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./agent-scope-DyEposw2.js";
import { a as transformConfigFileWithRetry, o as withConfigMutationExclusive } from "./mutate-j69oSRi2.js";
import "./config-UtpOr1Uw.js";
import { s as readAgentDeletionJournal } from "./agent-deletion-journal-BsLbvn0x.js";
import { c as resolveSessionTranscriptsDirForAgent } from "./paths-DSnYpBD3.js";
import { r as isReservedSystemAgentId } from "./agent-id-D7-xzIog.js";
import { i as DEFAULT_IDENTITY_FILENAME, p as ensureAgentWorkspace } from "./workspace-CelKqYGr.js";
import { i as claimCompletedAgentDeletion } from "./agent-lifecycle-registry-BngfIWZE.js";
import { a as mergeIdentityMarkdownContent, s as sanitizeAgentIdentityLine, t as createAgentIdentityConfig } from "./identity-file-BK_ovJjN.js";
import { r as parseBindingSpecs, t as applyAgentBindings } from "./agents.bindings-BmuS4uWQ.js";
import { r as findAgentEntryIndex, t as applyAgentConfig } from "./agents.config-DbZD5Wjd.js";
import fs from "node:fs/promises";
//#region src/agents/agent-create.ts
const RESERVED_BOOTSTRAP_AGENT_ID = "main";
var DuplicateAgentError = class extends Error {};
var DefaultAgentConflictError = class extends Error {};
var InvalidAgentBindingsError = class extends Error {};
function createError(reason, message, agentId) {
	return {
		status: "error",
		reason,
		message,
		...agentId ? { agentId } : {}
	};
}
/** True when raw user input contains a character that can survive agent-id normalization. */
function hasValidRawAgentIdCharacters(value) {
	return /[a-z0-9]/iu.test(value);
}
function isInjectedBootstrapMainEntry(entry) {
	return entry?.id === RESERVED_BOOTSTRAP_AGENT_ID && entry.default === true && Object.keys(entry).every((key) => key === "id" || key === "default");
}
async function writeIdentityFile(params) {
	const workspaceRoot = await root(params.workspaceDir);
	let existing;
	try {
		existing = (await workspaceRoot.read(DEFAULT_IDENTITY_FILENAME, {
			hardlinks: "reject",
			nonBlockingRead: true
		})).buffer.toString("utf-8");
	} catch (error) {
		if (!(error instanceof FsSafeError && error.code === "not-found")) throw error;
	}
	const content = mergeIdentityMarkdownContent(existing, params.identity);
	await workspaceRoot.write(DEFAULT_IDENTITY_FILENAME, content, { encoding: "utf8" });
}
async function createAgent(params) {
	const rawName = (params.entry?.name?.trim() || params.entry?.id || params.name || "").trim();
	if (!rawName) return createError("invalid-name", "agent name is required");
	const rawId = params.entry?.id ?? rawName;
	if (!hasValidRawAgentIdCharacters(rawId)) return createError("invalid-name", `agent name "${rawName}" has no valid id characters`);
	const agentId = normalizeAgentId(rawId);
	const isBootstrapMain = agentId === RESERVED_BOOTSTRAP_AGENT_ID && params.entry?.default === true;
	if (!isBootstrapMain && agentId === RESERVED_BOOTSTRAP_AGENT_ID || isReservedSystemAgentId(agentId)) return createError("reserved-id", `"${agentId}" is reserved`, agentId);
	const safeName = sanitizeAgentIdentityLine(rawName);
	const model = normalizeOptionalString(params.model);
	const identity = params.entry?.identity ?? createAgentIdentityConfig({
		name: safeName,
		emoji: params.emoji,
		avatar: params.avatar
	}) ?? { name: safeName };
	const requestedWorkspace = params.entry?.workspace ?? params.workspace;
	const explicitWorkspace = requestedWorkspace?.trim() ? resolveUserPath(requestedWorkspace.trim()) : void 0;
	const requestedAgentDir = params.entry?.agentDir ?? params.agentDir;
	const explicitAgentDir = requestedAgentDir?.trim() ? resolveUserPath(requestedAgentDir.trim()) : void 0;
	const transformConfig = params.transformConfig ?? transformConfigFileWithRetry;
	try {
		return await withConfigMutationExclusive(async (lockedConfig) => {
			const deletion = readAgentDeletionJournal(agentId);
			if (deletion && !deletion.cleanupCompleted) return createError("deletion-pending", `agent "${agentId}" deletion cleanup is still pending`, agentId);
			let tombstoneClaimed = false;
			if (deletion?.cleanupCompleted && findAgentEntryIndex(listAgentEntries(lockedConfig), agentId) >= 0) {
				if (!claimCompletedAgentDeletion(agentId, deletion.operationId)) throw new Error(`agent "${agentId}" deletion tombstone changed during creation`);
				tombstoneClaimed = true;
			}
			const committed = await transformConfig({
				afterWrite: { mode: "auto" },
				maxAttempts: 1,
				transform: async (currentConfig, context) => {
					const currentEntries = listAgentEntries(currentConfig);
					const existingIndex = findAgentEntryIndex(currentEntries, agentId);
					const existingEntry = currentEntries[existingIndex];
					const currentDefaults = currentEntries.filter((entry) => entry.default === true);
					const stagedDefaultMatchesCurrent = existingEntry?.default === true && currentDefaults.length === 1;
					if (params.entry?.default === true && currentEntries.length > 0 && !stagedDefaultMatchesCurrent) throw new DefaultAgentConflictError();
					if (existingIndex >= 0 && !isBootstrapMain) throw new DuplicateAgentError();
					if (existingIndex >= 0 && isBootstrapMain && (!isInjectedBootstrapMainEntry(existingEntry) || context.snapshot.exists)) return {
						nextConfig: currentConfig,
						result: {
							status: "existing",
							agentId,
							name: existingEntry?.name ?? safeName,
							workspace: resolveAgentWorkspaceDir(currentConfig, agentId),
							agentDir: resolveAgentDir(currentConfig, agentId),
							bootstrapPending: false
						}
					};
					const workspaceDir = explicitWorkspace ?? resolveAgentWorkspaceDir(currentConfig, agentId);
					const agentDir = explicitAgentDir ?? resolveAgentDir(currentConfig, agentId);
					const materializeInjectedMain = existingIndex >= 0 && isBootstrapMain && isInjectedBootstrapMainEntry(existingEntry) && !context.snapshot.exists;
					let nextConfig = existingIndex < 0 || materializeInjectedMain ? applyAgentConfig(currentConfig, {
						agentId,
						name: safeName,
						workspace: workspaceDir,
						agentDir,
						model,
						identity
					}) : currentConfig;
					if (params.entry) {
						const list = listAgentEntries(nextConfig);
						const index = findAgentEntryIndex(list, agentId);
						list[index] = {
							...list[index],
							...params.entry,
							id: agentId,
							name: safeName,
							workspace: workspaceDir,
							agentDir,
							identity,
							...list.length === 1 ? { default: true } : {}
						};
						const { list: _legacyList, ...agentsConfig } = nextConfig.agents ?? {};
						nextConfig = {
							...nextConfig,
							agents: {
								...agentsConfig,
								entries: toAgentEntriesRecord(list)
							}
						};
					}
					const bindingParse = parseBindingSpecs({
						agentId,
						specs: params.bindingSpecs,
						config: nextConfig
					});
					if (bindingParse.errors.length > 0) throw new InvalidAgentBindingsError(bindingParse.errors.join("\n"));
					const bindingResult = bindingParse.bindings.length ? applyAgentBindings(nextConfig, bindingParse.bindings) : void 0;
					nextConfig = bindingResult?.config ?? nextConfig;
					const workspace = await ensureAgentWorkspace({
						dir: workspaceDir,
						ensureBootstrapFiles: params.skipBootstrap === void 0 ? !nextConfig.agents?.defaults?.skipBootstrap : !params.skipBootstrap,
						skipOptionalBootstrapFiles: params.skipOptionalBootstrapFiles ?? nextConfig.agents?.defaults?.skipOptionalBootstrapFiles
					});
					if (workspace.dir !== workspaceDir) {
						const entries = listAgentEntries(nextConfig);
						const entryIndex = findAgentEntryIndex(entries, agentId);
						const currentEntry = entries[entryIndex];
						if (entryIndex >= 0 && currentEntry) {
							entries[entryIndex] = {
								...currentEntry,
								id: agentId,
								workspace: workspace.dir
							};
							const { list: _legacyList, ...agentsConfig } = nextConfig.agents ?? {};
							nextConfig = {
								...nextConfig,
								agents: {
									...agentsConfig,
									entries: toAgentEntriesRecord(entries)
								}
							};
						}
					}
					await fs.mkdir(resolveSessionTranscriptsDirForAgent(agentId), { recursive: true });
					if (!workspace.bootstrapPending) await writeIdentityFile({
						workspaceDir: workspace.dir,
						identity
					});
					return {
						nextConfig,
						result: {
							status: existingIndex >= 0 ? "existing" : "created",
							agentId,
							name: safeName,
							workspace: workspace.dir,
							agentDir,
							...model ? { model } : {},
							bootstrapPending: workspace.bootstrapPending === true,
							...bindingResult ? { bindingResult } : {}
						}
					};
				}
			});
			if (deletion?.cleanupCompleted && !tombstoneClaimed && committed.result?.status === "created" && !claimCompletedAgentDeletion(agentId, deletion.operationId)) throw new Error(`agent "${agentId}" deletion tombstone changed during creation`);
			return committed.result;
		});
	} catch (error) {
		if (error instanceof DuplicateAgentError) return createError("already-exists", `agent "${agentId}" already exists`, agentId);
		if (error instanceof DefaultAgentConflictError) return createError("default-conflict", `Cannot create agent "${agentId}" with default=true while a roster already exists. Reassign the default separately.`, agentId);
		if (error instanceof InvalidAgentBindingsError) return createError("invalid-bindings", error.message, agentId);
		if (error instanceof FsSafeError) return createError("unsafe-identity-file", `unsafe workspace file "${DEFAULT_IDENTITY_FILENAME}"`, agentId);
		throw error;
	}
}
//#endregion
export { createAgent as t };
