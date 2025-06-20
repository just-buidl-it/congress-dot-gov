import { CongressClient } from './congress';
import { CongressSummarySchema, CongressSchema } from '../schemas/congress';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('CongressClient Tests', () => {
  let client: CongressClient;

  beforeAll(() => {
    client = new CongressClient({ apiKey: API_KEY });
  });

  describe('getCongresses', () => {
    it('should return congresses matching the Congress interface', async () => {
      const { congresses } = await client.getCongresses({ limit: 5 });

      expect(Array.isArray(congresses)).toBe(true);
      expect(congresses.length).toBeLessThanOrEqual(5);

      congresses.forEach((congress) => {
        expect(CongressSummarySchema.parse(congress));
      });
    });
  });

  describe('getCongress', () => {
    it('should return detailed congress information', async () => {
      const { congress } = await client.getCongress(117);
      expect(CongressSchema.parse(congress));
    });
  });

  describe('getCurrentCongress', () => {
    it('should return current congress information', async () => {
      const { congress } = await client.getCurrentCongress();
      expect(CongressSchema.parse(congress));
    });
  });
});
