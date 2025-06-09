import { BaseClient } from './base';
import { PaginationParams, PaginatedResponse, BaseParams } from '../types';
import type {
  ListHouseRequirement,
  HouseRequirement,
  MatchingCommunications,
} from '../schemas/house-requirement';

export class HouseRequirementClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/house-requirement' });
  }

  /**
   * Returns a list of House requirements.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House requirements
   */
  async getRequirements(params: PaginationParams = {}) {
    return this.get<{ houseRequirements: PaginatedResponse<ListHouseRequirement[]> }>(
      '',
      params,
    );
  }

  /**
   * Returns detailed information for a specified House requirement.
   * @param requirementNumber - The requirement number
   * @param params {BaseParams} - Accepts format parameter
   * @returns Detailed information for the specified House requirement
   */
  async getRequirement(requirementNumber: string, params: BaseParams = {}) {
    return this.get<{ houseRequirement: HouseRequirement }>(
      `/${requirementNumber}`,
      params,
    );
  }

  /**
   * Returns a list of matching communications to a House requirement.
   * @param requirementNumber - The requirement number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of matching communications
   */
  async getMatchingCommunications(requirementNumber: string, params: BaseParams = {}) {
    return this.get<{ matchingCommunications: MatchingCommunications[] }>(
      `/${requirementNumber}/matching-communications`,
      params,
    );
  }
}
