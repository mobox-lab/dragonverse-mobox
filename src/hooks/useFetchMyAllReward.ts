import { fetchMyAllRewards } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchMyAllReward() {
  return useQuery({
    queryKey: ['fetch_my_all_rewards'],
    queryFn: () => fetchMyAllRewards(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: fix: 🐛 fix dark mode toggle not working
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
    fix____fix_dark_mode_toggle_not_working: 'fix: 🐛 fix dark mode toggle not working',
    fix____fix_dark_mode_toggle_not_working_description: 'Description for fix: 🐛 fix dark mode toggle not working'
  },
  zh: {
    fix____fix_dark_mode_toggle_not_working: 'fix: 🐛 fix dark mode toggle not working',
    fix____fix_dark_mode_toggle_not_working_description: 'fix: 🐛 fix dark mode toggle not working的描述'
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
