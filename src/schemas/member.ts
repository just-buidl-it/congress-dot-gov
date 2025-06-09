import { z } from 'zod';
import {
  MemberType,
  PartyName,
  PartyCode,
  StateCode,
  StateName,
  BillType,
} from './constants';

export const ListMemberSchema = z.strictObject({
  bioguideId: z.string(),
  depiction: z
    .strictObject({
      attribution: z.string().optional(),
      imageUrl: z.string().optional(),
    })
    .optional(),
  district: z.number().nullable().optional(),
  name: z.string(),
  partyName: z.nativeEnum(PartyName),
  state: z.nativeEnum(StateName).optional(),
  terms: z.strictObject({
    item: z.array(
      z.strictObject({
        chamber: z.string(),
        endYear: z.number().nullable().optional(),
        startYear: z.number(),
      }),
    ),
  }),
  updateDate: z.string(),
  url: z.string(),
});

export const MemberSchema = z.strictObject({
  addressInformation: z
    .strictObject({
      officeAddress: z.string().optional(),
      city: z.string().optional(),
      district: z.nativeEnum(StateName).optional(),
      zipCode: z.string().optional(),
      phoneNumber: z.string().optional(),
    })
    .optional(),
  bioguideId: z.string(),
  birthYear: z.string().optional(),
  deathYear: z.string().optional(),
  cosponsoredLegislation: z
    .strictObject({
      count: z.number(),
      url: z.string(),
    })
    .optional(),
  currentMember: z.boolean().optional(),
  depiction: z.strictObject({
    attribution: z.string(),
    imageUrl: z.string(),
  }),
  district: z.number().optional(),
  directOrderName: z.string().optional(),
  firstName: z.string(),
  honorificName: z.string().optional(),
  invertedOrderName: z.string().optional(),
  lastName: z.string().optional(),
  suffixName: z.string().optional(),
  nickName: z.string().optional(),
  leadership: z
    .array(
      z.strictObject({
        congress: z.number(),
        type: z.string(),
        current: z.boolean().optional(),
      }),
    )
    .optional(),
  officialUrl: z.string().optional(),
  party: z.nativeEnum(PartyName).optional(),
  partyHistory: z
    .array(
      z.strictObject({
        partyAbbreviation: z.string(),
        partyName: z.nativeEnum(PartyName),
        startYear: z.number(),
      }),
    )
    .optional(),
  sponsoredLegislation: z
    .strictObject({
      count: z.number(),
      url: z.string(),
    })
    .optional(),
  state: z.nativeEnum(StateName).optional(),
  terms: z.array(
    z.strictObject({
      chamber: z.string(),
      congress: z.number(),
      endYear: z.number(),
      memberType: z.nativeEnum(MemberType),
      startYear: z.number(),
      stateCode: z.nativeEnum(StateCode),
      stateName: z.nativeEnum(StateName),
      partyName: z.nativeEnum(PartyName).optional(),
      partyCode: z.nativeEnum(PartyCode).optional(),
      district: z.number().optional(),
    }),
  ),
  updateDate: z.string(),
});

export const SponsoredLegislationSchema = z.strictObject({
  congress: z.number(),
  introducedDate: z.string(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  number: z.string(),
  policyArea: z.strictObject({
    name: z.string(),
  }),
  title: z.string(),
  type: z.nativeEnum(BillType),
  url: z.string(),
});

export const CoSponsoredLegislationSchema = z.strictObject({
  congress: z.number(),
  introducedDate: z.string().optional(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  number: z.string(),
  policyArea: z.strictObject({
    name: z.string(),
  }),
  title: z.string(),
  type: z.nativeEnum(BillType),
  url: z.string(),
});

export const CongressMemberSchema = z.strictObject({
  bioguideId: z.string(),
  depiction: z.strictObject({
    attribution: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
  district: z.number().nullable().optional(),
  name: z.string(),
  partyName: z.nativeEnum(PartyName),
  state: z.nativeEnum(StateName).optional(),
  terms: z.strictObject({
    item: z.array(
      z.strictObject({
        chamber: z.string(),
        startYear: z.number(),
        endYear: z.number().nullable().optional(),
      }),
    ),
  }),
  updateDate: z.string(),
  url: z.string(),
});

export type ListMember = z.infer<typeof ListMemberSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type SponsoredLegislation = z.infer<typeof SponsoredLegislationSchema>;
export type CoSponsoredLegislation = z.infer<typeof CoSponsoredLegislationSchema>;
export type CongressMember = z.infer<typeof CongressMemberSchema>;
