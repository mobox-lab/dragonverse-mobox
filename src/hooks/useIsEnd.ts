import { poolInitialAtom } from '@/atoms/lbp';
import { useAtomValue } from 'jotai';
import useCountdown from './useCountdown';
import { useMemo } from 'react';

export function useIsEnd() {
  const pool = useAtomValue(poolInitialAtom);
  const countdown = useCountdown(Number(pool?.saleEnd));
  return useMemo(() => countdown === 'end', [countdown]);
}
