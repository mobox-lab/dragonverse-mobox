import { useSetAtom } from 'jotai';
import { walletAssetsDrawerAtom } from '@/atoms/assets';
import WalletSVG from '@/../public/svg/wallet.svg?component';
import DrawerAssets from '@/components/ui/drawer/DrawerAssets';

export default function WalletAssets() {
  const setDrawerOpen = useSetAtom(walletAssetsDrawerAtom);

  return (
    <div>
      <div
        onClick={() => setDrawerOpen(true)}
        className="flex-center cursor-pointer border border-yellow/50 bg-yellow-800/60 p-2.5 hover:bg-yellow-800"
      >
        <WalletSVG className="w-6.5" />
      </div>
      <DrawerAssets />
    </div>
  );
}
