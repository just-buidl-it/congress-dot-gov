import { BaseClient } from './base';
import type { PaginationParams, DateFilterParams, BaseParams } from '../params';
import type {
  CommitteePrint,
  ListCommitteePrint,
  CommitteePrintText,
} from '../schemas/committee-print';
import { Chamber } from '../schemas/constants';

export class CommitteePrintClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/committee-print' });
  }

  /**
   * Returns a list of committee prints.
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range, and format parameters
   * @returns A list of committee prints
   */
  async getPrints(params: PaginationParams & DateFilterParams = {}) {
    return this.get<{ committeePrints: ListCommitteePrint[] }>('', params);
  }

  /**
   * Returns a list of committee prints filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range, and format parameters
   * @returns A list of committee prints for the specified congress
   */
  async getPrintsByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<{ committeePrints: ListCommitteePrint[] }>(`/${congress}`, params);
  }

  /**
   * Returns a list of committee prints filtered by the specified congress and chamber.
   * @param congress - The congress to filter by
   * @param chamber - The chamber to filter by
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range, and format parameters
   * @returns A list of committee prints for the specified congress and chamber
   */
  async getPrintsByCongressAndChamber(
    congress: number,
    chamber: Chamber,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<{ committeePrints: ListCommitteePrint[] }>(
      `/${congress}/${chamber}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified committee print.
   * @param congress - The congress of the print
   * @param chamber - The chamber of the print
   * @param printNumber - The print number
   * @param params {BaseParams} - Accepts format parameters
   * @returns Detailed information for the specified committee print
   */
  async getPrint(
    congress: number,
    chamber: Chamber,
    printNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<{ committeePrint: CommitteePrint[] }>(
      `/${congress}/${chamber}/${printNumber}`,
      params,
    );
  }

  /**
   * Returns the list of texts for a specified committee print.
   * @param congress - The congress of the print
   * @param chamber - The chamber of the print
   * @param jacketNumber - The jacket number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of texts for a specified committee print.
   */
  async getPrintTexts(
    congress: number,
    chamber: Chamber,
    jacketNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ text: CommitteePrintText[] }>(
      `/${congress}/${chamber}/${jacketNumber}/text`,
      params,
    );
  }
}
