import { createRequire } from "node:module";
//#region src/utils/parse-json-compat.ts
/**
* JSON and YAML parser compatibility helper for persisted config, manifests, and legacy stores.
* Strict JSON stays the fast path; JSON5 and YAML are authored fallbacks.
*/
let lazyJson5Parser;
let lazyYamlParser;
function loadJson5Parser() {
	if (lazyJson5Parser) return lazyJson5Parser;
	const loaded = createRequire(import.meta.url)("json5");
	const parser = "parse" in loaded ? loaded : loaded.default;
	if (!parser) throw new Error("json5 parser unavailable");
	lazyJson5Parser = parser;
	return parser;
}
function loadYamlParser() {
	if (lazyYamlParser) return lazyYamlParser;
	const loaded = createRequire(import.meta.url)("yaml");
	const parser = "parse" in loaded ? loaded : loaded.default;
	if (!parser) throw new Error("yaml parser unavailable");
	lazyYamlParser = parser;
	return parser;
}
/** Parses strict JSON first, then JSON5, then YAML syntax. */
function parseJsonWithJson5Fallback(raw, json5) {
	try {
		return JSON.parse(raw);
	} catch {
		try {
			return (json5 ?? loadJson5Parser()).parse(raw);
		} catch {
			return loadYamlParser().parse(raw);
		}
	}
}
//#endregion
export { parseJsonWithJson5Fallback as t };
