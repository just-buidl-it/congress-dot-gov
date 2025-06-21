import 'whatwg-fetch';
import type {
  PaginationParams,
  BaseParams,
  DateFilterParams,
  SortParams,
} from '../types';
import { RateLimitExceededError, CongressGovApiError, CongressGovSdkError } from '../utils/errors';

export interface CongressGovConfig {
  apiKey: string;
  endpoint?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
}

type Params = Partial<PaginationParams & BaseParams & DateFilterParams & SortParams>

export class CongressGovURLSearchParams {
  private _params: Params;

  constructor(params: Params) {
    this._params = params;
  }

  get params(): Record<string, string> {
    return Object.fromEntries(Object.entries(this._params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (key === 'fromDateTime' || key === 'toDateTime') {
         acc.push([key, this.formatDateTime(value as Date | string)]);
        } else {
          acc.push([key, value.toString()]);
        }
      }
      return acc;
    }, [] as [string, string][]));
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

  constructor({ apiKey, endpoint = '' }: CongressGovConfig) {
    if (!apiKey) {
      throw new CongressGovSdkError('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = `https://api.congress.gov`;
    this.endpoint = endpoint;
  }

  protected async get<T>(endpoint: string, params: Params): Promise<T & { rateLimit: RateLimitInfo }> {
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
