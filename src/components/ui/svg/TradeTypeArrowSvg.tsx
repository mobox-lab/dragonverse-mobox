import { TradeType } from '@/constants/enum';
import { clsxm } from '@/utils';

export function TradeTypeArrowSvg({
  className,
  size,
  type,
  onClick,
}: {
  className?: string;
  size?: number;
  type?: TradeType;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={clsxm('group', className)}
      width={size ?? 36}
      height={size ?? 17}
      viewBox="0 0 36 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 8.5L26.7355 0V5.11915H21.2002H16.8004H0V12.6322H26.7355V17L36 8.5Z"
        fill={`url(#${type === TradeType.BUY ? 'paint0_linear_buy' : 'paint0_linear_sell'})`}
      />
      <defs>
        <linearGradient id="paint0_linear_buy" x1="18" y1="8.50003" x2="0.002571" y2="8.28489" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1EDB8C" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1EDB8C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint0_linear_sell" x1="18" y1="8.50003" x2="0.002571" y2="8.28489" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f13361" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f13361" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
