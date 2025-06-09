import { z } from 'zod';

export const ListHearingSchema = z.strictObject({
  chamber: z.string(),
  congress: z.number(),
  jacketNumber: z.number(),
  updateDate: z.string(),
  url: z.string(),
  number: z.number().optional(),
  part: z.number().optional(),
});

export const HearingSchema = z.strictObject({
  associatedMeeting: z.strictObject({
    eventId: z.string(),
    url: z.string(),
  }),
  chamber: z.string(),
  citation: z.string(),
  committees: z.array(
    z.strictObject({
      name: z.string(),
      systemCode: z.string(),
      url: z.string(),
    }),
  ),
  congress: z.number(),
  dates: z.array(
    z.strictObject({
      date: z.string(),
    }),
  ),
  formats: z.array(
    z.strictObject({
      type: z.string(),
      url: z.string(),
    }),
  ),
  jacketNumber: z.number(),
  libraryOfCongressIdentifier: z.string(),
  title: z.string(),
  updateDate: z.string(),
});

export type ListHearing = z.infer<typeof ListHearingSchema>;
export type Hearing = z.infer<typeof HearingSchema>;
