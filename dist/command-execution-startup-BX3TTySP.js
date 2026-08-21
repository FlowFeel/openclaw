import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
import { t as loggingState } from "./state-B1ZXWHS1.js";
import { t as resolveCliArgvInvocation } from "./argv-invocation-DfZI3Nyr.js";
import { a as routeLogsToStderr } from "./console-DRDfhKk-.js";
import { t as resolveCliCommandPathPolicy } from "./command-path-policy-w8xXX0Qu.js";
import { t as resolveCliStartupPolicy } from "./command-startup-policy-DAk85Ac6.js";
import { t as measureCliCommandStartup } from "./command-startup-timing-GcymUUCV.js";
//#region src/cli/plugin-registry-loader.ts
const pluginRegistryModuleLoader = createLazyImportLoader(() => import("./plugin-registry-DC8VWxk_.js"));
function loadPluginRegistryModule() {
	return pluginRegistryModuleLoader.load();
}
/** Load the CLI plugin registry and optionally route activation logs to stderr. */
async function ensureCliPluginRegistryLoaded(params) {
	const { ensurePluginRegistryLoaded } = await loadPluginRegistryModule();
	const previousForceStderr = loggingState.forceConsoleToStderr;
	if (params.routeLogsToStderr) loggingState.forceConsoleToStderr = true;
	try {
		ensurePluginRegistryLoaded({
			scope: params.scope,
			...params.config ? { config: params.config } : {},
			...params.activationSourceConfig ? { activationSourceConfig: params.activationSourceConfig } : {}
		});
	} finally {
		loggingState.forceConsoleToStderr = previousForceStderr;
	}
}
//#endregion
//#region src/cli/command-bootstrap.ts
const configGuardModuleLoader = createLazyImportLoader(() => import("./config-guard-B3b-cZg8.js"));
function loadConfigGuardModule() {
	return configGuardModuleLoader.load();
}
/** Run the lazy command bootstrap steps selected by command policy. */
async function ensureCliCommandBootstrap(params) {
	if (!params.skipConfigGuard) await measureCliCommandStartup("config-ready", async () => {
		const { ensureConfigReady } = await loadConfigGuardModule();
		await ensureConfigReady({
			runtime: params.runtime,
			commandPath: params.commandPath,
			measure: (stage, run) => measureCliCommandStartup(stage, run),
			...params.allowInvalid ? { allowInvalid: true } : {},
			...params.beforeStateMigrations ? { beforeStateMigrations: params.beforeStateMigrations } : {},
			...params.suppressDoctorStdout ? { suppressDoctorStdout: true } : {},
			...params.skipPristineStartupStateMigrations ? { skipPristineStartupStateMigrations: true } : {},
			...params.skipPristineCoreStateMigrations ? { skipPristineCoreStateMigrations: true } : {}
		});
	});
	if (!params.loadPlugins) return;
	const pluginRegistryLoadPolicy = params.pluginRegistry ?? resolveCliCommandPathPolicy(params.commandPath).pluginRegistry;
	await measureCliCommandStartup("plugin-registry", () => ensureCliPluginRegistryLoaded({
		scope: pluginRegistryLoadPolicy.scope,
		routeLogsToStderr: params.suppressDoctorStdout
	}));
}
//#endregion
//#region src/cli/command-execution-startup.ts
const hasJsonFlag = (argv) => argv.some((arg) => arg === "--json" || arg.startsWith("--json="));
const hasVersionFlag = (argv) => argv.some((arg) => arg === "--version" || arg === "-V");
function resolveCliExecutionStartupContext(params) {
	const invocation = resolveCliArgvInvocation(params.argv);
	const commandPath = params.commandPath ?? invocation.commandPath;
	return {
		invocation,
		commandPath,
		startupPolicy: resolveCliStartupPolicy({
			argv: params.argv,
			commandPath,
			jsonOutputMode: params.jsonOutputMode,
			env: params.env
		})
	};
}
async function applyCliExecutionStartupPresentation(params) {
	if (params.startupPolicy.suppressDoctorStdout && params.routeLogsToStderrOnSuppress !== false) routeLogsToStderr();
	if (params.startupPolicy.hideBanner || params.showBanner === false || !params.version) return;
	if (params.argv && (hasJsonFlag(params.argv) || hasVersionFlag(params.argv))) return;
	const { emitCliBanner } = await import("./banner-Dy888sCu.js");
	if (params.argv) {
		emitCliBanner(params.version, { argv: params.argv });
		return;
	}
	emitCliBanner(params.version);
}
async function ensureCliExecutionBootstrap(params) {
	await ensureCliCommandBootstrap({
		runtime: params.runtime,
		commandPath: params.commandPath,
		suppressDoctorStdout: params.startupPolicy.suppressDoctorStdout,
		allowInvalid: params.allowInvalid,
		...params.beforeStateMigrations ? { beforeStateMigrations: params.beforeStateMigrations } : {},
		loadPlugins: params.loadPlugins ?? params.startupPolicy.loadPlugins,
		pluginRegistry: params.startupPolicy.pluginRegistry,
		skipConfigGuard: params.skipConfigGuard ?? params.startupPolicy.skipConfigGuard,
		...params.skipPristineStartupStateMigrations ? { skipPristineStartupStateMigrations: true } : {},
		...params.skipPristineCoreStateMigrations ? { skipPristineCoreStateMigrations: true } : {}
	});
}
//#endregion
export { ensureCliExecutionBootstrap as n, resolveCliExecutionStartupContext as r, applyCliExecutionStartupPresentation as t };
