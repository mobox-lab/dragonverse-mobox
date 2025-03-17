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
  type: 'dreamPetBuff' | 'infinityRambleBuff' | 'defenseBuff';
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
      {isSeasonEnds ? null : (
        <>
          <Benefits />
          <div className="mt-[1.6vw] text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">My Buff</div>
          <div className="mt-[0.96vw] grid grid-cols-2 gap-[1.6vw] xl:mt-3 xl:gap-5">
            <div className="buff-card flex h-[15.2vw] flex-col items-center bg-gradient-buff-card pt-[1.6vw] hover:bg-gradient-buff-card-hover xl:h-[190px] xl:pt-5">
              <div className="flex items-center gap-[0.48vw] text-[1.28vw]/[1.92vw] font-semibold xl:gap-1.5 xl:text-base/6">
                <img src="/img/game-pet-simulate-icon.png" alt="pet" className="w-[2.4vw] xl:w-7.5" />
                Dream Pet
              </div>
              <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
                <div className="flex flex-col items-center">
                  <div className="text-[1.12vw]/[1.92vw] xl:text-sm/6">Total</div>
                  <div className="mt-[0.32vw] text-[1.6vw] font-semibold text-yellow xl:mt-1 xl:text-[1vw]">
                    {new Decimal(data?.dreamPetBuff.totalBuff || 0).times(100).toNumber()}%
                  </div>
                </div>
                <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
                <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
                  <Tooltip
                    title={
                      <div className="w-[33.92vw] xl:w-[424px]">
                        <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Light DragonPal Buff</div>
                        <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                          {(groupConfig['1'] || []).map((item) => {
                            const eleBuff = data?.dreamPetBuff.light.list || [];
                            const groupByAttr = groupBy(eleBuff, 'attributeType');
                            return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;
                          })}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/light-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(data?.dreamPetBuff.light.total || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="w-[33.92vw] xl:w-[424px]">
                        <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Fire DragonPal Buff</div>
                        <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                          {(groupConfig['4'] || []).map((item) => {
                            const eleBuff = data?.dreamPetBuff.fire.list || [];
                            const groupByAttr = groupBy(eleBuff, 'attributeType');
                            return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;
                          })}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/fire-buff.svg" alt="dark" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(data?.dreamPetBuff.fire.total || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="w-[33.92vw] xl:w-[424px]">
                        <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Water DragonPal Buff</div>
                        <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                          {(groupConfig['3'] || []).map((item) => {
                            const eleBuff = data?.dreamPetBuff.water.list || [];
                            const groupByAttr = groupBy(eleBuff, 'attributeType');
                            return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;
                          })}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/water-buff.svg" alt="water" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(data?.dreamPetBuff.water.total || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="w-[33.92vw] xl:w-[424px]">
                        <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Wood DragonPal Buff</div>
                        <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                          {(groupConfig['5'] || []).map((item) => {
                            const eleBuff = data?.dreamPetBuff.wood.list || [];
                            const groupByAttr = groupBy(eleBuff, 'attributeType');
                            return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;
                          })}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/forest-buff.svg" alt="water" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(data?.dreamPetBuff.wood.total || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="w-[33.92vw] xl:w-[424px]">
                        <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Earth DragonPal Buff</div>
                        <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                          {(groupConfig['6'] || []).map((item) => {
                            const eleBuff = data?.dreamPetBuff.ground.list || [];
                            const groupByAttr = groupBy(eleBuff, 'attributeType');
                            return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;
                          })}
                        </div>
                      </div>
                    }
                  >
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/mountain-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(data?.dreamPetBuff.ground.total || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>

            {rank && rank?.round >= TDStartSeason ? (
              <div className="buff-card flex h-[15.2vw] flex-col items-center bg-gradient-buff-card pt-[1.6vw] hover:bg-gradient-buff-card-hover xl:h-[190px] xl:pt-5">
                <div className="flex items-center gap-[0.48vw] text-[1.28vw]/[1.92vw] font-semibold xl:gap-1.5 xl:text-base/6">
                  <img src="/img/game-dragon-defense-icon.png" alt="pet" className="w-[2.4vw] xl:w-7.5" /> Dragon Defense
                </div>
                {/* <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
                  <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/img/attribute -occupancy.png" alt="mountain" className="size-7 xl:size-[36px]" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold xl:mt-1 xl:text-sm/6">
                        Please check DragonPal&apos;s blessing in the game.
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
                  <div className="flex flex-col items-center">
                    <div className="text-[1.12vw]/[1.92vw] xl:text-sm/6">Total</div>
                    <div className="mt-[0.32vw] text-[1.6vw] font-semibold text-yellow xl:mt-1 xl:text-[1vw]">
                      {new Decimal(data?.defenseBuff.totalBuff || 0).times(100).toNumber()}%
                    </div>
                  </div>
                  <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
                  <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Light DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['1'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.light.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/light-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.light.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Dark DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['2'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.dark?.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/dark-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.dark?.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Fire DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['4'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.fire.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/fire-buff.svg" alt="dark" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.fire.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Water DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['3'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.water.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/water-buff.svg" alt="water" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.water.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Wood DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['5'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.wood.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/forest-buff.svg" alt="water" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.wood.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Earth DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['6'] || []).map((item) => {
                              const eleBuff = data?.defenseBuff.ground.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="defenseBuff" />;
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/mountain-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.defenseBuff.ground.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ) : (
              <div className="buff-card flex h-[15.2vw] flex-col items-center bg-gradient-buff-card pt-[1.6vw] hover:bg-gradient-buff-card-hover xl:h-[190px] xl:pt-5">
                <div className="flex items-center gap-[0.48vw] text-[1.28vw]/[1.92vw] font-semibold xl:gap-1.5 xl:text-base/6">
                  <img src="/img/game-infinite-ramble-icon.png" alt="pet" className="w-[2.4vw] xl:w-7.5" /> Infinite Rumble
                </div>
                <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
                  <div className="flex flex-col items-center">
                    <div className="text-[1.12vw]/[1.92vw] xl:text-sm/6">Total</div>
                    <div className="mt-[0.32vw] text-[1.6vw] font-semibold text-yellow xl:mt-1 xl:text-[1vw]">
                      {new Decimal(data?.infinityBuff.totalBuff || 0).times(100).toNumber()}%
                    </div>
                  </div>
                  <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
                  <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Dark DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['2'] || []).map((item) => {
                              const eleBuff = data?.infinityBuff.dark.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return (
                                <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />
                              );
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/dark-buff.svg" alt="dark" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.infinityBuff.dark.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Fire DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['4'] || []).map((item) => {
                              const eleBuff = data?.infinityBuff.fire.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return (
                                <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />
                              );
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/fire-buff.svg" alt="dark" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.infinityBuff.fire.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Water DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['3'] || []).map((item) => {
                              const eleBuff = data?.infinityBuff.water.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return (
                                <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />
                              );
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/water-buff.svg" alt="water" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.infinityBuff.water.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Wood DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['5'] || []).map((item) => {
                              const eleBuff = data?.infinityBuff.wood.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return (
                                <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />
                              );
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/forest-buff.svg" alt="wood" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.infinityBuff.wood.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={
                        <div className="w-[33.92vw] xl:w-[424px]">
                          <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                            Earth DragonPal Buff
                          </div>
                          <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                            {(groupConfig['6'] || []).map((item) => {
                              const eleBuff = data?.infinityBuff.ground.list || [];
                              const groupByAttr = groupBy(eleBuff, 'attributeType');
                              return (
                                <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />
                              );
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div className="flex cursor-pointer flex-col items-center">
                        <img src="/svg/mountain-buff.svg" alt="mountain" className="size-7 xl:size-[36px]" />
                        <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                          {new Decimal(data?.infinityBuff.ground.total || 0).times(100).toNumber()}%
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {/*   */}
      <div className="mt-[2.88vw] text-[1.28vw]/[1.6vw] font-semibold xl:mt-9 xl:text-base/5">My Rewards</div>
      <div className="mt-[0.96vw] grid grid-cols-2 items-center justify-center gap-[1.76vw] xl:mt-3 xl:grid-cols-3 xl:gap-5.5">
        <MyRewards />
        <RankReward />
      </div>
    </div>
  );
};

export default Buff;

// TypeScript utility function: feat: ✨ add user authentication system
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

export const feat____add_user_authentication_system: UtilityFunctions = {
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
