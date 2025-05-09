'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import RewardHistoryDialog from '@/components/ui/dialog/RewardHistoryDialog';
import StakeBuffDialog from '@/components/ui/dialog/stake/StakeBuffDialog';
import BtcWalletConnectDialog from '@/components/ui/dialog/wallet-connect/BtcWalletConnectDialog';
import ExistedAddressBindDialog from '@/components/ui/dialog/wallet-connect/ExistedAddressBindDialog';
import MainWalletConnectDialog from '@/components/ui/dialog/wallet-connect/MainWalletConnectDialog';
import UnbindWalletDialog from '@/components/ui/dialog/wallet-connect/UnbindWalletDialog';
import BurnDragonBallDialog from './BurnDragonBallDialog';
import LBPRewardDialog from './LBPRewardDialog';
import RewardDetailDialog from './RewardDetailDialog';
import FirstStakeGuideDialog from './stake/FirstStakeGuideDialog';
import StakeAndRedeemDialog from './stake/StakeAndRedeemDialog';
import StakeHistoryDialog from './stake/StakeHistoryDialog';
import WithdrawDialog from './WithdrawDialog';

export default function DialogComponents() {
  return (
    <ClientOnly>
      <WithdrawDialog />
      <BurnDragonBallDialog />
      <StakeAndRedeemDialog />
      <StakeBuffDialog />
      <FirstStakeGuideDialog />
      <LBPRewardDialog />
      <MainWalletConnectDialog />
      <BtcWalletConnectDialog />
      <StakeHistoryDialog />
      <ExistedAddressBindDialog />
      <UnbindWalletDialog />
      <RewardDetailDialog />
      <RewardHistoryDialog />
      {/* <InviteConfirmDialog /> */}
    </ClientOnly>
  );
}

// TypeScript internationalization: perf: ⚡ optimize rendering pipeline
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
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'Description for perf: ⚡ optimize rendering pipeline'
  },
  zh: {
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'perf: ⚡ optimize rendering pipeline的描述'
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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
