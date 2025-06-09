import { z } from 'zod';

export const DailyCongressionalRecordSchema = z.strictObject({
  congress: z.number(),
  issueDate: z.string(),
  issueNumber: z.string(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  updateDate: z.string(),
  url: z.string(),
  volumeNumber: z.number(),
});

export const DailyCongressionalRecordIssueSchema = z.strictObject({
  congress: z.number(),
  fullIssue: z.strictObject({
    articles: z.strictObject({
      count: z.number(),
      url: z.string(),
    }),
    entireIssue: z.array(
      z.strictObject({
        part: z.string(),
        type: z.string(),
        url: z.string(),
      }),
    ),
    sections: z.array(
      z.strictObject({
        endPage: z.string(),
        name: z.string(),
        startPage: z.string(),
        text: z.array(
          z.strictObject({
            part: z.string().optional(),
            type: z.string(),
            url: z.string(),
          }),
        ),
      }),
    ),
  }),
  issueDate: z.string(),
  issueNumber: z.string(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  updateDate: z.string(),
  url: z.string(),
  volumeNumber: z.number(),
});

export const DailyCongressionalRecordArticleSchema = z.strictObject({
  name: z.string(),
  sectionArticles: z.array(
    z.strictObject({
      endPage: z.string(),
      startPage: z.string(),
      text: z.array(
        z.strictObject({
          type: z.string(),
          url: z.string(),
        }),
      ),
      title: z.string(),
    }),
  ),
});
export type DailyCongressionalRecord = z.infer<typeof DailyCongressionalRecordSchema>;
export type DailyCongressionalRecordIssue = z.infer<
  typeof DailyCongressionalRecordIssueSchema
>;
export type DailyCongressionalRecordArticle = z.infer<
  typeof DailyCongressionalRecordArticleSchema
>;
