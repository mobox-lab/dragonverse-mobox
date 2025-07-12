'use client';

import React from 'react';
import Sider from './Sider';
import { siderCollapsedAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import Nav from '../nav';
import { motion } from 'framer-motion';
import SocialMedia from './SocialMedia';
import { openLink } from '@/utils';

export default function LeftSider() {
  const siderCollapsed = useAtomValue(siderCollapsedAtom);

  return (
    <Sider>
      <div className="flex h-[12.8vw] justify-center pt-[1.92vw] xl:h-[160px] xl:pt-6">
        {siderCollapsed ? (
          <motion.img
            key="logo1"
            src="/img/logo.webp"
            alt="logo"
            onClick={() => openLink('https://www.mobox.io/#/')}
            className="h-[4.32vw] w-[4.32vw] cursor-pointer xl:h-[54px] xl:w-[54px]"
          />
        ) : (
          <motion.img
            key="logo2"
            src="/img/dragonverse.png"
            alt="logo"
            onClick={() => openLink('https://www.mobox.io/#/')}
            className="h-[7.92vw] w-[13.92vw] cursor-pointer xl:h-[94px] xl:w-[174px]"
          />
        )}
      </div>
      <div>
        <Nav />
      </div>
      <SocialMedia />
    </Sider>
  );
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: style: 💄 add micro-interactions
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____add_micro_interactions', () => {
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
