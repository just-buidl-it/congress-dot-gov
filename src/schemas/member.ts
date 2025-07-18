/**
 * @packageDocumentation
 * Schema and interface definitions for data returned from the `congress` endpoints.
 * - /member returns MemberSummary
 * - /member/{bioguideId} returns MemberDetail
 * - /member/{bioguideId}/sponsored-legislation returns SponsoredLegislation
 * - /member/{bioguideId}/cosponsored-legislation returns CoSponsoredLegislation
 * - /member/congress/{congress} returns CongressMember
 * - /member/{stateCode} returns CongressMember
 * - /member/{stateCode}/{district} returns CongressMember
 * - /member/congress/{congress}/{stateCode}/{district} returns CongressMember
 * [Library of Congress XML Documentation](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/MemberEndpoint.md)
 *
 */
import { z } from 'zod/v4';
import {
  MemberType,
  PartyName,
  PartyCode,
  StateCode,
  StateName,
  BillType,
  CongressChamber,
} from './constants';

/**
 * Zod schema for validating entities returned from the following endpoints:
 * - /member
 * - /member/congress/{congress}
 * - /member/{stateCode}
 * - /member/{stateCode}/{district}
 */
export const MemberSummarySchema = z.strictObject({
  /** The unique ID value that originates in the [Biographical Directory of the United States Congress, 1774-Present](https://bioguide.congress.gov/).
   * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov.
   * (e.g., L000174)
   */
  bioguideId: z.string(),
  /** The state represented by the member. (e.g., Vermont) */
  state: z.enum(StateName).optional(),
  /** The political party of the member. (e.g., Democrat)
   * Possible values are "Democratic", "Independent", "Independent Democrat", "Libertarian", or "Republican".
   */
  partyName: z.enum(PartyName),
  /** The member’s current official portrait. */
  depiction: z
    .strictObject({
      /** The source of the image. (e.g. <a href="http://www.senate.gov/artandhistory/history/common/generic/Photo_Collection_of_the_Senate_Historical_Office.htm"> Courtesy U.S.Senate Historical Office </a>) */
      attribution: z.string().optional(),
      /** The member's current portrait on Congress.gov. (e.g.https://www.congress.gov/img/member/l000174_200.jpg) */
      imageUrl: z.url().optional(),
    })
    .optional(),
  /** The Congressional district represented by the member(exclusive to House).The value of zero indicates the state, district or territory has only one member in the House.*/
  district: z.number().nullable().optional(),

  /** The name of the member in last - name - first order. (e.g., Leahy, Patrick J.) */
  name: z.string(),
  /** A member’s terms of service in chronological order. */
  terms: z.strictObject({
    /** Container for the member’s service in an individual Congress. */
    item: z.array(
      z.strictObject({
        /** The chamber the member served in.
         * Possible values are "Senate" and "House of Representatives". (e.g., Senate) */
        chamber: z.string(),
        /** The year in which the member ceased serving in the designated chamber. (e.g., 1990) */
        endYear: z.number().nullable().optional(),
        /** The year in which the member began serving in the designated chamber. (e.g., 1975) */
        startYear: z.number(),
      }),
    ),
  }),
  /** The date of update in Congress.gov. (e.g., 2022-05 - 17T18: 44:02Z) */
  updateDate: z.iso.datetime(),
  /** A referrer URL to the member item in the API. (e.g., https://api.congress.gov/v3/member/L000174) */
  url: z.string(),
});

/**
 * Zod schema for validating entities returned from the `/member/{bioguideId}` detail endpoints.
 */
export const MemberDetailSchema = z.strictObject({
  /** The member’s contact information. */
  addressInformation: z
    .strictObject({
      /** The member’s mailing and physical office address in Washington, D.C.The < officeAddress > element provides the full address for Senate members and only the House office building information for House members. (e.g, 437 Russell Senate Office Building Washington, DC 20510) */
      officeAddress: z.string().optional(),
      /** The city of Washington. (Washington) */
      city: z.literal('Washington'),
      /** The two letter postal abbreviation for the District of Columbia. (DC) */
      district: z.literal('DC'),
      /** The postal zip code for the member’s office in Washington, D.C. (e.g., 20510) */
      zipCode: z.string().optional(),
      /**  The telephone number for the member’s office in Washington, D.C. (e.g., (202) 224 - 4242) */
      phoneNumber: z.string().optional(),
    })
    .optional(),
  /** The unique ID value that originates in the [Biographical Directory of the United States Congress, 1774-Present](https://bioguide.congress.gov/).
   * View a [field values list of Bioguide identifiers](https://www.congress.gov/help/field-values/member-bioguide-ids) for current and former members in Congress.gov.
   * (e.g., L000174)
   */
  bioguideId: z.string(),
  /** Member’s year of birth. (e.g., 1940) */
  birthYear: z.string().optional(),
  /** Member’s year of death. */
  deathYear: z.string().optional(),
  /** Bills and resolutions cosponsored by member. */
  cosponsoredLegislation: z
    .strictObject({
      /** The total number of bills and resolutions cosponsored by the member. (e.g., 7470) */
      count: z.number(),
      /** A referrer URL to the cosponsored - legislation level of the API. [More information](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/MemberEndpoint.md#cosponsored-legislation-level). (e.g., https://api.congress.gov/v3/member/L000174/cosponsored-legislation) */
      url: z.string(),
    })
    .optional(),
  /** Indicator of whether the member is currently serving.
Possible values are "True" or "False". (e.g., True) */
  currentMember: z.boolean().optional(),
  /** The member’s current official portrait. */
  depiction: z
    .strictObject({
      /** The source of the image. (e.g. <a href="http://www.senate.gov/artandhistory/history/common/generic/Photo_Collection_of_the_Senate_Historical_Office.htm"> Courtesy U.S.Senate Historical Office </a>) */
      attribution: z.string().optional(),
      /** The member's current portrait on Congress.gov. (e.g.https://www.congress.gov/img/member/l000174_200.jpg) */
      imageUrl: z.url().optional(),
    })
    .optional(),
  /** The Congressional district represented by the member (exclusive to House). The value of zero indicates the state, district or territory has only one member in the House. */
  district: z.number().optional(),
  /** The member’s name in first - name - first order. (e.g., Patrick J.Leahy) */
  directOrderName: z.string().optional(),
  /** The member’s first name. (e.g., Patrick) */
  firstName: z.string(),
  /** The member’s middle name. (e.g., Joseph) */
  middleName: z.string().optional(),
  /** The honorific title of the member. (e.g., Mr.) */
  honorificName: z.string().optional(),
  /** The member’s name in last - name - first order. (e.g., Leahy, Patrick J.) */
  invertedOrderName: z.string().optional(),
  /** The member’s last name. (e.g., Leahy) */
  lastName: z.string().optional(),
  /** The member’s suffix. */
  suffixName: z.string().optional(),
  /** The member’s nickname. */
  nickName: z.string().optional(),
  /** The leadership positions available on Congress.gov that the member has held during their membership / tenure of service. */
  leadership: z
    .array(
      /** Leadership positions held by the member during a Congress. */
      z.strictObject({
        /** The Congress during which the specified leadership position was held by the member. (e.g., 113) */
        congress: z.number(),
        /** The title of the leadership position held by the member. (e.g., President Pro Tempore) */
        type: z.string(),
        /** Indicator whether the leadership position is currently held by the member.NOTE: This value may change from True to False during a Congress.
Possible values are "True" or "False". (e.g., False) */
        current: z.boolean().optional(),
      }),
    )
    .optional(),
  /** The member’s official website. (e.g., https://www.leahy.senate.gov/) */
  officialUrl: z.string().optional(),
  /** The current political party of the member.Note: This does not currently reflect party changes.
Possible values are "Democratic", "Independent", "Independent Democrat", "Libertarian", and "Republication". (e.g., Democatic) */
  party: z.enum(PartyName).optional(),
  /** Member's party history. */
  partyHistory: z
    .array(
      z.strictObject({
        /** The single letter abbreviation for the political party of the member.
   Possible values are "D", "I", "ID", "L", and "R".  */
        partyAbbreviation: z.enum(PartyCode),
        /** The political party of the member.
   Possible values are "Democratic", "Independent", "Independent Democrat", "Libertarian", and "Republication".  */
        partyName: z.enum(PartyName),
        /** The year in which the member’s association with the political party began. (e.g., 1975) */
        startYear: z.number(),
      }),
    )
    .optional(),
  /** Bills and resolutions sponsored by member. */
  sponsoredLegislation: z
    .strictObject({
      /** The total number of bills and resolutions sponsored by the member. (e.g., 1753) */
      count: z.number(),
      /** A referrer URL to the sponsored - legislation level of the API.Click here for more information about the sponsored - legislation level. (e.g., https://api.congress.gov/v3/member/L000174/sponsored-legislation) */
      url: z.string(),
    })
    .optional(),
  /** The state represented by the member. (e.g., Vermont) */
  state: z.enum(StateName).optional(),
  /**  The member’s service in an individual Congress. */
  terms: z.array(
    z.strictObject({
      /** The chamber in which the member served during that Congress.
Possible values are "House of Representatives" and "Senate". (e.g., Senate) */
      chamber: z.enum(CongressChamber),
      /** The Congress during which the member served.
View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov. Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov. (e.g., 94) */
      congress: z.number(),
      /**  The year in which the member’s service in that Congress ended. (e.g., 1977) */
      endYear: z.number(),
      /**   The membership type.
Possible values are "Representative", "Resident Commissioner", "Delegate", or "Senator". (e.g., Senator) */
      memberType: z.enum(MemberType),
      /** The year in which the member’s service in that Congress began. (e.g., 1975)  */
      startYear: z.number(),
      /** The two - digit postal code abbreviation for the state represented by the member. (e.g., VT) */
      stateCode: z.enum(StateCode),
      /** The name of the state represented by the member. (e.g., Vermont) */
      stateName: z.enum(StateName),
      /** The political party of the member.
   Possible values are "Democratic", "Independent", "Independent Democrat", "Libertarian", and "Republication".  */
      partyName: z.enum(PartyName).optional(),
      /** The single letter abbreviation for the political party of the member.
   Possible values are "D", "I", "ID", "L", and "R".  */
      partyCode: z.enum(PartyCode).optional(),
      /** The Congressional district represented by the member (exclusive to House). The value of zero indicates the state, district or territory has only one member in the House. */
      district: z.number().optional(),
    }),
  ),
  /** The previous names of the member. */
  previousNames: z
    .array(
      z.strictObject({
        /** The honorific title of the member. (e.g., Mr.) */
        honorificName: z.string().optional(),
        /** The member’s first name. (e.g., Patrick) */
        firstName: z.string().optional(),
        /** The member’s middle name. (e.g., Joseph) */
        middleName: z.string().optional(),
        /** The member’s last name. (e.g., Leahy) */
        lastName: z.string().optional(),
        /** The member’s suffix. */
        suffixName: z.string().optional(),
        /**  The member’s name in first - name - first order. (e.g., Patrick J.Leahy) */
        directOrderName: z.string().optional(),
        /**  The member’s name in last - name - first order. (e.g., Leahy, Patrick J.) */
        invertedOrderName: z.string().optional(),
        /** The date that the member's use of the name started. (e.g., 2025-01 - 17T05:00:00Z) */
        startDate: z.iso.datetime().optional(),
        /** The date that the member's use of the name ended. (e.g., 2025-04 - 28T13:04: 16Z) */
        endDate: z.iso.datetime().optional(),
      }),
    )
    .optional(),
  /** The date of update in Congress.gov. (e.g., 2022-05 - 17T18: 44:02Z) */
  updateDate: z.iso.datetime(),
});

/**
 * Zod schema for validating entities returned from the `/member/{bioguideId}/sponsored-legislation` detail endpoints.
 */
export const SponsoredLegislationSchema = z.strictObject({
  /** The Congress during which the member served.
View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov. Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov. (e.g., 94) */
  congress: z.number(),
  /** The date the bill or resolution was introduced. (e.g., 2022-06 - 16) */
  introducedDate: z.string(),
  /** The latest action taken on the bill or resolution. */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. (e.g., 2022-06-16) */
    actionDate: z.iso.date(),
    /** The time of the latest action taken on the bill or resolution. (e.g., 12:00:00) */
    actionTime: z.iso.time().optional(),
    /** The text of the latest action taken on the bill or resolution.  (e.g., Read twice and referred to the Committee on the Judiciary.) */
    text: z.string(),
  }),
  /** The assigned bill or resolution number. (e.g., 4417) */
  number: z.string(),
  /** The policy area term of the bill or resolution. Every bill and resolution is assigned one policy area term.
   * View the [field values list of policy area terms](https://www.congress.gov/help/field-values/policy-area) on Congress.gov.
   * Read more about [policy area terms](https://www.congress.gov/help/legislative-glossary#glossary_policyareaterm) on Congress.gov. */
  policyArea: z.strictObject({
    /** The policy area term assigned to the bill or resolution by CRS. (e.g., Commerce) */
    name: z.string(),
  }),
  /** The display title for the bill or resolution on Congress.gov. (e.g., Patent Trial and Appeal Board Reform Act of 2022) */
  title: z.string(),
  /** The type of bill or resolution.
Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES". */
  type: z.enum(BillType),

  /**  A referrer URL to the bill item in the API. Documentation for the bill endpoint is [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/BillEndpoint.md). (e.g., https://api.congress.gov/v3/bill/117/s/4417) */
  url: z.string(),
});

/**
 * Zod schema for validating entities returned from the `/member/{bioguideId}/cosponsored-legislation` detail endpoints.
 */
export const CoSponsoredLegislationSchema = z.strictObject({
  /** The Congress during which the member served.
View the [field values list of Congresses](https://www.congress.gov/help/field-values/congresses) on Congress.gov. Read more [about Congresses](https://www.congress.gov/help/legislative-glossary#glossary_congress) on Congress.gov. (e.g., 94) */
  congress: z.number(),
  /** The date the bill or resolution was introduced. (e.g., 2022-06 - 16) */
  introducedDate: z.string().optional(),
  /** The latest action taken on the bill or resolution. */
  latestAction: z.strictObject({
    /** The date of the latest action taken on the bill or resolution. (e.g., 2022-06-16) */
    actionDate: z.iso.date(),
    /** The time of the latest action taken on the bill or resolution. (e.g., 12:00:00) */
    actionTime: z.iso.time().optional(),
    /** The text of the latest action taken on the bill or resolution.  (e.g., Read twice and referred to the Committee on the Judiciary.) */
    text: z.string(),
  }),
  /** The assigned bill or resolution number. (e.g., 4417) */
  number: z.string(),
  /** The policy area term of the bill or resolution. Every bill and resolution is assigned one policy area term.
   * View the [field values list of policy area terms](https://www.congress.gov/help/field-values/policy-area) on Congress.gov.
   * Read more about [policy area terms](https://www.congress.gov/help/legislative-glossary#glossary_policyareaterm) on Congress.gov. */
  policyArea: z.strictObject({
    /** The policy area term assigned to the bill or resolution by CRS. (e.g., Commerce) */
    name: z.string(),
  }),
  /** The display title for the bill or resolution on Congress.gov. (e.g., A resolution recognizing the importance of independent living for individuals with disabilities made possible by the Americans with Disabilities Act of 1990 and calling for further action to strengthen home and community living for individuals with disabilities.) */
  title: z.string(),
  /** The type of bill or resolution.
Possible values are "HR", "S", "HJRES", "SJRES", "HCONRES", "SCONRES", "HRES", and "SRES". */
  type: z.enum(BillType),
  /**  A referrer URL to the bill item in the API. Documentation for the bill endpoint is [here](https://github.com/LibraryOfCongress/api.congress.gov/blob/main/Documentation/BillEndpoint.md). (e.g., https://api.congress.gov/v3/bill/117/s/4417) */
  url: z.string(),
});

export type MemberSummary = z.infer<typeof MemberSummarySchema>;
export type MemberDetail = z.infer<typeof MemberDetailSchema>;
export type SponsoredLegislation = z.infer<typeof SponsoredLegislationSchema>;
export type CoSponsoredLegislation = z.infer<typeof CoSponsoredLegislationSchema>;
