import 'whatwg-fetch';
import { RateLimitExceededError, CongressGovApiError, CongressGovSdkError } from '../utils/errors';

export interface CongressGovConfig {
  apiKey: string;
  endpoint?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
}

export class BaseClient {
  protected readonly apiKey: string;
  protected readonly baseUrl: string;
  protected readonly endpoint: string;

  constructor({ apiKey, endpoint = '' }: CongressGovConfig) {
    if (!apiKey) {
      throw new CongressGovSdkError('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = `https://api.congress.gov`;
    this.endpoint = endpoint;
  }

  protected async get<T>(endpoint: string, params: object): Promise<T & { rateLimit: RateLimitInfo }> {
    const url = new URL(`/v3${this.endpoint}${endpoint}`, this.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
    const response = await fetch(url, {
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    const rateLimit: RateLimitInfo = {
      limit: parseInt(response.headers.get('x-ratelimit-limit') || '0'),
      remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '0')
    };
    const data = await response.json();

    if (!response.ok) {
      // Check for rate limit error and throw with limit details
      if (response.status === 429) {
        throw new RateLimitExceededError(
          'Rate limit exceeded. Please try again later.',
          response.status,
          rateLimit
        );
      }

      // Otherwise throw our generic error
      throw new CongressGovApiError(
        data,
        response.status,
        endpoint
      );
    }

    return {
      ...data,
      rateLimit
    };
  }
}
