'use client';

import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';
import ArrowSvg from '@/../public/svg/arrow.svg?component';

export default function Assets() {
  return (
    <div
      className={clsxm('relative mt-[3.84vw] border border-gray-600 bg-black/60 p-[3.2vw] backdrop-blur-sm xl:mt-12 xl:p-10')}
    >
      <PatternWithoutLine />
      <img src="/img/end-bg.webp" alt="bg" className="absolute bottom-0 right-0" />
      <div>
        <h6 className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">Dragon Vault V1 Ended</h6>
        <ul className="mt-[0.96vw] xl:mt-3">
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · Dragon Vault V1 has ended. From 23rd Dec 2024 you cannot stake $MDBL via this page. And the Daily Reward(Accrued
            eMDBL) will no longer distribute.
          </li>
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · You can still click on {'Redeem'} to convert eMDBL to $MDBL. Noted that Redeem 100% of your staked amount needs
            120 days.
          </li>
          <li className="text-[0.96vw]/[1.92vw] xl:text-xs/6">
            · You can claim Accrued eMDBL at any time however there will be no more reward.
          </li>
        </ul>

        <h6 className="mt-[2.88vw] text-[1.28vw]/[1.92vw] font-semibold xl:mt-9 xl:text-base/6">
          Join Dragon Vault V2 build on MerlinSwap
        </h6>
        <div className="mt-[0.96vw] flex cursor-pointer items-center text-[1.12vw]/[1.92vw] text-blue xl:mt-3 xl:text-sm/6">
          Click to join our brand new LP Farm Campaign{' '}
          <ArrowSvg className={clsxm('h-[0.96vw] w-[0.96vw] rotate-90 overflow-visible fill-blue xl:h-3 xl:w-3', {})} />
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function: perf: ⚡ reduce network requests
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const perf____reduce_network_requests: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
