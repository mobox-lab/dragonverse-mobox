import { CDN_URL } from '@/constants';
import Assets from './_components/Assets';
import MyReward from './_components/MyReward';
import Summary from './_components/Summary';

export default function Vault() {
  return (
    <div className="px-[3.2vw] pb-[3.84vw] xl:pb-12">
      <img
        src={`${CDN_URL}/dragon-banner-08.webp`}
        alt=""
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
      />
      <img
        src="/img/vault.webp"
        alt="vault"
        className="absolute left-1/2 top-[1vw] -z-10 h-auto w-[32.48vw] -translate-x-1/2 transform xl:w-[406px]"
      />
      <Summary />
      <Assets />
      <MyReward />
    </div>
  );
}
