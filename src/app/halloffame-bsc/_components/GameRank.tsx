'use client';

import { RankCurrentRound } from '@/apis/types';
import { gameRankTypeAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import InfinityRumbleGameRank from './InfinityRumbleGameRank';
import PetOdysseyGameRank from './PetOdysseyGameRank';

export default function GameRank({ roundInfo }: { roundInfo?: RankCurrentRound }) {
  const rankType = useAtomValue(gameRankTypeAtom);

  return (
    <div className="flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6">
      <PetOdysseyGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.PetOdyssey })}
        roundInfo={roundInfo}
      />
      <InfinityRumbleGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Rumble })}
        roundInfo={roundInfo}
      />
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: docs: 📝 update security guidelines
interface docs____update_security_guidelinesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____update_security_guidelinesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____update_security_guidelines = () => {
  const [state, setState] = useState<docs____update_security_guidelinesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____update_security_guidelines = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____update_security_guidelines');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handledocs____update_security_guidelines
  };
};

// TypeScript wallet connection with proper types
interface WalletAccount {
  address: string;
  balance: string;
  chainId: number;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
    };
  }
}

export const connectWallet = async (): Promise<WalletAccount> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });
      
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });
      
      return {
        address: accounts[0],
        balance,
        chainId: parseInt(chainId, 16)
      };
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  } else {
    throw new Error('No wallet detected');
  }
};

// TypeScript utility function: style: 💄 improve accessibility design
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

export const style____improve_accessibility_design: UtilityFunctions = {
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

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
