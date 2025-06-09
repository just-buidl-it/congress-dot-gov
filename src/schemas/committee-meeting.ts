import { z } from 'zod';
import { Chamber } from './constants';

export const ListCommitteeMeetingSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  congress: z.number(),
  eventId: z.string(),
  updateDate: z.string(),
  url: z.string(),
});
export const CommitteeMeetingSchema = z.strictObject({
  chamber: z.nativeEnum(Chamber),
  committees: z.array(
    z.strictObject({
      name: z.string(),
      systemCode: z.string(),
      url: z.string(),
    }),
  ),
  congress: z.number(),
  date: z.string(),
  eventId: z.string(),
  hearingTranscript: z.array(
    z.strictObject({
      jacketNumber: z.number(),
      url: z.string(),
    }),
  ),
  location: z.strictObject({
    building: z.string(),
    room: z.string(),
  }),
  meetingDocuments: z.array(
    z.strictObject({
      description: z.string().nullable().optional(),
      documentType: z.string(),
      format: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
  meetingStatus: z.string(),
  relatedItems: z.strictObject({
    bills: z
      .array(
        z.strictObject({
          congress: z.number(),
          number: z.string(),
          type: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    nominations: z
      .array(
        z.strictObject({
          congress: z.number(),
          number: z.string(),
          part: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    treaties: z
      .array(
        z.strictObject({
          congress: z.number(),
          number: z.string(),
          part: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
  title: z.string(),
  type: z.string(),
  updateDate: z.string(),
  videos: z.array(z.any()),
  witnessDocuments: z.array(
    z.strictObject({
      documentType: z.string(),
      format: z.string(),
      url: z.string(),
    }),
  ),
  witnesses: z.array(
    z.strictObject({
      name: z.string(),
      organization: z.string(),
      position: z.string(),
    }),
  ),
});

export type ListCommitteeMeeting = z.infer<typeof ListCommitteeMeetingSchema>;
export type CommitteeMeeting = z.infer<typeof CommitteeMeetingSchema>;
