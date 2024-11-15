import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { getAddress, isAddress } from 'viem';

export * from './shorten';

export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openLink = (url: string) => {
  if (!window) return;
  window.open(url, '_blank');
};

export const isSameAddress = (address1: any, address2: any) => {
  if (!isAddress(address1) || !isAddress(address2)) return false;
  const parsedAddr1 = getAddress(address1);
  const parsedAddr2 = getAddress(address2);
  if (!parsedAddr1 || !parsedAddr2) return false;
  return address1 === parsedAddr2;
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

export const convertScientificToNormal = (value: any) => Number(value).toLocaleString('fullwide', { useGrouping: false });
