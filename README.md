# NextDNS for OpenClaw

A read-only NextDNS integration for OpenClaw.

This plugin allows OpenClaw agents to inspect recent DNS activity, search DNS logs, and retrieve domain analytics from a NextDNS profile using the NextDNS API.

## Features

The plugin provides three OpenClaw tools:

- `nextdns_logs` - View recent DNS requests, including blocked requests.
- `nextdns_search` - Search recent DNS activity for a domain or text.
- `nextdns_top_domains` - Retrieve domain analytics from NextDNS.

## Requirements

- OpenClaw with plugin API support
- A NextDNS account
- A NextDNS API key
- Your NextDNS Profile ID

## Configuration

The plugin reads credentials from these environment variables:

- `NEXTDNS_API_KEY`
- `NEXTDNS_PROFILE_ID`

### Windows PowerShell

Set the variables permanently for your Windows user:

```powershell
[Environment]::SetEnvironmentVariable("NEXTDNS_PROFILE_ID", "YOUR_PROFILE_ID", "User")
[Environment]::SetEnvironmentVariable("NEXTDNS_API_KEY", "YOUR_API_KEY", "User")
```

Restart the OpenClaw gateway after setting the variables.

## Example requests

You can ask OpenClaw:

- Show me the 20 most recent NextDNS requests.
- Show me recently blocked DNS requests.
- Search my recent NextDNS activity for discord.com.
- Show me my top NextDNS domains.

## Security

Version 0.1.0 is read-only.

The plugin does not contain or store your NextDNS API key or Profile ID. Credentials are read from environment variables at runtime.

DNS logs can contain sensitive information about domains accessed by devices on your network. Only enable this plugin for OpenClaw agents you trust with this information.

Never put your API key directly into the plugin source code or prompts.

## Development

```bash
npm install
npm test
npm run plugin:validate
```

## Version

**0.1.0** - Initial public release.
