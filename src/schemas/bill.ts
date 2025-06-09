import { z } from 'zod';
import { Chamber, ChamberCode, BillType, StateCode } from './constants';

export const ListBillSchema = z.strictObject({
  congress: z.number(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  number: z.string(),
  originChamber: z.nativeEnum(Chamber),
  originChamberCode: z.nativeEnum(ChamberCode),
  title: z.string(),
  type: z.nativeEnum(BillType),
  updateDate: z.string(),
  updateDateIncludingText: z.string(),
  url: z.string(),
});

const BaseBillSchema = z.strictObject({
  actions: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  committeeReports: z
    .array(
      z.strictObject({
        citation: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  committees: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  congress: z.number(),
  constitutionalAuthorityStatementText: z.string(),
  introducedDate: z.string(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  laws: z
    .array(
      z.strictObject({
        number: z.string(),
        type: z.string(),
      }),
    )
    .optional(),
  number: z.string(),
  originChamber: z.nativeEnum(Chamber),
  originChamberCode: z.nativeEnum(ChamberCode),
  policyArea: z.strictObject({
    name: z.string(),
    updateDate: z.string().optional(),
  }),
  relatedBills: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  sponsors: z.array(
    z.strictObject({
      bioguideId: z.string(),
      district: z.number(),
      firstName: z.string(),
      fullName: z.string(),
      isByRequest: z.string(),
      lastName: z.string(),
      middleName: z.string().optional(),
      party: z.string(),
      state: z.nativeEnum(StateCode).optional(),
      url: z.string(),
    }),
  ),
  subjects: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  summaries: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  textVersions: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  title: z.string(),
  titles: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  type: z.string(),
  updateDate: z.string(),
  updateDateIncludingText: z.string(),
});

export const BillSchema = BaseBillSchema.extend({
  amendments: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  cboCostEstimates: z.array(
    z.strictObject({
      description: z.string(),
      pubDate: z.string(),
      title: z.string(),
      url: z.string(),
    }),
  ),
  cosponsors: z.strictObject({
    count: z.number(),
    countIncludingWithdrawnCosponsors: z.number(),
    url: z.string(),
  }),
});

export const BillActionSchema = z.strictObject({
  actionCode: z.string().optional(),
  actionDate: z.string(),
  actionTime: z.string().optional(),
  committees: z
    .array(
      z.strictObject({
        name: z.string(),
        systemCode: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  recordedVotes: z
    .array(
      z.strictObject({
        chamber: z.nativeEnum(Chamber),
        congress: z.number(),
        date: z.string(),
        rollNumber: z.number(),
        sessionNumber: z.union([z.literal(1), z.literal(2)]),
        url: z.string(),
      }),
    )
    .optional(),
  sourceSystem: z.strictObject({
    code: z.number().optional(),
    name: z.string(),
  }),
  text: z.string(),
  type: z.string(),
});

export const BillAmendmentSchema = z.strictObject({
  congress: z.number(),
  description: z.string(),
  purpose: z.string().optional(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  number: z.string(),
  type: z.string(),
  updateDate: z.string(),
  url: z.string(),
});

export const BillCommitteeSchema = z.strictObject({
  activities: z.array(
    z.strictObject({
      date: z.string(),
      name: z.string(),
    }),
  ),
  chamber: z.nativeEnum(Chamber),
  name: z.string(),
  systemCode: z.string(),
  type: z.string(),
  url: z.string(),
  subcommittees: z
    .array(
      z.strictObject({
        name: z.string(),
        systemCode: z.string(),
        url: z.string(),
        activities: z.array(
          z.strictObject({
            date: z.string(),
            name: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

export const BillCosponsorSchema = z.strictObject({
  bioguideId: z.string(),
  district: z.number(),
  firstName: z.string(),
  fullName: z.string(),
  isOriginalCosponsor: z.boolean(),
  lastName: z.string(),
  middleName: z.string().optional(),
  party: z.string(),
  sponsorshipDate: z.string(),
  state: z.nativeEnum(StateCode).optional(),
  url: z.string(),
});

export const RelatedBillSchema = z.strictObject({
  congress: z.number(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    actionTime: z.string().optional(),
    text: z.string(),
  }),
  number: z.number(),
  relationshipDetails: z.array(
    z.strictObject({
      identifiedBy: z.string(),
      type: z.string(),
    }),
  ),
  title: z.string(),
  type: z.string(),
  url: z.string(),
});

export const BillSubjectSchema = z.strictObject({
  legislativeSubjects: z.array(
    z.strictObject({
      name: z.string(),
      updateDate: z.string(),
    }),
  ),
  // https://www.congress.gov/help/field-values/policy-area
  policyArea: z.strictObject({
    name: z.string(),
    updateDate: z.string().optional(),
  }),
});

export const BillSummarySchema = z.strictObject({
  actionDate: z.string(),
  actionDesc: z.string(),
  text: z.string(),
  updateDate: z.string(),
  versionCode: z.string(),
});

export const BillTextSchema = z.strictObject({
  date: z.string().nullable(),
  formats: z.array(
    z.strictObject({
      type: z.string(),
      url: z.string(),
    }),
  ),
  type: z.string(),
});

export const BillTitleSchema = z.strictObject({
  title: z.string(),
  titleType: z.string(),
  titleTypeCode: z.number(),
  updateDate: z.string(),
  billTextVersionCode: z.string().optional(),
  billTextVersionName: z.string().optional(),
  chamberCode: z.nativeEnum(ChamberCode).optional(),
  chamberName: z.nativeEnum(Chamber).optional(),
});

export const LawListSchema = ListBillSchema.extend({
  laws: z.array(
    z.strictObject({
      number: z.string(),
      type: z.string(),
    }),
  ),
});

export const LawSchema = BaseBillSchema.extend({
  laws: z.array(
    z.strictObject({
      number: z.string(),
      type: z.string(),
    }),
  ),
});

export type ListBill = z.infer<typeof ListBillSchema>;
export type Bill = z.infer<typeof BillSchema>;
export type BillAction = z.infer<typeof BillActionSchema>;
export type BillAmendment = z.infer<typeof BillAmendmentSchema>;
export type BillCommittee = z.infer<typeof BillCommitteeSchema>;
export type BillCosponsor = z.infer<typeof BillCosponsorSchema>;
export type RelatedBill = z.infer<typeof RelatedBillSchema>;
export type BillSubject = z.infer<typeof BillSubjectSchema>;
export type BillSummary = z.infer<typeof BillSummarySchema>;
export type BillText = z.infer<typeof BillTextSchema>;
export type BillTitle = z.infer<typeof BillTitleSchema>;
export type LawList = z.infer<typeof LawListSchema>;
export type Law = z.infer<typeof LawSchema>;
