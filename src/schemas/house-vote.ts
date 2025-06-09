import { z } from 'zod';
import {
  HouseBillType,
  VoteType,
  VoteResult,
  HouseAmendmentType,
  VoteQuestion,
} from './constants';

export const ListHouseRollCallVoteSchema = z.strictObject({
  congress: z.number(),
  // The identifier is the three digital Congress number, the session number (e.g., 1 or 2), the year of the vote, and the vote number.
  identifier: z.number(),
  legislationNumber: z.string().optional(),
  legislationType: z.nativeEnum(HouseBillType).optional(),
  amendmentNumber: z.string().optional(),
  amendmentType: z.nativeEnum(HouseAmendmentType).optional(),
  amendmentAuthor: z.string().optional(),
  legislationUrl: z.string(),
  result: z.nativeEnum(VoteResult),
  rollCallNumber: z.number(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  sourceDataURL: z.string(),
  startDate: z.string(),
  updateDate: z.string(),
  url: z.string(),
  voteType: z.nativeEnum(VoteType),
});

export const HouseRollCallVoteSchema = z.strictObject({
  amendmentNumber: z.string().optional(),
  amendmentType: z.nativeEnum(HouseAmendmentType).optional(),
  amendmentAuthor: z.string().optional(),
  congress: z.number(),
  // The identifier is the three digital Congress number, the session number (e.g., 1 or 2), the year of the vote, and the vote number.
  identifier: z.number(),
  legislationNumber: z.string(),
  legislationType: z.nativeEnum(HouseBillType).optional(),
  legislationUrl: z.string(),
  result: z.nativeEnum(VoteResult),
  rollCallNumber: z.number(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  sourceDataURL: z.string(),
  startDate: z.string(),
  updateDate: z.string(),
  votePartyTotal: z.array(
    z.strictObject({
      nayTotal: z.number(),
      notVotingTotal: z.number(),
      party: z.strictObject({
        name: z.string(),
        type: z.string(),
      }),
      presentTotal: z.number(),
      voteParty: z.string(),
      yeaTotal: z.number(),
    }),
  ),
  voteQuestion: z.nativeEnum(VoteQuestion),
  voteType: z.nativeEnum(VoteType),
});

export const HouseRollCallMemberVoteSchema = z.strictObject({
  congress: z.number(),
  identifier: z.number(),
  legislationNumber: z.string(),
  legislationType: z.string(),
  legislationUrl: z.string(),
  results: z.array(
    z.strictObject({
      bioguideID: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      voteCast: z.string(),
      voteParty: z.string(),
      voteState: z.string(),
    }),
  ),
  result: z.nativeEnum(VoteResult),
  rollCallNumber: z.number(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  sourceDataURL: z.string(),
  startDate: z.string(),
  updateDate: z.string(),
  voteQuestion: z.string(),
  voteType: z.string(),
});

export type ListHouseRollCallVote = z.infer<typeof ListHouseRollCallVoteSchema>;
export type HouseRollCallVote = z.infer<typeof HouseRollCallVoteSchema>;
export type HouseRollCallMemberVote = z.infer<typeof HouseRollCallMemberVoteSchema>;
