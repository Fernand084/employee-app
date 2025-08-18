import type { Employee } from "./EmployeeModel";
import type { Pageable } from "./PageableModel";
import type { Sort } from "./SortModel";

export interface ApiResponse {
  content: Employee[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
};