/**
 * Hickey Coordinate Map Tools — Agent-Addressable Key-Value Discovery & Manipulation.
 *
 * Exposes atomic, certified tools (k <= 2) for interrogating and writing to a namespaced
 * key-value surface without schemas or migrations.
 *
 * @dft
 * - Pure tool layer wrapping HickeyMap interface (A1, A2, A6).
 * - M1 (no-schema), M2 (silent-overwrite), M3 (null-on-absent), M4 (prefix-discovery).
 */

import { Type } from "typebox";
import { defaultHickeyMap, type HickeyMap } from "../../map/index.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

// ── Tool Schemas (Atomic: arity <= 2, zero base param duplication) ──

export const MapReadSchema = Type.Object(
  {
    key: Type.String({ description: "Namespaced key to read (e.g. 'fin/framework/panic-not-doom')." }),
  },
  { additionalProperties: false },
);

export const MapWriteSchema = Type.Object(
  {
    key: Type.String({ description: "Namespaced key to write (e.g. 'fin/cycles/csco-watchlist')." }),
    value: Type.String({ description: "Opaque string payload to store at key." }),
  },
  { additionalProperties: false },
);

export const MapListKeysSchema = Type.Object(
  {
    prefix: Type.Optional(
      Type.String({ description: "Namespace prefix to enumerate (e.g. 'fin/'). Defaults to ''." }),
    ),
  },
  { additionalProperties: false },
);

export const MapDeleteSchema = Type.Object(
  {
    key: Type.String({ description: "Namespaced key to remove." }),
  },
  { additionalProperties: false },
);

// ── Tool Factory ─────────────────────────────────────────────────

export function createHickeyMapTools(map: HickeyMap = defaultHickeyMap): AnyAgentTool[] {
  const mapReadTool: AnyAgentTool = {
    name: "map_read",
    label: "Map Read",
    description: "Read a value from the namespaced Hickey coordinate map. Returns null if absent.",
    parameters: MapReadSchema,
    execute: async (_toolCallId: string, params: { key: string }) => {
      const val = map.read(params.key);
      return jsonResult({
        key: params.key,
        value: val,
        found: val !== null,
      });
    },
  };

  const mapWriteTool: AnyAgentTool = {
    name: "map_write",
    label: "Map Write",
    description: "Write an opaque string value to the namespaced Hickey coordinate map. Overwrites silently.",
    parameters: MapWriteSchema,
    execute: async (_toolCallId: string, params: { key: string; value: string }) => {
      const res = map.write(params.key, params.value);
      return jsonResult(res);
    },
  };

  const mapListKeysTool: AnyAgentTool = {
    name: "map_list_keys",
    label: "Map List Keys",
    description: "Enumerate all keys under a namespace prefix in the Hickey coordinate map.",
    parameters: MapListKeysSchema,
    execute: async (_toolCallId: string, params: { prefix?: string } = {}) => {
      const prefix = params.prefix ?? "";
      const keys = map.listKeys(prefix);
      return jsonResult({
        prefix,
        keys,
        count: keys.length,
      });
    },
  };

  const mapDeleteTool: AnyAgentTool = {
    name: "map_delete",
    label: "Map Delete",
    description: "Delete a key from the namespaced Hickey coordinate map. Silent if absent.",
    parameters: MapDeleteSchema,
    execute: async (_toolCallId: string, params: { key: string }) => {
      const res = map.delete(params.key);
      return jsonResult(res);
    },
  };

  return [mapReadTool, mapWriteTool, mapListKeysTool, mapDeleteTool];
}
