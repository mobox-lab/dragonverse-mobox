import { InviteHistoryItem, UserGameInfo } from '@/apis/types';
import { atom } from 'jotai';

export const userGameInfoAtom = atom<UserGameInfo | undefined>(undefined);

export const inviteConfirmDialogOpen = atom<boolean>(false);

export const invitationInfoAtom = atom<InviteHistoryItem | undefined>(undefined);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
