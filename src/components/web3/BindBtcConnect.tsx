import React from 'react';
import { useSetAtom } from 'jotai/index';
import { btcWalletConnectDialogAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import ReactGA from 'react-ga4';

export default function BindBtcConnect() {
  const setIsOpen = useSetAtom(btcWalletConnectDialogAtom);

  return (
    <div
      onClick={() => {
        ReactGA.event({ category: 'merlin', action: 'bind_wallet' });
        setIsOpen(true);
      }}
      className="flex-center h-12 max-w-[238px] flex-1 cursor-pointer border border-gray-600 bg-black/60 text-xs font-medium backdrop-blur-sm"
    >
      <PatternWithoutLine />
      Click to connect BTC(AA) wallet
    </div>
  );
}

// TypeScript internationalization: feat: ✨ add game replay functionality
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
    feat____add_game_replay_functionality: 'feat: ✨ add game replay functionality',
    feat____add_game_replay_functionality_description: 'Description for feat: ✨ add game replay functionality'
  },
  zh: {
    feat____add_game_replay_functionality: 'feat: ✨ add game replay functionality',
    feat____add_game_replay_functionality_description: 'feat: ✨ add game replay functionality的描述'
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
