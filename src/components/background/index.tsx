'use client';
import { CDN_URL } from '@/constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import React from 'react';
import clsx from 'clsx';

const Background = () => {
  const { mobile } = useIsMobile();

  return (
    <video
      autoPlay
      playsInline
      loop
      muted
      className={clsx('absolute -top-[23vw] left-0 -z-10 h-auto w-full', { 'pt-[57px]': mobile })}
    >
      <source src={`${CDN_URL}/bg.webm`} type="video/webm" />;
      <source src={`${CDN_URL}/bg.mp4`} type="video/mp4" />
    </video>
  );
};

export default Background;
