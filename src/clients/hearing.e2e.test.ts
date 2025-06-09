import { HearingClient } from './hearing';
import { ListHearingSchema, HearingSchema } from '../schemas/hearing';
import { Chamber } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('HearingClient Integration Tests', () => {
  let client: HearingClient;

  beforeAll(() => {
    client = new HearingClient({ apiKey: API_KEY });
  });

  describe('getHearings', () => {
    it('should return hearings matching the ListHearing interface', async () => {
      const { hearings } = await client.getHearings({ limit: 5 });

      expect(Array.isArray(hearings)).toBe(true);
      expect(hearings.length).toBeLessThanOrEqual(5);

      hearings.forEach((hearing) => {
        expect(ListHearingSchema.parse(hearing));
      });
    });
  });

  describe('getHearingsByCongress', () => {
    it('should return hearings for a specific congress', async () => {
      const { hearings } = await client.getHearingsByCongress(116, { limit: 5 });

      expect(Array.isArray(hearings)).toBe(true);
      expect(hearings.length).toBeLessThanOrEqual(5);

      hearings.forEach((hearing) => {
        expect(ListHearingSchema.parse(hearing));
      });
    });
  });

  describe('getHearingsByCongressAndChamber', () => {
    it('should return hearings for a specific congress and chamber', async () => {
      const { hearings } = await client.getHearingsByCongressAndChamber(
        118,
        Chamber.HOUSE,
        { limit: 5 },
      );

      expect(Array.isArray(hearings)).toBe(true);
      expect(hearings.length).toBeLessThanOrEqual(5);

      hearings.forEach((hearing) => {
        expect(ListHearingSchema.parse(hearing));
      });
    });
  });

  describe('getHearing', () => {
    it('should return detailed hearing information', async () => {
      const { hearing } = await client.getHearing(116, Chamber.HOUSE, '41365');
      expect(HearingSchema.parse(hearing));
    });
  });
});
