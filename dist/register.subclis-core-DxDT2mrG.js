import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { S as loadPrivateQaCliModule, b as getSubCliEntries$1 } from "./argv-D6QuZiS5.js";
import { t as resolveCliArgvInvocation } from "./argv-invocation-DfZI3Nyr.js";
import { i as shouldRegisterPrimarySubcommandOnly, n as shouldEagerRegisterSubcommands } from "./command-registration-policy-Cfr-tW1z.js";
import { t as resolveCliCommandPathPolicy } from "./command-path-policy-w8xXX0Qu.js";
import { t as removeCommandByName } from "./command-tree-CA1ToIBK.js";
import { i as registerCommandGroups, r as registerCommandGroupByName } from "./register-command-groups-Bz2LvqeP.js";
//#region src/cli/program/command-group-descriptors.ts
function buildDescriptorIndex(descriptors) {
	return new Map(descriptors.map((descriptor) => [descriptor.name, descriptor]));
}
/** Resolve named command-group specs into descriptor-backed entries. */
function resolveCommandGroupEntries(descriptors, specs) {
	const descriptorsByName = buildDescriptorIndex(descriptors);
	return specs.map((spec) => ({
		placeholders: spec.commandNames.map((name) => {
			const descriptor = descriptorsByName.get(name);
			if (!descriptor) throw new Error(`Unknown command descriptor: ${name}`);
			return descriptor;
		}),
		register: spec.register
	}));
}
/** Build lazy command-group entries with a mapped program registrar. */
function buildCommandGroupEntries(descriptors, specs, mapRegister) {
	return resolveCommandGroupEntries(descriptors, specs).map((entry) => ({
		placeholders: entry.placeholders,
		register: mapRegister(entry.register)
	}));
}
/** Define a lazy group that imports its module at registration time. */
function defineImportedCommandGroupSpec(commandNames, loadModule, register) {
	return {
		commandNames,
		register: async (args) => {
			await register(await loadModule(), args);
		}
	};
}
/** Map program-level imported command definitions to lazy specs with export validation. */
function defineImportedProgramCommandGroupSpecs(definitions) {
	return definitions.map((definition) => ({
		commandNames: definition.commandNames,
		register: async (program) => {
			const register = (await definition.loadModule())[definition.exportName];
			if (typeof register !== "function") throw new Error(`Missing program command registrar: ${definition.exportName}`);
			await register(program);
		}
	}));
}
//#endregion
//#region src/cli/program/register.subclis-core.ts
const pluginCliLoader = createLazyImportLoader(() => import("./cli-13RSR3oD.js"));
function shouldRegisterGatewayRunOnly(name, argv) {
	if (name !== "gateway") return false;
	const invocation = resolveCliArgvInvocation(argv);
	if (invocation.hasHelpOrVersion || invocation.commandPath[0] !== "gateway") return false;
	return invocation.commandPath.length === 1 || invocation.commandPath[1] === "run";
}
async function registerGatewayRunOnly(program) {
	const { addGatewayRunCommand } = await import("./run-command-Bt-78QAX.js");
	removeCommandByName(program, "gateway");
	addGatewayRunCommand(addGatewayRunCommand(program.command("gateway").description("Run, inspect, and query the WebSocket Gateway")).command("run").description("Run the WebSocket Gateway (foreground)"));
}
async function registerSubCliWithPluginCommands(program, argv, registerSubCli, pluginCliPosition) {
	const invocation = resolveCliArgvInvocation(argv);
	const shouldRegisterPluginCommands = !invocation.hasHelpOrVersion && resolveCliCommandPathPolicy(invocation.commandPath).loadPlugins !== "never";
	if (pluginCliPosition === "before" && shouldRegisterPluginCommands) {
		const { registerPluginCliCommandsFromValidatedConfig } = await pluginCliLoader.load();
		await registerPluginCliCommandsFromValidatedConfig(program);
	}
	await registerSubCli();
	if (pluginCliPosition === "after" && shouldRegisterPluginCommands) {
		const { registerPluginCliCommandsFromValidatedConfig } = await pluginCliLoader.load();
		await registerPluginCliCommandsFromValidatedConfig(program);
	}
}
const entrySpecs = [
	...defineImportedProgramCommandGroupSpecs([
		{
			commandNames: ["acp"],
			loadModule: () => import("./acp-cli-DPqlqKE-.js"),
			exportName: "registerAcpCli"
		},
		{
			commandNames: ["gateway"],
			loadModule: () => import("./gateway-cli-CjFrgAuX.js"),
			exportName: "registerGatewayCli"
		},
		{
			commandNames: ["daemon"],
			loadModule: () => import("./cli/daemon-cli.js"),
			exportName: "registerDaemonCli"
		},
		{
			commandNames: ["logs"],
			loadModule: () => import("./logs-cli-CSRR3UJl.js"),
			exportName: "registerLogsCli"
		},
		{
			commandNames: ["system"],
			loadModule: () => import("./system-cli-CeX0hIVi.js"),
			exportName: "registerSystemCli"
		},
		{
			commandNames: ["models"],
			loadModule: () => import("./models-cli-b7kqh442.js"),
			exportName: "registerModelsCli"
		},
		{
			commandNames: ["promos"],
			loadModule: () => import("./promos-cli-DapqRJsZ.js"),
			exportName: "registerPromosCli"
		},
		{
			commandNames: ["infer", "capability"],
			loadModule: () => import("./capability-cli-BARcq846.js"),
			exportName: "registerCapabilityCli"
		},
		{
			commandNames: ["approvals", "exec-approvals"],
			loadModule: () => import("./exec-approvals-cli-BWLoqb0f.js"),
			exportName: "registerExecApprovalsCli"
		},
		{
			commandNames: ["exec-policy"],
			loadModule: () => import("./exec-policy-cli-BuoOvGl4.js"),
			exportName: "registerExecPolicyCli"
		}
	]),
	{
		commandNames: ["nodes"],
		register: async (program, argv) => {
			await (await import("./nodes-cli-CZpjq7_Y.js")).registerNodesCli(program, argv);
		}
	},
	...defineImportedProgramCommandGroupSpecs([
		{
			commandNames: ["devices"],
			loadModule: () => import("./devices-cli-IIxXZBhk.js"),
			exportName: "registerDevicesCli"
		},
		{
			commandNames: ["users"],
			loadModule: () => import("./users-cli-DH8rJJDz.js"),
			exportName: "registerUsersCli"
		},
		{
			commandNames: ["node"],
			loadModule: () => import("./node-cli-BYEvQMvH.js"),
			exportName: "registerNodeCli"
		},
		{
			commandNames: ["worker"],
			loadModule: () => import("./worker-cli-B6Vw8rTL.js"),
			exportName: "registerWorkerCli"
		},
		{
			commandNames: ["sandbox"],
			loadModule: () => import("./sandbox-cli-CVeufI14.js"),
			exportName: "registerSandboxCli"
		},
		{
			commandNames: ["fleet"],
			loadModule: () => import("./fleet-cli-Dizl5IQV.js"),
			exportName: "registerFleetCli"
		},
		{
			commandNames: ["worktrees"],
			loadModule: () => import("./worktrees-cli-BRQf0yZW.js"),
			exportName: "registerWorktreesCli"
		},
		{
			commandNames: ["attach"],
			loadModule: () => import("./attach-cli-CvpOYzn0.js"),
			exportName: "registerAttachCli"
		},
		{
			commandNames: [
				"tui",
				"terminal",
				"chat"
			],
			loadModule: () => import("./tui-cli-BY1VGuVZ.js"),
			exportName: "registerTuiCli"
		},
		{
			commandNames: ["cron", "automations"],
			loadModule: () => import("./cron-cli-DrdoSGR9.js"),
			exportName: "registerCronCli"
		},
		{
			commandNames: ["dns"],
			loadModule: () => import("./dns-cli-BYr4zOa6.js"),
			exportName: "registerDnsCli"
		},
		{
			commandNames: ["docs"],
			loadModule: () => import("./docs-cli-BBhpgJec.js"),
			exportName: "registerDocsCli"
		},
		{
			commandNames: ["qa"],
			loadModule: loadPrivateQaCliModule,
			exportName: "registerQaLabCli"
		},
		{
			commandNames: ["proxy"],
			loadModule: () => import("./proxy-cli-CKkpA4lm.js"),
			exportName: "registerProxyCli"
		},
		{
			commandNames: ["hooks"],
			loadModule: () => import("./hooks-cli-y3nMyyrZ.js"),
			exportName: "registerHooksCli"
		},
		{
			commandNames: ["webhooks"],
			loadModule: () => import("./webhooks-cli-D2q6jjN_.js"),
			exportName: "registerWebhooksCli"
		},
		{
			commandNames: ["qr"],
			loadModule: () => import("./qr-cli-CMr5NiSc.js"),
			exportName: "registerQrCli"
		},
		{
			commandNames: ["clawbot"],
			loadModule: () => import("./clawbot-cli-BtbTaD3h.js"),
			exportName: "registerClawbotCli"
		}
	]),
	{
		commandNames: ["pairing"],
		register: async (program, argv) => {
			await registerSubCliWithPluginCommands(program, argv, async () => {
				(await import("./pairing-cli-whWPoY7N.js")).registerPairingCli(program);
			}, "before");
		}
	},
	{
		commandNames: ["plugins"],
		register: async (program, argv) => {
			await registerSubCliWithPluginCommands(program, argv, async () => {
				(await import("./plugins-cli-D5wqvc-N.js")).registerPluginsCli(program);
			}, "after");
		}
	},
	{
		commandNames: ["channels"],
		register: async (program, argv, context) => {
			await (await import("./channels-cli-DW4vUftU.js")).registerChannelsCli(program, argv, { includeSetupOptions: context.purpose === "completion" });
		}
	},
	...defineImportedProgramCommandGroupSpecs([
		{
			commandNames: ["directory"],
			loadModule: () => import("./directory-cli-2W_aUUPc.js"),
			exportName: "registerDirectoryCli"
		},
		{
			commandNames: ["security"],
			loadModule: () => import("./security-cli-CPayDy49.js"),
			exportName: "registerSecurityCli"
		},
		{
			commandNames: ["secrets"],
			loadModule: () => import("./secrets-cli-DDyV7An6.js"),
			exportName: "registerSecretsCli"
		},
		{
			commandNames: ["skills"],
			loadModule: () => import("./skills-cli-Cstg0PTG.js"),
			exportName: "registerSkillsCli"
		},
		{
			commandNames: ["update"],
			loadModule: () => import("./update-cli-C1mYF9_h.js"),
			exportName: "registerUpdateCli"
		}
	])
];
function resolveSubCliCommandGroups(argv, context = {}) {
	const descriptors = getSubCliEntries$1();
	const descriptorNames = new Set(descriptors.map((descriptor) => descriptor.name));
	return buildCommandGroupEntries(descriptors, entrySpecs.filter((spec) => spec.commandNames.every((name) => descriptorNames.has(name))), (register) => async (program) => {
		await register(program, argv, context);
	});
}
function getSubCliEntries() {
	return getSubCliEntries$1();
}
async function registerSubCliByName(program, name, argv = process.argv, context = {}) {
	if (shouldRegisterGatewayRunOnly(name, argv)) {
		await registerGatewayRunOnly(program);
		return true;
	}
	return registerCommandGroupByName(program, resolveSubCliCommandGroups(argv, context), name);
}
function registerSubCliCommands(program, argv = process.argv) {
	const { primary } = resolveCliArgvInvocation(argv);
	registerCommandGroups(program, resolveSubCliCommandGroups(argv), {
		eager: shouldEagerRegisterSubcommands(),
		primary,
		registerPrimaryOnly: Boolean(primary && shouldRegisterPrimarySubcommandOnly(argv))
	});
}
//#endregion
export { defineImportedCommandGroupSpec as a, buildCommandGroupEntries as i, registerSubCliByName as n, defineImportedProgramCommandGroupSpecs as o, registerSubCliCommands as r, getSubCliEntries as t };
