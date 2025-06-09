import { TreatyClient } from './treaty';
import {
  ListTreatySchema,
  TreatySchema,
  TreatyActionSchema,
  TreatyCommitteeSchema,
} from '../schemas/treaty';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('TreatyClient Integration Tests', () => {
  let client: TreatyClient;

  beforeAll(() => {
    client = new TreatyClient({ apiKey: API_KEY });
  });

  describe('getTreaties', () => {
    it('should return treaties matching the schema', async () => {
      const { treaties } = await client.getTreaties({ limit: 5 });

      expect(Array.isArray(treaties)).toBe(true);
      expect(treaties.length).toBeLessThanOrEqual(5);

      treaties.forEach((treaty) => {
        expect(ListTreatySchema.parse(treaty));
      });
    });
  });

  describe('getTreatiesByCongress', () => {
    it('should return treaties for a specific congress', async () => {
      const { treaties } = await client.getTreatiesByCongress(117, { limit: 5 });

      expect(Array.isArray(treaties)).toBe(true);
      expect(treaties.length).toBeLessThanOrEqual(5);

      treaties.forEach((treaty) => {
        expect(ListTreatySchema.parse(treaty));
      });
    });
  });

  describe('getTreaty', () => {
    it('should return detailed treaty information', async () => {
      const { treaty } = await client.getTreaty(117, '3');

      expect(TreatySchema.parse(treaty));
    });
  });

  describe('getPartitionedTreaty', () => {
    it('should return detailed partitioned treaty information', async () => {
      const { treaty } = await client.getPartitionedTreaty(114, '13', 'A');

      expect(TreatySchema.parse(treaty));
    });
  });

  describe('getTreatyActions', () => {
    it('should return actions for a specific treaty', async () => {
      const { actions } = await client.getTreatyActions(117, '3');

      expect(Array.isArray(actions)).toBe(true);
      actions.forEach((action) => {
        expect(TreatyActionSchema.parse(action));
      });
    });
  });

  describe('getPartitionedTreatyActions', () => {
    it('should return actions for a specific partitioned treaty', async () => {
      const { actions } = await client.getPartitionedTreatyActions(114, '13', 'A');

      expect(Array.isArray(actions)).toBe(true);
      actions.forEach((action) => {
        expect(TreatyActionSchema.parse(action));
      });
    });
  });

  describe('getTreatyCommittees', () => {
    it('should return committees for a specific treaty', async () => {
      const { treatyCommittees } = await client.getTreatyCommittees(116, '3');

      expect(Array.isArray(treatyCommittees)).toBe(true);
      treatyCommittees.forEach((committee) => {
        expect(TreatyCommitteeSchema.parse(committee));
      });
    });
  });
});
