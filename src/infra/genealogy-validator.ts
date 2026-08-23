/**
 * Pure Genealogy Frontmatter Validator.
 *
 * Validates that design documents and war stories contain the required 7 structured YAML
 * frontmatter keys according to Phosphene invariant standards.
 *
 * @dft
 * - A1 (pure-io-separation): `validateGenealogyFrontmatter` is a pure string-to-record projection.
 * - Axiom P3.1 (genealogy-completeness): validates title, author, date, decision, rejected, rationale, verified_by.
 */

import yaml from "yaml";

export type GenealogyMetadata = {
  readonly title: string;
  readonly author: string;
  readonly date: string;
  readonly decision: string;
  readonly rejected: readonly string[];
  readonly rationale: string;
  readonly verified_by: string;
  readonly tags: readonly string[];
};

export type GenealogyValidationResult =
  | {
      readonly valid: true;
      readonly metadata: GenealogyMetadata;
    }
  | {
      readonly valid: false;
      readonly errors: readonly string[];
    };

/**
 * Extracts and validates YAML frontmatter from a markdown string.
 */
export function validateGenealogyFrontmatter(markdownContent: string): GenealogyValidationResult {
  const frontmatterMatch = markdownContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch || !frontmatterMatch[1]) {
    return {
      valid: false,
      errors: ["missing_frontmatter: Document must start with YAML frontmatter enclosed in --- delimiters"],
    };
  }

  const rawYaml = frontmatterMatch[1];
  let parsed: unknown;
  try {
    parsed = yaml.parse(rawYaml);
  } catch (err) {
    return {
      valid: false,
      errors: [`yaml_syntax_error: ${err instanceof Error ? err.message : String(err)}`],
    };
  }

  if (!parsed || typeof parsed !== "object") {
    return {
      valid: false,
      errors: ["invalid_frontmatter: YAML frontmatter must be a key-value mapping object"],
    };
  }

  const record = parsed as Record<string, unknown>;
  const errors: string[] = [];

  // Required fields check
  const requiredStringFields = ["title", "author", "date", "decision", "rationale", "verified_by"] as const;
  for (const field of requiredStringFields) {
    if (typeof record[field] !== "string" || record[field].trim().length === 0) {
      errors.push(`missing_field: ${field}`);
    }
  }

  // 'rejected' array check
  if (!Array.isArray(record.rejected) || record.rejected.length === 0) {
    errors.push("missing_field: rejected (must be a non-empty array of alternative options)");
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  const tags = Array.isArray(record.tags)
    ? record.tags.filter((t): t is string => typeof t === "string")
    : [];

  const metadata: GenealogyMetadata = {
    title: String(record.title).trim(),
    author: String(record.author).trim(),
    date: String(record.date).trim(),
    decision: String(record.decision).trim(),
    rejected: (record.rejected as unknown[]).map((r) => String(r).trim()),
    rationale: String(record.rationale).trim(),
    verified_by: String(record.verified_by).trim(),
    tags,
  };

  return {
    valid: true,
    metadata,
  };
}
