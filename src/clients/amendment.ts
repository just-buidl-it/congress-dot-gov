import { BaseClient } from './base';
import type {
  PaginationParams,
  DateFilterParams,
  BaseParams,
  PaginatedResponse,
} from '../types';
import type {
  ListAmendment,
  Amendment,
  AmendmentAction,
  AmendmentCosponsor,
  AmendmentText,
} from '../schemas/amendment';
import { AmendmentType } from '../schemas/constants';

export class AmendmentClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey, endpoint: '/amendment' });
  }

  /**
   * Returns a list of amendments sorted by date of latest action.
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameters
   * @returns A list of amendments sorted by date of latest action
   */
  async getAmendments(params: PaginationParams & DateFilterParams = {}) {
    return this.get<PaginatedResponse<{ amendments: ListAmendment[] }>>('', params);
  }

  /**
   * Returns a list of amendments filtered by the specified congress, sorted by date of latest action.
   * @param congress - The Congress number (e.g., 117)
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameters
   * @returns List of amendments filtered by the specified congress, sorted by date of latest action
   */
  async getAmendmentsByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<PaginatedResponse<{ amendments: ListAmendment[] }>>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of amendments filtered by the specified congress and amendment type, sorted by date of latest action.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameters
   * @returns List of amendments filtered by the specified congress and amendment type
   */
  async getAmendmentsByCongressAndType(
    congress: number,
    amendmentType: AmendmentType,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<PaginatedResponse<{ amendments: ListAmendment[] }>>(
      `/${congress}/${amendmentType.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified amendment.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param amendmentNumber - The amendment number
   * @param params {BaseParams} - Accepts format parameter (json or xml)
   * @returns Detailed information for the specified amendment
   */
  async getAmendment(
    congress: number,
    amendmentType: AmendmentType,
    amendmentNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<PaginatedResponse<{ amendment: Amendment }>>(
      `/${congress}/${amendmentType.toLowerCase()}/${amendmentNumber}`,
      params,
    );
  }

  /**
   * Returns the list of actions on a specified amendment.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param amendmentNumber - The amendment number
   * @param params {PaginationParams} - Accepts pagination  and format parameters
   * @returns List of actions on the specified amendment
   */
  async getAmendmentActions(
    congress: number,
    amendmentType: AmendmentType,
    amendmentNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ actions: AmendmentAction[] }>>(
      `/${congress}/${amendmentType.toLowerCase()}/${amendmentNumber}/actions`,
      params,
    );
  }

  /**
   * Returns the list of cosponsors on a specified amendment.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param amendmentNumber - The amendment number
   * @param params {PaginationParams} - Accepts pagination and formatparameters
   * @returns List of cosponsors on the specified amendment
   */
  async getAmendmentCosponsors(
    congress: number,
    amendmentType: AmendmentType,
    amendmentNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ cosponsors: AmendmentCosponsor[] }>>(
      `/${congress}/${amendmentType.toLowerCase()}/${amendmentNumber}/cosponsors`,
      params,
    );
  }

  /**
   * Returns the list of amendments to a specified amendment.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param amendmentNumber - The amendment number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of amendments to the specified amendment
   */
  async getAmendmentAmendments(
    congress: number,
    amendmentType: AmendmentType,
    amendmentNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ amendments: Amendment[] }>>(
      `/${congress}/${amendmentType.toLowerCase()}/${amendmentNumber}/amendments`,
      params,
    );
  }

  /**
   * Returns the list of text versions for a specified amendment from the 117th Congress onwards.
   * @param congress - The Congress number (e.g., 117)
   * @param amendmentType - The type of amendment (samdt or hamdt)
   * @param amendmentNumber - The amendment number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of text versions for the specified amendment
   */
  async getAmendmentText(
    congress: number,
    amendmentType: AmendmentType,
    amendmentNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ textVersions: AmendmentText[] }>>(
      `/${congress}/${amendmentType.toLowerCase()}/${amendmentNumber}/text`,
      params,
    );
  }
}
