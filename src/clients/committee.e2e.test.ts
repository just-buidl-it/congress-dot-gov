import { CommitteeClient } from './committee';
import {
  ListCommitteeSchema,
  CommitteeSchema,
  CommitteeBillSchema,
  CommitteeNominationSchema,
  CommitteeCommunicationSchema,
} from '../schemas/committee';
import { ListCommitteeReportSchema } from '../schemas/committee-report';
import { Chamber } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('CommitteeClient Integration Tests', () => {
  let client: CommitteeClient;

  beforeAll(() => {
    client = new CommitteeClient({ apiKey: API_KEY });
  });

  describe('getCommittees', () => {
    it('should return committees matching the ListCommittee interface', async () => {
      const { committees } = await client.getCommittees({ limit: 5 });

      expect(Array.isArray(committees)).toBe(true);
      expect(committees.length).toBeLessThanOrEqual(5);

      committees.forEach((committee) => {
        expect(ListCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getCommitteesByChamber', () => {
    it('should return committees for a specific chamber', async () => {
      const { committees } = await client.getCommitteesByChamber(Chamber.HOUSE, {
        limit: 5,
      });

      expect(Array.isArray(committees)).toBe(true);
      expect(committees.length).toBeLessThanOrEqual(5);

      committees.forEach((committee) => {
        expect(ListCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getCommitteesByCongress', () => {
    it('should return committees for a specific congress', async () => {
      const { committees } = await client.getCommitteesByCongress(117, { limit: 5 });

      expect(Array.isArray(committees)).toBe(true);
      expect(committees.length).toBeLessThanOrEqual(5);

      committees.forEach((committee) => {
        expect(ListCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getCommitteesByCongressAndChamber', () => {
    it('should return committees for a specific congress and chamber', async () => {
      const { committees } = await client.getCommitteesByCongressAndChamber(
        117,
        Chamber.HOUSE,
        { limit: 5 },
      );

      expect(Array.isArray(committees)).toBe(true);
      expect(committees.length).toBeLessThanOrEqual(5);

      committees.forEach((committee) => {
        expect(ListCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getCommittee', () => {
    it('should return detailed committee information', async () => {
      const { committee } = await client.getCommittee(Chamber.HOUSE, 'hspw00');

      expect(CommitteeSchema.parse(committee));
    });
  });

  describe('getCommitteeBills', () => {
    it('should return bills for a specific committee', async () => {
      const {
        committeeBills: { bills },
      } = await client.getCommitteeBills(Chamber.HOUSE, 'hspw00', { limit: 5 });

      expect(bills.length).toBeLessThanOrEqual(5);

      bills.forEach((bill) => {
        expect(CommitteeBillSchema.parse(bill));
      });
    });
  });

  describe('getCommitteeReports', () => {
    it('should return reports for a specific committee', async () => {
      const { reports } = await client.getCommitteeReports(Chamber.HOUSE, 'hspw00', {
        limit: 5,
      });

      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeLessThanOrEqual(5);

      reports.forEach((report) => {
        expect(ListCommitteeReportSchema.parse(report));
      });
    });
  });

  describe('getCommitteeNominations', () => {
    it('should return nominations for a specific committee', async () => {
      const { nominations } = await client.getCommitteeNominations(
        Chamber.SENATE,
        'ssas00',
        { limit: 5 },
      );

      expect(Array.isArray(nominations)).toBe(true);
      expect(nominations.length).toBeLessThanOrEqual(5);

      nominations.forEach((nomination) => {
        expect(CommitteeNominationSchema.parse(nomination));
      });
    });
  });

  describe('getCommitteeHouseCommunications', () => {
    it('should return House communications for a specific committee', async () => {
      const { houseCommunications } = await client.getCommitteeHouseCommunications(
        Chamber.HOUSE,
        'hspw00',
        { limit: 5 },
      );

      expect(Array.isArray(houseCommunications)).toBe(true);
      expect(houseCommunications.length).toBeLessThanOrEqual(5);

      houseCommunications.forEach((communication) => {
        expect(CommitteeCommunicationSchema.parse(communication));
      });
    });
  });

  describe('getCommitteeSenateCommunications', () => {
    it('should return Senate communications for a specific committee', async () => {
      const { senateCommunications } = await client.getCommitteeSenateCommunications(
        Chamber.SENATE,
        'ssas00',
        { limit: 5 },
      );

      expect(Array.isArray(senateCommunications)).toBe(true);
      expect(senateCommunications.length).toBeLessThanOrEqual(5);

      senateCommunications.forEach((communication) => {
        expect(CommitteeCommunicationSchema.parse(communication));
      });
    });
  });
});
