import { dragonBallUnboxDialogOpenAtom } from '@/atoms';
import { clsxm } from '@/utils';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import Button from '../../button';
import { UnboxValue } from './DragonBallUnboxDialog';
export default function FinishCard({ values }: { values: UnboxValue[] }) {
  const setIsOpen = useSetAtom(dragonBallUnboxDialogOpenAtom);
  const finalResult = useMemo(() => {
    const { minted, arr } = values.reduce(
      (pre, cur) => {
        pre.minted += cur.value;
        const { arr } = pre;
        const i = arr.findIndex((v) => cur.value === v.value);
        if (i !== -1) arr[i].num++;
        return pre;
      },
      {
        minted: 0,
        arr: [
          {
            value: 500,
            num: 0,
          },
          {
            value: 300,
            num: 0,
          },
          {
            value: 200,
            num: 0,
          },
          {
            value: 100,
            num: 0,
          },
          {
            value: 80,
            num: 0,
          },
        ],
      },
    );
    return {
      quantity: values?.length ?? 0,
      minted,
      total: minted,
      arr,
    };
  }, [values]);

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-[1.92vw]/[2.4vw] font-medium xl:text-2xl/7.5">Congrats !</h1>
      <p className="mt-[2.4vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-7.5 xl:text-sm/6">
        Quantity: <span className="text-[1.6vw]/[1.92vw] xl:text-xl/6">{finalResult.quantity}</span>
      </p>
      <div className="mt-[0.96vw] grid grid-cols-5 gap-[1.28vw] xl:mt-3 xl:gap-4">
        {finalResult.arr.map(({ value, num }, idx) => (
          <div key={idx} className="flex flex-col items-center gap-[0.32vw] font-medium xl:gap-1">
            <div className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/7.5">
              {value} <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[1.92vw] xl:w-7.5" />
            </div>
            <div
              className={clsxm('text-[1.28vw]/[1.92vw] xl:text-base/6', {
                'text-gray-300': !num,
              })}
            >
              X{num}
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-[0.96vw] mt-[1.28vw] h-px border-0 bg-white/25 xl:mb-3 xl:mt-4" />
      <p className="flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-3 xl:text-sm/6">
        Minted:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/6">
          {finalResult.minted}
          <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[2.4vw] xl:w-7.5" />
        </span>
      </p>
      {/* <p className="mt-[0.64vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm/6">
        Buff:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-green xl:text-xl/6">{finalResult.buff}%</span>
      </p> */}
      <p className="mt-[0.64vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm/6">
        Total QI earned:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/6">
          {finalResult.total}
          <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[1.92vw] xl:w-7.5" />
        </span>
      </p>
      <Button
        type="yellow"
        className="shadow-text-unbox mt-[2.4vw] flex h-[3.52vw] flex-col items-center justify-center gap-[0.32vw] text-[1.28vw]/[1.28vw] font-semibold xl:mt-7.5 xl:h-11 xl:gap-1 xl:text-base/4"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Confirm
      </Button>
    </div>
  );
}
