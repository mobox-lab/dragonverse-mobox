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
