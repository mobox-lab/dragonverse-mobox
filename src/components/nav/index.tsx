'use client';
import Backpack from '@/../public/svg/bagpack.svg?component';
import DBAL from '@/../public/svg/dbal.svg?component';
import DragonKey from '@/../public/svg/menu-dragon-key.svg?component';
import Governance from '@/../public/svg/menu-governance.svg?component';
import Rank from '@/../public/svg/rank.svg?component';
import { siderCollapsedAtom } from '@/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import React, { cloneElement, useMemo } from 'react';
import { useLocation } from 'react-use';
import ReactGA from 'react-ga4';

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
      content: 'MDBL Launch',
      icon: <DBAL />,
      point: 'mdbl',
    },
    {
      key: '/dragonkey',
      to: '/dragonkey',
      content: 'DragonKey',
      icon: <DragonKey />,
      point: 'dragonkey',
    },
    // {
    //   key: '/backpack',
    //   to: 'backpack',
    //   content: 'Backpack',
    //   icon: <Backpack />,
    // },
    {
      key: '/halloffame',
      to: 'halloffame',
      content: 'Hall of Fame',
      icon: <Rank />,
      point: 'hof',
    },
    // {
    //   key: '/governance',
    //   to: 'governance',
    //   content: 'Governance',
    //   icon: <Governance />,
    // },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-[2.4vw] xl:gap-7.5">
      {navList.map((nav) => (
        <Link
          key={nav.key}
          href={nav.to}
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'main_menu', label: nav.point });
          }}
          className={clsx(
            'group flex h-[4.32vw] w-full items-center rounded-[0.64vw] bg-white/6 pl-[1.12vw] hover:bg-white/16 xl:h-[54px] xl:rounded-lg xl:pl-3.5',
            {
              '!bg-white/16': nav.key === activeRouter,
            },
          )}
        >
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-start gap-[0.64vw] transition-all duration-300 ease-in xl:gap-2',
              nav.key === activeRouter ? 'text-white' : 'text-gray-300',
            )}
          >
            {cloneElement(nav.icon, {
              className: clsx('xl:w-6.5 w-[2.08vw] fill-gray-300 stroke-gray-300', {
                'fill-white stroke-white': nav.key === activeRouter,
              }),
            })}
            <span
              className={clsx(
                `${
                  siderCollapsed ? 'hidden' : 'inline-block'
                } w-full flex-1 animate-collapsed text-[1.28vw] font-medium xl:text-base`,
                { 'font-medium': nav.key === activeRouter },
              )}
            >
              {nav.content}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Nav;
