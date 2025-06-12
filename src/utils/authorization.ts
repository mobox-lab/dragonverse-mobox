import { STORAGE_KEY } from '@/constants/storage';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage';

/**
 * 获取 accessToken
 */
export function getAccessToken() {
  return getLocalStorage<string>(STORAGE_KEY.ACCESS_TOKEN);
}

/**
 * 设置 accessToken 缓存, 最多10个账户
 * @param accessToken
 */
export function setAccessToken(accessToken: string) {
  setLocalStorage(STORAGE_KEY.ACCESS_TOKEN, accessToken);
}

/**
 * 移除 accessToken
 */
export function removeAccessToken() {
  removeLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
}

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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
