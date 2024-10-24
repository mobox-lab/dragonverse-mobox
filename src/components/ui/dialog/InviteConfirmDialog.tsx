'use client';
import { inviteConfirmDialogOpen } from '@/atoms/user';
import { STORAGE_KEY } from '@/constants/storage';
import { useLocalforage } from '@/hooks/useLocalforage';
import { clsxm } from '@/utils';
import { useAtom } from 'jotai';
import Dialog from '.';
import Button from '../button';

export default function InviteConfirmDialog() {
  const [isOpen, setIsOpen] = useAtom(inviteConfirmDialogOpen);
  const { setLocalValue } = useLocalforage(STORAGE_KEY.REFERRAL_USER);
  const inviterAddress = '0x82df..190a';

  return (
    <Dialog
      open={isOpen}
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      contentClassName="pb-[2.88vw] xl:pb-9 px-[2.08vw] xl:px-6.5"
      onOpenChange={setIsOpen}
      render={({ close }) => (
        <div className="text-white">
          <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Referral Request</div>
          <p className="mt-[2.56vw] text-[1.12vw]/[1.92vw] font-semibold xl:mt-8 xl:text-sm/6">
            <span className="text-yellow">{inviterAddress}</span> is inviting you to experience the new season of Dragonverse
            Neo.
          </p>
          <div className="mt-[2.56vw] flex items-center text-[1.12vw]/[1.92vw] font-semibold xl:mt-8 xl:text-sm/6">
            Accepting the invitation to receive
            <div className="ml-[0.64vw] flex items-center gap-[0.32vw] text-yellow xl:ml-2 xl:gap-1">
              <img src="/svg/senzu-bean.svg" className="w-[1.76vw] xl:w-5.5" alt="" />
              Senzu Bean x 2
            </div>
          </div>
          <p className="mt-[0.96vw] text-[0.96vw]/[1.6vw] font-semibold xl:mt-3 xl:text-xs/5">Note</p>
          <ul className="ml-[0.96vw] mt-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-3 xl:mt-1.5 xl:text-xs/5">
            <li>Once accepted, it cannot be canceled or changed.</li>
            <li>10% of your spent $MDBL will be given to {inviterAddress} as a commission.</li>
            <li>Only players who did not play Dragonverse Neo S6 are eligible to accept the invitation.</li>
          </ul>
          <Button
            // loading={isLoading}
            type="yellow-dark"
            className={clsxm('mt-[2.56vw] h-[3.52vw] w-full font-semibold xl:mt-8 xl:h-11')}
            onClick={() => {
              setLocalValue(null);
              close();
            }}
          >
            Confirm
          </Button>
        </div>
      )}
    />
  );
}
