import { HouseRequirementClient } from './house-requirements';
import {
  ListHouseRequirementSchema,
  HouseRequirementSchema,
  MatchingCommunicationsSchema,
} from '../schemas/house-requirement';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('HouseRequirementClient Tests', () => {
  let client: HouseRequirementClient;

  beforeAll(() => {
    client = new HouseRequirementClient({ apiKey: API_KEY });
  });

  describe('getRequirements', () => {
    it('should return house requirements matching the schema', async () => {
      const { houseRequirements } = await client.getRequirements({ limit: 5 });

      expect(Array.isArray(houseRequirements)).toBe(true);
      expect(houseRequirements.length).toBeLessThanOrEqual(5);

      houseRequirements.forEach((requirement) => {
        expect(ListHouseRequirementSchema.parse(requirement));
      });
    });
  });

  describe('getRequirement', () => {
    it('should return detailed requirement information', async () => {
      const { houseRequirement } = await client.getRequirement('8070');

      expect(HouseRequirementSchema.parse(houseRequirement));
    });
  });

  describe('getMatchingCommunications', () => {
    it('should return matching communications for a requirement', async () => {
      const { matchingCommunications } = await client.getMatchingCommunications('8070');

      expect(Array.isArray(matchingCommunications)).toBe(true);

      matchingCommunications.forEach((communication) => {
        expect(MatchingCommunicationsSchema.parse(communication));
      });
    });
  });
});
