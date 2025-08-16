export interface RateLimitInfo {
  limit: number;
  remaining: number;
}

export interface RateLimiter {
  waitForNextRequest: () => Promise<void>;
  updateRateLimitInfo: (rateLimitInfo: RateLimitInfo) => void;
}
