import LoadingSvg from '@/../public/svg/loading.svg?component';
import { clsxm } from '@/utils';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Fragment, ReactNode, useMemo } from 'react';

type RankTableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
  headerClass?: string;
  headerGroupClass?: string;
  bodyClass?: string;
  rowClass?: string;
  gapClass?: string;
  emptyClass?: string;
  loading?: boolean;
  renderBottom?: () => ReactNode;
  firstLineHighLight?: boolean;
};

export default function RankTable({
  dataSource,
  columns,
  className,
  loading,
  renderBottom,
  headerClass,
  headerGroupClass,
  bodyClass,
  rowClass,
  gapClass,
  emptyClass,
  firstLineHighLight,
}: RankTableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={clsxm('flex w-full flex-col overflow-auto text-right', className)}>
      <div className={clsxm('border-b border-gray bg-[#43454980]', headerClass)}>
        {getHeaderGroups().map((headerGroup) => (
          <div
            className={clsxm(
              'flex w-full gap-[1.92vw] py-[0.8vw] text-[0.96vw]/[1.44vw] font-medium xl:gap-6 xl:py-2.5 xl:text-xs/4.5',
              headerGroupClass,
              gapClass,
            )}
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </div>
        ))}
      </div>
      <div className={clsxm('scrollbar-hide flex flex-grow flex-col overflow-auto pb-[3.2vw] xl:pb-10', bodyClass)}>
        {rows.length ? (
          rows.map((row, idx) => (
            <motion.div
              className={clsxm(
                'flex w-full items-center gap-[1.92vw] border-b border-gray py-[0.96vw] text-[0.96vw]/[1.44vw] font-medium xl:gap-6 xl:py-3 xl:text-xs/4.5',

                { 'bg-[#4d442e]/30': idx === 0 && firstLineHighLight },
                rowClass,
                gapClass,
              )}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>;
              })}
            </motion.div>
          ))
        ) : loading ? (
          <div className="flex-center">
            <LoadingSvg className="mt-[2.56vw] h-[3.2vw] w-[3.2vw] animate-spin fill-white/20 xl:mt-8 xl:h-10 xl:w-10" />
          </div>
        ) : (
          <div
            className={clsxm(
              'flex-center border-b border-gray py-[1.28vw] text-[0.96vw]/[1.44vw] font-medium text-gray-300 xl:py-4 xl:text-xs/4.5',
              emptyClass,
            )}
          >
            No Data
          </div>
        )}
        {renderBottom?.()}
      </div>
    </div>
  );
}
