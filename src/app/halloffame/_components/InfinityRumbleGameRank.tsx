import LoadingSvg from '@/../public/svg/loading.svg?component';
import { GameRound, RankCurrentRound } from '@/apis/types';
import RankTable from '@/components/ui/table/RankTable';
import { GameRankType } from '@/constants/enum';
import { useFetchGameRoundList } from '@/hooks/rank/useFetchGameRoundList';
import { useFetchMoboxGameRank } from '@/hooks/rank/useFetchMoboxGameRank';
import { useInfinityRumbleGameRankColumns } from '@/hooks/rank/useInfinityRumbleGameRankColumns';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ChangeRoundButton from './ChangeRoundButton';

export default function InfinityRumbleGameRank({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const { evmAddress } = useMainAccount();
  // const { data: roundList } = useFetchGameRoundList();
  const roundList = useMemo(
    () => ({
      list: [
        {
          round: 1,
          startTime: 1716534000,
          endTime: 1717142400,
        },
        {
          round: 2,
          startTime: 1721894400,
          endTime: 1722758400,
        },
        {
          round: 3,
          startTime: 1723708800,
          endTime: 1724745600,
        },
        {
          round: 4,
          startTime: 1726041600,
          endTime: 1727078400,
        },
      ],
    }),
    [],
  );
  const [currentRound, setCurrentRound] = useState<GameRound | undefined>(undefined);
  const columns = useInfinityRumbleGameRankColumns(currentRound?.round);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchMoboxGameRank({
    type: GameRankType.Rumble,
    round: currentRound?.round,
  });
  const { ref, inView } = useInView();
  const rankItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.list) {
      const res = data.pages.map((page) => page?.list).flat(1);
      if (evmAddress) {
        if (data.pages[0]?.myself) {
          return [data.pages[0]?.myself, ...res];
        }
        return [
          {
            rank: -1,
            round: 0,
            gparkUid: '',
            gparkUserAddress: evmAddress,
            gparkUserName: '',
            gparkUserAvatar: '',
            grade: 0,
            gradeOriginalPower: 0,
            gradePower: 0,
            recordTime: 0,
            mdblReward: '0',
            emdblReward: '0',
            mboxReward: '0',
          },
          ...res,
        ];
      } else {
        return res;
      }
    } else return [];
  }, [data?.pages, evmAddress]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (roundList?.list && roundList?.list.length) {
      setCurrentRound(roundList.list[roundList.list.length - 1]);
    }
  }, [roundList]);

  const roundChange = (round: GameRound) => {
    setCurrentRound(round);
  };

  useEffect(() => {
    if (currentRound) {
      refetch();
    }
  }, [currentRound]);

  return (
    <div className={clsxm('flex w-full flex-col', className)}>
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
      <RankTable
        firstLineHighLight={!!evmAddress}
        loading={isLoading}
        className="mt-[0.8vw] max-h-[35.68vw] overflow-x-auto xl:mt-2.5 xl:max-h-[446px]"
        bodyClass="!pb-0"
        dataSource={rankItems ?? []}
        columns={columns}
        renderBottom={() => (
          <>
            {hasNextPage && (
              <div ref={ref} className="h-px text-transparent">
                {'Load More'}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="flex-center mb-[3.84vw] pt-[1.28vw] xl:mb-12 xl:pt-4">
                <LoadingSvg className="h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:h-10 xl:w-10" />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
