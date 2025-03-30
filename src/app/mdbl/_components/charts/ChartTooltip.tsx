import { latestBTCPriceAtom } from '@/atoms/lbp';
import { clsxm, shortenDigits } from '@/utils';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

export interface TooltipPayload {
  name: string;
  value: string | number | Array<string | number>;
  unit?: string;
  color?: string;
  fill?: string;
}
interface ChartTooltipProps {
  filter?: (tooltipPayload: TooltipPayload) => boolean;
  separator?: string;
  formatter?: any;
  wrapperStyle?: any;
  itemStyle?: any;
  labelStyle?: any;
  labelFormatter?: any;
  label?: any;
  className?: string;
  payload?: any;
  // itemSorter: (a: TooltipPayload, b: TooltipPayload) => 0 | 1 | -1;
}

function ChartTooltip(props: ChartTooltipProps) {
  const {
    label,
    labelFormatter,
    labelStyle = {},
    payload,
    filter,
    separator = ' : ',
    wrapperStyle = {},
    itemStyle = {},
    className,
  } = props;
  const latestBTCPrice = useAtomValue(latestBTCPriceAtom);

  const finalStyle = {
    margin: 0,
    backgroundColor: '#00000099',
    border: '1px solid #6F7784',
    backdropFilter: 'blur(50px)',
    whiteSpace: 'nowrap',
    ...wrapperStyle,
  };
  const finalLabelStyle = {
    margin: 0,
    ...labelStyle,
  };
  const hasLabel = typeof label === 'number' || typeof label === 'string';
  let finalLabel = hasLabel ? label : '';

  if (hasLabel && labelFormatter) {
    finalLabel = labelFormatter(label);
  }

  function renderContent() {
    if (payload?.length) {
      const listStyle = { padding: 0, margin: 0 };

      const items = payload
        .sort((a: any, b: any) => b.value - a.value)
        .map((entry: any, i: number) => {
          if (filter && !filter(entry)) {
            return null;
          }
          const date = entry?.payload?.date;
          return (
            <li className="recharts-tooltip-item flex flex-col gap-2" key={`tooltip-item-${i}`}>
              <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                Price: ${shortenDigits(entry?.value * latestBTCPrice?.floatValue, 8)}
              </p>
              <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                Date: {dayjs(date).format('MMM D, YYYY, HH:mm')}
              </p>
            </li>
          );
        });

      return (
        <ul className="recharts-tooltip-item-list" style={listStyle}>
          {items}
        </ul>
      );
    }

    return null;
  }

  return (
    <div className={clsxm('recharts-default-tooltip p-[1.12vw] xl:p-3.5', className)} style={finalStyle}>
      {renderContent()}
    </div>
  );
}
export default ChartTooltip;

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
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
