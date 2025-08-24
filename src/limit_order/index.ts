import type Decimal from 'decimal.js'
import { Buffer } from 'node:buffer'
import { VersionedTransaction } from '@solana/web3.js'
import { JLPMint, WBTCMint } from '../consts'
import { CreateOrder, ExecuteOrder } from '../jupiter/trigger_api'
import logger from '../logger'
import { LamportsFromJlp, LamportsFromWbtc } from '../utils/decimal_convert'
import { getKeyPair } from '../wallet'

export async function submitLimitOrder(inputMint: string, outputMint: string, inputAmountLamports: Decimal, outputAmountLamports: Decimal) {
  const createOrderRes = await CreateOrder({
    inputMint,
    outputMint,
    maker: getKeyPair().publicKey.toBase58(),
    payer: getKeyPair().publicKey.toBase58(),
    computeUnitPrice: 'auto',
    params: {
      makingAmount: inputAmountLamports.floor().toFixed(0),
      takingAmount: outputAmountLamports.ceil().toFixed(0),
    },
  })

  if ('order' in createOrderRes) {
    const transactionBase64 = createOrderRes.transaction
    const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'))
    transaction.sign([getKeyPair()])
    const signedTransaction = Buffer.from(transaction.serialize()).toString('base64')

    const execute = await ExecuteOrder({
      signedTransaction,
      requestId: createOrderRes.requestId,
    })
    logger.info(execute, 'ExecuteOrder')
    return execute
  }
}

export function submitSellJlpBuyWbtcOrder(inputJlpExact: Decimal, priceWbtcPerJlp : Decimal) {
  const inputJlpLamports = LamportsFromJlp(inputJlpExact)
  const outputWbtcExact = inputJlpExact.mul(priceWbtcPerJlp )
  const outWbtcLamports = LamportsFromWbtc(outputWbtcExact)
  return submitLimitOrder(JLPMint, WBTCMint, inputJlpLamports, outWbtcLamports)
}

export function submitSellWbtcBuyJlpOrder(inputWbtcExact: Decimal, priceWbtcPerJlp : Decimal) {
  const inputWbtcLamports = LamportsFromWbtc(inputWbtcExact)
  const outputJlpExact = inputWbtcExact.div(priceWbtcPerJlp )
  const outputAmountLamports = LamportsFromJlp(outputJlpExact)
  return submitLimitOrder(WBTCMint, JLPMint, inputWbtcLamports, outputAmountLamports)
}
