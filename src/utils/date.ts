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
