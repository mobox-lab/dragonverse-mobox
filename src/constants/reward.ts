export type RewardDataItem = {
  balance: string;
  share: string;
  musicBox: number;
  blueBox: number;
};

export const generateRewardData = () => {
  let data = [];
  let totalBalance = 2100000;
  let balancePerItem = totalBalance * 1;

  for (let i = 1; i <= 50; i++) {
    let musicBox = 0,
      blueBox = 0;
    let share = (i * 0.1).toFixed(1) + '%';
    let balance = (balancePerItem * i).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    blueBox = Math.floor(i / 6);
    musicBox = i % 6;

    data.push({
      balance,
      share,
      musicBox,
      blueBox,
    });
  }

  return data;
};

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
