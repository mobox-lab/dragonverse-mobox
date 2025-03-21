import { Suspense } from 'react';
import { formatEther } from 'viem';
import { useAtomValue } from 'jotai/index';
import { latestBTCPriceAtom } from '@/atoms/lbp';
import { formatNumber, shortenDigits } from '@/utils';

export default function LBPPriceDetail() {
  const volume = 352378686242206412763n;
  const assetsReserveEnd = 109498062390917395343n;
  const sharesReserveEnd = 627073954101545653269268280n;
  const latestBTCPrice = useAtomValue(latestBTCPriceAtom);
  const latestMDBLChartPrice = 1.80368880167e-7;

  return (
    <div className="mb-[1.6vw] flex justify-between xl:mb-5">
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Current Price</div>
        <div className="mt-[0.48vw] flex items-center text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">
          <img src="/img/mdbl.webp" alt="mdbl" className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />$
          {shortenDigits(latestMDBLChartPrice * latestBTCPrice.floatValue, 5)}
        </div>
        <div className="mt-[0.32vw] text-left text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-1 xl:text-xs/5">
          {shortenDigits(latestMDBLChartPrice, 5)} BTC
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Total Volume</div>
        <div className="mt-[0.48vw] flex items-center text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">
          <img src="/img/btc.webp" alt="Btc" className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />
          {shortenDigits(Number(formatEther(volume)), 5)}
        </div>
        <div className="mt-[0.32vw] text-left text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-1 xl:text-xs/5">
          ${shortenDigits(Number(formatEther(volume)) * latestBTCPrice.floatValue, 5)}
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Pool Liquidity</div>
        <div className="mt-[0.48vw] flex items-center justify-start xl:mt-1.5">
          <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
          <div className="ml-[0.64vw] text-[1.6vw]/[2.24vw] font-medium text-yellow xl:ml-2 xl:text-xl/7">
            <Suspense fallback="0">{formatNumber(sharesReserveEnd, false)}</Suspense>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <img src="/img/btc.webp" alt="Btc" className="w-[1.6vw] xl:w-5" />
          <div className="ml-[0.64vw] text-[1.6vw]/[2.24vw] font-medium text-yellow xl:ml-2 xl:text-xl/7">
            <Suspense fallback="0">{formatNumber(assetsReserveEnd)}</Suspense>
          </div>
        </div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">Initial FDV</div>
        <div className="mt-[0.48vw] text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">$5M</div>
      </div>
      <div>
        <div className="text-left text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:text-sm/6">IDO / Total Supply</div>
        <div className="mt-[0.48vw] text-left text-[1.6vw]/[2.24vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7">69%</div>
      </div>
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
