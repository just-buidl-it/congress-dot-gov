import { CRSReportClient } from './crsreport';
import { ListCRSReportSchema, CRSReportSchema } from '../schemas/crsreport';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('CRSReportClient Tests', () => {
  let client: CRSReportClient;

  beforeAll(() => {
    client = new CRSReportClient({ apiKey: API_KEY });
  });

  describe('getReports', () => {
    it('should return CRS reports matching the ListCRSReport interface', async () => {
      const { CRSReports } = await client.getReports({ limit: 5 });

      expect(Array.isArray(CRSReports)).toBe(true);
      expect(CRSReports.length).toBeLessThanOrEqual(5);

      CRSReports.forEach((report) => {
        expect(ListCRSReportSchema.parse(report));
      });
    });
  });

  describe('getReport', () => {
    it('should return detailed CRS report information', async () => {
      const { CRSReport } = await client.getReport('R46911');
      expect(CRSReportSchema.parse(CRSReport));
    });
  });
});
