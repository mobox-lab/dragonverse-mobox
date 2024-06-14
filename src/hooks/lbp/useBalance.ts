import { Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';
import { ALLOW_CHAINS } from '@/constants';

export function useTokenBalance({ address, evmAddress }: { address?: Address; evmAddress?: Address } = {}) {
  return useReadContract({
    abi: erc20Abi,
    address,
    chainId: ALLOW_CHAINS[0],
    functionName: 'balanceOf',
    args: [evmAddress as Address],
  });
}
