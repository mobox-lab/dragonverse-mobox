import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';

export default function MyReward() {
  return (
    <div className="mt-[2.88vw] xl:mt-9">
      <div>My Reward</div>
      <div className="mt-[0.96vw] grid grid-cols-3 gap-[1.92vw] xl:mt-3 xl:gap-6">
        <div className="relative h-[16vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[200px]">
          <PatternWithoutLine />
        </div>

        <div className="relative h-[16vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[200px]">
          <PatternWithoutLine />
        </div>

        <div className="relative h-[16vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[200px]">
          <PatternWithoutLine />
        </div>
      </div>
    </div>
  );
}
