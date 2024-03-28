import { clsxm } from '@/utils';
import React from 'react';

interface NumberInputProps {
  minus?: () => void;
  plus?: () => void;
  value: number;
  countChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  actionClass?: string;
  inputClass?: string;
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  minus,
  value,
  plus,
  countChanged,
  className,
  actionClass,
  inputClass,
}) => {
  return (
    <div className={clsxm('flex h-[3.2vw] w-[12.8vw] bg-white/10 py-1 backdrop-blur-lg xl:h-10 xl:w-[166px]', className)}>
      <div
        className={clsxm(
          'relative flex basis-[3.2vw] cursor-pointer select-none items-center justify-center text-[2.4vw]/[2.4vw] font-medium xl:basis-10 xl:text-3xl/7.5',
          actionClass,
        )}
        onClick={minus}
      >
        -<div className={clsxm('absolute right-0 top-1/2 h-[80%] w-[1px] -translate-y-1/2 transform bg-gray')}></div>
      </div>
      <div className="flex-1">
        <input
          type="number"
          className={clsxm(
            'h-full w-full bg-transparent text-center text-[1.6vw]/[1.6vw] font-medium xl:text-xl/5',
            inputClass,
          )}
          value={value}
          onChange={countChanged}
        />
      </div>
      <div
        className={clsxm(
          'relative flex flex-none basis-[3.2vw] cursor-pointer select-none items-center justify-center text-[1.92vw]/[1.92vw] font-medium xl:basis-10 xl:text-2xl/6',
          actionClass,
        )}
        onClick={plus}
      >
        +<div className={clsxm('absolute left-0 top-1/2 h-[80%] w-[1px] -translate-y-1/2 transform bg-gray')}></div>
      </div>
    </div>
  );
};

export default NumberInput;
