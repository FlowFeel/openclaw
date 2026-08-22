import { a as normalizeLowercaseStringOrEmpty, c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { b as parseStrictPositiveInteger, v as parseStrictInteger } from "./number-coercion-Crk_c9KW.js";
import "./parse-finite-number-CG8VFQF4.js";
import "./utils-Bs67j6-3.js";
import { t as sleep } from "./sleep-Ce8zcpEF.js";
import { g as resolveLegacyGatewayLaunchAgentLabels, p as resolveGatewayServiceDescription, t as GATEWAY_LAUNCH_AGENT_LABEL, u as resolveGatewayLaunchAgentLabel } from "./constants-Qf4OESGR.js";
import { n as parseTcpPort, r as parseTcpPortFromArgs } from "./tcp-port-BiPmOnnn.js";
import { a as normalizeEnvVarKey } from "./host-env-security-D4EXCIbD.js";
import { r as resolveHomeDir, t as resolveGatewayStateDir } from "./paths-DsnYGLDu.js";
import { n as probePortUsage } from "./ports-probe-DjzbYYcu.js";
import { a as formatPortDiagnostics, n as inspectPortUsage } from "./ports-inspect-Bbp_jFBM.js";
import "./ports-DvrijSVP.js";
import { t as cleanStaleGatewayProcessesSync } from "./restart-stale-pids-D90kyWYj.js";
import { t as resolveGatewayServiceProbeHosts } from "./gateway-service-probe-hosts-CUCEkkwQ.js";
import { c as buildLaunchAgentPlist$1, d as assertValidLaunchAgentLabel, f as resolveLaunchAgentLabel, h as isLaunchctlNotLoaded, i as isSystemLaunchDaemonOwnershipError, m as formatLaunchctlResultDetail, n as formatSystemLaunchDaemonOwnershipSummary, p as execLaunchctl, r as inspectSystemLaunchDaemonOwnership, s as LAUNCH_AGENT_ENV_WRAPPER_SHELL, t as assertNoSystemLaunchDaemonOwnership, u as readLaunchAgentProgramArgumentsFromFile } from "./launchd-system-TrOLshYs.js";
import { o as resolveGatewaySupervisorLogPaths } from "./restart-logs-BBbMF07G.js";
import { n as scheduleDetachedLaunchdRestartHandoff, t as scheduleDetachedLaunchdMaintenancePark } from "./launchd-restart-handoff-D45Wbag_.js";
import { a as writeFormattedLines, i as toPosixPath, n as parseKeyValueOutput, r as formatLine, t as createGatewayLifecycleMutationReporter } from "./service-mutation-PgzR3-XQ.js";
import { randomUUID } from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
//#region src/daemon/launchd-current-service.ts
/** Detects whether the current process is running inside a launchd service label. */
/** Checks whether the current process appears to be running under the requested launchd label. */
function isCurrentProcessLaunchdServiceLabel(label, env = process.env, options = {}) {
	const currentLabels = [
		env.LAUNCH_JOB_LABEL,
		env.LAUNCH_JOB_NAME,
		env.XPC_SERVICE_NAME
	].flatMap((value) => {
		const normalized = normalizeOptionalString(value);
		return normalized ? [normalized] : [];
	});
	for (const currentLabel of currentLabels) if (currentLabel === label) return true;
	const configuredLabel = normalizeOptionalString(env.OPENCLAW_LAUNCHD_LABEL);
	if (!configuredLabel || configuredLabel !== label) return false;
	if (normalizeOptionalString(env.OPENCLAW_SERVICE_MARKER) === "openclaw" && Boolean(normalizeOptionalString(env.OPENCLAW_SERVICE_KIND))) return true;
	return options.allowConfiguredLabelFallback !== false && currentLabels.length === 0;
}
//#endregion
//#region src/daemon/launchd.ts
/** macOS LaunchAgent installer, runtime inspection, and lifecycle controls. */
const LAUNCH_AGENT_DIR_MODE = 493;
const LAUNCH_AGENT_PLIST_MODE = 420;
const LAUNCH_AGENT_PRIVATE_DIR_MODE = 448;
const LAUNCH_AGENT_ENV_FILE_MODE = 384;
const LAUNCH_AGENT_ENV_WRAPPER_MODE = 448;
const LAUNCH_AGENT_ENV_DIR_NAME = "service-env";
const LAUNCH_AGENT_STDERR_PATH = "/dev/null";
const OPENCLAW_UPDATE_LAUNCHD_LABEL_PREFIX = "ai.openclaw.update.";
const OPENCLAW_MANUAL_UPDATE_LAUNCHD_LABEL_PATTERN = /^ai\.openclaw\.manual-update\.\d+$/;
const OPENCLAW_PROFILE_UPDATE_LAUNCHD_LABEL_PATTERN = /^ai\.openclaw\.[A-Za-z0-9._-]+\.update\.[A-Za-z0-9._-]+$/;
const OPENCLAW_DIRECT_CLI_NAMES = /* @__PURE__ */ new Set(["openclaw", "openclaw.mjs"]);
const OPENCLAW_NODE_RUNTIME_NAMES = /* @__PURE__ */ new Set([
	"bun",
	"bun.exe",
	"node",
	"node.exe"
]);
const OPENCLAW_SCRIPT_NAMES = /* @__PURE__ */ new Set(["openclaw.mjs"]);
const LAUNCH_AGENT_STOP_PORT_RELEASE_TIMEOUT_MS = 20 * 1e3;
const LAUNCH_AGENT_STOP_PORT_RELEASE_POLL_MS = 100;
const LAUNCHCTL_PROTECTED_PID_TIMEOUT_MS = 2e3;
function normalizeOpenClawUpdateLaunchdLabel(label) {
	if (typeof label !== "string") return null;
	const trimmed = label.trim();
	if (trimmed.startsWith(OPENCLAW_UPDATE_LAUNCHD_LABEL_PREFIX)) return trimmed;
	return OPENCLAW_MANUAL_UPDATE_LAUNCHD_LABEL_PATTERN.test(trimmed) ? trimmed : null;
}
function normalizeOpenClawUpdateLaunchdLabelCandidate(label) {
	const normalized = normalizeOpenClawUpdateLaunchdLabel(label);
	if (normalized) return {
		label: normalized,
		requiresMetadata: false
	};
	if (typeof label !== "string") return null;
	const trimmed = label.trim();
	return OPENCLAW_PROFILE_UPDATE_LAUNCHD_LABEL_PATTERN.test(trimmed) ? {
		label: trimmed,
		requiresMetadata: true
	} : null;
}
function isCurrentGatewayLaunchdLabel(label, env) {
	if (label === resolveGatewayLaunchAgentLabel(env.OPENCLAW_PROFILE)) return true;
	if (env.OPENCLAW_SERVICE_MARKER?.trim() !== "openclaw" || env.OPENCLAW_SERVICE_KIND?.trim() !== "gateway") return false;
	const configuredLabel = env.OPENCLAW_LAUNCHD_LABEL?.trim();
	return Boolean(configuredLabel && label === configuredLabel);
}
function resolveCurrentOpenClawUpdateLaunchdJobLabel(env = process.env) {
	for (const label of [
		env.LAUNCH_JOB_LABEL,
		env.LAUNCH_JOB_NAME,
		env.XPC_SERVICE_NAME,
		env.OPENCLAW_LAUNCHD_LABEL
	]) {
		const candidate = normalizeOpenClawUpdateLaunchdLabelCandidate(label);
		if (candidate) {
			if (isCurrentGatewayLaunchdLabel(candidate.label, env)) continue;
			return candidate;
		}
	}
	return null;
}
function resolveLaunchAgentPlistPathForLabel(env, label) {
	const home = toPosixPath(resolveHomeDir(env));
	return path.posix.join(home, "Library", "LaunchAgents", `${label}.plist`);
}
function resolveLaunchAgentEnvDir(env) {
	return path.join(resolveGatewayStateDir(env), LAUNCH_AGENT_ENV_DIR_NAME);
}
function resolveLaunchAgentEnvFilePath(env, label) {
	return path.join(resolveLaunchAgentEnvDir(env), `${label}.env`);
}
function resolveLaunchAgentEnvWrapperPath(env, label) {
	return path.join(resolveLaunchAgentEnvDir(env), `${label}-env-wrapper.sh`);
}
function shellSingleQuote(value) {
	return `'${value.replaceAll("'", "'\\''")}'`;
}
function collectLaunchAgentEnvironmentEntries(environment) {
	const entries = [];
	for (const [rawKey, rawValue] of Object.entries(environment ?? {})) {
		const key = normalizeEnvVarKey(rawKey, { portable: true });
		const value = rawValue?.trim();
		if (!key || !value) continue;
		entries.push([key, value]);
	}
	return entries.toSorted(([left], [right]) => left.localeCompare(right));
}
function buildLaunchAgentEnvironmentFile(entries) {
	return [
		"# Generated by OpenClaw. Do not edit while the gateway service is installed.",
		...entries.map(([key, value]) => `export ${key}=${shellSingleQuote(value)}`),
		""
	].join("\n");
}
function buildLaunchAgentEnvironmentWrapper() {
	return `#!/bin/sh
set -eu
env_file="$1"
shift
if [ -f "$env_file" ]; then
  . "$env_file"
fi
exec "$@"
`;
}
async function resolveLaunchAgentEnvironmentWrapperOverwriteWarnings(params) {
	const existingWrapper = await fs.readFile(params.wrapperPath, "utf8").catch(() => null);
	if (existingWrapper === null || existingWrapper === params.generatedWrapper) return [];
	return [`Existing generated LaunchAgent env wrapper at ${params.wrapperPath} contains custom behavior and will be overwritten; move custom behavior to openclaw gateway install --wrapper <path> or OPENCLAW_WRAPPER.`];
}
function writeLaunchAgentOverwriteWarnings(stdout, warn, warnings) {
	for (const warning of warnings) {
		if (warn) {
			warn(warning);
			continue;
		}
		if (!stdout) continue;
		stdout.write(`${formatLine("Warning", warning)}\n`);
	}
}
function isLaunchAgentEnvironmentWrapperArgs(params) {
	return params.programArguments[0] === params.wrapperPath && params.programArguments[1] === params.envFilePath || params.programArguments[0] === "/bin/sh" && params.programArguments[1] === params.wrapperPath && params.programArguments[2] === params.envFilePath;
}
async function prepareLaunchAgentProgramArguments(params) {
	const entries = collectLaunchAgentEnvironmentEntries(params.environment);
	if (entries.length === 0) return { programArguments: params.programArguments };
	const envDir = resolveLaunchAgentEnvDir(params.env);
	const envFilePath = resolveLaunchAgentEnvFilePath(params.env, params.label);
	const wrapperPath = resolveLaunchAgentEnvWrapperPath(params.env, params.label);
	const generatedWrapper = buildLaunchAgentEnvironmentWrapper();
	await ensureSecureDirectory(envDir, LAUNCH_AGENT_PRIVATE_DIR_MODE);
	await fs.writeFile(envFilePath, buildLaunchAgentEnvironmentFile(entries), {
		encoding: "utf8",
		mode: LAUNCH_AGENT_ENV_FILE_MODE
	});
	await fs.chmod(envFilePath, LAUNCH_AGENT_ENV_FILE_MODE).catch(() => void 0);
	const overwriteWarnings = await resolveLaunchAgentEnvironmentWrapperOverwriteWarnings({
		wrapperPath,
		generatedWrapper
	});
	writeLaunchAgentOverwriteWarnings(params.stdout, params.warn, overwriteWarnings);
	await fs.writeFile(wrapperPath, generatedWrapper, {
		encoding: "utf8",
		mode: LAUNCH_AGENT_ENV_WRAPPER_MODE
	});
	await fs.chmod(wrapperPath, LAUNCH_AGENT_ENV_WRAPPER_MODE).catch(() => void 0);
	if (isLaunchAgentEnvironmentWrapperArgs({
		programArguments: params.programArguments,
		envFilePath,
		wrapperPath
	})) return { programArguments: params.programArguments };
	return { programArguments: [
		LAUNCH_AGENT_ENV_WRAPPER_SHELL,
		wrapperPath,
		envFilePath,
		...params.programArguments
	] };
}
function resolveLaunchAgentPlistPath(env) {
	return resolveLaunchAgentPlistPathForLabel(env, resolveLaunchAgentLabel(env));
}
function resolveLaunchAgentEnvironmentReadOptions(env, label) {
	return {
		expectedEnvironmentWrapperPath: resolveLaunchAgentEnvWrapperPath(env, label),
		expectedEnvironmentFilePath: resolveLaunchAgentEnvFilePath(env, label),
		generatedEnvironmentLabel: label
	};
}
async function readLaunchAgentProgramArguments(env) {
	const label = resolveLaunchAgentLabel(env);
	return readLaunchAgentProgramArgumentsFromFile(resolveLaunchAgentPlistPath(env), resolveLaunchAgentEnvironmentReadOptions(env, label));
}
function buildLaunchAgentPlist({ label = GATEWAY_LAUNCH_AGENT_LABEL, comment, programArguments, workingDirectory, stdoutPath, stderrPath, environment }) {
	return buildLaunchAgentPlist$1({
		label,
		comment,
		programArguments,
		workingDirectory,
		stdoutPath,
		stderrPath,
		environment
	});
}
function readLaunchAgentPidForCleanupSync(serviceTarget) {
	const probe = spawnSync("launchctl", ["print", serviceTarget], {
		encoding: "utf8",
		timeout: LAUNCHCTL_PROTECTED_PID_TIMEOUT_MS
	});
	const result = {
		stdout: probe.stdout ?? "",
		stderr: probe.error?.message ?? probe.stderr ?? "",
		code: probe.error ? 1 : probe.status ?? 1
	};
	if (result.code !== 0) throw new Error(`launchctl print failed: ${formatLaunchctlResultDetail(result)}`);
	const pid = parseLaunchctlPrint(result.stdout || result.stderr || "").pid;
	if (pid === void 0) throw new Error("launchctl print did not report a running pid");
	return pid;
}
function parseLaunchctlListOpenClawUpdateJobs(output) {
	return parseLaunchctlListOpenClawUpdateJobCandidates(output).filter((job) => !job.requiresMetadata).map(({ requiresMetadata: _requiresMetadata, ...job }) => job);
}
function parseLaunchctlListOpenClawUpdateJobCandidates(output) {
	const jobs = [];
	for (const rawLine of output.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line) continue;
		const [pidRaw, statusRaw, ...labelParts] = line.split(/\s+/);
		const candidate = normalizeOpenClawUpdateLaunchdLabelCandidate(labelParts.join(" "));
		if (!candidate) continue;
		const pid = pidRaw === "-" ? void 0 : parseStrictPositiveInteger(pidRaw ?? "");
		const lastExitStatus = parseStrictInteger(statusRaw ?? "");
		jobs.push({
			label: candidate.label,
			requiresMetadata: candidate.requiresMetadata,
			...pid !== void 0 ? { pid } : {},
			...lastExitStatus !== void 0 ? { lastExitStatus } : {}
		});
	}
	return jobs.toSorted((a, b) => a.label.localeCompare(b.label));
}
function hasOpenClawUpdateLaunchdMarker(env) {
	return env?.OPENCLAW_UPDATE_RUN_HANDOFF?.trim() === "1";
}
function isOpenClawUpdateCommandPrefix(programArguments, updateIndex) {
	if (updateIndex === 1) {
		const cliName = path.basename(programArguments[0] ?? "").toLowerCase();
		return OPENCLAW_DIRECT_CLI_NAMES.has(cliName);
	}
	if (updateIndex !== 2) return false;
	const runtimeName = path.basename(programArguments[0] ?? "").toLowerCase();
	const entryName = path.basename(programArguments[1] ?? "").toLowerCase();
	return OPENCLAW_NODE_RUNTIME_NAMES.has(runtimeName) && OPENCLAW_SCRIPT_NAMES.has(entryName);
}
function isOpenClawUpdateProgramArguments(programArguments) {
	if (!Array.isArray(programArguments) || programArguments.length === 0) return false;
	const updateIndex = programArguments.findIndex((arg) => arg.trim() === "update");
	if (updateIndex < 0 || !programArguments.slice(updateIndex + 1).includes("--yes")) return false;
	return isOpenClawUpdateCommandPrefix(programArguments, updateIndex) && !programArguments.some((arg) => arg.trim() === "gateway");
}
async function isLaunchdJobConfirmedOpenClawUpdater(params) {
	const command = await readLaunchAgentProgramArgumentsFromFile(resolveLaunchAgentPlistPathForLabel(params.env, params.label));
	return hasOpenClawUpdateLaunchdMarker(command?.environment) || isOpenClawUpdateProgramArguments(command?.programArguments);
}
async function findStaleOpenClawUpdateLaunchdJobs(env = process.env) {
	if (process.platform !== "darwin") return [];
	const result = await execLaunchctl(["list"]);
	if (result.code !== 0) return [];
	const jobs = [];
	for (const job of parseLaunchctlListOpenClawUpdateJobCandidates(result.stdout)) {
		if (isCurrentGatewayLaunchdLabel(job.label, env)) continue;
		if (job.requiresMetadata && !await isLaunchdJobConfirmedOpenClawUpdater({
			label: job.label,
			env
		})) continue;
		jobs.push({
			label: job.label,
			...job.pid !== void 0 ? { pid: job.pid } : {},
			...job.lastExitStatus !== void 0 ? { lastExitStatus: job.lastExitStatus } : {}
		});
	}
	return jobs;
}
async function disableOpenClawUpdateLaunchdJobCandidate(params) {
	if (process.platform !== "darwin") return false;
	if (params.candidate.requiresMetadata && !(params.trustCurrentEnvMarker && hasOpenClawUpdateLaunchdMarker(params.env) || await isLaunchdJobConfirmedOpenClawUpdater({
		label: params.candidate.label,
		env: params.env
	}))) return false;
	return (await execLaunchctl(["disable", `${resolveGuiDomain()}/${assertValidLaunchAgentLabel(params.candidate.label)}`])).code === 0;
}
async function disableOpenClawUpdateLaunchdJob(label, env = process.env) {
	const candidate = normalizeOpenClawUpdateLaunchdLabelCandidate(label);
	if (!candidate) return false;
	return await disableOpenClawUpdateLaunchdJobCandidate({
		candidate,
		env,
		trustCurrentEnvMarker: false
	});
}
async function disableCurrentOpenClawUpdateLaunchdJob(env = process.env) {
	const candidate = resolveCurrentOpenClawUpdateLaunchdJobLabel(env);
	if (!candidate) return false;
	return await disableOpenClawUpdateLaunchdJobCandidate({
		candidate,
		env,
		trustCurrentEnvMarker: isCurrentProcessLaunchdServiceLabel(candidate.label, env, { allowConfiguredLabelFallback: false })
	});
}
async function resolveLaunchAgentGatewayContext(env) {
	const command = await readLaunchAgentProgramArguments(env).catch(() => null);
	const fromArgs = parseTcpPortFromArgs(command?.programArguments);
	if (fromArgs !== null) return {
		port: fromArgs,
		probeHosts: await resolveGatewayServiceProbeHosts({
			env,
			command
		})
	};
	const fromServiceEnv = parseTcpPort(command?.environment?.OPENCLAW_GATEWAY_PORT ?? "");
	if (fromServiceEnv !== null) return {
		port: fromServiceEnv,
		probeHosts: await resolveGatewayServiceProbeHosts({
			env,
			command
		})
	};
	return {
		port: parseTcpPort(env.OPENCLAW_GATEWAY_PORT ?? ""),
		probeHosts: await resolveGatewayServiceProbeHosts({
			env,
			command
		})
	};
}
function resolveGuiDomain() {
	if (typeof process.getuid !== "function") return "gui/501";
	return `gui/${process.getuid()}`;
}
function throwBootstrapGuiSessionError(params) {
	throw new Error(formatLaunchAgentGuiSessionError(params));
}
function formatLaunchAgentGuiSessionError(params) {
	return [
		`launchctl bootstrap failed: ${params.detail}`,
		`LaunchAgent ${params.actionHint} requires a logged-in macOS GUI session for this user (${params.domain}).`,
		"This usually means you are running from SSH/headless context or as the wrong user (including sudo).",
		`Fix: sign in to the macOS desktop as the target user and rerun \`${params.actionHint}\`.`,
		"For headless VM setups, enable auto-login for the target user so macOS creates the GUI session after boot.",
		"Headless deployments should use a dedicated logged-in user session or a custom LaunchDaemon (not shipped): https://docs.openclaw.ai/gateway"
	].join("\n");
}
function writeLaunchAgentActionLine(stdout, label, value) {
	try {
		stdout.write(`${formatLine(label, value)}\n`);
	} catch (err) {
		if (err?.code !== "EPIPE") throw err;
	}
}
async function bootstrapLaunchAgentOrThrow(params) {
	if (!params.skipEnable) {
		if ((await execLaunchctl(["enable", params.serviceTarget])).code === 0) params.onMutation?.("enable");
	}
	const boot = await execLaunchctl([
		"bootstrap",
		params.domain,
		params.plistPath
	]);
	if (boot.code === 0) {
		params.onMutation?.("bootstrap");
		return;
	}
	const detail = (boot.stderr || boot.stdout).trim();
	if (isUnsupportedGuiDomain(detail)) throwBootstrapGuiSessionError({
		detail,
		domain: params.domain,
		actionHint: params.actionHint
	});
	if (isLaunchctlOperationAlreadyInProgress(detail)) {
		const state = await probeLaunchAgentState(params.serviceTarget);
		if (state.state === "running" || state.state === "stopped") {
			params.onMutation?.("bootstrap");
			return;
		}
	}
	throw new Error(`launchctl bootstrap failed: ${detail}`);
}
async function ensureLaunchAgentPlistReadable(plistPath) {
	await fs.chmod(plistPath, LAUNCH_AGENT_PLIST_MODE).catch(() => void 0);
}
async function readExistingLaunchAgentPlist(plistPath) {
	try {
		return await fs.readFile(plistPath);
	} catch (error) {
		if (error.code === "ENOENT") return null;
		throw error;
	}
}
async function publishLaunchAgentPlist(params) {
	const previousContents = await readExistingLaunchAgentPlist(params.plistPath);
	const temporaryPath = `${params.plistPath}.openclaw-${randomUUID()}.tmp`;
	await fs.writeFile(temporaryPath, params.contents, {
		encoding: "utf8",
		flag: "wx",
		mode: LAUNCH_AGENT_PLIST_MODE
	});
	try {
		await assertNoSystemLaunchDaemonOwnership(params.label);
		await fs.rename(temporaryPath, params.plistPath);
		try {
			await assertNoSystemLaunchDaemonOwnership(params.label);
		} catch (ownershipError) {
			try {
				if (previousContents === null) await fs.unlink(params.plistPath);
				else {
					const rollbackPath = `${params.plistPath}.openclaw-${randomUUID()}.rollback`;
					try {
						await fs.writeFile(rollbackPath, previousContents, {
							flag: "wx",
							mode: LAUNCH_AGENT_PLIST_MODE
						});
						await fs.rename(rollbackPath, params.plistPath);
					} finally {
						await fs.unlink(rollbackPath).catch(() => void 0);
					}
				}
			} catch (rollbackError) {
				const ownershipDetail = ownershipError instanceof Error ? ownershipError.message : String(ownershipError);
				throw new Error(`${ownershipDetail}\nThe previous LaunchAgent plist at ${params.plistPath} could not be restored.`, { cause: rollbackError });
			}
			throw ownershipError;
		}
	} finally {
		await fs.unlink(temporaryPath).catch(() => void 0);
	}
	await ensureLaunchAgentPlistReadable(params.plistPath);
}
async function ensureSecureDirectory(targetPath, dirMode = LAUNCH_AGENT_DIR_MODE) {
	await fs.mkdir(targetPath, {
		recursive: true,
		mode: dirMode
	});
	try {
		const mode = (await fs.stat(targetPath)).mode & 511;
		const tightenedMode = mode & ~(dirMode === LAUNCH_AGENT_PRIVATE_DIR_MODE ? 63 : 18);
		if (tightenedMode !== mode) await fs.chmod(targetPath, tightenedMode);
	} catch {}
}
async function ensureLaunchAgentEnvironmentDirectories(environment) {
	const tmpDir = environment?.TMPDIR?.trim();
	if (tmpDir) await ensureSecureDirectory(tmpDir, LAUNCH_AGENT_PRIVATE_DIR_MODE);
}
function parseLaunchctlPrint(output) {
	const entries = parseKeyValueOutput(output, "=");
	const info = {};
	const state = entries.state;
	if (state) info.state = state;
	const pidValue = entries.pid;
	if (pidValue) {
		const pid = parseStrictPositiveInteger(pidValue);
		if (pid !== void 0) info.pid = pid;
	}
	const exitStatusValue = entries["last exit status"];
	if (exitStatusValue) {
		const status = parseStrictInteger(exitStatusValue);
		if (status !== void 0) info.lastExitStatus = status;
	}
	const exitReason = entries["last exit reason"];
	if (exitReason) info.lastExitReason = exitReason;
	return info;
}
async function isLaunchAgentLoaded(args) {
	return (await execLaunchctl(["print", `${resolveGuiDomain()}/${resolveLaunchAgentLabel(args.env)}`])).code === 0;
}
async function launchAgentPlistExists(env) {
	try {
		const plistPath = resolveLaunchAgentPlistPath(env);
		await fs.access(plistPath);
		return true;
	} catch {
		return false;
	}
}
async function readLaunchAgentRuntime(env) {
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(env);
	const [res, systemOwnership] = await Promise.all([execLaunchctl(["print", `${domain}/${label}`]), inspectSystemLaunchDaemonOwnership(label, { scanInstalledPlists: false })]);
	if (systemOwnership.status !== "absent") return {
		status: "unknown",
		detail: formatSystemLaunchDaemonOwnershipSummary(systemOwnership),
		systemLaunchDaemon: {
			status: systemOwnership.status,
			serviceTarget: systemOwnership.serviceTarget,
			...systemOwnership.status === "installed" ? { plistPath: systemOwnership.plistPath } : {}
		}
	};
	if (res.code !== 0) {
		const plistExists = await launchAgentPlistExists(env);
		const detail = (res.stderr || res.stdout).trim() || void 0;
		const missingGuiSession = plistExists && isUnsupportedGuiDomain(detail ?? "");
		return {
			status: "unknown",
			detail,
			...plistExists ? {
				missingSupervision: true,
				...missingGuiSession ? { missingGuiSession } : {}
			} : { missingUnit: true }
		};
	}
	const parsed = parseLaunchctlPrint(res.stdout || res.stderr || "");
	const plistExists = await launchAgentPlistExists(env);
	const state = normalizeLowercaseStringOrEmpty(parsed.state);
	return {
		status: state === "running" || parsed.pid ? "running" : state ? "stopped" : "unknown",
		state: parsed.state,
		pid: parsed.pid,
		lastExitStatus: parsed.lastExitStatus,
		lastExitReason: parsed.lastExitReason,
		cachedLabel: !plistExists
	};
}
function isLaunchctlAlreadyLoaded(res) {
	const detail = normalizeLowercaseStringOrEmpty(res.stderr || res.stdout);
	return res.code === 130 || detail.includes("already exists in domain");
}
async function repairLaunchAgentBootstrap(args) {
	const env = args.env ?? process.env;
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(env);
	const plistPath = resolveLaunchAgentPlistPath(env);
	const serviceTarget = `${domain}/${label}`;
	try {
		await assertNoSystemLaunchDaemonOwnership(label);
	} catch (error) {
		if (!isSystemLaunchDaemonOwnershipError(error)) throw error;
		return {
			ok: false,
			status: error.ownership.status === "unverifiable" ? "system-launchdaemon-unverifiable" : "system-launchdaemon-conflict",
			detail: error.message
		};
	}
	await rewriteLaunchAgentPlistForRestart({
		env,
		label,
		plistPath,
		warn: args.warn ?? ((message) => console.warn(formatLine("Warning", message)))
	});
	await execLaunchctl(["enable", serviceTarget]);
	const boot = await execLaunchctl([
		"bootstrap",
		domain,
		plistPath
	]);
	let repairStatus = "repaired";
	if (boot.code !== 0) {
		const detail = (boot.stderr || boot.stdout).trim();
		if (isUnsupportedGuiDomain(detail)) return {
			ok: false,
			status: "gui-session-unavailable",
			detail,
			domain
		};
		if (!isLaunchctlAlreadyLoaded(boot)) return {
			ok: false,
			status: "bootstrap-failed",
			detail: detail || void 0
		};
		repairStatus = "already-loaded";
	}
	if (repairStatus === "repaired") return {
		ok: true,
		status: repairStatus
	};
	if ((await readLaunchAgentRuntime(env)).status === "running") return {
		ok: true,
		status: repairStatus
	};
	const kick = await execLaunchctl(["kickstart", serviceTarget]);
	if (kick.code !== 0) return {
		ok: false,
		status: "kickstart-failed",
		detail: (kick.stderr || kick.stdout).trim() || void 0
	};
	return {
		ok: true,
		status: repairStatus
	};
}
async function uninstallLaunchAgent({ env, stdout }) {
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(env);
	const plistPath = resolveLaunchAgentPlistPath(env);
	await execLaunchctl([
		"bootout",
		domain,
		plistPath
	]);
	await execLaunchctl(["unload", plistPath]);
	try {
		await fs.lstat(plistPath);
	} catch (error) {
		if (error.code !== "ENOENT") throw createLaunchAgentRemovalError(error);
		stdout.write(`LaunchAgent not found at ${plistPath}\n`);
		return;
	}
	const home = toPosixPath(resolveHomeDir(env));
	const trashDir = path.posix.join(home, ".Trash");
	const dest = path.join(trashDir, `${label}.plist`);
	try {
		await fs.mkdir(trashDir, { recursive: true });
		await fs.rename(plistPath, dest);
		stdout.write(`${formatLine("Moved LaunchAgent to Trash", dest)}\n`);
	} catch (error) {
		if (error.code === "ENOENT") try {
			await fs.lstat(plistPath);
		} catch (accessError) {
			if (accessError.code === "ENOENT") {
				stdout.write(`LaunchAgent not found at ${plistPath}\n`);
				return;
			}
			throw createLaunchAgentRemovalError(accessError);
		}
		throw createLaunchAgentRemovalError(error);
	}
}
function createLaunchAgentRemovalError(error) {
	const code = error.code;
	return /* @__PURE__ */ new Error(`LaunchAgent removal failed${code ? ` (${code})` : ""}. Check permissions and retry.`);
}
function isUnsupportedGuiDomain(detail) {
	const normalized = normalizeLowercaseStringOrEmpty(detail);
	return normalized.includes("domain does not support specified action") || normalized.includes("could not find domain for user gui") || normalized.includes("bootstrap failed: 125");
}
function isLaunchctlOperationAlreadyInProgress(detail) {
	const normalized = normalizeLowercaseStringOrEmpty(detail);
	return normalized.includes("operation already in progress") || normalized.includes("bootstrap failed: 37");
}
async function bootoutLaunchAgentOrThrow(params) {
	const bootout = await execLaunchctl(["bootout", params.serviceTarget]);
	if (bootout.code !== 0 && !isLaunchctlNotLoaded(bootout)) throw new Error(`${params.warning}; launchctl bootout failed: ${formatLaunchctlResultDetail(bootout)}`);
	params.onMutation?.();
	params.stdout.write(`${formatLine("Warning", params.warning)}\n`);
}
async function probeLaunchAgentState(serviceTarget) {
	const probe = await execLaunchctl(["print", serviceTarget]);
	if (probe.code !== 0) {
		if (isLaunchctlNotLoaded(probe)) return { state: "not-loaded" };
		return {
			state: "unknown",
			detail: formatLaunchctlResultDetail(probe) || void 0
		};
	}
	const runtime = parseLaunchctlPrint(probe.stdout || probe.stderr || "");
	if (normalizeLowercaseStringOrEmpty(runtime.state) === "running" || typeof runtime.pid === "number" && runtime.pid > 1) return { state: "running" };
	return { state: "stopped" };
}
async function waitForLaunchAgentStopped(serviceTarget) {
	let lastUnknown = null;
	for (let attempt = 0; attempt < 10; attempt += 1) {
		const probe = await probeLaunchAgentState(serviceTarget);
		if (probe.state === "stopped" || probe.state === "not-loaded") return probe;
		if (probe.state === "unknown") lastUnknown = probe;
		await new Promise((resolve) => {
			setTimeout(resolve, 100);
		});
	}
	return lastUnknown ?? { state: "running" };
}
async function waitForGatewayPortRelease(port, probeHosts) {
	const deadline = Date.now() + LAUNCH_AGENT_STOP_PORT_RELEASE_TIMEOUT_MS;
	while (Date.now() < deadline) {
		await sleep(Math.min(LAUNCH_AGENT_STOP_PORT_RELEASE_POLL_MS, deadline - Date.now()));
		if (await probePortUsage(port, probeHosts) === "free") return true;
	}
	return false;
}
async function assertGatewayPortReleasedAfterStop(env) {
	const { port, probeHosts } = await resolveLaunchAgentGatewayContext(env);
	if (port === null) return;
	cleanStaleGatewayProcessesSync(port);
	const diagnostics = await inspectPortUsage(port, { probeHosts }).catch(() => null);
	if (diagnostics?.status !== "busy") return;
	if (await waitForGatewayPortRelease(port, probeHosts)) return;
	throw new Error([`gateway port ${port} is still busy after LaunchAgent stop`, ...formatPortDiagnostics(diagnostics)].join("\n"));
}
async function stopLaunchAgent({ stdout, env, disable: persistDisable, onMutation }) {
	const serviceEnv = env ?? process.env;
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(serviceEnv);
	const serviceTarget = `${domain}/${label}`;
	const reportMutation = createGatewayLifecycleMutationReporter(onMutation);
	if (isCurrentProcessLaunchdServiceLabel(label, process.env, { allowConfiguredLabelFallback: false })) throw new Error(`Refusing to stop LaunchAgent ${label} from inside the same launchd service; run this command from an external shell.`);
	if (!persistDisable) {
		const bootout = await execLaunchctl(["bootout", serviceTarget]);
		if (bootout.code !== 0 && !isLaunchctlNotLoaded(bootout)) throw new Error(`launchctl bootout failed: ${formatLaunchctlResultDetail(bootout)}`);
		reportMutation("bootout");
		await assertGatewayPortReleasedAfterStop(serviceEnv);
		stdout.write(`${formatLine("Stopped LaunchAgent", serviceTarget)}\n`);
		return;
	}
	const disableResult = await execLaunchctl(["disable", serviceTarget]);
	if (disableResult.code !== 0) {
		await bootoutLaunchAgentOrThrow({
			serviceTarget,
			stdout,
			warning: `launchctl disable failed; used bootout fallback and left service unloaded: ${formatLaunchctlResultDetail(disableResult)}`,
			onMutation: () => reportMutation("disable-bootout")
		});
		await assertGatewayPortReleasedAfterStop(serviceEnv);
		stdout.write(`${formatLine("Stopped LaunchAgent (degraded)", serviceTarget)}\n`);
		return;
	}
	reportMutation("disable");
	const stop = await execLaunchctl(["stop", label]);
	if (stop.code !== 0 && !isLaunchctlNotLoaded(stop)) {
		await bootoutLaunchAgentOrThrow({
			serviceTarget,
			stdout,
			warning: `launchctl stop failed; used bootout fallback and left service unloaded: ${formatLaunchctlResultDetail(stop)}`,
			onMutation: () => reportMutation("disable-bootout")
		});
		await assertGatewayPortReleasedAfterStop(serviceEnv);
		stdout.write(`${formatLine("Stopped LaunchAgent (degraded)", serviceTarget)}\n`);
		return;
	}
	reportMutation("disable-stop");
	const stopState = await waitForLaunchAgentStopped(serviceTarget);
	if (stopState.state !== "stopped" && stopState.state !== "not-loaded") {
		await bootoutLaunchAgentOrThrow({
			serviceTarget,
			stdout,
			warning: stopState.state === "unknown" ? `launchctl print could not confirm stop; used bootout fallback and left service unloaded: ${stopState.detail ?? "unknown error"}` : "launchctl stop did not fully stop the service; used bootout fallback and left service unloaded",
			onMutation: () => reportMutation("disable-bootout")
		});
		await assertGatewayPortReleasedAfterStop(serviceEnv);
		stdout.write(`${formatLine("Stopped LaunchAgent (degraded)", serviceTarget)}\n`);
		return;
	}
	await assertGatewayPortReleasedAfterStop(serviceEnv);
	stdout.write(`${formatLine("Stopped LaunchAgent", serviceTarget)}\n`);
}
async function parkCurrentLaunchAgentForMaintenance(params = {}) {
	const serviceEnv = params.env ?? process.env;
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(serviceEnv);
	if (!isCurrentProcessLaunchdServiceLabel(label, process.env, { allowConfiguredLabelFallback: false })) return false;
	const serviceTarget = `${domain}/${label}`;
	const disable = await execLaunchctl(["disable", serviceTarget]);
	if (disable.code !== 0) throw new Error(`launchctl disable failed while parking ${serviceTarget}: ${formatLaunchctlResultDetail(disable)}`);
	const handoff = scheduleDetachedLaunchdMaintenancePark({
		env: serviceEnv,
		waitForPid: process.pid
	});
	const handoffError = !handoff.ok ? handoff.error : await handoff.value ? void 0 : "helper failed to spawn";
	if (handoffError) {
		const rollback = await execLaunchctl(["enable", serviceTarget]);
		const rollbackDetail = rollback.code === 0 ? "restored launchd enable state" : `launchctl enable rollback failed: ${formatLaunchctlResultDetail(rollback)}`;
		throw new Error(`launchd maintenance park handoff failed: ${handoffError}; ${rollbackDetail}`);
	}
	return true;
}
async function writeLaunchAgentPlist({ env, programArguments, workingDirectory, environment, description, stdout, warn }) {
	const label = resolveLaunchAgentLabel(env);
	await assertNoSystemLaunchDaemonOwnership(label);
	const { logDir, stdoutPath } = resolveGatewaySupervisorLogPaths(env, { platform: "darwin" });
	await ensureSecureDirectory(logDir);
	const domain = resolveGuiDomain();
	for (const legacyLabel of resolveLegacyGatewayLaunchAgentLabels(env.OPENCLAW_PROFILE)) {
		const legacyPlistPath = resolveLaunchAgentPlistPathForLabel(env, legacyLabel);
		await execLaunchctl([
			"bootout",
			domain,
			legacyPlistPath
		]);
		await execLaunchctl(["unload", legacyPlistPath]);
		try {
			await fs.unlink(legacyPlistPath);
		} catch {}
	}
	const plistPath = resolveLaunchAgentPlistPathForLabel(env, label);
	const home = toPosixPath(resolveHomeDir(env));
	const libraryDir = path.posix.join(home, "Library");
	await ensureSecureDirectory(home);
	await ensureSecureDirectory(libraryDir);
	await ensureSecureDirectory(path.dirname(plistPath));
	await ensureLaunchAgentEnvironmentDirectories(environment);
	const prepared = await prepareLaunchAgentProgramArguments({
		env,
		label,
		programArguments,
		environment,
		stdout,
		warn
	});
	await publishLaunchAgentPlist({
		label,
		plistPath,
		contents: buildLaunchAgentPlist({
			label,
			comment: resolveGatewayServiceDescription({
				env,
				environment,
				description
			}),
			programArguments: prepared.programArguments,
			workingDirectory,
			stdoutPath,
			stderrPath: LAUNCH_AGENT_STDERR_PATH,
			environment: prepared.inlineEnvironment
		})
	});
	return {
		plistPath,
		stdoutPath
	};
}
async function stageLaunchAgent({ stdout, ...args }) {
	const { plistPath, stdoutPath } = await writeLaunchAgentPlist({
		...args,
		stdout
	});
	writeFormattedLines(stdout, [{
		label: "Staged LaunchAgent",
		value: plistPath
	}, {
		label: "Logs",
		value: stdoutPath
	}], { leadingBlankLine: true });
	return { plistPath };
}
async function activateLaunchAgent(params) {
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(params.env);
	await assertNoSystemLaunchDaemonOwnership(label);
	await execLaunchctl([
		"bootout",
		domain,
		params.plistPath
	]);
	await execLaunchctl(["unload", params.plistPath]);
	await bootstrapLaunchAgentOrThrow({
		domain,
		serviceTarget: `${domain}/${label}`,
		plistPath: params.plistPath,
		actionHint: "openclaw gateway install --force"
	});
}
async function installLaunchAgent(args) {
	const { plistPath, stdoutPath } = await writeLaunchAgentPlist(args);
	await activateLaunchAgent({
		env: args.env,
		plistPath
	});
	writeFormattedLines(args.stdout, [{
		label: "Installed LaunchAgent",
		value: plistPath
	}, {
		label: "Logs",
		value: stdoutPath
	}], { leadingBlankLine: true });
	return { plistPath };
}
async function rewriteLaunchAgentPlistForRestart({ env, label, plistPath, stdout, warn }) {
	const existing = await readLaunchAgentProgramArgumentsFromFile(plistPath, resolveLaunchAgentEnvironmentReadOptions(env, label));
	if (!existing?.programArguments.length) return false;
	const { logDir, stdoutPath } = resolveGatewaySupervisorLogPaths(env, { platform: "darwin" });
	await ensureSecureDirectory(logDir);
	const serviceDescription = resolveGatewayServiceDescription({
		env,
		environment: existing.environment
	});
	const prepared = await prepareLaunchAgentProgramArguments({
		env,
		label,
		programArguments: existing.programArguments,
		environment: existing.environment,
		stdout,
		warn
	});
	const plist = buildLaunchAgentPlist({
		label,
		comment: serviceDescription,
		programArguments: prepared.programArguments,
		workingDirectory: existing.workingDirectory,
		stdoutPath,
		stderrPath: LAUNCH_AGENT_STDERR_PATH,
		environment: prepared.inlineEnvironment
	});
	if (await fs.readFile(plistPath, "utf8").catch(() => "") === plist) {
		await ensureLaunchAgentPlistReadable(plistPath);
		return false;
	}
	await publishLaunchAgentPlist({
		label,
		plistPath,
		contents: plist
	});
	return true;
}
async function ensureLaunchAgentLoadedAfterFailure(params) {
	if ((await execLaunchctl(["print", params.serviceTarget])).code === 0) return;
	try {
		await bootstrapLaunchAgentOrThrow({
			domain: params.domain,
			serviceTarget: params.serviceTarget,
			plistPath: params.plistPath,
			actionHint: "openclaw gateway start",
			onMutation: params.onMutation
		});
	} catch {}
}
async function startLaunchAgent({ stdout, env, onMutation }) {
	const serviceEnv = env ?? process.env;
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(serviceEnv);
	const plistPath = resolveLaunchAgentPlistPath(serviceEnv);
	const serviceTarget = `${domain}/${label}`;
	const reportMutation = createGatewayLifecycleMutationReporter(onMutation);
	await assertNoSystemLaunchDaemonOwnership(label);
	const enabled = (await execLaunchctl(["enable", serviceTarget])).code === 0;
	if (enabled) reportMutation("enable");
	const start = await execLaunchctl(["kickstart", serviceTarget]);
	if (start.code === 0) reportMutation("kickstart");
	else if (isLaunchctlNotLoaded(start)) await bootstrapLaunchAgentOrThrow({
		domain,
		serviceTarget,
		plistPath,
		actionHint: "openclaw gateway start",
		onMutation: reportMutation,
		skipEnable: enabled
	});
	else throw new Error(`launchctl kickstart failed: ${start.stderr || start.stdout}`.trim());
	writeLaunchAgentActionLine(stdout, "Started LaunchAgent", serviceTarget);
}
async function restartLaunchAgent({ stdout, env, warn, onMutation }) {
	const serviceEnv = env ?? process.env;
	const domain = resolveGuiDomain();
	const label = resolveLaunchAgentLabel(serviceEnv);
	const plistPath = resolveLaunchAgentPlistPath(serviceEnv);
	const serviceTarget = `${domain}/${label}`;
	const reportMutation = createGatewayLifecycleMutationReporter(onMutation);
	await assertNoSystemLaunchDaemonOwnership(label);
	if (isCurrentProcessLaunchdServiceLabel(label)) {
		const plistReloadNeeded = await rewriteLaunchAgentPlistForRestart({
			env: serviceEnv,
			label,
			plistPath,
			stdout,
			warn
		});
		const handoff = scheduleDetachedLaunchdRestartHandoff({
			env: serviceEnv,
			mode: plistReloadNeeded ? "reload" : "kickstart",
			waitForPid: process.pid
		});
		if (!handoff.ok) throw new Error(`launchd restart handoff failed: ${handoff.error}`);
		reportMutation(plistReloadNeeded ? "handoff-reload" : "handoff-kickstart");
		writeLaunchAgentActionLine(stdout, "Scheduled LaunchAgent restart", serviceTarget);
		return { outcome: "scheduled" };
	}
	const { port: cleanupPort, probeHosts } = await resolveLaunchAgentGatewayContext(serviceEnv);
	if (cleanupPort !== null) {
		cleanStaleGatewayProcessesSync(cleanupPort, { resolveProtectedPid: () => readLaunchAgentPidForCleanupSync(serviceTarget) });
		const diagnostics = await inspectPortUsage(cleanupPort, { probeHosts }).catch(() => null);
		if (diagnostics?.status === "busy") {
			const managedPid = (await readLaunchAgentRuntime(serviceEnv)).pid;
			if (!(managedPid !== void 0 && diagnostics.listeners.length > 0 && diagnostics.listeners.every((listener) => listener.pid === managedPid))) throw new Error([`gateway port ${cleanupPort} is busy but is not verifiably owned by LaunchAgent ${label}`, ...formatPortDiagnostics(diagnostics)].join("\n"));
		}
	}
	const plistReloadNeeded = await rewriteLaunchAgentPlistForRestart({
		env: serviceEnv,
		label,
		plistPath,
		stdout,
		warn
	});
	if ((await execLaunchctl(["enable", serviceTarget])).code === 0) reportMutation("enable");
	if (plistReloadNeeded) {
		const bootout = await execLaunchctl(["bootout", serviceTarget]);
		if (bootout.code !== 0 && !isLaunchctlNotLoaded(bootout)) throw new Error(`launchctl bootout failed: ${formatLaunchctlResultDetail(bootout)}`);
		if (bootout.code === 0) reportMutation("bootout");
		await bootstrapLaunchAgentOrThrow({
			domain,
			serviceTarget,
			plistPath,
			actionHint: "openclaw gateway restart",
			onMutation: reportMutation
		});
		writeLaunchAgentActionLine(stdout, "Restarted LaunchAgent", serviceTarget);
		return { outcome: "completed" };
	}
	const start = await execLaunchctl([
		"kickstart",
		"-k",
		serviceTarget
	]);
	if (start.code === 0) {
		reportMutation("kickstart");
		writeLaunchAgentActionLine(stdout, "Restarted LaunchAgent", serviceTarget);
		return { outcome: "completed" };
	}
	if (!isLaunchctlNotLoaded(start)) {
		await ensureLaunchAgentLoadedAfterFailure({
			domain,
			serviceTarget,
			plistPath,
			onMutation: reportMutation
		});
		throw new Error(`launchctl kickstart failed: ${start.stderr || start.stdout}`.trim());
	}
	await bootstrapLaunchAgentOrThrow({
		domain,
		serviceTarget,
		plistPath,
		actionHint: "openclaw gateway restart",
		onMutation: reportMutation
	});
	writeLaunchAgentActionLine(stdout, "Restarted LaunchAgent", serviceTarget);
	return { outcome: "completed" };
}
//#endregion
export { startLaunchAgent as _, installLaunchAgent as a, parkCurrentLaunchAgentForMaintenance as c, readLaunchAgentProgramArguments as d, readLaunchAgentRuntime as f, stageLaunchAgent as g, restartLaunchAgent as h, formatLaunchAgentGuiSessionError as i, parseLaunchctlListOpenClawUpdateJobs as l, resolveLaunchAgentPlistPath as m, disableOpenClawUpdateLaunchdJob as n, isLaunchAgentLoaded as o, repairLaunchAgentBootstrap as p, findStaleOpenClawUpdateLaunchdJobs as r, launchAgentPlistExists as s, disableCurrentOpenClawUpdateLaunchdJob as t, parseLaunchctlPrint as u, stopLaunchAgent as v, uninstallLaunchAgent as y };
