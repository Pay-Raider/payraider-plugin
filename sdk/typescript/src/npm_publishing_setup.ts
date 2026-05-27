import type { StellarInsightsConfig } from "./types.js";
import type { NPMPublishingSetupParams, NPMPublishingSetupResult } from "./types/npm_publishing_setup.js";
import { SDKError } from "./sdk_error.js";

const PACKAGE_NAME_PATTERN = /^(?:@[^@\/]+\/)?[^@\/]+$/;
const DEFAULT_REGISTRY = "https://registry.npmjs.org";

export class NPMPublishingSetup {
  private readonly config: StellarInsightsConfig;

  constructor(config: StellarInsightsConfig = {}) {
    this.config = config;
  }

  public async execute(params: NPMPublishingSetupParams): Promise<NPMPublishingSetupResult> {
    if (!params || typeof params.packageName !== "string" || !PACKAGE_NAME_PATTERN.test(params.packageName)) {
      throw new SDKError("Invalid NPM package name", { params });
    }

    if (!params.version || typeof params.version !== "string") {
      throw new SDKError("Invalid NPM version", { params });
    }

    try {
      const registryUrl = params.registryUrl?.trim() || DEFAULT_REGISTRY;
      return {
        success: true,
        data: {
          packageName: params.packageName.trim(),
          version: params.version.trim(),
          registryUrl,
          configuredAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new SDKError("Failed to configure NPM publishing", { params, cause: error }, { cause: error });
    }
  }
}
