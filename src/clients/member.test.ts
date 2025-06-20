import { MemberClient } from './member';
import {
  ListMemberSchema,
  MemberSchema,
  SponsoredLegislationSchema,
  CoSponsoredLegislationSchema,
  CongressMemberSchema,
} from '../schemas/member';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('MemberClient Tests', () => {
  let client: MemberClient;

  beforeAll(() => {
    client = new MemberClient({ apiKey: API_KEY });
  });

  describe('getMembers', () => {
    it('should return members matching the ListMember interface', async () => {
      const { members } = await client.getMembers({ limit: 5 });

      expect(Array.isArray(members)).toBe(true);
      expect(members.length).toBeLessThanOrEqual(5);

      members.forEach((member) => {
        expect(ListMemberSchema.parse(member));
      });
    });
  });

  describe('getMember', () => {
    it('should return detailed member information', async () => {
      const { member } = await client.getMember('L000174');

      expect(MemberSchema.parse(member));
    });
  });

  describe('getSponsoredLegislation', () => {
    it('should return sponsored legislation for a member', async () => {
      const { sponsoredLegislation } = await client.getSponsoredLegislation('L000174', {
        limit: 5,
      });

      expect(Array.isArray(sponsoredLegislation)).toBe(true);
      expect(sponsoredLegislation.length).toBeLessThanOrEqual(5);

      sponsoredLegislation.forEach((bill) => {
        expect(SponsoredLegislationSchema.parse(bill));
      });
    });
  });

  describe('getCosponsoredLegislation', () => {
    it('should return cosponsored legislation for a member', async () => {
      const { cosponsoredLegislation } = await client.getCosponsoredLegislation(
        'L000174',
        { limit: 5 },
      );

      expect(Array.isArray(cosponsoredLegislation)).toBe(true);
      expect(cosponsoredLegislation.length).toBeLessThanOrEqual(5);

      cosponsoredLegislation.forEach((bill) => {
        expect(CoSponsoredLegislationSchema.parse(bill));
      });
    });
  });

  describe('getMembersByCongress', () => {
    it('should return members for a specific congress', async () => {
      const { members } = await client.getMembersByCongress(117, { limit: 5 });

      expect(Array.isArray(members)).toBe(true);
      expect(members.length).toBeLessThanOrEqual(5);

      members.forEach((member) => {
        expect(CongressMemberSchema.parse(member));
      });
    });
  });

  describe('getMembersByState', () => {
    it('should return members for a specific state', async () => {
      const { members } = await client.getMembersByState('VT', { limit: 5 });

      expect(Array.isArray(members)).toBe(true);
      expect(members.length).toBeLessThanOrEqual(5);

      members.forEach((member) => {
        expect(CongressMemberSchema.parse(member));
      });
    });
  });

  describe('getMembersByStateAndDistrict', () => {
    it('should return members for a specific state and district', async () => {
      const { members } = await client.getMembersByStateAndDistrict('MI', '10', {
        limit: 5,
      });

      expect(Array.isArray(members)).toBe(true);
      expect(members.length).toBeLessThanOrEqual(5);

      members.forEach((member) => {
        expect(CongressMemberSchema.parse(member));
      });
    });
  });

  describe('getMembersByCongressStateAndDistrict', () => {
    it('should return members for a specific congress, state and district', async () => {
      const { members } = await client.getMembersByCongressStateAndDistrict(
        118,
        'MI',
        '10',
        { limit: 5 },
      );

      expect(Array.isArray(members)).toBe(true);
      expect(members.length).toBeLessThanOrEqual(5);

      members.forEach((member) => {
        expect(CongressMemberSchema.parse(member));
      });
    });
  });
});
