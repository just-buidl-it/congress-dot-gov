/**
 * @packageDocumentation
 * Client for the `congress` endpoints.
 */
import { BaseClient } from './base';
import type { PaginationParams, PaginatedResponse, BaseParams } from '../types';
import type { CongressSummary, Congress } from '../schemas/congress';

export class CongressClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/congress' });
  }

  /**
   * Returns a list of congresses and congressional sessions.
   * @param params {@link PaginationParams} - Pagination and format parameters
   * @returns A list of {@link CongressSummary congresses} and their sessions
   */
  async getCongresses(params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ congresses: CongressSummary[] }>>('', params);
  }

  /**
   * Returns detailed information for a specified congress.
   * @param congress - The Congress number (e.g., 117)
   * @param params {@link BaseParams} - Accepts format parameter (json or xml)
   * @returns {@link Congress Detail} information for the specified congress
   */
  async getCongress(congress: number, params: BaseParams = {}) {
    return this.get<{ congress: Congress }>(`/${congress}`, params);
  }

  /**
   * Returns detailed information for the current congress.
   * @param params {@link BaseParams} - Accepts format parameter (json or xml)
   * @returns {@link Congress Detail} information for the current congress
   */
  async getCurrentCongress(params: BaseParams = {}) {
    return this.get<{ congress: Congress }>('/current', params);
  }
}
