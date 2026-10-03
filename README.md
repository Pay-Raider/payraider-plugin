# PayRaider Plugin & SDKs

**Add a pre-payment check to any Stellar payout flow: from code, from an AI agent, or from Claude.**

Before money moves, ask PayRaider whether the corridor is healthy enough to pay on. You get `proceed`, `caution`, `hold` or `unknown`, the reasons, and healthier alternatives.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-SDK-3178c6)
![Python](https://img.shields.io/badge/Python-SDK-3776ab)
![MCP](https://img.shields.io/badge/MCP-server-black)

Part of [PayRaider](https://github.com/Pay-Raider): [backend](https://github.com/Pay-Raider/payraider-backend) · [web app](https://github.com/Pay-Raider/payraider-app) · [contracts](https://github.com/Pay-Raider/payraider-contracts) · [mobile](https://github.com/Pay-Raider/payraider-mobile)

---

## What's inside

| Package | Path | Use it to |
| --- | --- | --- |
| **TypeScript SDK** | [`sdk/typescript`](sdk/typescript) | Call PayRaider from Node or the browser |
| **Python SDK** | [`sdk/python`](sdk/python) | Call PayRaider from Python services |
| **React SDK** | [`sdk/react`](sdk/react) | Corridor hooks and components for React apps |
| **MCP server** | [`sdk/mcp-server`](sdk/mcp-server) | Let AI agents run the check, locally (stdio) or hosted (HTTP, Docker) |
| **Claude plugin** | [`plugins/payraider`](plugins/payraider) | Run `/preflight` in Claude |

## Check a payment

**TypeScript**

```ts
import { PayRaider } from "@payraider/sdk";

const client = new PayRaider({ baseUrl: "https://<your-payraider-api>" });
const check = await client.preflight.check({
  source_asset: "USDC",
  destination_asset: "NGN",
  amount_usd: 2500,
});

if (check.decision !== "proceed") {
  console.warn(check.summary, check.alternatives);
}
```

**Python**

```python
from payraider import PayRaider

async with PayRaider(base_url="https://<your-payraider-api>") as client:
    check = await client.preflight.check("USDC", "NGN", amount_usd=2500)
    print(check["decision"], check["summary"])
```

No API key is needed to start. Add `apiKey` / `api_key` for a higher rate limit.

## Use it from Claude

```
/plugin marketplace add Pay-Raider/payraider-plugin
/plugin install payraider@payraider
```

Set `PAYRAIDER_BASE_URL` to your PayRaider API, then run `/preflight USDC NGN 2500` or just ask: *"Is it safe to pay out $2,500 from USDC to NGN right now?"*

## Use it from any AI agent (MCP)

The MCP server exposes `preflight_payment` and 19 other read-only tools (corridors, anchors, prices, cost estimates, asset verification).

```bash
cd sdk/typescript && npm ci && npm run build
cd ../mcp-server && npm ci && npm run build
PAYRAIDER_BASE_URL=https://<your-payraider-api> npm start            # stdio
PAYRAIDER_BASE_URL=https://<your-payraider-api> npm start -- --http  # POST /mcp
```

Or run it as a container:

```bash
docker build -f sdk/mcp-server/Dockerfile -t payraider-mcp sdk
docker run -p 3333:3333 \
  -e PAYRAIDER_BASE_URL=https://<your-payraider-api> \
  -e PAYRAIDER_MCP_AUTH_TOKEN=$(openssl rand -hex 32) \
  payraider-mcp
```

Configuration and security notes: [`sdk/mcp-server/README.md`](sdk/mcp-server/README.md).

Deploy the hosted server on Render with the `render.yaml` Blueprint; see the [deployment guide](https://github.com/Pay-Raider/payraider-backend/blob/main/docs/DEPLOY.md).

## Documentation

- [Integration guide](docs/PLUGIN.md): REST contract, how decisions are made, API keys, paying in USDC
- [Design partners](docs/DESIGN_PARTNERS.md): running pilots with off-ramps

## Development

```bash
cd sdk/typescript && npm ci && npm test && npm run build
cd ../mcp-server  && npm ci && npm run lint && npm test
npm run build:plugin   # rebuild the bundle shipped in plugins/payraider
cd ../python && pip install -e ".[dev]" && pytest -m "not testnet"
```

The Claude plugin ships a single-file build of the MCP server (`plugins/payraider/server/server.mjs`) so it installs without `npm install`. Rebuild it with `npm run build:plugin` after changing the server or the SDK.

## License

[Apache 2.0](LICENSE)
