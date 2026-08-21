import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { a as writeRuntimeJson, r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { c as resolveAgentDir, f as resolveDefaultAgentId, n as listAgentEntries, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./session-key-DtTE9-Tg.js";
import "./agent-scope-DyEposw2.js";
import { c as resolveAuthProfileDatabasePath } from "./sqlite-Dtmuz_Ar.js";
import { a as loadPersistedAuthProfileStore } from "./persisted-YZpzzn3_.js";
import { i as ensureAuthProfileStore, v as saveAuthProfileStore } from "./store-BWT5kQzj.js";
import { r as isReservedSystemAgentId } from "./agent-id-D7-xzIog.js";
import { t as buildPortableAuthProfileStoreForAgentCopy } from "./auth-profiles-67bIpdG9.js";
import { n as ensureOnboardingAgentWorkspace, r as resolveOnboardingAgentTarget } from "./onboard-agent-target-enCiwOCS.js";
import { t as describeBinding } from "./agents.binding-format-C3S9Mq5U.js";
import { n as buildChannelBindings, t as applyAgentBindings } from "./agents.bindings-DILqpWR6.js";
import { t as applyAgentConfig } from "./agents.config-Dw2VBnkX.js";
import { t as createAgent } from "./agent-create-D_QgN2Cx.js";
import { t as WizardCancelledError } from "./prompts-B0iOB1_a.js";
import { t as createClackPrompter } from "./clack-prompter-DgXODT7h.js";
import { r as logConfigUpdated } from "./logging-ClQ5051I.js";
import { s as transformConfigWithPendingPluginInstalls, t as commitConfigWithPendingPluginInstalls } from "./install-record-commit-BuloUnQI.js";
import { r as requireValidConfigFileSnapshot } from "./agents.command-shared-B1IX9Da_.js";
import { n as promptAuthChoiceGrouped } from "./auth-choice-prompt-Cc-hNnPy.js";
import { i as applyAuthChoice, r as warnIfModelConfigLooksOff } from "./auth-choice-Chfb6I7-.js";
import { i as setupChannels } from "./onboard-channels-D9Yn76ak.js";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/commands/agents.commands.add.ts
function emptyBindingResult(config) {
	return {
		config,
		added: [],
		updated: [],
		skipped: [],
		conflicts: []
	};
}
function formatSkippedOAuthProfilesMessage(params) {
	return params.sourceIsInheritedMain ? `OAuth profiles stay shared from "${params.sourceAgentId}" unless this agent signs in separately.` : `OAuth profiles were not copied from "${params.sourceAgentId}"; sign in separately for this agent.`;
}
/** Create or update an agent through the non-interactive path or guided wizard. */
async function agentsAddCommand(opts, runtime = defaultRuntime, params) {
	const configSnapshot = await requireValidConfigFileSnapshot(runtime);
	if (!configSnapshot) return;
	const cfg = configSnapshot.sourceConfig ?? configSnapshot.config;
	const baseHash = configSnapshot.hash;
	const workspaceFlag = opts.workspace?.trim();
	const nameInput = opts.name?.trim();
	const hasFlags = params?.hasFlags === true;
	if (opts.nonInteractive === true || hasFlags) {
		if (!workspaceFlag) {
			runtime.error(`Non-interactive agent creation requires --workspace. Re-run ${formatCliCommand("openclaw agents add <id> --workspace <path>")} or omit flags to use the wizard.`);
			runtime.exit(1);
			return;
		}
		if (!nameInput) {
			runtime.error(`Agent name is required in non-interactive mode. Run ${formatCliCommand("openclaw agents add <id> --workspace <path>")}.`);
			runtime.exit(1);
			return;
		}
		const agentId = normalizeAgentId(nameInput);
		if (agentId !== nameInput) runtime.log(`Normalized agent id to "${agentId}".`);
		const created = await createAgent({
			name: nameInput,
			workspace: workspaceFlag,
			...opts.agentDir ? { agentDir: opts.agentDir } : {},
			...opts.model ? { model: opts.model } : {},
			...opts.bind?.length ? { bindingSpecs: opts.bind } : {},
			transformConfig: transformConfigWithPendingPluginInstalls
		});
		if (created.status === "error") {
			runtime.error(created.reason === "reserved-id" ? `"${created.agentId}" is reserved. Choose another name, or run ${formatCliCommand("openclaw agents list")} to inspect configured agents.` : created.reason === "already-exists" ? `Agent "${created.agentId}" already exists.` : created.message);
			runtime.exit(1);
			return;
		}
		const bindingResult = created.bindingResult ?? emptyBindingResult(cfg);
		if (!opts.json) logConfigUpdated(runtime);
		const payload = {
			agentId: created.agentId,
			name: created.name,
			workspace: created.workspace,
			agentDir: created.agentDir,
			model: created.model,
			bindings: {
				added: bindingResult.added.map(describeBinding),
				updated: bindingResult.updated.map(describeBinding),
				skipped: bindingResult.skipped.map(describeBinding),
				conflicts: bindingResult.conflicts.map((conflict) => `${describeBinding(conflict.binding)} (agent=${conflict.existingAgentId})`)
			}
		};
		if (opts.json) writeRuntimeJson(runtime, payload);
		else {
			runtime.log(`Agent: ${agentId}`);
			runtime.log(`Workspace: ${shortenHomePath(created.workspace)}`);
			runtime.log(`Agent dir: ${shortenHomePath(created.agentDir)}`);
			if (created.model) runtime.log(`Model: ${created.model}`);
			if (bindingResult.conflicts.length > 0) runtime.error(["Skipped bindings already claimed by another agent:", ...bindingResult.conflicts.map((conflict) => `- ${describeBinding(conflict.binding)} (agent=${conflict.existingAgentId})`)].join("\n"));
		}
		return;
	}
	const prompter = createClackPrompter();
	try {
		await prompter.intro("Add OpenClaw agent");
		const agentName = normalizeOptionalString(nameInput ?? await prompter.text({
			message: "Agent name",
			validate: (value) => {
				if (!value?.trim()) return "Required";
				const normalized = normalizeAgentId(value);
				if (normalized === "main" || isReservedSystemAgentId(normalized)) return `"${normalized}" is reserved. Choose another name.`;
			}
		})) ?? "";
		const agentId = normalizeAgentId(agentName);
		if (agentId === "main" || isReservedSystemAgentId(agentId)) {
			await prompter.outro(`"${agentId}" is reserved. Choose another name.`);
			return;
		}
		if (agentName !== agentId) await prompter.note(`Normalized id to "${agentId}".`, "Agent id");
		if (listAgentEntries(cfg).find((agent) => normalizeAgentId(agent.id) === agentId)) {
			if (!await prompter.confirm({
				message: `Agent "${agentId}" already exists. Update it?`,
				initialValue: false
			})) {
				await prompter.outro("No changes made.");
				return;
			}
		}
		const workspaceDefault = resolveAgentWorkspaceDir(cfg, agentId);
		const workspaceDir = resolveUserPath(normalizeOptionalString(await prompter.text({
			message: "Workspace directory",
			initialValue: workspaceDefault,
			validate: (value) => value?.trim() ? void 0 : "Required"
		})) || workspaceDefault);
		const agentDir = resolveAgentDir(cfg, agentId);
		let nextConfig = applyAgentConfig(cfg, {
			agentId,
			name: agentName,
			workspace: workspaceDir,
			agentDir
		});
		const defaultAgentId = resolveDefaultAgentId(cfg);
		if (defaultAgentId !== agentId) {
			const sourceAgentDir = resolveAgentDir(cfg, defaultAgentId);
			const sourceAuthPath = resolveAuthProfileDatabasePath(sourceAgentDir);
			const destAuthPath = resolveAuthProfileDatabasePath(agentDir);
			const mainAuthPath = resolveAuthProfileDatabasePath();
			const sameAuthPath = normalizeLowercaseStringOrEmpty(path.resolve(sourceAuthPath)) === normalizeLowercaseStringOrEmpty(path.resolve(destAuthPath));
			const sourceIsInheritedMain = normalizeLowercaseStringOrEmpty(path.resolve(sourceAuthPath)) === normalizeLowercaseStringOrEmpty(path.resolve(mainAuthPath));
			if (!sameAuthPath) {
				const sourceStore = loadPersistedAuthProfileStore(sourceAgentDir);
				const destStore = loadPersistedAuthProfileStore(agentDir);
				const portable = sourceStore ? buildPortableAuthProfileStoreForAgentCopy(sourceStore) : void 0;
				if (portable && portable.copiedProfileIds.length > 0 && Object.keys(destStore?.profiles ?? {}).length === 0) {
					if (await prompter.confirm({
						message: `Copy portable auth profiles from "${defaultAgentId}"?`,
						initialValue: false
					})) {
						await fs.mkdir(agentDir, { recursive: true });
						saveAuthProfileStore(portable.store, agentDir, {
							filterExternalAuthProfiles: false,
							syncExternalCli: false
						});
						const skippedText = portable.skippedProfileIds.length > 0 ? ` ${formatSkippedOAuthProfilesMessage({
							sourceAgentId: defaultAgentId,
							sourceIsInheritedMain
						})}` : "";
						await prompter.note(`Copied ${portable.copiedProfileIds.length} portable auth profile${portable.copiedProfileIds.length === 1 ? "" : "s"} from "${defaultAgentId}".${skippedText}`, "Auth profiles");
					}
				} else if ((portable?.skippedProfileIds.length ?? 0) > 0) await prompter.note(formatSkippedOAuthProfilesMessage({
					sourceAgentId: defaultAgentId,
					sourceIsInheritedMain
				}), "Auth profiles");
			}
		}
		if (await prompter.confirm({
			message: "Configure model/auth for this agent now?",
			initialValue: false
		})) {
			const authStore = ensureAuthProfileStore(agentDir, { allowKeychainPrompt: false });
			while (true) {
				const authResult = await applyAuthChoice({
					authChoice: await promptAuthChoiceGrouped({
						prompter,
						store: authStore,
						includeSkip: true,
						config: nextConfig
					}),
					config: nextConfig,
					prompter,
					runtime,
					agentDir,
					setDefaultModel: false,
					agentId
				});
				nextConfig = authResult.config;
				if (authResult.retrySelection) continue;
				if (authResult.agentModelOverride) nextConfig = applyAgentConfig(nextConfig, {
					agentId,
					model: authResult.agentModelOverride
				});
				break;
			}
		}
		await warnIfModelConfigLooksOff(nextConfig, prompter, {
			agentId,
			agentDir,
			validateCatalog: false
		});
		let selection = [];
		const channelAccountIds = {};
		nextConfig = await setupChannels(nextConfig, runtime, prompter, {
			allowIMessageInstall: true,
			allowSignalInstall: true,
			onSelection: (value) => {
				selection = value;
			},
			promptAccountIds: true,
			onAccountId: (channel, accountId) => {
				channelAccountIds[channel] = accountId;
			}
		});
		if (selection.length > 0) if (await prompter.confirm({
			message: "Route selected channels to this agent now? (bindings)",
			initialValue: false
		})) {
			const desiredBindings = buildChannelBindings({
				agentId,
				selection,
				config: nextConfig,
				accountIds: channelAccountIds
			});
			const result = applyAgentBindings(nextConfig, desiredBindings);
			nextConfig = result.config;
			if (result.conflicts.length > 0) await prompter.note(["Skipped bindings already claimed by another agent:", ...result.conflicts.map((conflict) => `- ${describeBinding(conflict.binding)} (agent=${conflict.existingAgentId})`)].join("\n"), "Routing bindings");
		} else await prompter.note(["Routing unchanged. Add bindings when you're ready.", "Docs: https://docs.openclaw.ai/concepts/multi-agent"].join("\n"), "Routing");
		nextConfig = (await commitConfigWithPendingPluginInstalls({
			nextConfig,
			...baseHash !== void 0 ? { baseHash } : {}
		})).config;
		logConfigUpdated(runtime);
		const target = resolveOnboardingAgentTarget(nextConfig, agentId);
		await ensureOnboardingAgentWorkspace(target, runtime, {
			skipBootstrap: Boolean(nextConfig.agents?.defaults?.skipBootstrap),
			skipOptionalBootstrapFiles: nextConfig.agents?.defaults?.skipOptionalBootstrapFiles
		});
		const payload = {
			agentId: target.agentId,
			name: agentName,
			workspace: target.workspaceDir,
			agentDir: target.agentDir
		};
		if (opts.json) writeRuntimeJson(runtime, payload);
		await prompter.outro(`Agent "${agentId}" ready.`);
	} catch (err) {
		if (err instanceof WizardCancelledError) {
			runtime.exit(1);
			return;
		}
		throw err;
	}
}
//#endregion
export { agentsAddCommand };
