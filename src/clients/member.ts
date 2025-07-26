import { BaseClient } from './base';
import type {
  PaginationParams,
  PaginatedResponse,
  BaseParams,
  DateFilterParams,
} from '../params';
import type {
  MemberSummary,
  MemberDetail,
  SponsoredLegislation,
  CoSponsoredLegislation,
} from '../schemas/member';

export interface MemberParams {
  currentMember?: boolean;
}

export class MemberClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/member' });
  }

  /**
   * Returns a list of congressional members.
   * @param params {PaginationParams & DateFilterParams & MemberParams} - Accepts pagination, date range filter, and format parameter (json or xml)
   * @returns A list of congressional members
   */
  async getMembers(params: PaginationParams & DateFilterParams & MemberParams = {}) {
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>('', params);
  }

  /**
   * Returns detailed information for a specified congressional member.
   * @param bioguideId - The bioguide ID of the member
   * @param params {BaseParams} - Accepts format parameter (json or xml)
   * @returns Detailed information for the specified member
   */
  async getMember(bioguideId: string, params: BaseParams = {}) {
    return this.get<{ member: MemberDetail }>(`/${bioguideId}`, params);
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
   * Returns the list of members specified by prior Congress. This queries with currentMember=false filter. [Docs](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/MemberEndpoint.md#a-note-on-filtering-members-by-congress)
   * @param congress - The congress to filter by
   * @param params {PaginationParams & MemberParams} - Pagination and format parameters
   * @returns A list of members for the specified congress
   */
  async getMembersByPriorCongress(
    congress: number,
    params: PaginationParams & MemberParams = {},
  ) {
    params.currentMember = false;
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>(
      `/congress/${congress}`,
      params,
    );
  }

  /**
   * Returns the list of members specified by current Congress. This queries with currentMember=true filter. [Docs](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/MemberEndpoint.md#a-note-on-filtering-members-by-congress)
   * @param congress - The congress to filter by
   * @param params {PaginationParams & MemberParams} - Pagination and format parameters
   * @returns A list of members for the specified congress
   */
  async getMembersByCurrentCongress(
    congress: number,
    params: PaginationParams & MemberParams = {},
  ) {
    params.currentMember = true;
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>(
      `/congress/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by state.
   * @param stateCode - The state code to filter by
   * @param params {PaginationParams & MemberParams} - Pagination and format parameters
   * @returns A list of members for the specified state
   */
  async getMembersByState(
    stateCode: string,
    params: PaginationParams & MemberParams = {},
  ) {
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>(
      `/${stateCode}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by state and district.
   * @param stateCode - The state code to filter by
   * @param district - The district to filter by
   * @param params {PaginationParams & MemberParams} - Pagination and format parameters
   * @returns A list of members for the specified state and district
   */
  async getMembersByStateAndDistrict(
    stateCode: string,
    district: string,
    params: PaginationParams & MemberParams = {},
  ) {
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>(
      `/${stateCode}/${district}`,
      params,
    );
  }

  /**
   * Returns a list of members filtered by congress, state and district.
   * There are instances where a member has been redistricted but previously represented the district you are generating an API request for and, thus, appears in the returned data.
   * If you are looking for ONLY the current member of a particular district, please use the currentMember=True filter to get the most accurate results
   * @param congress - The congress to filter by
   * @param stateCode - The state code to filter by
   * @param district - The district to filter by
   * @param params {PaginationParams & MemberParams} - Pagination and format parameters. Default is currentMember=true.
   * @returns A list of members for the specified congress, state and district
   */
  async getMembersByCongressStateAndDistrict(
    congress: number,
    stateCode: string,
    district: string,
    params: PaginationParams & MemberParams = { currentMember: true },
  ) {
    return this.get<PaginatedResponse<{ members: MemberSummary[] }>>(
      `/congress/${congress}/${stateCode}/${district}`,
      params,
    );
  }
}
