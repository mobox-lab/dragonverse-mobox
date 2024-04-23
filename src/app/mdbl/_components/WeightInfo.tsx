export default function WeightInfo() {
  return (
    <div className="flex items-center justify-end gap-[1.92vw] xl:gap-6">
      <div className="flex items-center">
        <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
        <span className="mx-[0.48vw] text-[1.6vw]/[1.6vw] font-medium text-yellow xl:mx-1.5 xl:text-xl/5">:</span>
        <img src="/svg/mbtc.svg" alt="mBtc" className="w-[1.6vw] xl:w-5" />
        <div className="ml-[0.64vw] text-[1.12vw]/[1.92vw] font-medium xl:ml-2 xl:text-sm/6">Current Weight</div>
        <span className="mx-[0.48vw] text-[1.6vw]/[1.6vw] font-medium text-yellow xl:mx-1.5 xl:text-xl/5">50 : 50</span>
      </div>
      <div className="flex items-center">
        <div className="text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">Start Weight</div>
        <div className="ml-[0.64vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:ml-2 xl:text-sm/6">95 : 5</div>
      </div>
      <div className="flex items-center">
        <div className="text-[1.12vw]/[1.92vw] font-medium xl:text-sm/6">End Weight</div>
        <div className="ml-[0.64vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:ml-2 xl:text-sm/6">50 : 50</div>
      </div>
    </div>
  );
}
