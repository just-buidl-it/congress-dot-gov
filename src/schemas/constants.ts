export enum HouseAmendmentType {
  HAMDT = 'HAMDT',
}

export enum SenateAmendmentType {
  SAMDT = 'SAMDT',
  SUAMDT = 'SUAMDT', // 97th and 98th Congresses
}

export enum AmendmentType {
  HAMDT = 'HAMDT',
  SAMDT = 'SAMDT',
  SUAMDT = 'SUAMDT', // 97th and 98th Congresses
}

export enum CongressChamber {
  HOUSE = 'House of Representatives',
  SENATE = 'Senate',
}

export enum Chamber {
  HOUSE = 'House',
  SENATE = 'Senate',
  JOINT = 'Joint',
  NO_CHAMBER = 'NoChamber',
}

export enum Session {
  REGULAR = 'R',
  SPECIAL = 'S',
}

export enum ChamberCode {
  HOUSE = 'H',
  SENATE = 'S',
}

export enum HouseBillType {
  HR = 'HR',
  HJRES = 'HJRES',
  HCONRES = 'HCONRES',
  HRES = 'HRES',
}

export enum SenateBillType {
  S = 'S',
  SJRES = 'SJRES',
  SCONRES = 'SCONRES',
  SRES = 'SRES',
}

export enum BillType {
  S = 'S',
  SJRES = 'SJRES',
  SCONRES = 'SCONRES',
  SRES = 'SRES',
  HR = 'HR',
  HJRES = 'HJRES',
  HCONRES = 'HCONRES',
  HRES = 'HRES',
}

export enum LawType {
  PUBLIC = 'pub',
  PRIVATE = 'priv',
}

export enum MemberType {
  REPRESENTATIVE = 'Representative',
  RESIDENT_COMMISSIONER = 'Resident Commissioner',
  DELEGATE = 'Delegate',
  SENATOR = 'Senator',
}

export enum PartyName {
  DEMOCRATIC = 'Democratic',
  INDEPENDENT = 'Independent',
  INDEPENDENT_DEMOCRAT = 'Independent Democrat',
  LIBERTARIAN = 'Libertarian',
  REPUBLICAN = 'Republican',
}

export enum PartyCode {
  DEMOCRATIC = 'D',
  INDEPENDENT = 'I',
  INDEPENDENT_DEMOCRAT = 'ID',
  LIBERTARIAN = 'L',
  REPUBLICAN = 'R',
}

export enum OnBehalfOfSponsorAction {
  SUBMITTED_ON_BEHALF_OF = 'Submitted on behalf of',
  PROPOSED_ON_BEHALF_OF = 'Proposed on behalf of',
}

export enum VoteType {
  RECORDED_VOTE_2_3 = '2/3 Recorded Vote',
  YEA_AND_NAY_2_3 = '2/3 Yea-And-Nay',
  RECORDED_VOTE_3_5 = '3/5 Recorded Vote',
  YEA_AND_NAY_3_5 = '3/5 Yea-And-Nay',
  QUORUM = 'Quorum',
  RECORDED_VOTE = 'Recorded Vote',
  YEA_AND_NAY = 'Yea-and-Nay',
}

export enum VoteResult {
  PASSED = 'Passed',
  FAILED = 'Failed',
  AGREED_TO = 'Agreed to',
}

export enum VoteQuestion {
  ON_AGREEING_TO_AMENDMENT = 'On Agreeing to the Amendment',
  ON_AGREEING_TO_RESOLUTION = 'On Agreeing to the Resolution',
  ON_AGREEING_TO_RESOLUTION_AS_AMENDED = 'On Agreeing to the Resolution, as Amended',
  ON_MOTION_TO_RECOMMIT = 'On Motion to Recommit',
  ON_MOTION_TO_RECONSIDER = 'On Motion to Reconsider',
  ON_MOTION_TO_SUSPEND_RULES_AND_AGREE = 'On Motion to Suspend the Rules and Agree',
  ON_MOTION_TO_SUSPEND_RULES_AND_AGREE_AS_AMENDED = 'On Motion to Suspend the Rules and Agree, as Amended',
  ON_MOTION_TO_SUSPEND_RULES_AND_CONCUR_IN_THE_SENATE_AMENDMENT = 'On Motion to Suspend the Rules and Concur in the Senate Amendment',
  ON_MOTION_TO_SUSPEND_RULES_AND_PASS = 'On Motion to Suspend the Rules and Pass',
  ON_MOTION_TO_SUSPEND_RULES_AND_PASS_AS_AMENDED = 'On Motion to Suspend the Rules and Pass, as Amended',
  ON_MOTION_TO_TABLE = 'On Motion to Table',
  ON_ORDERING_THE_PREVIOUS_QUESTION = 'On Ordering the Previous Question',
  ON_PASSAGE = 'On Passage',
}

export enum CommitteeType {
  COMMISSION_OR_CAUCUS = 'Commission or Caucus',
  JOINT = 'Joint',
  OTHER = 'Other',
  SELECT = 'Select',
  SPECIAL = 'Special',
  STANDING = 'Standing',
  SUBCOMMITTEE = 'Subcommittee',
  TASK_FORCE = 'Task Force',
}

export enum CommitteeReportType {
  HRPT = 'HRPT',
  SRPT = 'SRPT',
  ERPT = 'ERPT',
}

export enum CommitteeReportReportType {
  HRPT = 'S.Rept',
  SRPT = 'H.Rept',
  ERPT = 'Ex.Rept',
  HRPT_DOT = 'H.Rept.', // typo in Committee Report (congress - 116, CommitteeReportType.HRPT, report number - '617')
}

export enum CommitteeReportFormat {
  FORMATTED_TEXT = 'Formatted Text',
  PDF = 'PDF',
  FORMATTED_XML = 'Formatted XML',
  GENERATED_HTML = 'Generated HTML',
}
export enum CommunicationTypeName {
  EXECUTIVE_COMMUNICATION = 'Executive Communication',
  PRESIDENTIAL_MESSAGE = 'Presidential Message',
  PETITION = 'Petition',
  MEMORIAL = 'Memorial',
  PEPETITION_OR_MEMORIAL = 'Petition or Memorial',
}
export enum CommunicationTypeCode {
  EXECUTIVE_COMMUNICATION = 'EC',
  PRESIDENTIAL_MESSAGE = 'PM',
  PETITION = 'PT',
  MEMORIAL = 'ML',
  PEPETITION_OR_MEMORIAL = 'POM',
}

export enum SourceSystemCode {
  SENATE = '0',
  HOUSE_COMMITTEE_ACTIONS = '1',
  HOUSE_FLOOR_ACTIONS = '2',
  LIBRARY_OF_CONGRESS = '9',
}

export enum SourceSystemName {
  SENATE = 'Senate',
  HOUSE_COMMITTEE_ACTIONS = 'House committee actions',
  HOUSE_FLOOR_ACTIONS = 'House floor actions',
  LIBRARY_OF_CONGRESS = 'Library of Congress',
}

export enum StateName {
  ALABAMA = 'Alabama',
  ALASKA = 'Alaska',
  ARIZONA = 'Arizona',
  ARKANSAS = 'Arkansas',
  CALIFORNIA = 'California',
  COLORADO = 'Colorado',
  CONNECTICUT = 'Connecticut',
  DELAWARE = 'Delaware',
  DISTRICT_OF_COLUMBIA = 'District of Columbia',
  FLORIDA = 'Florida',
  GEORGIA = 'Georgia',
  HAWAII = 'Hawaii',
  IDAHO = 'Idaho',
  ILLINOIS = 'Illinois',
  INDIANA = 'Indiana',
  IOWA = 'Iowa',
  KANSAS = 'Kansas',
  KENTUCKY = 'Kentucky',
  LOUISIANA = 'Louisiana',
  MAINE = 'Maine',
  MARYLAND = 'Maryland',
  MASSACHUSETTS = 'Massachusetts',
  MICHIGAN = 'Michigan',
  MINNESOTA = 'Minnesota',
  MISSISSIPPI = 'Mississippi',
  MISSOURI = 'Missouri',
  MONTANA = 'Montana',
  NEBRASKA = 'Nebraska',
  NEVADA = 'Nevada',
  NEW_HAMPSHIRE = 'New Hampshire',
  NEW_JERSEY = 'New Jersey',
  NEW_MEXICO = 'New Mexico',
  NEW_YORK = 'New York',
  NORTH_CAROLINA = 'North Carolina',
  NORTH_DAKOTA = 'North Dakota',
  OHIO = 'Ohio',
  OKLAHOMA = 'Oklahoma',
  OREGON = 'Oregon',
  PENNSYLVANIA = 'Pennsylvania',
  RHODE_ISLAND = 'Rhode Island',
  SOUTH_CAROLINA = 'South Carolina',
  SOUTH_DAKOTA = 'South Dakota',
  TENNESSEE = 'Tennessee',
  TEXAS = 'Texas',
  UTAH = 'Utah',
  VERMONT = 'Vermont',
  VIRGINIA = 'Virginia',
  WASHINGTON = 'Washington',
  WEST_VIRGINIA = 'West Virginia',
  WISCONSIN = 'Wisconsin',
  WYOMING = 'Wyoming',
}

export enum StateCode {
  ALABAMA = 'AL',
  ALASKA = 'AK',
  ARIZONA = 'AZ',
  ARKANSAS = 'AR',
  CALIFORNIA = 'CA',
  COLORADO = 'CO',
  CONNECTICUT = 'CT',
  DELAWARE = 'DE',
  DISTRICT_OF_COLUMBIA = 'DC',
  FLORIDA = 'FL',
  GEORGIA = 'GA',
  HAWAII = 'HI',
  IDAHO = 'ID',
  ILLINOIS = 'IL',
  INDIANA = 'IN',
  IOWA = 'IA',
  KANSAS = 'KS',
  KENTUCKY = 'KY',
  LOUISIANA = 'LA',
  MAINE = 'ME',
  MARYLAND = 'MD',
  MASSACHUSETTS = 'MA',
  MICHIGAN = 'MI',
  MINNESOTA = 'MN',
  MISSISSIPPI = 'MS',
  MISSOURI = 'MO',
  MONTANA = 'MT',
  NEBRASKA = 'NE',
  NEVADA = 'NV',
  NEW_HAMPSHIRE = 'NH',
  NEW_JERSEY = 'NJ',
  NEW_MEXICO = 'NM',
  NEW_YORK = 'NY',
  NORTH_CAROLINA = 'NC',
  NORTH_DAKOTA = 'ND',
  OHIO = 'OH',
  OKLAHOMA = 'OK',
  OREGON = 'OR',
  PENNSYLVANIA = 'PA',
  RHODE_ISLAND = 'RI',
  SOUTH_CAROLINA = 'SC',
  SOUTH_DAKOTA = 'SD',
  TENNESSEE = 'TN',
  TEXAS = 'TX',
  UTAH = 'UT',
  VERMONT = 'VT',
  VIRGINIA = 'VA',
  WASHINGTON = 'WA',
  WEST_VIRGINIA = 'WV',
  WISCONSIN = 'WI',
  WYOMING = 'WY',
}
