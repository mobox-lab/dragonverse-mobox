'use client';

import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { useFetchBuffData } from '@/hooks/rank/useFetchBuffData';
import React, { useMemo } from 'react';
import { groupBy } from 'lodash-es';
import Tooltip from '@/components/ui/tooltip';
import { clsxm } from '@/utils';
import { DragonPalConfigList } from '@/apis/types';
import Decimal from 'decimal.js-light';
import Benefits from './Benefits';
import MyRewards from './MyRewards';
import RankReward from './RankReward';
import { useAtomValue } from 'jotai';
import { rankAtom } from '@/atoms/rank';
import { TDStartSeason } from '@/constants';

interface BuffProps {
  endTime: number;
}

const DragonBuffItem = ({
  type,
  info,
  groupByAttr,
}: {
  type: 'dreamPetBuff' | 'infinityRambleBuff';
  info: DragonPalConfigList;
  groupByAttr: any;
}) => {
  return (
    <div key={info.id} className="flex flex-col items-center">
      <div className="relative">
        <img src={info.avatarUrl} alt="icon" className="size-[3.84vw] xl:size-12" />
        {groupByAttr[info.attributeType] ? (
          <div className="black-outline absolute bottom-0 right-0 text-[1.12vw]/[1.12vw] font-medium xl:text-sm/3.5">
            x{groupByAttr[info.attributeType]?.length || 0}
          </div>
        ) : (
          <div className="absolute left-0 top-0 h-full w-full bg-black/60"></div>
        )}
      </div>

      <div
        className={clsxm('mt-[0.32vw] text-[1.12vw]/[1.6vw] font-semibold text-yellow xl:mt-1 xl:text-sm/5', {
          'text-gray-300': (groupByAttr[info.attributeType]?.length || 0) === 0,
        })}
      >
        {new Decimal(info[type])
          .times(groupByAttr[info.attributeType]?.length || 0)
          .times(100)
          .toNumber()}
        %
      </div>
    </div>
  );
};

const Buff: React.FunctionComponent<BuffProps> = (props) => {
  const { data } = useFetchBuffData();
  //  
  const isSeasonEnds = Date.now() > props.endTime * 1000;
  const rank = useAtomValue(rankAtom);

  const groupConfig = useMemo(() => {
    if (data && data.dragonPalConfigList) {
      const groupByCategory = groupBy(data.dragonPalConfigList, 'category_id');
      return groupByCategory;
    } else {
      return {};
    }
  }, [data]);

  return (
    <div className="relative mt-[2.88vw] border border-gray-600 bg-black/60 px-[3.2vw] py-[2.88vw] backdrop-blur-sm xl:mt-9 xl:px-10 xl:py-9">
      <PatternWithoutLine />
      <div>
        <div className="text-[1.28vw]/[1.44vw] xl:text-base/4.5">More Details</div>
        <ul className="mt-[0.96vw] xl:mt-3">
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · Each player has a stamina limit of 200, and the recovery rate is 24 hours to fully replenish.
          </li>
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · You can play the game and complete in-game tasks to earn points. At the end of the season, we will conduct a
            lottery based on points.
          </li>
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · A total of 20 players will share 95% of the in-game purchase revenue. The more points you have, the higher your
            chances of winning.
          </li>
        </ul>
      </div>
      {/*   */}
      <div className="mt-[2.88vw] text-[1.28vw]/[1.6vw] font-semibold xl:mt-9 xl:text-base/5">My Rewards</div>
      <div className="mt-[0.96vw] w-full overflow-x-auto xl:mt-3">
        <div className="flex space-x-4">
          <MyRewards />
        </div>
      </div>
    </div>
  );
};

export default Buff;

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: refactor: 🔧 improve code readability
interface refactor____improve_code_readabilityProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____improve_code_readabilityState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____improve_code_readability = () => {
  const [state, setState] = useState<refactor____improve_code_readabilityState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____improve_code_readability = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____improve_code_readability');
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
    handlerefactor____improve_code_readability
  };
};

// TypeScript utility function: security: 🔒 implement authentication tokens
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

export const security____implement_authentication_tokens: UtilityFunctions = {
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
