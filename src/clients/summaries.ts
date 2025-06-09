import { BaseClient } from './base';
import type {
  PaginationParams,
  DateFilterParams,
  SortParams,
  PaginatedResponse,
} from '../types';
import type { BillType } from './bill';
import type { Summary } from '../schemas/summary';

export class SummariesClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/summaries' });
  }

  /**
   * Returns a list of summaries sorted by date of last update.
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameter (json or xml)
   * @returns A list of summaries sorted by date of last update
   */
  async getSummaries(params: PaginationParams & DateFilterParams & SortParams = {}) {
    return this.get<PaginatedResponse<{ summaries: Summary[] }>>('', params);
  }

  /**
   * Returns a list of summaries filtered by congress, sorted by date of last update.
   * @param congress - The Congress number (e.g., 117)
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameter (json or xml)
   * @returns List of summaries filtered by congress, sorted by date of last update
   */
  async getSummariesByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ summaries: Summary[] }>>(`/${congress}`, params);
  }

  /**
   * Returns a list of summaries filtered by congress and by bill type, sorted by date of last update.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill (e.g., hr, s, hjres, sjres)
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameter (json or xml)
   * @returns List of summaries filtered by congress and bill type, sorted by date of last update
   */
  async getSummariesByCongressAndType(
    congress: number,
    billType: BillType,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ summaries: Summary[] }>>(
      `/${congress}/${billType.toLowerCase()}`,
      params,
    );
  }
}
