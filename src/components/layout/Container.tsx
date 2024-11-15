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
  const { data: invitationInfo, isFetching: isFetchingInvitationInfo } = useFetchInvitationInfo();
  const { value: inviter } = useLocalforage<{ code: string }>(STORAGE_KEY.REFERRAL_USER);
  const { data: inviterData, isFetching: isFetchingInviterData } = useFetchInviterAddressByCode(inviter?.code ?? '');
  const setInviteDialogOpen = useSetAtom(inviteConfirmDialogOpen);

  useEffect(() => {
    if (
      isFetchingInvitationInfo ||
      isFetchingInviterData ||
      !address ||
      !inviter?.code ||
      invitationInfo?.referrer ||
      isSameAddress(address, inviterData?.walletAddress)
    )
      return;

    setInviteDialogOpen(true);
  }, [
    address,
    invitationInfo,
    inviter,
    inviterData,
    inviterData?.walletAddress,
    isFetchingInvitationInfo,
    isFetchingInviterData,
    setInviteDialogOpen,
  ]);

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
