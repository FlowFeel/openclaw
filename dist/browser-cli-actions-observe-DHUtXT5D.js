import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { r as defaultRuntime } from "./runtime-DOr96aVu.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { t as validateJsonSchemaValue } from "./schema-validator-CySXOkZz.js";
import { t as danger } from "./globals-DHQUG86L.js";
import { i as extractAssistantText } from "./embedded-agent-utils-BYrAMdPg.js";
import { i as normalizeWhitespace, n as htmlToMarkdown, o as sanitizeHtml } from "./web-fetch-utils-CW6hCUJx.js";
import { r as prepareSimpleCompletionModelForAgent, t as completeWithPreparedSimpleCompletionModel } from "./simple-completion-runtime-CxQ3y0xz.js";
import "./string-coerce-runtime-CLK2YdzD.js";
import { n as runCommandWithRuntime } from "./cli-utils-Cr1AjnyO.js";
import "./sdk-setup-tools-ukKv3Pmz.js";
import "./core-api-mHpDP4-1.js";
import { i as validateBrowserExtractSchema, r as resolveBrowserExtractTimeoutMs, t as completeBrowserExtract } from "./browser-extract-1WMDstiI.js";
import "./core-api-5t7cSnKu.js";
import { n as callBrowserRequest, o as parseBrowserPositiveIntegerOption, t as BROWSER_TAB_REFERENCE_HELP } from "./browser-cli-shared-CXI_2ASo.js";
//#region extensions/browser/src/cli/browser-cli-actions-observe.ts
const browserCliExtractDeps = {
	completeWithPreparedSimpleCompletionModel,
	extractAssistantText,
	getRuntimeConfig,
	htmlToMarkdown,
	normalizeWhitespace,
	prepareSimpleCompletionModelForAgent,
	sanitizeHtml,
	validateJsonSchemaValue
};
function collectOption(value, previous = []) {
	return [...previous, value];
}
function parseSchemaOption(value) {
	if (!value) return;
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		throw new Error("--schema must be valid JSON.");
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("--schema must be a JSON Schema object.");
	return parsed;
}
function runBrowserObserve(action) {
	return runCommandWithRuntime(defaultRuntime, action, (err) => {
		defaultRuntime.error(danger(String(err)));
		defaultRuntime.exit(1);
	});
}
/** Registers Browser commands that observe current page state without direct input. */
function registerBrowserActionObserveCommands(browser, parentOpts) {
	browser.command("extract").description("Answer a question from the current page").argument("<question>", "Question to answer from page content").option("--target-id <id>", BROWSER_TAB_REFERENCE_HELP).option("--selector <css>", "Extract only matching page content").option("--ignore-selector <css>", "CSS selector to omit (repeatable)", collectOption, []).option("--schema <json>", "JSON Schema for structured output").option("--timeout-ms <ms>", "Overall timeout (default: 60000)", (v) => parseBrowserPositiveIntegerOption(v, "--timeout-ms")).action(async (question, opts, cmd) => {
		const parent = parentOpts(cmd);
		const profile = parent?.browserProfile;
		await runBrowserObserve(async () => {
			const query = question.trim();
			if (!query) throw new Error("question must not be empty");
			const timeoutMs = resolveBrowserExtractTimeoutMs({ timeoutMs: opts.timeoutMs });
			const deadlineAt = Date.now() + timeoutMs;
			const selector = normalizeOptionalString(opts.selector);
			const ignoreSelectors = opts.ignoreSelector.map((value) => normalizeOptionalString(value)).filter((value) => Boolean(value));
			const schema = parseSchemaOption(normalizeOptionalString(opts.schema));
			if (schema) {
				const schemaError = validateBrowserExtractSchema(schema, browserCliExtractDeps);
				if (schemaError) throw new Error(`Invalid extract schema: ${schemaError}`);
			}
			const captured = await callBrowserRequest(parent, {
				method: "POST",
				path: "/extract",
				query: profile ? { profile } : void 0,
				body: {
					targetId: normalizeOptionalString(opts.targetId),
					timeoutMs,
					...selector ? { selector } : {},
					...ignoreSelectors.length > 0 ? { ignoreSelectors } : {}
				}
			}, { timeoutMs });
			if (!captured.ok || typeof captured.html !== "string") throw new Error(captured.message || "Browser extract page capture failed");
			const result = await completeBrowserExtract({
				html: captured.html,
				url: captured.url,
				query,
				schema,
				schemaPrevalidated: Boolean(schema),
				agentId: "main",
				deadlineAt,
				deps: browserCliExtractDeps
			});
			if (result.details?.ok === false) {
				const text = result.content.find((block) => block.type === "text")?.text;
				throw new Error(text || "Browser extract failed");
			}
			if (parent?.json) {
				defaultRuntime.writeJson(result);
				return;
			}
			const text = result.content.find((block) => block.type === "text")?.text;
			if (text) defaultRuntime.log(text);
		});
	});
	browser.command("console").description("Get recent console messages").option("--level <level>", "Filter by level (error, warn, info)").option("--target-id <id>", BROWSER_TAB_REFERENCE_HELP).action(async (opts, cmd) => {
		const parent = parentOpts(cmd);
		const profile = parent?.browserProfile;
		await runBrowserObserve(async () => {
			const result = await callBrowserRequest(parent, {
				method: "GET",
				path: "/console",
				query: {
					level: normalizeOptionalString(opts.level),
					targetId: normalizeOptionalString(opts.targetId),
					profile
				}
			}, { timeoutMs: 2e4 });
			if (parent?.json) {
				defaultRuntime.writeJson(result);
				return;
			}
			defaultRuntime.writeJson(result.messages);
		});
	});
	browser.command("pdf").description("Save page as PDF").option("--target-id <id>", BROWSER_TAB_REFERENCE_HELP).action(async (opts, cmd) => {
		const parent = parentOpts(cmd);
		const profile = parent?.browserProfile;
		await runBrowserObserve(async () => {
			const result = await callBrowserRequest(parent, {
				method: "POST",
				path: "/pdf",
				query: profile ? { profile } : void 0,
				body: { targetId: normalizeOptionalString(opts.targetId) }
			}, { timeoutMs: 2e4 });
			if (parent?.json) {
				defaultRuntime.writeJson(result);
				return;
			}
			defaultRuntime.log(`PDF: ${shortenHomePath(result.path)}`);
		});
	});
	browser.command("responsebody").description("Wait for a network response and return its body").argument("<url>", "URL (exact, substring, or glob like **/api)").option("--target-id <id>", BROWSER_TAB_REFERENCE_HELP).option("--timeout-ms <ms>", "How long to wait for the response (default: 20000)", (v) => parseBrowserPositiveIntegerOption(v, "--timeout-ms")).option("--max-chars <n>", "Max body chars to return (default: 200000)", (v) => parseBrowserPositiveIntegerOption(v, "--max-chars")).action(async (url, opts, cmd) => {
		const parent = parentOpts(cmd);
		const profile = parent?.browserProfile;
		await runBrowserObserve(async () => {
			const timeoutMs = Number.isFinite(opts.timeoutMs) ? opts.timeoutMs : void 0;
			const maxChars = Number.isFinite(opts.maxChars) ? opts.maxChars : void 0;
			const result = await callBrowserRequest(parent, {
				method: "POST",
				path: "/response/body",
				query: profile ? { profile } : void 0,
				body: {
					url,
					targetId: normalizeOptionalString(opts.targetId),
					timeoutMs,
					maxChars
				}
			}, { timeoutMs: timeoutMs ?? 2e4 });
			if (parent?.json) {
				defaultRuntime.writeJson(result);
				return;
			}
			defaultRuntime.log(result.response.body);
		});
	});
}
//#endregion
export { registerBrowserActionObserveCommands };
