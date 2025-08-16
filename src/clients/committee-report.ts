import { BaseClient } from './base';
import {
  PaginationParams,
  DateFilterParams,
  PaginatedResponse,
  BaseParams,
} from '../params';
import {
  ListCommitteeReport,
  CommitteeReport,
  CommitteeReportText,
} from '../schemas/committee-report';
import { CommitteeReportType } from '../schemas/constants';
import type { RateLimiter } from '../rate-limiter/rate-limiter';

export class CommitteeReportClient extends BaseClient {
  constructor({ apiKey, rateLimiter }: { apiKey: string; rateLimiter?: RateLimiter }) {
    super({ apiKey, rateLimiter, endpoint: '/committee-report' });
  }

  /**
   * Returns a list of committee reports.
   * @param params {PaginationParams & DateFilterParams & { conference: boolean}} - Accepts pagination, date range, and format parameters
   * @returns A list of committee reports
   */
  async getReports(
    params: PaginationParams & DateFilterParams & { conference?: boolean } = {},
  ) {
    return this.get<PaginatedResponse<{ reports: ListCommitteeReport[] }>>('', params);
  }

  /**
   * Returns a list of committee reports filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams & DateFilterParams & { conference: boolean}} - Accepts pagination, date range, and format parameters
   * @returns A list of committee reports for the specified congress
   */
  async getReportsByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams & { conference?: boolean } = {},
  ) {
    return this.get<PaginatedResponse<{ reports: ListCommitteeReport[] }>>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of committee reports filtered by the specified congress and chamber.
   * @param congress - The congress to filter by
   * @param reportType - The type of the report
   * @param params {PaginationParams & DateFilterParams & { conference: boolean}} - Accepts pagination, date range, and format parameters
   * @returns A list of committee reports for the specified congress and chamber
   */
  async getReportsByCongressAndChamber(
    congress: number,
    reportType: CommitteeReportType,
    params: PaginationParams & DateFilterParams & { conference?: boolean } = {},
  ) {
    return this.get<PaginatedResponse<{ reports: ListCommitteeReport[] }>>(
      `/${congress}/${reportType.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified committee report.
   * @param congress - The congress of the report
   * @param reportType - The type of the report
   * @param reportNumber - The report number
   * @param params {BaseParams} - Accepts format parameters
   * @returns Detailed information for the specified committee report
   */
  async getCommitteeReports(
    congress: number,
    reportType: CommitteeReportType,
    reportNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<{ committeeReports: CommitteeReport[] }>(
      `/${congress}/${reportType.toLowerCase()}/${reportNumber}`,
      params,
    );
  }

  /**
   * Returns the list of texts for a specified committee report.
   * @param congress - The congress of the report
   * @param reportType - The type of the report
   * @param reportNumber - The report number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of report texts
   */
  async getReportTexts(
    congress: number,
    reportType: CommitteeReportType,
    reportNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ text: CommitteeReportText[] }>>(
      `/${congress}/${reportType.toLowerCase()}/${reportNumber}/text`,
      params,
    );
  }
}
