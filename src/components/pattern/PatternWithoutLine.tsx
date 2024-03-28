import PatternSVG from '@/../public/svg/pattern.svg?component';
import { clsxm } from '@/utils';

export default function PatternWithoutLine({ className }: { className?: string }) {
  return (
    <div>
      <PatternSVG
        className={clsxm(
          'absolute left-[0.32vw] top-[0.32vw] h-[0.96vw] w-[0.96vw] stroke-gray-300 xl:left-1 xl:top-1 lg:h-3 lg:w-3',
          className,
        )}
      />
      <PatternSVG
        className={clsxm(
          'absolute right-[0.32vw] top-[0.32vw] h-[0.96vw] w-[0.96vw] rotate-90 stroke-gray-300 xl:right-1 xl:top-1 lg:h-3 lg:w-3',
          className,
        )}
      />
      <PatternSVG
        className={clsxm(
          'absolute bottom-[0.32vw] right-[0.32vw] h-[0.96vw] w-[0.96vw] rotate-180 stroke-gray-300 xl:bottom-1 xl:right-1 lg:h-3 lg:w-3',
          className,
        )}
      />
      <PatternSVG
        className={clsxm(
          'absolute bottom-[0.32vw] left-[0.32vw] h-[0.96vw] w-[0.96vw] -rotate-90 stroke-gray-300 xl:bottom-1 xl:left-1 lg:h-3 lg:w-3',
          className,
        )}
      />
    </div>
  );
}
