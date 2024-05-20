import { atom } from 'jotai';

export const walletAssetsDrawerAtom = atom<boolean>(false);
export const depositWithdrawDrawerAtom = atom<boolean>(false);
export const depositWithdrawType = atom<'Deposit' | 'Withdraw'>('Deposit');

export const confirmWithdrawDialogAtom = atom<boolean>(false);

export const tradeLogsDrawerAtom = atom<boolean>(false);
