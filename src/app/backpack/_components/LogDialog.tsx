import { logDialogAtom } from '@/atoms/dragonverse';
import Dialog from '@/components/ui/dialog';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchLogs } from '@/hooks/useFetchLogs';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import { useLogsColumns } from '@/hooks/useLogsColumns';

interface LogDialogProps {}

const LogDialog: React.FunctionComponent<LogDialogProps> = (props) => {
  const [isOpen, setIsOpen] = useAtom(logDialogAtom);
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchLogs();
  const columns = useLogsColumns();

  const logsItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);
  return (
    <Dialog
      open={isOpen}
      className="w-[48vw] xl:w-[600px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div className="w-full">
          <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Deposit/Withdraw Logs</div>
          <RankTable
            loading={isLoading}
            className="mt-[0.8vw] max-h-[35.68vw] overflow-x-auto xl:mt-2.5 xl:max-h-[446px]"
            dataSource={logsItems ?? []}
            columns={columns}
            renderBottom={() => (
              <>
                {hasNextPage && (
                  <div ref={ref} className="h-px text-transparent">
                    {'Load More'}
                  </div>
                )}
                {isFetchingNextPage && (
                  <div className="flex-center mb-[3.84vw] pt-[1.28vw] xl:mb-12 xl:pt-4">
                    <LoadingSvg className="h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:h-10 xl:w-10" />
                  </div>
                )}
              </>
            )}
          />
        </div>
      )}
    />
  );
};

export default LogDialog;
