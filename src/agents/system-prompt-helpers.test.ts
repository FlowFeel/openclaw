// Structural unit tests for system-prompt section builders.
// Each helper is tested directly with toEqual (structural equality) rather
// than through the full assembled prompt with toContain (substring presence).
// This is the test layer enabled by SL-8 (export all helpers).
import { describe, expect, it } from "vitest";
import {
  buildExecutionBiasSection,
  buildHeartbeatSection,
  buildModelAliasesSection,
  buildReactionsSection,
  buildSilentRepliesSection,
  buildTemporalContextSection,
  buildVoiceSection,
  buildWorkspaceSection,
} from "./system-prompt.js";

describe("buildHeartbeatSection", () => {
  it("returns empty array in minimal mode", () => {
    expect(buildHeartbeatSection({ isMinimal: true, heartbeatPrompt: "ping" })).toEqual([]);
  });

  it("returns empty array when no heartbeat prompt", () => {
    expect(buildHeartbeatSection({ isMinimal: false, heartbeatPrompt: undefined })).toEqual([]);
  });

  it("returns empty array when heartbeat prompt is empty string", () => {
    expect(buildHeartbeatSection({ isMinimal: false, heartbeatPrompt: "" })).toEqual([]);
  });

  it("returns heartbeat section with HEARTBEAT_OK protocol when prompt is provided", () => {
    expect(buildHeartbeatSection({ isMinimal: false, heartbeatPrompt: "ping" })).toEqual([
      "## Heartbeats",
      "Heartbeat poll; nothing needs attention: reply exactly:",
      "HEARTBEAT_OK",
      'Attention needed: alert text only; omit "HEARTBEAT_OK".',
      "",
    ]);
  });
});

describe("buildSilentRepliesSection", () => {
  it("returns empty array in minimal mode", () => {
    expect(
      buildSilentRepliesSection({ isMinimal: true, silentReplyPromptMode: "generic" }),
    ).toEqual([]);
  });

  it("returns empty array when silent reply mode is none", () => {
    expect(buildSilentRepliesSection({ isMinimal: false, silentReplyPromptMode: "none" })).toEqual(
      [],
    );
  });

  it("returns silent reply section with NO_REPLY token in generic mode", () => {
    expect(
      buildSilentRepliesSection({ isMinimal: false, silentReplyPromptMode: "generic" }),
    ).toEqual([
      "## Silent Replies",
      "Nothing to say: entire reply exactly NO_REPLY",
      "Never append to real response or wrap in Markdown/code.",
      "",
    ]);
  });
});

describe("buildReactionsSection", () => {
  it("returns empty array when no reaction guidance", () => {
    expect(buildReactionsSection({})).toEqual([]);
  });

  it("returns minimal reactions section", () => {
    expect(
      buildReactionsSection({
        reactionGuidance: { level: "minimal", channel: "telegram" },
      }),
    ).toEqual([
      "## Reactions",
      "telegram reactions: MINIMAL.\nOnly important request/confirmation or sparse genuine sentiment.\nNever routine messages/own replies. Max ~1 per 5-10 exchanges.",
      "",
    ]);
  });

  it("returns extensive reactions section", () => {
    expect(
      buildReactionsSection({
        reactionGuidance: { level: "extensive", channel: "discord" },
      }),
    ).toEqual([
      "## Reactions",
      "discord reactions: EXTENSIVE.\nReact naturally for acknowledgment, sentiment, interesting/humorous/notable content, understanding/agreement.",
      "",
    ]);
  });
});

describe("buildTemporalContextSection", () => {
  it("returns empty array when no date or timezone", () => {
    expect(
      buildTemporalContextSection({
        userDate: undefined,
        userTimezone: undefined,
        sessionStatusAvailable: false,
      }),
    ).toEqual([]);
  });

  it("returns empty array when only date is provided", () => {
    expect(
      buildTemporalContextSection({
        userDate: "2026-08-17",
        userTimezone: undefined,
        sessionStatusAvailable: false,
      }),
    ).toEqual([]);
  });

  it("returns temporal context with date and timezone", () => {
    expect(
      buildTemporalContextSection({
        userDate: "2026-08-17",
        userTimezone: "UTC",
        sessionStatusAvailable: false,
      }),
    ).toEqual(["## Temporal Context", "Current date: 2026-08-17", "Time zone: UTC", ""]);
  });

  it("includes session_status hint when available", () => {
    expect(
      buildTemporalContextSection({
        userDate: "2026-08-17",
        userTimezone: "America/New_York",
        sessionStatusAvailable: true,
      }),
    ).toEqual([
      "## Temporal Context",
      "Current date: 2026-08-17",
      "Time zone: America/New_York",
      "For the exact current time, use `session_status`.",
      "",
    ]);
  });
});

describe("buildExecutionBiasSection", () => {
  it("returns empty array in minimal mode", () => {
    expect(buildExecutionBiasSection({ isMinimal: true })).toEqual([]);
  });

  it("returns execution bias directives in full mode", () => {
    const result = buildExecutionBiasSection({ isMinimal: false });
    expect(result).toEqual([
      "## Execution Bias",
      "- Actionable request: act now.",
      "- Non-final turn: advance with tools, or ask one safety-blocking decision.",
      "- Continue to done/real blocker; no plan-only finish when tools can act.",
      "- Weak/empty result: vary query/path/command/source, then conclude.",
      "- Mutable facts: live-check files/git/time/versions/services/processes/packages.",
      "- Final claim needs evidence or named blocker.",
      "- Long work: brief update, keep going; background/subagents when useful.",
      "",
    ]);
  });
});

describe("buildVoiceSection", () => {
  it("returns empty array in minimal mode", () => {
    expect(buildVoiceSection({ isMinimal: true, ttsHint: "Voice enabled" })).toEqual([]);
  });

  it("returns empty array when no TTS hint", () => {
    expect(buildVoiceSection({ isMinimal: false, ttsHint: undefined })).toEqual([]);
  });

  it("returns voice section with hint", () => {
    expect(buildVoiceSection({ isMinimal: false, ttsHint: "Voice (TTS) is enabled." })).toEqual([
      "## Voice (TTS)",
      "Voice (TTS) is enabled.",
      "",
    ]);
  });
});

describe("buildModelAliasesSection", () => {
  it("returns empty array in minimal mode", () => {
    expect(
      buildModelAliasesSection({ isMinimal: true, modelAliasLines: ["flash: model-1"] }),
    ).toEqual([]);
  });

  it("returns empty array when no alias lines", () => {
    expect(buildModelAliasesSection({ isMinimal: false, modelAliasLines: undefined })).toEqual([]);
  });

  it("returns empty array when alias lines is empty", () => {
    expect(buildModelAliasesSection({ isMinimal: false, modelAliasLines: [] })).toEqual([]);
  });

  it("returns model aliases section with joined lines", () => {
    expect(
      buildModelAliasesSection({
        isMinimal: false,
        modelAliasLines: ["flash: openai/gpt-4o-mini", "think: openai/o1"],
      }),
    ).toEqual([
      "## Model Aliases",
      "Model override: aliases are shortcuts for unqualified model requests. Use explicit provider/model references verbatim; do not substitute an alias or another provider.",
      "flash: openai/gpt-4o-mini\nthink: openai/o1",
      "",
    ]);
  });
});

describe("buildWorkspaceSection", () => {
  it("returns workspace section with all params", () => {
    expect(
      buildWorkspaceSection({
        displayWorkspaceDir: "/home/node/.openclaw/workspace",
        workspaceGuidance: "Single global file workspace unless explicitly told otherwise.",
        workspaceOnlyGuidance: "",
        workspaceNotes: [],
      }),
    ).toEqual([
      "## Workspace",
      "Working directory: /home/node/.openclaw/workspace",
      "Single global file workspace unless explicitly told otherwise.",
      "",
      "",
    ]);
  });

  it("includes workspace-only guidance when provided", () => {
    expect(
      buildWorkspaceSection({
        displayWorkspaceDir: "/app",
        workspaceGuidance: "Use relative paths.",
        workspaceOnlyGuidance: "tools.fs.workspaceOnly ON: stay in workspace.",
        workspaceNotes: ["Note: keep temp files in .openclaw/tmp/."],
      }),
    ).toEqual([
      "## Workspace",
      "Working directory: /app",
      "Use relative paths.",
      "tools.fs.workspaceOnly ON: stay in workspace.",
      "Note: keep temp files in .openclaw/tmp/.",
      "",
    ]);
  });
});
