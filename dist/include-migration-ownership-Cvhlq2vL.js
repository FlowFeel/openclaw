import { o as isRecord } from "./record-coerce-DHZ4bFlT.js";
import "./redact-DUpJZuMu.js";
import { i as isPathInside } from "./path-D8zNGPJM.js";
import "./utils-Bs67j6-3.js";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
//#region src/commands/doctor/shared/include-migration-ownership.ts
function containsAuthoredInclude(value) {
	if (!value || typeof value !== "object") return false;
	if (Array.isArray(value)) return value.some(containsAuthoredInclude);
	const record = value;
	return Object.hasOwn(record, "$include") || Object.values(record).some(containsAuthoredInclude);
}
/** Classify whether Doctor can safely persist a migration at one resolved config path. */
function classifyConfigPathMigrationOwnership(params) {
	const owners = (params.snapshot.includeProvenance ?? []).filter((entry) => entry.path.length <= params.configPath.length && entry.path.every((segment, index) => segment === params.configPath[index]));
	if (owners.length === 0) return { kind: "direct" };
	const targetPaths = [...new Set(owners.flatMap((owner) => owner.targetPaths ?? (owner.targetPath ? [owner.targetPath] : [])))].toSorted();
	const owner = owners[0];
	const configDir = path.dirname(path.resolve(params.snapshot.path));
	if (owners.length === 1 && owner?.path.length === 1 && owner.path[0] === params.configPath[0] && owner.kind === "single" && !owner.hasSiblingOverrides && owner.targetPath && isPathInside(configDir, path.resolve(owner.targetPath))) return {
		kind: "single-top-level-include",
		targetPath: owner.targetPath
	};
	return {
		kind: "manual",
		targetPaths
	};
}
function isSingleTopLevelIncludeMigration(params) {
	if (!isRecord(params.parsed)) return false;
	const keys = /* @__PURE__ */ new Set([...Object.keys(params.sourceConfig), ...Object.keys(params.candidate)]);
	const sourceConfig = params.sourceConfig;
	const candidate = params.candidate;
	const changed = [...keys].filter((key) => !isDeepStrictEqual(sourceConfig[key], candidate[key]));
	const changedKey = changed.length === 1 ? changed[0] : void 0;
	if (changedKey === void 0) return false;
	const authoredSection = params.parsed[changedKey];
	return isRecord(authoredSection) && Object.keys(authoredSection).length === 1 && typeof authoredSection["$include"] === "string";
}
//#endregion
export { containsAuthoredInclude as n, isSingleTopLevelIncludeMigration as r, classifyConfigPathMigrationOwnership as t };
