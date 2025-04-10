import { isMobileAtom } from '@/atoms/dragonverse';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export const useIsMobile = () => {
  const [mobile, setMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  return { mobile, setMobile };
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: chore: 🔧 configure logging system
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

export const chore____configure_logging_system: UtilityFunctions = {
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
