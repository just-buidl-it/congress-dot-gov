import {
  BillCommitteeStandardizeSchema,
} from './bill';
import { ActivityName } from './constants';


describe('Bill Schema Tests', () => {

  describe('BillCommitteeStandardizeSchema', () => {
    it('should standardize the bill committee name', async () => {
      const billCommittee = {
        "activities": [
          {
            "date": "2022-02-01T18:27:26Z",
            "name": "Discharged From"
          },
          {
            "date": "2021-05-11T18:05:50Z",
            "name": "Referred To"
          }
        ],
        "chamber": "House",
        "name": "Ways and Means Committee",
        "systemCode": "hswm00",
        "type": "Standing",
        "url": "https://api.congress.gov/v3/committee/house/hswm00?format=json"
      };
      const parsed = BillCommitteeStandardizeSchema.parse(billCommittee)
      expect(parsed.activities[1].name).toBe(ActivityName.REFERRED_TO);
    });
  });
});
