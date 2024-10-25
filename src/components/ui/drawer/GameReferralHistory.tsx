import { gameReferralHistoryDrawerAtom } from '@/atoms/assets';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchInviteHistory, useInviteHistoryColumns } from '@/hooks/invite';
import { useAtom } from 'jotai';

export default function GameReferralHistory() {
  const [isOpen, setIsOpen] = useAtom(gameReferralHistoryDrawerAtom);
  const columns = useInviteHistoryColumns();
  const { data, isFetching } = useFetchInviteHistory();

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Referral History"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[45.4vw] flex-grow flex-col overflow-auto xl:w-[550px]">
          <RankTable
            loading={isFetching}
            className="overflow-auto"
            gapClass="gap-[1.92vw] xl:gap-2"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data ?? []}
            columns={columns}
          />
        </div>
      )}
    />
  );
}
