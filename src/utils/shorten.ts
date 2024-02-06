
import { getAddress } from 'viem';
import Decimal from 'decimal.js-light';

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function shortenStr(
  str?: string,
  option?: {
    startTruncateLength?: number; //  
    pre?: number;
    post?: number;
  },
): string {
  const { pre = 3, post = 5, startTruncateLength = 20 } = option ?? {};
  const len = str?.length;
  if (!len) return '';
  if (len < startTruncateLength) return str;
  return `${str.substring(0, pre)}...${str.substring(len - post)}`;
}

export function shortenShowName(showName?: string, startTruncateLength = 20): string {
  if (!showName) return '';
  const parsed = isAddress(showName);
  // TODO: shorten Rule
  if (parsed) return shortenAddress(showName);
  else if (showName.includes('.p12.dev')) return shortenStr(showName, { post: 3, startTruncateLength });
  else return shortenStr(showName, { startTruncateLength });
}

export function shortenSnapStr(str: string, key?: any): string {
  if (!str) return str;
  let limit;
  if (typeof key === 'number') limit = key;
  if (key === 'symbol') limit = 6;
  if (key === 'name') limit = 64;
  if (key === 'choice') limit = 12;
  if (limit) return str.length > limit ? `${str.slice(0, limit).trim()}...` : str;
  return shortenAddress(str);
}

export function shortenBalance(value: number | Decimal, digits: number = 6): string {
  const current = typeof value === 'number' ? new Decimal(value) : value;
  return current.toDecimalPlaces(3).toString();
}
