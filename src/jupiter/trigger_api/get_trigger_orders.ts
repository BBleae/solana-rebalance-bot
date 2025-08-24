import { getBaseUrl } from '..'

export type TriggerOrderStatus = 'active' | 'history'

export interface GetTriggerOrdersParams {
  user: string
  orderStatus: TriggerOrderStatus
  page?: number
  inputMint?: string
  outputMint?: string
}

export interface GetTriggerOrdersResponse<T = unknown> {
  hasMoreData: boolean
  page: number
  // The exact shape varies; keep generic for now
  data: T[]
}

export async function getTriggerOrders(params: GetTriggerOrdersParams): Promise<GetTriggerOrdersResponse> {
  const url = new URL(`${getBaseUrl()}/getTriggerOrders`)
  url.searchParams.set('user', params.user)
  url.searchParams.set('orderStatus', params.orderStatus)
  if (typeof params.page === 'number')
    url.searchParams.set('page', String(params.page))
  if (params.inputMint)
    url.searchParams.set('inputMint', params.inputMint)
  if (params.outputMint)
    url.searchParams.set('outputMint', params.outputMint)

  const res = await fetch(url, { method: 'GET' })
  if (!res.ok)
    throw new Error(`Failed to get trigger orders: ${res.status} ${res.statusText}`)
  const data = await res.json()
  return data as GetTriggerOrdersResponse
}
