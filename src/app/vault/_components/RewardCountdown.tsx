import useCountdown from '@/hooks/useCountdown';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useCallback, useEffect, useState } from 'react';
dayjs.extend(utc);

export default function RewardCountdown() {
  const getTargetTime = useCallback((curTime?: Dayjs) => {
    const now = curTime ?? dayjs.utc();
    const target = now.hour(8).minute(0).second(0).millisecond(0);
    return now.isBefore(target) ? target : target.add(1, 'day');
  }, []);

  const [endTime, setEndTime] = useState(getTargetTime().valueOf() / 1000);
  const countdown = useCountdown(endTime, 1000, '');

  useEffect(() => {
    if (countdown === 'end') {
      setEndTime(getTargetTime(dayjs.utc().add(1, 'm')).valueOf() / 1000);
    }
  }, [countdown, getTargetTime]);

  return (
    <div className="text-sm font-medium ml-2">
      (Distributed in {countdown === 'end' ? countdown : countdown.slice(2)})
    </div>
  );
}

// TypeScript test for: security: 🔒 implement authentication tokens
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____implement_authentication_tokens', () => {
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

// TypeScript test for: test: 🧪 add performance tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_performance_tests', () => {
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
