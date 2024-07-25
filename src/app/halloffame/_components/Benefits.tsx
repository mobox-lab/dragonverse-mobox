import clsx from 'clsx';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo } from 'react';
import { dvGameIdAtom } from '@/atoms/rank';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useClaimGameAsset } from '@/hooks/stake/useClaimGameAsset';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import { useFetchObtain } from '@/hooks/stake/useFetchObtain';
import { formatNumber } from '@/utils';
import { computeTimeDifference } from '@/utils/date';
import { GAME_ASSETS_ID } from '@/constants/gameAssets';
import Tooltip from '@/components/ui/tooltip';

export default function Benefits() {
  const gameId = useAtomValue(dvGameIdAtom);
  const { data } = useFetchObtain(gameId?.MerlinGameId);
  const { activeEmdblBalance } = useStakeContractRead();
  const { mutateAsync: claimBlueSnitch } = useClaimGameAsset();
  const { data: gameAsset, refetch: refetchGameAsset } = useFetchGameAsset();
  const captureBall = gameAsset?.assets?.[GAME_ASSETS_ID.CaptureBall];

  const onClaimBlueSnitch = useCallback(async () => {
    try {
      await claimBlueSnitch({
        id: GAME_ASSETS_ID.CaptureBall,
      });
      refetchGameAsset();
    } catch (error) {}
  }, [refetchGameAsset, claimBlueSnitch]);

  const recoveryTime = useMemo(() => {
    if (data?.gameStaminaRecoverySec && data?.stamina) {
      const seconds = data?.gameStaminaRecoverySec;
      const days = Math.floor(seconds / (24 * 3600));
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds / 60);

      if (days > 1) {
        return `${days} Days`;
      } else if (hours > 0) {
        return `${hours} Hours`;
      } else if (minutes > 0) {
        return `${minutes} Minutes`;
      } else {
        return `${seconds} Seconds`;
      }
    }

    return '-- Hours';
  }, [data]);

  return (
    <>
      <div className="flex text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">
        <div className="flex-1">My Benefits</div>
        <div className="flex items-center text-yellow">
          <span className="mr-2">Active eMDBL: {formatNumber(activeEmdblBalance, false)}</span>
          <img src="/svg/emdbl.svg" alt="emdbl" />
        </div>
        <div className="ml-5 flex items-center text-yellow">
          <span className="mr-2">MoDragon Power: {gameAsset?.totalDragonPower ?? 0}</span>
          <img src="/svg/modragon-power.svg" alt="power" />
        </div>
      </div>

      <ul className="stamina-list mt-[0.96vw] grid grid-cols-2 gap-[1vw] xl:mt-3 xl:grid-cols-4">
        <li className="relative h-[175px] border-[1px] border-[#807456] bg-[url('/img/stamina-1.png')] xl:h-[155px]">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="pt-[26px] text-center text-[1.8vw]/[1.92vw] font-semibold xl:text-sm/6">Max Stamina</div>
          <div className={clsx('flex-center', data?.stamina ? 'mt-[3vw] xl:mt-7' : 'mt-[3.2vw] xl:mt-6')}>
            <img src="/img/game-power.webp" alt="game power" className="w-[1.6vw] xl:w-5" />
            <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
              {data?.stamina ?? 0}
            </div>
          </div>
        </li>
        <li className="relative h-[175px] border-[1px] border-[#807456] bg-[url('/img/stamina-2.png')] xl:h-[155px]">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="pt-[26px] text-center text-[1.8vw]/[1.92vw] font-semibold xl:text-sm/6">Full Recovery Time</div>
          <div className={clsx('flex-center', data?.stamina ? 'mt-[3vw] xl:mt-7' : 'mt-[3.2vw] xl:mt-6')}>
            <div
              className={clsx(
                'text-[1.92vw]/[2.4vw] font-semibold xl:text-2xl/7.5',
                data?.stamina && data?.gameStaminaRecoverySec ? 'text-green-400' : '',
              )}
            >
              {recoveryTime}
            </div>
          </div>
        </li>
        <li className="relative h-[175px] border-[1px] border-[#807456] bg-[url('/img/stamina-3.png')] xl:h-[155px]">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="pt-[26px] text-center text-[1.8vw]/[1.92vw] font-semibold xl:text-sm/6">Blue Snitch</div>
          <Tooltip title="Current/Total">
            <div
              className={clsx(
                'flex-center',
                captureBall?.unclaim ? 'mt-[2vw] xl:mt-3' : data?.stamina ? 'mt-[3vw] xl:mt-7' : 'mt-[3.2vw] xl:mt-6',
              )}
            >
              <img src="/svg/capture-ball.svg" alt="capture ball" className="h-[2.5vw] xl:h-7" />
              <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
                {captureBall?.unuse || 0}/{captureBall?.total || 0}
              </div>
            </div>
          </Tooltip>
          {captureBall?.unclaim ? (
            <div className="flex-center">
              <Button
                className="relative z-10 mt-[1.4vw] flex h-[2.88vw] w-[12.8vw] items-center justify-center rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-9 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
                type="yellow-shallow"
                loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                onClick={onClaimBlueSnitch}
              >
                Claim
                <span className="mx-1">{captureBall?.unclaim || 0}</span>
                <img src="/svg/capture-ball.svg" alt="capture ball" className="inline-block h-[1.5vw] xl:h-5" />
              </Button>
            </div>
          ) : null}
        </li>
        <li className="relative h-[175px] border-[1px] border-[#807456] bg-[url('/img/stamina-4.png')] xl:h-[155px]">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="pt-[26px] text-center text-[1.8vw]/[1.92vw] font-semibold xl:text-sm/6">Chance of Capture</div>
          <div className={clsx('flex-center', data?.stamina ? 'mt-[4vw] xl:mt-7' : 'mt-[3.2vw] xl:mt-6')}>
            <div
              className={clsx(
                'text-[1.92vw]/[2.4vw] font-semibold xl:text-2xl/7.5',
                data?.stamina && gameAsset?.captureProbability ? 'text-green-400' : '',
              )}
            >
              {data?.stamina ? (gameAsset?.captureProbability || 0) * 100 : '--'}%
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
