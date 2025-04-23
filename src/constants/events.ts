export const AIRDROP_COUNT = 10500000000000000000000000n;
export const SELL_COUNT = 821926045890000000000000000n;
export const ETHERS = 1000000000000000000n;

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
