import { getBaseUrl } from '..'

export interface GetQuoteParams {
  inputMint: string
  outputMint: string
  amount: string
  slippageBps: string
  restrictIntermediateTokens?: boolean
  asLegacyTransaction?: boolean
  feeAccount?: string
  onlyDirectRoutes?: boolean
  maxAccounts?: string
}

export interface GetQuoteResponse {
  price: string
  estimatedGas: string
}

export async function getQuote(params: GetQuoteParams): Promise<GetQuoteResponse> {
  const endpoint = 'https://lite-api.jup.ag/swap/v1/quote'
  const method = 'GET'

  

  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.statusText}`)
  }

  return response.json() as Promise<GetQuoteResponse>
}
