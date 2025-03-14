import { chartNeedRefreshAtom, poolInitialAtom } from '@/atoms/lbp';
import { LiquidityBootstrapPool, Pool } from '@/entities/pool';
import { MathLib } from '@/entities/utils';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export type DataPoint = {
  price: number;
  date: Date;
};

type LBPChartDataProps = {
  data?: DataPoint[];
};

export function useLBPChartData({ data }: LBPChartDataProps) {
  const poolInitial = useAtomValue(poolInitialAtom);
  const chartNeedRefresh = useAtomValue(chartNeedRefreshAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentTime = useMemo(() => Date.now(), [chartNeedRefresh]);
  const isEnd = useMemo(() => {
    const endDate = dayjs(Number(poolInitial?.saleEnd.toString()) * 1000);
    const nowDate = dayjs();
    return nowDate.isAfter(endDate);
  }, [poolInitial?.saleEnd]);

  const priceData = useMemo(() => {
    if (!data?.length || !poolInitial) return [];
    const { saleEnd, saleStart } = poolInitial;
    const lbp = new LiquidityBootstrapPool(new Pool(poolInitial));
    const startTimestamp = MathLib.max(saleStart, BigInt(data[data.length - 1].date.valueOf()) / 1000n);
    if (isEnd) return [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
    const step = 300n;
    const timestamps = [];
    for (let timestamp = startTimestamp; timestamp <= saleEnd; timestamp += step) {
      timestamps.push(timestamp);
    }
    timestamps.push(BigInt(currentTime) / 1000n);
    const calculatedPrices = timestamps.sort().map((timestamp) => {
      const price = lbp.predicate(timestamp);
      const date = new Date(parseInt(timestamp.toString()) * 1000);
      return { price, date };
    });
    const isRepeat = dayjs(data[data.length - 1].date).isSame(dayjs(calculatedPrices[0].date), 'm');
    if (isRepeat) calculatedPrices.shift();
    const mergedData = [...data, ...calculatedPrices];
    return mergedData
      .filter(({ date }) => BigInt(date.getTime()) / 1000n >= saleStart)
      .filter(({ date }) => BigInt(date.getTime()) / 1000n <= saleEnd)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [currentTime, data, isEnd, poolInitial]);

  const lastDataItem = useMemo(() => (data ? data[data.length - 1] : null), [data]);

  const curIndex = useMemo(() => {
    if (!data?.length) return 0;
    if (isEnd) return data.length - 1;
    const idx = priceData.findIndex(({ date }) => date.valueOf() / 1000 === Math.floor(currentTime / 1000));
    return idx === -1 ? data.length - 1 : idx;
  }, [currentTime, data?.length, isEnd, priceData]);

  return useMemo(() => ({ priceData, lastDataItem, curIndex }), [priceData, lastDataItem, curIndex]);
}
