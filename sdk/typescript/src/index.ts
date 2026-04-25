import { HttpClient } from "./http.js";
import {
  AlertsResource,
  AnchorsResource,
  ApiKeysResource,
  AssetVerificationResource,
  AuthResource,
  CorridorsResource,
  CostCalculatorResource,
  GovernanceResource,
  LiquidityPoolsResource,
  MlResource,
  NetworkResource,
  PricesResource,
  TransactionsResource,
  WebhooksResource,
} from "./resources.js";
import type { StellarInsightsConfig } from "./types.js";

export class StellarInsights {
  readonly anchors: AnchorsResource;
  readonly corridors: CorridorsResource;
  readonly prices: PricesResource;
  readonly costCalculator: CostCalculatorResource;
  readonly alerts: AlertsResource;
  readonly webhooks: WebhooksResource;
  readonly apiKeys: ApiKeysResource;
  readonly auth: AuthResource;
  readonly liquidityPools: LiquidityPoolsResource;
  readonly transactions: TransactionsResource;
  readonly network: NetworkResource;
  readonly ml: MlResource;
  readonly governance: GovernanceResource;
  readonly assetVerification: AssetVerificationResource;

  private readonly http: HttpClient;

  constructor(config: StellarInsightsConfig = {}) {
    this.http = new HttpClient(config);
    this.anchors = new AnchorsResource(this.http);
    this.corridors = new CorridorsResource(this.http);
    this.prices = new PricesResource(this.http);
    this.costCalculator = new CostCalculatorResource(this.http);
    this.alerts = new AlertsResource(this.http);
    this.webhooks = new WebhooksResource(this.http);
    this.apiKeys = new ApiKeysResource(this.http);
    this.auth = new AuthResource(this.http, (t) => this.http.setToken(t));
    this.liquidityPools = new LiquidityPoolsResource(this.http);
    this.transactions = new TransactionsResource(this.http);
    this.network = new NetworkResource(this.http);
    this.ml = new MlResource(this.http);
    this.governance = new GovernanceResource(this.http);
    this.assetVerification = new AssetVerificationResource(this.http);
  }
}

export { StellarInsightsError } from "./http.js";
export type * from "./types.js";
