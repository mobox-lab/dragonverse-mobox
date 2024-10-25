'use client';

import { ReactNode, useEffect } from 'react';
import { clsxm, isSameAddress } from '@/utils';
import { useIsHome } from '@/hooks/useIsHome';
import { useFetchGameId } from '@/hooks/rank/useFetchGameId';
import { useLocalforage } from '@/hooks/useLocalforage';
import { STORAGE_KEY } from '@/constants/storage';
import { inviteConfirmDialogOpen } from '@/atoms/user';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';
import { useFetchInvitationInfo, useFetchInviterAddressByCode } from '@/hooks/invite';

export default function Container({ children }: { children: ReactNode }) {
  const { isHome } = useIsHome();
  const { address } = useAccount();
  const { data: invitationInfo } = useFetchInvitationInfo();
  const { data: inviterData } = useFetchInviterAddressByCode();
  const { value: inviter } = useLocalforage<string>(STORAGE_KEY.REFERRAL_USER);
  const setInviteDialogOpen = useSetAtom(inviteConfirmDialogOpen);

  useEffect(() => {
    if (!address || !inviter || invitationInfo?.referrer || isSameAddress(address, inviterData?.walletAddress)) return;
    setInviteDialogOpen(true);
  }, [address, invitationInfo?.referrer, inviter, inviterData?.walletAddress, setInviteDialogOpen]);

  useFetchGameId();

  return (
    <div
      className={clsxm('relative ml-[6.88vw] flex-auto overflow-auto transition-all ease-in-out xl:ml-[86px]', {
        '!ml-[19.04vw] xl:!ml-[238px]': isHome,
      })}
    >
      {children}
    </div>
  );
}
