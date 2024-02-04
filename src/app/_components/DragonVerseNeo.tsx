import LoadingSvg from '@/../public/svg/loading.svg?component';
import RightSvg from '@/../public/svg/right.svg?component';
import { dragonBurnDialogOpenAtom, dragonWalletConnectDialogAtom } from '@/atoms/dragonverse';
import Button from '@/components/ui/button';
import Empty from '@/components/ui/empty';
import Segmented from '@/components/ui/segmented';
import { DragonProposalSortField } from '@/constants/enum';
import { useFetchP12DragonGovernInfo } from '@/hooks/useFetchP12DragonGovernInfo';
import { useFetchP12DragonProposalNum } from '@/hooks/useFetchP12DragonProposalNum';
import { useFetchP12DragonProposals } from '@/hooks/useFetchP12DragonProposals';
import { clsxm } from '@/utils';
import { useSetAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useAccount } from 'wagmi';
import DragonBorder from './DragonBorder';
import DragonProposal from './DragonProposal';

const opts = [
  { label: 'ALL', value: DragonProposalSortField.ALL },
  { label: 'Active Proposals', value: DragonProposalSortField.ACTIVE_PROPOSALS },
  { label: 'Executed Proposals', value: DragonProposalSortField.EXECUTED_PROPOSALS }, // TODO: NEO API
];
export default function DragonVerseNeo({ className }: { className?: string }) {
  const [type, setType] = useState<DragonProposalSortField>(DragonProposalSortField.ALL);
  const { address } = useAccount();
  const { data: governInfo, isLoading } = useFetchP12DragonGovernInfo();
  const { data, isLoading: isLoadingProposals, fetchNextPage, hasNextPage } = useFetchP12DragonProposals(type);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const setDragonBurnDialogOpen = useSetAtom(dragonBurnDialogOpenAtom);
  const setWalletConnect = useSetAtom(dragonWalletConnectDialogAtom);
  const proposals = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);
  const { data: remainingNum } = useFetchP12DragonProposalNum();

  const openBurnDialog = useCallback(() => {
    if (!address) {
      setWalletConnect(true);
      return;
    }
    setDragonBurnDialogOpen(true);
  }, [address, setDragonBurnDialogOpen, setWalletConnect]);

  return (
    <div
      className={clsxm(
        'relative mt-12 border border-gray-600 bg-black/60 px-[3vw] py-[3.52vw] backdrop-blur-sm xl:px-7.5 xl:py-11',
        className,
      )}
    >
      <DragonBorder className="inset-2 -z-10" />
      {/* <div className="flex-center">
        <img draggable={false} src="/img/dragon-neo-title.webp" alt="DragonVerse" className="h-13" />
      </div> */}
      {/* <p className="mt-2 text-center text-sm/6 font-medium">Co-created & Co-governed</p> */}
      {/* <div
        className={clsx(
          'flex-center -mx-[1.6vw] mt-[1.12vw] gap-[2.4vw] bg-white/10 py-[0.48vw] xl:-mx-5 xl:mt-3.5 xl:gap-7.5 xl:py-1.5',
          {
            'animate-pulse': isLoading,
          },
        )}
      >
        <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">
          <span className="text-yellow text-[1.6vw]/[1.92vw] xl:text-xl/6">
            {governInfo?.activeProposal?.toLocaleString() ?? 0}
          </span>{' '}
          active proposals
        </div>
        <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">
          <span className="text-yellow text-[1.6vw]/[1.92vw] xl:text-xl/6">
            {governInfo?.closedProposal?.toLocaleString() ?? 0}
          </span>{' '}
          closed Proposals
        </div>
        <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">
          <span className="text-yellow text-[1.6vw]/[1.92vw] xl:text-xl/6">
            {governInfo?.voterLength?.toLocaleString() ?? 0}
          </span>{' '}
          voters
        </div>
        <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">
          <span className="text-yellow text-[1.6vw]/[1.92vw] xl:text-xl/6">
            {governInfo?.votesCount?.toLocaleString() ?? 0}
          </span>{' '}
          DragonBit Votes
        </div>
      </div> */}
      <div className="mx-[0.8vw] xl:mx-2.5 ">
        <div className="mt-[2.88vw] flex items-end gap-[1.28vw] xl:mt-9 xl:gap-4">
          {/* <Button
            type="red"
            className="flex h-[4.8vw] w-[21.44vw] flex-col items-center gap-[0.16vw] py-[0.96vw] text-[1.6vw]/[1.6vw] font-bold xl:h-15 xl:w-[268px] xl:gap-0.5 xl:py-3 xl:text-xl/5"
            onClick={() => window.open('https://snapshot.org/#/dragonverseneo.eth', '_blank')}
          >
            Voting Hall <div className="text-[0.96vw]/[0.96vw] font-semibold xl:text-xs/3">Snapshot</div>
          </Button> */}
          <Button
            type="red"
            className="h-[4.8vw] w-[18.8vw] whitespace-nowrap py-[0.96vw] text-[1.6vw]/[1.6vw] font-bold xl:h-15 xl:w-[235px] xl:py-3 xl:text-xl/5"
            onClick={() => {
              if (!remainingNum) {
                openBurnDialog();
                return;
              }
              window.open('https://snapshot.org/#/dragonverseneo.eth/create', '_blank');
            }}
          >
            Start a Proposal
          </Button>
          <div className="flex h-[4.8vw] items-center gap-[0.16vw] xl:h-15 xl:gap-2">
            <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm">remaining:</div>
            <div className="flex h-full items-center border-none bg-white/[0.12] px-0 text-center text-[1.6vw]/[1.6vw] font-semibold xl:text-xl/5">
              <span className="flex-center h-full w-[4.8vw] xl:w-[60px]">{remainingNum ?? 0}</span>
              <div className="-mr-px h-[3.2vw] w-px bg-gray xl:h-10" />
              <span
                className="flex-center h-full w-[4.8vw] cursor-pointer hover:bg-white/[0.16] xl:w-[60px]"
                onClick={openBurnDialog}
              >
                +
              </span>
            </div>
          </div>
          <Segmented
            className="ml-auto h-[3.04vw] whitespace-nowrap text-[1.12vw]/[1.28vw] font-semibold xl:h-[38px] xl:text-sm/4"
            defaultValue={type}
            onChange={(value) => {
              setType(value as DragonProposalSortField);
            }}
            options={opts}
          />
        </div>
        <div className="relative mt-[2.4vw] xl:mt-7.5">
          <div
            className="flex-center absolute -left-[1.6vw] top-1/2 z-10 h-[9.6vw] w-[1.6vw] -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/[0.08] xl:-left-5 xl:h-30 xl:w-5"
            onClick={() => swiper?.slidePrev()}
          >
            <RightSvg className="w-[1.44vw rotate-180 fill-[#4C4C4C] xl:w-4.5" />
          </div>
          <Swiper
            keyboard={{
              enabled: true,
            }}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(swiper) => {
              if (((swiper?.activeIndex ?? 0) % 15 === 12 || swiper?.isEnd) && hasNextPage) fetchNextPage();
            }}
            className="relative"
            draggable
            grabCursor
            initialSlide={0}
            slidesPerView={4}
            spaceBetween={16}
            modules={[Keyboard]}
          >
            {isLoadingProposals ? (
              <div className="flex-center h-[19.36vw] xl:h-[242px]">
                <LoadingSvg className="h-[3.2vw] w-[3.2vw] xl:h-10 xl:w-10" />
              </div>
            ) : proposals?.length ? (
              proposals.map((proposal) => (
                <SwiperSlide key={proposal.id}>
                  <DragonProposal data={proposal} />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex-center h-[19.36vw] xl:h-[242px]">
                <Empty />
              </div>
            )}
          </Swiper>
          <div
            className="flex-center absolute -right-[1.6vw] top-1/2 h-[9.6vw] w-[1.6vw] -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/[0.08] xl:-right-5 xl:h-30 xl:w-5"
            onClick={() => swiper?.slideNext()}
          >
            <RightSvg className="w-[1.44vw] fill-[#4C4C4C] xl:w-4.5" />
          </div>
        </div>
        <div className="mt-[3.84vw] flex items-center justify-between xl:mt-12">
          <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
            <img className="h-[4.16vw] xl:h-13" draggable={false} alt="Voting Power" src="/img/dragon-voting-power.png" />
            <p className="text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">The Voting power for Co-governance</p>
          </div>
          <div className="flex items-center gap-[0.96vw] border border-gray-400 p-[0.96vw] pr-[1.6vw] xl:gap-3 xl:p-3 xl:pr-5">
            <img
              className="h-[8.16vw] w-[8.16vw] select-none xl:h-25.5 xl:w-25.5"
              draggable={false}
              alt="ve-mobox"
              src="/img/ve-mobox.png"
            />
            <div className="flex w-[21.92vw] flex-col gap-[0.96vw] xl:w-[274px] xl:gap-3">
              <h4 className="text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">$veMBOX</h4>
              <p className="line-clamp-2 text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">
                Your $veMBOX balance is equivalent to votes on a 1:1 ratio
              </p>
            </div>
            <Button
              type="green"
              className="ml-[0.96vw] flex w-[8.8vw] flex-col items-center gap-[0.16vw] py-[0.96vw] text-[1.44vw]/[1.6vw] font-bold xl:ml-3 xl:w-[110px] xl:gap-0.5 xl:py-3 xl:text-lg/5"
              onClick={() => window.open('https://www.mobox.io/#/iframe/momo', '_blank')}
            >
              GET
            </Button>
          </div>
        </div>
        <div className="mt-[2.4vw] xl:mt-7.5 "></div>
      </div>
    </div>
  );
}
