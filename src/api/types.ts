export interface BasicResp<T> {
  code: number
  data: T
  msg: string
}

export interface DataResp<T> {
  code: number
  total: number
  rows: Array<T>
  msg: string
}

export interface IPageParams {
  pageNum: number
  pageSize: number
}
