import { SenateCommunicationClient } from './senate-communication';
import {
  ListSenateCommunicationSchema,
  SenateCommunicationSchema,
} from '../schemas/senate-communication';
import { CommunicationTypeCode } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('SenateCommunicationClient Integration Tests', () => {
  let client: SenateCommunicationClient;

  beforeAll(() => {
    client = new SenateCommunicationClient({ apiKey: API_KEY });
  });

  describe('getCommunications', () => {
    it('should return senate communications matching the schema', async () => {
      const { senateCommunications } = await client.getCommunications({ limit: 5 });

      expect(Array.isArray(senateCommunications)).toBe(true);
      expect(senateCommunications.length).toBeLessThanOrEqual(5);

      senateCommunications.forEach((communication) => {
        expect(ListSenateCommunicationSchema.parse(communication));
      });
    });
  });

  describe('getCommunicationsByCongress', () => {
    it('should return communications for a specific congress', async () => {
      const { senateCommunications } = await client.getCommunicationsByCongress(117, {
        limit: 5,
      });

      expect(Array.isArray(senateCommunications)).toBe(true);
      expect(senateCommunications.length).toBeLessThanOrEqual(5);

      senateCommunications.forEach((communication) => {
        expect(ListSenateCommunicationSchema.parse(communication));
      });
    });
  });

  describe('getCommunicationsByCongressAndType', () => {
    it('should return communications for a specific congress and type', async () => {
      const { senateCommunications } = await client.getCommunicationsByCongressAndType(
        117,
        CommunicationTypeCode.PRESIDENTIAL_MESSAGE,
        { limit: 5 },
      );

      expect(Array.isArray(senateCommunications)).toBe(true);
      expect(senateCommunications.length).toBeLessThanOrEqual(5);

      senateCommunications.forEach((communication) => {
        expect(ListSenateCommunicationSchema.parse(communication));
      });
    });
  });

  describe('getCommunication', () => {
    it('should return detailed communication information', async () => {
      const { senateCommunication } = await client.getCommunication(
        117,
        CommunicationTypeCode.EXECUTIVE_COMMUNICATION,
        '1',
      );

      expect(SenateCommunicationSchema.parse(senateCommunication));
    });
  });
});
