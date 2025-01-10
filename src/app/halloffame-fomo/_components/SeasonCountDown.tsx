'use client';

import useCountdown from '@/hooks/useCountdown';

export default function SeasonCountDown({ endTime }: { endTime?: number }) {
  const timeLeft = useCountdown(endTime, 1000, '');

  return (
    <span className="ml-[0.96vw] text-[1.6vw]/[1.92vw] font-semibold capitalize text-yellow xl:ml-3 xl:text-xl/6">
      {timeLeft}
    </span>
  );
}
