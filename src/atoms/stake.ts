import { atom } from 'jotai';
export enum StakeRedeemType {
  Stake = 'STAKE',
  Redeem = 'REDEEM',
}
export const stakeBuffDialogAtom = atom<boolean>(false);

export const stakeAndRedeemDialogAtom = atom<boolean>(false);
export const stakeAndRedeemTypeAtom = atom<StakeRedeemType>(StakeRedeemType.Stake);
