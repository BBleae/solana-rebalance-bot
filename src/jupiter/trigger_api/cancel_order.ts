import { getBaseUrl } from '..'

export interface CancelOrderOptions {
  maker: string
  computeUnitPrice: string
  order: string
}

export interface CancelOrdersOptions {
  maker: string
  computeUnitPrice: string
  orders?: string[]
}

export interface CancelOrderResponseSuccess {
  transaction: string
  requestId: string
}

export interface CancelOrdersResponseSuccess {
  transactions: string[]
  requestId: string
}

export interface CancelOrderResponseError {
  error: string
  code: number
}

export type CancelOrderResponse = CancelOrderResponseSuccess | CancelOrderResponseError
export type CancelOrdersResponse = CancelOrdersResponseSuccess | CancelOrderResponseError

export async function cancelOrder(options: CancelOrderOptions): Promise<CancelOrderResponse> {
  const endpoint = `${getBaseUrl()}/cancelOrder`
  const method = 'POST'
  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
  if (!res.ok) {
    try {
      return await res.json() as CancelOrderResponseError
    }
    catch {
      throw new Error(`Failed to cancel order: ${res.status} ${res.statusText}`)
    }
  }
  const data = await res.json()
  return data as CancelOrderResponse
}

export async function cancelOrders(options: CancelOrdersOptions): Promise<CancelOrdersResponse> {
  const endpoint = `${getBaseUrl()}/cancelOrders`
  const method = 'POST'
  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
  if (!res.ok) {
    try {
      return await res.json() as CancelOrderResponseError
    }
    catch {
      throw new Error(`Failed to cancel orders: ${res.status} ${res.statusText}`)
    }
  }
  const data = await res.json()
  return data as CancelOrdersResponse
}
