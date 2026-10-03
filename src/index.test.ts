import { describe, expect, it } from "vitest";
import entry from "./index.js";
import { getToolPluginMetadata } from "openclaw/plugin-sdk/tool-plugin";

describe("nextdns", () => {
  it("declares the expected NextDNS tools", () => {
    expect(getToolPluginMetadata(entry)?.tools.map((tool) => tool.name)).toEqual([
      "nextdns_logs",
      "nextdns_search",
      "nextdns_top_domains",
    ]);
  });
});
