import DragonBorder from '@/app/_components/DragonBorder';
import { clsxm } from '@/utils';
import React from 'react';

export default function MintRecords({ className }: { className?: string }) {
  return (
    <div className={clsxm('relative px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11', className)}>
      <DragonBorder className="inset-2 -z-10" />
      <h1 className="text-sm/5.5">Your mint records</h1>
    </div>
  );
}
