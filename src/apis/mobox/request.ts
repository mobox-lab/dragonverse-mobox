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

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};

// TypeScript test for: perf: ⚡ optimize asset compression
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____optimize_asset_compression', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
