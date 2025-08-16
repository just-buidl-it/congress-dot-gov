import type { RateLimitInfo } from './rate-limiter';

export interface RateLimiterConfig {
  /**
   * Safety margin as a percentage (0-1).
   * 0.1 means we'll try to use only 90% of available requests
   */
  safetyMargin?: number;

  /**
   * Minimum delay between requests in milliseconds
   */
  minDelay?: number;

  /**
   * Maximum delay between requests in milliseconds
   */
  maxDelay?: number;
}

/**
 * An adaptive rate limiter that adjusts the delay between requests based on the current rate limit status.
 * It uses a safety margin to ensure that the rate limit is not exceeded.
 * It also has a minimum and maximum delay to prevent the delay from becoming too small or too large.
 * @constructor config - The configuration for the rate limiter
 * @param config.safetyMargin - The safety margin as a percentage (0-1). 0.1 means we'll try to use only 90% of available requests
 * @param config.minDelay - The minimum delay between requests in milliseconds
 * @param config.maxDelay - The maximum delay between requests in milliseconds
 */
export class AdaptiveRateLimiter {
  private config: Required<RateLimiterConfig>;
  private lastRequestTime: number = 0;
  private currentDelay: number = 0;
  private hourStartTime: number = Date.now();

  constructor(config: RateLimiterConfig = {}) {
    this.config = {
      safetyMargin: config.safetyMargin ?? 0.1, // 10% safety margin
      minDelay: config.minDelay ?? 50, // 50ms minimum
      maxDelay: config.maxDelay ?? 30000, // 30 seconds maximum
    };
    this.currentDelay = this.config.minDelay;
  }

  /**
   * Call this before making an API request. It will wait the appropriate
   * amount of time based on current rate limit status.
   * @returns A promise that resolves when the next request can be made
   */
  async waitForNextRequest(): Promise<void> {
    const now = Date.now();

    if (now - this.hourStartTime >= 3600000) {
      this.hourStartTime = now;
      this.currentDelay = this.config.minDelay;
    }

    const timeSinceLastRequest = now - this.lastRequestTime;
    const delayNeeded = this.currentDelay - timeSinceLastRequest;

    if (delayNeeded > 0) {
      await this.sleep(delayNeeded);
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Calculate delay based on amount of time remaining in the hour and number of requests remaining
   * @param rateLimitInfo - The current rate limit info
   * @param currentTime - The current time
   * @returns The delay in milliseconds
   */
  private calculateDelay(rateLimitInfo: RateLimitInfo, currentTime: number): number {
    const { limit, remaining } = rateLimitInfo;

    const timeElapsedThisHour = currentTime - this.hourStartTime;
    const timeRemainingInHour = Math.max(100, 3600000 - timeElapsedThisHour);

    const safeRemaining = Math.floor(limit * this.config.safetyMargin);

    if (remaining <= safeRemaining) {
      return this.config.maxDelay;
    }

    const optimalDelay = timeRemainingInHour / remaining;
    const utilizationRatio = 1 - remaining / limit;
    const adaptiveDelay = optimalDelay * utilizationRatio;

    return Math.max(this.config.minDelay, Math.min(this.config.maxDelay, adaptiveDelay));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  updateRateLimitInfo(rateLimitInfo: RateLimitInfo) {
    this.currentDelay = this.calculateDelay(rateLimitInfo, Date.now());
    this.lastRequestTime = Date.now();
  }
}
