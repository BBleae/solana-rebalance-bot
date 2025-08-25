import {
  Connection,
} from '@solana/web3.js'
import { getConfig } from '../config'

export const rpcConn = new Connection(getConfig().rpc.url)

export const wsConn = new Connection(getConfig().rpc.ws)
