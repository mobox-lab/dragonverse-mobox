import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { gameAssetsLogDrawerAtom } from '@/atoms/assets';
import Button from '@/components/ui/button';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { GAME_ASSETS_ID, GameAssetID } from '@/constants/gameAssets';
import { useFetchGameAssetLog } from '@/hooks/shop';
import { useGameAssetLogColumns } from '@/hooks/useGameAssetLogColumns';
import { clsxm } from '@/utils';

const SIZE = 20;

const tabs = [
  {
    id: GAME_ASSETS_ID.StaminaPotion,
    icon: '/svg/senzu-bean.svg',
    name: 'Senzu Potion',
    describe: 'Instant Stamina Recovery',
  },
  {
    id: GAME_ASSETS_ID.CaptureBall,
    icon: '/svg/capture-ball.svg',
    name: 'Blue Snitch',
    describe: 'Capture DragonPal',
  },
];

export default function GameAssetsLog() {
  const [isOpen, setIsOpen] = useAtom(gameAssetsLogDrawerAtom);
  const [tab, setTab] = useState<GameAssetID>(GAME_ASSETS_ID.StaminaPotion);
  const columns = useGameAssetLogColumns(tab);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const { data, isFetching } = useFetchGameAssetLog(tab, page, SIZE);
  const hasMore = useMemo(() => {
    return page * SIZE < (data?.total ?? 0);
  }, [data?.total, page]);

  const changePage = useCallback(
    (page: number) => {
      const hasMore = (page - 1) * SIZE < (data?.total ?? 0);
      if (page === 0 || !hasMore) return;
      setPage(page);
      setInputValue(page + '');
    },
    [data?.total],
  );

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    try {
      const newPage = Number(e.target.value);
      if (isNaN(newPage)) return;
      setInputValue(e.target.value);
    } catch (e) {
      return;
    }
  }, []);

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        try {
          const newPage = Number(e.currentTarget.value);
          if (isNaN(newPage)) return;
          changePage(newPage);
        } catch (e) {
        }
      }
    },
    [changePage],
  );

  const onTabChange = useCallback((id: GameAssetID) => {
    setTab(id);
    changePage(1);
  }, [changePage]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Asset History"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[45.4vw] flex-grow flex-col xl:w-[550px] overflow-auto">
          <ul className='flex items-center w-full bg-white/[0.06] mb-[1.8vw] p-[0.4vw]'>
            {
              tabs.map(item => (
                <li className={clsx('flex-1 flex items-center p-[0.5vw] cursor-pointer', item.id === tab ? 'bg-white/[0.12]' : null)} key={item.id} onClick={() => onTabChange(item.id)}>
                  <div className='size-[2.5vw] flex items-center justify-center pl-[0.1vw]'>
                    <img src={item.icon} className='w-full' />
                  </div>
                  <div className='flex flex-col justify-center leading-none ml-[0.6vw]'>
                    <div className='text-[0.8vw] font-medium'>{item.name}</div>
                    <div className='text-[0.7vw] text-gray-300 mt-[0.3vw]'>{item.describe}</div>
                  </div>
                </li>
              ))
            }
          </ul>
          <RankTable
            loading={isFetching}
            className="overflow-auto"
            gapClass="gap-[1.92vw] xl:gap-2"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data?.data ?? []}
            columns={columns}
          />
          <div className="flex-center mt-8 gap-[0.64vw] justify-self-end text-[0.96vw]/[1.44vw] xl:gap-2 xl:text-xs/4.5">
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] -rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  'fill-gray-300/50': page === 1,
                })}
              />
            </Button>
            <input
              value={inputValue}
              className="h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-transparent text-center text-white xl:h-6 xl:w-6"
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
            />
            <span className="-mb-[0.1vw] -ml-[0.32vw] text-gray-300 xl:-mb-px xl:-ml-1">
              / {Math.ceil((data?.total ?? 0) / SIZE)}
            </span>
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              onClick={() => changePage(page + 1)}
              disabled={!hasMore}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  'fill-gray-300/50': !hasMore,
                })}
              />
            </Button>
          </div>
        </div>
      )}
    />
  );
}
