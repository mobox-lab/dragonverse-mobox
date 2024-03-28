import { Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';
import { ALLOW_CHAIN } from '@/constants';

export function useTokenBalance({ address, evmAddress }: { address?: Address; evmAddress?: Address } = {}) {
  return useReadContract({
    abi: erc20Abi,
    address,
    chainId: ALLOW_CHAIN,
    functionName: 'balanceOf',
    args: [evmAddress as Address],
  });
}
