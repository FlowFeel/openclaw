import { F as getCoreCliCommandDescriptors, I as getCoreCliCommandNames$1 } from "./argv-D6QuZiS5.js";
import { t as resolveCliArgvInvocation } from "./argv-invocation-DfZI3Nyr.js";
import { r as shouldRegisterPrimaryCommandOnly } from "./command-registration-policy-Cfr-tW1z.js";
import { i as registerCommandGroups, r as registerCommandGroupByName } from "./register-command-groups-Bz2LvqeP.js";
import { a as defineImportedCommandGroupSpec, i as buildCommandGroupEntries, o as defineImportedProgramCommandGroupSpecs } from "./register.subclis-core-BuY4_J6E.js";
//#region src/cli/program/command-registry-core.ts
function withProgramOnlySpecs(specs) {
	return specs.map((spec) => ({
		commandNames: spec.commandNames,
		register: async ({ program }) => {
			await spec.register(program);
		}
	}));
}
const coreEntrySpecs = [
	...withProgramOnlySpecs(defineImportedProgramCommandGroupSpecs([
		{
			commandNames: ["setup", "crestodian"],
			loadModule: () => import("./register.setup-ydeEwhtU.js"),
			exportName: "registerSetupCommand"
		},
		{
			commandNames: ["onboard"],
			loadModule: () => import("./register.onboard-DIUGToQk.js"),
			exportName: "registerOnboardCommand"
		},
		{
			commandNames: ["configure"],
			loadModule: () => import("./register.configure-DJylH8_c.js"),
			exportName: "registerConfigureCommand"
		},
		{
			commandNames: ["config"],
			loadModule: () => import("./config-cli-C1W93SAu.js"),
			exportName: "registerConfigCli"
		},
		{
			commandNames: ["claws"],
			loadModule: () => import("./claws-cli-E2eGY5fe.js"),
			exportName: "registerClawsCli"
		},
		{
			commandNames: ["backup"],
			loadModule: () => import("./register.backup-DPn_hh-b.js"),
			exportName: "registerBackupCommand"
		},
		{
			commandNames: ["migrate"],
			loadModule: () => import("./register.migrate-CQQz9qAc.js"),
			exportName: "registerMigrateCommand"
		},
		{
			commandNames: ["audit"],
			loadModule: () => import("./register.audit-DEMVQ9rY.js"),
			exportName: "registerAuditCommand"
		},
		{
			commandNames: [
				"doctor",
				"dashboard",
				"reset",
				"uninstall"
			],
			loadModule: () => import("./register.maintenance-D98XsHja.js"),
			exportName: "registerMaintenanceCommands"
		}
	])),
	defineImportedCommandGroupSpec(["message"], () => import("./register.message-D4iJgpPn.js"), (mod, { program, ctx }) => {
		mod.registerMessageCommands(program, ctx);
	}),
	...withProgramOnlySpecs(defineImportedProgramCommandGroupSpecs([{
		commandNames: ["mcp"],
		loadModule: () => import("./mcp-cli-BANSbobQ.js"),
		exportName: "registerMcpCli"
	}, {
		commandNames: ["transcripts"],
		loadModule: () => import("./register.transcripts-BztV6p8-.js"),
		exportName: "registerTranscriptsCli"
	}])),
	defineImportedCommandGroupSpec(["agent"], () => import("./register.agent-turn-D-KPkpky.js"), (mod, { program, ctx }) => {
		mod.registerAgentTurnCommand(program, { agentChannelOptions: ctx.agentChannelOptions });
	}),
	defineImportedCommandGroupSpec(["agents"], () => import("./register.agent-BILuiFJB.js"), (mod, { program }) => {
		mod.registerAgentsCommands(program);
	}),
	...withProgramOnlySpecs(defineImportedProgramCommandGroupSpecs([{
		commandNames: [
			"status",
			"health",
			"sessions",
			"commitments",
			"tasks"
		],
		loadModule: () => import("./register.status-health-sessions-jK5mVMWE.js"),
		exportName: "registerStatusHealthSessionsCommands"
	}]))
];
function resolveCoreCommandGroups(ctx, argv) {
	const descriptors = getCoreCliCommandDescriptors();
	const visibleCommandNames = new Set(descriptors.map((descriptor) => descriptor.name));
	return buildCommandGroupEntries(descriptors, coreEntrySpecs.filter((spec) => spec.commandNames.every((name) => visibleCommandNames.has(name))), (register) => async (program) => {
		await register({
			program,
			ctx,
			argv
		});
	});
}
function getCoreCliCommandNames() {
	return getCoreCliCommandNames$1();
}
async function registerCoreCliByName(program, ctx, name, argv = process.argv) {
	return registerCommandGroupByName(program, resolveCoreCommandGroups(ctx, argv), name);
}
function registerCoreCliCommands(program, ctx, argv) {
	const { primary } = resolveCliArgvInvocation(argv);
	registerCommandGroups(program, resolveCoreCommandGroups(ctx, argv), {
		eager: false,
		primary,
		registerPrimaryOnly: Boolean(primary && shouldRegisterPrimaryCommandOnly(argv))
	});
}
//#endregion
export { registerCoreCliByName as n, registerCoreCliCommands as r, getCoreCliCommandNames as t };
