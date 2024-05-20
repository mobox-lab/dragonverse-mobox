'use client';

import React, { memo, cloneElement, PropsWithChildren, useState, useEffect } from 'react';
import clsx from 'clsx';
import { fontVariants } from '@/constants/font';
import ArrowSVG from '@/../public/svg/arrow.svg?component';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CloseSvg } from '@/components/ui/svg/CloseSvg';

type DrawerProps = {
  open?: boolean;
  className?: string;
  isDismiss?: boolean;
  title?: string;
  children?: React.JSX.Element;
  onOpenChange?: (open: boolean) => void;
  render: (props: { close: () => void }) => React.ReactNode;
};

function Drawer({
  open: passedOpen = false,
  className,
  render,
  onOpenChange,
  isDismiss = true,
  title,
  children,
}: PropsWithChildren<DrawerProps>) {
  const nodeId = useFloatingNodeId();
  const [isOpen, setIsOpen] = useState(false);
  const parentNodeId = useFloatingParentNodeId();

  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, context } = useFloating({ nodeId, open: isOpen, onOpenChange: onChange });
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
      <FloatingNode id={nodeId}>
        <FloatingPortal>
          <AnimatePresence>
            {isOpen && (
              <FloatingOverlay
                lockScroll
                style={{ overflow: 'hidden' }}
                className={clsx('z-[100]', { 'bg-black/70': !parentNodeId })}
              >
                <FloatingFocusManager context={context}>
                  <motion.aside
                    className={clsx(
                      'absolute right-0 h-full border-l border-gray-600 bg-black/60 p-[2.4vw] backdrop-blur-lg xl:p-7.5',
                      ...fontVariants,
                      className,
                    )}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                    {...getFloatingProps({ ref: setFloating })}
                  >
                    {title ? (
                      <div className="mb-[3.84vw] flex h-[2.88vw] items-center justify-between xl:mb-12 xl:h-9">
                        <div className="flex-center gap-[0.64vw] text-[1.6vw]/[1.92vw] font-semibold xl:gap-2 xl:text-xl/6">
                          {parentNodeId && (
                            <div
                              onClick={() => onChange(false)}
                              className="flex-center siz-[2.88vw] cursor-pointer rounded-full border border-gray-400 hover:border-white/80 xl:size-9"
                            >
                              <ArrowSVG className="w-[1.6vw] -rotate-90 fill-white xl:w-5" />
                            </div>
                          )}
                          {title}
                        </div>
                        {!parentNodeId && (
                          <CloseSvg
                            onClick={() => onChange(false)}
                            className="h-[1.12vw] w-[1.12vw] cursor-pointer hover:stroke-white xl:h-3.5 xl:w-3.5"
                          />
                        )}
                      </div>
                    ) : null}
                    {render({ close: () => onChange(false) })}
                  </motion.aside>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </FloatingNode>
    </>
  );
}

export default memo(Drawer);
