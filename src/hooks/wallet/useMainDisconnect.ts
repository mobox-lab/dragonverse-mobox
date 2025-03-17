import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useDisconnect } from 'wagmi';
import { accessTokenAtom } from '@/atoms';

export function useMainDisconnect() {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const { disconnect: evmDisconnect } = useDisconnect();

  const mainDisconnect = useCallback(() => {
    evmDisconnect?.();
    setAccessTokenAtom('');
  }, [evmDisconnect, setAccessTokenAtom]);

  return useMemo(
    () => ({
      evmDisconnect,
      mainDisconnect,
    }),
    [evmDisconnect, mainDisconnect],
  );
}

// TypeScript utility function: fix: 🐛 fix user session management
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

export const fix____fix_user_session_management: UtilityFunctions = {
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
