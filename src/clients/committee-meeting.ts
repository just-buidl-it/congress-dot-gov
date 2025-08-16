import { BaseClient } from './base';
import { PaginationParams } from '../params';
import { CommitteeMeeting, ListCommitteeMeeting } from '../schemas/committee-meeting';
import { Chamber } from '../schemas/constants';
import type { RateLimiter } from '../rate-limiter/rate-limiter';

export class CommitteeMeetingClient extends BaseClient {
  constructor({ apiKey, rateLimiter }: { apiKey: string; rateLimiter?: RateLimiter }) {
    super({ apiKey, rateLimiter, endpoint: '/committee-meeting' });
  }

  /**
   * Returns a list of committee meetings.
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of committee meetings
   */
  async getMeetings(params: PaginationParams = {}) {
    return this.get<{ committeeMeetings: ListCommitteeMeeting[] }>('', params);
  }

  /**
   * Returns a list of committee meetings filtered by the specified congress.
   * @param congress - The congress to filter by
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of committee meetings for the specified congress
   */
  async getMeetingsByCongress(congress: number, params: PaginationParams = {}) {
    return this.get<{ committeeMeetings: ListCommitteeMeeting[] }>(
      `/${congress}`,
      params,
    );
  }

  /**
   * Returns a list of committee meetings filtered by the specified congress and chamber.
   * @param congress - The congress to filter by
   * @param chamber - The chamber to filter by
   * @param params {PaginationParams} - Pagination parameters
   * @returns A list of committee meetings for the specified congress and chamber
   */
  async getMeetingsByCongressAndChamber(
    congress: number,
    chamber: Chamber,
    params: PaginationParams = {},
  ) {
    return this.get<{ committeeMeetings: ListCommitteeMeeting[] }>(
      `/${congress}/${chamber.toLowerCase()}`,
      params,
    );
  }

  /**
   * Returns detailed information for a specified committee meeting.
   * @param congress - The congress of the meeting
   * @param chamber - The chamber of the meeting
   * @param eventId - The event ID of the meeting
   * @param params {PaginationParams} - Pagination parameters
   * @returns Detailed information for the specified committee meeting
   */
  async getMeeting(
    congress: number,
    chamber: Chamber,
    eventId: string,
    params: PaginationParams = {},
  ) {
    return this.get<{ committeeMeeting: CommitteeMeeting }>(
      `/${congress}/${chamber.toLowerCase()}/${eventId}`,
      params,
    );
  }
}
