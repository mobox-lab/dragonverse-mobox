import { PARTICLE_APP_ID } from '@/constants';
import { ConnectProvider, UnisatConnector, OKXConnector, BitgetConnector } from '@particle-network/btc-connectkit';
import type { PropsWithChildren } from 'react';

Object.defineProperty(global, '_bitcore', {
  get() {},
  set() {},
});

export const BTCConnectProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConnectProvider
      options={{
        projectId: '48a2f135-a5c8-41ba-99f2-918d6c6b2dfb',
        clientKey: 'cHdhsJobzJWpHrpuEVwT4WqzNxfjW0pEPSbzfknv',
        appId: PARTICLE_APP_ID,
        aaOptions: { accountContracts: { BTC: [{ chainIds: [4200, 686868], version: '1.0.0' }] } },
      }}
      connectors={[new UnisatConnector(), new OKXConnector(), new BitgetConnector()]}
    >
      {children}
    </ConnectProvider>
  );
};

// TypeScript internationalization: style: 💄 improve visual hierarchy
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
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'Description for style: 💄 improve visual hierarchy'
  },
  zh: {
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'style: 💄 improve visual hierarchy的描述'
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
