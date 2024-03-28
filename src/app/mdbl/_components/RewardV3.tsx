import DiscordIcon from '@/../public/svg/discord.svg?component';
import LoadingSvg from '@/../public/svg/loading-02.svg?component';
import XIcon from '@/../public/svg/x.svg?component';
import { LBPRewardDialogOpenAtom, mainWalletConnectDialogAtom } from '@/atoms';
import { poolInitialAtom, shareBalanceAtom, vestEndAtom } from '@/atoms/lbp';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { ONE, SocialLinks } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useFetchShares } from '@/hooks/useFetchShares';
import { useIsMainConnected, useMainAccount, useMainChain, useMainWriteContract } from '@/hooks/wallet';
import { clsxm, formatNumber, isDecimal, lessThanOneFormat } from '@/utils';
import clsx from 'clsx';
import { parseEther } from 'ethers';
import { useAtomValue, useSetAtom } from 'jotai';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { bigIntToFloat } from '../../../entities/bigint';
import { useIsEnd } from '@/hooks/useIsEnd';
import { useIsClaimed } from '@/hooks/reward/useIsClaimed';
import { Address } from 'viem';
import { RewardABI } from '@/abis/Reward';
import { getProofByAddress } from '@/utils/reward';
import ReactGA from 'react-ga4';

export default function RewardV3({ className }: { className?: string }) {
  const isMainConnected = useIsMainConnected();
  const { isSupportedChain, switchMainChain } = useMainChain();
  const { writeContract, isLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'TransactionFailed') {
        toast.error('Transaction Failed');
      } else {
        toast.error('Network error, please try again later');
      }
    },
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      toast.success(`Claimed reward succeeded`);
    },
  });

  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const [UIloading, setUILoading] = useState<boolean>(true);
  const pool = useAtomValue(poolInitialAtom);
  const isEnd = useIsEnd();
  const { value: balance2 } = useAtomValue(shareBalanceAtom);

  const setLBPRewardOpen = useSetAtom(LBPRewardDialogOpenAtom);

  const { evmAddress } = useMainAccount();

  const { data } = useFetchShares({ address: evmAddress });

  const { data: isClaimed } = useIsClaimed(evmAddress as Address);

  const balance = useMemo(() => {
    if (isEnd) {
      return BigInt(data?.myShare || 0);
    } else {
      return balance2;
    }
  }, [balance2, data?.myShare, isEnd]);

  useEffect(() => {
    if (pool?.saleEnd !== undefined) {
      setTimeout(() => {
        setUILoading(false);
      }, 1100);
    }
  }, [pool]);

  const calculateReward = useMemo(() => {
    const everySong = parseEther('2100000');
    const everyBlue = parseEther('12600000');

    if (balance >= everyBlue) {
      const blueValue = Math.floor(Number(balance / everyBlue));
      const remain = balance % everyBlue;
      const songValue = Math.floor(Number(remain / everySong));

      const next = BigInt(Math.floor(Number(balance / everySong)) + 1) * everySong;
      const gap = next - balance;

      const nextBlueValue = Math.floor(Number(next / everyBlue));
      const nextRemain = next % everyBlue;
      const nextSongValue = Math.floor(Number(nextRemain / everySong));

      return {
        current: [
          { type: 'brc420', val: blueValue },
          { type: 'song-nft', val: songValue },
        ],
        next: [
          { type: 'brc420', val: nextBlueValue },
          { type: 'song-nft', val: nextSongValue },
        ],
        gap: gap,
        target: next,
      };
    } else if (balance >= everySong) {
      const songValue = Math.floor(Number(balance / everySong));
      const next = BigInt(Math.floor(Number(balance / everySong)) + 1) * everySong;
      const gap = next - balance;
      if (next >= everyBlue) {
        const nextBlueValue = Math.floor(Number(next / everyBlue));
        const nextRemain = next % everyBlue;
        const nextSongValue = Math.floor(Number(nextRemain / everySong));
        return {
          current: [{ type: 'song-nft', val: songValue }],
          next: [
            { type: 'brc420', val: nextBlueValue },
            { type: 'song-nft', val: nextSongValue },
          ],
          gap: gap,
          target: next,
        };
      } else {
        const nextSongValue = Math.floor(Number(next / everySong));
        return {
          current: [{ type: 'song-nft', val: songValue }],
          next: [{ type: 'song-nft', val: nextSongValue }],
          gap: gap,
          target: next,
        };
      }
    } else {
      const gap = everySong - balance;
      return {
        current: [],
        next: [{ type: 'song-nft', val: 1 }],
        gap: gap,
        target: everySong,
      };
    }
  }, [balance]);

  const claimReward = async () => {
    ReactGA.event({ category: 'merlin', action: 'claim_nft', label: '' });
    const proofData = getProofByAddress(evmAddress as Address);
    if (proofData.value && proofData.proof) {
      const value = proofData.value;
      const hash = await writeContract({
        abi: RewardABI,
        functionName: 'claim',
        args: [value[0], value[2], value[3], proofData.proof],
        address: CONTRACT_ADDRESSES.reward,
      });
    }
  };

  return (
    <div
      className={clsxm(
        'relative mt-[1.6vw] h-[14.4vw] border border-gray-600 bg-[#111111]/60 p-[2.4vw] backdrop-blur-sm xl:mt-5 xl:h-[180px] xl:p-7.5',
        { 'flex flex-col items-center justify-center': isMobile },
        className,
      )}
    >
      <PatternWithoutLine />
      <Suspense fallback="">
        {UIloading ? (
          <div className={clsxm('flex-center h-full', { 'flex-col': isMobile })}>
            <LoadingSvg className="h-[2.56vw] w-[2.56vw] animate-spin fill-gray-300 xl:mt-8 xl:h-8 xl:w-10" />
          </div>
        ) : isEnd ? (
          <div className={clsxm('flex-center gap-[1.12vw] xl:gap-3.5', { 'flex-col': isMobile })}>
            <div className="flex h-[9.6vw] items-center justify-center gap-[3.2vw] border border-gray-600/50 px-[2.4vw] xl:h-[120px] xl:w-auto xl:gap-10 xl:px-7.5">
              <div className="flex flex-col items-center">
                <div className="text-center text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">My Reward</div>
                {calculateReward.current.length > 0 ? (
                  <div className="flex items-center gap-[0.96vw] xl:gap-3">
                    {calculateReward.current.map((item) => {
                      if (item.val === 0) return null;
                      return (
                        <div className="mt-[0.64vw] flex justify-center gap-[0.64vw] xl:mt-2 xl:gap-2" key={item.type}>
                          <div className="relative">
                            <img src={`/img/${item.type}.webp`} alt={item.type} className="w-[4.16vw] xl:w-[52px] " />
                            <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                              x{item.val}
                            </div>
                            <img
                              src="/img/merlin-outline.webp"
                              alt="merlin"
                              className="absolute -right-[0.64vw] bottom-0  w-[1.6vw] xl:-right-2 xl:w-5"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-center relative mt-[0.96vw] h-[4.16vw] w-[4.16vw] bg-[#2E2E2E] text-[0.96vw]/[0.96vw] text-gray-300 xl:mt-3 xl:h-13 xl:w-13 xl:text-xs/3">
                    Empty
                    <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                      x0
                    </div>
                  </div>
                )}
              </div>
              {/* 
              <div className="w-[22vw] xl:w-[275px]">
                <div className="text-[0.96vw]/[1.6vw] xl:text-xs/5">
                  The claim will be available after the launch of M-Bluebox and M-Musicbox on Merlin Chain
                </div>
              </div> */}
              {isMainConnected ? (
                !isSupportedChain ? (
                  <Button
                    type="yellow"
                    className="h-[3.52vw] w-[16vw] font-semibold xl:h-11 xl:w-[200px]"
                    onClick={() => switchMainChain()}
                  >
                    Wrong Network
                  </Button>
                ) : (
                  <Button
                    type="yellow"
                    className="h-[3.52vw] w-[16vw] font-semibold xl:h-11 xl:w-[200px]"
                    disabled={calculateReward.current.length === 0 || isClaimed}
                    onClick={claimReward}
                    loading={isLoading}
                  >
                    {isClaimed ? 'Claimed' : 'Claim Reward'}
                  </Button>
                )
              ) : (
                <Button
                  type="yellow"
                  className="h-[3.52vw] w-[16vw] font-semibold xl:h-11 xl:w-[200px]"
                  onClick={() => setWalletConnect(true)}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
            <div
              className={clsxm(
                'ml-[1.12vw] flex h-[9.6vw] w-[25.6vw] flex-col items-center justify-between border border-legendary/50 bg-legendary/10 px-[0.96vw] py-[1.28vw] xl:ml-3.5 xl:h-[120px] xl:w-[320px] xl:px-3 xl:py-4',
                { 'mt-[2.56vw] xl:mt-8': isMobile },
              )}
            >
              <div>
                <div className="flex items-center text-[0.96vw]/[1.6vw] xl:text-xs/5">
                  <li />
                  Get 1 M-Bluebox per 0.6% share holding
                </div>
                <div className="flex items-center text-[0.96vw]/[1.6vw] xl:text-xs/5">
                  <li />
                  Get 1 M-Musicbox per 0.1% share holding
                </div>
                <div className="text-center text-[0.8vw]/[1.6vw] italic text-yellow xl:text-[10px]/5">
                  (i.e. 0.8% = 1 M-Bluebox + 2 M-Musicbox)
                </div>
              </div>
              <div
                className="cursor-pointer text-center text-[1.12vw]/[1.12vw] font-medium text-blue xl:text-sm/3.5"
                onClick={() => setLBPRewardOpen(true)}
              >
                Details
              </div>
            </div>
          </div>
        ) : (
          <div className={clsxm('flex-center h-full', { 'flex-col text-center': isMobile })}>
            <div className="flex w-[23.2vw] flex-col justify-center gap-[0.64vw] xl:w-[290px] xl:gap-2">
              <div
                className={clsxm('flex gap-[0.32vw] text-[1.28vw]/[1.92vw] xl:gap-1 xl:text-base/6', {
                  'justify-center': isMobile,
                })}
              >
                My $MDBL <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" />
              </div>
              <div className="text-[2.4vw]/[3.52vw] font-medium text-yellow xl:text-3xl/[44px]">
                {lessThanOneFormat(balance)}
              </div>
              <div className="flex items-center justify-start gap-[0.32vw] text-[0.96vw]/[1.6vw] text-gray-300 xl:gap-1 xl:text-xs/5">
                Stay Tuned for $MDBL Claim Schedule
                <XIcon
                  className="w-[1.6vw] cursor-pointer fill-gray-300 xl:w-5"
                  onClick={() => {
                    window.open(SocialLinks.twitter, '_blank');
                  }}
                />
                <DiscordIcon
                  className="w-[1.6vw] cursor-pointer fill-gray-300 xl:w-5"
                  onClick={() => {
                    window.open(SocialLinks.discord, '_blank');
                  }}
                />
              </div>
            </div>
            <div className={clsxm('flex items-center', { 'mb-[3.84vw] mt-[4.32vw]': isMobile })}>
              {calculateReward.current.length !== 0 && (
                <div className="ml-[0.64vw] xl:ml-2">
                  <div className="flex-center text-center text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">
                    Current Reward
                    {/* <span className="mx-[0.32vw] text-yellow xl:mx-1">
                    {shortenDigits(Number(formatEther(calculateReward.target - parseEther('2100000'))))}
                  </span>
                  <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" /> */}
                  </div>
                  <div className="flex-center mt-[0.64vw] h-[6.4vw] w-[13.76vw] border border-gray-600/50 xl:mt-2 xl:h-20 xl:w-[172px]">
                    <div className="mt-[0.32vw] flex justify-center gap-[0.64vw] xl:mt-1 xl:gap-2">
                      {calculateReward.current.map((item) => {
                        if (item.val === 0) {
                          return null;
                        }
                        return (
                          <div key={item.type} className="relative">
                            <img src={`/img/${item.type}.webp`} alt="reward" className="w-[4.16vw] xl:w-[52px] " />
                            <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                              x{item.val}
                            </div>
                            <img
                              src="/img/merlin-outline.webp"
                              alt="merlin"
                              className="absolute -right-[0.64vw] bottom-0  w-[1.6vw] xl:-right-2 xl:w-5"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-[0.96vw] flex flex-col items-center justify-center xl:mx-3">
                <div className="flex items-center gap-[0.32vw] text-[1.12vw]/[1.6vw] font-medium text-yellow xl:gap-1 xl:text-sm/5">
                  Acquire{' '}
                  {formatNumber(
                    calculateReward.gap
                      ? isDecimal(
                          bigIntToFloat({
                            amount: calculateReward.gap,
                            decimals: 18,
                          }),
                        )
                        ? calculateReward.gap + ONE
                        : calculateReward.gap
                      : 0n,
                    false,
                  )}
                  <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" />
                </div>
                <img src="/svg/reward-arrow.svg" alt="arrow" className="mt-[0.32vw] w-[13.44vw] xl:mt-1 xl:w-[168px]" />
                <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">To upgrade</div>
              </div>

              <div>
                <div className="flex-center text-center text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">
                  Next level
                  {/* <span className="mx-[0.32vw] text-yellow xl:mx-1">
                  {shortenDigits(Number(formatEther(calculateReward.target)))}
                </span>
                <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" /> */}
                </div>
                <div
                  className={clsx(
                    'flex-center mt-[0.64vw] h-[6.4vw] w-[13.76vw] border border-gray-600/50 xl:mt-2 xl:h-20 xl:w-[172px]',
                  )}
                >
                  <div className="mt-[0.32vw] flex justify-center gap-[0.64vw] xl:mt-1 xl:gap-2">
                    {calculateReward.next.map((item) => {
                      if (item.val === 0) {
                        return null;
                      }
                      return (
                        <div key={item.type} className="relative">
                          <img src={`/img/${item.type}.webp`} alt="reward" className="w-[4.16vw] xl:w-[52px] " />
                          <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                            x{item.val}
                          </div>
                          <img
                            src="/img/merlin-outline.webp"
                            alt="merlin"
                            className="absolute -right-[0.64vw] bottom-0  w-[1.6vw] xl:-right-2 xl:w-5"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsxm(
                'ml-[1.12vw] flex h-[8.96vw] w-[25.6vw] flex-col items-center justify-between border border-legendary/50 bg-legendary/10 px-[0.96vw] py-[1.28vw] xl:ml-3.5 xl:h-[112px] xl:w-[320px] xl:px-3 xl:py-4',
                { 'mt-2': isMobile },
              )}
            >
              <div>
                <div className="flex items-center text-[0.96vw]/[1.6vw] xl:text-xs/5">
                  <li />
                  Get 1 M-Bluebox per 0.6% share holding
                </div>
                <div className="flex items-center text-[0.96vw]/[1.6vw] xl:text-xs/5">
                  <li />
                  Get 1 M-Musicbox per 0.1% share holding
                </div>
                <div className="text-center text-[0.8vw]/[1.6vw] italic text-yellow xl:text-[10px]/5">
                  (i.e. 0.8% = 1 M-Bluebox + 2 M-Musicbox)
                </div>
              </div>

              <div
                className="cursor-pointer text-center text-[1.12vw]/[1.12vw] font-medium text-blue xl:text-sm/3.5"
                onClick={() => setLBPRewardOpen(true)}
              >
                Details
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
