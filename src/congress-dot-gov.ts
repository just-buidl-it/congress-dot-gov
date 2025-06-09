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

export class CongressDotGovClient {
  public readonly amendment: AmendmentClient;
  public readonly bill: BillClient;
  public readonly boundCongressionalRecord: BoundCongressionalRecordClient;
  public readonly committeeMeeting: CommitteeMeetingClient;
  public readonly committeePrint: CommitteePrintClient;
  public readonly committeeReport: CommitteeReportClient;
  public readonly congress: CongressClient;
  public readonly member: MemberClient;
  public readonly committee: CommitteeClient;
  public readonly congressionalRecord: CongressionalRecordClient;
  public readonly crsReport: CRSReportClient;
  public readonly dailyCongressionalRecord: DailyCongressionalRecordClient;
  public readonly hearing: HearingClient;
  public readonly houseCommunication: HouseCommunicationClient;
  public readonly houseRequirement: HouseRequirementClient;
  public readonly houseVote: HouseVoteClient;
  public readonly nomination: NominationClient;
  public readonly senateCommunication: SenateCommunicationClient;
  public readonly summaries: SummariesClient;
  public readonly treaty: TreatyClient;

  constructor({ apiKey }: { apiKey: string }) {
    this.amendment = new AmendmentClient({ apiKey });
    this.boundCongressionalRecord = new BoundCongressionalRecordClient({ apiKey });
    this.committeeMeeting = new CommitteeMeetingClient({ apiKey });
    this.committeePrint = new CommitteePrintClient({ apiKey });
    this.committeeReport = new CommitteeReportClient({ apiKey });
    this.congress = new CongressClient({ apiKey });
    this.bill = new BillClient({ apiKey });
    this.member = new MemberClient({ apiKey });
    this.committee = new CommitteeClient({ apiKey });
    this.congressionalRecord = new CongressionalRecordClient({ apiKey });
    this.crsReport = new CRSReportClient({ apiKey });
    this.dailyCongressionalRecord = new DailyCongressionalRecordClient({ apiKey });
    this.hearing = new HearingClient({ apiKey });
    this.houseCommunication = new HouseCommunicationClient({ apiKey });
    this.houseRequirement = new HouseRequirementClient({ apiKey });
    this.houseVote = new HouseVoteClient({ apiKey });
    this.nomination = new NominationClient({ apiKey });
    this.senateCommunication = new SenateCommunicationClient({ apiKey });
    this.summaries = new SummariesClient({ apiKey });
    this.treaty = new TreatyClient({ apiKey });
  }
}
