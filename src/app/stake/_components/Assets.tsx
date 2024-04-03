'use client';

import DetailSvg from '@/../public/svg/detail.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { clsxm } from '@/utils';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { StakeRedeemType, stakeAndRedeemDialogAtom, stakeAndRedeemTypeAtom } from '@/atoms/stake';

export default function Assets() {
  const setStakeAndRedeemDialog = useSetAtom(stakeAndRedeemDialogAtom);
  const setStakeAndRedeemType = useSetAtom(stakeAndRedeemTypeAtom);

  const [eMDBL, setEMDBL] = useState(4300);
  const [accruedEMDBL, setAccruedEMDBL] = useState(1);
  const [MDBL, setMDBL] = useState(2300);

  const [divEMDBLWidth, setDivEMDBLWidth] = useState('0%');
  const [divAccruedEMDBLWidth, setDivAccruedEMDBLWidth] = useState('0%');
  const [divMDBLWidth, setDivMDBLWidth] = useState('0%');

  useEffect(() => {
    const total = eMDBL + accruedEMDBL + MDBL;
    let widthEMDBL = (eMDBL / total) * 100;
    let widthAccruedEMDBL = (accruedEMDBL / total) * 100;
    let widthMDBL = (MDBL / total) * 100;

    const minPercent = 1;
    const minTotal =
      (widthEMDBL > 0 && widthEMDBL < minPercent ? minPercent : 0) +
      (widthAccruedEMDBL > 0 && widthAccruedEMDBL < minPercent ? minPercent : 0) +
      (widthMDBL > 0 && widthMDBL < minPercent ? minPercent : 0);

    const realTotal =
      (widthEMDBL >= minPercent ? eMDBL : 0) +
      (widthAccruedEMDBL >= minPercent ? accruedEMDBL : 0) +
      (widthMDBL >= minPercent ? MDBL : 0);

    widthEMDBL = widthEMDBL === 0 ? 0 : widthEMDBL >= minPercent ? (eMDBL / realTotal) * (100 - minTotal) : minPercent;
    widthAccruedEMDBL =
      widthAccruedEMDBL === 0
        ? 0
        : widthAccruedEMDBL >= minPercent
          ? (accruedEMDBL / realTotal) * (100 - minTotal)
          : minPercent;
    widthMDBL = widthMDBL === 0 ? 0 : widthMDBL >= minPercent ? (MDBL / realTotal) * (100 - minTotal) : minPercent;

    setDivEMDBLWidth(`${widthEMDBL}%`);
    setDivAccruedEMDBLWidth(`${widthAccruedEMDBL}%`);
    setDivMDBLWidth(`${widthMDBL}%`);
  }, [eMDBL, accruedEMDBL, MDBL]);

  const setDialogOpen = useSetAtom(stakeHistoryDialogOpenAtom);
  return (
    <div
      className={clsxm(
        'relative mt-[2.88vw] h-[28.32vw] border border-gray-600 bg-black/60 px-[1.6vw] py-[3.84vw] backdrop-blur-sm xl:mt-9 xl:h-[354px] xl:px-5 xl:py-12',
      )}
    >
      <PatternWithoutLine />
      <div className="flex h-[1.6vw] w-full bg-white/10 xl:h-5">
        <div style={{ width: divEMDBLWidth }} className="bg-gradient-percent-red relative h-full">
          {divEMDBLWidth !== '0%' && (
            <div className="absolute -right-[1px] top-1/2 z-10 h-[2.24vw] -translate-y-1/2 transform border-l-[2px] border-dashed border-white xl:h-7"></div>
          )}
        </div>
        <div style={{ width: divAccruedEMDBLWidth }} className="bg-gradient-percent-yellow relative h-full">
          {divAccruedEMDBLWidth !== '0%' && (
            <div className="absolute -right-[1px] top-1/2 z-10 h-[2.24vw] -translate-y-1/2 transform border-l-[2px] border-dashed border-white xl:h-7"></div>
          )}
        </div>
        <div style={{ width: divMDBLWidth }} className="bg-gradient-percent-blue h-full"></div>
      </div>
      <div className="mt-[2.24vw] flex items-center justify-between xl:mt-7">
        <div className="flex items-center gap-[2.88vw] xl:gap-9">
          <div>
            <div className="flex items-center">
              <div className="bg-gradient-percent-red h-[1.92vw] w-[0.96vw] xl:h-6 xl:w-3"></div>
              <div className="ml-[0.64vw] text-[1.28vw]/[1.92vw] font-medium xl:ml-2 xl:text-base/6">eMDBL balance</div>
            </div>
            <div className="mt-[0.64vw] text-[1.92vw]/[1.92vw] font-medium text-yellow xl:mt-2 xl:text-2xl/6">4,300 eMDBL</div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="bg-gradient-percent-yellow h-[1.92vw] w-[0.96vw] xl:h-6 xl:w-3"></div>
              <div className="ml-[0.64vw] text-[1.28vw]/[1.92vw] font-medium xl:ml-2 xl:text-base/6">Accrued eMDBL</div>
            </div>
            <div className="mt-[0.64vw] text-[1.92vw]/[1.92vw] font-medium text-yellow xl:mt-2 xl:text-2xl/6">4,300 eMDBL</div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="bg-gradient-percent-blue h-[1.92vw] w-[0.96vw] xl:h-6 xl:w-3"></div>
              <div className="ml-[0.64vw] text-[1.28vw]/[1.92vw] font-medium xl:ml-2 xl:text-base/6">$MDBL balance</div>
            </div>
            <div className="mt-[0.64vw] text-[1.92vw]/[1.92vw] font-medium text-yellow xl:mt-2 xl:text-2xl/6">4,300 $MDBL</div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[1.28vw] xl:gap-4">
          <Button
            onClick={() => setDialogOpen(true)}
            className="flex-center h-[3.52vw] w-[3.52vw] border-none bg-white/10 xl:h-11 xl:w-11"
          >
            <DetailSvg className="h-[1.92vw] w-[1.92vw] xl:h-6 xl:w-6" />
          </Button>
          <Button
            onClick={() => {
              setStakeAndRedeemDialog(true);
              setStakeAndRedeemType(StakeRedeemType.Redeem);
            }}
            className="flex-center-[3.52vw] w-[12.8vw] border-none bg-white/10 xl:h-11 xl:w-40"
          >
            Redeem
          </Button>
          <Button
            type="yellow-dark"
            className={clsxm('h-[3.52vw] w-[12.8vw] font-semibold xl:h-11 xl:w-40')}
            onClick={() => {
              setStakeAndRedeemDialog(true);
              setStakeAndRedeemType(StakeRedeemType.Stake);
            }}
          >
            Stake
          </Button>
        </div>
      </div>

      <div className="mt-[4.8vw] flex items-center justify-between xl:mt-15">
        <div className="flex items-center">
          <div>
            <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Stake Buff</div>
            <div className="flex items-center">
              <div className="text-[1.92vw]/[3.52vw] font-medium text-yellow xl:text-2xl/11">3.2%</div>
              <div className="ml-[1.28vw] text-[0.96vw]/[0.96vw] text-gray-300 xl:ml-4 xl:text-xs/3">08:00 AM UTC UPDATE</div>
            </div>
          </div>

          <div className="ml-[7.68vw] flex h-[7.2vw] w-[22.08vw] items-center justify-between border border-gray-600/50 py-[1.28vw] pl-[2.4vw] pr-[1.76vw] xl:ml-24 xl:h-[90px] xl:w-[276px] xl:py-4 xl:pl-7.5 xl:pr-5.5">
            <div>
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Dragon Ball</div>
              <div className="mt-[0.48vw] text-[1.6vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7.5">0.8%</div>
            </div>
            <div className="relative h-[3.84vw] w-[3.84vw] xl:h-12 xl:w-12">
              <img src="/img/dragon-ball.webp" alt="dragon ball" className="h-full w-full" />
              <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                x5
              </div>
            </div>
          </div>

          <div className="ml-[1.6vw] flex h-[7.2vw] w-[22.08vw] items-center justify-between border border-gray-600/50 py-[1.28vw] pl-[2.4vw] pr-[1.76vw] xl:ml-5 xl:h-[90px] xl:w-[276px] xl:py-4 xl:pl-7.5 xl:pr-5.5">
            <div>
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">MODragon</div>
              <div className="mt-[0.48vw] text-[1.6vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7.5">0.8%</div>
            </div>
            <div className="relative h-[3.84vw] w-[3.84vw] xl:h-12 xl:w-12">
              <img src="/img/modragon-nft-rare.webp" alt="modragon" className="h-full w-full" />
              <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                x5
              </div>
            </div>
          </div>
        </div>

        <Button type="orange" className={clsxm('h-[3.52vw] w-[12.8vw] font-semibold xl:h-11 xl:w-40')}>
          Boost
        </Button>
      </div>
    </div>
  );
}
