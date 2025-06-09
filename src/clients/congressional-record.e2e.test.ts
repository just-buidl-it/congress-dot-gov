import { CongressionalRecordClient } from './congressional-record';
import { CongressionalRecordSchema } from '../schemas/congressional-record';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('CongressionalRecordClient Integration Tests', () => {
  let client: CongressionalRecordClient;

  beforeAll(() => {
    client = new CongressionalRecordClient({ apiKey: API_KEY });
  });

  describe('getIssues', () => {
    it('should return congressional record issues matching the schema', async () => {
      const { issues } = await client.getIssues({ limit: 5 });

      expect(Array.isArray(issues)).toBe(true);
      expect(issues.length).toBeLessThanOrEqual(5);

      issues.forEach((issue) => {
        expect(CongressionalRecordSchema.parse(issue));
      });
    });
  });
});
