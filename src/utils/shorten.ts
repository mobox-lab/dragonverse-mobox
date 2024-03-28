import { getAddress } from 'viem';
import Decimal from 'decimal.js-light';
import { bigIntToFloat } from '@/entities/bigint';

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address?: string, chars = 5): string {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
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

export function shortenBalance(value: number | Decimal, digits: number = 3): string {
  const current = typeof value === 'number' ? new Decimal(value) : value;
  return current.toDecimalPlaces(digits ?? 3).toString();
}

export function shortenNumber(value: number, digits: number = 4, startTruncateValue: number = 100_000): string {
  if (value < startTruncateValue) return value.toLocaleString('en-US');
  const k = { type: 'K', num: 1_000 };
  const m = { type: 'M', num: 1_000_000 };
  const b = { type: 'B', num: 1_000_000_000 };
  const t = { type: 'T', num: 1_000_000_000_000 };
  if (value < k.num * 100) {
    return value.toLocaleString('en-US');
  }
  if (value < m.num) {
    return (value / k.num).toPrecision(digits) + k.type;
  }
  if (value < b.num) {
    return (value / m.num).toPrecision(digits) + m.type;
  }
  if (value < t.num) {
    return (value / b.num).toPrecision(digits) + b.type;
  }
  return (value / t.num).toPrecision(digits) + t.type;
}

const utfNum = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
export function shortenDigits(value: number | Decimal, digits = 5): string {
  const current = new Decimal(value);
  Decimal.set({ toExpNeg: -20 });
  if (current.gte(10000)) return shortenNumber(current.toNumber());
  const num = Math.floor(current.toNumber());
  const pointStr = current
    .sub(num)
    .toSignificantDigits(digits - 1)
    .toString();
  if (!pointStr.includes('.')) return current.toDecimalPlaces(digits).toString();
  let [_, suffix] = pointStr.split('.');
  let zeros = 0;
  for (let i = 0; i < suffix.length; i++) {
    if (suffix[i] === '0') zeros++;
    else break;
  }
  if (zeros <= 4) return current.toDecimalPlaces(digits).toString();
  if (zeros <= 10) {
    const subscript = utfNum[zeros ?? 0];
    const rest = suffix.slice(zeros);
    return `${num}.0${subscript}${rest}`;
  }
  //  
  const subscript = zeros
    .toString()
    .split('')
    .map((num) => utfNum[parseInt(num)])
    .join('');
  const rest = suffix.slice(zeros);
  return `${num}.0${subscript}${rest}`;
}
export function formatNumber(num?: bigint, float = true) {
  let numStr = bigIntToFloat({
    amount: num ?? 0n,
    decimals: 18,
  }).toString();
  let decimalIndex = numStr.indexOf('.');
  if (decimalIndex !== -1 && float) {
    //  
    let intPart = numStr.slice(0, decimalIndex).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let decimalPart = numStr.slice(decimalIndex, decimalIndex + 6);
    //  
    while (decimalPart.endsWith('0')) {
      decimalPart = decimalPart.slice(0, -1);
    }
    return `${intPart}${decimalPart}`;
  } else if (decimalIndex !== -1) {
    return numStr.slice(0, decimalIndex).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    //  
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function retainDigits(str: string, digits = 5): string {
  let decimalIndex = str.indexOf('.');
  if (decimalIndex !== -1) {
    let intPart = str.slice(0, decimalIndex);
    let decimalPart = str.slice(decimalIndex + 1);
    let firstNonZeroIndex = decimalPart.search(/[^0]/);
    if (firstNonZeroIndex !== -1) {
      let significantDigits = decimalPart.slice(firstNonZeroIndex, firstNonZeroIndex + digits);
      return intPart + '.' + '0'.repeat(firstNonZeroIndex) + significantDigits;
    } else {
      return intPart;
    }
  } else {
    return str;
  }
}
