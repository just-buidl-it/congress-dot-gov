import nock from 'nock';
import fs from 'fs';
import path from 'path';
import { CongressDotGovClient } from '../src/congress-dot-gov';
import { AmendmentType, BillType, Chamber, CommitteeReportType, CommunicationTypeCode, LawType } from '../src/schemas/constants';

const fixturesDir = path.join(__dirname, '..', 'fixtures');
const fixturePath = path.join(fixturesDir, 'dnock.json')

const API_KEY = process.env.CONGRESS_GOV_API_KEY as string;


const main = async () => {
  nock.recorder.rec({
    output_objects: true,
    dont_print: true,
  })
  const client = new CongressDotGovClient({ apiKey: API_KEY })
  await Promise.allSettled([
    // Amendment
    client.amendment.getAmendments({ limit: 5 }),
    client.amendment.getAmendmentsByCongress(117, { limit: 5 }),
    client.amendment.getAmendmentsByCongressAndType(117,
      AmendmentType.SAMDT,
      { limit: 5 }),
    client.amendment.getAmendment(117, AmendmentType.SAMDT, '1'),
    client.amendment.getAmendmentActions(117, AmendmentType.SAMDT, '1'),
    client.amendment.getAmendmentCosponsors(117, AmendmentType.SAMDT, '1'),
    client.amendment.getAmendmentAmendments(117, AmendmentType.SAMDT, '1'),
    client.amendment.getAmendmentText(117, AmendmentType.SAMDT, '1'),
    // Bill
    client.bill.getBills({ limit: 5 }),
    client.bill.getBills({ limit: 5, sort: 'updateDate+desc', fromDateTime: new Date('2024-01-01'), toDateTime: new Date('2024-12-31') }),
    client.bill.getBillsByCongress(117, { limit: 5 }),
    client.bill.getBillsByCongressAndType(117, BillType.HR, { limit: 5 }),
    client.bill.getBill(117, BillType.HR, '1'),
    client.bill.getBillActions(117, BillType.HR, '1'),
    client.bill.getBillAmendments(117, BillType.HR, '1'),
    client.bill.getBillCommittees(117, BillType.HR, '1'),
    client.bill.getBillCosponsors(117, BillType.HR, '1'),
    client.bill.getRelatedBills(117, BillType.HR, '1'),
    client.bill.getBillSubjects(117, BillType.HR, '1'),
    client.bill.getBillSummaries(117, BillType.HR, '1'),
    client.bill.getBillText(117, BillType.HR, '1'),
    client.bill.getBillTitles(117, BillType.HR, '1'),
    client.bill.getLaws(117),
    client.bill.getLawsByType(117, LawType.PUBLIC),
    client.bill.getLaw(117, LawType.PUBLIC, '1'),
    // Bound Congressional Record
    client.boundCongressionalRecord.getRecords({ limit: 5 }),
    client.boundCongressionalRecord.getRecordsByYear('1948', { limit: 5 }),
    client.boundCongressionalRecord.getRecordsByYearAndMonth('1948',
      '05',
      { limit: 5 },),
    client.boundCongressionalRecord.getRecordsByDate('1948',
      '05',
      '19',
      { limit: 5 },),
    // Committee Meeting
    client.committeeMeeting.getMeetings({ limit: 5 }),
    client.committeeMeeting.getMeetingsByCongress(118, { limit: 5 }),
    client.committeeMeeting.getMeetingsByCongressAndChamber(118,
      Chamber.HOUSE,
      { limit: 5 }),
    client.committeeMeeting.getMeeting(118,
      Chamber.HOUSE,
      '115538'),
    // Committee Print
    client.committeePrint.getPrints({ limit: 5 }),
    client.committeePrint.getPrintsByCongress(117, { limit: 5 }),
    client.committeePrint.getPrintsByCongressAndChamber(117,
      Chamber.HOUSE,
      { limit: 5 }),
    client.committeePrint.getPrint(117, Chamber.HOUSE, '1'),
    client.committeePrint.getPrintTexts(117, Chamber.HOUSE, '48144'),
    // Committee Report
    client.committeeReport.getReports({ limit: 5 }),
    client.committeeReport.getReportsByCongress(117, { limit: 5 }),
    client.committeeReport.getReportsByCongressAndChamber(117,
      CommitteeReportType.HRPT,
      { limit: 5 },),
    client.committeeReport.getCommitteeReports(116,
      CommitteeReportType.HRPT,
      '617'),
    client.committeeReport.getReportTexts(116, CommitteeReportType.HRPT, '617'),
    // Committee
    client.committee.getCommittees({ limit: 5 }),
    client.committee.getCommitteesByChamber(Chamber.HOUSE, { limit: 5 }),
    client.committee.getCommitteesByCongress(117, { limit: 5 }),
    client.committee.getCommitteesByCongressAndChamber(117,
      Chamber.HOUSE,
      { limit: 5 }),
    client.committee.getCommittee(Chamber.HOUSE, 'hspw00'),
    client.committee.getCommitteeBills(Chamber.HOUSE, 'hspw00', { limit: 5 }),
    client.committee.getCommitteeReports(Chamber.HOUSE, 'hspw00', {
      limit: 5,
    }),
    client.committee.getCommitteeNominations(Chamber.SENATE,
      'ssas00',
      { limit: 5 },),
    client.committee.getCommitteeHouseCommunications(Chamber.HOUSE,
      'hspw00',
      { limit: 5 },),
    client.committee.getCommitteeSenateCommunications(Chamber.SENATE,
      'ssas00',
      { limit: 5 }),
    // Congress
    client.congress.getCongresses({ limit: 5 }),
    client.congress.getCongress(117),
    client.congress.getCurrentCongress(),
    // Congressional Record
    client.congressionalRecord.getIssues({ limit: 5 }),
    // CRSReport
    client.crsReport.getReports({ limit: 5 }),
    client.crsReport.getReport('R46911'),
    // Daily Congressional Record
    client.dailyCongressionalRecord.getRecords({ limit: 5 }),
    client.dailyCongressionalRecord.getRecordsByVolume(169, { limit: 5 }),
    client.dailyCongressionalRecord.getRecordsByVolumeAndIssue(168, 153),
    client.dailyCongressionalRecord.getArticles(169, 1, { limit: 5 }),
    // Hearing
    client.hearing.getHearings({ limit: 5 }),
    client.hearing.getHearingsByCongress(116, { limit: 5 }),
    client.hearing.getHearingsByCongressAndChamber(118,
      Chamber.HOUSE,
      { limit: 5 }),
    client.hearing.getHearing(116,
      Chamber.HOUSE,
      '41365'),
    // House Communication
    client.houseCommunication.getCommunications({ limit: 5 }),
    client.houseCommunication.getCommunicationsByCongress(117, { limit: 5 }),
    client.houseCommunication.getCommunicationsByCongressAndType(117,
      CommunicationTypeCode.PRESIDENTIAL_MESSAGE,
      { limit: 5 },),
    client.houseCommunication.getCommunication(117,
      CommunicationTypeCode.EXECUTIVE_COMMUNICATION,
      '1',),
    // House Requirement
    client.houseRequirement.getRequirements({ limit: 5 }),
    client.houseRequirement.getRequirement('8070'),
    client.houseRequirement.getMatchingCommunications('8070'),
    // House Vote
    client.houseVote.getHouseRollCallVotes({ limit: 5 }),
    client.houseVote.getHouseRollCallVotesByCongress(117, { limit: 5 }),
    client.houseVote.getHouseRollCallVotesByCongressAndSession(117, 1, { limit: 5 }),
    client.houseVote.getHouseRollCallVote(119, 1, 17),
    client.houseVote.getHouseRollCallVoteMembers(119, 1, 17),
    // Member
    client.member.getMembers({ limit: 5 }),
    client.member.getMember('L000174'),
    client.member.getSponsoredLegislation('L000174', { limit: 5 }),
    client.member.getCosponsoredLegislation('L000174', { limit: 5 }),
    client.member.getMembersByCongress(117, { limit: 5 }),
    client.member.getMembersByState('VT', { limit: 5 }),
    client.member.getMembersByStateAndDistrict('MI', '10', { limit: 5 }),
    client.member.getMembersByCongressStateAndDistrict(118, 'MI', '10', { limit: 5 }),
    // Nomination
    client.nomination.getNominations({ limit: 5 }),
    client.nomination.getNominationsByCongress(117, { limit: 5 }),
    client.nomination.getNomination(117, '1'),
    client.nomination.getNominees(117, '1', '1'),
    client.nomination.getNominationActions(117, '1'),
    client.nomination.getNominationCommittees(117, '1'),
    client.nomination.getNominationHearings(117, '1'),
    // Senate Communication
    client.senateCommunication.getCommunications({ limit: 5 }),
    client.senateCommunication.getCommunicationsByCongress(117, { limit: 5 }),
    client.senateCommunication.getCommunicationsByCongressAndType(117,
      CommunicationTypeCode.PRESIDENTIAL_MESSAGE,
      { limit: 5 },),
    client.senateCommunication.getCommunication(117,
      CommunicationTypeCode.EXECUTIVE_COMMUNICATION,
      '1',),
    // Summaries
    client.summaries.getSummaries({ limit: 5 }),
    client.summaries.getSummariesByCongress(117, { limit: 5 }),
    client.summaries.getSummariesByCongressAndType(117, BillType.HR, { limit: 5 }),
    // Treaty
    client.treaty.getTreaties({ limit: 5 }),
    client.treaty.getTreatiesByCongress(117, { limit: 5 }),
    client.treaty.getTreaty(117, '3'),
    client.treaty.getPartitionedTreaty(114, '13', 'A'),
    client.treaty.getTreatyActions(117, '3'),
    client.treaty.getPartitionedTreatyActions(114, '13', 'A'),
    client.treaty.getTreatyCommittees(116, '3'),
  ])
  const nockCallObjects = nock.recorder.play();
  fs.writeFileSync(fixturePath, JSON.stringify(nockCallObjects, null, 2));
  console.log('Nocks updated');
}

void main()
