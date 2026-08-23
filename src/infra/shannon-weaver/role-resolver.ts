/**
 * Abstract Document Role Resolver — Dynamic Mapping of Roles to Paths.
 *
 * Provides pure resolution of abstract document roles (identity, persona, memory, topology, index)
 * to arbitrary workspace paths via open dictionary maps, defaulting to standard habitat conventions.
 *
 * @dft
 * - Pure function (A1): No I/O, immutable record transformations.
 */

import path from "node:path";
import type { ShannonWeaverParameters } from "./types.js";

/**
 * Standard Habitat Default Role Mapping.
 */
export const DEFAULT_HABITAT_ROLE_MAPPING: Readonly<Record<string, string>> = Object.freeze({
  identity: "AGENTS.md",
  persona: "SOUL.md",
  userContext: "USER.md",
  workingMemory: "MEMORY.md",
  bootstrap: "BOOTSTRAP.md",
  channelTopology: "CHANNEL_MAP.md",
  contextIndex: "CONTEXT_INDEX.md",
});

/**
 * Pure function resolving an abstract role to a relative or absolute workspace path.
 */
export function resolveDocumentPath(
  params: ShannonWeaverParameters,
  role: string,
  fallback = `${role.toUpperCase()}.md`,
): string {
  const customMap = params.roleMapping ?? {};
  const relativeOrAbsolute = customMap[role] ?? DEFAULT_HABITAT_ROLE_MAPPING[role] ?? fallback;

  if (path.isAbsolute(relativeOrAbsolute)) {
    return relativeOrAbsolute;
  }

  return path.join(params.workspaceRoot, relativeOrAbsolute);
}

/**
 * Returns all configured roles for a given parameters record.
 */
export function listConfiguredRoles(params: ShannonWeaverParameters): Readonly<Record<string, string>> {
  return {
    ...DEFAULT_HABITAT_ROLE_MAPPING,
    ...(params.roleMapping ?? {}),
  };
}
