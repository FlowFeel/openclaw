import { t as formatCliCommand } from "./command-format-C5kg4XY_.js";
import { l as readConfigFileSnapshot } from "./io-DCw4R0kD.js";
import { n as formatConfigIssueLines } from "./issue-format-NBZpPOU4.js";
import { n as isPluginPackagingRuntimeOutputInvalidConfigSnapshot } from "./recovery-policy-CsUZ07YX.js";
import "./config-UtpOr1Uw.js";
import { n as formatPluginPackagingRuntimeOutputRecoveryHint } from "./config-recovery-hints-BqY7smyo.js";
import { c as formatPluginCompatibilityNotice, r as buildPluginCompatibilitySnapshotNotices } from "./status-DIL63tje.js";
//#region src/commands/config-validation.ts
/** Read the config file and exit through the runtime when validation fails. */
async function requireValidConfigFileSnapshot(runtime, opts) {
	const snapshot = await readConfigFileSnapshot(opts?.skipPluginValidation ? { skipPluginValidation: true } : void 0);
	if (snapshot.exists && !snapshot.valid) {
		const issues = snapshot.issues.length > 0 ? formatConfigIssueLines(snapshot.issues, "-").join("\n") : "Unknown validation issue.";
		runtime.error(`OpenClaw config is invalid: ${snapshot.path}\n${issues}`);
		runtime.error(isPluginPackagingRuntimeOutputInvalidConfigSnapshot(snapshot) ? `Fix: ${formatPluginPackagingRuntimeOutputRecoveryHint()}` : `Fix: ${formatCliCommand("openclaw doctor --fix")}`);
		runtime.error(`Inspect: ${formatCliCommand("openclaw config validate")}`);
		runtime.exit(1);
		return null;
	}
	if (opts?.includeCompatibilityAdvisory !== true) return snapshot;
	const compatibility = buildPluginCompatibilitySnapshotNotices({ config: snapshot.config });
	if (compatibility.length > 0) runtime.log([
		`Plugin compatibility: ${compatibility.length} notice${compatibility.length === 1 ? "" : "s"}.`,
		...compatibility.slice(0, 3).map((notice) => `- ${formatPluginCompatibilityNotice(notice)}`),
		...compatibility.length > 3 ? [`- ... +${compatibility.length - 3} more`] : [],
		`Review: ${formatCliCommand("openclaw doctor")}`
	].join("\n"));
	return snapshot;
}
/** Read and return a valid OpenClaw config, or null after reporting validation errors. */
async function requireValidConfigSnapshot(runtime, opts) {
	return (await requireValidConfigFileSnapshot(runtime, opts))?.config ?? null;
}
//#endregion
export { requireValidConfigSnapshot as n, requireValidConfigFileSnapshot as t };
