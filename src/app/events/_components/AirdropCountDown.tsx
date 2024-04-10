'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import useCountdown from '@/hooks/useCountdown';
import { airdropSnapshotEndAtom } from '@/atoms/lbp';

export default function AirdropCountDown() {
  const countdown = useCountdown(1712908800, 1000, '');
  const setAirdropSnapshotEndAtom = useSetAtom(airdropSnapshotEndAtom);

  useEffect(() => {
    if (countdown !== 'end') return;
    setAirdropSnapshotEndAtom(true);
  }, [countdown, setAirdropSnapshotEndAtom]);

  return <div className="font-semibold">{countdown}</div>;
}
