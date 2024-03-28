import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { CDN_URL } from '@/constants';
import { Rarity } from '@/constants/enum';
import { clsxm } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ShatterImage from './ShatterImage';

export default function DragonCard({
  value = 200,
  onClick,
  isFlippedExternally,
}: {
  className?: string;
  value?: number;
  type?: Rarity;
  onClick?: () => void;
  isFlippedExternally?: boolean; //  
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  //  
  useEffect(() => {
    if (isFlippedExternally !== undefined) {
      setIsFlipped(isFlippedExternally);
    }
  }, [isFlippedExternally]);

  return (
    <AnimatePresence>
      <motion.div className={clsxm('flex-center relative h-[20vw] w-[20vw] xl:h-[250px] xl:w-[250px]', { hidden: !isFlipped })}>
        <div
          className={clsxm(
            'absolute left-0 top-0 h-[420px] w-[420px] -translate-x-[86px] -translate-y-[86px] cursor-pointer transition duration-300 hover:scale-110',
            {
              hidden: isFlipped,
            },
          )}
        >
          <ShatterImage onShatterEnd={onClick} src={`${CDN_URL}/hatch-egg-shake.webm`} />
        </div>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className={clsxm(
              'absolute inset-0 flex flex-col items-center justify-center border border-gray-600 bg-[#0B0B0B] backdrop-blur-3xl',
              // rarityStyles[type]?.bg,
              // rarityStyles[type]?.border,
            )}
          >
            <PatternWithoutLine className="h-[1.44vw] w-[1.44vw] stroke-gray-600 xl:h-4.5 xl:w-4.5" />

            <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[8.96vw] xl:w-28" />
            <p className="text-[2.72vw]/[3.84vw] font-semibold text-yellow xl:text-[34px]/12">{value}</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
