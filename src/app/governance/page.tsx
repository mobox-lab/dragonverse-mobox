'use client';
import { CDN_URL } from '@/constants';
import React from 'react';
import DragonVerseNeo from '../_components/DragonVerseNeo';
import DragonIntro from '../_components/DragonIntro';
import clsx from 'clsx';

interface GovernanceProps {}

const Governance: React.FunctionComponent<GovernanceProps> = (props) => {
  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <img src={`${CDN_URL}/dragon-banner-01.jpg`} alt="dragon" className="absolute left-0 top-10 -z-10 h-auto w-full" />
      <div className="relative -mt-[2.88vw] flex items-center justify-center xl:-mt-9">
        <img src="/img/governance.webp" alt="governance" className="w-[44.16vw] xl:w-[552px]" />
      </div>
      <div className="relative mt-[20vw]">
        <DragonVerseNeo />
      </div>
      <DragonIntro />
    </div>
  );
};

export default Governance;
