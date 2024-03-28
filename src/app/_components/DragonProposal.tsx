'use client';

import { DragonProposal } from '@/apis/types';
import { DragonProposalState } from '@/constants/enum';
import { clsxm, shortenAddress, shortenSnapStr } from '@/utils';
import { computeTimeDifference } from '@/utils/date';
import { formatCompactNumber } from '@/utils/format';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type DragonProposalProps = {
  data?: DragonProposal;
};

function DragonState({ data }: { data?: DragonProposal }) {
  const { state, isUnique } = data ?? {};
  if (isUnique)
    return <div className="bg-blue/20 px-[0.8vw] text-[0.96vw]/[1.44vw] text-blue xl:px-2.5 xl:text-xs/4.5">Executed</div>;
  if (state === DragonProposalState.ACTIVE)
    return <div className="bg-green/20 px-[0.8vw] text-[0.96vw]/[1.44vw] text-green xl:px-2.5 xl:text-xs/4.5">Active</div>;
  if (state === DragonProposalState.PENDING)
    return (
      <div className="bg-legendary/20 px-[0.8vw] text-[0.96vw]/[1.44vw] text-legendary xl:px-2.5 xl:text-xs/4.5">Pending</div>
    );
  return <div className="bg-gray-300/20 px-[0.8vw] text-[0.96vw]/[1.44vw] text-gray-300 xl:px-2.5 xl:text-xs/4.5">Closed</div>;
}

export default function DragonProposal({ data }: DragonProposalProps) {
  const voteTotal = useMemo(() => {
    const total = formatCompactNumber(data?.scores_total ?? 0);
    return total?.length >= 8 ? shortenSnapStr(total) : total;
  }, [data?.scores_total]);

  const dateStr = useMemo(() => {
    if (data?.state === DragonProposalState.CLOSED) return 'ENDED';

    if (data?.state === DragonProposalState.ACTIVE) {
      const end = data?.end ? dayjs(data.end * 1000) : dayjs();
      const { value, str } = computeTimeDifference(end);
      return (
        <>
          ENDS IN <span className="text-[1.12vw]/[1.6vw] text-yellow xl:text-sm/5">{value}</span> {str}
        </>
      );
    }
    if (data?.state === DragonProposalState.PENDING) {
      const start = data?.start ? dayjs(data.start * 1000) : dayjs();
      const { value, str } = computeTimeDifference(start);
      return (
        <>
          STARTS IN <span className="text-[1.12vw]/[1.6vw] text-yellow xl:text-sm/5">{value}</span> {str}
        </>
      );
    }
  }, [data]);
  return (
    <div
      onClick={() => {
        window.open(`https://snapshot.org/#/dragonverseneo.eth/proposal/${data?.id}`, '_blank');
      }}
      className="group flex h-[19.36vw] cursor-pointer flex-col border border-gray-600 p-[1.28vw] pb-[0.96vw] backdrop-blur-sm hover:bg-white/[0.08] xl:h-[242px] xl:p-4 xl:pb-3"
    >
      <div className="absolute left-0 top-0 origin-top-left border-[0.72vw] border-gray-400 border-b-transparent border-r-transparent transition group-hover:scale-125 xl:border-[9px]" />
      <p className="line-clamp-2 h-[3.84vw] text-[1.28vw]/[1.92vw] font-medium xl:h-12 xl:text-base/6">{data?.title}</p>
      <div className="mt-[1.28vw] border-t border-gray-400 xl:mt-4" />
      <p className="mt-[0.96vw] text-[1.28vw]/[1.92vw] font-medium xl:mt-3 xl:text-base/6">
        <span className="text-yellow">{voteTotal}</span> Votes
      </p>
      <div className="mt-auto">
        <div className="mt-[0.64vw] flex items-center gap-[0.64vw] xl:mt-2 xl:gap-2">
          <DragonState data={data} />
          <p className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">by {shortenAddress(data?.author)}</p>
        </div>
        <div className="mt-[0.64vw] text-[0.96vw]/[1.6vw] font-medium uppercase xl:mt-2 xl:text-xs/5">{dateStr}</div>
        <p
          className={clsxm(
            'mt-[0.96vw] cursor-pointer text-center text-[0.96vw]/[1.92vw] font-medium text-blue xl:mt-3 xl:text-xs/6',
            {
              'text-gray-300': data?.state === DragonProposalState.CLOSED,
            },
          )}
        >
          GO VOTE
        </p>
      </div>
    </div>
  );
}
