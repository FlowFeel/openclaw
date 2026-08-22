import { n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { types } from "node:util";
//#region packages/ai/src/transports/host-policy.ts
function buildGuardedModelFetch(model, timeoutMs, options) {
	const host = getAiTransportHost();
	if (options !== void 0) return host.buildModelFetch(model, timeoutMs, options) ?? globalThis.fetch;
	if (timeoutMs !== void 0) return host.buildModelFetch(model, timeoutMs) ?? globalThis.fetch;
	return host.buildModelFetch(model) ?? globalThis.fetch;
}
function resolveProviderEndpoint(baseUrl) {
	return { endpointClass: getAiTransportHost().resolveProviderEndpointClass(baseUrl) };
}
function resolveProviderRequestCapabilities(input) {
	return getAiTransportHost().resolveProviderRequestCapabilities(input);
}
function resolveProviderRequestPolicyConfig(input) {
	return { headers: getAiTransportHost().resolveProviderRequestHeaders(input) };
}
function resolveModelRequestTimeoutMs(model, timeoutMs) {
	return timeoutMs ?? getAiTransportHost().resolveModelRequestTimeoutMs(model);
}
function resolveOpenAIStrictToolSetting(model, options) {
	return getAiTransportHost().resolveOpenAIStrictToolSetting(model, options);
}
function transformTransportMessages(messages, model, normalizeToolCallId, options) {
	return getAiTransportHost().transformTransportMessages(messages, model, normalizeToolCallId, options);
}
//#endregion
//#region packages/ai/src/providers/tool-schema-json-projection.ts
function isJsonValue(value) {
	if (value === null) return true;
	switch (typeof value) {
		case "boolean":
		case "string": return true;
		case "number": return Number.isFinite(value);
		case "object":
			if (Array.isArray(value)) return value.every(isJsonValue);
			return Object.values(value).every(isJsonValue);
		default: return false;
	}
}
function isJsonObject(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isNonFiniteNumberValue(value) {
	if (typeof value === "number") return !Number.isFinite(value);
	if (value === null || typeof value !== "object" || !types.isNumberObject(value)) return false;
	return !Number.isFinite(Number.prototype.valueOf.call(value));
}
function serializeToolInputSchema(value, path) {
	const nonFiniteNumber = { path: null };
	const paths = /* @__PURE__ */ new WeakMap();
	let isRoot = true;
	let text;
	try {
		text = JSON.stringify(value, function(key, entry) {
			const holderPath = paths.get(this);
			const entryPath = isRoot ? path : holderPath === void 0 ? `${path}.${key}` : Array.isArray(this) ? `${holderPath}[${key}]` : `${holderPath}.${key}`;
			isRoot = false;
			if (nonFiniteNumber.path === null && isNonFiniteNumberValue(entry)) nonFiniteNumber.path = entryPath;
			else if (entry && typeof entry === "object") paths.set(entry, entryPath);
			return entry;
		});
	} catch {
		return {
			schema: {},
			violations: [`${path} is not JSON-serializable`]
		};
	}
	if (!text) return {
		schema: {},
		violations: [`${path} is not JSON-serializable`]
	};
	if (nonFiniteNumber.path !== null) return {
		schema: {},
		violations: [`${nonFiniteNumber.path} is not JSON-serializable`]
	};
	const parsed = JSON.parse(text);
	if (!isJsonValue(parsed)) return {
		schema: {},
		violations: [`${path} is not a JSON value`]
	};
	return {
		schema: parsed,
		violations: []
	};
}
const schemaMapKeywords = /* @__PURE__ */ new Set([
	"$defs",
	"definitions",
	"dependencies",
	"dependentSchemas",
	"patternProperties",
	"properties"
]);
function findDynamicSchemaKeywordViolations(schema, path) {
	if (Array.isArray(schema)) return schema.flatMap((entry, index) => findDynamicSchemaKeywordViolations(entry, `${path}[${index}]`));
	if (!isJsonObject(schema)) return [];
	const violations = [];
	for (const key of ["$dynamicRef", "$dynamicAnchor"]) if (key in schema) violations.push(`${path}.${key}`);
	for (const [key, value] of Object.entries(schema)) {
		if (!value || typeof value !== "object") continue;
		if (schemaMapKeywords.has(key) && isJsonObject(value)) for (const [schemaName, childSchema] of Object.entries(value)) violations.push(...findDynamicSchemaKeywordViolations(childSchema, `${path}.${key}.${schemaName}`));
		else violations.push(...findDynamicSchemaKeywordViolations(value, `${path}.${key}`));
	}
	return violations;
}
/** Projects one runtime tool input schema to JSON and reports runtime incompatibilities. */
function projectRuntimeToolInputSchema(schema, path = "parameters") {
	const projection = serializeToolInputSchema(schema, path);
	const violations = [...projection.violations];
	if (!isJsonObject(projection.schema)) violations.push(`${path} must be a JSON object schema`);
	else if (projection.schema.type !== void 0 && projection.schema.type !== "object") violations.push(`${path}.type must be "object"`);
	violations.push(...findDynamicSchemaKeywordViolations(projection.schema, path));
	return {
		schema: projection.schema,
		violations
	};
}
//#endregion
export { resolveProviderEndpoint as a, transformTransportMessages as c, resolveOpenAIStrictToolSetting as i, buildGuardedModelFetch as n, resolveProviderRequestCapabilities as o, resolveModelRequestTimeoutMs as r, resolveProviderRequestPolicyConfig as s, projectRuntimeToolInputSchema as t };
