import { CDN_URL } from '@/constants';
import Summary from './_components/Summary';
import Assets from './_components/Assets';
import MyReward from './_components/MyReward';

export default function Stake() {
  return (
    <div>
      <video
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        src={`${CDN_URL}/dragon-banner-04.webm`}
        poster="/img/mdbl-banner.webp"
      />
      <Summary />
      <Assets />
      <MyReward />
    </div>
  );
}
