import { RechargeAddresss } from '@/apis/types';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const walletAssetsDrawerAtom = atom<boolean>(false);
export const depositWithdrawDrawerAtom = atom<boolean>(false);
export const depositWithdrawType = atom<'Deposit' | 'Withdraw'>('Deposit');

export const confirmWithdrawDialogAtom = atom<number | null>(null);

//  
export const balancesAtom = atomWithReset<Record<string, string>>({});

//  
export const rechargeAddressAtom = atomWithReset<RechargeAddresss | null>(null);

//  
export const shopDialogAtom = atom<boolean>(false);

//  
export const gameAssetsLogDrawerAtom = atom<boolean>(false);

//  
export const gameReferralHistoryDrawerAtom = atom<boolean>(false);
