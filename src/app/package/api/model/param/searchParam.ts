export interface searchParamModel {
    pageNumber: number,
    pageSize: number,
    filters: filterModel[]
}

export interface filterModel {
    field: string,
    operator: string,
    value: string
}