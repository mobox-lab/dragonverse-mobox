'use client';

import { siderCollapsedAtom } from '@/atoms';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { cloneElement, useCallback, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga4';
import { NavItemProps } from '.';
import Button from '../ui/button';
import Popover from '../ui/popover';
import Tooltip from '../ui/tooltip';

export default function SecondNavList({ currentItem }: { currentItem: NavItemProps }) {
  const { icon, label, children, pointLabel } = currentItem;
  const siderCollapsed = useAtomValue(siderCollapsedAtom);
  // TODO: Optimism
  const isActive = false;
  const buttonEle = useMemo(
    () => (
      <Button
        type="unstyled"
        className={clsx(
          'group flex h-[4.32vw] w-full items-center rounded-[0.64vw] bg-white/6 pl-[1.12vw] hover:bg-white/16 xl:h-[54px] xl:rounded-lg xl:pl-3.5',
          {
            '!bg-white/16': isActive,
          },
        )}
      >
        <div
          className={clsx(
            'flex cursor-pointer items-center justify-start gap-[0.64vw] transition-all duration-300 ease-in xl:gap-2',
            isActive ? 'text-white' : 'text-gray-300',
          )}
        >
          {icon
            ? cloneElement(icon, {
                className: clsx('xl:size-6.5 size-[2.08vw] fill-gray-300 stroke-gray-300', {
                  'fill-white stroke-white': isActive,
                }),
              })
            : null}
          <span
            className={clsx(
              `${
                siderCollapsed ? 'hidden' : 'inline-block'
              } w-full flex-1 animate-collapsed text-[1.28vw] font-medium xl:text-base`,
              { 'font-medium': isActive },
            )}
          >
            {label}
          </span>
        </div>
      </Button>
    ),
    [label, icon, isActive, siderCollapsed],
  );
  const renderContent = useCallback(
    () =>
      children?.length ? (
        <div className="flex min-w-[13.44vw] origin-left flex-col rounded-[0.64vw] border border-gray-600 bg-black/60 p-[0.96vw] text-[1.28vw]/[1.76vw] font-semibold backdrop-blur-2xl xl:min-w-[168px] xl:rounded-lg xl:p-3 xl:text-base/5.5 ">
          {children.map(({ key, label, href, to }) => (
            <a
              key={key}
              href={to ?? href}
              onClick={() => {
                ReactGA.event({ category: 'merlin', action: 'main_menu', label: pointLabel });
              }}
              target={to ? '_self' : '_blank'}
              className="rounded-[0.48vw] px-[1.12vw] py-[1.28vw] hover:bg-white/[0.16] xl:rounded-md xl:px-3.5 xl:py-4"
            >
              {label}
            </a>
          ))}
        </div>
      ) : null,
    [children, pointLabel],
  );
  if (isMobile)
    return (
      <Popover
        motionProps={{
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
        }}
        offset={0}
        placement="right"
        render={renderContent}
        className="pl-[2.24vw] xl:pl-7"
      >
        {buttonEle}
      </Popover>
    );
  return (
    <Tooltip
      offsetX={{ mainAxis: 16 }}
      className="-mt-[2.24vw] border-none bg-transparent p-0 pl-[0.96vw] backdrop-blur-unset xl:-mt-7 xl:p-0 xl:pl-3"
      placement="right-start"
      title={renderContent()}
    >
      <div className="w-full">{buttonEle}</div>
    </Tooltip>
  );
}
