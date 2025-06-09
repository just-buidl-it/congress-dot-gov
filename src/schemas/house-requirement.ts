import { z } from 'zod';
import { CommunicationTypeCode, CommunicationTypeName } from './constants';

export const ListHouseRequirementSchema = z.strictObject({
  number: z.number(),
  updateDate: z.string(),
  url: z.string(),
});

export const HouseRequirementSchema = z.strictObject({
  activeRecord: z.boolean(),
  frequency: z.string(),
  legalAuthority: z.string(),
  matchingCommunications: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  nature: z.string(),
  number: z.number(),
  parentAgency: z.string(),
  submittingAgency: z.string(),
  submittingOfficial: z.string().optional(),
  updateDate: z.string(),
});

export const MatchingCommunicationsSchema = z.strictObject({
  chamber: z.literal('House'),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  congress: z.number(),
  number: z.number(),
  url: z.string(),
});

export type ListHouseRequirement = z.infer<typeof ListHouseRequirementSchema>;
export type HouseRequirement = z.infer<typeof HouseRequirementSchema>;
export type MatchingCommunications = z.infer<typeof MatchingCommunicationsSchema>;
