# Stellar Insights SDK

Official client libraries for the [Stellar Insights API](https://api.stellarinsights.io).

- [TypeScript/JavaScript SDK](#typescript--javascript-sdk)
- [Python SDK](#python-sdk)

---

## TypeScript / JavaScript SDK

### Installation

```bash
npm install @stellar-insights/sdk
```

### Quick start

```typescript
import { StellarInsights } from '@stellar-insights/sdk'

const client = new StellarInsights({ apiKey: 'sk_your_api_key' })

// List anchors
const { data: anchors } = await client.anchors.list({ page: 1, limit: 20 })

// Get a payment corridor
const corridor = await client.corridors.get('USD', 'EUR')

// Estimate payment cost
const estimate = await client.costCalculator.estimate({
  source_asset: 'USD:GBUQWP3BOUZX34ULNQG23RQ6F4BVWCIYHBT6RIKCEWXC5ZAZMQG5HJ5',
  destination_asset: 'EUR:GBUQWP3BOUZX34ULNQG23RQ6F4BVWCIYHBT6RIKCEWXC5ZAZMQG5HJ5',
  amount: 1000,
})
console.log(estimate.routes[0].total_cost)
```

### Authentication

**API key (recommended for server-side):**

```typescript
const client = new StellarInsights({ apiKey: 'sk_...' })
```

**OAuth2 (for user-facing apps):**

```typescript
const client = new StellarInsights()
const tokens = await client.auth.login({ email: 'user@example.com', password: 'secret' })
// Token is set automatically; refresh when needed:
await client.auth.refresh(tokens.refresh_token)
```

### Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | — | Bearer token / API key |
| `accessToken` | `string` | — | OAuth2 access token |
| `baseUrl` | `string` | `https://api.stellarinsights.io` | Override API base URL |
| `maxRetries` | `number` | `3` | Max retries on 429/5xx |
| `retryDelay` | `number` | `500` | Initial retry delay (ms) |
| `timeout` | `number` | `30000` | Request timeout (ms) |

### Error handling

```typescript
import { StellarInsights, StellarInsightsError } from '@stellar-insights/sdk'

try {
  await client.anchors.get('nonexistent')
} catch (err) {
  if (err instanceof StellarInsightsError) {
    console.error(err.status)     // 404
    console.error(err.code)       // "NOT_FOUND"
    console.error(err.message)    // "Anchor not found"
    console.error(err.requestId)  // "req-abc123"
  }
}
```

### Rate limiting

The SDK automatically retries `429 Too Many Requests` responses with exponential backoff. The `Retry-After` header is respected when present.

```typescript
// Increase retries for high-throughput workloads
const client = new StellarInsights({ apiKey: 'sk_...', maxRetries: 5, retryDelay: 1000 })
```

### Available resources

| Resource | Property | Example |
|---|---|---|
| Anchors | `client.anchors` | `client.anchors.list()` |
| Corridors | `client.corridors` | `client.corridors.get('USD', 'EUR')` |
| Prices | `client.prices` | `client.prices.list()` |
| Cost Calculator | `client.costCalculator` | `client.costCalculator.estimate(...)` |
| Alerts | `client.alerts` | `client.alerts.listRules()` |
| Webhooks | `client.webhooks` | `client.webhooks.create(...)` |
| API Keys | `client.apiKeys` | `client.apiKeys.list()` |
| Auth | `client.auth` | `client.auth.login(...)` |
| Liquidity Pools | `client.liquidityPools` | `client.liquidityPools.list()` |
| Transactions | `client.transactions` | `client.transactions.create(...)` |
| Network | `client.network` | `client.network.info()` |
| ML | `client.ml` | `client.ml.predict(...)` |
| Governance | `client.governance` | `client.governance.listProposals()` |
| Asset Verification | `client.assetVerification` | `client.assetVerification.verify(...)` |

---

## Python SDK

### Installation

```bash
pip install stellar-insights
```

### Quick start

```python
import asyncio
from stellar_insights import StellarInsights

async def main():
    async with StellarInsights(api_key="sk_your_api_key") as client:
        # List anchors
        result = await client.anchors.list(page=1, limit=20)

        # Get a corridor
        corridor = await client.corridors.get("USD", "EUR")

        # Estimate cost
        estimate = await client.cost_calculator.estimate(
            source_asset="USD:GBUQWP3BOUZX34ULNQG23RQ6F4BVWCIYHBT6RIKCEWXC5ZAZMQG5HJ5",
            destination_asset="EUR:GBUQWP3BOUZX34ULNQG23RQ6F4BVWCIYHBT6RIKCEWXC5ZAZMQG5HJ5",
            amount=1000,
        )
        print(estimate["routes"][0]["total_cost"])

asyncio.run(main())
```

### Authentication

**API key:**

```python
client = StellarInsights(api_key="sk_...")
```

**OAuth2:**

```python
client = StellarInsights()
tokens = await client.auth.login(email="user@example.com", password="secret")
# Token is set automatically; refresh when needed:
await client.auth.refresh(tokens["refresh_token"])
```

### Configuration

| Parameter | Type | Default | Description |
|---|---|---|---|
| `api_key` | `str` | `None` | Bearer token / API key |
| `access_token` | `str` | `None` | OAuth2 access token |
| `base_url` | `str` | `https://api.stellarinsights.io` | Override API base URL |
| `max_retries` | `int` | `3` | Max retries on 429/5xx |
| `retry_delay` | `float` | `0.5` | Initial retry delay (seconds) |
| `timeout` | `float` | `30.0` | Request timeout (seconds) |

### Error handling

```python
from stellar_insights import StellarInsights, StellarInsightsError

try:
    await client.anchors.get("nonexistent")
except StellarInsightsError as e:
    print(e.status)      # 404
    print(e.code)        # "NOT_FOUND"
    print(str(e))        # "Anchor not found"
    print(e.request_id)  # "req-abc123"
```

### Rate limiting

The SDK automatically retries `429` and `5xx` responses with exponential backoff. The `Retry-After` header is respected when present.

```python
client = StellarInsights(api_key="sk_...", max_retries=5, retry_delay=1.0)
```

### Available resources

| Resource | Attribute | Example |
|---|---|---|
| Anchors | `client.anchors` | `await client.anchors.list()` |
| Corridors | `client.corridors` | `await client.corridors.get("USD", "EUR")` |
| Prices | `client.prices` | `await client.prices.list()` |
| Cost Calculator | `client.cost_calculator` | `await client.cost_calculator.estimate(...)` |
| Alerts | `client.alerts` | `await client.alerts.list_rules()` |
| Webhooks | `client.webhooks` | `await client.webhooks.create(...)` |
| API Keys | `client.api_keys` | `await client.api_keys.list()` |
| Auth | `client.auth` | `await client.auth.login(...)` |
| Liquidity Pools | `client.liquidity_pools` | `await client.liquidity_pools.list()` |
| Transactions | `client.transactions` | `await client.transactions.create(...)` |
| Network | `client.network` | `await client.network.info()` |
| ML | `client.ml` | `await client.ml.predict(...)` |
| Governance | `client.governance` | `await client.governance.list_proposals()` |
| Asset Verification | `client.asset_verification` | `await client.asset_verification.verify(...)` |

---

## Publishing

### TypeScript

```bash
cd sdk/typescript
npm run build
npm publish --access public
```

### Python

```bash
cd sdk/python
pip install build twine
python -m build
twine upload dist/*
```

## OpenAPI

The live OpenAPI spec is available at:

- Development: `http://localhost:8080/api-docs/openapi.json`
- Production: `https://api.stellarinsights.io/api-docs/openapi.json`
- Swagger UI: `https://api.stellarinsights.io/swagger-ui`
