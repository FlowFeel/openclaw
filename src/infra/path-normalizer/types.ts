/**
 * Pure types for the Path Normalizer Subsystem.
 *
 * @dft
 * - A1 / A2: Pure mathematical definitions, zero I/O, deterministic.
 */

export interface PathNormalizationOptions {
  readonly workspaceRoot?: string;
  readonly allowAbsolute?: boolean;
  readonly stripWorkspacePrefix?: boolean;
  readonly defaultExtension?: string;
}

export interface NormalizedPathResult {
  readonly raw: string;
  readonly normalized: string;
  readonly isAbsolute: boolean;
  readonly isWithinWorkspace: boolean;
  readonly segments: readonly string[];
}
