'use client';
import React, { cloneElement } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useLocation } from 'react-use';
import DragonKey from '@/../public/svg/menu-dragon-key.svg?component';
import Governance from '@/../public/svg/menu-governance.svg?component';
import Backpack from '@/../public/svg/bagpack.svg?component';
import Rank from '@/../public/svg/rank.svg?component';

interface NavProps {
  collapsed: boolean;
}

const Nav: React.FunctionComponent<NavProps> = (props) => {
  const { collapsed } = props;
  const location = useLocation();
  const activeRouter = location.pathname ?? '/';

  const navList = [
    {
      key: '/',
      to: '/',
      content: 'Home',
      icon: <DragonKey />,
    },
    {
      key: '/backpack',
      to: 'backpack',
      content: 'Backpack',
      icon: <Backpack />,
    },
    {
      key: '/halloffame',
      to: 'halloffame',
      content: 'Hall of Fame',
      icon: <Rank />,
    },
    {
      key: '/governance',
      to: 'governance',
      content: 'Governance',
      icon: <Governance />,
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-[2.4vw] xl:gap-7.5">
      {navList.map((nav) => (
        <Link
          key={nav.key}
          href={nav.to}
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
                  collapsed ? 'hidden' : 'inline-block'
                } animate-collapsed w-full flex-1 text-[1.28vw] font-medium xl:text-base`,
                { 'font-semibold': nav.key === activeRouter },
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
