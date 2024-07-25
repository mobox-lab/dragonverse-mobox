import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { walletAssetsDrawerAtom } from '@/atoms/assets';
import DrawerAssets from '@/components/ui/drawer/DrawerAssets';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import WalletSVG from '@/../public/svg/wallet.svg?component';
import { useLocalStorage } from 'react-use';
import { STORAGE_KEY } from '@/constants/storage';

export default function WalletAssets() {
  const [isWalletOpened, setWalletOpened] = useLocalStorage(STORAGE_KEY.WALLET_ASSET_OPENED, false);
  const setDrawerOpen = useSetAtom(walletAssetsDrawerAtom);
  const { data } = useFetchGameAsset();
  const count = useMemo(() => {
    if (typeof data?.assets === 'object') {
      return Object.values(data.assets).reduce((data, item) => item.resId == '10002' ? data : data + item.unclaim, 0);
    }

    return 0;
  }, [data]);

  const onOpenWalletAsset = useCallback(() => {
    setDrawerOpen(true);
    setWalletOpened(true);
  }, []);

  return (
    <div>
      <div
        onClick={onOpenWalletAsset}
        className={clsx(
          'h-[4.96vw] xl:h-12 flex-center relative cursor-pointer border border-yellow/50 bg-yellow-800/60 p-2.5 px-[18px] hover:bg-yellow-800',
          isWalletOpened ? '' : 'ripple-button',
        )}
      >
        <WalletSVG className="w-6.5" />
        <p className="text-[1.12vw]/[1.12vw] ml-[6px] xl:text-sm/3.5 text-yellow">My Assets</p>
        {!!count ? (
          <div className="absolute right-0 top-0 flex h-5 min-w-4 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#F13361] px-1.5 text-[12px] text-white">
            {count}
          </div>
        ) : null}
      </div>
      <DrawerAssets />
    </div>
  );
}
