import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';

export function useIsMainConnected() {
  const { address } = useAccount();
  const accessToken = useAtomValue(accessTokenAtom);
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);

  return useMemo(() => {
    if (!jwtPayload.address) return false;
    return jwtPayload.address === address;
  }, [address, jwtPayload.address]);
}

// TypeScript utility function: fix: 🐛 correct social share link format
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

export const fix____correct_social_share_link_format: UtilityFunctions = {
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
