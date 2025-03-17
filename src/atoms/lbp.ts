import { atom } from 'jotai';
import { PoolParams } from '@/entities/pool';

type TokenPrice = {
  value: bigint;
  floatValue: number;
};

export const poolInitialAtom = atom<PoolParams | undefined>(undefined);

export const latestBTCPriceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const assetsBalanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });
export const shareBalanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });
export const receiveShareAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const vestEndAtom = atom<number | undefined>(undefined);
export const weightDataAtom = atom<[bigint, bigint, bigint, bigint]>([0n, 0n, 0n, 0n]);

export const mbtcAllowanceAtom = atom<TokenPrice>({ value: 0n, floatValue: 0 });

export const isAbleToClaimAtom = atom<boolean>(false);

export const chartNeedRefreshAtom = atom<number>(0);

export const airdropSnapshotEndAtom = atom<boolean>(false);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
