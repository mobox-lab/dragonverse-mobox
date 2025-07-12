import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { mainnet } from 'wagmi/chains';
import { useReadContract } from 'wagmi';
import { latestBTCPriceAtom } from '@/atoms/lbp';
import { bigIntToFloat } from '@/entities/bigint';

const EACAggregatorProxyABI = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useBTCLatestAnswer() {
  const setBTCPrice = useSetAtom(latestBTCPriceAtom);
  const { data } = useReadContract({
    address: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    abi: EACAggregatorProxyABI,
    functionName: 'latestAnswer',
    chainId: mainnet.id,
  });

  useEffect(() => {
    if (!data) return;
    setBTCPrice({ value: data, floatValue: bigIntToFloat({ amount: data, decimals: 8 }) });
  }, [data, setBTCPrice]);
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
