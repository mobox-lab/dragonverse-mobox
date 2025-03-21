import clsx from 'clsx';
import React, { forwardRef, LegacyRef } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';

type ButtonProps = {
  className?: string;
  loadingClassName?: string;
  type?:
    | 'red'
    | 'green'
    | 'bordered'
    | 'pattern'
    | 'blue'
    | 'yellow'
    | 'yellow-light'
    | 'yellow-dark'
    | 'orange'
    | 'yellow-shallow'
    | 'yellow-shallow-2'
    | 'unstyled';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
};

const bg = {
  default: 'bg-[#2E2E2E] border-[1px] border-[#DDCFE959]',
  red: 'border-red-500 border-[2px] bg-gradient-red',
  orange: 'button-orange bg-gradient-orange',
  green: 'border-green-500 border-[2px] bg-gradient-green',
  yellow: 'button-yellow bg-gradient-yellow',
  'yellow-light': 'button-yellow-light bg-gradient-yellow-light',
  'yellow-dark': 'button-yellow-dark bg-gradient-yellow-dark',
  'yellow-shallow': 'bg-[#554c35]/80 backdrop-blur-sm',
  'yellow-shallow-2': 'bg-[#4D442E]/50 hover:bg-[#4D442E]/80 hover:after:opacity-0',
  bordered: 'border-white border-[1px] bg-transparent',
  pattern: 'bg-black/60 border-[1px] border-gray-600 backdrop-blur-sm',
  blue: 'bg-blue/20 hover:bg-blue/30 text-blue',
};

function Loading({ className }: { className?: string }) {
  return (
    <LoadingSvg
      className={clsx(
        'relative -top-[0.16vw] mr-[0.32vw] inline h-[1.28vw] w-[1.28vw] animate-spin fill-white xl:-top-[2px] xl:mr-1 xl:h-4 xl:w-4',
        className,
      )}
    />
  );
}

const Button = forwardRef(function ButtonInner(
  { className, children, onClick, disabled, type, loading, htmlType, loadingClassName }: React.PropsWithChildren<ButtonProps>,
  ref: LegacyRef<HTMLButtonElement>,
) {
  return (
    <button
      type={htmlType}
      ref={ref}
      onClick={loading ? undefined : onClick}
      disabled={disabled}
      className={twMerge(
        type === 'unstyled'
          ? null
          : clsx(
              'relative overflow-hidden fill-white p-[0.64vw] text-center text-[1.28vw]/[1.92vw] font-medium xl:p-2 xl:text-base',
              {
                'after:absolute after:inset-0 after:bg-white after:opacity-0 hover:after:opacity-20': !disabled && !loading,
              },
              'disabled:cursor-not-allowed disabled:bg-[#2E2E2E] disabled:text-gray-300',
              loading && 'cursor-not-allowed',
              disabled ? bg['default'] : bg[type || 'default'],
            ),
        className,
      )}
    >
      <>
        {loading ? <Loading className={loadingClassName} /> : null}
        {children}
      </>
      {type === 'pattern' && <PatternWithoutLine />}
    </button>
  );
});

export default React.memo(Button);
