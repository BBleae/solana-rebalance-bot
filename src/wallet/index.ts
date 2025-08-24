import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { getConfig } from '../config'

export function getKeyPair() {
  return Keypair.fromSecretKey(bs58.decode(getConfig().walletPrivateKey))
}

export async function getWbtcBalance() {
  // const keypair = getKeyPair()
  // Logic to get WBTC balance using the keypair
}

export async function getSolBalance() {

}

export async function getJlpBalance() {

}
