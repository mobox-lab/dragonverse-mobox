import { clsxm } from '@/utils';

export default function DragonBorder({ className }: { className?: string }) {
  return <div className={clsxm('border-dragon absolute inset-2', className)}></div>;
}
