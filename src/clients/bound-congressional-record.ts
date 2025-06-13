import { BaseClient } from './base';
import type { PaginationParams, PaginatedResponse } from '../types';
import type {
  BoundCongressionalRecord,
  DailyDigestBoundCongressionalRecord,
} from '../schemas/bound-congressional-record';

export class BoundCongressionalRecordClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/bound-congressional-record' });
  }

  /**
   * Returns a list of bound Congressional Records sorted by most recent.
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of bound Congressional Records
   */
  async getRecords(params: PaginationParams = {}) {
    return this.get<
      PaginatedResponse<{ boundCongressionalRecord: BoundCongressionalRecord[] }>
    >('', params);
  }

  /**
   * Returns a list of bound Congressional Records filtered by the specified year.
   * @param year - The year to filter by
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of bound Congressional Records for the specified year
   */
  async getRecordsByYear(year: string, params: PaginationParams = {}) {
    return this.get<
      PaginatedResponse<{ boundCongressionalRecord: BoundCongressionalRecord[] }>
    >(`/${year}`, params);
  }

  /**
   * Returns a list of bound Congressional Records filtered by the specified year and month.
   * @param year - The year to filter by
   * @param month - The month to filter by (01-12)
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of bound Congressional Records for the specified year and month
   */
  async getRecordsByYearAndMonth(
    year: string,
    month: string,
    params: PaginationParams = {},
  ) {
    return this.get<
      PaginatedResponse<{ boundCongressionalRecord: BoundCongressionalRecord[] }>
    >(`/${year}/${month}`, params);
  }

  /**
   * Returns a list of bound Congressional Records filtered by the specified year, month, and day.
   * @param year - The year to filter by
   * @param month - The month to filter by (01-12)
   * @param day - The day to filter by (01-31)
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of bound Congressional Records for the specified date
   */
  async getRecordsByDate(
    year: string,
    month: string,
    day: string,
    params: PaginationParams = {},
  ) {
    return this.get<
      PaginatedResponse<{
        boundCongressionalRecord: DailyDigestBoundCongressionalRecord[];
      }>
    >(`/${year}/${month}/${day}`, params);
  }
}
