import { fetchObtain } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';
import { useMemo } from 'react';
import { convertScientificToNormal } from '@/utils';
import { GameStaminaConfig, ObtainData } from '@/apis/types';

export function useFetchObtain() {
  const { evmAddress } = useMainAccount();
  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_obtain', evmAddress],
    queryFn: () => fetchObtain(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
    enabled: !!evmAddress,
  });

  return useMemo(() => {
    if (data) {
      const jsonString = JSON.stringify(data?.gameStaminaConfig, (key, value) => {
        if (typeof value === 'number') {
          return convertScientificToNormal(value);
        }
        return value;
      });
      const jsonData: GameStaminaConfig[] = JSON.parse(jsonString);
      console.log(jsonData);
      console.log(data);

      const stamina = data.stamina;

      const nextLevel = jsonData.find((item) => parseInt(item.stamina.toString(), 10) > stamina);

      return { data: data, config: jsonData, nextLevel: nextLevel, refetch };
    } else {
      return { data: undefined, config: [], refetch };
    }
  }, [data, refetch]);
}
