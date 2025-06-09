import { BaseClient } from './base';
import type {
  PaginationParams,
  PaginatedResponse,
  BaseParams,
  DateFilterParams,
} from '../types';
import type {
  ListMember,
  Member,
  SponsoredLegislation,
  CoSponsoredLegislation,
  CongressMember,
} from '../schemas/member';

export interface MemberParams {
  currentMember?: boolean;
}

export class MemberClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/member' });
  }

  /**
   * Returns a list of congressional members.
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameter (json or xml)
   * @returns A list of congressional members
   */
  async getMembers(params: PaginationParams & DateFilterParams & MemberParams = {}) {
    return this.get<PaginatedResponse<{ members: ListMember[] }>>('', params);
  }

  /**
   * Returns detailed information for a specified congressional member.
   * @param bioguideId - The bioguide ID of the member
   * @param params {BaseParams} - Accepts format parameter (json or xml)
   * @returns Detailed information for the specified member
   */
  async getMember(bioguideId: string, params: BaseParams = {}) {
    return this.get<{ member: Member }>(`/${bioguideId}`, params);
  }

  /**
   * Returns the list of legislation sponsored by a specified congressional member.
   * @param bioguideId - The bioguide ID of the member
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of sponsored legislation
   */
  async getSponsoredLegislation(bioguideId: string, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ sponsoredLegislation: SponsoredLegislation[] }>>(
      `/${bioguideId}/sponsored-legislation`,
      params,
    );
  }

  /**
   * Returns the list of legislation cosponsored by a specified congressional member.
   * @param bioguideId - The bioguide ID of the member
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of cosponsored legislation
   */
  async getCosponsoredLegislation(bioguideId: string, params: PaginationParams = {}) {
    return this.get<
      PaginatedResponse<{ cosponsoredLegislation: CoSponsoredLegislation[] }>
    >(`/${bioguideId}/cosponsored-legislation`, params);
  }

  /**
   * Returns the list of members specified by Congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of members for the specified congress
   */
  async getMembersByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ members: CongressMember[] }>>(
      `/congress/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by state.
   * @param stateCode - The state code to filter by
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of members for the specified state
   */
  async getMembersByState(stateCode: string, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ members: CongressMember[] }>>(
      `/${stateCode}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by state and district.
   * @param stateCode - The state code to filter by
   * @param district - The district to filter by
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of members for the specified state and district
   */
  async getMembersByStateAndDistrict(
    stateCode: string,
    district: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ members: CongressMember[] }>>(
      `/${stateCode}/${district}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by congress, state and district.
   * @param congress - The congress to filter by
   * @param stateCode - The state code to filter by
   * @param district - The district to filter by
   * @param params {PaginationParams} - Pagination and format parameters
   * @returns A list of members for the specified congress, state and district
   */
  async getMembersByCongressStateAndDistrict(
    congress: number,
    stateCode: string,
    district: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ members: CongressMember[] }>>(
      `/congress/${congress}/${stateCode}/${district}`,
      params,
    );
  }
}
