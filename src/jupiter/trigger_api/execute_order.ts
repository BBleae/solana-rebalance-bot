import { getBaseUrl } from ".."

export interface ExecuteOrderOptions {
  signedTransaction: string
  requestId: string
}

export interface ExecuteOrderResponseSuccess {
  signature: string
  status: 'Success'
}

export interface ExecuteOrderResponseError {
  error: string
  code: number
  signature?: string
  status?: 'Failed'
}

export type ExecuteOrderResponse = ExecuteOrderResponseSuccess | ExecuteOrderResponseError

export async function ExecuteOrder(options: ExecuteOrderOptions): Promise<ExecuteOrderResponse> {
  // Docs say endpoint is /execute
  const endpoint = `${getBaseUrl()}/execute`
  const method = 'POST'

  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
  if (!res.ok) {
    try {
      return await res.json() as ExecuteOrderResponseError
    }
    catch {
      throw new Error(`Failed to execute order: ${res.status} ${res.statusText}`)
    }
  }
  const data = await res.json()
  return data as ExecuteOrderResponse
}
