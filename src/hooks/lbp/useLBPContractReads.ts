import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useReadContracts } from 'wagmi';
import { Address, erc20Abi } from 'viem';
import { ALLOW_CHAINS } from '@/constants';
import {
  assetsBalanceAtom,
  isAbleToClaimAtom,
  mbtcAllowanceAtom,
  poolInitialAtom,
  receiveShareAtom,
  shareBalanceAtom,
} from '@/atoms/lbp';
import { useMainAccount } from '@/hooks/wallet';
import { bigIntToFloat } from '@/entities/bigint';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useBTCLatestAnswer } from '@/hooks/lbp/useBTCLatestAnswer';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';

export default function useLBPContractReads() {
  const [chainId] = ALLOW_CHAINS;
  const { lbp, mbtc } = CONTRACT_ADDRESSES;
  const setPoolInitial = useSetAtom(poolInitialAtom);
  const setAssetsBalance = useSetAtom(assetsBalanceAtom);
  const setShareBalance = useSetAtom(shareBalanceAtom);
  const setReceiveShare = useSetAtom(receiveShareAtom);

  const setMBTCAllowance = useSetAtom(mbtcAllowanceAtom);
  const setIsAbleToClaim = useSetAtom(isAbleToClaimAtom);

  const { evmAddress } = useMainAccount();
  useBTCLatestAnswer();

  const { data: lbpData } = useReadContracts({
    contracts: [
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'args', chainId },
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'redeemOpen', chainId },
    ],
    query: { refetchInterval: 6_000 },
  });

  const { data: tokenData } = useReadContracts({
    contracts: [
      {
        chainId,
        address: mbtc,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: lbp,
        abi: LiquidityBootstrapPoolABI,
        functionName: 'purchasedShares',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: mbtc,
        abi: erc20Abi,
        functionName: 'allowance',
        args: evmAddress ? [evmAddress as Address, lbp] : undefined,
      },
      {
        chainId,
        address: lbp,
        abi: LiquidityBootstrapPoolABI,
        functionName: 'receivedShares',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
    ],
    query: { refetchInterval: 6_000, enabled: !!evmAddress },
  });

  // pool init
  useEffect(() => {
    if (lbpData?.[0].result === undefined) return;
    const pool = { ...lbpData[0].result, assetDecimals: 18, shareDecimals: 18, address: lbp, swapFee: 0n, chainId };
    setPoolInitial(pool);
  }, [chainId, lbpData, lbp, setPoolInitial]);

  // is able to claim
  useEffect(() => {
    if (lbpData?.[1].result === undefined) return;
    setIsAbleToClaim(lbpData[1].result);
  }, [lbpData, setIsAbleToClaim]);

  // assets balance
  useEffect(() => {
    if (tokenData?.[0].result === undefined) return;
    const value = tokenData[0].result;
    const floatValue = bigIntToFloat({ amount: value, decimals: 18 });
    setAssetsBalance({ value, floatValue });
  }, [tokenData, setAssetsBalance]);

  // share balance
  useEffect(() => {
    if (tokenData?.[1].result === undefined) return;
    const value = tokenData[1].result;
    const floatValue = bigIntToFloat({ amount: value, decimals: 18 });
    setShareBalance({ value, floatValue });
  }, [tokenData, setShareBalance]);

  //receive share
  useEffect(() => {
    if (tokenData?.[3].result === undefined) return;
    const value = tokenData[3].result;
    const floatValue = bigIntToFloat({ amount: value, decimals: 18 });
    setReceiveShare({ value, floatValue });
  }, [tokenData, setReceiveShare]);

  // MBTC allowance
  useEffect(() => {
    if (tokenData?.[2].result === undefined) return;
    const value = tokenData[2].result;
    const floatValue = bigIntToFloat({ amount: value, decimals: 18 });
    setMBTCAllowance({ value, floatValue });
  }, [setMBTCAllowance, tokenData]);
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: docs: 📝 add performance optimization tips
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const docs____add_performance_optimization_tips: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
