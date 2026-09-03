/**
 * Context file basename helpers — leaf module, safe to import from anywhere
 * (including oc/verify specs) without pulling the fork dependency graph.
 */

const STATIC_PERSONA_BASENAMES = new Set<string>([
  "soul.md",
  "agents.md",
  "identity.md",
  "tools.md",
  "bootstrap.md",
]);

export function contextFileBasename(pathValue: string): string {
  const slashIndex = pathValue.lastIndexOf("/");
  const basename = slashIndex === -1 ? pathValue : pathValue.slice(slashIndex + 1);
  return basename.toLowerCase().trim();
}

export function isStaticPersonaBasename(basename: string): boolean {
  return STATIC_PERSONA_BASENAMES.has(contextFileBasename(basename));
}
