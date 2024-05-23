'use client';

import DBAL from '@/../public/svg/dbal.svg?component';
import Events from '@/../public/svg/events.svg?component';
import LitepaperSvg from '@/../public/svg/litepaper.svg?component';
import Rank from '@/../public/svg/rank.svg?component';
import Stake from '@/../public/svg/stake.svg?component';
import { siderCollapsedAtom } from '@/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { cloneElement, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-use';
import SecondNavList from './SecondNavList';
import HomeSvg from '@/../public/svg/home.svg?component';

export type NavItemProps = {
  key: string;
  label: string;
  isGroup?: boolean; // isGroup without navigation
  icon?: JSX.Element;
  to?: string; // Optional if "isGroup" is true
  pointLabel?: string; // Optional if "isGroup" is true
  href?: string; // Optional if "isGroup" is true
  children?: NavItemProps[];
};
const navList: NavItemProps[] = [
  {
    key: '/',
    to: '/',
    label: 'Home',
    icon: <HomeSvg />,
    pointLabel: 'home',
  },
  {
    key: '/vault',
    to: '/vault',
    label: 'Vault',
    icon: <Stake />,
    pointLabel: 'vault',
  },
  // {
  //   key: '/halloffame',
  //   to: 'halloffame',
  //   label: 'Hall of Fame',
  //   icon: <Rank />,
  //   pointLabel: 'hof',
  // },
  {
    key: '/mdbl',
    to: '/mdbl',
    label: '$MDBL Launch',
    icon: <DBAL />,
    pointLabel: 'lbp',
  },
  {
    key: 'events',
    isGroup: true,
    label: 'Events',
    icon: <Events />,
    children: [
      {
        key: '/burn',
        to: '/burn',
        label: 'Dragon Balls: The Summon',
        pointLabel: 'event-burn',
      },
      {
        key: '/events',
        to: '/events',
        label: 'Post-LBP Airdrop',
        pointLabel: 'event-airdrop',
      },
    ],
  },
  {
    key: 'litepaper',
    isGroup: true,
    label: 'Litepaper',
    icon: <LitepaperSvg />,
    pointLabel: 'litepaper',
    children: [
      {
        key: 'litepaper-en',
        href: 'https://mobox.gitbook.io/dragonverse-neo-litepaper/',
        label: 'English',
      },
      {
        key: 'litepaper-cn',
        href: 'https://mobox.gitbook.io/dragonverse-neo-litepaper-cn',
        label: '中文版',
      },
    ],
  },
];

export default function Nav() {
  const siderCollapsed = useAtomValue(siderCollapsedAtom);
  const isMounted = useIsMounted();
  const location = useLocation();
  const activeRouter = useMemo(() => {
    if (!isMounted) return '/';
    const { pathname = '/' } = location;
    return pathname;
  }, [location, isMounted]);

  return (
    <div className="flex flex-col items-start justify-center gap-[2.4vw] xl:gap-7.5">
      {navList.map((nav) => {
        const { key, to, icon, label, pointLabel, isGroup } = nav;
        if (isGroup) return <SecondNavList key={key} currentItem={nav} />;
        return (
          <Link
            key={key}
            href={to ?? ''}
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'main_menu', label: pointLabel });
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
              {icon
                ? cloneElement(icon, {
                    className: clsx('xl:w-6.5 w-[2.08vw] fill-gray-300 stroke-gray-300', {
                      'fill-white stroke-white': key === activeRouter,
                    }),
                  })
                : null}
              <span
                className={clsx(
                  `${
                    siderCollapsed ? 'hidden' : 'inline-block'
                  } w-full flex-1 animate-collapsed text-[1.28vw] font-medium xl:text-base`,
                  { 'font-medium': key === activeRouter },
                )}
              >
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
