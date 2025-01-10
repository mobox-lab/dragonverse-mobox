import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { random } from 'lodash-es';
import { useMutation } from '@tanstack/react-query';
import { balancesAtom, shopDialogAtom } from '@/atoms/assets';
import { FetchBuyGameAsset } from '@/apis/types';
import { fetchBuyGameAsset } from '@/apis';
import TriangleLeftSvg from '@/../public/svg/triangle-left.svg?component';
import NumberInput from '../numberInput';
import Button from '../button';
import { dvGameIdAtom } from '@/atoms/rank';
import Dialog from '.';
import { useQueryBalance } from '@/hooks/user';
import { useFetchGameAsset, useFetchUserFundPrice } from '@/hooks/stake/useFetchGameAsset';

const commoditys = [
  {
    id: 3,
    icon: '/img/senzu-bean.png',
    name: 'Senzu Potion',
    describe: 'Instantly recover 200 Stamina',
    price: 1690,
    usdPrice: 50,
  },
  {
    id: 1,
    icon: '/img/capture-ball.png',
    name: 'Blue Snitch',
    describe: 'Capture DragonPal',
    price: 210,
    usdPrice: 50,
  },
  {
    id: 4,
    icon: '/img/sweep-token.png',
    name: 'Sweep Token',
    describe: 'Speed-sweep for Perfect Victory stages',
    price: 169,
    usdPrice: 50,
  },
] as const;

type CommodityId = (typeof commoditys)[number]['id'];

export default function ShopDialog() {
  const gameId = useAtomValue(dvGameIdAtom);
  const balances = useAtomValue(balancesAtom);
  const refetchBalance = useQueryBalance();
  const [isOpen, setOpen] = useAtom(shopDialogAtom);
  const { address } = useAccount();
  const [count, setCount] = useState(0);
  const [activeCommodity, setActiveCommodity] = useState<CommodityId | null>(null);
  const { refetch: refetchGameAsset } = useFetchGameAsset();
  // const { data: fundPrice, refetch: refetchFundPrice } = useFetchUserFundPrice();
  const { mutateAsync: mutateBuy, isPending: isBuyPending } = useMutation({
    mutationFn(data: FetchBuyGameAsset) {
      return fetchBuyGameAsset(data);
    },
    onSuccess() {
      refetchBalance();
      refetchGameAsset();
      toast.success('Purchase successful');
    },
    onError(error) {
      toast.error(error.message || 'Purchase failed');
    },
  });

  const onCountChange = useCallback(
    (id: CommodityId, value: number) => {
      setActiveCommodity(id);
      setCount(Math.max(value, 0));
    },
    [setActiveCommodity, setCount],
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onBuy = useCallback(async () => {
    await mutateBuy({
      orderId: address + Date.now().toString() + random(),
      consumeId: activeCommodity as number,
      buyCnt: count,
      gameId: gameId!.MerlinGameId,
      timestamp: Math.floor(Date.now() / 1000),
    });
    setCount(0);
  }, [activeCommodity, count, gameId]);

  const onToggleCommodity = useCallback(
    (id: CommodityId) => {
      if (activeCommodity != id) {
        setCount(0);
        setActiveCommodity(id);
      }
    },
    [activeCommodity],
  );

  const totalAmount = useMemo(() => {
    if (activeCommodity) {
      const commodity = commoditys.find((item) => item.id === activeCommodity)!;
      return commodity.price * count;
    }

    return 0;
  }, [activeCommodity, count]);

  const mdblBalance = useMemo(() => {
    if (balances.mdbl) {
      const value = Math.floor(+formatEther(BigInt(balances.mdbl)));
      return value - totalAmount;
    }

    return 0;
  }, [balances, totalAmount]);

  const maxCount = useMemo(() => {
    if (activeCommodity) {
      const balance = formatEther(BigInt(balances.mdbl));
      const commodity = commoditys.find((item) => item.id === activeCommodity)!;
      return Math.floor(+balance / commodity.price);
    }

    return 0;
  }, [activeCommodity, balances.mdbl]);

  useEffect(() => {
    if (count > maxCount) {
      setCount(maxCount);
    }
  }, [count, maxCount]);

  // useEffect(() => {
  //   if (isOpen) {
  //     refetchFundPrice().then();
  //   }
  // }, [isOpen, refetchFundPrice]);

  return (
    <Dialog
      open={isOpen}
      isDismiss={true}
      contentClassName="!pb-0"
      overlayClassName="z-[1111]"
      onOpenChange={onClose}
      render={() => (
        <div className="px-5">
          <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">DragonVerse Shop</div>
          <ul className="mt-[2vw] grid grid-cols-3 gap-x-[1.5vw]">
            {commoditys.map((item) => {
              const isActive = item.id === activeCommodity;

              return (
                <li
                  key={item.id}
                  className={clsx(
                    'relative flex size-[14vw] cursor-pointer flex-col border px-[1.2vw] py-[1.8vw]',
                    isActive ? 'border-green-400' : 'border-[#6f778480] hover:border-[#6f7784]',
                  )}
                  onClick={() => onToggleCommodity(item.id)}
                >
                  {isActive ? <TriangleLeftSvg className="absolute left-0 top-0" /> : null}
                  <div className="absolute right-[0.5vw] top-[0.5vw] flex items-center">
                    <span className="text-[0.9vw] font-semibold text-yellow">{item.price}</span>
                    <img src="/svg/mdbl-in-game.svg" className="ml-1 w-[1.2vw]" />
                  </div>
                  <img src={item.icon} className="mx-auto h-[3.5vw] w-[3.5vw]" />
                  <div className="mt-1 text-center text-[0.9vw] font-medium">{item.name}</div>
                  <p className="flex flex-1 items-center justify-center text-center text-[0.7vw] leading-[1.2]">
                    {item.describe}
                  </p>
                  <NumberInput
                    className={clsx('!w-full', isActive ? 'opacity-100' : 'opacity-50')}
                    value={isActive ? count : 0}
                    onChange={(value) => onCountChange(item.id, value)}
                  />
                </li>
              );
            })}
          </ul>
          <div className="mt-[2.5vw] w-full border-t-[1px] border-gray" />
          <div className="flex items-center py-[1.5vw]">
            <div className="flex-1 leading-none">
              <div className="flex items-center">
                <span className="text-sm">Total:&nbsp;</span>
                <span className="text-[1.8vw] font-medium text-yellow xl:text-[1.2vw]">{totalAmount.toLocaleString()}</span>
                <img src="/img/mdbl-in-game.png" className="ml-1 w-[1.8vw] xl:w-[1.1vw]" />
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-sm">Available:&nbsp;</span>
                <span className="text-sm font-medium text-yellow">{mdblBalance.toLocaleString()}</span>
              </div>
            </div>
            <Button
              type="yellow-dark"
              className="w-[11vw] xl:w-[10vw]"
              onClick={onBuy}
              loading={isBuyPending}
              disabled={!count}
            >
              BUY
            </Button>
          </div>
        </div>
      )}
    />
  );
}
