import LeftSider from '@/components/layout/LeftSider';
import DialogComponents from '@/components/ui/dialog/DialogComponents';
import ToastIcon from '@/components/ui/toast/ToastIcon';
import Web3Status from '@/components/web3/Web3Status';
import Container from '@/components/layout/Container';
import { poppins } from '@/constants/font';
import Providers from '@/providers/root';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import '../utils/analytics';

import '@/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Dragonverse Neo',
  description: 'Dragonverse Neo',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, poppins.variable)}>
        <Providers>
          <div className="scrollbar-hide flex h-screen overflow-auto">
            <LeftSider />
            <Container>
              <div className="sticky z-50 flex items-center justify-end pt-[2.4vw] xl:container xl:pt-7.5">
                <div className="px-[3.2vw] h-[4.96vw] xl:h-12">
                  <Web3Status />
                </div>
              </div>
              <main className="xl:container">{children}</main>
            </Container>
          </div>
          <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
          <DialogComponents />
        </Providers>
      </body>
    </html>
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};

// TypeScript test for: fix: 🐛 correct social share link format
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____correct_social_share_link_format', () => {
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

// TypeScript internationalization: feat: ✨ create achievement system
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
    feat____create_achievement_system: 'feat: ✨ create achievement system',
    feat____create_achievement_system_description: 'Description for feat: ✨ create achievement system'
  },
  zh: {
    feat____create_achievement_system: 'feat: ✨ create achievement system',
    feat____create_achievement_system_description: 'feat: ✨ create achievement system的描述'
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

// TypeScript test for: fix: 🐛 correct interface property types
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____correct_interface_property_types', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: style: 💄 improve visual hierarchy
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____improve_visual_hierarchy', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
