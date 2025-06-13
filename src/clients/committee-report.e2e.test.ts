import { CommitteeReportClient } from './committee-report';
import {
  CommitteeReportSchema,
  CommitteeReportTextSchema,
  ListCommitteeReportSchema,
} from '../schemas/committee-report';
import { CommitteeReportType } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'DEMO_KEY';

describe('CommitteeReportClient Integration Tests', () => {
  let client: CommitteeReportClient;

  beforeAll(() => {
    client = new CommitteeReportClient({ apiKey: API_KEY });
  });

  describe('getReports', () => {
    it('should return reports matching the CommitteeReport interface', async () => {
      const { reports } = await client.getReports({ limit: 5 });

      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeLessThanOrEqual(5);

      reports.forEach((report) => {
        expect(ListCommitteeReportSchema.parse(report));
      });
    });
  });

  describe('getReportsByCongress', () => {
    it('should return reports for a specific congress', async () => {
      const { reports } = await client.getReportsByCongress(117, { limit: 5 });

      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeLessThanOrEqual(5);

      reports.forEach((report) => {
        expect(ListCommitteeReportSchema.parse(report));
      });
    });
  });

  describe('getReportsByCongressAndChamber', () => {
    it('should return reports for a specific congress and chamber', async () => {
      const { reports } = await client.getReportsByCongressAndChamber(
        117,
        CommitteeReportType.HRPT,
        { limit: 5 },
      );

      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBeLessThanOrEqual(5);

      reports.forEach((report) => {
        expect(ListCommitteeReportSchema.parse(report));
      });
    });
  });

  describe('getCommitteeReports', () => {
    it('should return detailed report information', async () => {
      const { committeeReports } = await client.getCommitteeReports(
        116,
        CommitteeReportType.HRPT,
        '617',
      );

      committeeReports.forEach((report) => {
        expect(CommitteeReportSchema.parse(report));
      });
    });
  });

  describe('getReportTexts', () => {
    it('should return report texts', async () => {
      const { text } = await client.getReportTexts(116, CommitteeReportType.HRPT, '617');

      expect(Array.isArray(text)).toBe(true);
      text.forEach((text) => {
        expect(CommitteeReportTextSchema.parse(text));
      });
    });
  });
});
