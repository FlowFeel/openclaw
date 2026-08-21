import { s as normalizeOptionalLowercaseString } from "./string-coerce-DW4mBlAt.js";
import { c as resolveUserPath } from "./home-dir-Cs7bTrwJ.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { r as LEGACY_IMPLICIT_AGENT_ID } from "./session-key-DtTE9-Tg.js";
import { n as resolveDefaultAgentWorkspaceDir } from "./workspace-default-CK-leyvS.js";
import { b as createConfigIO } from "./io-DCw4R0kD.js";
import { r as replaceConfigFile } from "./mutate-j69oSRi2.js";
import "./config-UtpOr1Uw.js";
import { t as extractFrontmatterBlock } from "./frontmatter-DPcHjFpj.js";
import { S as resolveWorkspaceTemplateSearchDirs } from "./workspace-CelKqYGr.js";
import { s as handleReset } from "./onboard-helpers-BlDftc97.js";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
//#region src/cli/gateway-cli/dev.ts
const DEV_IDENTITY_NAME = "C3-PO";
const DEV_IDENTITY_THEME = "protocol droid";
const DEV_IDENTITY_EMOJI = "🤖";
const DEV_AGENT_WORKSPACE_SUFFIX = "dev";
async function loadDevTemplate(name, fallback) {
	try {
		const templateDirs = await resolveWorkspaceTemplateSearchDirs();
		for (const templateDir of templateDirs) {
			let raw;
			try {
				raw = await fs.promises.readFile(path.join(templateDir, name), "utf-8");
			} catch (error) {
				if (error?.code === "ENOENT") continue;
				throw error;
			}
			return extractFrontmatterBlock(raw)?.body.replace(/^\s+/, "") ?? raw;
		}
	} catch {
		return fallback;
	}
	return fallback;
}
const resolveDevWorkspaceDir = (env = process.env) => {
	const baseDir = resolveDefaultAgentWorkspaceDir(env, os.homedir);
	if (normalizeOptionalLowercaseString(env.OPENCLAW_PROFILE) === "dev") return baseDir;
	return `${baseDir}-${DEV_AGENT_WORKSPACE_SUFFIX}`;
};
async function writeFileIfMissing(filePath, content) {
	try {
		await fs.promises.writeFile(filePath, content, {
			encoding: "utf-8",
			flag: "wx"
		});
	} catch (err) {
		if (err.code !== "EEXIST") throw err;
	}
}
async function ensureDevWorkspace(dir) {
	const resolvedDir = resolveUserPath(dir);
	await fs.promises.mkdir(resolvedDir, { recursive: true });
	const [agents, soul, identity, user] = await Promise.all([
		loadDevTemplate("AGENTS.dev.md", `# AGENTS.md - OpenClaw Dev Workspace\n\nDefault dev workspace for openclaw gateway --dev.\n`),
		loadDevTemplate("SOUL.dev.md", `# SOUL.md - Dev Persona\n\nProtocol droid for debugging and operations.\n`),
		loadDevTemplate("IDENTITY.dev.md", `# IDENTITY.md - Agent Identity\n\n- Name: ${DEV_IDENTITY_NAME}\n- Creature: protocol droid\n- Vibe: ${DEV_IDENTITY_THEME}\n- Emoji: ${DEV_IDENTITY_EMOJI}\n`),
		loadDevTemplate("USER.dev.md", `# USER.md - User Profile\n\n- Name:\n- Preferred address:\n- Notes:\n`)
	]);
	await writeFileIfMissing(path.join(resolvedDir, "AGENTS.md"), agents);
	await writeFileIfMissing(path.join(resolvedDir, "SOUL.md"), soul);
	await writeFileIfMissing(path.join(resolvedDir, "IDENTITY.md"), identity);
	await writeFileIfMissing(path.join(resolvedDir, "USER.md"), user);
}
async function ensureDevGatewayConfig(opts) {
	const workspace = resolveDevWorkspaceDir();
	if (opts.reset) await handleReset("full", workspace, defaultRuntime);
	const configPath = createConfigIO().configPath;
	const configExists = fs.existsSync(configPath);
	if (!opts.reset && configExists) return;
	await replaceConfigFile({
		nextConfig: {
			gateway: {
				mode: "local",
				bind: "loopback"
			},
			agents: {
				defaults: {
					workspace,
					skipBootstrap: true
				},
				entries: { dev: {
					default: true,
					workspace,
					identity: {
						name: DEV_IDENTITY_NAME,
						theme: DEV_IDENTITY_THEME,
						emoji: DEV_IDENTITY_EMOJI
					}
				} }
			}
		},
		afterWrite: { mode: "auto" },
		writeOptions: { allowedAgentRosterRemovals: [LEGACY_IMPLICIT_AGENT_ID] }
	});
	await ensureDevWorkspace(workspace);
	defaultRuntime.log(`Dev config ready: ${shortenHomePath(configPath)}`);
	defaultRuntime.log(`Dev workspace ready: ${shortenHomePath(resolveUserPath(workspace))}`);
}
//#endregion
export { ensureDevGatewayConfig };
