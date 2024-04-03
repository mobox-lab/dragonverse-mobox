'use client';
import Backpack from '@/../public/svg/bagpack.svg?component';
import DBAL from '@/../public/svg/dbal.svg?component';
import LitepaperSvg from '@/../public/svg/litepaper.svg?component';
import DragonKey from '@/../public/svg/menu-dragon-key.svg?component';
import Governance from '@/../public/svg/menu-governance.svg?component';
import Rank from '@/../public/svg/rank.svg?component';
import { siderCollapsedAtom } from '@/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import React, { PropsWithChildren, ReactNode, cloneElement, useMemo } from 'react';
import { useLocation } from 'react-use';
import ReactGA from 'react-ga4';
import Button from '../ui/button';
import Popover from '../ui/popover';
import { isMobile } from 'react-device-detect';
import Tooltip from '../ui/tooltip';

interface NavProps {}

const Nav: React.FunctionComponent<NavProps> = (props) => {
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
      key: 'litepaper',
      to: '',
      content: 'Litepaper',
      icon: <LitepaperSvg />,
      point: 'litepaper',
    },
    // {
    //   key: '/dragonkey',
    //   to: '/dragonkey',
    //   content: 'DragonKey',
    //   icon: <DragonKey />,
    //   point: 'dragonkey',
    // },
    // {
    //   key: '/backpack',
    //   to: 'backpack',
    //   content: 'Backpack',
    //   icon: <Backpack />,
    // },
    // {
    //   key: '/halloffame',
    //   to: 'halloffame',
    //   content: 'Hall of Fame',
    //   icon: <Rank />,
    //   point: 'hof',
    // },
    // {
    //   key: '/governance',
    //   to: 'governance',
    //   content: 'Governance',
    //   icon: <Governance />,
    // },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-[2.4vw] xl:gap-7.5">
      {navList.map((nav) => {
        const { key, to, icon, content, point } = nav;
        if (key === 'litepaper')
          return (
            <LightPaperPopover>
              <Button
                type="unstyled"
                key={key}
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
          );
        return (
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
};

const LightPaperPopover = ({ children }: { children: JSX.Element }) => {
  const content = useMemo(
    () => (
      <div className="flex w-[13.44vw] origin-left flex-col rounded-[0.64vw] border border-gray-600 bg-black/60 p-[0.96vw] text-[1.28vw]/[1.76vw] font-semibold backdrop-blur-2xl xl:w-[168px] xl:rounded-lg xl:p-3 xl:text-base/5.5 ">
        <a
          href="https://mobox.gitbook.io/dragonverse-neo-litepaper/"
          target="_blank"
          className="rounded-[0.48vw] px-[1.12vw] py-[1.28vw] hover:bg-white/[0.16] xl:rounded-md xl:px-3.5 xl:py-4"
        >
          English
        </a>
        <a
          href="https://mobox.gitbook.io/dragonverse-neo-litepaper-cn"
          target="_blank"
          className="rounded-[0.48vw] px-[1.12vw] py-[1.28vw] hover:bg-white/[0.16] xl:rounded-md xl:px-3.5 xl:py-4"
        >
          中文版
        </a>
      </div>
    ),
    [],
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
        render={() => content}
        className="pl-[2.24vw] xl:pl-7"
      >
        {children}
      </Popover>
    );
  return (
    <Tooltip
      offsetX={{ mainAxis: 16, crossAxis: -12 }}
      className="border-none bg-transparent p-0 pl-[0.96vw] backdrop-blur-unset xl:p-0 xl:pl-3"
      placement="right-start"
      title={content}
    >
      {children}
    </Tooltip>
  );
};

export default Nav;
