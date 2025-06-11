import { z } from 'zod';
import { CongressChamber, Session } from './constants';


export const CongressSummarySchema = z.strictObject({
  startYear: z.string(),
  name: z.string(),
  endYear: z.string(),
  sessions: z.array(
    z.strictObject({
      chamber: z.nativeEnum(CongressChamber),
      type: z.nativeEnum(Session),
      number: z.number().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
    }),
  ),
  url: z.string(),
  updateDate: z.string(),
});

export const CongressSchema = z.strictObject({
  startYear: z.string(),
  name: z.string(),
  number: z.number(),
  endYear: z.string(),
  sessions: z.array(
    z.strictObject({
      chamber: z.nativeEnum(CongressChamber),
      type: z.nativeEnum(Session),
      number: z.number(),
      startDate: z.string(),
      endDate: z.string().optional(),
    }),
  ),
  url: z.string(),
  updateDate: z.string(),
});

export type CongressSummary = z.infer<typeof CongressSummarySchema>;
export type Congress = z.infer<typeof CongressSchema>;
