import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
function getConfig() {
    const apiKey = process.env.NEXTDNS_API_KEY;
    const profileId = process.env.NEXTDNS_PROFILE_ID;
    if (!apiKey) {
        throw new Error("NEXTDNS_API_KEY environment variable is not configured.");
    }
    if (!profileId) {
        throw new Error("NEXTDNS_PROFILE_ID environment variable is not configured.");
    }
    return { apiKey, profileId };
}
async function nextDnsGet(path, params = {}) {
    const { apiKey, profileId } = getConfig();
    const url = new URL(`https://api.nextdns.io/profiles/${encodeURIComponent(profileId)}/${path}`);
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            url.searchParams.set(key, String(value));
        }
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey,
            "Accept": "application/json",
        },
    });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(`NextDNS API returned ${response.status}: ${JSON.stringify(body)}`);
    }
    return body;
}
export default defineToolPlugin({
    id: "nextdns",
    name: "NextDNS",
    description: "Read NextDNS logs and analytics from OpenClaw.",
    tools: (tool) => [
        tool({
            name: "nextdns_logs",
            description: "Get recent DNS activity from NextDNS. Use this to inspect recent DNS requests and blocked requests.",
            parameters: Type.Object({
                limit: Type.Optional(Type.Number({
                    minimum: 10,
                    maximum: 100,
                    description: "Number of log entries to return. Minimum 10.",
                })),
                status: Type.Optional(Type.String({
                    description: 'Optional NextDNS status filter, for example "blocked".',
                })),
            }),
            execute: async ({ limit, status }) => {
                return nextDnsGet("logs", {
                    limit: limit ?? 20,
                    status,
                });
            },
        }),
        tool({
            name: "nextdns_search",
            description: "Search recent NextDNS DNS logs for a domain or text such as discord.com, youtube.com, or tiktok.",
            parameters: Type.Object({
                search: Type.String({
                    minLength: 1,
                    description: "Domain or text to search for.",
                }),
                limit: Type.Optional(Type.Number({
                    minimum: 10,
                    maximum: 100,
                    description: "Maximum number of log entries to return.",
                })),
            }),
            execute: async ({ search, limit }) => {
                return nextDnsGet("logs", {
                    search,
                    limit: limit ?? 20,
                });
            },
        }),
        tool({
            name: "nextdns_top_domains",
            description: "Get NextDNS domain analytics. Use this to identify frequently requested or blocked domains.",
            parameters: Type.Object({
                status: Type.Optional(Type.String({
                    description: 'Optional status filter such as "blocked".',
                })),
            }),
            execute: async ({ status }) => {
                return nextDnsGet("analytics/domains", {
                    status,
                });
            },
        }),
    ],
});
