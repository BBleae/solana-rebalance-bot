import { getBaseUrl } from ".."

export interface CreateOrderOptionsParams {
  makingAmount: string
  takingAmount: string
  slippageBps?: string
  expiredAt?: string
  feeBps?: string
}

export interface CreateOrderOptions {
  inputMint: string
  outputMint: string
  maker: string
  payer: string
  params: CreateOrderOptionsParams
  computeUnitPrice: string
  feeAccount?: string
  wrapAndUnwrapSol?: boolean
}

export interface CreateOrderResponseSuccess {
  order: string
  transaction: string
  requestId: string
}

export interface CreateOrderResponseError {
  error: string
  cause?: string
  code: number
}

export type CreateOrderResponse = CreateOrderResponseSuccess | CreateOrderResponseError

export async function CreateOrder(options: CreateOrderOptions): Promise<CreateOrderResponse> {
  const endpoint = `${getBaseUrl()}/createOrder`
  const method = 'POST'

  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
  if (!res.ok) {
    // Try parse error body
    try {
      return await res.json() as CreateOrderResponseError
    }
    catch {
      throw new Error(`Failed to create order: ${res.status} ${res.statusText}`)
    }
  }
  const data = await res.json()
  return data as CreateOrderResponse
}
