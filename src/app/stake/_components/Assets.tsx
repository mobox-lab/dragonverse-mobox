import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';

export default function Assets() {
  return (
    <div
      className={clsxm(
        'relative mt-[2.88vw] h-[28.32vw] border border-gray-600 bg-black/60 px-[1.6vw] py-[1.92vw] backdrop-blur-sm xl:mt-9 xl:h-[354px] xl:px-5 xl:py-7.5',
      )}
    >
      <PatternWithoutLine />
    </div>
  );
}
