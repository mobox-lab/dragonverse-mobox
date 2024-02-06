import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEY } from '@/constants/storage';

export const mainWalletConnectDialogAtom = atom<boolean>(false);
export const btcWalletConnectDialogAtom = atom<boolean>(false);
export const evmWalletConnectDialogAtom = atom<boolean>(false);

export const accessTokenAtom = atomWithStorage<string | undefined>(STORAGE_KEY.ACCESS_TOKEN, undefined);
