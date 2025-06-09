import { BaseClient } from './base';
import type { PaginationParams } from '../types';
import type {
  ListSenateCommunication,
  SenateCommunication,
} from '../schemas/senate-communication';

export class SenateCommunicationClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/senate-communication' });
  }

  /**
   * Returns a list of Senate communications.
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of Senate communications
   */
  async getCommunications(params: PaginationParams = {}) {
    return this.get<{ senateCommunications: ListSenateCommunication[] }>('', params);
  }

  /**
   * Returns a list of Senate communications filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of Senate communications for the specified congress
   */
  async getCommunicationsByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<{ senateCommunications: ListSenateCommunication[] }>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of Senate communications filtered by the specified congress and communication type.
   * @param congress - The congress to filter by
   * @param communicationType - The communication type to filter by
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of Senate communications for the specified congress and communication type
   */
  async getCommunicationsByCongressAndType(
    congress: number,
    communicationType: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ senateCommunications: ListSenateCommunication[] }>(
      `/${congress}/${communicationType}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified Senate communication.
   * @param congress - The congress of the communication
   * @param communicationType - The type of the communication
   * @param communicationNumber - The communication number
   * @param params {PaginationParams} - Pagination parameters
   * @returns Detailed information for the specified Senate communication
   */
  async getCommunication(
    congress: number,
    communicationType: string,
    communicationNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ senateCommunication: SenateCommunication }>(
      `/${congress}/${communicationType}/${communicationNumber}`,
      params,
    );
  }
}
