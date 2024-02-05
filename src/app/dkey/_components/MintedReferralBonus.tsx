import DragonBorder from '@/app/_components/DragonBorder';
import { clsxm } from '@/utils';
import React from 'react';

export default function MintedReferralBonus({ className }: { className?: string }) {
  return <div className={clsxm('relative px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11', className)}>Minted Referral Bonus</div>;
}
