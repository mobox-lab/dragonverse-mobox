import { clsxm } from '@/utils';
import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type OptionType = {
  label?: string;
  value: string | number;
} | null;

type SegmentedProps = {
  options: OptionType[]; //  
  defaultValue?: string | number; //  
  onChange?: (value: string | number) => void;
  className?: string;
  indicateClass?: string;
  id?: string;
};

export const Segmented = ({ options, defaultValue, onChange, className, id, indicateClass }: SegmentedProps) => {
  const [value, setValue] = useState(() => defaultValue ?? options[0]?.value ?? '');
  const select = useCallback(
    (value: string | number) => {
      setValue(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );
  const isSelected = useCallback((selectedValue: string | number) => value === selectedValue, [value]);
  return (
    <div
      className={twMerge(
        'flex w-fit cursor-pointer select-none rounded-sm bg-white/[0.08] p-1 text-xs font-semibold backdrop-blur-lg',
        className,
      )}
    >
      {options.map((option) => {
        if (!option) return null;
        const { label, value } = option;
        return (
          <div
            className={clsxm(
              'flex-center first:rounded-l-xs last:rounded-r-xs relative px-3 py-1',
              { 'text-white': isSelected(value) },
              { '!font-medium opacity-50': !isSelected(value) },
            )}
            onClick={() => select(value)}
            key={value}
          >
            {label}
            {isSelected(value) && (
              <motion.div
                layoutId={`segmented_selected_${id ?? 'default'}`}
                className={twMerge('absolute inset-0 rounded-sm bg-white/20', indicateClass)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Segmented);
