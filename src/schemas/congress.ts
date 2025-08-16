/**
 * @packageDocumentation
 * Schema and interface definitions for data returned from the `congress` endpoints.
 * - /congress returns CongressSummary
 * - /congress/{congress} returns Congress
 * - /congress/current returns Congress
 * [Library of Congress XML Documentation](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/CongressEndpoint.md)
 *
 */
import { z } from 'zod/v4';
import { CongressChamber, Session } from './constants';

/**
 * Zod schema for validating entities returned from the `/congress` list endpoint.
 */
export const CongressSummarySchema = z.strictObject({
  /** The start year for the congress. Congresses span over a two-year period. (e.g. 2019) */
  startYear: z.string(),
  /** The name of the congress. (e.g. 116th Congress) */
  name: z.string(),
  /** The generalized end year for the congress. Congresses span over a two-year period.
   * See [Congresses - Field Values](https://www.congress.gov/help/field-values/congresses) for more information about congress field values.
   * (e.g. 2021)
   */
  endYear: z.string(),
  /** Array of sessions for the congress. */
  sessions: z.array(
    z.strictObject({
      /** The chamber associated with the session of congress. Possible values are "House of Representatives" and "Senate". */
      chamber: z.enum(CongressChamber),
      /** The type of session. Possible values are "R" and "S" where "R" stands for "Regular" and "S" stands for "Special". */
      type: z.enum(Session),
      /** The assigned session's number. For special sessions, this value is suppressed. */
      number: z.number().optional(),
      /** The start date of the session. (e.g. 2019-01-03 */
      startDate: z.iso.date(),
      /** The specific end date of the session. This value is specified for legislative research.
       * See [Past Days in Session](https://www.congress.gov/past-days-in-session) for more information about past days in session of legislative sessions.
       */
      endDate: z.iso.date().optional(),
    }),
  ),
  /** A referrer URL to the congress item in the API. */
  url: z.url(),
  /** The date of update in Congress.gov. (e.g. 2019-01-03T18:37:12Z) */
  updateDate: z.iso.datetime(),
});

export const CongressSummaryStandardizeSchema = CongressSummarySchema.extend({
  startYear: z.preprocess(
    (val) => Number(val),
    z.number(),
  ),
  endYear: z.preprocess(
    (val) => Number(val),
    z.number(),
  ),
});

/**
 * Zod schema for validating detailed entity returned from the `/congress/{congress}` endpoint.
 */
export const CongressSchema = z.strictObject({
  /** The start year for the congress. Congresses span over a two-year period. (e.g. 2019) */
  startYear: z.string(),
  /** The name of the congress. (e.g. 116th Congress) */
  name: z.string(),
  /** The congress number. */
  number: z.number(),
  /** The generalized end year for the congress. Congresses span over a two-year period.
   * See [Congresses - Field Values](https://www.congress.gov/help/field-values/congresses) for more information about congress field values.
   * (e.g. 2021)
   */
  endYear: z.string(),
  /** Array of sessions for the congress. */
  sessions: z.array(
    z.strictObject({
      /** The chamber associated with the session of congress. Possible values are "House of Representatives" and "Senate". */
      chamber: z.enum(CongressChamber),
      /** The type of session. Possible values are "R" and "S" where "R" stands for "Regular" and "S" stands for "Special". */
      type: z.enum(Session),
      /** The assigned session's number. For special sessions, this value is suppressed. */
      number: z.number(),
      /** The start date of the session. (e.g. 2019-01-03 */
      startDate: z.iso.date(),
      /** The specific end date of the session. This value is specified for legislative research.
       * See [Past Days in Session](https://www.congress.gov/past-days-in-session) for more information about past days in session of legislative sessions.
       */
      endDate: z.iso.date().optional(),
    }),
  ),
  /** A referrer URL to the congress item in the API. */
  url: z.url(),
  /** The date of update in Congress.gov. (e.g. 2019-01-03T18:37:12Z) */
  updateDate: z.iso.datetime(),
});

export const CongressStandardizeSchema = CongressSchema.extend({
  startYear: z.preprocess(
    (val) => Number(val),
    z.number(),
  ),
  endYear: z.preprocess(
    (val) => Number(val),
    z.number(),
  ),
});

/**
 * Congress interface generated from zod CongressSummarySchema
 * @inline
 */
export type CongressSummary = z.infer<typeof CongressSummarySchema>;
/**
 * Congress interface generated from zod CongressSchema
 * @inline
 */
export type Congress = z.infer<typeof CongressSchema>;
