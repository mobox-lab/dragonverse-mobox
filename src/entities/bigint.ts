import { formatUnits, parseUnits } from 'viem';

interface BigIntToFloatParams {
  amount: bigint;
  decimals: number;
}

export function bigIntToFloat(params: BigIntToFloatParams): number {
  const { amount, decimals } = params;
  return parseFloat(formatUnits(amount, decimals));
}

export function floatToBigInt(value: number, decimals: number): bigint {
  if (value < 1e-6) {
    return BigInt(Math.round(value * 10 ** decimals));
  } else {
    return parseUnits(`${value}`, decimals);
  }
}
