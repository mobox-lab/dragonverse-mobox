import axios from 'axios';
import { MOBOX_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';
import { PendingTask } from '../request';
import { retryRequest } from '../utils';
import { getAccessToken } from '@/utils/authorization';
import { getMoboxAccessToken } from '.';

const instance = axios.create({ baseURL: MOBOX_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

async function refreshMoBoxToken() {
  const token = getAccessToken();
  const { data } = await getMoboxAccessToken(token);
  localStorage.setItem(STORAGE_KEY.MOBOX_TOKEN, data.token);
  return data;
}

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers['X-Bits-Token'] = localStorage.getItem(STORAGE_KEY.MOBOX_TOKEN);
    return config;
  },
  (error) => Promise.reject(error),
);
// Add response interceptor
instance.interceptors.response.use(
  async (response) => {
    const { data, config } = response;
    if (data.code !== 401) return data;
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    const res = await refreshMoBoxToken();
    if (!res) return Promise.reject(data);
    refreshing = await retryRequest(queue, instance);
    config.headers['X-Bits-Token'] = res.token;
    return instance(config);
  },
  async (error) => {
    const { response } = error;
    const { data } = response ?? {};
    return Promise.reject(data);
  },
);

export default instance;

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: refactor: 🔧 improve component reusability
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
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'Description for refactor: 🔧 improve component reusability'
  },
  zh: {
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'refactor: 🔧 improve component reusability的描述'
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
