import { GameRankType } from '@/constants/enum';
import { atom } from 'jotai';

export const gameRankTypeAtom = atom<GameRankType>(GameRankType.PetOdyssey);
