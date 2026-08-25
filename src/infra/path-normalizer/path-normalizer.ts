/**
 * Pure Path Normalizer for Tool & Habitat Parameters.
 * Normalizes user/LLM path inputs, cleanses prefixes, and guarantees workspace bounds.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic string transformations.
 */

import type { NormalizedPathResult, PathNormalizationOptions } from "./types.js";

/**
 * Strips file:// protocol and normalizes backslashes to forward slashes.
 */
export function cleanRawPathString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("file://")) {
    cleaned = cleaned.slice(7);
  }
  return cleaned.replace(/\\+/g, "/");
}

/**
 * Normalizes a path string into canonical, clean relative or absolute format.
 */
export function normalizeToolPath(
  input: string,
  options: PathNormalizationOptions = {},
): NormalizedPathResult {
  const rawCleaned = cleanRawPathString(input);
  const isAbsolute = rawCleaned.startsWith("/");

  // Split and collapse redundant / and . segments
  const rawParts = rawCleaned.split("/").filter((p) => p !== "" && p !== ".");
  const stack: string[] = [];

  let escapedWorkspace = false;
  for (const part of rawParts) {
    if (part === "..") {
      if (stack.length > 0 && stack[stack.length - 1] !== "..") {
        stack.pop();
      } else {
        escapedWorkspace = true;
        stack.push("..");
      }
    } else {
      stack.push(part);
    }
  }

  // Handle redundant leading 'workspace' segment if model passed /workspace/foo.md
  if (
    (options.stripWorkspacePrefix ?? true) &&
    stack.length > 0 &&
    (stack[0]?.toLowerCase() === "workspace" || stack[0]?.toLowerCase() === "inferno-labs")
  ) {
    stack.shift();
  }

  let normalized = stack.join("/");
  if (isAbsolute && (options.allowAbsolute ?? false)) {
    normalized = "/" + normalized;
  }

  if (options.defaultExtension && !normalized.includes(".")) {
    const ext = options.defaultExtension.startsWith(".")
      ? options.defaultExtension
      : "." + options.defaultExtension;
    normalized += ext;
  }

  return {
    raw: input,
    normalized,
    isAbsolute,
    isWithinWorkspace: !escapedWorkspace && !stack.includes(".."),
    segments: Object.freeze(stack),
  };
}
