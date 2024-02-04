import { useEffect, useMemo } from 'react';
import { Address } from 'viem';
import { arbitrum, bsc } from 'wagmi/chains';
import { useQueryClient } from '@tanstack/react-query';
import { useBlockNumber, useReadContracts } from 'wagmi';

const moboxTokenAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const moboxBscContract = {
  address: '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377',
  abi: moboxTokenAbi,
  chainId: bsc.id,
} as const;

const moboxArbContract = {
  address: '0xdA661fa59320B808c5a6d23579fCfEdf1FD3cf36',
  abi: moboxTokenAbi,
  chainId: arbitrum.id,
} as const;

type MoboxBalanceProps = {
  address?: Address;
  watch?: boolean;
};

export function useMoboxBalance({ address, watch }: MoboxBalanceProps) {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch, chainId: bsc.id, query: { enabled: !!watch } });
  const { data, queryKey } = useReadContracts({
    contracts: [
      { ...moboxBscContract, functionName: 'balanceOf', args: address ? [address] : undefined },
      { ...moboxArbContract, functionName: 'balanceOf', args: address ? [address] : undefined },
    ],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (!blockNumber || !watch) return;
    if (blockNumber % 3n === 0n) queryClient.invalidateQueries({ queryKey }).then();
  }, [blockNumber, queryClient, queryKey, watch]);

  return useMemo(() => {
    const bsc = data?.[0].result ?? 0n;
    const arb = data?.[1].result ?? 0n;
    return { data: { bsc, arb } };
  }, [data]);
}
