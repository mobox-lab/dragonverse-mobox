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
      <img src={`${CDN_URL}/dragon-banner-01.jpg`} alt="dragon" className="absolute left-0 top-18 -z-10 h-auto w-full" />
      <img
        src="/img/governance.webp"
        alt="governance"
        className="absolute left-1/2 top-[4.8vw] w-[44.16vw] -translate-x-1/2 transform xl:top-15 xl:w-[552px]"
      />
      <div className="relative mt-[36vw]">
        <DragonVerseNeo />
      </div>
      <DragonIntro />
    </div>
  );
};

export default Governance;
