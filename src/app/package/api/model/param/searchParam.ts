export interface searchParamModel {
    pageNumber: number,
    pageSize: number,
    filters: filterModel[],
    sorts:sortModel[]
}

export interface filterModel {
    field: string,
    operator: string,
    value: string
}

export interface sortModel {
    field: string,
    direction: string
}