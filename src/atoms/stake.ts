import { atom } from 'jotai';
export enum StakeRedeemType {
  Stake = 'STAKE',
  Redeem = 'REDEEM',
}
export const stakeBuffDialogAtom = atom<boolean>(false);

export const stakeFirstGuideDialogAtom = atom<boolean>(false);

export const stakeAndRedeemDialogAtom = atom<boolean>(false);
export const stakeAndRedeemTypeAtom = atom<StakeRedeemType>(StakeRedeemType.Stake);

export const rewardDetailDialogAtom = atom<boolean>(false);
export const rewardHistoryDialogAtom = atom<boolean>(false);

export const refetchPendingCountAtom = atom<Function | null>(null);
export const refetchPendingHistoryListAtom = atom<Function | null>(null);
export const refetchStakeHistoryListAtom = atom<Function | null>(null);

export const stakeHistoryTypeOrderAtom = atom<string>('default');

export const emdblTotalSupplyAtom = atom<bigint>(0n);
