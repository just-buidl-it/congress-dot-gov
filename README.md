# Congress.gov TypeScript SDK

A TypeScript SDK for interacting with the Congress.gov API. The goal this sdk is to provide a normalized typesafe interface for interacting with the Congress.gov api. Where possible effort has been made to standardize the returned data see the (irregularities section)[#] for more details.

Detailed documentation of the schemas can be found on the [Library of Congress github](https://github.com/LibraryOfCongress/api.congress.gov/tree/main/Documentation). Effort has been made to match the published schemas. If any irregularities or failed validations are found please open an issue so it can be fixed.

Available methods can be previewed on the [Swagger docs](https://api.congress.gov/#/);

[SDK Docs](https://just-buidl-it.io/congress-dot-gov/)

## Installation

```bash
yarn install congress-dot-gov
```

## Usage

First, you'll need to obtain an API key from [Congress.gov](https://api.congress.gov/).

The SDK is broken into two parts, clients and schemas. You can instantiate the full sdk or only the clients that you need. Types for all responses are also exported and derived from the schemas. 

The schemas are optional and require the optional `zod` dependency. The schemas are used for validate responses in end to end tests of the SDK. They are useful for detecting any irregularities or typos in the data.

### Full Client

```typescript
import { CongressDotGovClient } from 'congress-dot-gov';

const client = new CongressDotGovClient({
  apiKey: 'YOUR_API_KEY'
});

await client.bill.getBills();

await client.member.getMembers();

```

### Using Individual Clients

```typescript
import { BillClient } from 'congress-dot-gov';

const billClient = new BillClient({
  apiKey: 'YOUR_API_KEY'
});

await billClient.getBills();
```

### Rate Limiting

The Congress.gov API has a rate limit of 5,000 requests per hour. To help handle rate limits, clients accept an optional rate limiter to track and throttle requests automatically.

#### Rate Limiter Interface

```typescript
interface RateLimitInfo {
  limit: number;
  remaining: number;
}

interface RateLimiter {
  waitForNextRequest: () => Promise<void>;
  updateRateLimitInfo: (rateLimitInfo: RateLimitInfo) => void;
}
```

For convenience, the SDK includes an adaptive rate limiter that automatically adjusts delays based on your current rate limit status:

```typescript
import { BillClient } from 'congress-dot-gov';
import { AdaptiveRateLimiter } from 'congress-dot-gov/rate-limiter';

const rateLimiter = new AdaptiveRateLimiter();

const billClient = new BillClient({
  apiKey: 'YOUR_API_KEY',
  rateLimiter: rateLimiter
});

```

#### Custom Rate Limiter

You can also implement your own rate limiter by implementing the `RateLimiter` interface:

```typescript
class CustomRateLimiter implements RateLimiter {
  async waitForNextRequest(): Promise<void> {
    // Custom throttling logic
  }
  
  updateRateLimitInfo(rateLimitInfo: RateLimitInfo): void {
    // Update internal state based on API response headers
  }
}

const billClient = new BillClient({
  apiKey: 'YOUR_API_KEY',
  rateLimiter: new CustomRateLimiter()
});
```

## Schemas and Irregularities
Validation schemas can be imported from the schemas path. You can then assert any responses with these schemas. These schemas are inferred to type the responses from the API and do not transform the returned data.


```typescript
import { BillClient } from 'congress-dot-gov';
import { BillSchema } from 'congress-dot-gov/schemas';


const billClient = new BillClient({
  apiKey: 'YOUR_API_KEY'
});

const response = await billClient.getBills();

BillSchema.parse(response)

```

### Irregularities
There are some known irregularities and probably more unknown irregularities with the returned data. Schemas to standardize returned data according to the documentation are provided 

**Standardization schemas:**
- `BillCommitteeStandardizeSchema` 
- `CongressStandardizeSchema`

**Known Issues:**
- Congress startYear and endYear are returned as strings, where as in other places they are numbers

- The committee report for report number 617 of type HRPT for congress 116 contains a period `H.Rept.` instead of `H.Rept`. 
This returned as is and reflected with an extra entry in the `CommitteeReportType` enum.

- Bill committee name `Referred to` may be returned as `Referred To`.

Responses that aren't properly transformed from xml to JSON or have improper casing are standardized by the client. 

**Known Issues:**
- The Congressional Record endpoint returns an abnormal data shape. The handler for this endpoint uses an adapter to reshape it to the standard response.

- On the Committee client, the response for `getCommitteeBills` renames `committee-bills` to `committeeBills` in the response.

- On the House Communication client, the response for `getCommunication` renames `house-communication` to `houseCommunication` in the response.


## License

MIT 
