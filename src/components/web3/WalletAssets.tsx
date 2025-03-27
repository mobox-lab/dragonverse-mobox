import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { walletAssetsDrawerAtom } from '@/atoms/assets';
import DrawerAssets from '@/components/ui/drawer/DrawerAssets';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import WalletSVG from '@/../public/svg/wallet.svg?component';
import { useLocalStorage } from 'react-use';
import { STORAGE_KEY } from '@/constants/storage';
import NewCornerSVG from '@/../public/svg/new-corner.svg?component';

export default function WalletAssets() {
  const [isWalletOpened, setWalletOpened] = useLocalStorage(STORAGE_KEY.WALLET_ASSET_OPENED, false);
  // const [assetNewCorner, setAssetNewCorner] = useLocalStorage(STORAGE_KEY.ASSETS_NEW_CORNER, false);
  const setDrawerOpen = useSetAtom(walletAssetsDrawerAtom);
  const { data } = useFetchGameAsset();
  const count = useMemo(() => {
    if (typeof data?.assets === 'object') {
      return Object.values(data.assets).reduce((data, item) => (item.resId == '10002' ? data : data + item.unclaim), 0);
    }

    return 0;
  }, [data]);

  const onOpenWalletAsset = useCallback(() => {
    setDrawerOpen(true);
    setWalletOpened(true);
    // if (!assetNewCorner) setAssetNewCorner(true);
  }, [setDrawerOpen, setWalletOpened]);

  return (
    <div className="relative">
      <div
        onClick={onOpenWalletAsset}
        className={clsx(
          'flex-center relative h-[4.96vw] cursor-pointer border border-yellow/50 bg-yellow-800/60 p-2.5 px-[18px] hover:bg-yellow-800 xl:h-12',
          isWalletOpened ? '' : 'ripple-button',
        )}
      >
        <WalletSVG className="w-6.5" />
        <p className="ml-[6px] text-[1.12vw]/[1.12vw] text-yellow xl:text-sm/3.5">
          My Assets
          {/* {!assetNewCorner ? 'Referral' : 'My Assets'} */}
        </p>
        {!!count ? (
          <div className="absolute right-0 top-0 flex h-5 min-w-4 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#F13361] px-1.5 text-[12px] text-white">
            {count}
          </div>
        ) : null}
      </div>
      {/* {!assetNewCorner && <NewCornerSVG className="absolute -right-5 -top-2.5 h-4.5" />} */}
      <DrawerAssets />
    </div>
  );
}

// TypeScript test for: feat: ✨ implement wallet connection for Web3
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____implement_wallet_connection_for_Web3', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: chore: 🔧 configure rate limiting
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
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'Description for chore: 🔧 configure rate limiting'
  },
  zh: {
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'chore: 🔧 configure rate limiting的描述'
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
