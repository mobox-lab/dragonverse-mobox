import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useReadContracts } from 'wagmi';
import { Address, erc20Abi } from 'viem';
import { ALLOW_CHAIN } from '@/constants';
import {
  assetsBalanceAtom,
  isAbleToClaimAtom,
  isSwapPausedAtom,
  mbtcAllowanceAtom,
  poolInitialAtom,
  receiveShareAtom,
  shareBalanceAtom,
  vestEndAtom,
  weightDataAtom,
} from '@/atoms/lbp';
import { useMainAccount } from '@/hooks/wallet';
import { bigIntToFloat } from '@/entities/bigint';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { Pool } from '@/entities/pool';
import { useBTCLatestAnswer } from '@/hooks/lbp/useBTCLatestAnswer';
import { useLatestMDBLPrice } from '@/hooks/lbp/useLatestMDBLPrice';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';

export default function useLBPContractReads() {
  const chainId = ALLOW_CHAIN;
  const { lbp, mbtc } = CONTRACT_ADDRESSES;
  const setPoolInitial = useSetAtom(poolInitialAtom);
  const setVestEndAtom = useSetAtom(vestEndAtom);
  const setWeightData = useSetAtom(weightDataAtom);
  const setAssetsBalance = useSetAtom(assetsBalanceAtom);
  const setShareBalance = useSetAtom(shareBalanceAtom);
  const setReceiveShare = useSetAtom(receiveShareAtom);

  const setMBTCAllowance = useSetAtom(mbtcAllowanceAtom);
  const setIsAbleToClaim = useSetAtom(isAbleToClaimAtom);
  const setIsSwapPaused = useSetAtom(isSwapPausedAtom);

  const { evmAddress } = useMainAccount();
  useBTCLatestAnswer();
  useLatestMDBLPrice();

  const { data: lbpData } = useReadContracts({
    contracts: [
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'args', chainId },
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'vestEnd', chainId },
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'redeemOpen', chainId },
      { address: lbp, abi: LiquidityBootstrapPoolABI, functionName: 'paused', chainId },
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
    const poolEntity = new Pool(pool);
    const { assetReserve, shareReserve, assetWeight, shareWeight } = poolEntity.computeReservesAndWeights();
    setWeightData([assetReserve, shareReserve, assetWeight, shareWeight]);
    setPoolInitial(pool);
  }, [chainId, lbpData, lbp, setPoolInitial, setWeightData]);

  // vest end
  useEffect(() => {
    if (lbpData?.[1].result === undefined) return;
    setVestEndAtom(lbpData[1].result);
  }, [lbpData, setVestEndAtom]);

  // is able to claim
  useEffect(() => {
    if (lbpData?.[2].result === undefined) return;
    setIsAbleToClaim(lbpData[2].result);
  }, [lbpData, setIsAbleToClaim]);

  // is paused
  useEffect(() => {
    if (lbpData?.[3].result === undefined) return;
    setIsSwapPaused(lbpData[3].result);
  }, [lbpData, setIsSwapPaused]);

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
