export class RateLimitExceededError extends Error {
  public readonly statusCode: number;
  public readonly rateLimit: {
    limit: number;
    remaining: number;
  };

  constructor(message: string, statusCode: number = 429, rateLimit?: { limit: number, remaining: number }) {
    super(message);
    this.name = 'RateLimitExceededError';
    this.statusCode = statusCode;
    this.rateLimit = rateLimit || { limit: 0, remaining: 0 };
  }
}

export class CongressGovApiError extends Error {
  public readonly statusCode: number;
  public readonly endpoint: string;
  public readonly data?: object;

  constructor(message: string | object, statusCode: number, endpoint: string) {
    const errorMessage = typeof message === 'string' ? message : JSON.stringify(message);
    super(errorMessage);
    this.name = 'CongressGovApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.data = typeof message === 'string' ? undefined : message;
  }
}

export class CongressGovSdkError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'CongressGovSdkError';
  }
}