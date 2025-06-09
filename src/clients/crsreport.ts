import { BaseClient } from './base';
import { BaseParams, PaginationParams } from '../types';
import type { ListCRSReport, CRSReport } from '../schemas/crsreport';

export class CRSReportClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/crsreport' });
  }

  /**
   * Returns Congressional Research Service (CRS) report data from the API.
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of CRS reports
   */
  async getReports(params: PaginationParams = {}) {
    return this.get<{ CRSReports: ListCRSReport[] }>('', params);
  }

  /**
   * Returns detailed information for a specified Congressional Research Service (CRS) report.
   * @param reportNumber - The report number to retrieve
   * @param params {BaseParams} - Format parameters
   * @returns Detailed information for the specified CRS report
   */
  async getReport(reportNumber: string, params: BaseParams = {}) {
    return this.get<{ CRSReport: CRSReport }>(`/${reportNumber}`, params);
  }
}
