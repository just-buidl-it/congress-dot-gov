import { z } from 'zod';
import { BillType, Chamber, CommitteeType } from './constants';

export const ListCommitteeSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  committeeTypeCode: z.nativeEnum(CommitteeType),
  updateDate: z.string(),
  name: z.string(),
  parent: z
    .strictObject({
      name: z.string(),
      systemCode: z.string(),
      url: z.string(),
    })
    .optional(),
  subcommittees: z
    .array(
      z.strictObject({
        name: z.string(),
        systemCode: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  systemCode: z.string(),
  url: z.string(),
});

export const CommitteeSchema = z.strictObject({
  bills: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  communications: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  history: z.array(
    z.strictObject({
      libraryOfCongressName: z.string(),
      officialName: z.string(),
      startDate: z.string(),
      updateDate: z.string(),
      endDate: z.string().optional(),
      committeeTypeCode: z.nativeEnum(CommitteeType),
      establishingAuthority: z.string().optional(),
      locLinkedDataId: z.string().optional(),
      superintendentDocumentNumber: z.string().optional(),
      naraId: z.string().optional(),
    }),
  ),
  isCurrent: z.boolean(),
  nominations: z
    .strictObject({
      count: z.number(),
      url: z.string(),
    })
    .optional(),
  parent: z
    .strictObject({
      name: z.string(),
      systemCode: z.string(),
      url: z.string(),
    })
    .optional(),
  reports: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  subcommittees: z
    .array(
      z.strictObject({
        name: z.string(),
        systemCode: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  systemCode: z.string(),
  type: z.string(),
  updateDate: z.string(),
});

export const CommitteeBillSchema = z.strictObject({
  actionDate: z.string(),
  billType: z.nativeEnum(BillType).optional(),
  congress: z.number(),
  number: z.string(),
  relationshipType: z.string(),
  type: z.string(),
  updateDate: z.string(),
  url: z.string(),
});

// export const CommitteeReportSchema = z.strictObject({
//   chamber: z.string(),
//   citation: z.string(),
//   congress: z.number(),
//   number: z.number(),
//   part: z.number(),
//   type: z.nativeEnum(CommitteeReportType),
//   updateDate: z.string(),
//   url: z.string()
// });

export const CommitteeNominationSchema = z.strictObject({
  // The citation identifying the nomination. PN indicates "Presidential Nomination" and the digits are the nominations assigned number. If the nomination was partitioned, the citation will include a dash and the partition number (e.g. PN78-4)
  citation: z.string(),
  congress: z.number(),
  description: z.string(),
  latestAction: z.strictObject({
    actionDate: z.string(),
    text: z.string(),
    url: z.string().optional(),
  }),
  nominationType: z.strictObject({
    isCivilian: z.boolean(),
    isMilitary: z.boolean(),
  }),
  number: z.number(),
  // The part number for the individual nomination. Nominations with multiple nominees may be partitioned if the nominees follow different confirmation paths
  partNumber: z.string(),
  receivedDate: z.string(),
  updateDate: z.string(),
  url: z.string(),
});

export const CommitteeCommunicationSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  communicationType: z.strictObject({
    code: z.string(),
    name: z.string(),
  }),
  congress: z.number(),
  number: z.number(),
  referralDate: z.string(),
  updateDate: z.string(),
  url: z.string(),
});

export type ListCommittee = z.infer<typeof ListCommitteeSchema>;
export type Committee = z.infer<typeof CommitteeSchema>;
export type CommitteeBill = z.infer<typeof CommitteeBillSchema>;
// export type CommitteeReport = z.infer<typeof CommitteeReportSchema>;
export type CommitteeNomination = z.infer<typeof CommitteeNominationSchema>;
export type CommitteeCommunication = z.infer<typeof CommitteeCommunicationSchema>;
