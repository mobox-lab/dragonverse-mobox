import { InviteHistoryItem, UserGameInfo } from '@/apis/types';
import { atom } from 'jotai';

export const userGameInfoAtom = atom<UserGameInfo | undefined>(undefined);

export const inviteConfirmDialogOpen = atom<boolean>(false);

export const invitationInfoAtom = atom<InviteHistoryItem | undefined>(undefined);
