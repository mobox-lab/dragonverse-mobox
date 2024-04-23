'use client';

import React, { cloneElement, useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import ReactGA from 'react-ga4';
import Button from '../ui/button';
import { useAtomValue } from 'jotai';
import { useLocation } from 'react-use';
import { siderCollapsedAtom } from '@/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import DBAL from '@/../public/svg/dbal.svg?component';
import Events from '@/../public/svg/events.svg?component';
import LitepaperSvg from '@/../public/svg/litepaper.svg?component';
import LightPaperPopover from '@/components/nav/LightPaperPopover';
import Stake from '@/../public/svg/stake.svg?component';

export default function Nav() {
  const siderCollapsed = useAtomValue(siderCollapsedAtom);
  const isMounted = useIsMounted();
  const location = useLocation();
  const activeRouter = useMemo(() => {
    if (!isMounted) return '/';
    const { pathname = '/' } = location;
    return pathname;
  }, [location, isMounted]);

  const navList = [
    {
      key: '/',
      to: '/',
      content: '$MDBL Launch',
      icon: <DBAL />,
      point: 'mdbl',
    },
    {
      key: '/vault',
      to: '/vault',
      content: 'Vault',
      icon: <Stake />,
      point: 'vault',
    },
    {
      key: '/events',
      to: '/events',
      content: 'Events',
      icon: <Events />,
      point: 'events',
    },
    {
      key: 'litepaper',
      to: '',
      content: 'Litepaper',
      icon: <LitepaperSvg />,
      point: 'litepaper',
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center gap-[2.4vw] xl:gap-7.5">
      {navList.map((nav) => {
        const { key, to, icon, content, point } = nav;
        return key === 'litepaper' ? (
          <LightPaperPopover key={key}>
            <Button
              type="unstyled"
              className={clsx(
                'group flex h-[4.32vw] w-full items-center rounded-[0.64vw] bg-white/6 pl-[1.12vw] hover:bg-white/16 xl:h-[54px] xl:rounded-lg xl:pl-3.5',
                {
                  '!bg-white/16': key === activeRouter,
                },
              )}
            >
              <div
                className={clsx(
                  'flex cursor-pointer items-center justify-start gap-[0.64vw] transition-all duration-300 ease-in xl:gap-2',
                  key === activeRouter ? 'text-white' : 'text-gray-300',
                )}
              >
                {cloneElement(icon, {
                  className: clsx('xl:w-6.5 w-[2.08vw] fill-gray-300 stroke-gray-300', {
                    'fill-white stroke-white': key === activeRouter,
                  }),
                })}
                <span
                  className={clsx(
                    `${
                      siderCollapsed ? 'hidden' : 'inline-block'
                    } w-full flex-1 animate-collapsed text-[1.28vw] font-medium xl:text-base`,
                    { 'font-medium': key === activeRouter },
                  )}
                >
                  {content}
                </span>
              </div>
            </Button>
          </LightPaperPopover>
        ) : (
          <Link
            key={key}
            href={to}
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'main_menu', label: point });
            }}
            className={clsx(
              'group flex h-[4.32vw] w-full items-center rounded-[0.64vw] bg-white/6 pl-[1.12vw] hover:bg-white/16 xl:h-[54px] xl:rounded-lg xl:pl-3.5',
              {
                '!bg-white/16': key === activeRouter,
              },
            )}
          >
            <div
              className={clsx(
                'flex cursor-pointer items-center justify-start gap-[0.64vw] transition-all duration-300 ease-in xl:gap-2',
                key === activeRouter ? 'text-white' : 'text-gray-300',
              )}
            >
              {cloneElement(icon, {
                className: clsx('xl:w-6.5 w-[2.08vw] fill-gray-300 stroke-gray-300', {
                  'fill-white stroke-white': key === activeRouter,
                }),
              })}
              <span
                className={clsx(
                  `${
                    siderCollapsed ? 'hidden' : 'inline-block'
                  } w-full flex-1 animate-collapsed text-[1.28vw] font-medium xl:text-base`,
                  { 'font-medium': key === activeRouter },
                )}
              >
                {content}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
