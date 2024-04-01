import { CouponResult } from '@/apis/types';
import { MenuItem } from '@/constants/enum';
import { atom } from 'jotai';

export const siderCollapsedAtom = atom<boolean>(true);

export const dragonWalletConnectDialogAtom = atom<boolean>(false);
export const dragonBurnDialogOpenAtom = atom<boolean>(false);
export const dragonBallUnboxDialogOpenAtom = atom<boolean>(false);

export const dragonBallBurnDialogOpenAtom = atom<boolean>(false);
export const rankDialogOpenAtom = atom<boolean>(false);
export const hatchDialogOpenAtom = atom<boolean>(false);
export const LBPRewardDialogOpenAtom = atom<boolean>(false);
export const stakeHistoryDialogOpenAtom = atom<boolean>(false);

export const isMobileAtom = atom<boolean>(false);

export const activeMenuAtom = atom<MenuItem>(MenuItem.DragonKey);

export const logDialogAtom = atom<boolean>(false);

export const dragonBoxUnboxNumAtom = atom<number>(6);

// 优惠券余额
export const couponAtom = atom<CouponResult>({
  couponTwoCurrent: 0,
  couponEightCurrent: 0,
  couponFreeCurrent: 0,
});
