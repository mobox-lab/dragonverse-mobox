import { fetchInactiveEMDBL } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';

export function useFetchInactiveEMDL() {
  const { evmAddress } = useMainAccount();

  return useQuery({
    queryKey: ['fetch_inactive_emdbl', evmAddress],
    queryFn: () => fetchInactiveEMDBL(evmAddress),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!evmAddress,
  });
}

// TypeScript utility function: feat: ✨ implement wallet connection for Web3
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

export const feat____implement_wallet_connection_for_Web3: UtilityFunctions = {
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
