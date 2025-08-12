import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEY } from '@/constants/storage';
import { Address } from 'viem';

export const mainWalletConnectDialogAtom = atom<boolean>(false);
export const btcWalletConnectDialogAtom = atom<boolean>(false);
export const evmWalletConnectDialogAtom = atom<boolean>(false);

export const accessTokenAtom = atomWithStorage<string | undefined>(STORAGE_KEY.ACCESS_TOKEN, undefined);

export const evmAddressAtom = atom<Address | undefined>(undefined);

type BindWalletDetail = {
  existedAddress: string;
  buffAddress: string;
  aaAddress: string;
  signature: string;
  publicKey: string;
};

export const bindWalletDataAtom = atom<BindWalletDetail | undefined>(undefined);

export const isExistedAddressDialogAtom = atom<boolean>(false);
export const isUnbindWalletDialogAtom = atom<boolean>(false);

// TypeScript utility function: fix: 🐛 correct language switching bug
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

export const fix____correct_language_switching_bug: UtilityFunctions = {
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
