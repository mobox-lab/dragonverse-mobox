import { Suspense, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { poolInitialAtom } from '@/atoms/lbp';
import useCountdown from '@/hooks/useCountdown';

export function Countdown() {
  const pool = useAtomValue(poolInitialAtom);
  const [timeLeft, setTimeLeft] = useState(0);
  const countdown = useCountdown(timeLeft);

  useEffect(() => {
    if (pool) {
      setTimeLeft(Number(pool.saleEnd));
    }
  }, [pool]);
  if (countdown === 'end') {
    return null;
  }
  return (
    <Suspense fallback={<div className="h-11" />}>
      <div>
        {countdown === 'end' ? null : (
          <div className="flex items-center">
            <div className="text-[1.28vw]/[2.4vw] font-medium xl:text-base/[30px]">Ends in</div>
            <div className="ml-[0.96vw] bg-gradient-text bg-clip-text text-[2.4vw]/[2.4vw] font-semibold text-transparent xl:ml-3 xl:text-[30px]/[30px]">
              {countdown}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
