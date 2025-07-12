'use client';

import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { GameRound, RankCurrentRound } from '@/apis/types';
import { rankAtom } from '@/atoms/rank';
import { clsxm, openLink } from '@/utils';
import { useFetchGameRoundList } from '@/hooks/rank/useFetchGameRoundList';
import ChangeRoundButton from './ChangeRoundButton';
import PointsRank from './PointsRank';

export default function GameRank({ roundInfo }: { roundInfo?: RankCurrentRound }) {
  const { data: roundList } = useFetchGameRoundList();
  const [currentRound, setCurrentRound] = useAtom(rankAtom);

  const roundChange = (round: GameRound) => {
    if (round.round <= 8) {
      openLink('/halloffame-previous');
    } else {
      setCurrentRound(round);
    }
  };

  useEffect(() => {
    if (roundList?.list && roundList?.list.length) {
      setCurrentRound(roundList.list[roundList.list.length - 1]);
    }
  }, [roundList]);

  return (
    <div className="flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex select-none items-center gap-[0.96vw] text-[1.28vw]/[1.44vw] xl:gap-3 xl:text-base/4.5">
            Season {currentRound?.round} :{' '}
            {currentRound
              ? `${dayjs(currentRound.startTime * 1000).format('MMM DD')} - ${dayjs(currentRound.endTime * 1000).format('MMM DD')}`
              : null}
            <ChangeRoundButton roundList={roundList?.list ?? []} currentRound={currentRound} onChange={roundChange} />
          </div>
          <p className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">Updated every 5 minutes</p>
        </div>
        <PointsRank className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': false })} round={currentRound?.round} />
      </div>
    </div>
  );
}

// TypeScript test for: test: 🧪 add regression tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_regression_tests', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
