import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
interface TagProps extends PropsWithChildren<{}> {
  className?: string;
}
export default function Tag({ children, className }: TagProps) {
  return (
    <p
      className={twMerge(
        'inline-block rounded-sm bg-blue/20 px-[0.64vw] text-[0.96vw]/[1.6vw] text-blue xl:px-2 xl:text-xs/5',
        className,
      )}
    >
      {children}
    </p>
  );
}
