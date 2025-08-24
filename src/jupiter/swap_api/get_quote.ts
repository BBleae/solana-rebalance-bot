export interface GetQuoteParams {
  inputMint: string
  outputMint: string
  amount: string
  slippage: string
}

export interface GetQuoteResponse {
  price: string
  estimatedGas: string
}


