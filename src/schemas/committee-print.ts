import { z } from 'zod';
import { Chamber, CommitteeReportFormat } from './constants';

export const ListCommitteePrintSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  congress: z.number(),
  jacketNumber: z.number(),
  updateDate: z.string(),
  url: z.string(),
});

export const CommitteePrintSchema = z.strictObject({
  associatedBills: z.array(
    z.strictObject({
      congress: z.number(),
      number: z.string(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  chamber: z.nativeEnum(Chamber),
  citation: z.string(),
  committees: z.array(
    z.strictObject({
      name: z.string(),
      systemCode: z.string(),
      url: z.string(),
    }),
  ),
  congress: z.number(),
  jacketNumber: z.number(),
  number: z.string(),
  text: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  title: z.string(),
  updateDate: z.string(),
});

export const CommitteePrintTextSchema = z.strictObject({
  type: z.nativeEnum(CommitteeReportFormat),
  url: z.string(),
});

export type ListCommitteePrint = z.infer<typeof ListCommitteePrintSchema>;
export type CommitteePrint = z.infer<typeof CommitteePrintSchema>;
export type CommitteePrintText = z.infer<typeof CommitteePrintTextSchema>;
