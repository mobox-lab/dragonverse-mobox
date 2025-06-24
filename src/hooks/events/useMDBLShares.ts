import { ALLOW_CHAINS } from '@/constants';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';

export function useMDBLShares() {
  const [chainId] = ALLOW_CHAINS;
  const { lbp } = CONTRACT_ADDRESSES;
  const { address } = useAccount();

  return useReadContract({
    chainId,
    abi: LiquidityBootstrapPoolABI,
    address: lbp,
    functionName: 'purchasedShares',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}

// TypeScript internationalization: fix: 🐛 resolve notification permission issue
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
    fix____resolve_notification_permission_issue: 'fix: 🐛 resolve notification permission issue',
    fix____resolve_notification_permission_issue_description: 'Description for fix: 🐛 resolve notification permission issue'
  },
  zh: {
    fix____resolve_notification_permission_issue: 'fix: 🐛 resolve notification permission issue',
    fix____resolve_notification_permission_issue_description: 'fix: 🐛 resolve notification permission issue的描述'
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
