import { z } from 'zod';
import { CommunicationTypeCode, CommunicationTypeName } from './constants';

export const ListSenateCommunicationSchema = z.strictObject({
  chamber: z.literal('Senate'),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  congress: z.number(),
  number: z.number(),
  updateDate: z.string(),
  url: z.string(),
});

export const SenateCommunicationSchema = z.strictObject({
  abstract: z.string().optional(),
  chamber: z.literal('Senate'),
  committees: z
    .array(
      z.strictObject({
        name: z.string(),
        referralDate: z.string(),
        systemCode: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  communicationType: z.strictObject({
    code: z.nativeEnum(CommunicationTypeCode),
    name: z.nativeEnum(CommunicationTypeName),
  }),
  congress: z.number(),
  congressionalRecordDate: z.string().optional(),
  number: z.number(),
  sessionNumber: z.union([z.literal(1), z.literal(2)]),
  updateDate: z.string(),
  // Undocumented field
  classificationType: z
    .strictObject({
      name: z.string(),
      code: z.string(),
    })
    .optional(),
});

export type ListSenateCommunication = z.infer<typeof ListSenateCommunicationSchema>;
export type SenateCommunication = z.infer<typeof SenateCommunicationSchema>;
