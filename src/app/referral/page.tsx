'use client';

import { STORAGE_KEY } from '@/constants/storage';
import { useIsMounted } from '@/hooks/useIsMounted';
// import { useFetchUserByInviteCode } from '@/hooks/invite';
import { useLocalforage } from '@/hooks/useLocalforage';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function Referral() {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  // const { data, isLoading } = useFetchUserByInviteCode(code);
  const { setLocalValue } = useLocalforage(STORAGE_KEY.REFERRAL_USER);

  const inviteRedirect = useCallback(async () => {
    if (isMounted) {
      await setLocalValue({ code: 'inviter' });
      // 使用 window.location.href 进行重定向
      window.location.href = '/';
    }
  }, [isMounted, setLocalValue]);

  useEffect(() => {
    if (!isMounted) return;
    // if (isLoading) return;
    inviteRedirect();
  }, [inviteRedirect, isMounted]);

  return null;
}
