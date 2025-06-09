import { z } from 'zod';
import {
  AmendmentType,
  Chamber,
  ChamberCode,
  BillType,
  PartyName,
  OnBehalfOfSponsorAction,
  PartyCode,
  StateCode,
  SourceSystemName,
} from './constants';

export const ListAmendmentSchema = z.strictObject({
  congress: z.number(),
  description: z.string().optional(),
  latestAction: z
    .strictObject({
      actionDate: z.string(),
      text: z.string(),
    })
    .optional(),
  number: z.string(),
  purpose: z.string().optional(),
  type: z.nativeEnum(AmendmentType),
  url: z.string(),
  updateDate: z.string(),
});

export const AmendmentSchema = z.strictObject({
  actions: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  amendedBill: z.strictObject({
    congress: z.number(),
    number: z.string(),
    originChamber: z.nativeEnum(Chamber),
    originChamberCode: z.nativeEnum(ChamberCode),
    title: z.string(),
    type: z.nativeEnum(BillType),
    url: z.string(),
    updateDateIncludingText: z.string(),
  }),
  amendmentsToAmendment: z
    .strictObject({
      congress: z.number(),
      treatyNumber: z.string(),
      url: z.string(),
    })
    .optional(),
  amendedTreaty: z
    .strictObject({
      count: z.number(),
      url: z.string(),
    })
    .optional(),
  chamber: z.nativeEnum(Chamber),
  congress: z.number(),
  cosponsors: z
    .strictObject({
      count: z.number(),
      countIncludingWithdrawnCosponsors: z.number(),
      url: z.string(),
    })
    .optional(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    text: z.string(),
    links: z.array(
      z.strictObject({
        url: z.string(),
        name: z.string(),
      }),
    ),
  }),
  number: z.string(),
  proposedDate: z.string(),
  purpose: z.string(),
  sponsors: z.array(
    z.strictObject({
      bioguideId: z.string(),
      firstName: z.string(),
      fullName: z.string(),
      lastName: z.string(),
      party: z.nativeEnum(PartyCode).optional(),
      state: z.nativeEnum(StateCode).optional(),
      district: z.number().optional(),
      url: z.string(),
    }),
  ),
  onBehalfOfSponsor: z
    .strictObject({
      bioguideId: z.string(),
      firstName: z.string(),
      fullName: z.string(),
      lastName: z.string(),
      party: z.nativeEnum(PartyName).optional(),
      type: z.nativeEnum(OnBehalfOfSponsorAction).optional(),
      url: z.string(),
    })
    .optional(),
  notes: z.string().optional(),
  submittedDate: z.string(),
  type: z.nativeEnum(AmendmentType),
  updateDate: z.string(),
  textVersions: z.strictObject({
    url: z.string(),
    count: z.number(),
    formats: z
      .array(
        z.strictObject({
          type: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

export const AmendmentActionSchema = z.strictObject({
  actionDate: z.string(),
  // The <actionCode> element will be present only for actions where the <sourceSystem> is 2 (House) or 9 (Library of Congress).
  actionCode: z.string().optional(),
  recordedVotes: z
    .array(
      z.strictObject({
        chamber: z.string(),
        congress: z.number(),
        date: z.string(),
        rollNumber: z.number(),
        sessionNumber: z.union([z.literal(1), z.literal(2)]),
        url: z.string(),
      }),
    )
    .optional(),
  sourceSystem: z.strictObject({
    code: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(9)]),
    name: z.nativeEnum(SourceSystemName),
  }),
  text: z.string(),
  type: z.string(),
});

export const AmendmentCosponsorSchema = z.strictObject({
  bioguideId: z.string(),
  firstName: z.string(),
  fullName: z.string(),
  isOriginalCosponsor: z.boolean(),
  lastName: z.string(),
  party: z.string(),
  sponsorshipDate: z.string(),
  url: z.string(),
});

export const AmendmentAmendmentSchema = z.strictObject({
  congress: z.number(),
  latestAction: z.strictObject({
    date: z.string(),
    text: z.string(),
  }),
  number: z.string(),
  purpose: z.string(),
  type: z.string(),
  url: z.string(),
});

export const AmendmentTextSchema = z.strictObject({
  date: z.string(),
  formats: z.array(
    z.strictObject({
      type: z.string(),
      url: z.string(),
    }),
  ),
  type: z.string(),
});

export type ListAmendment = z.infer<typeof ListAmendmentSchema>;
export type Amendment = z.infer<typeof AmendmentSchema>;
export type AmendmentAction = z.infer<typeof AmendmentActionSchema>;
export type AmendmentCosponsor = z.infer<typeof AmendmentCosponsorSchema>;
export type AmendmentText = z.infer<typeof AmendmentTextSchema>;
