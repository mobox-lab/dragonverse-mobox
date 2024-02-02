import { twMerge } from 'tailwind-merge';

export function CloseSvg({
  className,
  size,
  color,
  onClick,
}: {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={twMerge('group cursor-pointer stroke-[#949FA9]', className)}
      width={size ?? 14}
      height={size ?? 14}
      viewBox="0 0 14 14"
      stroke={color ?? 'current'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="2.05113" y1="2.05056" x2="11.9506" y2="11.9501" stroke="current" strokeWidth="1.4" />
      <line x1="11.9505" y1="2.05039" x2="2.05105" y2="11.9499" stroke="current" strokeWidth="1.4" />
    </svg>
  );
}
