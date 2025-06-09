import { z } from 'zod';
import { CommunicationTypeCode, CommunicationTypeName } from './constants';

export const ListHouseCommunicationSchema = z.strictObject({
  chamber: z.literal('House'),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  url: z.string(),
  updateDate: z.string(),
  congress: z.number(),
  number: z.number(),
});

export const HouseCommunicationByCongressSchema = z.strictObject({
  chamber: z.literal('House'),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  congress: z.number(),
  number: z.number(),
  reportNature: z.string().optional(),
  submittingAgency: z.string().optional(),
  submittingOfficial: z.string().optional(),
  updateDate: z.string(),
  url: z.string().optional(),
});

export const HouseCommunicationSchema = z.strictObject({
  abstract: z.string(),
  chamber: z.literal('House'),
  committees: z.array(
    z.strictObject({
      name: z.string(),
      referralDate: z.string(),
      systemCode: z.string(),
      url: z.string(),
    }),
  ),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  congress: z.number(),
  houseDocument: z.array(
    z.strictObject({
      citation: z.string(),
      title: z.string(),
    }),
  ),
  congressNumber: z.number().optional(),
  congressionalRecordDate: z.string(),
  isRulemaking: z.string(),
  legalAuthority: z.string().optional(),
  matchingRequirements: z
    .array(
      z.strictObject({
        number: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  number: z.number(),
  reportNature: z.string(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  submittingAgency: z.string(),
  submittingOfficial: z.string(),
  updateDate: z.string(),
});

export type ListHouseCommunication = z.infer<typeof ListHouseCommunicationSchema>;
export type HouseCommunicationByCongress = z.infer<
  typeof HouseCommunicationByCongressSchema
>;
export type HouseCommunication = z.infer<typeof HouseCommunicationSchema>;
