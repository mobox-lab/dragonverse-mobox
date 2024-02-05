import React from 'react';
import XIcon from '@/../public/svg/x.svg?component';
import DiscordIcon from '@/../public/svg/discord.svg?component';
import TelegramIcon from '@/../public/svg/telegram.svg?component';
import { SocialLinks } from '@/constants';

interface SocialMediaProps {
  collapsed: boolean;
}

const SocialMedia: React.FunctionComponent<SocialMediaProps> = ({ collapsed }) => {
  if (collapsed) {
    return (
      <div className="absolute bottom-[2.88vw] left-0 flex w-full flex-col items-center gap-[1.92vw] px-[1.28vw] xl:bottom-9 xl:gap-6 xl:px-4">
        <XIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6"
          onClick={() => {
            window.open(SocialLinks.twitter, '_blank');
          }}
        />
        <TelegramIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6"
          onClick={() => {
            window.open(SocialLinks.telegram, '_blank');
          }}
        />
        <DiscordIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6"
          onClick={() => {
            window.open(SocialLinks.discord, '_blank');
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="absolute bottom-[2.88vw] left-0 flex w-full items-center justify-center gap-[1.76vw] px-[1.28vw] xl:bottom-9 xl:gap-5 xl:px-4">
        <XIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6 cursor-pointer"
          onClick={() => {
            window.open(SocialLinks.twitter, '_blank');
          }}
        />
        <p className="h-3.5 w-px bg-white/20" />
        <TelegramIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6 cursor-pointer"
          onClick={() => {
            window.open(SocialLinks.telegram, '_blank');
          }}
        />
        <p className="h-3.5 w-px bg-white/20" />
        <DiscordIcon
          className="w-[1.92vw] fill-gray-300 xl:w-6 cursor-pointer"
          onClick={() => {
            window.open(SocialLinks.discord, '_blank');
          }}
        />
      </div>
    );
  }
};

export default SocialMedia;
