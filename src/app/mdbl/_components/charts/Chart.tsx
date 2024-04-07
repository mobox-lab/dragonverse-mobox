import TravellerSvg from '@/../public/svg/chart-brush-traveller.svg?component';
import RefreshSvg from '@/../public/svg/refresh_2.svg?component';
import { latestBTCPriceAtom, poolInitialAtom } from '@/atoms/lbp';
import { useFetchPriceHistoryList } from '@/hooks/charts/useFetchPriceHistoryList';
import { useLBPChartData } from '@/hooks/lbp/useLBPChartData';
import { clsxm, shortenDigits } from '@/utils';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import _ from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

export default function Chart() {
  const { data } = useFetchPriceHistoryList();
  const { priceData, curIndex } = useLBPChartData({ data });
  const latestBTCPrice = useAtomValue(latestBTCPriceAtom);
  const poolInitial = useAtomValue(poolInitialAtom);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);

  const setIndex = useCallback((startIndex: number, endIndex: number) => {
    setStartIndex(startIndex);
    setEndIndex(endIndex);
  }, []);

  useEffect(() => {
    if (!priceData?.length || !poolInitial?.saleStart) return;
    const poolStart = dayjs(Number(poolInitial?.saleStart.toString()) * 1000);
    const poolEnd = dayjs(Number(poolInitial?.saleEnd.toString()) * 1000);
    const cur = dayjs();
    if (cur.isAfter(poolEnd) || cur.isBefore(poolStart)) {
      setIndex(0, priceData.length - 1);
      return;
    }
    const s = cur.subtract(48, 'h');
    const e = cur.add(24, 'h');
    if (poolStart.isAfter(s)) {
      const endIdx = priceData.findIndex(({ date }) => !dayjs(date).isBefore(e));
      setIndex(0, endIdx);
      return;
    }
    if (poolEnd.isBefore(e)) {
      const startIdx = priceData.findIndex(({ date }) => !dayjs(date).isBefore(s));
      setIndex(startIdx, priceData.length - 1);
      return;
    }
    const startIdx = priceData.findIndex(({ date }) => !dayjs(date).isBefore(s));
    const endIdx = priceData.findIndex(({ date }) => !dayjs(date).isBefore(e));
    setIndex(startIdx, endIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolInitial?.saleStart, priceData.length, setIndex]);

  const onBrushChange = useCallback(
    (nIdx: any) => {
      if (!isDragging) setIsDragging(true);
      let sIndex = nIdx?.startIndex ?? 0;
      let eIndex = nIdx?.endIndex ?? priceData.length;
      if (eIndex - sIndex < 11) return; // 12*5 = 60min
      setIndex(sIndex, eIndex);
    },
    [isDragging, priceData.length, setIndex],
  );

  const xTicks = useMemo(() => {
    if (!priceData.length || endIndex === startIndex) return [0];
    const s = dayjs(priceData[startIndex]?.date);
    const e = dayjs(priceData[endIndex]?.date);
    if (e.diff(s, 'd') <= 2) {
      const ticks: number[] = [];
      const diff = e.diff(s);
      const diffUnit = Math.floor(diff / 5);
      for (let i = s.valueOf(); !dayjs(i).isAfter(e); i += diffUnit) {
        ticks.push(i);
      }
      return ticks;
    }
    const ticks: number[] = [s.valueOf()];
    let cur = s.add(1, 'd');
    for (; !cur.isAfter(e); cur = cur.add(1, 'd')) {
      ticks.push(cur.startOf('day').valueOf());
    }
    ticks.push(e.startOf('day').valueOf());
    ticks.push(e.valueOf());
    return _.uniq(ticks);
  }, [priceData, endIndex, startIndex]);

  const getXTickFormatter = useCallback(
    (value: number, index: number) => {
      if (!priceData.length || endIndex === startIndex) return '';
      const s = dayjs(priceData[startIndex]?.date);
      const e = dayjs(priceData[endIndex]?.date);
      if (e.diff(s, 'd') > 2) {
        if (!xTicks?.length) return dayjs(value).format('MMM DD');
        if (index === 0) return '';
        if (dayjs(xTicks[index]).date() === dayjs(xTicks[index - 1]).date()) return '';
        return dayjs(value).format('MMM DD');
      }
      return dayjs(value).format('MM-DD HH:mm');
    },
    [priceData, endIndex, startIndex, xTicks],
  );

  const getYTickFormatter = useCallback(
    (value: number) => '$' + shortenDigits(value * latestBTCPrice.floatValue, 5),
    [latestBTCPrice.floatValue],
  );

  const [offset, setOffset] = useState('50%');

  useEffect(() => {
    if (endIndex - startIndex < 11) return; // 12*5 = 60min
    const grid: any = document.getElementById('rechart-grid');
    if (!grid) return;
    const referPoint: any = document.getElementById('rechart-referer-line');
    if (!referPoint) {
      if (endIndex <= curIndex) setOffset('100%');
      else setOffset('0%');
      return;
    }
    const cur = referPoint?.attributes?.x1?.value - grid?.attributes?.x1?.value;
    const total = grid?.attributes?.width?.value;
    const offset = (cur / total) * 100;
    setOffset(`${offset}%`);
  }, [curIndex, endIndex, startIndex]);

  return (
    <ErrorBoundary
      fallback={
        <div className="flex-center h-full text-[1.12vw]/[1.92vw] font-medium xl:gap-3 xl:text-sm/6">
          <div className="flex items-center gap-[0.64vw] text-gray-300 xl:gap-2">
            Loading error
            <p
              className="flex cursor-pointer items-center gap-[0.32vw] text-[1.12vw]/[1.92vw] font-medium text-blue xl:gap-1 xl:text-sm/6"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh Page <RefreshSvg className="h-[1.28vw] w-[1.28vw] fill-blue xl:h-4 xl:w-4" />
            </p>
          </div>
        </div>
      }
    >
      <div className="-ml-[5.12vw] h-full xl:-ml-15 xs:-ml-[11vw]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF9F77" stopOpacity={0.2} />
                <stop offset={offset} stopColor="#FFD600" stopOpacity={0.2} />
                <stop offset={offset} stopColor="#ff9f77" stopOpacity={0.02} />
                <stop offset="100%" stopColor="#ffd600" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF9F77" stopOpacity={1} />
                <stop offset={offset} stopColor="#FFD600" stopOpacity={1} />
                <stop offset={offset} stopColor="#FF9F77" stopOpacity={0.36} />
                <stop offset="100%" stopColor="#FFD600" stopOpacity={0.36} />
              </linearGradient>
              <linearGradient id="brushColor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF9F77" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FFD600" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid id="rechart-grid" vertical={false} strokeDasharray="3 0" stroke="#ffffff40" />
            <Area
              type="monotone"
              dataKey="price"
              stroke="url(#colorLine)"
              strokeWidth={isMobile ? 1 : 3}
              fill="url(#colorArea)"
            />
            <XAxis
              dataKey="date"
              type="number"
              ticks={xTicks}
              scale="time"
              interval={0}
              domain={['dataMin', 'dataMax']}
              tickFormatter={getXTickFormatter}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              type="number"
              domain={[0, (dataMax: number) => dataMax * 1.1]}
              tickFormatter={getYTickFormatter}
              tick={<CustomTick />}
            />
            <ReferenceLine
              id="rechart-referer-line"
              x={priceData[curIndex]?.date.valueOf()}
              stroke="red"
              className="invisible"
              label="Current Time"
            />
            <Tooltip
              cursor={{
                stroke: '#ffffff40',
                strokeWidth: 2,
                strokeDasharray: '5 5',
              }}
              content={(props) => <ChartTooltip {...props} />}
            />
            <Brush
              dataKey="date"
              traveller={(props: any) => <TravellerSvg {...props} height="1em" viewBox="0 0 5 24" />}
              fill="#ffffff1a"
              stroke="#6f77844d"
              gap={5}
              className={clsxm('overflow-visible text-[1.92vw] xl:text-2xl', { invisible: isMobile })}
              tickFormatter={() => ''}
              startIndex={startIndex}
              endIndex={endIndex}
              onDragEnd={() => setIsDragging(false)}
              onChange={onBrushChange}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {!isMobile && (
        <div className="-mt-[2vw] flex w-full items-center justify-between xl:-mt-6">
          <p>{dayjs(priceData[0]?.date).format('MM-DD')}</p>
          <p> {priceData.length ? dayjs(priceData[priceData.length - 1]?.date).format('MM-DD') : ''}</p>
        </div>
      )}
    </ErrorBoundary>
  );
}

const CustomTick = (props: any) => {
  const { tickFormatter, payload, index } = props;
  return (
    <Text {...props} textAnchor="start" orientation="left" className="recharts-cartesian-axis-tick-value">
      {tickFormatter(payload?.value, index)}
    </Text>
  );
};
