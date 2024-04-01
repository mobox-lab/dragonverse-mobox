import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';

export default function Summary() {
  return (
    <div className="mt-[4vw] flex items-center justify-between xl:mt-12.5">
      <div>Stake to Earn</div>
      <div
        className={clsxm(
          'relative h-[10.24vw] w-[48vw] border border-yellow/50 bg-yellow/[0.08] backdrop-blur-sm xl:h-[128px] xl:w-[600px]',
        )}
      >
        <PatternWithoutLine className="stroke-yellow" />
      </div>
    </div>
  );
}
