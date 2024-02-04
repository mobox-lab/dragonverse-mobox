import React from 'react';
import { CDN_URL } from '@/constants';
import clsx from 'clsx';
import BackpackAssets from './_components/Backpack';

interface BackpackProps {}

const Backpack: React.FunctionComponent<BackpackProps> = (props) => {
  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <img src={`${CDN_URL}/dragon-banner-02.jpg`} alt="dragon" className="absolute left-0 top-10 -z-10 h-auto w-full" />
      <div className="relative -mt-[2.88vw] flex items-center justify-center xl:-mt-9">
        <img src="/img/backpack.webp" alt="backpack" className="w-[31.52vw] xl:w-[394px]" />
      </div>
      <div className="relative mt-[22vw]">
        <BackpackAssets />
      </div>
    </div>
  );
};

export default Backpack;
