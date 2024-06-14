import { RewardABI } from '@/abis/Reward';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { getProofByAddress } from '@/utils/reward';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';

export function useIsClaimed(address?: Address) {
  const data = getProofByAddress(address);
  return useReadContract({
    abi: RewardABI,
    address: CONTRACT_ADDRESSES.reward,
    chainId: ALLOW_CHAINS[0],
    functionName: 'isClaimed',
    args: [data.value?.[0]],
    query: { refetchInterval: 6_000, enabled: !!data.value?.[0] },
  });
}
