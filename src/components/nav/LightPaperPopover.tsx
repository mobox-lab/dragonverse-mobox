import React, { useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import Popover from '@/components/ui/popover';
import Tooltip from '@/components/ui/tooltip';

export default function LightPaperPopover({ children }: { children: JSX.Element }) {
  const content = useMemo(
    () => (
      <div className="flex w-[13.44vw] origin-left flex-col rounded-[0.64vw] border border-gray-600 bg-black/60 p-[0.96vw] text-[1.28vw]/[1.76vw] font-semibold backdrop-blur-2xl xl:w-[168px] xl:rounded-lg xl:p-3 xl:text-base/5.5 ">
        <a
          href="https://mobox.gitbook.io/dragonverse-neo-litepaper/"
          target="_blank"
          className="rounded-[0.48vw] px-[1.12vw] py-[1.28vw] hover:bg-white/[0.16] xl:rounded-md xl:px-3.5 xl:py-4"
        >
          English
        </a>
        <a
          href="https://mobox.gitbook.io/dragonverse-neo-litepaper-cn"
          target="_blank"
          className="rounded-[0.48vw] px-[1.12vw] py-[1.28vw] hover:bg-white/[0.16] xl:rounded-md xl:px-3.5 xl:py-4"
        >
          中文版
        </a>
      </div>
    ),
    [],
  );
  if (isMobile)
    return (
      <Popover
        motionProps={{
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
        }}
        offset={0}
        placement="right"
        render={() => content}
        className="pl-[2.24vw] xl:pl-7"
      >
        {children}
      </Popover>
    );
  return (
    <Tooltip
      offsetX={{ mainAxis: 16 }}
      className="-mt-[2.24vw] border-none bg-transparent p-0 pl-[0.96vw] backdrop-blur-unset xl:-mt-7 xl:p-0 xl:pl-3"
      placement="right-start"
      title={content}
    >
      {children}
    </Tooltip>
  );
}
