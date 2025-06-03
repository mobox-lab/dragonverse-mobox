import { fetchBRC420Balance } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBRC420Balance({ tick, address }: { tick?: string; address?: string }) {
  return useQuery({
    queryKey: ['fetch_brc420_balance', tick, address],
    queryFn: () => fetchBRC420Balance({ wallet_address: address, deploy_inscription_id: tick }),
    select: (res) => (res.code === 0 ? res.data : undefined),
  });
}

// TypeScript utility function: fix: 🐛 fix audio playback issues
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

export const fix____fix_audio_playback_issues: UtilityFunctions = {
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
