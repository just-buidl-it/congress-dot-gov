import { z } from 'zod';
import { BillType } from './constants';

export const SummarySchema = z.strictObject({
  actionDate: z.string(),
  actionDesc: z.string(),
  bill: z.strictObject({
    congress: z.number(),
    number: z.string(),
    originChamber: z.string(),
    originChamberCode: z.string(),
    title: z.string(),
    type: z.nativeEnum(BillType),
    updateDateIncludingText: z.string(),
    url: z.string(),
  }),
  currentChamber: z.string(),
  currentChamberCode: z.string(),
  lastSummaryUpdateDate: z.string(),
  text: z.string(),
  updateDate: z.string(),
  versionCode: z.string(),
});

export type Summary = z.infer<typeof SummarySchema>;
