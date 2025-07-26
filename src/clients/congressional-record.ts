import { BaseClient } from './base';
import { AbnormalPaginatedResponse, CongressionalRecordFilterParams } from '../params';
import type { CapitalizedCongressionalRecord } from '../schemas/congressional-record';
import adaptAbnormalResponseAdapter from '../utils/abnormal-response-adapter';

export class CongressionalRecordClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/congressional-record' });
  }

  /**
   * Returns a list of congressional record issues sorted by most recent.
   * @param params {CongressionalRecordFilterParams} - Pagination parameters as well as y, m, d for filtering by date
   * @returns A list of congressional record issues
   */
  async getIssues(params: CongressionalRecordFilterParams = {}) {
    return adaptAbnormalResponseAdapter(
      await this.get<AbnormalPaginatedResponse<CapitalizedCongressionalRecord>>(
        '',
        params,
      ),
      params,
      'https://api.congress.gov/v3/congressional-record',
    );
  }
}
