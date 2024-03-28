import { useMainAccount } from '@/hooks/wallet';

export function useIsMainCorrectChain() {
  const { walletType } = useMainAccount();
}
