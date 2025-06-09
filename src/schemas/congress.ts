import { z } from 'zod';

export const ListCongressSchema = z.strictObject({
  startYear: z.string(),
  name: z.string(),
  endYear: z.string(),
  sessions: z.array(
    z.strictObject({
      chamber: z.string(),
      type: z.string(),
      number: z.number(),
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
      chamber: z.string(),
      type: z.string(),
      number: z.number(),
      startDate: z.string(),
      endDate: z.string().optional(),
    }),
  ),
  url: z.string(),
  updateDate: z.string(),
});
export type ListCongress = z.infer<typeof ListCongressSchema>;
export type Congress = z.infer<typeof CongressSchema>;
