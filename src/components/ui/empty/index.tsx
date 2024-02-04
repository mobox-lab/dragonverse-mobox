import EmptySVG from '@/../public/svg/empty.svg?component';
import { clsx } from 'clsx';

export default function Empty({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <EmptySVG className="w-[3.84vw] xl:w-12" />
      <p className="mt-[1.28vw] text-[1.12vw]/[1.6vw] text-gray-300 xl:mt-4 xl:text-sm">No Data</p>
    </div>
  );
}
