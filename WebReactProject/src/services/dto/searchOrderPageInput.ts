import { OrderByListInput } from "./orderByListInput";
export interface SearchOrderPageInput extends OrderByListInput {
    /// <summary>Tên trường tìm kiếm</summary>
    propertySearch: number[]
    /// <summary>Nội dung</summary>
    valuesSearch: String[]
}