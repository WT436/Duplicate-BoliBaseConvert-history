import { PagedListInput } from "./pagedListInput";

export interface OrderByListInput extends  PagedListInput {
    propertyOrder?: number;
    valueOrderBy?: number;
}