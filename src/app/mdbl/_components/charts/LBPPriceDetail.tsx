import { Suspense } from 'react';
import { formatEther } from 'viem';
import { useAtomValue } from 'jotai/index';
import { formatNumber, shortenDigits } from '@/utils';
import { useFetchTotalVolume } from '@/hooks/useFetchTotalVolume';
import { latestBTCPriceAtom, latestMDBLChartPriceAtom, latestMDBLPriceAtom, weightDataAtom } from '@/atoms/lbp';
import { useIsEnd } from '@/hooks/useIsEnd';

export default function LBPPriceDetail() {
  const weightData = useAtomValue(weightDataAtom);
  const { data: totalVolume } = useFetchTotalVolume();
  const latestBTCPrice = useAtomValue(latestBTCPriceAtom);
  const latestMDBLPrice = useAtomValue(latestMDBLPriceAtom);
  const latestMDBLChartPrice = useAtomValue(latestMDBLChartPriceAtom);
  const isEnd = useIsEnd();

  return (
    <div className="mb-[1.6vw] flex justify-between xl:mb-5">
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Current Price</div>
        <div className="mt-[0.48vw] flex items-center text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">
          <img src="/img/mdbl.webp" alt="mdbl" className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />$
          {shortenDigits((latestMDBLPrice.floatValue || latestMDBLChartPrice) * latestBTCPrice.floatValue, 5)}
        </div>
        <div className="mt-[0.32vw] text-left text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-1 xl:text-xs/5">
          {shortenDigits(latestMDBLPrice.floatValue || latestMDBLChartPrice, 5)} BTC
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Total Volume</div>
        <div className="mt-[0.48vw] flex items-center text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">
          <img src="/img/btc.webp" alt="Btc" className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />
          {shortenDigits(Number(formatEther(BigInt(totalVolume?.volume || 0))), 5)}
        </div>
        <div className="mt-[0.32vw] text-left text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-1 xl:text-xs/5">
          ${shortenDigits(Number(formatEther(BigInt(totalVolume?.volume || 0))) * latestBTCPrice.floatValue, 5)}
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Pool Liquidity</div>
        <div className="mt-[0.48vw] flex items-center justify-start xl:mt-1.5">
          <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
          <div className="ml-[0.64vw] text-[1.6vw]/[2.24vw] font-medium text-yellow xl:ml-2 xl:text-xl/7">
            <Suspense fallback="0">
              {isEnd
                ? formatNumber(BigInt(totalVolume?.sharesReserveEnd ?? 0), false)
                : formatNumber(weightData?.[1] || 0n, false)}
            </Suspense>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <img src="/img/btc.webp" alt="Btc" className="w-[1.6vw] xl:w-5" />
          <div className="ml-[0.64vw] text-[1.6vw]/[2.24vw] font-medium text-yellow xl:ml-2 xl:text-xl/7">
            <Suspense fallback="0">
              {isEnd ? formatNumber(BigInt(totalVolume?.assetsReserveEnd ?? 0)) : formatNumber(weightData?.[0] || 0n)}
            </Suspense>
          </div>
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Initial FDV</div>
        <div className="mt-[0.48vw] text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">
          $5M
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">IDO / Total Supply</div>
        <div className="mt-[0.48vw] text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">69%</div>
      </div>
    </div>
  );
}
