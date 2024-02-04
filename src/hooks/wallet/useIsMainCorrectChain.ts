import { useMainAccount } from '@/hooks/wallet/useMainAccount';

export function useIsMainCorrectChain() {
  const { walletType } = useMainAccount();
}
