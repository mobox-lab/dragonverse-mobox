'use client';

import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { useFetchBuffData } from '@/hooks/rank/useFetchBuffData';
import { formatNumber } from '@/utils/shorten';
import React, { useMemo } from 'react';
import { groupBy } from 'lodash-es';
import Tooltip from '@/components/ui/tooltip';
import { clsxm } from '@/utils';
import { DragonPalConfigList } from '@/apis/types';
import Decimal from 'decimal.js-light';

interface BuffProps {}

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

  const groupConfig = useMemo(() => {
    if (data && data.dragonPalConfigList) {
      const groupByCategory = groupBy(data.dragonPalConfigList, 'category_id');
      return groupByCategory;
    } else {
      return {};
    }
  }, [data]);

  return (
    <div className="mt-[2.88vw] border border-gray-600 bg-black/60 px-[3.2vw] py-[2.88vw] backdrop-blur-sm xl:mt-9 xl:px-10 xl:py-9">
      <PatternWithoutLine />
      <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">My Buff</div>
      <div className="mt-[0.96vw] grid grid-cols-2 gap-[1.6vw] xl:mt-3 xl:gap-5">
        <div className="buff-card flex h-[15.2vw] flex-col items-center bg-gradient-buff-card pt-[1.6vw] hover:bg-gradient-buff-card-hover xl:h-[190px] xl:pt-5">
          <div className="flex items-center gap-[0.48vw] text-[1.28vw]/[1.92vw] font-semibold xl:gap-1.5 xl:text-base/6">
            <img src="/img/game-pet-simulate-icon.png" alt="pet" className="w-[2.4vw] xl:w-7.5" /> DreamPet Odyssey
          </div>
          <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
            <div className="flex flex-col items-center">
              <div className="text-[0.96vw]/[2.24vw] xl:text-xs/7">Total</div>
              <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                {new Decimal(data?.dreamPetBuff.totalBuff || 0).times(100).toNumber()}%
              </div>
            </div>
            <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
            <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Light DragonPal Buff in DreamPet Odyssey
                    </div>
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
                  <img src="/svg/light-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.dreamPetBuff.light.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Fire DragonPal Buff in DreamPet Odyssey
                    </div>
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
                  <img src="/svg/fire-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.dreamPetBuff.fire.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Water DragonPal Buff in DreamPet Odyssey
                    </div>
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
                  <img src="/svg/water-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.dreamPetBuff.water.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Wood DragonPal Buff in DreamPet Odyssey
                    </div>
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
                  <img src="/svg/forest-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.dreamPetBuff.wood.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Ground DragonPal Buff in DreamPet Odyssey
                    </div>
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
                  <img src="/svg/mountain-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.dreamPetBuff.ground.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="buff-card flex h-[15.2vw] flex-col items-center bg-gradient-buff-card pt-[1.6vw] hover:bg-gradient-buff-card-hover xl:h-[190px] xl:pt-5">
          <div className="flex items-center gap-[0.48vw] text-[1.28vw]/[1.92vw] font-semibold xl:gap-1.5 xl:text-base/6">
            <img src="/img/game-infinite-ramble-icon.png" alt="pet" className="w-[2.4vw] xl:w-7.5" /> Infinity Ramble
          </div>
          <div className="mt-[2.88vw] flex items-center justify-center gap-[2.88vw] xl:mt-9 xl:gap-9">
            <div className="flex flex-col items-center">
              <div className="text-[0.96vw]/[2.24vw] xl:text-xs/7">Total</div>
              <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                {new Decimal(data?.infinityBuff.totalBuff || 0).times(100).toNumber()}%
              </div>
            </div>
            <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
            <div className="flex items-center gap-[2.4vw] xl:gap-7.5">
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Dark DragonPal Buff in Infinity Ramble
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      {(groupConfig['2'] || []).map((item) => {
                        const eleBuff = data?.infinityBuff.dark.list || [];
                        const groupByAttr = groupBy(eleBuff, 'attributeType');
                        return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;
                      })}
                    </div>
                  </div>
                }
              >
                <div className="flex cursor-pointer flex-col items-center">
                  <img src="/svg/dark-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.infinityBuff.dark.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Fire DragonPal Buff in Infinity Ramble
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      {(groupConfig['4'] || []).map((item) => {
                        const eleBuff = data?.infinityBuff.fire.list || [];
                        const groupByAttr = groupBy(eleBuff, 'attributeType');
                        return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;
                      })}
                    </div>
                  </div>
                }
              >
                <div className="flex cursor-pointer flex-col items-center">
                  <img src="/svg/fire-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.infinityBuff.fire.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Water DragonPal Buff in Infinity Ramble
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      {(groupConfig['3'] || []).map((item) => {
                        const eleBuff = data?.infinityBuff.water.list || [];
                        const groupByAttr = groupBy(eleBuff, 'attributeType');
                        return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;
                      })}
                    </div>
                  </div>
                }
              >
                <div className="flex cursor-pointer flex-col items-center">
                  <img src="/svg/water-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.infinityBuff.water.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Water DragonPal Buff in Infinity Ramble
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      {(groupConfig['5'] || []).map((item) => {
                        const eleBuff = data?.infinityBuff.wood.list || [];
                        const groupByAttr = groupBy(eleBuff, 'attributeType');
                        return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;
                      })}
                    </div>
                  </div>
                }
              >
                <div className="flex cursor-pointer flex-col items-center">
                  <img src="/svg/forest-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.infinityBuff.wood.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                title={
                  <div className="w-[33.92vw] xl:w-[424px]">
                    <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                      Ground DragonPal Buff in Infinity Ramble
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      {(groupConfig['6'] || []).map((item) => {
                        const eleBuff = data?.infinityBuff.ground.list || [];
                        const groupByAttr = groupBy(eleBuff, 'attributeType');
                        return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;
                      })}
                    </div>
                  </div>
                }
              >
                <div className="flex cursor-pointer flex-col items-center">
                  <img src="/svg/mountain-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                  <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                    {new Decimal(data?.infinityBuff.ground.total || 0).times(100).toNumber()}%
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[2.88vw] text-[1.28vw]/[1.6vw] font-semibold xl:mt-9 xl:text-base/5">My Rewards</div>

      <div className="mt-[0.96vw] grid grid-cols-2 gap-[1.76vw] xl:mt-3 xl:gap-5.5">
        <div className="relative flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5">
          <PatternWithoutLine />
          <img src="/img/rank-reward-bg.webp" alt="mdbl" className="absolute left-0 top-0 h-full w-full" />

          <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MDBL</div>
          <div className="flex-center flex-1 text-center text-[1.12vw]/[1.6vw] text-gray-300 xl:text-sm/5">
            Will be revealed at the end of the season.
          </div>
          {/* <div className="mt-[2.56vw] flex items-center justify-center xl:mt-8">
            <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.24vw] xl:h-7" />
            <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
              {formatNumber(1000000000000000000000n, false)}
            </div>
          </div>
          <div className="mt-[2.88vw] text-[0.96vw]/[1.6vw] xl:mt-9 xl:text-xs/5">Will be airdropped to your wallet.</div> */}
        </div>
        <div className="relative flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5">
          <PatternWithoutLine />
          <img src="/img/rank-reward-bg.webp" alt="mdbl" className="absolute left-0 top-0 h-full w-full" />
          <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">eMDBL</div>
          <div className="flex-center flex-1 text-center text-[1.12vw]/[1.6vw] text-gray-300 xl:text-sm/5">
            Will be revealed at the end of the season.
          </div>
          {/* <div className="mt-[2.56vw] flex items-center justify-center xl:mt-8">
            <img src="/svg/emdbl.svg" alt="emdbl" className="h-[2.24vw] xl:h-7" />
            <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
              {formatNumber(1000000000000000000000n, false)}
            </div>
          </div>
          <Button
            className="mt-[2.56vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-8 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
            type="yellow-shallow"
            loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          >
            Claim
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Buff;
