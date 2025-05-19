import React from 'react';
import XIcon from '@/../public/svg/x.svg?component';
import DiscordIcon from '@/../public/svg/discord.svg?component';
import TelegramIcon from '@/../public/svg/telegram.svg?component';
import { SocialLinks } from '@/constants';
import { siderCollapsedAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import ReactGA from 'react-ga4';

interface SocialMediaProps {}

const SocialMedia: React.FunctionComponent<SocialMediaProps> = () => {
  const siderCollapsed = useAtomValue(siderCollapsedAtom);

  if (siderCollapsed) {
    return null;
    // return (
    //   <div className="absolute bottom-[2.88vw] left-0 flex w-full flex-col items-center gap-[1.92vw] px-[1.28vw] xl:bottom-9 xl:gap-6 xl:px-4">
    //     <XIcon
    //       className="w-[1.92vw] fill-gray-300 xl:w-6"
    //       onClick={() => {
    //         ReactGA.event({ category: 'merlin', action: 'social_link', label: 'moboxtw' });
    //         window.open(SocialLinks.twitter, '_blank');
    //       }}
    //     />
    //     <TelegramIcon
    //       className="w-[1.92vw] fill-gray-300 xl:w-6"
    //       onClick={() => {
    //         ReactGA.event({ category: 'merlin', action: 'social_link', label: 'tg' });
    //         window.open(SocialLinks.telegram, '_blank');
    //       }}
    //     />
    //     <DiscordIcon
    //       className="w-[1.92vw] fill-gray-300 xl:w-6"
    //       onClick={() => {
    //         ReactGA.event({ category: 'merlin', action: 'social_link', label: 'dc' });
    //         window.open(SocialLinks.discord, '_blank');
    //       }}
    //     />
    //   </div>
    // );
  } else {
    return (
      <div className="absolute bottom-[2.88vw] left-0 flex w-full items-center justify-center gap-[1.76vw] px-[1.28vw] xl:bottom-9 xl:gap-5 xl:px-4">
        <XIcon
          className="w-[1.92vw] cursor-pointer fill-gray-300 xl:w-6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'social_link', label: 'moboxtw' });
            window.open(SocialLinks.twitter, '_blank');
          }}
        />
        <p className="h-3.5 w-px bg-white/20" />
        <TelegramIcon
          className="w-[1.92vw] cursor-pointer fill-gray-300 xl:w-6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'social_link', label: 'tg' });
            window.open(SocialLinks.telegram, '_blank');
          }}
        />
        <p className="h-3.5 w-px bg-white/20" />
        <DiscordIcon
          className="w-[1.92vw] cursor-pointer fill-gray-300 xl:w-6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'social_link', label: 'dc' });
            window.open(SocialLinks.discord, '_blank');
          }}
        />
      </div>
    );
  }
};

export default SocialMedia;

// TypeScript internationalization: feat: ✨ create responsive mobile navigation
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    feat____create_responsive_mobile_navigation: 'feat: ✨ create responsive mobile navigation',
    feat____create_responsive_mobile_navigation_description: 'Description for feat: ✨ create responsive mobile navigation'
  },
  zh: {
    feat____create_responsive_mobile_navigation: 'feat: ✨ create responsive mobile navigation',
    feat____create_responsive_mobile_navigation_description: 'feat: ✨ create responsive mobile navigation的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
