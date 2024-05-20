'use client';
import { CDN_URL } from '@/constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import clsx from 'clsx';

const Background = () => {
  const { mobile } = useIsMobile();

  return (
    <div>
      <video
        autoPlay
        playsInline
        loop
        muted
        className={clsx('absolute left-0 top-0 -z-10 h-screen w-full object-cover', {
          'pt-[57px]': mobile,
        })}
      >
        {/* bg.webm */}
        <source src={`${CDN_URL}/home.webm`} type="video/webm" />;
        <source src={`${CDN_URL}/home.mp4`} type="video/mp4" />
      </video>
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/0 to-black/100"></div>
    </div>
  );
};

export default Background;
