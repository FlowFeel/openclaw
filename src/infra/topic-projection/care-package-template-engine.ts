/**
 * Pure Care Package Template Interpolation Engine.
 *
 * @dft
 * - Axiom A1: Zero I/O, deterministic template variable substitution.
 */

export interface CarePackageVariables {
  readonly topic_title: string;
  readonly topic_id: string | number;
  readonly group: string;
  readonly timestamp: string;
  readonly owner: string;
  readonly [key: string]: string | number;
}

/**
 * Interpolates template placeholders (e.g. `{{topic_title}}`) with provided variables.
 */
export function interpolateCarePackageTemplate(
  templateText: string,
  variables: CarePackageVariables,
): string {
  if (!templateText) {
    return "";
  }

  return templateText.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      const val = variables[key];
      return val !== undefined && val !== null ? String(val) : "";
    }
    return match;
  });
}
