import type Decimal from 'decimal.js'

export function LamportsFromSol(sol: Decimal): Decimal {
  return sol.mul('1_000_000_000')
}

export function SolFromLamports(lamports: Decimal): Decimal {
  return lamports.div('1_000_000_000')
}

export function LamportsFromWbtc(wbtc: Decimal): Decimal {
  return wbtc.mul('100_000_000')
}

export function WbtcFromLamports(lamports: Decimal): Decimal {
  return lamports.div('100_000_000')
}

export function LamportsFromJlp(jlp: Decimal): Decimal {
  return jlp.mul('1_000_000')
}

export function JlpFromLamports(lamports: Decimal): Decimal {
  return lamports.div('1_000_000')
}
