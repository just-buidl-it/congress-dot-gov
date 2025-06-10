import 'whatwg-fetch';

export interface CongressGovConfig {
  apiKey: string;
  baseUrl?: string;
}

export class BaseClient {
  protected readonly apiKey: string;
  protected readonly baseUrl: string;

  constructor({ apiKey, baseUrl = '' }: CongressGovConfig) {
    if (!apiKey) {
      // @todo custom error
      throw new Error('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = `https://api.congress.gov/v3${baseUrl}`;
  }

  protected async get<T>(endpoint: string, params: object): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url, {
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
