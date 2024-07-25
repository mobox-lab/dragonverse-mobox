import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { parseEther } from 'ethers/utils';
import { useAccount, useSignMessage } from 'wagmi';
import Dialog from '.';
import { confirmWithdrawDialogAtom } from '@/atoms/assets';
import { useMainAccount } from '@/hooks/wallet';
import { shortenAddress } from '@/utils';
import Button from '../button';
import { useMutateWithdraw } from '@/hooks/user';

export default function WithdrawDialog() {
  const [withdrawAmount, setWithdrawAmount] = useAtom(confirmWithdrawDialogAtom);
  const { evmAddress } = useMainAccount();
  const { mutateAsync, isPending } = useMutateWithdraw();
  const { signMessageAsync } = useSignMessage();
  const { chainId } = useAccount();

  const onClose = useCallback(() => {
    setWithdrawAmount(null);
  }, [setWithdrawAmount]);

  const onWithdraw = useCallback(async () => {
    let sign: string;
    const timestamp = Math.floor(Date.now() / 1000);

    try {
      sign = await signMessageAsync({ message: `wallet_withdraw_${timestamp}` });
    } catch (error) {
      toast.error('Reject the Withdraw request.');
      return;
    }

    try {
      await mutateAsync({
        tokenName: 'mdbl',
        chainId: chainId!,
        amount: parseEther(withdrawAmount!.toString()).toString(),
        sign,
        timestamp,
      });

      onClose();
      toast.success('Withdrawal successful');
    } catch (error: any) {
      toast.error(error?.message || 'Withdraw Failed');
    }
  }, [mutateAsync, withdrawAmount, onClose, chainId]);

  return (
    <Dialog
      isDismiss
      open={!!withdrawAmount}
      contentClassName="pb-[2.88vw] xl:pb-9"
      overlayClassName="z-[110]"
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      onOpenChange={onClose}
      render={() => (
        <div>
          <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Confirm Withdraw</div>
          <div className="mt-[2.56vw] text-center text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
          Please verify below information.
          </div>
          <div className="pl-[2.4vw] xl:pl-[50px]">
            <div className="mt-[2.56vw] flex items-center justify-center text-[1.28vw]/[2.56vw] font-semibold xl:mt-8 xl:text-base/8">
              <div className="w-[48%]">Withdrawing: </div>
              <div className="flex-1 text-yellow">{withdrawAmount} $MDBL</div>
            </div>
            <div className="flex items-center justify-center text-[1.28vw]/[2.56vw] font-semibold xl:text-base/8">
              <div className="w-[48%]">Receiving: </div>
              <div className="flex-1 text-yellow">{withdrawAmount ? withdrawAmount - 100 : 0} $MDBL</div>
            </div>
            <div className="flex items-center justify-center text-[1.28vw]/[2.56vw] font-semibold xl:text-base/8">
              <div className="w-[48%]">Recipient: </div>
              <div className="flex-1">{shortenAddress(evmAddress)}</div>
            </div>
          </div>
          <Button
            type="yellow-dark"
            className="mt-[2.88vw] h-[3.52vw] w-full font-semibold xl:mt-9 xl:h-11"
            loading={isPending}
            onClick={onWithdraw}
          >
            Confirm
          </Button>
        </div>
      )}
    />
  );
}
