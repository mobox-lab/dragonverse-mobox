'use client';

import { ReactNode, useEffect } from 'react';
import { clsxm } from '@/utils';
import { useIsHome } from '@/hooks/useIsHome';
import { useFetchGameId } from '@/hooks/rank/useFetchGameId';
import { useLocalforage } from '@/hooks/useLocalforage';
import { STORAGE_KEY } from '@/constants/storage';
import { inviteConfirmDialogOpen } from '@/atoms/user';
import { useSetAtom } from 'jotai';

export default function Container({ children }: { children: ReactNode }) {
  const { isHome } = useIsHome();

  const { value: inviter } = useLocalforage<{ code: string }>(STORAGE_KEY.REFERRAL_USER);
  const setInviteDialogOpen = useSetAtom(inviteConfirmDialogOpen);

  useEffect(() => {
    // if (!inviter || isSameAddress(address, inviter?.walletAddress) || invitationInfo?.referralBy) return;
    if (!inviter?.code) return;
    console.log('inviter:', { inviter });
    setInviteDialogOpen(true);
  }, [inviter, setInviteDialogOpen]);

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
