import { z } from 'zod';

export const BoundCongressionalRecordSchema = z.strictObject({
  congress: z.number(),
  date: z.string(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  updateDate: z.string(),
  url: z.string(),
  volumeNumber: z.number(),
});

export const DailyDigestBoundCongressionalRecordSchema = z.strictObject({
  congress: z.number(),
  dailyDigest: z
    .strictObject({
      endPage: z.number(),
      startPage: z.number(),
      text: z.array(
        z.strictObject({
          type: z.string(),
          url: z.string(),
        }),
      ),
    })
    .optional(),
  date: z.string(),
  sections: z.array(
    z.strictObject({
      endPage: z.number(),
      name: z.string(),
      startPage: z.number(),
    }),
  ),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  updateDate: z.string(),
  volumeNumber: z.number(),
});

export type BoundCongressionalRecord = z.infer<typeof BoundCongressionalRecordSchema>;
export type DailyDigestBoundCongressionalRecord = z.infer<
  typeof DailyDigestBoundCongressionalRecordSchema
>;
