'use client';

import React, { useState } from 'react';
import { CDN_URL } from '@/constants';
import Button from '@/components/ui/button';
import BindConnect from '@/components/web3/BindConnect';
import { CloseSvg } from '@/components/ui/svg/CloseSvg';
import DragonBorder from '@/app/_components/DragonBorder';

export default function Events() {
  const [isTipsShow, setIsTipsShow] = useState(true);

  return (
    <div>
      <img src={`${CDN_URL}/dragon-banner-06.webp`} alt="" className="absolute left-0 top-0 -z-10 h-auto w-full" />
      <div className="pt-6">
        <div className="flex-center gap-2.5">
          <img className="h-15" src="/img/mdbl.webp" alt="mdbl" />
          <img className="h-15.5" src="/img/events/title_fair_launch.webp" alt="title" />
        </div>
        <img className="mx-auto mt-3 h-10.5" src="/img/events/subtitle_airdrop.webp" alt="subtitle" />
      </div>
      <div className="mt-45">
        <div className="pb-7.5">
          <BindConnect />
        </div>
        {isTipsShow && (
          <div className="relative mx-auto max-w-[680px] bg-legendary/30 px-4 py-2 text-xs/5 text-legendary backdrop-blur-2xl">
            The airdrop has not yet started. Please stay tuned to the community announcements.
            <CloseSvg className="absolute right-4 top-3 w-3.5 stroke-legendary" onClick={() => setIsTipsShow(false)} />
          </div>
        )}
        <div className="relative mx-auto mt-4 w-full max-w-[680px] border border-gray-600 bg-black/60 px-[3.2vw] py-[3.52vw] backdrop-blur-sm xl:px-10 xl:py-11">
          <DragonBorder className="inset-[0.64vw] -z-10 xl:inset-2" />
          <p className="mt-1 text-center text-base/5.5 font-medium">My Airdrop Allocation</p>
          <p className="mt-1 text-center text-xs/5 text-gray-300">Based on $MDBL accquired from LBP & Dragon Ball balance</p>
          <div className="flex-center mt-3 gap-1">
            <img className="h-9" src="/img/mdbl.webp" alt="mdbl" />
            <p className="text-3xl/7.5 font-semibold text-yellow">--</p>
          </div>
          <div className="flex-center mt-4">
            <Button disabled className="w-57.5 h-11">
              Claim
            </Button>
          </div>
          <div className="mt-15 grid grid-cols-2">
            <div>
              <div className="text-center text-base/5.5 font-medium">$MDBL accquired</div>
              <div className="flex-center mt-5.5 h-9 items-center gap-1 border-r border-gray-600 text-3xl/7.5 font-semibold text-yellow">
                <img src="/img/mdbl.webp" alt="mdbl" className="h-9" />
                --
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div className="text-center text-base/5.5 font-medium">Dragon Ball(s)</div>
                <div className="flex-center mt-4">
                  <div className="relative">
                    <img className="w-12" src="/img/dragon-ball.webp" alt="dragon-ball" />
                    <p className="black-outline absolute -right-1.5 -top-0.5 text-base/4 font-medium">x0</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-center text-base/5.5 font-medium">M-Dragon Ball(s)</div>
                <div className="flex-center relative mt-4">
                  <div className="relative">
                    <img className="w-12" src="/img/dragon-ball.webp" alt="dragon-ball" />
                    <p className="black-outline absolute -right-1.5 -top-0.5 text-base/4 font-medium">x0</p>
                    <img
                      src="/img/merlin-chain.png"
                      className="absolute -right-1.5 bottom-0 w-5 rounded-full border-2 border-black bg-black"
                      alt="merlin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center mt-8">Calculated via wallet:</div>
        </div>
      </div>
    </div>
  );
}
