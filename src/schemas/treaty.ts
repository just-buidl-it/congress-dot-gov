import { z } from 'zod';

export const ListTreatySchema = z.strictObject({
  congressReceived: z.number(),
  congressConsidered: z.number().nullable(),
  number: z.number(),
  parts: z.record(z.any()),
  suffix: z.string(),
  topic: z.string().nullable(),
  transmittedDate: z.string().nullable(),
  updateDate: z.string(),
  url: z.string(),
});

export const TreatySchema = z.strictObject({
  actions: z.strictObject({
    count: z.number(),
    url: z.string(),
  }),
  congressConsidered: z.number(),
  congressReceived: z.number(),
  countriesParties: z.array(
    z.strictObject({
      name: z.string(),
    }),
  ),
  inForceDate: z.null(),
  indexTerms: z.array(
    z.strictObject({
      name: z.string(),
    }),
  ),
  number: z.number(),
  oldNumber: z.null(),
  oldNumberDisplayName: z.null(),
  parts: z.record(z.any()),
  relatedDocs: z.array(
    z.strictObject({
      citation: z.string(),
      url: z.string(),
    }),
  ),
  resolutionText: z.string(),
  suffix: z.string(),
  titles: z.array(
    z.strictObject({
      title: z.string(),
      titleType: z.string(),
    }),
  ),
  topic: z.string(),
  transmittedDate: z.string(),
  updateDate: z.string(),
});

export const TreatyActionSchema = z.strictObject({
  actionCode: z.string(),
  actionDate: z.string(),
  committee: z
    .strictObject({
      systemCode: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .nullable(),
  text: z.string(),
  type: z.string(),
});
export const TreatyCommitteeSchema = z.strictObject({
  activities: z.array(
    z.strictObject({
      date: z.string(),
      name: z.string(),
    }),
  ),
  chamber: z.literal('Senate'),
  name: z.string(),
  subcommittees: z.array(z.strictObject({})),
  systemCode: z.string(),
  type: z.string(),
  url: z.string(),
});

export type ListTreaty = z.infer<typeof ListTreatySchema>;
export type Treaty = z.infer<typeof TreatySchema>;
export type TreatyAction = z.infer<typeof TreatyActionSchema>;
export type TreatyCommittee = z.infer<typeof TreatyCommitteeSchema>;
