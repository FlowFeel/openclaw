import { describe, expect, it } from "vitest";
import {
  createInitialSessionCwdState,
  extractDirectChdirTarget,
  resolveEffectiveCwd,
} from "./exec-cwd-state.js";

describe("exec-cwd-state (Tier 1 Pure Invariants)", () => {
  const root = "/home/ubuntu/workspace";

  it("initializes with active CWD matching workspace root", () => {
    const state = createInitialSessionCwdState(root);
    expect(state.activeCwd).toBe(root);
    expect(state.workspaceRoot).toBe(root);
    expect(state.history).toEqual([root]);
  });

  it("inherits active CWD when workdir and cd command are omitted", () => {
    const state = createInitialSessionCwdState(root);
    const result = resolveEffectiveCwd(state, undefined, "pnpm test");
    expect(result.kind).toBe("inherited");
    expect(result.effectiveCwd).toBe(root);
  });

  it("respects explicit workdir parameter over sticky CWD without mutating state", () => {
    const state = createInitialSessionCwdState(root);
    const result = resolveEffectiveCwd(state, "packages/core", "pnpm build");
    expect(result.kind).toBe("explicit");
    expect(result.effectiveCwd).toBe("/home/ubuntu/workspace/packages/core");
  });

  it("detects direct cd commands and computes mutated sticky state", () => {
    const state = createInitialSessionCwdState(root);
    const result = resolveEffectiveCwd(state, undefined, "cd src/infra");
    expect(result.kind).toBe("mutated");
    if (result.kind === "mutated") {
      expect(result.effectiveCwd).toBe("/home/ubuntu/workspace/src/infra");
      expect(result.nextState.activeCwd).toBe("/home/ubuntu/workspace/src/infra");
      expect(result.nextState.history).toEqual([root, "/home/ubuntu/workspace/src/infra"]);
    }
  });

  it("extracts clean cd target from quoted or spaced commands", () => {
    expect(extractDirectChdirTarget("cd 'my dir/sub'")).toBe("my dir/sub");
    expect(extractDirectChdirTarget('cd "path/to/target"')).toBe("path/to/target");
    expect(extractDirectChdirTarget("cd /var/log && ls")).toBeNull();
  });
});
