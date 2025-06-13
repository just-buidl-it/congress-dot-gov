import { BoundCongressionalRecordClient } from './bound-congressional-record';
import {
  BoundCongressionalRecordSchema,
  DailyDigestBoundCongressionalRecordSchema,
} from '../schemas/bound-congressional-record';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('BoundCongressionalRecordClient Integration Tests', () => {
  let client: BoundCongressionalRecordClient;

  beforeAll(() => {
    client = new BoundCongressionalRecordClient({ apiKey: API_KEY });
  });

  describe('getRecords', () => {
    it('should return records matching the CongressionalRecord interface', async () => {
      const { boundCongressionalRecord } = await client.getRecords({ limit: 5 });

      expect(Array.isArray(boundCongressionalRecord)).toBe(true);
      expect(boundCongressionalRecord.length).toBeLessThanOrEqual(5);

      boundCongressionalRecord.forEach((record) => {
        expect(BoundCongressionalRecordSchema.parse(record));
      });
    });
  });

  describe('getRecordsByYear', () => {
    it('should return records for a specific year', async () => {
      const { boundCongressionalRecord } = await client.getRecordsByYear('1948', {
        limit: 5,
      });

      expect(Array.isArray(boundCongressionalRecord)).toBe(true);
      expect(boundCongressionalRecord.length).toBeLessThanOrEqual(5);

      boundCongressionalRecord.forEach((record) => {
        expect(BoundCongressionalRecordSchema.parse(record));
      });
    });
  });

  describe('getRecordsByYearAndMonth', () => {
    it('should return records for a specific year and month', async () => {
      const { boundCongressionalRecord } = await client.getRecordsByYearAndMonth(
        '1948',
        '05',
        { limit: 5 },
      );

      expect(Array.isArray(boundCongressionalRecord)).toBe(true);
      expect(boundCongressionalRecord.length).toBeLessThanOrEqual(5);

      boundCongressionalRecord.forEach((record) => {
        expect(BoundCongressionalRecordSchema.parse(record));
      });
    });
  });

  describe('getRecordsByDate', () => {
    it('should return records for a specific date', async () => {
      const { boundCongressionalRecord } = await client.getRecordsByDate(
        '1948',
        '05',
        '19',
        { limit: 5 },
      );

      expect(Array.isArray(boundCongressionalRecord)).toBe(true);
      expect(boundCongressionalRecord.length).toBeLessThanOrEqual(5);

      boundCongressionalRecord.forEach((record) => {
        expect(DailyDigestBoundCongressionalRecordSchema.parse(record));
      });
    });
  });
});
