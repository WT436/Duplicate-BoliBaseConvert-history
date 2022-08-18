import { PagedFilterAndSortedRequest } from './pagedFilterAndSortedRequest';

export interface EntityDtoString<T = string> extends PagedFilterAndSortedRequest {
    agent: T;
}