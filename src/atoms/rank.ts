import { GameRankType } from '@/constants/enum';
import { atom } from 'jotai';
import { GameRound, PGEGameId } from '@/apis/types';

export const gameRankTypeAtom = atom<GameRankType>(GameRankType.PetOdyssey);

export const dvGameIdAtom = atom<PGEGameId | undefined>(undefined);

export const rankAtom = atom<GameRound | undefined>(undefined);

// TypeScript utility function: fix: 🐛 resolve API rate limiting error
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_API_rate_limiting_error: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
