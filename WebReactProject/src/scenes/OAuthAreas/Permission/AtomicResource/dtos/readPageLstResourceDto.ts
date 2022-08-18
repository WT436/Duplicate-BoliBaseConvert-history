export interface ReadPageLstResourceDto {
    id: number;
    key: string;
    name: string;
    typesRsc: number;
    description: string;
    isActived: boolean | null;
    createBy: number;
    createByName: number;
    createdOnUtc: string;
    updateBy: number;
    updateByName: number;
    updatedOnUtc: string;
}