/**
 * @file hickey-coordinate-map.bdd.test.ts
 * @description Degree 2 BDD Behavioral Scenarios verifying Agent Discovery through Hickey Coordinate Map.
 *
 * Implements the 6 Gherkin Scenarios from `specs/hickey-coordinate-map.md`.
 *
 * @dft
 * - Scenario 1: Agent finds a key by semantic guess.
 * - Scenario 2: Agent discovers an absent key.
 * - Scenario 3: Agent enumerates a namespace.
 * - Scenario 4: Agent registers a new key.
 * - Scenario 5: Agent overwrites an existing key.
 * - Scenario 6: Agent deletes a key.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { createHickeyMapTools } from "../agents/tools/hickey-map-tools.js";
import { InMemoryHickeyMap } from "./in-memory-hickey-map.js";

describe("Hickey Coordinate Map Behavioral Scenarios (Degree 2 BDD)", () => {
  let map: InMemoryHickeyMap;
  let tools: ReturnType<typeof createHickeyMapTools>;

  beforeEach(() => {
    map = new InMemoryHickeyMap();
    // Background: Given a Hickey map with the following keys
    map.write("fin/framework/panic-not-doom", "we assume stability");
    map.write("fin/cycles/csco-watchlist", "entry price: TBD");
    map.write("fin/figures/interpretation-method", "counter-position read");
    map.write("telegram/group/123/topic/1598", "General finance");

    tools = createHickeyMapTools(map);
  });

  it("Scenario 1: Agent finds a key by semantic guess", async () => {
    const readTool = tools.find((t) => t.name === "map_read")!;

    // When the agent reads "fin/framework/panic-not-doom"
    const res = await readTool.execute("turn-1", { key: "fin/framework/panic-not-doom" });
    const payload = JSON.parse(res.content[0].text);

    // Then the map returns "we assume stability"
    expect(payload.found).toBe(true);
    expect(payload.value).toBe("we assume stability");
  });

  it("Scenario 2: Agent discovers an absent key", async () => {
    const readTool = tools.find((t) => t.name === "map_read")!;

    // When the agent reads "fin/framework/does-not-exist"
    const res = await readTool.execute("turn-2", { key: "fin/framework/does-not-exist" });
    const payload = JSON.parse(res.content[0].text);

    // Then the map returns null
    expect(payload.found).toBe(false);
    expect(payload.value).toBeNull();
    // And the agent learns that the key is wrong (absence as a signal)
  });

  it("Scenario 3: Agent enumerates a namespace", async () => {
    const listTool = tools.find((t) => t.name === "map_list_keys")!;

    // When the agent lists keys under "fin/"
    const res = await listTool.execute("turn-3", { prefix: "fin/" });
    const payload = JSON.parse(res.content[0].text);

    // Then the map returns all 3 finance keys
    expect(payload.keys.sort()).toEqual([
      "fin/cycles/csco-watchlist",
      "fin/figures/interpretation-method",
      "fin/framework/panic-not-doom",
    ]);
    expect(payload.count).toBe(3);
    // And the agent discovers the finance namespace structure without leaking other namespaces
    expect(payload.keys).not.toContain("telegram/group/123/topic/1598");
  });

  it("Scenario 4: Agent registers a new key", async () => {
    const writeTool = tools.find((t) => t.name === "map_write")!;
    const readTool = tools.find((t) => t.name === "map_read")!;
    const listTool = tools.find((t) => t.name === "map_list_keys")!;

    // When the agent writes "fin/cycles/new-entry" with value "watchlist entry"
    const writeRes = await writeTool.execute("turn-4w", {
      key: "fin/cycles/new-entry",
      value: "watchlist entry",
    });
    expect(JSON.parse(writeRes.content[0].text)).toEqual({
      written: true,
      key: "fin/cycles/new-entry",
    });

    // Then an immediate read of "fin/cycles/new-entry" returns "watchlist entry"
    const readRes = await readTool.execute("turn-4r", { key: "fin/cycles/new-entry" });
    expect(JSON.parse(readRes.content[0].text).value).toBe("watchlist entry");

    // And listing keys under "fin/cycles/" includes "fin/cycles/new-entry"
    const listRes = await listTool.execute("turn-4l", { prefix: "fin/cycles/" });
    const listPayload = JSON.parse(listRes.content[0].text);
    expect(listPayload.keys).toContain("fin/cycles/new-entry");
    expect(listPayload.keys).toContain("fin/cycles/csco-watchlist");
  });

  it("Scenario 5: Agent overwrites an existing key", async () => {
    const writeTool = tools.find((t) => t.name === "map_write")!;
    const readTool = tools.find((t) => t.name === "map_read")!;

    // When the agent writes "fin/cycles/csco-watchlist" with value "entry price: $50"
    await writeTool.execute("turn-5w", {
      key: "fin/cycles/csco-watchlist",
      value: "entry price: $50",
    });

    // Then an immediate read returns "entry price: $50"
    const readRes = await readTool.execute("turn-5r", { key: "fin/cycles/csco-watchlist" });
    expect(JSON.parse(readRes.content[0].text).value).toBe("entry price: $50");

    // And previous value is not recoverable through the map
    expect(map.read("fin/cycles/csco-watchlist")).toBe("entry price: $50");
  });

  it("Scenario 6: Agent deletes a key", async () => {
    const deleteTool = tools.find((t) => t.name === "map_delete")!;
    const readTool = tools.find((t) => t.name === "map_read")!;
    const listTool = tools.find((t) => t.name === "map_list_keys")!;

    // When the agent deletes "fin/figures/interpretation-method"
    const delRes = await deleteTool.execute("turn-6d", {
      key: "fin/figures/interpretation-method",
    });
    expect(JSON.parse(delRes.content[0].text)).toEqual({
      existed: true,
      key: "fin/figures/interpretation-method",
    });

    // Then reading "fin/figures/interpretation-method" returns null
    const readRes = await readTool.execute("turn-6r", {
      key: "fin/figures/interpretation-method",
    });
    expect(JSON.parse(readRes.content[0].text).value).toBeNull();

    // And listing keys under "fin/figures/" returns an empty array
    const listRes = await listTool.execute("turn-6l", { prefix: "fin/figures/" });
    expect(JSON.parse(listRes.content[0].text).keys).toEqual([]);
  });
});
