'use client';

import DetailSvg from '@/../public/svg/detail.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { clsxm } from '@/utils';
import { useSetAtom } from 'jotai/react';

export default function Assets() {
  const setDialogOpen = useSetAtom(stakeHistoryDialogOpenAtom);
  return (
    <div
      className={clsxm(
        'relative mt-[2.88vw] h-[28.32vw] border border-gray-600 bg-black/60 px-[1.6vw] py-[1.92vw] backdrop-blur-sm xl:mt-9 xl:h-[354px] xl:px-5 xl:py-7.5',
      )}
    >
      <PatternWithoutLine />
      <Button onClick={() => setDialogOpen(true)} className="flex-center h-[3.52vw] w-[3.52vw] border-none xl:h-11 xl:w-11">
        <DetailSvg className="h-[1.92vw] w-[1.92vw] xl:h-6 xl:w-6" />
      </Button>
    </div>
  );
}
