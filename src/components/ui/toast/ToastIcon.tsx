'use client';

import ErrorSvg from '@/../public/svg/error.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import SuccessSvg from '@/../public/svg/success.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';

type ToastIconProps = {
  type?: 'success' | 'error' | 'loading' | 'warning' | string;
  theme?: string;
};

function ToastIcon({ type }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className="h-5 w-5">
        <SuccessSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="h-5 w-5">
        <ErrorSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div className="h-5 w-5">
        <WarningSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'loading') {
    // custom
    return (
      <div className="h-5 w-5 fill-white">
        <LoadingSvg className="animate-spin" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
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
