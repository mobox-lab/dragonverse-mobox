import { useAtom } from 'jotai';
import Dialog from '.';
import { confirmWithdrawDialogAtom } from '@/atoms/assets';
import { useMainAccount } from '@/hooks/wallet';
import { shortenAddress } from '@/utils';
import Button from '../button';

export default function WithdrawDialog() {
  const [isOpen, setIsOpen] = useAtom(confirmWithdrawDialogAtom);
  const { evmAddress } = useMainAccount();
  return (
    <Dialog
      open={isOpen}
      contentClassName="pb-[2.88vw] xl:pb-9"
      overlayClassName="z-[110]"
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div>
          <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Confirm Withdraw</div>
          <div className="mt-[2.56vw] text-center text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
            {"Please confirm your withdraw information. Once confirm the operation can't be reverted"}
          </div>
          <div className="mt-[2.56vw] flex items-center justify-center gap-[0.32vw] text-[1.28vw]/[2.56vw] font-semibold xl:mt-8 xl:gap-1 xl:text-base/8">
            <div>Amount: </div>
            <div className="text-yellow">2000 $MDBL</div>
          </div>
          <div className="flex items-center justify-center gap-[0.32vw] text-[1.28vw]/[2.56vw] font-semibold xl:gap-1 xl:text-base/8">
            <div>Receiver: </div>
            <div>{shortenAddress(evmAddress)}</div>
          </div>
          <Button type="yellow-dark" className="mt-[2.88vw] h-[3.52vw] w-full font-semibold xl:mt-9 xl:h-11">
            Confirm
          </Button>
        </div>
      )}
    />
  );
}
