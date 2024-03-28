import { Rarity } from '@/constants/enum';
import { clsxm } from '@/utils';

export default function DragonBorder({ className, type }: { className?: string; type?: Rarity }) {
  if (type === undefined) return <div className={clsxm('border-dragon absolute inset-2', className)}></div>;
  return (
    <div
      className={clsxm('border-dragon absolute inset-2', className)}
      style={{ borderImage: `url('/svg/dragon/border/dragon-border-${type}.svg')`, borderImageSlice: 26 }}
    ></div>
  );
}
