import { useMainAccount } from '@/hooks/wallet';
import { shortenAddress } from '@/utils/shorten';

export default function Web3StatusInner() {
  const { majorAddress } = useMainAccount();
  return <div>{shortenAddress(majorAddress)}</div>;
}
