import { DailyCongressionalRecordClient } from './daily-congressional-record';
import {
  DailyCongressionalRecordSchema,
  DailyCongressionalRecordIssueSchema,
  DailyCongressionalRecordArticleSchema,
} from '../schemas/daily-congressional-record';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('DailyCongressionalRecordClient Tests', () => {
  let client: DailyCongressionalRecordClient;

  beforeAll(() => {
    client = new DailyCongressionalRecordClient({ apiKey: API_KEY });
  });

  describe('getRecords', () => {
    it('should return daily congressional records matching the schema', async () => {
      const { dailyCongressionalRecord } = await client.getRecords({ limit: 5 });

      expect(Array.isArray(dailyCongressionalRecord)).toBe(true);
      expect(dailyCongressionalRecord.length).toBeLessThanOrEqual(5);

      dailyCongressionalRecord.forEach((record) => {
        expect(DailyCongressionalRecordSchema.parse(record));
      });
    });
  });

  describe('getRecordsByVolume', () => {
    it('should return records for a specific volume', async () => {
      const { dailyCongressionalRecord } = await client.getRecordsByVolume(169, {
        limit: 5,
      });

      expect(Array.isArray(dailyCongressionalRecord)).toBe(true);
      expect(dailyCongressionalRecord.length).toBeLessThanOrEqual(5);

      dailyCongressionalRecord.forEach((record) => {
        expect(DailyCongressionalRecordSchema.parse(record));
        expect(record.volumeNumber).toBe(169);
      });
    });
  });

  describe('getRecordsByVolumeAndIssue', () => {
    it('should return records for a specific volume and issue', async () => {
      const { issue } = await client.getRecordsByVolumeAndIssue(168, 153);
      expect(DailyCongressionalRecordIssueSchema.parse(issue));
    });
  });

  describe('getArticles', () => {
    it('should return articles for a specific volume and issue', async () => {
      const { articles } = await client.getArticles(169, 1, { limit: 5 });

      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeLessThanOrEqual(5);

      articles.forEach((article) => {
        expect(DailyCongressionalRecordArticleSchema.parse(article));
      });
    });
  });
});
