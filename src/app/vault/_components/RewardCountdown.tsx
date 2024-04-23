import useCountdown from '@/hooks/useCountdown';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

export default function RewardCountdown() {
  const getTargetTime = useCallback((curTime?: Dayjs) => {
    const now = curTime ?? dayjs();
    const target = now.hour(16).minute(0).second(0).millisecond(0);
    return now.isBefore(target) ? target : target.add(1, 'day');
  }, []);

  const [endTime, setEndTime] = useState(getTargetTime().valueOf() / 1000);
  const countdown = useCountdown(endTime, 1000, '');

  useEffect(() => {
    if (countdown === 'end') {
      setEndTime(getTargetTime(dayjs().add(1, 'm')).valueOf() / 1000);
    }
  }, [countdown, getTargetTime]);

  return (
    <div className="text-[0.96vw]/[1.6vw] font-medium text-yellow xl:text-xs/5">
      Distributed in {countdown === 'end' ? countdown : countdown.slice(2)}
    </div>
  );
}
