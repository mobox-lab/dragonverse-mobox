'use client';

import ArrowSvg from '@/../public/svg/arrow.svg?component';
import Background from '@/components/background';
import Button from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useIsMounted } from '@/hooks/useIsMounted';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { useAccount } from 'wagmi';
import DragonBorder from './DragonBorder';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { CDN_URL } from '@/constants';

interface DragonKeyProps {}

const DragonKey: React.FunctionComponent<DragonKeyProps> = (props) => {
  const { address } = useAccount();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const [downloadDisabled] = useState<boolean>(true);
  const [detailVisible, setDetailVisible] = useState<boolean>(true);
  const isMounted = useIsMounted();
  const { mobile } = useIsMobile();

  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]', { 'pt-[57px]': mobile })}>
      <Background />
      {/* <Menu /> */}
      <div className="-mt-[2.88vw] flex flex-col items-center xl:-mt-9">
        <img src="/img/dragonverse.png" alt="logo" className="w-[25vw]" />
        <div className="self-start">
          <Button
            className="mt-[18vw] flex h-[5.76vw] w-[22vw] items-center justify-center xl:h-[72px] xl:w-[274px]"
            type="red"
            disabled={downloadDisabled}
            onClick={() => {
              window.open('https://cdn1.p12.games/pge/download/PGE_latest.exe', '_blank');
            }}
          >
            {downloadDisabled ? (
              <div>
                <img src="/img/download-disabled.webp" alt="download" className="relative top-0.5 w-[13.65vw] xl:w-[170px]" />
              </div>
            ) : (
              <div>
                <img src="/img/download.webp" alt="download" className="relative top-0.5 w-[13.65vw] xl:w-[170px]" />
              </div>
            )}
          </Button>
        </div>

        <div className="relative mt-[0.96vw] h-auto w-full border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-3">
          <DragonBorder className="inset-2 -z-10" />
          <div className="relative h-auto w-full px-[4vw] pb-[1.28vw] pt-[2.24vw] xl:px-9 xl:pb-4 xl:pt-7">
            <img src="/img/key-title.webp" alt="your dragonkey" className="w-[23.85vw] xl:w-[297px] " />
            <div className="mt-[0.64vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-2 xl:text-sm">
              Unlock your Dragonkey & dive into the enchanting land of Dragonverse Neo.
            </div>

            <div className="mx-auto mt-[3.84vw] flex w-[46vw] items-center justify-between xl:mt-12 xl:w-[572px]">
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-bold xl:text-4xl">{'?'}</div>
              </div>
            </div>
            {isMounted && (
              <div className="flex-center">
                {address ? (
                  <Button
                    type="green"
                    className="mt-[0.96vw] w-[17.66vw] text-[1.28vw] font-bold xl:mt-3 xl:w-[220px] xl:text-base"
                    disabled
                  >
                    COMING SOON
                  </Button>
                ) : (
                  <div className="flex-center flex-col gap-[1.6vw] xl:gap-5">
                    <div className="flex-center mt-[0.96vw] h-[2.4vw] w-[46vw] gap-1.5 bg-red/20 text-[0.96vw]/[1.28vw] font-semibold text-red backdrop-blur-xl xl:mt-3 xl:h-7.5 xl:w-[572px] xl:text-xs">
                      <img src="/img/error.webp" alt="" className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5" /> Lost Connection
                    </div>
                    <Button
                      type="red"
                      className="w-[17.66vw] p-[0.96vw] text-[1.28vw] font-bold xl:w-[220px] xl:p-2 xl:text-base"
                      onClick={() => {
                        setWalletConnect(true);
                      }}
                    >
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div
              className="mt-[3.84vw] flex cursor-pointer items-center justify-center gap-1 text-center text-[1.12vw]/[1.6vw] font-semibold text-blue xl:mt-12 xl:text-sm"
              onClick={() => {
                ReactGA.event({ category: 'dvneo', action: 'criteria_scroll', label: '' });
                setDetailVisible(!detailVisible);
              }}
            >
              Criteria{' '}
              <ArrowSvg
                className={clsx(
                  detailVisible ? '' : 'rotate-180',
                  'h-[14px] w-[14px] scale-50 transform stroke-blue duration-300 xl:scale-100',
                )}
              />
            </div>
            {detailVisible && (
              <div className="pb-[3.84vw] xl:pb-12">
                <div className="mt-[1.12vw] h-[1px] w-full bg-gray-500 xl:mt-3.5"></div>
                <div className="mt-[3.84vw] flex justify-between gap-[3.2vw] xl:mt-12 xl:gap-10">
                  <div className="flex basis-[34vw] flex-col justify-center xl:basis-[424px]">
                    <div className="text-[1.92vw]/[1.92vw] font-semibold xl:text-2xl/6">$veMBOX Holders</div>
                    <div className="mt-[0.64vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm">
                      Addresses with more than 10,000 $veMBOX for eligibility.
                    </div>
                    <div className="mt-[4.48vw] flex items-start gap-[1.6vw] xl:mt-14 xl:gap-5">
                      <div>
                        <img
                          src="/img/vemobox-guide-01.webp"
                          alt="guide-01"
                          className="w-[20.8vw] cursor-pointer xl:w-[260px]"
                          onClick={() => window.open('https://www.mobox.io/#/iframe/momo', '_blank')}
                        />
                        <div className="mt-[1.28vw] w-[20.8vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:w-[260px] xl:text-xs">
                          <span className="text-[1.28vw] xl:text-base">1. </span>
                          Visit
                          <span
                            className="mx-1 cursor-pointer text-blue underline"
                            onClick={() => window.open('https://www.mobox.io/#/iframe/momo', '_blank')}
                          >
                            MOMO Farmer
                          </span>
                          and click &quot;veMBOX Boost&quot;, located on the upper right and under &quot;Crates&quot; section
                        </div>
                      </div>
                      <div>
                        <img src="/img/vemobox-guide-02.webp" alt="guide-02" className="w-[20.8vw] xl:w-[260px]" />
                        <div className="mt-[1.28vw] w-[20.8vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:w-[260px] xl:text-xs">
                          <span className="text-[1.28vw] xl:text-base"> 2. </span>
                          Make sure you have at least 10,000 $veMBOX based on the duration and amount staked.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-[1.92vw]/[1.92vw] font-semibold xl:text-2xl/6">Community Perks</div>
                    <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-1 xl:text-sm/6">
                      Mobox will also issue Dragonkeys via community events! Subscribe to the outlets below and stay tuned for
                      more updates!
                    </div>
                    <div className="mt-[1.28vw] flex items-center gap-[0.96vw] xl:mt-4 xl:gap-3">
                      <img
                        src="/svg/x.svg"
                        alt="x"
                        className="w-[1.9vw] cursor-pointer xl:w-6"
                        onClick={() => {
                          window.open('https://twitter.com/MOBOX_Official', '_blank');
                        }}
                      />
                      <img
                        src="/svg/telegram.svg"
                        alt="telegram"
                        className="w-[1.9vw] cursor-pointer xl:w-6"
                        onClick={() => {
                          window.open('https://t.me/mobox_io', '_blank');
                        }}
                      />
                      <img
                        src="/svg/discord.svg"
                        alt="discord"
                        className="w-[1.9vw] cursor-pointer xl:w-6"
                        onClick={() => {
                          window.open('https://discord.com/invite/gW2eAU4WZy', '_blank');
                        }}
                      />
                    </div>
                    <div className="flex-center mt-[1.92vw] xl:mt-6">
                      <img src="/img/community.webp" alt="community" className="w-[20.7vw] xl:w-[258px]" />
                    </div>
                  </div>
                </div>

                <div className="item-center mt-[1.92vw] flex justify-between xl:mt-6">
                  <div className="flex basis-[34vw] flex-col justify-center xl:basis-[424px]">
                    <div className="text-[1.92vw]/[1.92vw] font-semibold xl:text-2xl/6">MODragon Holders</div>
                    <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-1 xl:text-sm">
                      Addresses with MODragon of Rare rarity or higher rarity for eligibility.
                    </div>
                    <div className="mt-[1.28vw] text-[0.96vw]/[1.92vw] font-medium xl:text-xs xs:mt-4">
                      Snapshot time: UTC 3:00 AM, December 20th, 2023
                    </div>
                  </div>

                  <div className="flex items-start gap-6 pr-10">
                    <img src="/img/mo-dragon.webp" alt="dragon nft" className="w-[49.9vw] xl:w-[621px]" />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-[1.28vw] h-[1px] w-full bg-gray-500 xl:mt-4"></div>
            <div className="mt-[1.92vw] flex items-center justify-center gap-[2.72] xl:mt-6 xl:gap-[34px]">
              <div className="w-[42.4vw] xl:w-[530px]">
                <img src="/img/dawn-title.webp" alt="dawn" className="w-[19.2vw] xl:w-[240px] " />
                <div className="mt-[0.96vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-3 xl:text-sm">
                  {'Finish mini-game "Dash of Dawn" & claim "The Dawnbringer" NFT'}
                </div>
                <Button
                  type="green"
                  disabled
                  className="mt-[2.4vw] w-[17.66vw] p-[0.64vw] text-[1.28vw] font-bold xl:mt-7.5 xl:w-[220px] xl:p-2 xl:text-base"
                >
                  COMING SOON
                </Button>
              </div>
              <img src={`${CDN_URL}/dawn-bringer.webp`} alt="dawn" className="w-[25.76vw] xl:w-[322px] " />
            </div>
          </div>
          <img
            src="/img/dragon-key-not-generate.webp"
            alt="dragon-key"
            className="absolute -top-[13.65vw] right-0 w-[25.2vw] xl:-top-[170px] xl:w-[314px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DragonKey;
