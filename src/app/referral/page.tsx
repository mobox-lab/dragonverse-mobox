'use client';

import { STORAGE_KEY } from '@/constants/storage';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useLocalforage } from '@/hooks/useLocalforage';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

function ReferralContent() {
  const isMounted = useIsMounted();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const { setLocalValue } = useLocalforage(STORAGE_KEY.REFERRAL_USER);

  const inviteRedirect = useCallback(async () => {
    if (isMounted) {
      await setLocalValue({ code });
      window.location.href = '/';
    }
  }, [code, isMounted, setLocalValue]);

  useEffect(() => {
    if (!isMounted) return;
    inviteRedirect();
  }, [inviteRedirect, isMounted]);

  return null;
}

export default function Referral() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ReferralContent />
    </React.Suspense>
  );
}
