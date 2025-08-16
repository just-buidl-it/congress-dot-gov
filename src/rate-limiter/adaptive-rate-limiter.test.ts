import { AdaptiveRateLimiter } from './adaptive-rate-limiter';
import type { RateLimitInfo } from './rate-limiter';

describe('AdaptiveRateLimiter', () => {
  let rateLimiter: AdaptiveRateLimiter;
  let setTimeoutSpy: jest.SpyInstance;
  let dateNowSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    dateNowSpy = jest.spyOn(Date, 'now');
    dateNowSpy.mockReturnValue(1000000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  describe('waitForNextRequest', () => {
    beforeEach(() => {
      rateLimiter = new AdaptiveRateLimiter();
    });

    it('should not delay on first request without rate limit info', async () => {
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).not.toHaveBeenCalled();

      await promise;

      expect(setTimeoutSpy).not.toHaveBeenCalled();
    });

    it('should apply minimum default delay when plenty of requests remaining', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 999 });

      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 50);

      jest.runAllTimers();
      await promise;
    });

    it('should apply progressive delay as requests approach limit', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 100 });
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      const delayUsed = setTimeoutSpy.mock.calls[0][1];
      expect(delayUsed).toBeGreaterThan(50);

      jest.runAllTimers();
      await promise;
    });

    it('should apply maximum delay when at or near limit', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 50 });
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      const delayUsed = setTimeoutSpy.mock.calls[0][1];
      expect(delayUsed).toBeGreaterThan(1000);

      jest.runAllTimers();
      await promise;
    });

    it('should apply maximum delay when no safe requests remaining', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 5 });
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      const delayUsed = setTimeoutSpy.mock.calls[0][1];
      expect(delayUsed).toBe(30000);

      jest.runAllTimers();
      await promise;
    });

    it('should reset delay after hour rollover', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 100 });
      let promise = rateLimiter.waitForNextRequest();
      jest.runAllTimers();
      await promise;

      const firstCallDelay = setTimeoutSpy.mock.calls[0][1];
      expect(firstCallDelay).toBe(30000);

      dateNowSpy.mockReturnValue(1000000 + 3600001);
      setTimeoutSpy.mockClear();

      promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(0);
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 1000 });
      promise = rateLimiter.waitForNextRequest();
      const secondCallDelay = setTimeoutSpy.mock.calls[0][1];
      expect(secondCallDelay).toBe(50);

      jest.runAllTimers();
      await promise;
    });

    it('should enforce minimum time between requests', async () => {
      let promise = rateLimiter.waitForNextRequest();
      jest.runAllTimers();
      await promise;

      jest.advanceTimersByTime(10);
      setTimeoutSpy.mockClear();

      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 999 });
      promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      const delayUsed = setTimeoutSpy.mock.calls[0][1];
      expect(delayUsed).toBe(50);

      jest.runAllTimers();
      await promise;
    });

    it('should handle multiple consecutive requests with different rate limits', async () => {
      const rateLimitInfos: RateLimitInfo[] = [
        { limit: 1000, remaining: 800 },
        { limit: 1000, remaining: 600 },
        { limit: 1000, remaining: 400 },
        { limit: 1000, remaining: 200 },
      ];

      const delays: number[] = [];

      for (const rateLimitInfo of rateLimitInfos) {
        setTimeoutSpy.mockClear();
        rateLimiter.updateRateLimitInfo(rateLimitInfo);
        const promise = rateLimiter.waitForNextRequest();

        if (setTimeoutSpy.mock.calls.length > 0) {
          delays.push(setTimeoutSpy.mock.calls[0][1]);
        } else {
          delays.push(0);
        }

        jest.runAllTimers();
        await promise;

        dateNowSpy.mockReturnValue(
          dateNowSpy.mock.results[dateNowSpy.mock.results.length - 1].value + 100,
        );
      }

      expect(delays.length).toBe(4);
      expect(delays[3]).toBeGreaterThan(delays[0]);
    });
  });

  describe('configuration options', () => {
    it('should respect high safetyMargin setting', async () => {
      const highSafetyMargin = new AdaptiveRateLimiter({ safetyMargin: 0.5 });
      highSafetyMargin.updateRateLimitInfo({ limit: 1000, remaining: 200 });

      setTimeoutSpy.mockClear();
      const promise = highSafetyMargin.waitForNextRequest();
      const highMarginDelay = setTimeoutSpy.mock.calls[0][1];

      expect(highMarginDelay).toBe(30000);
      jest.runAllTimers();
      await promise;
    });

    it('should respect low safetyMargin setting', async () => {
      const lowSafetyMargin = new AdaptiveRateLimiter({ safetyMargin: 0.1 });
      lowSafetyMargin.updateRateLimitInfo({ limit: 1000, remaining: 200 });

      setTimeoutSpy.mockClear();
      const promise = lowSafetyMargin.waitForNextRequest();
      const lowMarginDelay = setTimeoutSpy.mock.calls[0][1];

      expect(lowMarginDelay).toBeLessThan(30000);

      jest.runAllTimers();
      await promise;
    });

    it('should respect custom minDelay setting', async () => {
      const customMinDelay = new AdaptiveRateLimiter({ minDelay: 200 });
      customMinDelay.updateRateLimitInfo({ limit: 1000, remaining: 1000 });

      const promise = customMinDelay.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 200);

      jest.runAllTimers();
      await promise;
    });

    it('should respect custom maxDelay setting', async () => {
      const customMaxDelay = new AdaptiveRateLimiter({ maxDelay: 10000 });
      customMaxDelay.updateRateLimitInfo({ limit: 1000, remaining: 100 });

      const promise = customMaxDelay.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 10000);

      jest.runAllTimers();
      await promise;
    });
  });

  describe('edge cases', () => {
    beforeEach(() => {
      rateLimiter = new AdaptiveRateLimiter();
    });

    it('should handle zero remaining requests gracefully', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: 0 });
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 30000);

      jest.runAllTimers();
      await promise;
    });

    it('should handle very small limits', async () => {
      rateLimiter.updateRateLimitInfo({
        limit: 1,
        remaining: 1,
      });
      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

      jest.runAllTimers();
      await promise;
    });

    it('should handle negative remaining (API error scenario)', async () => {
      rateLimiter.updateRateLimitInfo({ limit: 1000, remaining: -1 });
      rateLimiter.waitForNextRequest();

      const promise = rateLimiter.waitForNextRequest();

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 30000);

      jest.runAllTimers();
      await promise;
    });
  });
});
