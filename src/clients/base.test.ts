import { BaseClient, CongressGovURLSearchParams } from './base';
import { RateLimitExceededError, CongressGovApiError } from '../utils/errors';
import { Format } from '../params';

let fetchSpy: jest.SpyInstance;

class MockClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey });
  }

  getProxy(endpoint: string, params: object = {}) {
    return super.get(endpoint, params);
  }
}

describe('BaseClient', () => {
  let client: MockClient;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
    client = new MockClient({ apiKey: mockApiKey });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('CongressGovURLSearchParams', () => {
    it('should convert params object to URLSearchParams', () => {
      const params = {
        limit: 20,
        offset: 0,
        format: Format.JSON,
      };

      const searchParams = new CongressGovURLSearchParams(params);
      expect(searchParams.toUrlSearchParams()).toBe('limit=20&offset=0&format=json');
    });

    it('should handle empty params object', () => {
      const searchParams = new CongressGovURLSearchParams({});
      expect(searchParams.toUrlSearchParams()).toBe('');
    });

    it('should handle params with undefined values', () => {
      const params = {
        limit: 20,
        format: undefined,
      };

      const searchParams = new CongressGovURLSearchParams(params);
      expect(searchParams.toUrlSearchParams()).toBe('limit=20');
    });

    it('should handle date params', () => {
      const params = {
        fromDateTime: new Date('2021-01-01'),
        toDateTime: new Date('2021-12-31'),
      };

      const searchParams = new CongressGovURLSearchParams(params);
      expect(searchParams.toUrlSearchParams()).toBe(
        'fromDateTime=2021-01-01T00%3A00%3A00Z&toDateTime=2021-12-31T00%3A00%3A00Z',
      );
    });
  });

  describe('Constructor', () => {
    it('should create client with API key', () => {
      expect(client).toBeInstanceOf(BaseClient);
    });

    it('should throw error when API key is missing', () => {
      expect(() => new BaseClient({ apiKey: '' })).toThrow('API key is required');
    });
  });

  describe('get method - success cases', () => {
    it('should make successful request and return data with rate limit info', async () => {
      const mockResponse = { bills: [{ id: 1, title: 'Test Bill' }] };

      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
          headers: new Headers({
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '4413',
          }),
        }),
      );

      const result = await client.getProxy('/bill/117', { limit: 5 });

      expect(result).toEqual({
        ...mockResponse,
        rateLimit: {
          limit: 5000,
          remaining: 4413,
        },
      });
    });
  });

  describe('get method - error cases', () => {
    it('should throw RateLimitExceededError for 429 status', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          ok: false,
          status: 429,
          json: () =>
            Promise.resolve({
              error: {
                code: 'OVER_RATE_LIMIT',
                message:
                  'You have exceeded your rate limit. Try again later or contact us at https://api.congress.gov:443/contact/ for assistance',
              },
            }),
          headers: new Headers({
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '0',
          }),
        }),
      );

      await expect(
        client.getProxy('/committee/senate/rate-limit/nominations', { limit: 5 }),
      ).rejects.toThrow(RateLimitExceededError);
    });

    it('should throw CongressGovApiError for 404 error', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          ok: false,
          status: 404,
          json: () =>
            Promise.resolve({
              error: 'Unknown resource: amendment/117/SAMDT',
            }),
          headers: new Headers({
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '0',
          }),
        }),
      );

      await expect(client.getProxy('/amendment/117/SAMDT')).rejects.toThrow(
        CongressGovApiError,
      );
    });
  });

  describe('URL construction', () => {
    it('should construct fetch request with base endpoint', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
          headers: new Headers({
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '4413',
          }),
        }),
      );

      await client.getProxy('/bill/117');

      expect(fetchSpy).toHaveBeenCalledWith(
        new URL('https://api.congress.gov/v3/bill/117'),
        {
          headers: {
            'X-API-Key': mockApiKey,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should properly construct fetch request with query parameters', async () => {
      fetchSpy.mockReturnValueOnce(
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
          headers: new Headers({
            'x-ratelimit-limit': '5000',
            'x-ratelimit-remaining': '4413',
          }),
        }),
      );

      await client.getProxy('/bill/117', {
        limit: 5,
      });
      expect(fetchSpy).toHaveBeenCalledWith(
        new URL('https://api.congress.gov/v3/bill/117?limit=5'),
        { headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-api-key' } },
      );
    });
  });
});
