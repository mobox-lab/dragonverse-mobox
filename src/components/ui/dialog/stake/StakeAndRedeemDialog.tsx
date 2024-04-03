'use client';
import { StakeRedeemType, stakeAndRedeemDialogAtom, stakeAndRedeemTypeAtom } from '@/atoms/stake';
import { useAtom, useAtomValue } from 'jotai';
import Dialog from '..';
import { useState } from 'react';
import { escapeRegExp } from 'lodash-es';
import { inputRegex } from '@/constants';
import SwitchSVG from '@/../public/svg/switch-02.svg?component';
import CheckedSVG from '@/../public/svg/checked.svg?component';
import Button from '../../button';
import { clsxm } from '@/utils';

export enum PeriodType {
  Day15 = 'DAY15',
  Day90 = 'DAY90',
  Day180 = 'DAY180',
}

const periodData = [
  {
    id: PeriodType.Day15,
    percent: 25,
    days: 15,
  },
  {
    id: PeriodType.Day90,
    percent: 62.5,
    days: 90,
  },
  {
    id: PeriodType.Day180,
    percent: 100,
    days: 180,
  },
];

export default function StakeAndRedeemDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeAndRedeemDialogAtom);
  const [type, setType] = useAtom(stakeAndRedeemTypeAtom);
  const [stakeValue, setStakeValue] = useState<string>('');
  const [redeemValue, setRedeemValue] = useState<string>('');
  const [activeRedeemPeriod, setActiveRedeemPeriod] = useState<PeriodType>(PeriodType.Day15);

  const stakeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setStakeValue(val.replace(/,/g, '.'));
    }
  };

  const redeemValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setRedeemValue(val.replace(/,/g, '.'));
    }
  };

  return (
    <Dialog
      open={isOpen}
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      onOpenChange={setIsOpen}
      render={() => (
        <div>
          {type === StakeRedeemType.Stake ? (
            <div>
              <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Stake</div>
              <div className="mt-[2.56vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-8 xl:text-sm/5">Enter $MDBL stake amount</div>
              <div className="mt-[0.96vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-3 xl:h-11 xl:px-3">
                <input
                  className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] font-medium text-yellow xl:text-base/5'}
                  value={stakeValue}
                  placeholder="Enter amount"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={10}
                  type="text"
                  inputMode="decimal"
                  spellCheck="false"
                  onChange={stakeValueChange}
                />

                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-2">
                  <div className="text-[1.28vw]/[1.6vw] font-medium text-gray-300 xl:text-base/5">$MDBL</div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.92vw] xl:w-6" />
                </div>
              </div>
              <div className="mt-[0.8vw] flex items-center justify-end gap-[0.64vw] xl:mt-2.5 xl:gap-2">
                <div className="text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5">Available: 0.1234</div>
                <div className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue xl:text-sm/5">MAX</div>
              </div>
              <div className="flex-center my-[2.56vw] xl:my-8">
                <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                  <SwitchSVG
                    className="h-[1.76vw] xl:h-5.5"
                    onClick={() => {
                      setType(StakeRedeemType.Redeem);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">You receive:</div>
                <div className="flex-end flex items-center">
                  <div>
                    <span className="text-[1.92vw]/[1.92vw] font-medium text-yellow xl:text-2xl/6">25</span>
                    <span className="text-[1.6vw]/[1.92vw] font-medium text-yellow xl:text-xl/6">&nbsp;eMDBL</span>
                  </div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="ml-[0.48vw] w-[1.92vw] xl:ml-1.5 xl:w-6" />
                </div>
              </div>
              <Button
                type="yellow-dark"
                className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                onClick={() => {}}
              >
                Confirm
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Redeem</div>
              <div className="mt-[2.56vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-8 xl:text-sm/5">Enter $MDBL stake amount</div>
              <div className="mt-[0.96vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-3 xl:h-11 xl:px-3">
                <input
                  className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] font-medium text-yellow xl:text-base/5'}
                  value={redeemValue}
                  placeholder="Enter amount"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={10}
                  type="text"
                  inputMode="decimal"
                  spellCheck="false"
                  onChange={redeemValueChange}
                />

                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-2">
                  <div className="text-[1.28vw]/[1.6vw] font-medium text-gray-300 xl:text-base/5">eMDBL</div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.92vw] xl:w-6" />
                </div>
              </div>
              <div className="mt-[0.8vw] flex items-center justify-end gap-[0.64vw] xl:mt-2.5 xl:gap-2">
                <div className="text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5">Available: 0.1234</div>
                <div className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue xl:text-sm/5">MAX</div>
              </div>
              <div className="flex-center my-[2.56vw] xl:my-8">
                <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                  <SwitchSVG
                    className="h-[1.76vw] xl:h-5.5"
                    onClick={() => {
                      setType(StakeRedeemType.Stake);
                    }}
                  />
                </div>
              </div>

              <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Choose a redemption period</div>
              <div className="">
                {periodData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsxm(
                        'mt-[0.96vw] flex cursor-pointer items-center justify-between border border-gray-600/50 bg-[#111111]/60 pl-[0.64vw] pr-[1.12vw] hover:border-gray-600 hover:bg-[#222222]/60 xl:mt-3 xl:h-11 xl:pl-2 xl:pr-3.5',
                        {
                          'border-yellow/50 bg-yellow/12 hover:border-yellow/50 hover:bg-yellow/12':
                            activeRedeemPeriod === item.id,
                        },
                      )}
                      onClick={() => {
                        setActiveRedeemPeriod(item.id);
                      }}
                    >
                      <div className="flex items-center">
                        {activeRedeemPeriod === item.id ? (
                          <CheckedSVG className="w-[1.6vw] stroke-yellow xl:w-5" />
                        ) : (
                          <div className="flex-center h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5">
                            <div className="h-[0.32vw] w-[0.32vw] rounded-full bg-gray-300 xl:h-1 xl:w-1"></div>
                          </div>
                        )}

                        <div className="ml-[0.64vw] text-[1.12vw]/[1.6vw] font-medium text-yellow xl:ml-2 xl:text-sm/5">
                          {item.days} days
                        </div>
                      </div>
                      <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">{item.percent}% redemption rate</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-[2.56vw] flex items-center justify-between xl:mt-8">
                <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">You receive:</div>
                <div className="flex-end flex items-center">
                  <div>
                    <span className="text-[1.92vw]/[1.92vw] font-medium text-yellow xl:text-2xl/6">25</span>
                    <span className="text-[1.6vw]/[1.92vw] font-medium text-yellow xl:text-xl/6">&nbsp;$MDBL</span>
                  </div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="ml-[0.48vw] w-[1.92vw] xl:ml-1.5 xl:w-6" />
                </div>
              </div>
              <Button
                type="yellow-dark"
                className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                onClick={() => {}}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      )}
    />
  );
}
