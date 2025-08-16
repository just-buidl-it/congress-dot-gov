import { BaseClient } from './base';
import type { BaseParams, PaginationParams } from '../params';
import type {
  DailyCongressionalRecord,
  DailyCongressionalRecordIssue,
  DailyCongressionalRecordArticle,
} from '../schemas/daily-congressional-record';
import type { RateLimiter } from '../rate-limiter/rate-limiter';

export class DailyCongressionalRecordClient extends BaseClient {
  constructor({ apiKey, rateLimiter }: { apiKey: string; rateLimiter?: RateLimiter }) {
    super({ apiKey, rateLimiter, endpoint: '/daily-congressional-record' });
  }

  /**
   * Returns a list of daily congressional record issues sorted by most recent.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of daily congressional record issues
   */
  async getRecords(params: PaginationParams = {}) {
    return this.get<{ dailyCongressionalRecord: DailyCongressionalRecord[] }>('', params);
  }

  /**
   * Returns a list of daily Congressional Records filtered by the specified volume number.
   * @param volumeNumber - The volume number to filter by
   * @param params {PaginationParams} - Acceps pagination and format parameters
   * @returns A list of daily congressional records for the specified volume
   */
  async getRecordsByVolume(volumeNumber: number, params: PaginationParams = {}) {
    return this.get<{ dailyCongressionalRecord: DailyCongressionalRecord[] }>(
      `/${volumeNumber}`,
      params,
    );
  }

  /**
   * Returns a list of daily Congressional Records filtered by the specified volume number and issue number.
   * @param volumeNumber - The volume number to filter by
   * @param issueNumber - The issue number to filter by
   * @param params {BaseParams} - Accepts format parameters
   * @returns A list of daily congressional records for the specified volume and issue
   */
  async getRecordsByVolumeAndIssue(
    volumeNumber: number,
    issueNumber: number,
    params: BaseParams = {},
  ) {
    return this.get<{ issue: DailyCongressionalRecordIssue }>(
      `/${volumeNumber}/${issueNumber}`,
      params,
    );
  }

  /**
   * Returns a list of daily Congressional Record articles filtered by the specified volume number and issue number.
   * @param volumeNumber - The volume number to filter by
   * @param issueNumber - The issue number to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of daily congressional record articles for the specified volume and issue
   */
  async getArticles(
    volumeNumber: number,
    issueNumber: number,
    params: PaginationParams = {},
  ) {
    return this.get<{ articles: DailyCongressionalRecordArticle[] }>(
      `/${volumeNumber}/${issueNumber}/articles`,
      params,
    );
  }
}
