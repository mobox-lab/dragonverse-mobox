'use client';

import { CDN_URL } from '@/constants';
import DragonFairLaunch from './_components/DragonFairLaunch';

export default function DKey() {
  return (
    <main className="px-[5vw] pb-12 sm:px-[20px]">
      <img src={`${CDN_URL}/dragon-banner-04.jpg`} alt="dragon" className="absolute left-0 top-10 -z-10 h-auto w-full" />
      <img
        src="/img/dkey-title.webp"
        alt="Hall of Fame"
        className="absolute left-1/2 top-15 h-[8.1875rem] -translate-x-1/2 transform"
      />
      <DragonFairLaunch className="mt-[24.56vw]" />
    </main>
  );
}
