'use client';
import { fontVariants } from '@/constants/font';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import React, { cloneElement, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CloseSvg } from '../svg/CloseSvg';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';

type DialogProps = {
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: React.JSX.Element;
  isDismiss?: boolean;
  disableAnim?: boolean;
  pattern?: boolean;
};

function Dialog({
  className,
  overlayClassName,
  contentClassName,
  render,
  pattern = false,
  open: passedOpen = false,
  children,
  showCloseButton = true,
  onOpenChange,
  isDismiss = false,
  disableAnim,
}: React.PropsWithChildren<DialogProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };
  const motionProps: MotionProps = useMemo(
    () =>
      disableAnim
        ? {}
        : {
            initial: { opacity: 0, scale: 0.85 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.85 },
            transition: { type: 'spring', damping: 20, stiffness: 300 },
          },
    [disableAnim],
  );

  const { refs, context } = useFloating({ open: isOpen, onOpenChange: onChange });
  const { setReference, setFloating } = refs;
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), dismiss]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingOverlay
              lockScroll
              className={twMerge(clsx('z-[60] grid place-items-center bg-black/70'), overlayClassName)}
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  className={twMerge(
                    clsx('overflow-visible border border-gray-600 bg-black/60 backdrop-blur-2xl', ...fontVariants),
                    className,
                  )}
                  {...motionProps}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  {pattern && <PatternWithoutLine className="stroke-yellow" />}
                  <div className={twMerge(clsx('relative p-[2.88vw] xl:p-6'), contentClassName)}>
                    {showCloseButton && (
                      <CloseSvg
                        onClick={() => onChange(false)}
                        className={clsxm('absolute right-[2.4vw] top-[2.4vw] size-3.5 xl:right-7.5 xl:top-7', {
                          'stroke-yellow': pattern,
                        })}
                      />
                    )}
                    {render({
                      close: () => onChange(false),
                    })}
                  </div>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default React.memo(Dialog);
