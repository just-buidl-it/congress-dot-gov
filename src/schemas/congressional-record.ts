import { z } from 'zod';

export interface CapitalizedCongressionalRecord {
  Congress: string;
  Id: number;
  Issue: string;
  Links: {
    Digest: {
      Label: string;
      Ordinal: number;
      PDF: {
        Part: string;
        Url: string;
      }[];
    };
    FullRecord: {
      Label: string;
      Ordinal: number;
      PDF: {
        Part: string;
        Url: string;
      }[];
    };
    House: {
      Label: string;
      Ordinal: number;
      PDF: {
        Part: string;
        Url: string;
      }[];
    };
    Remarks: {
      Label: string;
      Ordinal: number;
      PDF: {
        Part: string;
        Url: string;
      }[];
    };
    Senate: {
      Label: string;
      Ordinal: number;
      PDF: {
        Part: string;
        Url: string;
      }[];
    };
  };
  PublishDate: string;
  Session: string;
  Volume: string;
}

export const CongressionalRecordSchema = z.strictObject({
  congress: z.string(),
  id: z.number(),
  issue: z.string(),
  links: z.strictObject({
    digest: z
      .strictObject({
        label: z.string(),
        ordinal: z.number(),
        pdf: z
          .array(
            z.strictObject({
              part: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    fullRecord: z
      .strictObject({
        label: z.string(),
        ordinal: z.number(),
        pdf: z
          .array(
            z.strictObject({
              part: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    house: z
      .strictObject({
        label: z.string(),
        ordinal: z.number(),
        pdf: z
          .array(
            z.strictObject({
              part: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    remarks: z
      .strictObject({
        label: z.string(),
        ordinal: z.number(),
        pdf: z
          .array(
            z.strictObject({
              part: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    senate: z
      .strictObject({
        label: z.string(),
        ordinal: z.number(),
        pdf: z
          .array(
            z.strictObject({
              part: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
  }),
  publishDate: z.string(),
  session: z.string(),
  volume: z.string(),
});

export type CongressionalRecord = z.infer<typeof CongressionalRecordSchema>;
