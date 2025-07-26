import { BaseClient } from './base';
import { BaseParams, PaginationParams } from '../params';
import type {
  ListTreaty,
  Treaty,
  TreatyAction,
  TreatyCommittee,
} from '../schemas/treaty';

export class TreatyClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/treaty' });
  }

  /**
   * Returns a list of treaties sorted by date of last update.
   * @param params {PaginationParams & DateRangeParams} - Accepts pagination and date range parameters
   * @returns A list of treaties
   */
  async getTreaties(params: PaginationParams = {}) {
    return this.get<{ treaties: ListTreaty[] }>('', params);
  }

  /**
   * Returns a list of treaties for the specified congress, sorted by date of last update.
   * @param congress - The congress to filter by
   * @param params {PaginationParams & DateRangeParams} - Accepts pagination and date range parameters
   * @returns A list of treaties for the specified congress
   */
  async getTreatiesByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<{ treaties: ListTreaty[] }>(`/${congress}`, params);
  }

  /**
   * Returns detailed information for a specified treaty.
   * @param congress - The congress of the treaty
   * @param treatyNumber - The treaty number
   * @param params {BaseParams} - Accepts format parameters
   * @returns Detailed information for the specified treaty
   */
  async getTreaty(congress: number, treatyNumber: string, params: BaseParams = {}) {
    return this.get<{ treaty: Treaty }>(`/${congress}/${treatyNumber}`, params);
  }

  /**
   * Returns detailed information for a specified partitioned treaty.
   * @param congress - The congress of the treaty
   * @param treatyNumber - The treaty number
   * @param treatySuffix - The treaty suffix
   * @param params {PaginationParams} - Pagination parameters
   * @returns Detailed information for the specified partitioned treaty
   */
  async getPartitionedTreaty(
    congress: number,
    treatyNumber: string,
    treatySuffix: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ treaty: Treaty }>(
      `/${congress}/${treatyNumber}/${treatySuffix}`,
      params,
    );
  }

  /**
   * Returns the list of actions on a specified treaty.
   * @param congress - The congress of the treaty
   * @param treatyNumber - The treaty number
   * @param params {PaginationParams} - Pagination parameters
   * @returns The list of actions for the specified treaty
   */
  async getTreatyActions(
    congress: number,
    treatyNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ actions: TreatyAction[] }>(
      `/${congress}/${treatyNumber}/actions`,
      params,
    );
  }

  /**
   * Returns the list of actions on a specified partitioned treaty.
   * @param congress - The congress of the treaty
   * @param treatyNumber - The treaty number
   * @param treatySuffix - The treaty suffix
   * @param params {PaginationParams} - Pagination parameters
   * @returns The list of actions for the specified partitioned treaty
   */
  async getPartitionedTreatyActions(
    congress: number,
    treatyNumber: string,
    treatySuffix: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ actions: TreatyAction[] }>(
      `/${congress}/${treatyNumber}/${treatySuffix}/actions`,
      params,
    );
  }

  /**
   * Returns the list of committees associated with a specified treaty.
   * @param congress - The congress of the treaty
   * @param treatyNumber - The treaty number
   * @param params {PaginationParams} - Pagination parameters
   * @returns The list of committees for the specified treaty
   */
  async getTreatyCommittees(
    congress: number,
    treatyNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ treatyCommittees: TreatyCommittee[] }>(
      `/${congress}/${treatyNumber}/committees`,
      params,
    );
  }
}
