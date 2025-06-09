import { HouseCommunicationClient } from './house-communication';
import {
  ListHouseCommunicationSchema,
  HouseCommunicationSchema,
  HouseCommunicationByCongressSchema,
} from '../schemas/house-communication';
import { CommunicationTypeCode } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('HouseCommunicationClient Integration Tests', () => {
  let client: HouseCommunicationClient;

  beforeAll(() => {
    client = new HouseCommunicationClient({ apiKey: API_KEY });
  });

  describe('getCommunications', () => {
    it('should return house communications matching the schema', async () => {
      const { houseCommunications } = await client.getCommunications({ limit: 5 });

      expect(Array.isArray(houseCommunications)).toBe(true);
      expect(houseCommunications.length).toBeLessThanOrEqual(5);

      houseCommunications.forEach((communication) => {
        expect(ListHouseCommunicationSchema.parse(communication));
      });
    });
  });

  describe('getCommunicationsByCongress', () => {
    it('should return communications for a specific congress', async () => {
      const { houseCommunications } = await client.getCommunicationsByCongress(117, {
        limit: 5,
      });

      expect(Array.isArray(houseCommunications)).toBe(true);
      expect(houseCommunications.length).toBeLessThanOrEqual(5);

      houseCommunications.forEach((communication) => {
        expect(HouseCommunicationByCongressSchema.parse(communication));
      });
    });
  });

  describe('getCommunicationsByCongressAndType', () => {
    it('should return communications for a specific congress and type', async () => {
      const { houseCommunications } = await client.getCommunicationsByCongressAndType(
        117,
        CommunicationTypeCode.PRESIDENTIAL_MESSAGE,
        { limit: 5 },
      );

      expect(Array.isArray(houseCommunications)).toBe(true);
      expect(houseCommunications.length).toBeLessThanOrEqual(5);

      houseCommunications.forEach((communication) => {
        expect(HouseCommunicationByCongressSchema.parse(communication));
      });
    });
  });

  describe('getCommunication', () => {
    it('should return detailed communication information', async () => {
      const { houseCommunication } = await client.getCommunication(
        117,
        CommunicationTypeCode.EXECUTIVE_COMMUNICATION,
        '1',
      );

      expect(HouseCommunicationSchema.parse(houseCommunication));
    });
  });
});
