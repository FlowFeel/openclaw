import { describe, expect, it } from "vitest";
import {
  createInitialSessionTopicState,
  resolveTargetWithTopic,
  updateSessionTopic,
} from "./session-topic-resolver.js";

describe("session-topic-resolver (Tier 1 Pure Invariants)", () => {
  const root = "/home/ubuntu/workspace";

  it("defaults to workspace root when no topic or target is provided", () => {
    const state = createInitialSessionTopicState();
    const result = resolveTargetWithTopic(state, undefined, root);
    expect(result.kind).toBe("workspace_default");
    expect(result.target).toBe(root);
  });

  it("resolves target from active topic register ($_) when target is omitted", () => {
    let state = createInitialSessionTopicState();
    state = updateSessionTopic(state, "src/infra/shannon");

    const result = resolveTargetWithTopic(state, undefined, root);
    expect(result.kind).toBe("topic");
    expect(result.target).toBe("/home/ubuntu/workspace/src/infra/shannon");
    if (result.kind === "topic") {
      expect(result.inferred).toBe(true);
    }
  });

  it("prioritizes explicit target over active topic", () => {
    let state = createInitialSessionTopicState();
    state = updateSessionTopic(state, "src/infra/shannon");

    const result = resolveTargetWithTopic(state, "docs/README.md", root);
    expect(result.kind).toBe("explicit");
    expect(result.target).toBe("docs/README.md");
  });
});
