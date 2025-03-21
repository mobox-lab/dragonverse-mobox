import { ALLOW_CHAINS } from '@/constants';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';

export function useMDBLShares() {
  const [chainId] = ALLOW_CHAINS;
  const { lbp } = CONTRACT_ADDRESSES;
  const { address } = useAccount();

  return useReadContract({
    chainId,
    abi: LiquidityBootstrapPoolABI,
    address: lbp,
    functionName: 'purchasedShares',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}
