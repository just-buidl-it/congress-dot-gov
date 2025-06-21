/**
 * @packageDocumentation
 * Schema and interface definitions for data returned from the `amendment` endpoints.
 * - /amendment returns AmendmentSummary
 * - /amendment/{congress} returns AmendmentSummary
 * - /amendment/{congress}/{amendmentType} returns AmendmentSummary
 * - /amendment/{congress}/{amendmentType}/{amendmentNumber} returns Amendment
 * - /amendment/{congress}/{amendmentType}/{amendmentNumber}/actions returns AmendmentAction
 * - /amendment/{congress}/{amendmentType}/{amendmentNumber}/cosponsors returns AmendmentCosponsor
 * - /amendment/{congress}/{amendmentType}/{amendmentNumber}/amendments returns AmendmentAmendment
 * - /amendment/{congress}/{amendmentType}/{amendmentNumber}/text returns AmendmentText
 * [Library of Congress XML Documentation](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/AmendmentEndpoint.md)
 *
 */
import { z } from 'zod/v4';
import {
  ActionType,
  AmendmentType,
  Chamber,
  ChamberCode,
  BillType,
  PartyName,
  OnBehalfOfSponsorAction,
  PartyCode,
  StateCode,
  SourceSystemName,
  AmendmentTextType,
} from './constants';

/**  @ignore */
const AmendmentSummaryBaseSchema = z.strictObject({
  /** The congress during which an amendment was submitted or offered. (e.g. 117) */
  congress: z.number(),
  latestAction: z
    .strictObject({
      /** The date of the latest action taken on the amendment. (e.g. 2021-08-08) */
      actionDate: z.iso.date(),
      /** The text of the latest action taken on the amendment. (e.g. Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312.) */
      text: z.string(),
      /** The time of the latest action taken on the amendment.
       * Certain actions taken by the House contain this element.
       */
      actionTime: z.iso.time().optional(),
    })
    .optional(),
  /** The assigned amendment number. (e.g. 2137) */
  number: z.string(),
  /** The amendment's purpose. (e.g. In the nature of a substitute.)
   * House amendments and proposed Senate amendments may have this element populated.
   */
  purpose: z.string().optional(),
  /** The type of amendment. (e.g. SAMDT)
   * Possible values are "HAMDT", "SAMDT", and "SUAMDT".
   * Note that the "SUAMDT" type value is only available for the 97th and 98th Congresses.
   */
  type: z.enum(AmendmentType),
  /** The referrer URL to the amendment item in the API. */
  url: z.url(),
  /** The date of update in Congress.gov. (e.g., 2022-06-30T03:50:22Z) */
  updateDate: z.iso.datetime(),
});

const amendmentTypeEnum = z.enum(AmendmentType);

/**
* Zod schema for validating entities returned from the `/amendment`, `/amendment/{congress}/{amendmentType}`, and `/amendment/{congress}` list endpoints.
* @ignore
*/
export const AmendmentSummarySchema = z.discriminatedUnion('type', [
  z.object({
    ...AmendmentSummaryBaseSchema.shape,
    /** The amendment's description. Only House amendments will have this element populated. */
    description: z.string(),
    type: amendmentTypeEnum.extract([AmendmentType.HAMDT]),
  }),
  z
    .strictObject({
      ...AmendmentSummaryBaseSchema.shape,
      type: amendmentTypeEnum.extract([AmendmentType.SAMDT]),
    }),
  z
    .strictObject({
      ...AmendmentSummaryBaseSchema.shape,
      type: amendmentTypeEnum.extract([AmendmentType.SUAMDT]),
    }),
]);

const AmendmentDetailBaseSchema = z.strictObject({
  ...AmendmentSummaryBaseSchema.shape,
  /** the latest action taken on the amendment */
  latestAction: z
    .strictObject({
      /** The date of the latest action taken on the amendment. (e.g. 2021-08-08) */
      actionDate: z.iso.date(),
      /** The text of the latest action taken on the amendment. (e.g. Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312.) */
      text: z.string(),
      /** The time of the latest action taken on the amendment.
       * Certain actions taken by the House contain this element.
       */
      actionTime: z.iso.time().optional(),
      /** ** Not documented** */
      links: z.array(
        z.strictObject({
          url: z.string(),
          name: z.string(),
        }),
      ),
    })
    .optional(),
  /** */
  actions: z.strictObject({
    /** The number of actions on the amendment. A count element may include actions from the House, Senate, and Library of Congress. */
    count: z.number(),
    /** A referrer URL to the actions level of the amendment */
    url: z.url(),
  }),
  /** The sponsor of the amendment. */
  sponsors: z.array(
    z.strictObject({
      /** The unique identifier for the amendment's sponsor, as assigned in the [Biographical Directory of the United States Congress, 1774-Present](https://bioguide.congress.gov/).
       * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov.
       */
      bioguideId: z.string(),
      /** The first name of the amendment's sponsor. (e.g. Kyrsten) */
      firstName: z.string(),
      /** The display name of the amendment's sponsor. (e.g. Sen. Sinema, Kyrsten [D-AZ]) */
      fullName: z.string(),
      /** The middle name or initial of the amendment's sponsor. */
      middleName: z.string().optional(),
      /** The last name of the amendment's sponsor. (e.g. Sinema) */
      lastName: z.string(),
      /** The party code of the amendment's sponsor. (e.g. D) */
      party: z.enum(PartyCode).optional(),
      /** A two-letter abbreviation for the state, territory, or district represented by the amendment's sponsor. (e.g. AZ) */
      state: z.enum(StateCode).optional(),
      /**  The congressional district that the amendment's sponsor represents.
       *   Note that this element will be empty for Senate sponsors and will be "0" for states, territories, or districts where there is only one congressional district.
       */
      district: z.number().optional(),
      /**  A referrer URL to the member item in the API. (e.g. https://api.congress.gov/v3/member/S001191) */
      url: z.url(),
    }),
  ),
  /** the person who submitted and/or proposed the amendment on behalf of the sponsor of the amendment. */
  onBehalfOfSponsor: z
    .strictObject({
      /** The unique identifier for the amendment's sponsor, as assigned in the [Biographical Directory of the United States Congress, 1774-Present](https://bioguide.congress.gov/).
       * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov.
       */
      bioguideId: z.string(),
      /** The first name of the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor.
       * (e.g. Kyrsten)
       */
      firstName: z.string(),
      /** The display name of the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor
       * (e.g. Sen. Sinema, Kyrsten [D-AZ])
       */
      fullName: z.string(),
      /** The middle name or initial of the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor. */
      middleName: z.string().optional(),
      /** The last name of the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor. (e.g. Sinema) */
      lastName: z.string(),
      /** The party code of the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor. (e.g. D) */
      party: z.enum(PartyName).optional(),
      /** A two-letter abbreviation for the state, territory, or district represented by the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor. (e.g. AZ) */
      state: z.enum(StateCode).optional(),
      /** The congressional district that the senator who submitted and/or proposed the amendment on behalf of the sponsor of the amendment amendment's sponsor represents.
       * Note that this element will be empty for Senate sponsors and will be "0" for states, territories, or districts where there is only one congressional district.
       */
      district: z.number().optional(),
      /** The type of on behalf of sponsor action. This can be "Submitted on behalf of" the sponsor and/or "Proposed on behalf of" the sponsor. */
      type: z.enum(OnBehalfOfSponsorAction).optional(),
      /** A referrer URL to the member item in the API. (e.g. https://api.congress.gov/v3/member/S001191) */
      url: z.string(),
    })
    .optional(),
  /** The chamber in which the amendment was submitted or offered. (e.g. Senate) */
  chamber: z.enum(Chamber),
  /** The date the amendment was proposed on the floor. (e.g. 2021-08-01T04:00:00Z)
   * This element will only be populated for proposed Senate amendments.
   */
  proposedDate: z.iso.datetime().optional(),
  /** Notes attached to the amendment on Congress.gov. The note may contain supplemental information about the amendment that users may find helpful.
   * Read more [about notes](https://www.congress.gov/help/legislative-glossary#glossary_notes) on Congress.gov.
   */
  notes: z.string().optional(),
  /** The date the amendment was submitted or offered. (e.g. 2021-08-01T04:00:00Z) */
  submittedDate: z.iso.datetime().optional(),
  /** **Not documented** */
  textVersions: z.strictObject({
    url: z.url(),
    count: z.number(),
    formats: z
      .array(
        z.strictObject({
          type: z.string(),
          url: z.url(),
        }),
      )
      .optional(),
  }),
  /** The bill amended by the amendment */
  amendedBill: z.strictObject({
    /** The congress during which the bill or resolution was introduced or submitted. e.g. 117) */
    congress: z.number(),
    /** The assigned bill or resolution number. */
    number: z.string(),
    /** The chamber of origin where a bill or resolution was introduced or submitted.
     * Possible values are "House" and "Senate".
     */
    originChamber: z.enum(Chamber),
    /** The code for the chamber of origin where the bill or resolution was introduced or submitted.
     * Possible values are "H" and "S".
     */
    originChamberCode: z.enum(ChamberCode),
    /** The display title for the bill or resolution on Congress.gov. */
    title: z.string(),
    /** The type of bill or resolution.
     *  Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES".
     */
    type: z.enum(BillType),
    /** A referrer URL to the bill or resolution item in the API */
    url: z.url(),
    /** **Not Documented** */
    updateDateIncludingText: z.string(),
  }),
  /** The amendment amended by the amendment. */
  amendedAmendment: z
    .strictObject({
      /** The congress during which an amendment was submitted or offered. (e.g. 117) */
      congress: z.number(),
      /** The assigned amendment number. */
      number: z.string(),
      /** The amendment's description.
       *  Only House amendments will have this element populated
       */
      description: z.string().optional(),
      /** The amendment's purpose.
       * House amendments and proposed Senate amendments may have this element populated.
       */
      purpose: z.string().optional(),
      /** The type of amendment.
       *  Possible values are "HAMDT", "SAMDT", and "SUAMDT". Note that the "SUAMDT" type value is only available for the 97th and 98th Congresses.
       */
      type: amendmentTypeEnum,
      /** A referrer URL to the amendment item in the API. */
      url: z.url(),
    })
    .optional(),
  /** Amendments to the amendment. */
  amendmentsToAmendment: z
    .strictObject({
      /** The number of amendments to the amendment. */
      count: z.number(),
      /** A referrer URL to the amendment to amendments level of the amendment API. */
      url: z.url(),
    })
    .optional(),
  /** The treaty amended by the amendment */
  amendedTreaty: z
    .strictObject({
      /** The congress during which a treaty was submitted. (e.g. 116) */
      congress: z.number(),
      /** The assigned treaty number. (e.g. 1) */
      treatyNumber: z.number(),
      /** A referrer URL to the treaty item in the API. Documentation for the treaty endpoint is available here. */
      url: z.url(),
    })
    .optional(),
}).omit({ url: true });

/**
* Zod schema for validating entities returned from the `/amendment/{congress}/{amendmentType}/{amendmentNumber}` detail endpoint.
* @ignore
*/
export const AmendmentSchema = z.discriminatedUnion('type', [
  z.object({
    ...AmendmentDetailBaseSchema.shape,
    description: z.string(),
    type: amendmentTypeEnum.extract([AmendmentType.HAMDT]),
  }),
  z
    .strictObject({
      ...AmendmentDetailBaseSchema.shape,
      type: amendmentTypeEnum.extract([AmendmentType.SAMDT]),
      cosponsors: z
        .strictObject({
          count: z.number(),
          countIncludingWithdrawnCosponsors: z.number(),
          url: z.string(),
        })
        .optional(),
    }),
  z
    .strictObject({
      ...AmendmentDetailBaseSchema.shape,
      type: amendmentTypeEnum.extract([AmendmentType.SUAMDT]),
      cosponsors: z
        .strictObject({
          /** The current number of cosponsors of the amendment, not including any withdrawn cosponsors. */
          count: z.number(),
          /** The total number of cosponsors of the amendment, including any withdrawn cosponsors. */
          countIncludingWithdrawnCosponsors: z.number(),
          /** A referrer URL to the cosponsors level of the amendment item in the API. (e.g. https://api.congress.gov/v3/amendment/117/samdt/3892/cosponsors) */
          url: z.url(),
        })
        .optional(),
    }),
]);
 
/**
* Zod schema for validating entities returned from the `/amendment/{congress}/{amendmentType}/{amendmentNumber}/actions` endpoint.
* @ignore
*/
export const AmendmentActionSchema = z.strictObject({
  /** The date of the action taken on an amendment. (e.g. 2021-08-08) */
  actionDate: z.iso.date(),
  /**  The time of the action taken on an amendment.
   * Certain actions taken by the House contain this element.
   */
  actionTime: z.iso.time().optional(),
  /** An action code associated with the action taken on an amendment.
   *  The `actionCode` element will be present only for actions where the `sourceSystem` is 2 (House) or 9 (Library of Congress).
   *  [Action Codes](https://www.congress.gov/help/field-values/action-codes) is an authoritative list of values where the `sourceSystem` is 9 (Library of Congress).
   *  An authoritative list of values where the `sourceSystem` is 2 (House) does not exist.
   *  Various code sets are used by multiple systems in the House, Senate, and Library of Congress
   * by legislative clerks and data editors for functions independent of this data set.
   * As new codes and systems were developed, there was no coordinated effort to retroactively apply new codes to old records.
   * Many codes are concatenated with other codes or elements or utilize free text. Codes in one set may be redundant with a different code in another code set.
   * Additionally, some codes may have been used and re-used over the years for different purposes further complicating the ability to create an authoritative list.
   * View the original code set of [U.S. Congress legislative status steps](http://www.loc.gov/pictures/resource/ppmsca.33996/).
   */
  actionCode: z.string().optional(),
  /** recorded (roll call) votes associated with the action.
   * Read more [about roll call votes](https://www.congress.gov/help/legislative-glossary#glossary_rollcallvote) on Congress.gov.
   *  More information can also be found at the [Roll Call Votes by the U.S. Congress](https://www.congress.gov/roll-call-votes)
   * and [Votes in the House and Senate](https://www.congress.gov/help/votes-in-the-house-and-senate) pages on Congress.gov.
   */
  recordedVotes: z
    .array(
      z.strictObject({
        /** The chamber where the recorded (roll call) vote took place.
         * Possible values are "House" and "Senate".
         */
        chamber: z.enum(Chamber),
        /** The congress during which the recorded (roll call) vote took place. (e.g. 117) */
        congress: z.number(),
        /** The date of the recorded (roll call) vote. */
        date: z.iso.datetime(),
        /** The recorded (roll call) vote number. */
        rollNumber: z.number(),
        /** The session of congress during which the recorded (roll call) vote took place. */
        sessionNumber: z.union([z.literal(1), z.literal(2)]),
        /** The url to the recorded (roll call) vote on Senate.gov or Clerk.House.gov. */
        url: z.url(),
      }),
    )
    .optional(),
  /** The source system where the action was entered */
  sourceSystem: z.strictObject({
    /** A code for the source system that entered the action.
     * Possible values are "0", "1", "2", or "9".
     * "0" is for Senate, "1" and "2" are for House, and "9" is Library of Congress.
     */
    code: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(9)]),
    /** The name of the source system where the action was entered */
    name: z.enum(SourceSystemName),
  }),
  /** Committees associated with the action */
  committees: z
    .strictObject({
      /** A referrer URL to the committee or subcommittee in the API. Documentation for the committee endpoint is available here. */
      url: z.url(),
      /** Unique ID value for the committee or subcommittee. */
      systemCode: z.string(),
      /** The name of the committee or subcommittee associated with the action. */
      name: z.string(),
    })
    .optional(),
  text: z.string(),
  /** A short name representing legislative process stages or categories of more detailed actions. Most types condense actions into sets. Some types are used for data processing and do not represent House or Senate legislative process activities.
   * Possible values are "Committee", "Floor", "IntroReferral", "ResolvingDifferences", and "NotUsed".
   */
  type: z.enum(ActionType),
});

/**
* Zod schema for validating entities returned from the `/amendment/{congress}/{amendmentType}/{amendmentNumber}/cosponsors` endpoint.
* @ignore
*/
export const AmendmentCosponsorSchema = z.strictObject({
  /** The unique identifier for the amendment cosponsor, as assigned in the [Biographical Directory of the United States Congress, 1774-Present](https://bioguide.congress.gov/).
   * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov.
   */
  bioguideId: z.string(),
  /** The first name of the amendment cosponsor. */
  firstName: z.string(),
  /** The display name for the amendment cosponsor. */
  fullName: z.string(),
  /** The middle name or initial of the amendment cosponsor. */
  middlename: z.string().optional(),
  /** A designation that the member is an original or additional cosponsor of the amendment.
   * If the member cosponsored the amendment on the date of its submission, then this value will be "True".
   * If the member cosponsored the amendment after its date of submission, then this value will be "False".
   */
  isOriginalCosponsor: z.boolean(),
  /** The last name of the amendment cosponsor. */
  lastName: z.string(),
  /** The party code of the amendment cosponsor.
   * Possible values are "D", "R", "I", "ID", and "L".
   * */
  party: z.enum(PartyCode),
  /** A two-letter abbreviation for the state, territory, or district represented by the amendment cosponsor. */
  state: z.enum(StateCode),
  /** The date the member became a cosponsor of the amendment. */
  sponsorshipDate: z.iso.date(),
  /** The date the cosponsor withdrew their cosponsorship of amendment. */
  sponsorshipWithdrawnDate: z.iso.date().optional(),
  /** A referrer URL to the member item in the API.  */
  url: z.url(),
});

/**
* Zod schema for validating entities returned from the `/amendment/{congress}/{amendmentType}/{amendmentNumber}/amendments` endpoint.
* @ignore
*/
export const AmendmentToAmendmentSchema = z.strictObject({
  /** The congress during which an amendment was submitted or offered. */
  congress: z.number(),
  /** The latest action taken on the amendment */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the amendment. */
    actionDate: z.iso.date(),
    /** The time of the latest action taken on the amendment.
     * Certain actions taken by the House contain this element. */
    actionTime: z.iso.time().optional(),
    /** The text of the latest action taken on the amendment. */
    text: z.string(),
    /** A referrer URL to the amendment item in the API. */
    url: z.url(),
  }),
  /** The assigned amendment number. */
  number: z.string(),
  /** The amendment's description.
   * Only House amendments will have this element populated.
   */
  description: z.string().optional(),
  /** The amendment's purpose.
   * House amendments and proposed Senate amendments may have this element populated. */
  purpose: z.string(),
  /** The type of amendment.
   * Possible values are "HAMDT", "SAMDT", and "SUAMDT". Note that the "SUAMDT" type value is only available for the 97th and 98th Congresses. */
  type: z.enum(AmendmentType),
  /**  */
  url: z.url(),
});

/**
 * Zod schema for validating detailed entity returned from the `/amendment/{congress}/{amendmentType}/{amendmentNumber}/text` endpoint.
 * @ignore
 */
export const AmendmentTextSchema = z.strictObject({
  /** The date of the amendment text. */
  date: z.iso.datetime(),
  /** Amendment text format types */
  formats: z.array(
    z.strictObject({
      /** The format type. For example, "PDF" or "HTML". */
      type: z.string(),
      /** URL for the amendment text version. */
      url: z.url(),
    }),
  ),
  /** The type of the amendment. For example, "Submitted" or "Modified". */
  type: z.enum(AmendmentTextType),
});

/**
 * Congress interface generated from zod AmendmentSummarySchema
 * @inline
 */
export type AmendmentSummary = z.infer<typeof AmendmentSummarySchema>;
/**
 * Congress interface generated from zod AmendmentSchema
 * @inline
 */
export type Amendment = z.infer<typeof AmendmentSchema>;
/**
 * Congress interface generated from zod AmendmentActionSchema
 * @inline
 */
export type AmendmentAction = z.infer<typeof AmendmentActionSchema>;
/**
 * Congress interface generated from zod AmendmentCosponsorSchema
 * @inline
 */
export type AmendmentCosponsor = z.infer<typeof AmendmentCosponsorSchema>;
/**
 * Congress interface generated from zod AmendmentTextSchema
 * @inline
 */
export type AmendmentText = z.infer<typeof AmendmentTextSchema>;
/**
 * Congress interface generated from zod AmendmentToAmendmentSchema
 * @inline
 */
export type AmendmentToAmendment = z.infer<typeof AmendmentToAmendmentSchema>;
