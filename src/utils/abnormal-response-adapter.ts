import {
  AbnormalPaginatedResponse,
  PaginatedResponse,
  CongressionalRecordFilterParams,
} from '../types';
import type {
  CongressionalRecord,
  CapitalizedCongressionalRecord,
} from '../schemas/congressional-record';

const lowerCaseFirstLetter = (str: string) => {
  if (str === 'PDF') return 'pdf';
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveLowerCase = <T extends Record<string, any>, U extends Record<string, any>>(
  obj: T,
): U => {
  if (Array.isArray(obj)) {
    return obj.map((item) => recursiveLowerCase(item)) as unknown as U;
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [lowerCaseFirstLetter(key)]: recursiveLowerCase(obj[key]),
      }),
      {} as U,
    );
  }
  return obj as U;
};

const adaptAbnormalResponseAdapter = (
  response: AbnormalPaginatedResponse<CapitalizedCongressionalRecord>,
  params: CongressionalRecordFilterParams,
  baseUrl: string,
): PaginatedResponse<{ issues: CongressionalRecord[] }> => {
  const url = new URL(baseUrl);
  // Set the offset and limit to the values from the response
  params.offset = response.Results.IndexStart + response.Results.SetSize;
  params.limit = response.Results.SetSize;
  url.search = new URLSearchParams(params as Record<string, string>).toString();
  return {
    issues: recursiveLowerCase(response.Results.Issues),
    pagination: {
      count: response.Results.TotalCount,
      next: url.toString(),
    },
    request: {
      contentType: 'application/json',
      format: 'json',
    },
  };
};

export default adaptAbnormalResponseAdapter;
