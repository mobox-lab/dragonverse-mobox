import dayjs, { Dayjs } from 'dayjs';

export function computeTimeDifference(targetTime: Dayjs, now: Dayjs = dayjs()) {
  const diffInDays = targetTime.diff(now, 'day');
  const diffInHours = targetTime.diff(now, 'hour');
  const diffInMinutes = targetTime.diff(now, 'minute');
  const diffInSeconds = targetTime.diff(now, 'second');

  if (diffInDays > 0) {
    return { value: diffInDays, str: 'Days' };
  } else if (diffInHours > 0) {
    return { value: diffInHours, str: 'Hours' };
  } else if (diffInMinutes > 0) {
    return { value: diffInMinutes, str: 'Minutes' };
  } else {
    return { value: diffInSeconds, str: 'Seconds' };
  }
}

export function computeUnlockTimeStr(endTime: Dayjs, now?: Dayjs) {
  const diffInDays = endTime.diff(now, 'day');
  const diffInHours = endTime.diff(now, 'hour');
  const diffInMinutes = endTime.diff(now, 'minute');

  if (diffInDays > 0) {
    return { value: diffInDays, str: 'days' };
  } else if (diffInHours > 0) {
    return { value: diffInHours, str: 'hours' };
  } else {
    return { value: diffInMinutes, str: 'minutes' };
  }
}
