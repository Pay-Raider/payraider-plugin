/**
 * Where the hosted PayRaider API lives.
 *
 * Only a mainnet API is hosted. Testnet has no hosted API, so testnet
 * clients must pass `baseUrl` pointing at their own backend.
 *
 * The hosted API runs on a plan that sleeps when idle; the first request
 * after a quiet spell can take up to a minute, which the default timeout
 * allows for.
 */
export const HOSTED_API_URL = "https://payraider-backend-11ji.onrender.com";

export const API_BASE_URLS: Record<"mainnet" | "testnet", string | undefined> = {
  mainnet: HOSTED_API_URL,
  testnet: undefined,
};

export const NO_TESTNET_API =
  "There is no hosted PayRaider API for testnet. Pass baseUrl (or set PAYRAIDER_BASE_URL) to your own backend.";

/** Long enough to ride out the hosted API waking from sleep. */
export const DEFAULT_TIMEOUT_MS = 90_000;
