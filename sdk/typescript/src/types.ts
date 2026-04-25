// ─── Config ──────────────────────────────────────────────────────────────────

export interface StellarInsightsConfig {
  /** API key for Bearer token auth */
  apiKey?: string;
  /** OAuth2 access token */
  accessToken?: string;
  /** Override base URL (default: https://api.stellarinsights.io) */
  baseUrl?: string;
  /** Max retry attempts on 429/5xx (default: 3) */
  maxRetries?: number;
  /** Initial retry delay in ms (default: 500) */
  retryDelay?: number;
  /** Request timeout in ms (default: 30000) */
  timeout?: number;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ─── Error ────────────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  message: string;
  status: number;
  request_id?: string;
}

// ─── Anchors ──────────────────────────────────────────────────────────────────

export interface AnchorMetrics {
  total_transactions: number;
  success_rate: number;
  avg_transaction_time_ms: number;
  total_volume_usd: number;
}

export interface Anchor {
  id: string;
  name: string;
  account: string;
  domain?: string;
  status: string;
  metrics: AnchorMetrics;
}

// ─── Corridors ────────────────────────────────────────────────────────────────

export interface Corridor {
  source: string;
  destination: string;
  volume_usd: number;
  success_rate: number;
  avg_latency_ms: number;
}

export interface CorridorDetail extends Corridor {
  success_rate_history: Array<{ timestamp: string; value: number }>;
  latency_history: Array<{ timestamp: string; value: number }>;
  liquidity_history: Array<{ timestamp: string; value: number }>;
}

// ─── Prices ───────────────────────────────────────────────────────────────────

export interface Price {
  asset: string;
  price_usd: number;
  change_24h: number;
  updated_at: string;
}

export interface ConvertResult {
  from_asset: string;
  to_asset: string;
  amount: number;
  converted_amount: number;
  rate: number;
}

// ─── Cost Calculator ─────────────────────────────────────────────────────────

export interface CostEstimateRequest {
  source_asset: string;
  destination_asset: string;
  amount: number;
}

export interface RouteFees {
  network_fee: number;
  bridge_fee: number;
  liquidity_fee: number;
}

export interface PaymentRoute {
  path: string[];
  total_cost: number;
  exchange_rate: number;
  fees: RouteFees;
  estimated_time_ms: number;
}

export interface CostEstimateResponse {
  routes: PaymentRoute[];
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  enabled: boolean;
  created_at: string;
}

export interface CreateAlertRuleRequest {
  name: string;
  condition: string;
  threshold: number;
}

// ─── Webhooks ─────────────────────────────────────────────────────────────────

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  created_at: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: string[];
}

// ─── API Keys ─────────────────────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  last_used_at?: string;
}

export interface CreateApiKeyRequest {
  name: string;
}

export interface CreateApiKeyResponse extends ApiKey {
  key: string; // only returned on creation
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// ─── Liquidity Pools ─────────────────────────────────────────────────────────

export interface LiquidityPool {
  id: string;
  assets: string[];
  total_value_usd: number;
  volume_24h_usd: number;
  fee_rate: number;
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  hash?: string;
  status: string;
  created_at: string;
}

export interface CreateTransactionRequest {
  envelope_xdr: string;
}

// ─── Network ──────────────────────────────────────────────────────────────────

export interface NetworkInfo {
  network: string;
  passphrase: string;
  horizon_url: string;
  rpc_url: string;
}

// ─── ML ───────────────────────────────────────────────────────────────────────

export interface PaymentPrediction {
  success_probability: number;
  risk_score: number;
  factors: Record<string, number>;
}

// ─── Governance ───────────────────────────────────────────────────────────────

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: string;
  votes_for: number;
  votes_against: number;
  created_at: string;
}

export interface CreateProposalRequest {
  title: string;
  description: string;
}

// ─── Asset Verification ───────────────────────────────────────────────────────

export interface VerifiedAsset {
  asset_code: string;
  asset_issuer: string;
  verified: boolean;
  verification_date?: string;
}
