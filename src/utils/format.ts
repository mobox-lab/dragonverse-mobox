export const getNumberFormatter = (options?: object) => new Intl.NumberFormat('en', options || { notation: 'standard' });

export const compactNumberFormatter = getNumberFormatter({
  notation: 'compact',
  compactDisplay: 'short',
});

export const defaultNumberFormatter = getNumberFormatter(
  // format with two decimal places
  { maximumFractionDigits: 2 },
);
export const formatNumber = (number: number, formatter?: Intl.NumberFormat) => {
  formatter = formatter || defaultNumberFormatter;

  return formatter.format(number);
};

export const formatCompactNumber = (number: number) => formatNumber(number, compactNumberFormatter);

export function toSignificant(num: number | string, digits: number = 6) {
  const n = typeof num === 'string' ? Number(num) : num;
  const formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: digits });

  return formatter.format(n);
}
