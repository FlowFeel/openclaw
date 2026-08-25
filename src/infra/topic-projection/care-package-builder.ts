/**
 * Pure Topic Care Package Builder.
 * Generates deterministic Telegram pinned briefing cards and session bootstrap prompts.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic formatting.
 */

import type { CarePackageInput, CarePackageResult, TopicArchetype } from "./types.js";

const ARCHETYPE_ICONS: Record<TopicArchetype, { icon: string; hex: number; title: string }> = {
  refactor_sprint: { icon: "🛠️", hex: 0x6fb9f0, title: "Refactor Sprint" },
  incident_remediation: { icon: "🚨", hex: 0xff5c5c, title: "Incident Remediation" },
  research_spike: { icon: "🔬", hex: 0xb388ff, title: "Research Spike" },
  feature_delivery: { icon: "🚀", hex: 0x5cd67a, title: "Feature Delivery" },
};

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Builds a deterministic Care Package for a new Telegram forum topic.
 */
export function buildTopicCarePackage(input: CarePackageInput): CarePackageResult {
  const meta = ARCHETYPE_ICONS[input.archetype] ?? {
    icon: "📋",
    hex: 0x6fb9f0,
    title: input.archetype,
  };

  const tasks = input.initialTasks && input.initialTasks.length > 0
    ? input.initialTasks.map((t) => `[ ] ${t}`).join("\n")
    : "[ ] 1. Initialize topic workspace\n[ ] 2. Execute target objectives\n[ ] 3. Run verification test suite";

  const refs = input.referencePaths && input.referencePaths.length > 0
    ? input.referencePaths.map((p) => `• \`${p}\``).join("\n")
    : "• `specs/`\n• `src/infra/`";

  const telegramCardMarkdown = `📌 **CARE PACKAGE: Topic Kickoff Briefing**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **Mission**: ${input.mission}
🏷️ **Archetype**: ${meta.icon} \`${input.archetype}\`  │  ⚡ **Mode**: Pure DFT (Axioms A1/A2)

📋 **Target Coordinates**:
${refs}

✅ **Deliverables**:
${tasks}

💬 *Send instructions directly in this topic thread to collaborate.*`;

  const sessionBootstrapPrompt = `[TOPIC BOOTSTRAP FRAME: ${input.name}]
Mission: ${input.mission}
Archetype: ${input.archetype}
Invariants: Tellman A1 (Zero-I/O), Tellman A2 (Deterministic), Shannon SNR >= 85%.
References:
${refs}
Deliverables:
${tasks}
[END TOPIC BOOTSTRAP]`;

  return {
    topicName: input.name,
    telegramCardMarkdown,
    sessionBootstrapPrompt,
    iconColorHex: meta.hex,
    estimatedTokens: estimateTokens(telegramCardMarkdown) + estimateTokens(sessionBootstrapPrompt),
  };
}
