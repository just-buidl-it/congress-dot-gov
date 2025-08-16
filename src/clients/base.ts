import 'whatwg-fetch';
import type {
  PaginationParams,
  BaseParams,
  DateFilterParams,
  SortParams,
} from '../params';
import {
  RateLimitExceededError,
  CongressGovApiError,
  CongressGovSdkError,
} from '../utils/errors';
import type { RateLimiter, RateLimitInfo } from '../rate-limiter/rate-limiter';

export interface CongressGovConfig {
  apiKey: string;
  rateLimiter?: RateLimiter;
}

type Params = Partial<PaginationParams & BaseParams & DateFilterParams & SortParams>;

export class CongressGovURLSearchParams {
  private _params: Params;

  constructor(params: Params) {
    this._params = params;
  }

  get params(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(this._params).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            if (key === 'fromDateTime' || key === 'toDateTime') {
              acc.push([key, this.formatDateTime(value as Date | string)]);
            } else {
              acc.push([key, value.toString()]);
            }
          }
          return acc;
        },
        [] as [string, string][],
      ),
    );
  }

  formatDateTime(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toISOString().slice(0, 19) + 'Z';
  }

  toUrlSearchParams(): string {
    return new URLSearchParams(this.params).toString();
  }
}

export class BaseClient {
  protected readonly apiKey: string;
  protected readonly baseUrl: string;
  protected readonly endpoint: string;
  protected readonly rateLimiter?: RateLimiter;

  constructor({
    apiKey,
    endpoint = '',
    rateLimiter,
  }: CongressGovConfig & { endpoint?: string }) {
    if (!apiKey) {
      throw new CongressGovSdkError('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = `https://api.congress.gov`;
    this.endpoint = endpoint;

    if (rateLimiter) {
      this.rateLimiter = rateLimiter;
    }
  }

  async get<T>(
    endpoint: string,
    params: Params,
  ): Promise<T & { rateLimit: RateLimitInfo }> {
    if (this.rateLimiter) {
      await this.rateLimiter.waitForNextRequest();
    }

    const searchParams = new CongressGovURLSearchParams(params);
    const url = new URL(`/v3${this.endpoint}${endpoint}`, this.baseUrl);
    url.search = searchParams.toUrlSearchParams();
    const response = await fetch(url, {
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    const rateLimit: RateLimitInfo = {
      limit: parseInt(response.headers.get('x-ratelimit-limit') || '0'),
      remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '0'),
    };

    if (this.rateLimiter) {
      this.rateLimiter.updateRateLimitInfo(rateLimit);
    }

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new RateLimitExceededError(
          'Rate limit exceeded. Please try again later.',
          response.status,
          rateLimit,
        );
      }

      throw new CongressGovApiError(data, response.status, endpoint);
    }

    return {
      ...data,
      rateLimit,
    };
  }
}
