import { SummariesClient } from './summaries';
import { SummarySchema } from '../schemas/summary';
import { BillType } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('SummariesClient Integration Tests', () => {
  let client: SummariesClient;

  beforeAll(() => {
    client = new SummariesClient({ apiKey: API_KEY });
  });

  describe('getSummaries', () => {
    it('should return summaries matching the ListSummary interface', async () => {
      const { summaries } = await client.getSummaries({ limit: 5 });

      expect(Array.isArray(summaries)).toBe(true);
      expect(summaries.length).toBeLessThanOrEqual(5);

      summaries.forEach((summary) => {
        expect(SummarySchema.parse(summary));
      });
    });
  });

  describe('getSummariesByCongress', () => {
    it('should return summaries for a specific congress', async () => {
      const { summaries } = await client.getSummariesByCongress(117, { limit: 5 });

      expect(Array.isArray(summaries)).toBe(true);
      expect(summaries.length).toBeLessThanOrEqual(5);

      summaries.forEach((summary) => {
        expect(SummarySchema.parse(summary));
      });
    });
  });

  describe('getSummariesByCongressAndType', () => {
    it('should return summaries for a specific congress by bill type', async () => {
      const { summaries } = await client.getSummariesByCongressAndType(117, BillType.HR, {
        limit: 5,
      });

      expect(Array.isArray(summaries)).toBe(true);
      expect(summaries.length).toBeLessThanOrEqual(5);

      summaries.forEach((summary) => {
        expect(SummarySchema.parse(summary));
      });
    });
  });
});
