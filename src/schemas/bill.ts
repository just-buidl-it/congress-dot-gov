/**
 * @packageDocumentation
 * Schema and interface definitions for data returned from the `bill` and `law` endpoints.
 * - /bill returns BillSummary
 * - /bill/{congress} returns BillSummary
 * - /bill/{congress}/{billType} returns BillSummary
 * - /bill/{congress}/{billType}/{billNumber} returns Bill
 * - /bill/{congress}/{billType}/{billNumber}/actions returns BillAction
 * - /bill/{congress}/{billType}/{billNumber}/amendments returns BillAmendment
 * - /bill/{congress}/{billType}/{billNumber}/committees returns BillCommittee
 * - /bill/{congress}/{billType}/{billNumber}/cosponsors returns BillCosponsor
 * - /bill/{congress}/{billType}/{billNumber}/relatedbills returns RelatedBill
 * - /bill/{congress}/{billType}/{billNumber}/subjects returns BillSubject
 * - /bill/{congress}/{billType}/{billNumber}/summaries returns BillSummaryVersion
 * - /bill/{congress}/{billType}/{billNumber}/text returns BillText
 * - /bill/{congress}/{billType}/{billNumber}/titles returns BillTitle
 * - /law/{congress} returns LawList
 * - /law/{congress}/{lawType} returns LawList
 * - /law/{congress}/{lawType}/{lawNumber} returns Law
 * [Library of Congress XML Documentation](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/BillEndpoint.md)
 *
 */
import { z } from 'zod/v4';
import {
  ActivityName,
  BillType,
  BillActionType,
  Chamber,
  ChamberCode,
  CommitteeType,
  IdentifiedBy,
  StateCode,
  SourceSystemName,
  PartyCode,
  LawType,
  AmendmentType,
} from './constants';

/**
 * Zod schema for validating entities returned from the `/bill`, `/bill/{congress}` and `/bill/{congress}/{billType}` list endpoints.
 */
export const BillSummarySchema = z.strictObject({
  /** The congress during which a bill or resolution was introduced or submitted.
   * View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov.
   * Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov.
   */
  congress: z.number(),
  /** The latest action taken on the bill or resolution */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. */
    actionDate: z.string(),
    /** The time of the latest action taken on the bill or resolution. Certain actions taken by the House contain this element. */
    actionTime: z.string().optional(),
    /** The text of the latest action taken on the bill or resolution. */
    text: z.string(),
  }),
  /**The assigned bill or resolution number. */
  number: z.string(),
  /**The chamber of origin where a bill or resolution was introduced or submitted.
Possible values are "House" and "Senate". */
  originChamber: z.enum(Chamber),
  /** The code for the chamber of origin where the bill or resolution was introduced or submitted.
Possible values are "H" and "S". */
  originChamberCode: z.enum(ChamberCode),
  /** The display title for the bill or resolution on Congress.gov. */
  title: z.string(),
  /** The type of bill or resolution.
Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES". */
  type: z.enum(BillType),
  /** The date of update on Congress.gov. This update date does not include updates to bill text. The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDate: z.string(),
  /** The date of update on Congress.gov, including if the update was to bill text.The is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDateIncludingText: z.string(),
  /** A referrer URL to the bill or resolution item in the API. */
  url: z.url(),
});

const BaseBillSchema = z.strictObject({
  /** Actions on the bill or resolution. */
  actions: z.strictObject({
    /** The number of actions on the bill or resolution. The <count> includes actions from the House, Senate, and Library of Congress. */
    count: z.number(),
    /** A referrer URL to the actions level of the bill API. */
    url: z.url(),
  }),
  /** Committee reports associated with the bill or resolution. */
  committeeReports: z
    .array(
      z.strictObject({
        /** The committee report citation. */
        citation: z.string(),
        /** A referrer URL to the committee report item in the API. */
        url: z.url(),
      }),
    )
    .optional(),
  /** Committees or subcommittees with activity associated with the bill or resolution. */
  committees: z.strictObject({
    /** The number of committees with activity associated with the bill or resolution. */
    count: z.number(),
    /** A referrer URL to the committees level of the bill API. */
    url: z.url(),
  }),
  /** The congress during which a bill or resolution was introduced or submitted.
   * View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov.
   * Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov.
   */
  congress: z.number(),
  /** Text extracted from the Congressional Record to accompany House Bills (HR) and House Joint Resolutions (HJRES) that cites the power granted to Congress by the Constitution to enact the proposed law, as required by Clause 7 of House Rule XII. Read more about constitutional authority statements on the House Rules Committee website. */
  constitutionalAuthorityStatementText: z.string(),
  /** The date the bill or resolution was submitted or introduced. */
  introducedDate: z.string(),
  /** Latest action taken by the House, Senate, or the President on the bill or resolution. */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. */
    actionDate: z.string(),
    /** The time of the latest action taken on the bill or resolution. Certain actions taken by the House contain this element. */
    actionTime: z.string().optional(),
    /** The text of the latest action taken on the bill or resolution. */
    text: z.string(),
  }),
  /** Public or private law data for the bill or joint resolution */
  laws: z
    .array(
      z.strictObject({
        /** The law number, as assigned by the National Archives and Records Administration (NARA). */
        number: z.string(),
        /** The type of law.
        * Possible values are "Public Law" or "Private Law". 
        * */
        type: z.enum(LawType),
      }),
    )
    .optional(),
  /** The assigned bill or resolution number. */
  number: z.string(),
  /** The chamber of origin where a bill or resolution was introduced or submitted.
Possible values are "House" and "Senate". */
  originChamber: z.enum(Chamber),
  /** **Not Documented** */
  originChamberCode: z.enum(ChamberCode),
  /** The policy area term of the bill or resolution. Every bill and resolution is assigned one policy area term out of a controlled field values list available on Congress.gov.
   * Read more about policy area terms on Congress.gov.
   */
  policyArea: z.strictObject({
    /** The policy area term assigned to the bill or resolution by CRS. */
    name: z.string(),
  }),
  /** Related bills to the bill or resolution, as assigned by CRS, the House, and the Senate. */
  relatedBills: z.strictObject({
    /** The number of related bills assigned to the bill or resolution. */
    count: z.number(),
    /** A referrer URL to the related bills level of the bill API.  */
    url: z.url(),
  }),
  /** The sponsor of the bill or resolution. */
  sponsors: z.array(
    z.strictObject({
      /** The unique identifier for the bill or resolution sponsor, as assigned in the Biographical Directory of the United States Congress, 1774-Present.
View a field values list of Bioguide identifiers for current and former members in Congress.gov. */
      bioguideId: z.string(),
      /** The congressional district that the bill or resolution sponsor represents.
Note that this element will be "0" for states, territories, or districts where there is only one congressional district. */
      district: z.number(),
      /** The first name of the bill or resolution sponsor. */
      firstName: z.string(),
      /** The display name of the bill or resolution sponsor. */
      fullName: z.string(),
      /** Flag indicating if the bill or resolution was introduced at the request of the President or another entity.
Possible values are "Y" or "N". */
      isByRequest: z.union([z.literal('Y'), z.literal('N')]),
      /** The last name of the bill or resolution sponsor. */
      lastName: z.string(),
      /** The middle name or initial of the bill or resolution sponsor. */
      middleName: z.string().optional(),
      /** The party code of the bill or resolution sponsor. */
      party: z.enum(PartyCode),
      /** A two-letter abbreviation for the state, territory, or district represented by the bill or resolution sponsor. */
      state: z.enum(StateCode).optional(),
      /** A referrer URL to the member item in the API. */
      url: z.url(),
    }),
  ),
  /** Legislative subject terms assigned to the bill or resolution by CRS. */
  subjects: z.strictObject({
    /** The number of legislative subject terms assigned to the bill or resolution by CRS. */
    count: z.number(),
    /** A referrer URL to the subjects level of the bill API. */
    url: z.url(),
  }),
  /** Bill summaries, written by CRS legislative analysts, on the bill or resolution. */
  summaries: z.strictObject({
    /** The number of bill summaries on the bill or resolution. */
    count: z.number(),
    /** A referrer URL to the summaries level of the bill API. */
    url: z.url(),
  }),
  /** Text versions of the bill or resolution. */
  textVersions: z.strictObject({
    /** The number of texts for the bill or resolution. */
    count: z.number(),
    /** A referrer URL to the text level of the bill API. */
    url: z.url(),
  }),
  /** The display title for the bill or resolution on Congress.gov. */
  title: z.string(),
  /** Titles associated with the bill or resolution. */
  titles: z.strictObject({
    /** The number of titles associated with the bill or resolution. This number may include measure short titles, level short titles, and official titles from the House, Senate, and the Government Publishing Office (GPO). */
    count: z.number(),
    /** A referrer URL to the titles level of the bill API */
    url: z.url(),
  }),
  /** The type of bill or resolution.
Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES". */
  type: z.enum(BillType),
  /** The date of update on Congress.gov. This update date does not include updates to bill text. The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDate: z.string(),
  /** The date of update on Congress.gov, including if the update was to bill text.The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDateIncludingText: z.string(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}` detail endpoint.
 */
export const BillSchema = BaseBillSchema.extend({
  /** Amendments to the bill or resolution. */
  amendments: z.strictObject({
    /** The number of amendments to the bill or resolution. */
    count: z.number(),
    /** A referrer URL to the amendments level of the bill API. */
    url: z.url(),
  }),
  /** Container for Congressional Budget Office (CBO) cost estimates associated with a bill or resolution. Read [about CBO](https://www.congress.gov/help/legislative-glossary#glossary_cbo) on Congress.gov. */
  cboCostEstimates: z.array(
    z.strictObject({
      /** The description of the CBO cost estimate. */
      description: z.string(),
      /**The date the CBO cost estimate was published. */
      pubDate: z.string(),
      /** The title of the CBO cost estimate. */
      title: z.string(),
      /** The URL for the CBO cost estimate on [CBO.gov](https://www.cbo.gov/). */
      url: z.url(),
    }),
  ),
  /** Any cosponsors of the bill or resolution */
  cosponsors: z.strictObject({
    /** The current number of cosponsors of the bill or resolution, not including any withdrawn cosponsors. */
    count: z.number(),
    /** The total number of cosponsors of the bill or resolution, including any withdrawn cosponsors. */
    countIncludingWithdrawnCosponsors: z.number(),
    /** A referrer URL to the cosponsors level of the bill API. */
    url: z.url(),
  }),
  /** notes attached to the bill or resolution on Congress.gov. The note may contain supplemental information about the bill or resolution that users may find helpful. Read more [about notes](https://www.congress.gov/help/legislative-glossary#glossary_notes) on Congress.gov. */
  notes: z.string().optional(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/actions` endpoint.
 */
export const BillActionSchema = z.strictObject({
  /** An action code associated with the action taken on a bill or resolution.
The `actionCode` element will be present only for actions where the `sourceSystem` is 2 (House) or 9 (Library of Congress).
[Action Codes](https://www.congress.gov/help/field-values/action-codes) is an authoritative list of values where the `sourceSystem` is 9 (Library of Congress).
An authoritative list of action codes where the `sourceSystem` is 2 (House) does not exist.
Various code sets are used by multiple systems in the House, Senate, and Library of Congress by legislative clerks and data editors for functions independent of this data set. 
As new codes and systems were developed, there was no coordinated effort to retroactively apply new codes to old records.
 Many codes are concatenated with other codes or elements or utilize free text. 
 Codes in one set may be redundant with a different code in another code set. 
 Additionally, some codes may have been used and re-used over the years for different purposes further complicating the ability to create an authoritative list. 
 View the original code set of [U.S. Congress legislative status steps.](http://www.loc.gov/pictures/resource/ppmsca.33996/)
*/
  actionCode: z.string().optional(),
  /** The date of the action taken on a bill or resolution. (e.g. 2022-03-08) */
  actionDate: z.string(),
  /** The time of the action taken on a bill or resolution. Certain actions taken by the House contain this element. */
  actionTime: z.string().optional(),
  /** Committees associated with the action */
  committees: z
    .array(
      z.strictObject({
        /** The name of the committee or subcommittee associated with the action. */
        name: z.string(),
        /** A code associated with the committee or subcommittee used to match items in Congress.gov with the committee or subcommittee. */
        systemCode: z.string(),
        /** A referrer URL to the committee or subcommittee item in the API. Documentation for the committee endpoint is available [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/CommitteeEndpoint.md). */
        url: z.url(),
      }),
    )
    .optional(),
  /**  recorded (roll call) votes associated with the action. Read more about [roll call votes](https://www.congress.gov/help/legislative-glossary#glossary_rollcallvote) on Congress.gov. 
   * More information can also be found at the [Roll Call Votes by the U.S. Congress](https://www.congress.gov/roll-call-votes) and [Votes in the House and Senate](https://www.congress.gov/help/votes-in-the-house-and-senate) pages on Congress.gov.
  */
  recordedVotes: z
    .array(
      z.strictObject({
        /** The chamber during which the recorded (roll call) vote took place. (e.g. 117) */
        chamber: z.enum(Chamber),
        /** The congress during which the recorded (roll call) vote took place. */
        congress: z.number(),
        /** The date of the recorded (roll call) vote. (e.g. 2022-03-08T22:45:05Z) */
        date: z.string(),
        /** The recorded (roll call) vote number. (e.g. 70) */
        rollNumber: z.number(),
        /** The session of congress during which the recorded (roll call) vote took place. (e.g. 2) */
        sessionNumber: z.union([z.literal(1), z.literal(2)]),
        /** */
        url: z.url(),
      }),
    )
    .optional(),
  /** The source system where the action was entered */
  sourceSystem: z.strictObject({
    /** A code for the source system that entered the action.
Possible values are "0", "1", "2", or "9".
"0" is for Senate, "1" and "2" are for House, and "9" is Library of Congress.
 */
    code: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(9)]).optional(),
    /** The name of the source system that entered the action.
Possible values are "Senate", "House committee actions", "House floor actions", and "Library of Congress".
*/
    name: z.enum(SourceSystemName),
  }),
  /** The text of the action taken on a bill or resolution. */
  text: z.string(),
  /** A short name representing legislative process stages or categories of more detailed actions. Most types condense actions into sets. Some types are used for data processing and do not represent House or Senate legislative process activities.
Possible values are "Committee", "Calendars", "Floor", "BecameLaw", "IntroReferral", "President", "ResolvingDifferences", "Discharge", "NotUsed", and "Veto". */
  type: z.enum(BillActionType),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/amendments` endpoint.
 */
export const BillAmendmentSchema = z.strictObject({
  /** The congress during which a bill or resolution was introduced or submitted.
   * View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov.
   * Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov.
   */
  congress: z.number(),
  /** The amendment's description. Only House amendments will have this element populated. */
  description: z.string(),
  /** The amendment's purpose. House amendments and proposed Senate amendments may have this element populated. */
  purpose: z.string().optional(),
  /** The latest action taken on the bill or resolution. */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. (e.g. 2022-04-06) */
    actionDate: z.string(),
    /** The time of the latest action taken on the bill or resolution. Certain actions taken by the House contain this element. */
    actionTime: z.string().optional(),
    /** The text of the latest action taken on the bill or resolution. (e.g. Became Public Law No: 117-108.) */
    text: z.string(),
  }),
  /** The assigned amendment number. (e.g. 173) */
  number: z.string(),
  /** The type of amendment. (e.g. HAMDT)
   * Possible values are "HAMDT", "SAMDT", and "SUAMDT". Note that the "SUAMDT" type value is only available for the 97th and 98th Congresses.
  */
  type: z.enum(AmendmentType),
  /** The date of update on Congress.gov.  */
  updateDate: z.string(),
  /** A referrer URL to the amendment item in the API. Documentation for the amendment endpoint is available [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/AmendmentEndpoint.md). (e.g. https://api.congress.gov/v3/amendment/117/hamdt/173) */
  url: z.url(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/committees` endpoint.
 */
export const BillCommitteeSchema = z.strictObject({
  /** Committee or subcommittee activities on a bill or resolution. Read more [about committee-related activity](https://www.congress.gov/help/legislative-glossary#glossary_committeerelatedactivity) on Congress.gov. */
  activities: z.array(
    z.strictObject({
      /** The date of the committee or subcommittee activity. (e.g. 2021-05-11T18:05:45Z) */
      date: z.string(),
      /** The name of the committee or subcommittee activity.
       * Possible values are "Referred to", "Re-Referred to", "Hearings by", "Markup by", "Reported by", "Reported original measure", "Committed to", "Re-Committed to", and "Legislative Interest". (e.g. Referred to)
      */
      name: z.enum(ActivityName),
    }),
  ),
  /** The chamber where the committee or subcommittee operates.
   * Possible values are "House", "Senate", or "Joint". (e.g. House)
  */
  chamber: z.enum(Chamber),
  /** The name of the committee associated with the bill or resolution. (e.g. Energy and Commerce Committee) */
  name: z.string(),
  /** Unique ID value for the committee (e.g. hsif00) */
  systemCode: z.string(),
  /** The type or status of the committee or subcommittee.
   * Possible values are "Standing", "Select", "Special", "Joint", "Task Force", "Other", "Subcommittee", or "Commission or Caucus". 
   * (e.g. Standing)
  */
  type: z.enum(CommitteeType),
  /** A referrer URL to the committee or subcommittee item in the committee API.
   *  Documentation for the committee endpoint is available [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/CommitteeEndpoint.md). 
   * (e.g. https://api.congress.gov/v3/committee/house/hsif00)
  */
  url: z.url(),
  /** Subcommittees associated with the bill or resolution. */
  subcommittees: z
    .array(
      z.strictObject({
        /** The name of the subcommittee associated with the bill or resolution. */
        name: z.string(),
        /** Unique ID value for the committee. (e.g. hsif00) */
        systemCode: z.string(),
        /** A referrer URL to the committee or subcommittee item in the committee API.
         *  Documentation for the committee endpoint is available [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/CommitteeEndpoint.md). 
         * (e.g. https://api.congress.gov/v3/committee/house/hsif00)
        */
        url: z.url(),
        /** Committee or subcommittee activities on a bill or resolution. Read more [about committee-related activity](https://www.congress.gov/help/legislative-glossary#glossary_committeerelatedactivity) on Congress.gov. */
        activities: z.array(
          z.strictObject({
            /** The date of the committee or subcommittee activity. (e.g. 2021-05-11T18:05:45Z) */
            date: z.string(),
            /** The name of the committee or subcommittee activity.
             * Possible values are "Referred to", "Re-Referred to", "Hearings by", "Markup by", "Reported by", "Reported original measure", "Committed to", "Re-Committed to", and "Legislative Interest". (e.g. Referred to)
            */
            name: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/cosponsors` endpoint.
 */
export const BillCosponsorSchema = z.strictObject({
  /** The unique identifier for the bill or resolution cosponsor, as assigned in the [Biographical Directory of the United States Congress, 1774-Present](http://bioguide.congress.gov/).
   * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov. (e.g. C001078)
  */
  bioguideId: z.string(),
  /** The congressional district that the bill or resolution cosponsor represents.
Note that this element will be "0" for states, territories, or districts where there is only one congressional district. */
  district: z.number(),
  /** The first name of the bill or resolution cosponsor. (e.g. Gerald) */
  firstName: z.string(),
  /** The display name for the bill or resolution cosponsor. (e.g. Rep. Connolly, Gerald E. [D-VA-11]) */
  fullName: z.string(),
  /** A designation that the member is an original or additional cosponsor of the bill or resolution. 
   * If the member cosponsored the bill or resolution on the date of its introduction or submission, then this value will be "True". If the member cosponsored the bill or resolution after its date of introduction or submission, then this value will be "False".
   * Possible values are "True" or "False" (e.g. True)
  */
  isOriginalCosponsor: z.boolean(),
  /** The last name of the bill or resolution cosponsor. (e.g. Connolly) */
  lastName: z.string(),
  /** The middle name or initial of the bill or resolution cosponsor. (e.g. E.) */
  middleName: z.string().optional(),
  /** The party code of the bill or resolution cosponsor.
   * Possible values are "D", "R", "I", "ID", and "L". (e.g. D)
  */
  party: z.enum(PartyCode),
  /** The date the cosponsor withdrew their cosponsorship of the bill or resolution. */
  sponsorshipDate: z.string(),
  /** A two-letter abbreviation for the state, territory, or district represented by the bill or resolution cosponsor. (e.g. VA) */
  state: z.enum(StateCode).optional(),
  /** A referrer URL to the member item in the API. Documentation for the member endpoint is available [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/MemberEndpoint.md). (e.g. https://api.congress.gov/v3/member/C001078) */
  url: z.url(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/relatedbills` endpoint.
 * Related bills to the bill or resolution, as assigned by CRS, the House, and the Senate. Read [About Related Bills](https://www.congress.gov/help/related-bills) on Congress.gov.
 */
export const RelatedBillSchema = z.strictObject({
  /** The congress during which a bill or resolution was introduced or submitted.
   * View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov.
   * Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov.
   */
  congress: z.number(),
  /** Latest action taken on the bill or resolution. */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. (e.g. 2021-05-19) */
    actionDate: z.string(),
    /** The time of the latest action taken on the bill or resolution. Certain actions taken by the House contain this element. */
    actionTime: z.string().optional(),
    /** The text of the latest action taken on the bill or resolution. (e.g. Read twice and referred to the Committee on Homeland Security and Governmental Affairs.) */
    text: z.string(),
  }),
  /** The assigned bill or resolution number for the related bill. (e.g. 1720) */
  number: z.number(),
  /** The details on the type of relationship added by the House, Senate, or CRS */
  relationshipDetails: z.array(
    z.strictObject({
      /** The entity responsible for identifying the relationship.
      * Possible values are "House", "Senate", and "CRS". 
      */
      identifiedBy: z.enum(IdentifiedBy),
      /** The type of relationship, as designated by the House, Senate, or CRS. (e.g. Related bill) */
      type: z.string(),
    }),
  ),
  /** The display title for the related bill or resolution on Congress.gov. (e.g. Postal Service Reform Act of 2021) */
  title: z.string(),
  /** The type of related bill or resolution.
   * Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES". 
  */
  type: z.enum(BillType),
  /** A referrer URL to the bill item in the API. (e.g. https://api.congress.gov/v3/bill/117/s/1720) */
  url: z.url(),
});

/**
 * Zod schema for validating entities returned from the `/bill/{congress}/{billType}/{billNumber}/subjects` endpoint.
 * [Legislative subject terms](https://www.congress.gov/help/legislative-glossary#glossary_legislativesubjectterm) and [policy area terms](https://www.congress.gov/help/legislative-glossary#glossary_policyareaterm) attached to a bill or resolution, as assigned by CRS. 
 * Note that subject terms from the [Legislative Indexing Vocabulary](https://www.congress.gov/help/legislative-glossary#glossary_legislativeindexingvocabulary) were applied to bills and resolutions from the 93rd to the 110th Congresses (1973-2008). 
 * Read more [about subject and policy area terms](https://www.congress.gov/help/find-bills-by-subject) on Congress.gov.
 */
export const BillSubjectSchema = z.strictObject({
  /** Legislative subject terms attached to a bill or resolution. */
  legislativeSubjects: z.array(
    z.strictObject({
      /** The name of the legislative subject term attached to a bill or resolution. (e.g. Congressional oversight) */
      name: z.string(),
      /** The date of update on Congress.gov.  */
      updateDate: z.string(),
    }),
  ),
  /** Policy area term attached to a bill or resolution. Each bill or resolution will have only one policy area term taken from [this list of terms](https://www.congress.gov/help/field-values/policy-area) on Congress.gov.
   * Note that prior to the 101st Congress (1989), terms outside of the controlled list may be used as a policy area term for a bill or resolution. 
   * Projects are underway to standardize the terms used during those congresses. 
   * */
  policyArea: z.strictObject({
    /** The name of the policy area term attached to a bill or resolution. */
    name: z.string(),
    /** The update date for the bill subject on Congress.gov. This may be the date the subject was published or re-published. The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date.  */
    updateDate: z.string().optional(),
  }),
});

/** Bill summaries on the bill or resolution.
 * Bill summaries are written by legislative analysts in CRS.
 * Read more [about bill summaries](https://www.congress.gov/help/legislative-glossary#glossary_billsummary) on Congress.gov. Read more about the summaries endpoint [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/SummariesEndpoint.md).
 **/
export const BillSummaryVersionSchema = z.strictObject({
  /** The date of action associated with the bill summary. */
  actionDate: z.string(),
  /** The description of the action associated with the bill summary. */
  actionDesc: z.string(),
  /** The text of the bill summary. */
  text: z.string(),
  /** The update date for the bill summary on Congress.gov. This may be the date the summary was published or re-published. The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDate: z.string(),
  /** The internal code used by CRS to tag its summaries according to the action associated with the summary.
  Click [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/BillEndpoint.md#bill-summary-version-codes-action-descriptions-and-chamber) for a list of codes. Note that the version codes have varied over time. */
  versionCode: z.string(),
});

/** Text versions associated with the bill or resolution. Read more about bill text at [About Legislation Text of the U.S. Congress](https://www.congress.gov/help/legislation-text). */
export const BillTextSchema = z.strictObject({
  /** The date associated with the text version. This date is associated with the date of action, not the printing date. */
  date: z.string().nullable(),
  /** Formats of the text version. */
  formats: z.array(
    z.strictObject({
      /** The type of bill text version format. Possible values are "Formatted Text", "PDF", and "Formatted XML". Note that not all format types are available for all text versions. (e.g. Formatted XML) */
      type: z.string(),
      /** The URL for the text version format in Congress.gov. */
      url: z.url(),
    }),
  ),
  /** The bill text version type. */
  type: z.string(),
});

/** Titles associated with the bill or resolution. A title may be an [official title](https://www.congress.gov/help/legislative-glossary#glossary_officialtitle), a [short title](https://www.congress.gov/help/legislative-glossary#glossary_shorttitle), or a [popular title](https://www.congress.gov/help/legislative-glossary#glossary_populartitle).*/
export const BillTitleSchema = z.strictObject({
  /** The text of the title associated with the bill or resolution. (e.g. Postal service Reform Act of 2022) */
  title: z.string(),
  /** A short description of the type of title associated with the bill or resolution. (e.g. Short Title(s) as Passed House) */
  titleType: z.string(),
  /** The title code for the title type. Please note that Congress.gov is transitioning from a legacy process that involved manual curation to an automated process that associates titles with bill text versions. As a result, certain title types can be duplicated. Please refer to [this list](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/BillEndpoint.md#common-title-type-version-codes-and-descriptions) of common title types. (e.g., 45) */
  titleTypeCode: z.number(),
  /** The update date for the bill title on Congress.gov. This may be the date the title was published or re-published. The `updateDate` is the date of the last update received for the legislative entity . It’s not a date corresponding to the legislative date or legislative action date. */
  updateDate: z.string(),
  /** The file extension code for the bill text version associated with the title. This element will not populate for all titles (e.g. a display title will never have an associated bill text version). (e.g. EH) */
  billTextVersionCode: z.string().optional(),
  /** The name of the bill text version associated with the title. This element is not populated for all titles (e.g. a display title will never have an associated bill text version). (e.g. Engrossed in House) */
  billTextVersionName: z.string().optional(),
  /** The chamber code associated with the title. This element is not populated for all titles (e.g. a display title will never have an associated chamber).
  * Possible values are "H" and "S". (e.g. H) 
  * */
  chamberCode: z.enum(ChamberCode).optional(),
  /** The name of the chamber associated with the title. This element is not populated for all titles (e.g. a display title will never have an associated chamber).
   * Possible values are "House" and "Senate". (e.g. House)
  */
  chamberName: z.enum(Chamber).optional(),
});


export const LawSummarySchema = BillSummarySchema.extend({
  laws: z.array(
    z.strictObject({
      /** The law number assigned by NARA Law numbers can be found for [Public Laws](https://www.congress.gov/public-laws/118th-congress) and for [Private Laws](https://www.congress.gov/private-laws/118th-congress) on Congress.gov. */
      number: z.string(),
      /** The type of law.
      * Possible values are "Public Law" or "Private Law". 
      * */
      type: z.enum(LawType),
    }),
  ),
});

export const LawSchema = BaseBillSchema.extend({
  /** */
  laws: z.array(
    z.strictObject({
      /** The law number assigned by NARA Law numbers can be found for [Public Laws](https://www.congress.gov/public-laws/118th-congress) and for [Private Laws](https://www.congress.gov/private-laws/118th-congress) on Congress.gov. */
      number: z.string(),
      /** The type of law.
      * Possible values are "Public Law" or "Private Law". 
      * */
      type: z.enum(LawType),
    }),
  ),
});

export type BillSummary = z.infer<typeof BillSummarySchema>;
export type Bill = z.infer<typeof BillSchema>;
export type BillAction = z.infer<typeof BillActionSchema>;
export type BillAmendment = z.infer<typeof BillAmendmentSchema>;
export type BillCommittee = z.infer<typeof BillCommitteeSchema>;
export type BillCosponsor = z.infer<typeof BillCosponsorSchema>;
export type RelatedBill = z.infer<typeof RelatedBillSchema>;
export type BillSubject = z.infer<typeof BillSubjectSchema>;
export type BillSummaryVersion = z.infer<typeof BillSummaryVersionSchema>;
export type BillText = z.infer<typeof BillTextSchema>;
export type BillTitle = z.infer<typeof BillTitleSchema>;
export type LawList = z.infer<typeof LawSummarySchema>;
export type Law = z.infer<typeof LawSchema>;
