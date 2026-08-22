/**
 * JSON and YAML parser compatibility helper for persisted config, manifests, and legacy stores.
 * Strict JSON stays the fast path; JSON5 and YAML are authored fallbacks.
 */
import { createRequire } from "node:module";

type Json5Parser = { parse: (value: string) => unknown };
type YamlParser = { parse: (value: string) => unknown };

let lazyJson5Parser: Json5Parser | undefined;
let lazyYamlParser: YamlParser | undefined;

function loadJson5Parser(): Json5Parser {
  if (lazyJson5Parser) {
    return lazyJson5Parser;
  }
  const loaded = createRequire(import.meta.url)("json5") as Json5Parser | { default?: Json5Parser };
  const parser = "parse" in loaded ? loaded : loaded.default;
  if (!parser) {
    throw new Error("json5 parser unavailable");
  }
  lazyJson5Parser = parser;
  return parser;
}

function loadYamlParser(): YamlParser {
  if (lazyYamlParser) {
    return lazyYamlParser;
  }
  const loaded = createRequire(import.meta.url)("yaml") as YamlParser | { default?: YamlParser };
  const parser = "parse" in loaded ? loaded : loaded.default;
  if (!parser) {
    throw new Error("yaml parser unavailable");
  }
  lazyYamlParser = parser;
  return parser;
}

/** Parses strict JSON first, then JSON5, then YAML syntax. */
export function parseJsonWithJson5Fallback(raw: string, json5?: Json5Parser): unknown {
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

/** Explicitly parses YAML content. */
export function parseYamlRaw(raw: string): unknown {
  return loadYamlParser().parse(raw);
}
