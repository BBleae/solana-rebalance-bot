import { createConfig } from './src/config'

export default createConfig({
  walletPrivateKey: '',
  jupiter: {
    isPro: false,
  },
  rpc: {
    url: 'https://api.mainnet-beta.solana.com',
  },
},
)
