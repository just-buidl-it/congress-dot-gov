import { z } from 'zod';

export const ListCRSReportSchema = z.strictObject({
  contentType: z.string(),
  id: z.string(),
  publishDate: z.string(),
  status: z.string(),
  title: z.string(),
  updateDate: z.string(),
  url: z.string(),
  version: z.number(),
});

export const CRSReportSchema = z.strictObject({
  authors: z.array(
    z.strictObject({
      author: z.string(),
    }),
  ),
  contentType: z.string(),
  formats: z.array(
    z.strictObject({
      format: z.string(),
      url: z.string(),
    }),
  ),
  id: z.string(),
  publishDate: z.string(),
  relatedMaterials: z.array(
    z.strictObject({
      URL: z.string(),
      congress: z.number(),
      number: z.union([z.string(), z.number()]),
      title: z.string().nullable(),
      type: z.string(),
    }),
  ),
  status: z.string(),
  summary: z.string(),
  title: z.string(),
  topics: z.array(
    z.strictObject({
      topic: z.string(),
    }),
  ),
  updateDate: z.string(),
  url: z.string(),
  version: z.number(),
});

export type ListCRSReport = z.infer<typeof ListCRSReportSchema>;
export type CRSReport = z.infer<typeof CRSReportSchema>;
