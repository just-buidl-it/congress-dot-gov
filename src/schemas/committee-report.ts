import { z } from 'zod';
import {
  CommitteeReportReportType,
  CommitteeReportType,
  Chamber,
  CommitteeReportFormat,
} from './constants';

export const ListCommitteeReportSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  citation: z.string(),
  congress: z.number(),
  number: z.number(),
  part: z.number().optional(),
  type: z.nativeEnum(CommitteeReportType),
  updateDate: z.string(),
  url: z.string(),
});

export const CommitteeReportSchema = z.strictObject({
  associatedBill: z.array(
    z.strictObject({
      congress: z.number(),
      number: z.string(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  associatedTreaties: z
    .array(
      z.strictObject({
        congress: z.number(),
        number: z.string(),
        part: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  committees: z
    .array(
      z.strictObject({
        congress: z.number(),
        number: z.string(),
        part: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  chamber: z.nativeEnum(Chamber),
  citation: z.string(),
  congress: z.number(),
  isConferenceReport: z.boolean(),
  issueDate: z.string(),
  number: z.number(),
  part: z.number(),
  reportType: z.nativeEnum(CommitteeReportReportType),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  text: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  title: z.string(),
  type: z.nativeEnum(CommitteeReportType),
  updateDate: z.string(),
});

export const CommitteeReportTextSchema = z.strictObject({
  formats: z.array(
    z.strictObject({
      isErrata: z.union([z.literal('Y'), z.literal('N')]),
      type: z.nativeEnum(CommitteeReportFormat),
      url: z.string(),
    }),
  ),
});

export type ListCommitteeReport = z.infer<typeof ListCommitteeReportSchema>;
export type CommitteeReport = z.infer<typeof CommitteeReportSchema>;
export type CommitteeReportText = z.infer<typeof CommitteeReportTextSchema>;
