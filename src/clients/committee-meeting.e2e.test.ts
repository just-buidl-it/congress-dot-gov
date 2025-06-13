import { CommitteeMeetingClient } from './committee-meeting';
import {
  ListCommitteeMeetingSchema,
  CommitteeMeetingSchema,
} from '../schemas/committee-meeting';
import { Chamber } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('CommitteeMeetingClient Integration Tests', () => {
  let client: CommitteeMeetingClient;

  beforeAll(() => {
    client = new CommitteeMeetingClient({ apiKey: API_KEY });
  });

  describe('getMeetings', () => {
    it('should return committee meetings matching the ListCommitteeMeeting interface', async () => {
      const { committeeMeetings } = await client.getMeetings({ limit: 5 });

      expect(Array.isArray(committeeMeetings)).toBe(true);
      expect(committeeMeetings.length).toBeLessThanOrEqual(5);

      committeeMeetings.forEach((meeting) => {
        expect(ListCommitteeMeetingSchema.parse(meeting));
      });
    });
  });

  describe('getMeetingsByCongress', () => {
    it('should return committee meetings for a specific congress', async () => {
      const { committeeMeetings } = await client.getMeetingsByCongress(118, { limit: 5 });

      expect(Array.isArray(committeeMeetings)).toBe(true);
      expect(committeeMeetings.length).toBeLessThanOrEqual(5);

      committeeMeetings.forEach((meeting) => {
        expect(ListCommitteeMeetingSchema.parse(meeting));
      });
    });
  });

  describe('getMeetingsByCongressAndChamber', () => {
    it('should return committee meetings for a specific congress and chamber', async () => {
      const { committeeMeetings } = await client.getMeetingsByCongressAndChamber(
        118,
        Chamber.HOUSE,
        { limit: 5 },
      );

      expect(Array.isArray(committeeMeetings)).toBe(true);
      expect(committeeMeetings.length).toBeLessThanOrEqual(5);

      committeeMeetings.forEach((meeting) => {
        expect(ListCommitteeMeetingSchema.parse(meeting));
      });
    });
  });

  describe('getMeeting', () => {
    it('should return detailed committee meeting information', async () => {
      const { committeeMeeting } = await client.getMeeting(118, Chamber.HOUSE, '115538');
      expect(CommitteeMeetingSchema.parse(committeeMeeting));
    });
  });
});
