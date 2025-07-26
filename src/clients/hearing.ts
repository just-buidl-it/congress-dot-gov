import { BaseClient } from './base';
import type { PaginationParams, PaginatedResponse, BaseParams } from '../params';
import type { Hearing, ListHearing } from '../schemas/hearing';
import type { Chamber } from '../schemas/constants';

export class HearingClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/hearing' });
  }

  /**
   * Returns a list of hearings.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of hearings
   */
  async getHearings(params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ hearings: ListHearing[] }>>('', params);
  }

  /**
   * Returns a list of hearings filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of hearings for the specified congress
   */
  async getHearingsByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ hearings: ListHearing[] }>>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of hearings filtered by the specified congress and chamber.
   * @param congress - The congress to filter by
   * @param chamber - The chamber to filter by
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of hearings for the specified congress and chamber
   */
  async getHearingsByCongressAndChamber(
    congress: number,
    chamber: Chamber,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ hearings: ListHearing[] }>>(
      `/${congress}/${chamber.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified hearing.
   * @param congress - The congress of the hearing
   * @param chamber - The chamber of the hearing
   * @param jacketNumber - The jacket number of the hearing
   * @param params {BaseParams} - Accepts format parameters
   * @returns Detailed information for the specified hearing
   */
  async getHearing(
    congress: number,
    chamber: Chamber,
    jacketNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<{ hearing: Hearing }>(
      `/${congress}/${chamber.toLowerCase()}/${jacketNumber}`,
      params,
    );
  }
}
