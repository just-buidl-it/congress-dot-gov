export enum Format {
  XML = 'xml',
  JSON = 'json',
}

/**
 * Base parameters for all endpoints.
 * @inline
 */
export interface BaseParams {
  // The data format. Value can be xml or json.
  format?: Format;
}

/**
 * Pagination parameters for all endpoints.
 * @inline
 */
export interface PaginationParams extends BaseParams {
  // The starting record returned. 0 is the first record.
  offset?: number;
  // The number of records returned. The maximum limit is 250.
  limit?: number;
}

export interface DateFilterParams {
  // The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.
  fromDateTime?: string;
  // The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.
  toDateTime?: string;
}

export interface SortParams {
  // The field to sort by.
  sort?: string;
}

export interface BasePaginatedResponse {
  pagination: {
    count: number;
    next: string;
  };
  request: { contentType: 'application/json'; format: 'json' };
}

export interface AbnormalPaginatedResponse<T> {
  Results: {
    IndexStart: number;
    Issues: T[];
    SetSize: number;
    TotalCount: number;
  };
}

export interface CongressionalRecordFilterParams extends PaginationParams {
  // The year the issue was published. For example, the value can be 2022.
  y?: number;
  // The month the issue was published. For example, the value can be 6.
  m?: number;
  // The day the issue was published. For example, the value can be 28.
  d?: number;
}

export type PaginatedResponse<T> = BasePaginatedResponse & T;
