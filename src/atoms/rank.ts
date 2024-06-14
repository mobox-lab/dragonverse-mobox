import { GameRankType } from '@/constants/enum';
import { atom } from 'jotai';
import { PGEGameId } from '@/apis/types';

export const gameRankTypeAtom = atom<GameRankType>(GameRankType.PetOdyssey);

export const dvGameIdAtom = atom<PGEGameId | undefined>(undefined);
