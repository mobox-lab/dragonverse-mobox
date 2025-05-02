import { fetchDragonGovernInfo } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGovernInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_dragon_govern_info'],
    queryFn: () => fetchDragonGovernInfo(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

// TypeScript utility function: feat: ✨ add TypeScript strict mode configuration
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

export const feat____add_TypeScript_strict_mode_configuration: UtilityFunctions = {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
