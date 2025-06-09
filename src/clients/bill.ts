import { BaseClient } from './base';
import type {
  PaginationParams,
  BaseParams,
  PaginatedResponse,
  DateFilterParams,
  SortParams,
} from '../types';
import type {
  ListBill,
  Bill,
  BillAction,
  BillAmendment,
  BillCommittee,
  BillCosponsor,
  RelatedBill,
  BillSubject,
  BillSummary,
  BillText,
  BillTitle,
  Law,
} from '../schemas/bill';
import type { BillType, LawType } from '../schemas/constants';

export class BillClient extends BaseClient {
  constructor({ apiKey }: { apiKey: string }) {
    super({ apiKey });
  }

  /**
   * Returns a list of bills sorted by date of latest action.
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameters
   * @returns A list of bills sorted by date of latest action
   */
  async getBills(params: PaginationParams & DateFilterParams & SortParams = {}) {
    return this.get<PaginatedResponse<{ bills: ListBill[] }>>('/bill', params);
  }

  /**
   * Returns a list of bills filtered by the specified congress, sorted by date of latest action.
   * @param congress - The Congress number (e.g., 117)
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameters
   * @returns Returns a list of bills filtered by the specified congress, sorted by date of latest action.
   */
  async getBillsByCongress(
    congress: number,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ bills: ListBill[] }>>(
      `/bill/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of bills filtered by the specified congress and bill type, sorted by date of latest action.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameters
   * @returns List of bills filtered by the specified congress and bill type, sorted by date of latest action.
   */
  async getBillsByCongressAndType(
    congress: number,
    billType: BillType,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ bills: ListBill[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.
   * @param billNumber - The bill number
   * @param params {BaseParams} - Accepts format parameter (json or xml)
   * @returns Detailed information for a specified bill.
   */
  async getBill(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: BaseParams = {},
  ) {
    return this.get<{ bill: Bill }>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}`,
      params,
    );
  }

  /**
   * Returns the list of actions on a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of actions on the specified bill
   */
  async getBillActions(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ actions: BillAction[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/actions`,
      params,
    );
  }

  /**
   * Returns the list of amendments to a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of amendments to the specified bill
   */
  async getBillAmendments(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ amendments: BillAmendment[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/amendments`,
      params,
    );
  }

  /**
   * Returns the list of committees associated with a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of committees associated with the specified bill
   */
  async getBillCommittees(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ committees: BillCommittee[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/committees`,
      params,
    );
  }

  /**
   * Returns the list of cosponsors on a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams & DateFilterParams & SortParams} - Accepts pagination, date range filter, sort, and format parameters
   * @returns List of cosponsors on the specified bill
   */
  async getBillCosponsors(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ cosponsors: BillCosponsor[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/cosponsors`,
      params,
    );
  }

  /**
   * Returns the list of related bills to a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of related bills to the specified bill
   */
  async getRelatedBills(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ relatedBills: RelatedBill[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/relatedbills`,
      params,
    );
  }

  /**
   * Returns the list of legislative subjects on a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameters
   * @returns List of legislative subjects on the specified bill
   */
  async getBillSubjects(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<PaginatedResponse<{ subjects: BillSubject }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/subjects`,
      params,
    );
  }

  /**
   * Returns the list of summaries for a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of summaries for the specified bill
   */
  async getBillSummaries(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ summaries: BillSummary[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/summaries`,
      params,
    );
  }

  /**
   * Returns the list of text versions for a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of text versions for the specified bill
   */
  async getBillText(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<PaginatedResponse<{ textVersions: BillText[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/text`,
      params,
    );
  }

  /**
   * Returns the list of titles for a specified bill.
   * @param congress - The Congress number (e.g., 117)
   * @param billType - The type of bill
   * @param billNumber - The bill number
   * @param params {PaginationParams & DateFilterParams} - Accepts pagination, date range filter, and format parameters
   * @returns List of titles for the specified bill
   */
  async getBillTitles(
    congress: number,
    billType: BillType,
    billNumber: string,
    params: PaginationParams & DateFilterParams = {},
  ) {
    return this.get<PaginatedResponse<{ titles: BillTitle[] }>>(
      `/bill/${congress}/${billType.toLowerCase()}/${billNumber}/titles`,
      params,
    );
  }

  /**
   * Returns a list of laws filtered by the specified congress.
   * @param congress - The Congress number (e.g., 117)
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of laws for the specified congress
   */
  async getLaws(
    congress: number,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ bills: Law[] }>>(`/law/${congress}`, params);
  }

  /**
   * Returns a list of laws filtered by specified congress and law type.
   * @param congress - The Congress number (e.g., 117)
   * @param lawType - The type of law (public or private)
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns List of laws for the specified congress and law type
   */
  async getLawsByType(
    congress: number,
    lawType: LawType,
    params: PaginationParams & DateFilterParams & SortParams = {},
  ) {
    return this.get<PaginatedResponse<{ bills: Law[] }>>(
      `/law/${congress}/${lawType}`,
      params,
    );
  }

  /**
   * Returns a law filtered by specified congress, law type, and law number.
   * @param congress - The Congress number (e.g., 117)
   * @param lawType - The type of law (public or private)
   * @param lawNumber - The law number
   * @param params {PaginationParams} - Accepts pagination and format parameters
   * @returns The specified law
   */
  async getLaw(
    congress: number,
    lawType: LawType,
    lawNumber: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ bill: Law }>(`/law/${congress}/${lawType}/${lawNumber}`, params);
  }
}

export type {
  Bill,
  BillType,
  LawType,
  BillAction,
  BillAmendment,
  BillCommittee,
  BillCosponsor,
  RelatedBill,
  BillSubject,
  BillSummary,
  BillText,
  BillTitle,
  Law,
};
