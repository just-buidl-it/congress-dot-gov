import { BaseClient } from './base';
import { PaginationParams, BaseParams } from '../types';
import {
  ListHouseCommunication,
  HouseCommunicationByCongress,
  HouseCommunication,
} from '../schemas/house-communication';

export class HouseCommunicationClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/house-communication' });
  }

  /**
   * Returns a list of House communications.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House communications
   */
  async getCommunications(params: PaginationParams = {}) {
    return this.get<{ houseCommunications: ListHouseCommunication[] }>('', params);
  }

  /**
   * Returns a list of House communications filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House communications for the specified congress
   */
  async getCommunicationsByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<{ houseCommunications: HouseCommunicationByCongress[] }>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of House communications filtered by the specified congress and communication type.
   * @param congress - The congress to filter by
   * @param communicationType - The communication type to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House communications for the specified congress and communication type
   */
  async getCommunicationsByCongressAndType(
    congress: number,
    communicationType: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ houseCommunications: HouseCommunicationByCongress[] }>(
      `/${congress}/${communicationType}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified House communication.
   * @param congress - The congress of the communication
   * @param communicationType - The type of the communication
   * @param communicationNumber - The communication number
   * @param params {BaseParams} - Accepts format parameter
   * @returns Detailed information for the specified House communication
   */
  async getCommunication(
    congress: number,
    communicationType: string,
    communicationNumber: string,
    params: BaseParams = {},
  ) {
    const resp = await this.get<{ 'house-communication'?: HouseCommunication }>(
      `/${congress}/${communicationType}/${communicationNumber}`,
      params,
    );
    const houseCommunication = resp['house-communication']!;
    delete resp['house-communication'];
    return { houseCommunication, ...resp };
  }
}
