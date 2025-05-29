'use client';

import ClipSVG from '@/../public/svg/clip.svg?component';
import { mainWalletConnectDialogAtom } from '@/atoms';
import Background from '@/components/background';
import Button from '@/components/ui/button';
import { CloseSvg } from '@/components/ui/svg/CloseSvg';
import Tooltip from '@/components/ui/tooltip';
import { STORAGE_KEY } from '@/constants/storage';
import { useIsMounted } from '@/hooks/useIsMounted';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useCopyToClipboard, useLocalStorage } from 'react-use';
import { useAccount } from 'wagmi';

interface DragonKeyProps {}

const md5Value = '5a974c911aa47f465620acc6d747380a';
const sha1Value = '541472b5d19d426b8ec63c072290cd367d028b7d';
const downloadDisabled = false;

const DragonKey: React.FunctionComponent<DragonKeyProps> = (props) => {
  const [tipOpened, setTipOpened] = useLocalStorage(STORAGE_KEY.DOWNLOAD_TIP_OPENED, false);
  const { address } = useAccount();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const [detailVisible, setDetailVisible] = useState<boolean>(true);
  const isMounted = useIsMounted();
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <Background />
      {/* <Menu /> */}
      <div className="-mt-[2.88vw] flex h-full flex-col items-center xl:-mt-9">
        <img src="/img/dragonverse.png" alt="logo" className="w-[25vw]" />
        <div className="absolute bottom-[6.4vw] left-1/2 -translate-x-1/2 transform xl:bottom-20">
          <Tooltip
            offsetX={12}
            className="w-[28.16vw] xl:w-[352px]"
            title={
              <>
                <h3 className="mb-[0.64vw] text-[1.12vw]/[1.6vw] xl:mb-2 xl:text-sm/5">Minimum System Requirements</h3>
                <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">CPU: Intel Core i5-7400 or AMD equivalent</p>
                <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">RAM: 8 GB</p>
                <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">
                  GPU: NVIDIA GeForce GTX 960 or AMD equivalent
                </p>
                <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">OS: Windows 10 64-bit (Above)</p>
                <div className="my-[1.28vw] h-px bg-white/25 xl:my-4" />
                <p className="flex items-center text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">
                  <span className="truncate">md5: {md5Value}</span>
                  <ClipSVG
                    className="ml-[0.32vw] w-[0.96vw] cursor-pointer stroke-gray-300 hover:stroke-white xl:ml-1 xl:w-3"
                    onClick={() => {
                      copyToClipboard(md5Value);
                      toast.success('md5 copied');
                    }}
                  />
                </p>
                <p className="flex w-full items-center truncate text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">
                  <span className="truncate">sha1: {sha1Value}</span>
                  <ClipSVG
                    className="ml-[0.16vw] w-[0.96vw] cursor-pointer stroke-gray-300 hover:stroke-white xl:ml-0.5 xl:w-3"
                    onClick={() => {
                      copyToClipboard(sha1Value);
                      toast.success('sha1 copied');
                    }}
                  />
                </p>
              </>
            }
          >
            <div>
              <Button
                className="mt-[28vw] flex h-[8.16vw] w-[28.16vw] items-center justify-center xl:h-[102px] xl:w-[352px]"
                type="red"
                disabled={downloadDisabled}
                onClick={() => {
                  if (downloadDisabled) return;
                  ReactGA.event({ category: 'merlin', action: 'download_pge' });

                  window.open('https://cdn1.p12.games/pge/download/PGE_latest.exe', '_blank');
                }}
              >
                {downloadDisabled ? (
                  <div>
                    {/* <img src="/img/download-disabled.webp" alt="download" className="relative top-0.5 w-[13.65vw] xl:w-[170px]" /> */}
                    <img
                      src="/img/download-coming-soon.webp"
                      draggable={false}
                      alt="download"
                      className="relative top-0.5 w-[14.8vw] xl:w-[185px]"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/img/download.webp" alt="download" className="w-[23.68vw] xl:w-[296px]" />
                    <p className="shadow-text-unbox text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                      Current Version: 1.2.1 Update on: 2024.09.06
                    </p>
                  </div>
                )}
              </Button>
            </div>
          </Tooltip>
          {/* <div className="mt-[1.12vw] text-[0.96vw]/[1.92vw] font-medium text-gray-300 xl:mt-3.5 xl:text-xs/6">
            <p className="flex items-center">
              md5: {md5Value}
              <ClipSVG
                className="ml-[0.64vw] w-[0.96vw] cursor-pointer stroke-gray-300 hover:stroke-white xl:ml-2 xl:w-3"
                onClick={() => {
                  copyToClipboard(md5Value);
                  toast.success('md5 copied');
                }}
              />
            </p>
            <p className="flex items-center">
              sha1: {sha1Value}
              <ClipSVG
                className="ml-[0.64vw] w-[0.96vw] cursor-pointer stroke-gray-300 hover:stroke-white xl:ml-2 xl:w-3"
                onClick={() => {
                  copyToClipboard(sha1Value);
                  toast.success('sha1 copied');
                }}
              />
            </p>
          </div> */}
          {!tipOpened && (
            <div className="mt-[1.28vw] flex w-[28vw] items-center justify-between rounded-sm bg-blue-300/30 px-[0.64vw] py-[0.48vw] text-[0.96vw]/[1.6vw] font-medium xl:mt-4 xl:w-[350px] xl:px-2 xl:py-1.5 xl:text-xs/5">
              It is recommended to reinstall for better experience.
              <CloseSvg onClick={() => setTipOpened(true)} className="size-[0.96vw] stroke-white xl:size-3" />
            </div>
          )}
        </div>

        {/* <div className="self-start">
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
          <DragonBorder className="inset-[0.64vw] -z-10 xl:inset-2" />
          <div className="relative h-auto w-full px-[4vw] pb-[1.28vw] pt-[2.24vw] xl:px-9 xl:pb-4 xl:pt-7">
            <img src="/img/key-title.webp" alt="your dragonkey" className="w-[23.85vw] xl:w-[297px] " />
            <div className="mt-[0.64vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-2 xl:text-sm">
              Unlock your Dragonkey & dive into the enchanting land of Dragonverse Neo.
            </div>

            <div className="mx-auto mt-[3.84vw] flex w-[46vw] items-center justify-between xl:mt-12 xl:w-[572px]">
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
              <div className="relative h-[6.9vw] w-[6.6vw] xl:h-[86px] xl:w-[82px]">
                <img src="/svg/code-bg.svg" alt="" className="absolute left-0 top-0" />
                <div className="flex-center relative h-full text-[2.88vw]/[3.2vw] font-semibold xl:text-4xl">{'?'}</div>
              </div>
            </div>
            {isMounted && (
              <div className="flex-center">
                {address ? (
                  <div className="flex-center flex-col gap-[1.6vw] xl:gap-5">
                    <div className="flex-center mt-[0.96vw] h-[2.4vw] w-[46vw] gap-1.5 bg-gray-300/20 text-[0.96vw]/[1.28vw] font-medium text-gray-300 backdrop-blur-xl xl:mt-3 xl:h-7.5 xl:w-[572px] xl:text-xs">
                      Beta test has ended. Dragonkeys will be available before the official launch of the game.
                    </div>
                    <Button
                      type="green"
                      className="mt-[0.96vw] w-[17.66vw] text-[1.28vw] font-semibold xl:mt-3 xl:w-[220px] xl:text-base"
                      disabled
                    >
                      Coming soon
                    </Button>
                  </div>
                ) : (
                  <div className="flex-center flex-col gap-[1.6vw] xl:gap-5">
                    <div className="flex-center mt-[0.96vw] h-[2.4vw] w-[46vw] gap-1.5 bg-red/20 text-[0.96vw]/[1.28vw] font-medium text-red backdrop-blur-xl xl:mt-3 xl:h-7.5 xl:w-[572px] xl:text-xs">
                      <img src="/img/error.webp" alt="" className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5" /> Lost Connection
                    </div>
                    <Button
                      type="red"
                      className="w-[17.66vw] p-[0.96vw] text-[1.28vw] font-semibold xl:w-[220px] xl:p-2 xl:text-base"
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
              className="mt-[3.84vw] flex cursor-pointer items-center justify-center gap-1 text-center text-[1.12vw]/[1.6vw] font-medium text-blue xl:mt-12 xl:text-sm"
              onClick={() => setDetailVisible(!detailVisible)}
            >
              Criteria&nbsp;
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
                <div className="mt-[3.84vw] text-center text-[1.92vw]/[1.92vw] font-medium xl:mt-12 xl:text-2xl/6">
                  Criteria for Dragonverse Neo Merlin will be revealed soon...
                </div>
                <div className="mt-[0.64vw] text-center text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm/6">
                  More mysterious surprises, please wait patiently
                </div>
                <div className="mt-[3.84vw] flex items-center justify-center xl:mt-12">
                  <img src="/img/modragon-01.webp" alt="modragon" className="-mr-[1.6vw] w-[26.4vw] xl:-mr-5 xl:w-[330px]" />
                  <img src={`${CDN_URL}/dragon-ball-min.webp`} alt="" className="w-[19.84vw] xl:w-[248px]" />
                  <img src="/img/modragon-02.webp" alt="modragon" className="w-[26.4vw] xl:w-[330px]" />
                </div>
              </div>
            )}
            <div className="mt-[1.28vw] h-[1px] w-full bg-gray-500 xl:mt-4"></div>
            <div className="mt-[1.92vw] flex items-center justify-center gap-[2.72] xl:mt-6 xl:gap-[34px]">
              <div className="w-[44vw] xl:w-[550px]">
                <img src="/img/dawn-title.webp" alt="dawn" className="w-[19.2vw] xl:w-[240px] " />
                <div className="mt-[0.96vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-3 xl:text-sm">
                  {'In 40s, Finish 6th game in Dragonverse neo, obtain "The Dawnbringer" NFT.'}
                </div>
                <Button
                  type="green"
                  disabled
                  className="mt-[2.4vw] w-[17.66vw] p-[0.64vw] text-[1.28vw] font-semibold xl:mt-7.5 xl:w-[220px] xl:p-2 xl:text-base"
                >
                  Coming soon
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
        </div> */}
      </div>
    </div>
  );
};

export default DragonKey;

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: test: 🧪 add regression tests
interface test____add_regression_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_regression_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_regression_tests = () => {
  const [state, setState] = useState<test____add_regression_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_regression_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_regression_tests');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handletest____add_regression_tests
  };
};

// TypeScript internationalization: style: 💄 update icon set
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    style____update_icon_set: 'style: 💄 update icon set',
    style____update_icon_set_description: 'Description for style: 💄 update icon set'
  },
  zh: {
    style____update_icon_set: 'style: 💄 update icon set',
    style____update_icon_set_description: 'style: 💄 update icon set的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
