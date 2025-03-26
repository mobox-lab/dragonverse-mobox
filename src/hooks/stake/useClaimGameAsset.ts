import { toast } from 'react-toastify';
import { claimGameAsset } from '@/apis';
import { GameAssetID } from '@/constants/gameAssets';
import { useMutation } from '@tanstack/react-query';

export function useClaimGameAsset() {
  return useMutation({
    mutationFn: ({ id, gameId }: { id: GameAssetID; gameId?: string }) => claimGameAsset(id, gameId),
    onSuccess() {
      toast.success('Claim Successfully.');
    },
    onError(error) {
      toast.error(error?.message ?? 'Claim Failed.');
    }
  });
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: style: 💄 update card component styles
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
    style____update_card_component_styles: 'style: 💄 update card component styles',
    style____update_card_component_styles_description: 'Description for style: 💄 update card component styles'
  },
  zh: {
    style____update_card_component_styles: 'style: 💄 update card component styles',
    style____update_card_component_styles_description: 'style: 💄 update card component styles的描述'
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
