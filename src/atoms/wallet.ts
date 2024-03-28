import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEY } from '@/constants/storage';
import { Address } from 'viem';

export const mainWalletConnectDialogAtom = atom<boolean>(false);
export const btcWalletConnectDialogAtom = atom<boolean>(false);
export const evmWalletConnectDialogAtom = atom<boolean>(false);

export const accessTokenAtom = atomWithStorage<string | undefined>(STORAGE_KEY.ACCESS_TOKEN, undefined);

export const evmAddressAtom = atom<Address | undefined>(undefined);

export const termOfUseAcceptedAtom = atomWithStorage('term_of_use', false);
