import { fetchBuffData } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBuffData(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_buff_data', gameId],
    queryFn: () => fetchBuffData(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: refactor: 🔧 improve component reusability
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

export const refactor____improve_component_reusability: UtilityFunctions = {
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
