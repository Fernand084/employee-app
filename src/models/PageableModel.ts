import type { Sort } from "./SortModel";

export interface Pageable extends Sort{
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  first: boolean;
  empty: boolean;
  offset: number;
};