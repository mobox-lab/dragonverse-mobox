import React, { cloneElement, useEffect, useState } from 'react';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import {
  offset,
  useFloating,
  shift,
  flip,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
  Placement,
} from '@floating-ui/react';
import { twMerge } from 'tailwind-merge';

type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (data: { close: () => void }) => React.ReactNode;
  placement?: Placement;
  children: React.JSX.Element;
  className?: string;
  offset?: number;
  motionProps?: MotionProps;
};

function Popover({
  children,
  render,
  open: passedOpen,
  placement,
  onOpenChange,
  className,
  offset: offsetNum,
  motionProps,
}: React.PropsWithChildren<PopoverProps>) {
  const [isOpen, setIsOpen] = useState(passedOpen);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    transform: false,
    onOpenChange: onChange,
    placement,
    middleware: [offset(offsetNum ?? 10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { setReference, setFloating } = refs;
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useDismiss(context), useRole(context)]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <AnimatePresence>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              className={twMerge('z-10 rounded-lg backdrop-blur', className)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, originY: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{ ...floatingStyles }}
              {...motionProps}
              {...getFloatingProps({ ref: setFloating })}
            >
              {render({ close: () => onChange(false) })}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(Popover);

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: security: 🔒 secure API endpoints
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

export const security____secure_API_endpoints: UtilityFunctions = {
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
