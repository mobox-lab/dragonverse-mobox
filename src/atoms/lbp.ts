import { atom } from 'jotai';
import { PoolParams } from '@/entities/pool';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { ALLOW_CHAIN } from '@/constants';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { atomWithQuery, atomWithSuspenseQuery } from 'jotai-tanstack-query';
import { erc20Abi } from 'viem';

type TokenPrice = {
  value: bigint;
  floatValue: number;
};

export const poolInitialAtom = atom<PoolParams | undefined>(undefined);

export const latestBTCPriceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const latestMDBLPriceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const assetsBalanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });
export const shareBalanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });
export const receiveShareAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });
export const latestMDBLChartPriceAtom = atom<number>(0);

export const vestEndAtom = atom<number | undefined>(undefined);
export const weightDataAtom = atom<[bigint, bigint, bigint, bigint]>([0n, 0n, 0n, 0n]);

export const mbtcAllowanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const isAbleToClaimAtom = atom<boolean>(false);

export const chartNeedRefreshAtom = atom<number>(0);

export const isSwapPausedAtom = atom<boolean>(false);
