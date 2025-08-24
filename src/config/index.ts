import logger from '../logger'

export interface CreateConfigParams {
  walletPrivateKey: string
  jupiter?: {
    isPro?: boolean
    apikey?: string
  }
  rpc?: {
    url?: string
  }
}

export function createConfig(params: CreateConfigParams) {
  return {
    walletPrivateKey: params.walletPrivateKey,
    jupiter: {
      isPro: params.jupiter?.isPro ?? false,
    },
    rpc: {
      url: params.rpc?.url ?? 'https://api.mainnet-beta.solana.com',
    },
  }
}

let config: ReturnType<typeof createConfig> | undefined

export async function loadConfig() {
  try {
    const { default: configFromFile } = await import('../../config.ts') as unknown as { default: ReturnType<typeof createConfig> }
    return config = configFromFile
  }
  catch (error) {
    logger.error('Config file not found, please create `config.ts` at project root')
    throw error
  }
}

export function getConfig() {
  if (!config) {
    throw new Error('Config not loaded')
  }
  return config
}
