'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { isSwapPausedAtom } from '@/atoms/lbp';
import { CloseSvg } from '@/components/ui/svg/CloseSvg';
import useFetchNetworkStatus from '@/hooks/useFetchNetworkStatus';

export default function Alert() {
  const { data } = useFetchNetworkStatus();
  const [isShow, setIsShow] = useState<boolean>(false);
  const isSwapPaused = useAtomValue(isSwapPausedAtom);
  const isNetworkError = useMemo(() => data && !data.rpcStatus, [data]);

  useEffect(() => {
    if (isNetworkError || isSwapPaused) {
      setIsShow(true);
    }
  }, [isNetworkError, isSwapPaused]);

  if (!isShow) return null;

  return (
    <div className="relative z-20 h-0 w-full">
      <div className="absolute left-0 top-4 flex w-full items-center justify-between bg-blue-300/30 px-4 py-2 text-sm backdrop-blur-2xl">
        <div>
          {isNetworkError && (
            <p>Due to Merlin Chain RPC error, $MDBL Fair Launch is now experiencing inaccuracy on data displayed.</p>
          )}
          {isSwapPaused && (
            <p>
              $MDBL LBP smart contract is now on pause due to force majeure. Please stay tuned to community notifications for
              updates on the resumption time.
            </p>
          )}
        </div>
        <CloseSvg onClick={() => setIsShow(false)} className="w-3.5 flex-none cursor-pointer stroke-white" />
      </div>
    </div>
  );
}
