import React from 'react';
import Sider from './Sider';
import { siderCollapsedAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import Nav from '../nav';
import { motion } from 'framer-motion';
import SocialMedia from './SocialMedia';
import { openLink } from '@/utils';

export default function LeftSider() {
  const siderCollapsed = useAtomValue(siderCollapsedAtom);

  return (
    <Sider>
      <div className="flex h-[12.8vw] justify-center pt-[1.92vw] xl:h-[160px] xl:pt-6">
        {siderCollapsed ? (
          <motion.img
            key="logo1"
            src="/img/logo.webp"
            alt="logo"
            onClick={() => openLink('https://www.mobox.io/#/')}
            className="h-[4.32vw] w-[4.32vw] cursor-pointer xl:h-[54px] xl:w-[54px]"
          />
        ) : (
          <motion.img
            key="logo2"
            src="/img/dragonverse.png"
            alt="logo"
            onClick={() => openLink('https://www.mobox.io/#/')}
            className="h-[7.92vw] w-[13.92vw] cursor-pointer xl:h-[94px] xl:w-[174px]"
          />
        )}
      </div>
      <div>
        <Nav />
      </div>
      <SocialMedia />
    </Sider>
  );
}
