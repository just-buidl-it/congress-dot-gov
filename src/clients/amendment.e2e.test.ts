import { AmendmentClient } from './amendment';
import {
  AmendmentSchema,
  AmendmentActionSchema,
  AmendmentCosponsorSchema,
  AmendmentTextSchema,
  ListAmendmentSchema,
} from '../schemas/amendment';
import { AmendmentType } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('AmendmentClient Integration Tests', () => {
  let client: AmendmentClient;

  beforeAll(() => {
    client = new AmendmentClient({ apiKey: API_KEY });
  });

  describe('getAmendments', () => {
    it('should return amendments matching the Amendment interface', async () => {
      const { amendments } = await client.getAmendments({ limit: 5 });

      expect(Array.isArray(amendments)).toBe(true);
      expect(amendments.length).toBeLessThanOrEqual(5);

      amendments.forEach((amendment) => {
        expect(ListAmendmentSchema.parse(amendment));
      });
    });
  });

  describe('getAmendmentsByCongress', () => {
    it('should return amendments for a specific congress', async () => {
      const { amendments } = await client.getAmendmentsByCongress(117, { limit: 5 });

      expect(Array.isArray(amendments)).toBe(true);
      expect(amendments.length).toBeLessThanOrEqual(5);

      amendments.forEach((amendment) => {
        expect(ListAmendmentSchema.parse(amendment));
        expect(amendment.congress).toBe(117);
      });
    });
  });

  describe('getAmendmentsByCongressAndType', () => {
    it('should return amendments for a specific congress by type', async () => {
      const { amendments } = await client.getAmendmentsByCongressAndType(
        117,
        AmendmentType.SAMDT,
        { limit: 5 },
      );

      expect(Array.isArray(amendments)).toBe(true);
      expect(amendments.length).toBeLessThanOrEqual(5);

      amendments.forEach((amendment) => {
        expect(ListAmendmentSchema.parse(amendment));
      });
    });
  });

  describe('getAmendment', () => {
    it('should return detailed amendment information', async () => {
      const { amendment } = await client.getAmendment(117, AmendmentType.SAMDT, '1');
      expect(AmendmentSchema.parse(amendment));
    });
  });

  describe('getAmendmentActions', () => {
    it('should return amendment actions', async () => {
      const { actions } = await client.getAmendmentActions(117, AmendmentType.SAMDT, '1');

      expect(Array.isArray(actions)).toBe(true);
      actions.forEach((action) => {
        expect(AmendmentActionSchema.parse(action));
      });
    });
  });

  describe('getAmendmentCosponsors', () => {
    it('should return amendment cosponsors', async () => {
      const { cosponsors } = await client.getAmendmentCosponsors(
        117,
        AmendmentType.SAMDT,
        '1',
      );

      expect(Array.isArray(cosponsors)).toBe(true);
      cosponsors.forEach((cosponsor) => {
        expect(AmendmentCosponsorSchema.parse(cosponsor));
      });
    });
  });

  describe('getAmendmentAmendments', () => {
    it('should return amendments to a specified amendment', async () => {
      const { amendments } = await client.getAmendmentAmendments(
        117,
        AmendmentType.SAMDT,
        '1',
      );

      expect(Array.isArray(amendments)).toBe(true);
      amendments.forEach((amendment) => {
        expect(AmendmentSchema.parse(amendment));
      });
    });
  });

  describe('getAmendmentText', () => {
    it('should return amendment text versions', async () => {
      const { textVersions } = await client.getAmendmentText(
        117,
        AmendmentType.SAMDT,
        '1',
      );
      textVersions.forEach((textVersion) => {
        expect(AmendmentTextSchema.parse(textVersion));
      });
    });
  });
});
