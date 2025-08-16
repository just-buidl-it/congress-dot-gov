import { AmendmentClient } from './clients/amendment';
import { BillClient } from './clients/bill';
import { BoundCongressionalRecordClient } from './clients/bound-congressional-record';
import { CommitteeMeetingClient } from './clients/committee-meeting';
import { CommitteePrintClient } from './clients/committee-print';
import { CommitteeReportClient } from './clients/committee-report';
import { CommitteeClient } from './clients/committee';
import { CongressClient } from './clients/congress';
import { CongressionalRecordClient } from './clients/congressional-record';
import { CRSReportClient } from './clients/crsreport';
import { DailyCongressionalRecordClient } from './clients/daily-congressional-record';
import { HearingClient } from './clients/hearing';
import { HouseCommunicationClient } from './clients/house-communication';
import { HouseRequirementClient } from './clients/house-requirements';
import { HouseVoteClient } from './clients/house-vote';
import { MemberClient } from './clients/member';
import { NominationClient } from './clients/nomination';
import { SenateCommunicationClient } from './clients/senate-communication';
import { SummariesClient } from './clients/summaries';
import { TreatyClient } from './clients/treaty';
import { type CongressGovConfig } from './clients/base';

interface ClientMap {
  amendment: AmendmentClient;
  bills: BillClient;
  boundCongressionalRecord: BoundCongressionalRecordClient;
  committeeMeeting: CommitteeMeetingClient;
  committeePrint: CommitteePrintClient;
  committeeReport: CommitteeReportClient;
  committee: CommitteeClient;
  congress: CongressClient;
  congressionalRecord: CongressionalRecordClient;
  crsReport: CRSReportClient;
  dailyCongressionalRecord: DailyCongressionalRecordClient;
  hearing: HearingClient;
  houseCommunication: HouseCommunicationClient;
  houseRequirement: HouseRequirementClient;
  houseVote: HouseVoteClient;
  member: MemberClient;
  nomination: NominationClient;
  senateCommunication: SenateCommunicationClient;
  summaries: SummariesClient;
  treaty: TreatyClient;
}

export class CongressDotGovClient {
  private config: Omit<CongressGovConfig, 'endpoint'>;
  private clients: Partial<ClientMap> = {};

  constructor(config: Omit<CongressGovConfig, 'endpoint'>) {
    this.config = config;
  }

  /**
   * Amendment client for accessing amendment data
   */
  get amendment(): AmendmentClient {
    if (!this.clients.amendment) {
      this.clients.amendment = new AmendmentClient(this.config);
    }
    return this.clients.amendment;
  }

  /**
   * Bills client for accessing bill data
   */
  get bills(): BillClient {
    if (!this.clients.bills) {
      this.clients.bills = new BillClient(this.config);
    }
    return this.clients.bills;
  }

  /**
   * Bound Congressional Record client for accessing bound congressional record data
   */
  get boundCongressionalRecord(): BoundCongressionalRecordClient {
    if (!this.clients.boundCongressionalRecord) {
      this.clients.boundCongressionalRecord = new BoundCongressionalRecordClient(this.config);
    }
    return this.clients.boundCongressionalRecord;
  }

  /**
   * Committee Meeting client for accessing committee meeting data
   */
  get committeeMeeting(): CommitteeMeetingClient {
    if (!this.clients.committeeMeeting) {
      this.clients.committeeMeeting = new CommitteeMeetingClient(this.config);
    }
    return this.clients.committeeMeeting;
  }

  /**
   * Committee Print client for accessing committee print data
   */
  get committeePrint(): CommitteePrintClient {
    if (!this.clients.committeePrint) {
      this.clients.committeePrint = new CommitteePrintClient(this.config);
    }
    return this.clients.committeePrint;
  }

  /**
   * Committee Report client for accessing committee report data
   */
  get committeeReport(): CommitteeReportClient {
    if (!this.clients.committeeReport) {
      this.clients.committeeReport = new CommitteeReportClient(this.config);
    }
    return this.clients.committeeReport;
  }

  /**
   * Committee client for accessing committee data
   */
  get committee(): CommitteeClient {
    if (!this.clients.committee) {
      this.clients.committee = new CommitteeClient(this.config);
    }
    return this.clients.committee;
  }

  /**
   * Congress client for accessing congress data
   */
  get congress(): CongressClient {
    if (!this.clients.congress) {
      this.clients.congress = new CongressClient(this.config);
    }
    return this.clients.congress;
  }

  /**
   * Congressional Record client for accessing congressional record data
   */
  get congressionalRecord(): CongressionalRecordClient {
    if (!this.clients.congressionalRecord) {
      this.clients.congressionalRecord = new CongressionalRecordClient(this.config);
    }
    return this.clients.congressionalRecord;
  }

  /**
   * CRS Report client for accessing CRS report data
   */
  get crsReport(): CRSReportClient {
    if (!this.clients.crsReport) {
      this.clients.crsReport = new CRSReportClient(this.config);
    }
    return this.clients.crsReport;
  }

  /**
   * Daily Congressional Record client for accessing daily congressional record data
   */
  get dailyCongressionalRecord(): DailyCongressionalRecordClient {
    if (!this.clients.dailyCongressionalRecord) {
      this.clients.dailyCongressionalRecord = new DailyCongressionalRecordClient(this.config);
    }
    return this.clients.dailyCongressionalRecord;
  }

  /**
   * Hearing client for accessing hearing data
   */
  get hearing(): HearingClient {
    if (!this.clients.hearing) {
      this.clients.hearing = new HearingClient(this.config);
    }
    return this.clients.hearing;
  }

  /**
   * House Communication client for accessing house communication data
   */
  get houseCommunication(): HouseCommunicationClient {
    if (!this.clients.houseCommunication) {
      this.clients.houseCommunication = new HouseCommunicationClient(this.config);
    }
    return this.clients.houseCommunication;
  }

  /**
   * House Requirement client for accessing house requirement data
   */
  get houseRequirement(): HouseRequirementClient {
    if (!this.clients.houseRequirement) {
      this.clients.houseRequirement = new HouseRequirementClient(this.config);
    }
    return this.clients.houseRequirement;
  }

  /**
   * House Vote client for accessing house vote data
   */
  get houseVote(): HouseVoteClient {
    if (!this.clients.houseVote) {
      this.clients.houseVote = new HouseVoteClient(this.config);
    }
    return this.clients.houseVote;
  }

  /**
   * Member client for accessing member data
   */
  get member(): MemberClient {
    if (!this.clients.member) {
      this.clients.member = new MemberClient(this.config);
    }
    return this.clients.member;
  }

  /**
   * Nomination client for accessing nomination data
   */
  get nomination(): NominationClient {
    if (!this.clients.nomination) {
      this.clients.nomination = new NominationClient(this.config);
    }
    return this.clients.nomination;
  }

  /**
   * Senate Communication client for accessing senate communication data
   */
  get senateCommunication(): SenateCommunicationClient {
    if (!this.clients.senateCommunication) {
      this.clients.senateCommunication = new SenateCommunicationClient(this.config);
    }
    return this.clients.senateCommunication;
  }

  /**
   * Summaries client for accessing summaries data
   */
  get summaries(): SummariesClient {
    if (!this.clients.summaries) {
      this.clients.summaries = new SummariesClient(this.config);
    }
    return this.clients.summaries;
  }

  /**
   * Treaty client for accessing treaty data
   */
  get treaty(): TreatyClient {
    if (!this.clients.treaty) {
      this.clients.treaty = new TreatyClient(this.config);
    }
    return this.clients.treaty;
  }
}
