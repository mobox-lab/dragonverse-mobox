import React, { cloneElement, useRef, useState } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  OffsetOptions,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import { fontVariants } from '@/constants/font';

type TooltipProps = {
  offsetX?: OffsetOptions;
  title: React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
  className?: string;
};

export default function Tooltip({ children, title, placement = 'top', offsetX, className }: TooltipProps) {
  const arrowRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetX ?? 5), shift(), arrow({ element: arrowRef }), flip({ fallbackAxisSideDirection: 'start' })],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 20, delay: { close: 60 } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
  ]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference, ...children.props }))}
      <FloatingPortal id="floating-tooltip">
        {open && (
          <div
            className={clsx(
              'border border-gray-600 bg-gray-750 p-[1.28vw] text-[0.96vw]/[1.44vw] xl:p-4 xl:text-xs/3.5',
              className,
              ...fontVariants,
            )}
            ref={refs.setFloating}
            style={{
              position: strategy,
              zIndex: 100,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {title}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
