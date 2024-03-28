import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export * from './shorten';

export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openLink = (url: string) => {
  if (!window) return;
  window.open(url, '_blank');
};

/**
 * Checks if an object has properties
 * @param potentialObj
 * @returns
 * 正则处理数据
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function objHasProp<O, K extends string>(
  potentialObj: O,
  keys: K[],
  // @ts-ignore
): potentialObj is TObj<O, K> {
  if (
    typeof potentialObj !== 'object' ||
    potentialObj === null ||
    potentialObj instanceof Date ||
    potentialObj instanceof Array
  )
    return false;

  if (keys.every((key) => key in potentialObj)) {
    return true;
  }
  return false;
}

export function isDecimal(s: string | number) {
  return s.toString().includes('.');
}
