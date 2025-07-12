import { atom } from 'jotai';

export const siderCollapsedAtom = atom<boolean>(false);

export const dragonBallUnboxDialogOpenAtom = atom<boolean>(false);

export const LBPRewardDialogOpenAtom = atom<boolean>(false);
export const stakeHistoryDialogOpenAtom = atom<boolean>(false);

export const isMobileAtom = atom<boolean>(false);

export const dragonBoxUnboxNumAtom = atom<number>(6);

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
