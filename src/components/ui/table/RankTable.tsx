import LoadingSvg from '@/../public/svg/loading.svg?component';
import Empty from '@/components/ui/empty';
import { clsxm } from '@/utils';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Fragment, ReactNode, useMemo } from 'react';

type RankTableProps = {
  dataSource: any[];
  columns: any[];
  className?: string;
  loading?: boolean;
  renderBottom?: () => ReactNode;
};

export default function RankTable({ dataSource, columns, className, loading, renderBottom }: RankTableProps) {
  const data = useMemo(() => dataSource, [dataSource]);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className={clsxm('flex w-full flex-col overflow-auto text-right', className)}>
      <div className="border-b border-gray bg-[#43454980]">
        {getHeaderGroups().map((headerGroup) => (
          <div className="flex w-full gap-6 py-2.5 text-xs/4.5 font-semibold" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-grow flex-col overflow-auto pb-10">
        {rows.length ? (
          rows.map((row) => (
            <motion.div className={clsxm('flex w-full gap-6 border-b border-gray py-4 text-xs/4.5 font-semibold')} key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>;
              })}
            </motion.div>
          ))
        ) : loading ? (
          <div className="flex-center">
            <LoadingSvg className="mt-8 h-10 w-10 animate-spin fill-gray-300" />
          </div>
        ) : (
          <div className="flex-center">
            <Empty />
          </div>
        )}
        {renderBottom?.()}
      </div>
    </div>
  );
}
