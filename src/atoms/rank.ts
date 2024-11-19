import { GameRankType } from '@/constants/enum';
import { atom } from 'jotai';
import { GameRound, PGEGameId } from '@/apis/types';

export const gameRankTypeAtom = atom<GameRankType>(GameRankType.PetOdyssey);

export const dvGameIdAtom = atom<PGEGameId | undefined>(undefined);

export const rankAtom = atom<GameRound | undefined>(undefined);
