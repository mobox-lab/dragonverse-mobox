import { useAtomValue, useSetAtom } from 'jotai';
import { latestMDBLPriceAtom, poolInitialAtom } from '@/atoms/lbp';
import { useEffect, useMemo, useState } from 'react';
import { LiquidityBootstrapPool, Pool } from '@/entities/pool';
import { floatToBigInt } from '@/entities/bigint';

export function useLatestMDBLPrice() {
  const poolInitial = useAtomValue(poolInitialAtom);
  const setLatestMDBLPrice = useSetAtom(latestMDBLPriceAtom);
  const [currentTime, setCurrentTime] = useState(BigInt(Date.now()) / 1000n);
  const pool = useMemo(() => poolInitial && new LiquidityBootstrapPool(new Pool(poolInitial)), [poolInitial]);

  useEffect(() => {
    setCurrentTime(BigInt(Date.now()) / 1000n);
    const interval = setInterval(() => setCurrentTime(BigInt(Date.now()) / 1000n), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pool) return;
    const floatValue = pool.predicate(currentTime);
    const value = floatToBigInt(floatValue, 18);
    setLatestMDBLPrice({ value, floatValue });
  }, [currentTime, pool, setLatestMDBLPrice]);
}
