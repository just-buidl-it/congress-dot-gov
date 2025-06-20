import { CommitteePrintClient } from './committee-print';
import {
  ListCommitteePrintSchema,
  CommitteePrintSchema,
  CommitteePrintTextSchema,
} from '../schemas/committee-print';
import { Chamber } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('CommitteePrintClient Tests', () => {
  let client: CommitteePrintClient;

  beforeAll(() => {
    client = new CommitteePrintClient({ apiKey: API_KEY });
  });

  describe('getPrints', () => {
    it('should return committee prints matching the ListCommitteePrint interface', async () => {
      const { committeePrints } = await client.getPrints({ limit: 5 });

      expect(Array.isArray(committeePrints)).toBe(true);
      expect(committeePrints.length).toBeLessThanOrEqual(5);

      committeePrints.forEach((print) => {
        expect(ListCommitteePrintSchema.parse(print));
      });
    });
  });

  describe('getPrintsByCongress', () => {
    it('should return committee prints for a specific congress', async () => {
      const { committeePrints } = await client.getPrintsByCongress(117, { limit: 5 });

      expect(Array.isArray(committeePrints)).toBe(true);
      expect(committeePrints.length).toBeLessThanOrEqual(5);

      committeePrints.forEach((print) => {
        expect(ListCommitteePrintSchema.parse(print));
      });
    });
  });

  describe('getPrintsByCongressAndChamber', () => {
    it('should return committee prints for a specific congress and chamber', async () => {
      const { committeePrints } = await client.getPrintsByCongressAndChamber(
        117,
        Chamber.HOUSE,
        { limit: 5 },
      );

      expect(Array.isArray(committeePrints)).toBe(true);
      expect(committeePrints.length).toBeLessThanOrEqual(5);

      committeePrints.forEach((print) => {
        expect(ListCommitteePrintSchema.parse(print));
      });
    });
  });

  describe('getPrint', () => {
    it('should return detailed committee print information', async () => {
      const { committeePrint } = await client.getPrint(117, Chamber.HOUSE, '1');

      committeePrint.forEach((print) => {
        expect(CommitteePrintSchema.parse(print));
      });
    });
  });

  describe('getPrintTexts', () => {
    it('should return list of texts for a specified committee print', async () => {
      const { text } = await client.getPrintTexts(117, Chamber.HOUSE, '48144');
      expect(Array.isArray(text)).toBe(true);

      text.forEach((text) => {
        expect(CommitteePrintTextSchema.parse(text));
      });
    });
  });
});
