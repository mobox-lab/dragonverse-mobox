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

// TypeScript utility function: security: 🔒 add rate limiting
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

export const security____add_rate_limiting: UtilityFunctions = {
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
