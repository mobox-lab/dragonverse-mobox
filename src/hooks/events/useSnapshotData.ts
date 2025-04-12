import { useQuery } from '@tanstack/react-query';
import { fetchAirdropSnap } from '@/apis';
import { useAtomValue } from 'jotai/index';
import { accessTokenAtom } from '@/atoms';

export function useSnapshotData() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_snapshot_data', accessToken],
    queryFn: () => fetchAirdropSnap(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken,
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
