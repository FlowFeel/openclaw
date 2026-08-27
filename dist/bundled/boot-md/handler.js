import { r as readRegularFile } from "../../regular-file-jv7y-frB.js";
import { r as formatErrorMessage } from "../../errors-D-7D3ZtF.js";
import { r as defaultRuntime } from "../../runtime-DOr96aVu.js";
import { i as listAgentIds, u as resolveAgentWorkspaceDir } from "../../agent-scope-config-Dusa8eSA.js";
import { f as resolveAgentIdFromSessionKey } from "../../session-key-DtTE9-Tg.js";
import "../../regular-file-8uj3r-Aa.js";
import { t as createSubsystemLogger } from "../../subsystem-Cr19cPPQ.js";
import { a as OPENCLAW_RUNTIME_CONTEXT_NOTICE, n as INTERNAL_RUNTIME_CONTEXT_END, s as escapeInternalRuntimeContextDelimiters, t as INTERNAL_RUNTIME_CONTEXT_BEGIN } from "../../internal-runtime-context-s8_TwHnQ.js";
import { n as SILENT_REPLY_TOKEN } from "../../tokens-CMI0yx54.js";
import "../../agent-scope-DyEposw2.js";
import { a as resolveMainSessionKey, r as resolveAgentMainSessionKey } from "../../main-session-Bjm_i_Af.js";
import { l as resolveStorePath } from "../../paths-DSnYpBD3.js";
import { Z as preserveTemporarySessionMapping } from "../../session-accessor-t3qUoTeV.js";
import { l as clearBootEchoContextForSession, u as setBootEchoContextForSession } from "../../openclaw-tools-BF-TS9dq.js";
import { o as isGatewayStartupEvent } from "../../internal-hooks-glvlO_hY.js";
import { t as agentCommand } from "../../agent-command-DWGNpaP2.js";
import { t as createDefaultDeps } from "../../deps-DjEsu1aS.js";
import "../../agent-CldrsHJ6.js";
import { t as runStartupTasks } from "../../startup-tasks-B11x1pDU.js";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/gateway/boot.ts
function generateBootSessionId() {
	return `boot-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")}-${crypto.randomUUID().slice(0, 8)}`;
}
const log$1 = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function buildBootPrompt(content) {
	return [
		"You are running a boot check. Follow BOOT.md instructions exactly.",
		"",
		INTERNAL_RUNTIME_CONTEXT_BEGIN,
		OPENCLAW_RUNTIME_CONTEXT_NOTICE,
		"",
		"BOOT.md:",
		escapeInternalRuntimeContextDelimiters(content),
		INTERNAL_RUNTIME_CONTEXT_END,
		"",
		"If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
		"Use the `target` field (not `to`) for message tool destinations.",
		`After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
		`If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`
	].join("\n");
}
function resolveBootSessionKey(sessionKey) {
	return `agent:${resolveAgentIdFromSessionKey(sessionKey)}:boot`;
}
const MAX_BOOT_FILE_BYTES = 16 * 1024 * 1024;
async function loadBootFile(workspaceDir) {
	const bootPath = path.join(workspaceDir, BOOT_FILENAME);
	let buffer;
	try {
		const resolvedPath = await fs.realpath(bootPath);
		({buffer} = await readRegularFile({
			filePath: resolvedPath,
			maxBytes: MAX_BOOT_FILE_BYTES
		}));
	} catch (err) {
		if (err.code === "ENOENT") return { status: "missing" };
		throw err;
	}
	const trimmed = buffer.toString("utf-8").trim();
	if (!trimmed) return { status: "empty" };
	return {
		status: "ok",
		content: trimmed
	};
}
async function runBootOnce(params) {
	const bootRuntime = {
		log: () => {},
		error: (message) => log$1.error(String(message)),
		exit: defaultRuntime.exit
	};
	let result;
	try {
		result = await loadBootFile(params.workspaceDir);
	} catch (err) {
		const message = formatErrorMessage(err);
		log$1.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
		return {
			status: "failed",
			reason: message
		};
	}
	if (result.status === "missing" || result.status === "empty") return {
		status: "skipped",
		reason: result.status
	};
	const sessionKey = resolveBootSessionKey(params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg));
	const message = buildBootPrompt(result.content ?? "");
	const sessionId = generateBootSessionId();
	const agentId = resolveAgentIdFromSessionKey(sessionKey);
	const mappingPreservation = await preserveTemporarySessionMapping({
		storePath: resolveStorePath(params.cfg.session?.store, { agentId }),
		sessionKey
	}, async () => {
		setBootEchoContextForSession(sessionKey, message);
		try {
			await agentCommand({
				message,
				sessionKey,
				sessionId,
				deliver: false,
				suppressPromptPersistence: true
			}, bootRuntime, params.deps);
			return;
		} catch (err) {
			const failure = formatErrorMessage(err);
			log$1.error(`boot: agent run failed: ${failure}`);
			return failure;
		} finally {
			clearBootEchoContextForSession(sessionKey);
		}
	});
	const agentFailure = mappingPreservation.result;
	if (mappingPreservation.snapshotFailure) log$1.debug("boot: could not snapshot session mapping", {
		sessionKey,
		error: mappingPreservation.snapshotFailure
	});
	const mappingRestoreFailure = mappingPreservation.restoreFailure;
	if (mappingRestoreFailure) log$1.error(`boot: failed to restore session mapping: ${mappingRestoreFailure}`);
	if (!agentFailure && !mappingRestoreFailure) return { status: "ran" };
	return {
		status: "failed",
		reason: [agentFailure ? `agent run failed: ${agentFailure}` : void 0, mappingRestoreFailure ? `mapping restore failed: ${mappingRestoreFailure}` : void 0].filter((part) => Boolean(part)).join("; ")
	};
}
//#endregion
//#region src/hooks/bundled/boot-md/handler.ts
const log = createSubsystemLogger("hooks/boot-md");
/** Gateway-startup hook that runs BOOT.md checks once per unique agent workspace. */
const runBootChecklist = async (event) => {
	if (!isGatewayStartupEvent(event)) return;
	if (!event.context.cfg) return;
	const cfg = event.context.cfg;
	const deps = event.context.deps ?? createDefaultDeps();
	const seenWorkspaces = /* @__PURE__ */ new Set();
	await runStartupTasks({
		tasks: listAgentIds(cfg).map((agentId) => {
			return {
				agentId,
				workspaceDir: resolveAgentWorkspaceDir(cfg, agentId)
			};
		}).filter(({ workspaceDir }) => {
			if (seenWorkspaces.has(workspaceDir)) return false;
			seenWorkspaces.add(workspaceDir);
			return true;
		}).map(({ agentId, workspaceDir }) => ({
			source: "boot-md",
			agentId,
			workspaceDir,
			run: () => runBootOnce({
				cfg,
				deps,
				workspaceDir,
				agentId
			})
		})),
		log
	});
};
//#endregion
export { runBootChecklist as default };
