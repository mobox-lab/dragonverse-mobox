'use client';

import { airdropSnapshotEndAtom } from '@/atoms/lbp';
import useCountdown from '@/hooks/useCountdown';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function AirdropCountDown() {
  const countdown = useCountdown(1712908800, 1000, '');
  const setAirdropSnapshotEndAtom = useSetAtom(airdropSnapshotEndAtom);

  useEffect(() => {
    if (countdown !== 'end') return;
    setAirdropSnapshotEndAtom(true);
  }, [countdown, setAirdropSnapshotEndAtom]);

  return <div>{countdown}</div>;
}
