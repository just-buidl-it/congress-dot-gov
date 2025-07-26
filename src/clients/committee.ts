import { BaseClient } from './base';
import type { PaginationParams, PaginatedResponse } from '../params';
import type {
  ListCommittee,
  Committee,
  CommitteeBill,
  CommitteeNomination,
  CommitteeCommunication,
} from '../schemas/committee';
import type { ListCommitteeReport } from '../schemas/committee-report';
import { Chamber } from '../schemas/constants';

export class CommitteeClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/committee' });
  }

  /**
   * Returns a list of congressional committees.
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of congressional committees
   */
  async getCommittees(params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ committees: ListCommittee[] }>>('', params);
  }

  /**
   * Returns a list of congressional committees filtered by the specified chamber.
   * @param chamber - The chamber to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of congressional committees for the specified chamber
   */
  async getCommitteesByChamber(chamber: Chamber, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ committees: ListCommittee[] }>>(
      `/${chamber}`,
      params,
    );
  }

  /**
   * Returns a list of congressional committees filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of congressional committees for the specified congress
   */
  async getCommitteesByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<PaginatedResponse<{ committees: ListCommittee[] }>>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of committees filtered by the specified congress and chamber.
   * @param congress - The congress to filter by
   * @param chamber - The chamber to filter by
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of committees for the specified congress and chamber
   */
  async getCommitteesByCongressAndChamber(
    congress: number,
    chamber: Chamber,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ committees: ListCommittee[] }>>(
      `/${congress}/${chamber.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns Detailed information for the specified committee
   */
  async getCommittee(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ committee: Committee }>(
      `/${chamber.toLowerCase()}/${committeeCode}`,
      params,
    );
  }

  /**
   * Returns the list of legislation associated with the specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of bills associated with the committee
   */
  async getCommitteeBills(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    const resp = await this.get<
      PaginatedResponse<{ 'committee-bills'?: { bills: CommitteeBill[] } }>
    >(`/${chamber.toLowerCase()}/${committeeCode}/bills`, params);
    const committeeBills = resp['committee-bills']!;
    delete resp['committee-bills'];
    return { committeeBills, ...resp };
  }

  /**
   * Returns the list of committee reports associated with a specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of committee reports
   */
  async getCommitteeReports(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ reports: ListCommitteeReport[] }>>(
      `/${chamber.toLowerCase()}/${committeeCode}/reports`,
      params,
    );
  }

  /**
   * Returns the list of nominations associated with a specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of nominations
   */
  async getCommitteeNominations(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ nominations: CommitteeNomination[] }>>(
      `/${chamber.toLowerCase()}/${committeeCode}/nominations`,
      params,
    );
  }

  /**
   * Returns the list of House communications associated with a specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of House communications
   */
  async getCommitteeHouseCommunications(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ houseCommunications: CommitteeCommunication[] }>>(
      `/${chamber.toLowerCase()}/${committeeCode}/house-communication`,
      params,
    );
  }

  /**
   * Returns the list of Senate communications associated with a specified congressional committee.
   * @param chamber - The chamber of the committee
   * @param committeeCode - The committee code
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns A list of Senate communications
   */
  async getCommitteeSenateCommunications(
    chamber: Chamber,
    committeeCode: string,
    params: PaginationParams = {},
  ) {
    return this.get<
      PaginatedResponse<{ senateCommunications: CommitteeCommunication[] }>
    >(`/${chamber.toLowerCase()}/${committeeCode}/senate-communication`, params);
  }
}
