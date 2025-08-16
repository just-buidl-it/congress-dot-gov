import { BaseClient } from './base';
import type { PaginationParams, BaseParams, DateFilterParams } from '../params';
import type {
  ListNomination,
  Nomination,
  Nominee,
  NominationAction,
  NominationCommittee,
  NominationHearing,
} from '../schemas/nomination';
import type { RateLimiter } from '../rate-limiter/rate-limiter';

export class NominationClient extends BaseClient {
  constructor({ apiKey, rateLimiter }: { apiKey: string; rateLimiter?: RateLimiter }) {
    super({ apiKey, rateLimiter, endpoint: '/nomination' });
  }

  /**
   * Returns a list of nominations sorted by date received from the President.
   * @param params {PaginationParams & DateFilterParams} - Pagination, date range filter and format parameters
   * @returns A list of nominations
   */
  async getNominations(params: PaginationParams & DateFilterParams = {}) {
    return this.get<{ nominations: ListNomination[] }>('', params);
  }

  /**
   * Returns a list of nominations filtered by the specified congress and sorted by date received from the President.
   * @param congress - The congress to filter by
   * @param params {PaginationParams & DateFilterParams} - Pagination, date range filter and format parameters
   * @returns A list of nominations for the specified congress
   */
  async getNominationsByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<{ nominations: Nomination[] }>(`/${congress}`, params);
  }

  /**
   * Returns detailed information for a specified nomination.
   * @param congress - The congress of the nomination
   * @param nominationNumber - The nomination number
   * @param params {BaseParams} - Accepts format parameter
   * @returns Detailed information for the specified nomination
   */
  async getNomination(
    congress: number,
    nominationNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<{ nomination: Nomination }>(
      `/${congress}/${nominationNumber}`,
      params,
    );
  }

  /**
   * Returns the list nominees for a position within the nomination.
   * @param congress - The congress of the nomination
   * @param nominationNumber - The nomination number
   * @param ordinal - The ordinal of the nominee
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns The list of nominees for the specified position
   */
  async getNominees(
    congress: number,
    nominationNumber: string,
    ordinal: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ nominees: Nominee[] }>(
      `/${congress}/${nominationNumber}/${ordinal}`,
      params,
    );
  }

  /**
   * Returns the list of actions on a specified nomination.
   * @param congress - The congress of the nomination
   * @param nominationNumber - The nomination number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns The list of actions for the specified nomination
   */
  async getNominationActions(
    congress: number,
    nominationNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ actions: NominationAction[] }>(
      `/${congress}/${nominationNumber}/actions`,
      params,
    );
  }

  /**
   * Returns the list of committees associated with a specified nomination.
   * @param congress - The congress of the nomination
   * @param nominationNumber - The nomination number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns The list of committees for the specified nomination
   */
  async getNominationCommittees(
    congress: number,
    nominationNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ committees: NominationCommittee[] }>(
      `/${congress}/${nominationNumber}/committees`,
      params,
    );
  }

  /**
   * Returns the list of printed hearings associated with a specified nomination.
   * @param congress - The congress of the nomination
   * @param nominationNumber - The nomination number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns The list of hearings for the specified nomination
   */
  async getNominationHearings(
    congress: number,
    nominationNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ hearings: NominationHearing[] }>(
      `/${congress}/${nominationNumber}/hearings`,
      params,
    );
  }
}
