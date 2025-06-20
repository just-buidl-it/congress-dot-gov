import { z } from 'zod';
import { StateCode } from './constants';

export const ListNominationSchema = z.strictObject({
  citation: z.string(),
  congress: z.number(),
  description: z.string(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    text: z.string(),
  }),
  nominationType: z
    .strictObject({
      isCivilian: z.boolean().optional(),
      isMilitary: z.boolean().optional(),
    })
    .optional(),
  number: z.number(),
  organization: z.string(),
  partNumber: z.string(),
  receivedDate: z.string(),
  updateDate: z.string(),
  url: z.string(),
});

export const NominationSchema = z.strictObject({
  actions: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  citation: z.string(),
  committees: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  congress: z.number(),
  description: z.string(),
  isList: z.boolean().optional(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    text: z.string(),
  }),
  nominees: z.array(
    z.strictObject({
      introText: z.string().optional(),
      nomineeCount: z.number(),
      ordinal: z.number(),
      organization: z.string(),
      positionTitle: z.string(),
      url: z.string(),
    }),
  ),
  nominationType: z
    .strictObject({
      isCivilian: z.boolean().optional(),
      isMilitary: z.boolean().optional(),
    })
    .optional(),
  number: z.number(),
  partNumber: z.string(),
  receivedDate: z.string(),
  updateDate: z.string(),
});

export const NomineeSchema = z.strictObject({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  ordinal: z.number(),
  state: z.nativeEnum(StateCode),
});
export const NominationActionSchema = z.strictObject({
  actionCode: z.string(),
  actionDate: z.string(),
  committees: z
    .array(
      z.strictObject({
        name: z.string(),
        systemCode: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  text: z.string(),
  type: z.string(),
});

export const NominationCommitteeSchema = z.strictObject({
  activities: z.array(
    z.strictObject({
      date: z.string(),
      name: z.string(),
    }),
  ),
  chamber: z.literal('Senate'),
  name: z.string(),
  systemCode: z.string(),
  type: z.string(),
  url: z.string(),
});

export const NominationHearingSchema = z.strictObject({
  chamber: z.literal('Senate'),
  citation: z.string(),
  date: z.string(),
  jacketNumber: z.number(),
  number: z.number(),
});

export type ListNomination = z.infer<typeof ListNominationSchema>;
export type Nomination = z.infer<typeof NominationSchema>;
export type Nominee = z.infer<typeof NomineeSchema>;
export type NominationAction = z.infer<typeof NominationActionSchema>;
export type NominationCommittee = z.infer<typeof NominationCommitteeSchema>;
export type NominationHearing = z.infer<typeof NominationHearingSchema>;
