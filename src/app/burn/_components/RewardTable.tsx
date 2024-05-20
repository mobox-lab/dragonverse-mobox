import { useMemo } from 'react';
import { useMainAccount } from '@/hooks/wallet';
import { DragonBallBurnRank } from '@/apis/types';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchBurnRankData } from '@/hooks/burn/useFetchBurnRankData';
import { useMERLRewardColumns } from '@/hooks/burn/useMERLRewardColumns';


export default function RewardTable() {
  const { evmAddress } = useMainAccount();
  const firstLineHighLight = useMemo(() => !!evmAddress, [evmAddress]);
  const { data: fetchData } = useFetchBurnRankData();
  const columns = useMERLRewardColumns(firstLineHighLight);

  const calcData = useMemo(() => {
    const data = fetchData?.length ? fetchData : [];
    if (!evmAddress) return data;
    const myDataIdx = data.findIndex((item) => item.evmAddress === evmAddress);
    const calcData: DragonBallBurnRank[] = [];
    if (myDataIdx === -1) {
      calcData.push({ evmAddress });
      return calcData.concat(data);
    }
    const myData = data[myDataIdx];
    calcData.push(myData);
    return calcData.concat(data);
  }, [evmAddress, fetchData]);

  return (
    <RankTable
      loading={false}
      className="mt-[2.56vw] max-h-[16vw] overflow-x-auto xl:mt-8 xl:max-h-[212px] "
      gapClass="gap-[0.96vw] xl:gap-3"
      headerClass="bg-transparent border-none"
      headerGroupClass="pt-0 xl:pt-0 pt-[0.48vw] xl:pt-1.5"
      rowClass="border-none py-[0.48vw] xl:py-1.5"
      bodyClass="pb-0 xl:pb-0"
      emptyClass="border-none"
      dataSource={calcData}
      columns={columns}
    />
  );
}
