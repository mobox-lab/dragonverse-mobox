'use client';

import { ReactNode } from 'react';
import { clsxm } from '@/utils';
import { useIsHome } from '@/hooks/useIsHome';

export default function Container({ children }: { children: ReactNode }) {
  const { isHome } = useIsHome();

  return (
    <div
      className={clsxm('relative ml-[6.88vw] flex-auto overflow-auto transition-all ease-in-out xl:ml-[86px]', {
        '!ml-[19.04vw] xl:!ml-[238px]': isHome,
      })}
    >
      {children}
    </div>
  );
}
