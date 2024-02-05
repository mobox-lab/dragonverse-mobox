import ArrowSvg from '@/../public/svg/arrow.svg?component';
import TwitterSvg from '@/../public/svg/twitter.svg?component';
import { clsxm } from '@/utils';

export default function MintedReferralBonus({ className }: { className?: string }) {
  const referralLink = 'https://xxx.xx/?code=2casadadfqewe';

  return (
    <div className={clsxm('relative flex flex-col px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11', className)}>
      {/* Referral Bonus */}
      <h1 className="text-center text-base/6 font-semibold">Referral Bonus</h1>
      <div className="mt-2 flex items-center justify-center gap-2.5 text-center text-base/6 font-medium">
        <span className="text-[34px]/12 font-bold text-yellow">210</span>
        <img src="/img/dbal_qi.png" alt="" className="aspect-square w-[2.88vw] xl:w-9" />
        (1901*8%)
      </div>
      <div className="mt-5 grid h-10 grid-cols-2 items-center gap-7.5 border-b border-gray bg-[#43454980] pl-4 text-xs font-semibold">
        <p>Current bonus rate</p>
        <p>Valid referrals</p>
      </div>
      <div className="grid h-11 grid-cols-2 items-center gap-7.5 border-b border-gray pl-4 text-xl font-semibold text-green">
        <p>+8%</p>
        <p>7</p>
      </div>
      {/* Your referral link */}
      <h1 className="mt-9 text-base/6 font-semibold">Your referral link</h1>
      <div className="mt-3 flex items-center gap-2">
        <input
          className="w-full truncate rounded-sm bg-white/15 px-3 py-2.5 text-xs/6 font-semibold"
          value={referralLink ?? '...'}
          disabled
        />
        <div
          className="flex-center cursor-pointer rounded-sm bg-blue/20 px-3 py-3 text-center text-sm/5 font-semibold text-blue hover:bg-blue/30"
          // onClick={copyToClipboard}
        >
          Copy
        </div>
        <div
          // onClick={onShareClick}
          className="flex-center cursor-pointer rounded-sm bg-white/15 fill-white px-2 py-3 text-sm/5 font-semibold hover:bg-white/30"
        >
          Share <TwitterSvg className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-9 flex justify-between text-base/6 font-semibold">
        Your referral link
        <p className="flex items-center text-sm/3.5 text-blue">
          Details <ArrowSvg className="h-3.5 w-3.5 rotate-90 stroke-blue" />
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-1.5 text-xs/5 font-medium">
        <div className="grid grid-cols-3">
          <span>No.1</span>
          <span>0x85...abcd</span>
          <span className="ml-auto">Mint 22</span>
        </div>
        <div className="grid grid-cols-3">
          <span>No.2</span>
          <span>0x85...abcd</span>
          <span className="ml-auto">Mint 14</span>
        </div>
        <div className="grid grid-cols-3">
          <span>No.3</span>
          <span>bc1p2...abcd</span>
          <span className="ml-auto">Mint 10</span>
        </div>
      </div>
      <a className="mt-2.5 text-center text-xs/5 font-semibold text-blue underline">7 other users</a>
    </div>
  );
}
