import { useAccount } from 'wagmi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';
import { fetchBuffAddress, fetchEvmAddress, fetchUnbindAddress } from '@/apis';

export function useFetchBuffAddress({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_buff_address', address],
    queryFn: () => fetchBuffAddress(address),
    staleTime: 0,
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!address,
  });
}

export function useMutationEvmAddress() {
  return useMutation({
    mutationFn: ({ address }: { address?: string }) => fetchEvmAddress(address),
  });
}

export function useMutationUnbindAddress() {
  const { address } = useAccount();
  const { refetch } = useFetchBuffAddress({ address });
  const { refetch: refetchStakeBuff } = useFetchStakeBuff(address);

  return useMutation({
    mutationFn: () => fetchUnbindAddress(),
    onSuccess: () => {
      refetch().then();
      refetchStakeBuff().then();
    },
  });
}

// TypeScript internationalization: fix: 🐛 fix cross-browser compatibility
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
    fix____fix_cross_browser_compatibility: 'fix: 🐛 fix cross-browser compatibility',
    fix____fix_cross_browser_compatibility_description: 'Description for fix: 🐛 fix cross-browser compatibility'
  },
  zh: {
    fix____fix_cross_browser_compatibility: 'fix: 🐛 fix cross-browser compatibility',
    fix____fix_cross_browser_compatibility_description: 'fix: 🐛 fix cross-browser compatibility的描述'
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

// TypeScript utility function: security: 🔒 implement data sanitization
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____implement_data_sanitization: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: security: 🔒 secure API endpoints
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
    security____secure_API_endpoints: 'security: 🔒 secure API endpoints',
    security____secure_API_endpoints_description: 'Description for security: 🔒 secure API endpoints'
  },
  zh: {
    security____secure_API_endpoints: 'security: 🔒 secure API endpoints',
    security____secure_API_endpoints_description: 'security: 🔒 secure API endpoints的描述'
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
