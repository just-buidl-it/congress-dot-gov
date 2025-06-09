import { BaseClient } from './base';
import type { PaginationParams, PaginatedResponse } from '../types';
import type {
  ListHouseRollCallVote,
  HouseRollCallVote,
  HouseRollCallMemberVote,
} from '../schemas/house-vote';

export interface HouseVote {
  congress: number;
  session: number;
  voteNumber: number;
  date: string;
  question: string;
  description: string;
  result: string;
  title: string;
  chamber: string;
  rollCallType: string;
  totalYes: number;
  totalNo: number;
  totalNotVoting: number;
  totalPresent: number;
  sourceUrl?: string;
}

export interface HouseVoteMember {
  bioguideId: string;
  firstName: string;
  lastName: string;
  state: string;
  district?: string;
  party: string;
  vote: string;
}

export class HouseVoteClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, baseUrl: '/house-vote' });
  }

  /**
   * Returns House of Representatives roll call vote data from the API. This endpoint is currently in beta.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House roll call votes
   */
  async getHouseRollCallVotes(params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ houseRollCallVotes: ListHouseRollCallVote[] }>>(
      '',
      params,
    );
  }

  /**
   * Returns House of Representatives roll call vote data filtered by the specified Congress. This endpoint is currently in beta.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House roll call votes for the specified congress
   */
  async getHouseRollCallVotesByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ houseRollCallVotes: ListHouseRollCallVote[] }>>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns House of Representatives roll call vote data filtered by the specified Congress and session. This endpoint is currently in beta.
   * @param congress - The congress to filter by
   * @param session - The session to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House roll call votes for the specified congress and session
   */
  async getHouseRollCallVotesByCongressAndSession(
    congress: number,
    session: number,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ houseRollCallVotes: ListHouseRollCallVote[] }>>(
      `/${congress}/${session}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified House of Representatives roll call vote. This endpoint is currently in beta.
   * @param congress - The congress of the vote
   * @param session - The session of the vote
   * @param voteNumber - The vote number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns Detailed information for the specified House roll call vote
   */
  async getHouseRollCallVote(
    congress: number,
    session: number,
    voteNumber: number,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ houseRollCallVote: HouseRollCallVote[] }>>(
      `/${congress}/${session}/${voteNumber}`,
      params,
    );
  }

  /**
   * Returns detailed information for how members voted on a specified House of Representatives roll call vote. This endpoint is currently in beta.
   * @param congress - The congress of the vote
   * @param session - The session of the vote
   * @param voteNumber - The vote number
   * @param params Accepts format parameters
   * @returns A list of member votes for the specified House roll call vote
   */
  async getHouseRollCallVoteMembers(
    congress: number,
    session: number,
    voteNumber: number,
    params: PaginationParams = {},
  ) {
    return this.get<{ houseRollCallVoteMemberVotes: HouseRollCallMemberVote[] }>(
      `/${congress}/${session}/${voteNumber}/members`,
      params,
    );
  }
}
