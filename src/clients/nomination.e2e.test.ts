import { NominationClient } from './nomination';
import {
  ListNominationSchema,
  NominationSchema,
  NomineeSchema,
  NominationActionSchema,
  NominationCommitteeSchema,
  NominationHearingSchema,
} from '../schemas/nomination';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('NominationClient Integration Tests', () => {
  let client: NominationClient;

  beforeAll(() => {
    client = new NominationClient({ apiKey: API_KEY });
  });

  describe('getNominations', () => {
    it('should return nominations matching the schema', async () => {
      const { nominations } = await client.getNominations({ limit: 5 });

      expect(Array.isArray(nominations)).toBe(true);
      expect(nominations.length).toBeLessThanOrEqual(5);

      nominations.forEach((nomination) => {
        expect(ListNominationSchema.parse(nomination));
      });
    });
  });

  describe('getNominationsByCongress', () => {
    it('should return nominations for a specific congress', async () => {
      const { nominations } = await client.getNominationsByCongress(117, { limit: 5 });

      expect(Array.isArray(nominations)).toBe(true);
      expect(nominations.length).toBeLessThanOrEqual(5);

      nominations.forEach((nomination) => {
        expect(ListNominationSchema.parse(nomination));
      });
    });
  });

  describe('getNomination', () => {
    it('should return detailed nomination information', async () => {
      const { nomination } = await client.getNomination(117, '1');

      expect(NominationSchema.parse(nomination));
    });
  });

  describe('getNominees', () => {
    it('should return nominees for a specific position', async () => {
      const { nominees } = await client.getNominees(117, '1', '1');

      expect(Array.isArray(nominees)).toBe(true);
      nominees.forEach((action) => {
        expect(NomineeSchema.parse(action));
      });
    });
  });

  describe('getNominationActions', () => {
    it('should return actions for a specific nomination', async () => {
      const { actions } = await client.getNominationActions(117, '1');

      expect(Array.isArray(actions)).toBe(true);

      actions.forEach((action) => {
        expect(NominationActionSchema.parse(action));
      });
    });
  });

  describe('getNominationCommittees', () => {
    it('should return committees for a specific nomination', async () => {
      const { committees } = await client.getNominationCommittees(117, '1');

      expect(Array.isArray(committees)).toBe(true);

      committees.forEach((committee) => {
        expect(NominationCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getNominationHearings', () => {
    it('should return hearings for a specific nomination', async () => {
      const { hearings } = await client.getNominationHearings(117, '1');

      expect(Array.isArray(hearings)).toBe(true);

      hearings.forEach((hearing) => {
        expect(NominationHearingSchema.parse(hearing));
      });
    });
  });
});
