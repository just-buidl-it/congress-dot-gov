import { BillClient } from './bill';
import {
  BillActionSchema,
  BillAmendmentSchema,
  BillCosponsorSchema,
  BillCommitteeSchema,
  ListBillSchema,
  BillSchema,
  RelatedBillSchema,
  BillSubjectSchema,
  BillSummarySchema,
  BillTextSchema,
  BillTitleSchema,
  LawSchema,
  LawListSchema,
} from '../schemas/bill';
import { BillType, LawType } from '../schemas/constants';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || '';

describe('BillClient Integration Tests', () => {
  let client: BillClient;

  beforeAll(() => {
    client = new BillClient({ apiKey: API_KEY });
  });

  describe('getBills', () => {
    it('should return bills matching the Bill interface', async () => {
      const { bills } = await client.getBills({ limit: 5 });

      expect(Array.isArray(bills)).toBe(true);
      expect(bills.length).toBeLessThanOrEqual(5);

      bills.forEach((bill) => {
        expect(ListBillSchema.parse(bill));
      });
    });
  });

  describe('getBillByCongress', () => {
    it('should return bills for a specific congress', async () => {
      const { bills } = await client.getBillsByCongress(117, { limit: 5 });

      expect(Array.isArray(bills)).toBe(true);
      expect(bills.length).toBeLessThanOrEqual(5);

      bills.forEach((bill) => {
        expect(ListBillSchema.parse(bill));
      });
    });
  });

  describe('getBillsByCongressAndType', () => {
    it('should return bills for a specific congress by type', async () => {
      const { bills } = await client.getBillsByCongressAndType(117, BillType.HR, {
        limit: 5,
      });

      expect(Array.isArray(bills)).toBe(true);
      expect(bills.length).toBeLessThanOrEqual(5);

      bills.forEach((bill) => {
        expect(ListBillSchema.parse(bill));
      });
    });
  });

  describe('getBill', () => {
    it('should return detailed bill information', async () => {
      const { bill } = await client.getBill(117, BillType.HR, '1');

      expect(BillSchema.parse(bill));
    });
  });

  describe('getBillActions', () => {
    it('should return bill actions', async () => {
      const { actions } = await client.getBillActions(117, BillType.HR, '1');

      expect(Array.isArray(actions)).toBe(true);
      actions.forEach((action) => {
        expect(BillActionSchema.parse(action));
      });
    });
  });

  describe('getBillAmendments', () => {
    it('should return bill amendments', async () => {
      const { amendments } = await client.getBillAmendments(117, BillType.HR, '1');

      expect(Array.isArray(amendments)).toBe(true);
      amendments.forEach((amendment) => {
        expect(BillAmendmentSchema.parse(amendment));
      });
    });
  });

  describe('getBillCommittees', () => {
    it('should return bill committees', async () => {
      const { committees } = await client.getBillCommittees(117, BillType.HR, '1');

      expect(Array.isArray(committees)).toBe(true);
      committees.forEach((committee) => {
        expect(BillCommitteeSchema.parse(committee));
      });
    });
  });

  describe('getBillCosponsors', () => {
    it('should return bill cosponsors', async () => {
      const { cosponsors } = await client.getBillCosponsors(117, BillType.HR, '1');

      expect(Array.isArray(cosponsors)).toBe(true);
      cosponsors.forEach((cosponsor) => {
        expect(BillCosponsorSchema.parse(cosponsor));
      });
    });
  });

  describe('getRelatedBills', () => {
    it('should return related bills', async () => {
      const { relatedBills } = await client.getRelatedBills(117, BillType.HR, '1');

      expect(Array.isArray(relatedBills)).toBe(true);
      relatedBills.forEach((bill) => {
        expect(RelatedBillSchema.parse(bill));
      });
    });
  });

  describe('getBillSubjects', () => {
    it('should return bill subjects', async () => {
      const { subjects } = await client.getBillSubjects(117, BillType.HR, '1');

      expect(BillSubjectSchema.parse(subjects));
    });
  });

  describe('getBillSummaries', () => {
    it('should return bill summaries', async () => {
      const { summaries } = await client.getBillSummaries(117, BillType.HR, '1');

      expect(Array.isArray(summaries)).toBe(true);
      summaries.forEach((summary) => {
        expect(BillSummarySchema.parse(summary));
      });
    });
  });

  describe('getBillText', () => {
    it('should return bill text', async () => {
      const { textVersions } = await client.getBillText(117, BillType.HR, '1');

      expect(Array.isArray(textVersions)).toBe(true);
      textVersions.forEach((text) => {
        expect(BillTextSchema.parse(text));
      });
    });
  });

  describe('getBillTitles', () => {
    it('should return bill titles', async () => {
      const { titles } = await client.getBillTitles(117, BillType.HR, '1');

      expect(Array.isArray(titles)).toBe(true);
      titles.forEach((title) => {
        expect(BillTitleSchema.parse(title));
      });
    });
  });

  describe('getLaws', () => {
    it('should return laws', async () => {
      const { bills } = await client.getLaws(117);

      expect(Array.isArray(bills)).toBe(true);
      bills.forEach((law) => {
        expect(LawListSchema.parse(law));
      });
    });
  });

  describe('getLawsByType', () => {
    it('should return laws by type', async () => {
      const { bills } = await client.getLawsByType(117, LawType.PUBLIC);

      expect(Array.isArray(bills)).toBe(true);
      bills.forEach((law) => {
        expect(LawListSchema.parse(law));
      });
    });
  });

  describe('getLaw', () => {
    it('should return specific law', async () => {
      const { bill } = await client.getLaw(117, LawType.PUBLIC, '1');
      expect(LawSchema.parse(bill));
    });
  });
});
