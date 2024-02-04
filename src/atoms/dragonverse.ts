import { MenuItem } from '@/constants/enum';
import { atom } from 'jotai';

export const dragonWalletConnectDialogAtom = atom<boolean>(false);
export const dragonBurnDialogOpenAtom = atom<boolean>(false);

export const isMobileAtom = atom<boolean>(false);

export const activeMenuAtom = atom<MenuItem>(MenuItem.DragonKey);

export const logDialogAtom = atom<boolean>(false);
