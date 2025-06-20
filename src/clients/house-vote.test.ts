import { HouseVoteClient } from './house-vote';
import {
  ListHouseRollCallVoteSchema,
  HouseRollCallVoteSchema,
  HouseRollCallMemberVoteSchema,
} from '../schemas/house-vote';

const API_KEY = process.env.CONGRESS_GOV_API_KEY || 'TEST_KEY';

describe('HouseVoteClient Tests', () => {
  let client: HouseVoteClient;

  beforeAll(() => {
    client = new HouseVoteClient({ apiKey: API_KEY });
  });

  describe('getVotes', () => {
    it('should return votes matching the ListHouseRollCallVotes interface', async () => {
      const { houseRollCallVotes } = await client.getHouseRollCallVotes({ limit: 5 });

      expect(Array.isArray(houseRollCallVotes)).toBe(true);
      expect(houseRollCallVotes.length).toBeLessThanOrEqual(5);

      houseRollCallVotes.forEach((vote) => {
        expect(ListHouseRollCallVoteSchema.parse(vote));
      });
    });
  });

  describe('getVotesByCongress', () => {
    it('should return votes for a specific congress', async () => {
      const { houseRollCallVotes } = await client.getHouseRollCallVotesByCongress(117, {
        limit: 5,
      });

      expect(Array.isArray(houseRollCallVotes)).toBe(true);
      expect(houseRollCallVotes.length).toBeLessThanOrEqual(5);

      houseRollCallVotes.forEach((vote) => {
        expect(ListHouseRollCallVoteSchema.parse(vote));
      });
    });
  });

  describe('getVotesByCongressAndSession', () => {
    it('should return votes for a specific congress and session', async () => {
      const { houseRollCallVotes } =
        await client.getHouseRollCallVotesByCongressAndSession(117, 1, { limit: 5 });

      expect(Array.isArray(houseRollCallVotes)).toBe(true);
      expect(houseRollCallVotes.length).toBeLessThanOrEqual(5);

      houseRollCallVotes.forEach((vote) => {
        expect(ListHouseRollCallVoteSchema.parse(vote));
      });
    });
  });

  describe('getVote', () => {
    it('should return detailed vote information', async () => {
      const { houseRollCallVote } = await client.getHouseRollCallVote(119, 1, 17);

      expect(HouseRollCallVoteSchema.parse(houseRollCallVote));
    });
  });

  describe('getVoteMembers', () => {
    it('should return member votes for a specific vote', async () => {
      const { houseRollCallVoteMemberVotes } = await client.getHouseRollCallVoteMembers(
        119,
        1,
        17,
      );

      expect(HouseRollCallMemberVoteSchema.parse(houseRollCallVoteMemberVotes));
    });
  });
});
