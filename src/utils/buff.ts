import { BuffNumberDataItem } from '@/apis/types';

export function getBuffFromValue(data: BuffNumberDataItem[], value: number): number {
  if (value === 0) {
    return 0;
  }
  for (let i = 0; i < data.length; i++) {
    if (value < data[i].min) {
      if (i > 0) {
        return data[i - 1].buff;
      }
      return 0;
    } else {
      if (i === data.length - 1 && value >= data[i].min) {
        return data[i].buff;
      }
    }
  }
  return 0;
}

export function getBuffDataFromValue(data: BuffNumberDataItem[], value: number): BuffNumberDataItem[] {
  if (value === 0) {
    return [data[0], data[1]];
  }
  for (let i = 0; i < data.length; i++) {
    if (value < data[i].min) {
      if (i > 0) {
        if (i === data.length) {
          return [data[i - 1]];
        }
        return [data[i - 1], data[i]];
      } else {
        return [data[0], data[1]];
      }
    } else {
      if (i === data.length - 1 && value >= data[i].min) {
        return [data[i]];
      }
    }
  }
  return [data[0], data[1]];
}

export function getBuffFromValueForString(data: { value: string; buff: number }[], value: string | undefined): number {
  const item = data.find((item) => item.value === value);
  if (item) {
    return item.buff;
  } else {
    return 0;
  }
}

export function getBuffDataFromValueForString(
  data: { value: string; buff: number }[],
  value: string | undefined,
): { value: string; buff: number }[] {
  if (!value) {
    return [data[0], data[1]];
  }
  const item = data.find((item) => item.value === value);
  if (item) {
    const index = data.findIndex((o) => o.value === value);
    if (index === data.length - 1) {
      return [item];
    } else {
      return [item, data[index + 1]];
    }
  } else {
    return [data[0], data[1]];
  }
}
