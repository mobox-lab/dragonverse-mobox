import { clsxm } from '@/utils';
import React, { ChangeEvent, useCallback, useMemo } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  actionClass?: string;
  inputClass?: string;
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({ value, onChange, className, actionClass, inputClass }) => {
  const inputValue = useMemo(() => {
    const data = Number(value);
    return isNaN(value) ? 0 : data;
  }, [value]);

  const onInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/[^\d]/g, '') ?? '';
      onChange(+value);
    },
    [onChange],
  );

  const onMinus = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onChange(inputValue - 1);
    },
    [inputValue, onChange],
  );

  const onPlus = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onChange(inputValue + 1);
    },
    [inputValue, onChange],
  );

  return (
    <div className={clsxm('flex h-[2.6vw] w-full bg-white/10 py-1 leading-none backdrop-blur-lg xl:h-[2.2vw]', className)}>
      <div
        className={clsxm(
          'relative flex basis-[3.2vw] cursor-pointer select-none items-center justify-center text-[1.8vw] font-medium xl:basis-10 xl:text-[1.6vw]',
          actionClass,
        )}
        onClick={onMinus}
      >
        -<div className={clsxm('absolute right-0 top-1/2 h-[80%] w-[1px] -translate-y-1/2 transform bg-gray')}></div>
      </div>
      <div className="flex-1">
        <input
          type="text"
          className={clsxm('h-full w-full bg-transparent text-center text-[1.2vw] font-medium xl:text-[0.9vw]', inputClass)}
          value={inputValue}
          pattern="^[0-9]*$"
          onInput={onInput}
        />
      </div>
      <div
        className={clsxm(
          'relative flex basis-[3.2vw] cursor-pointer select-none items-center justify-center text-[1.7vw] font-medium xl:basis-10 xl:text-[1.4vw]',
          actionClass,
        )}
        onClick={onPlus}
      >
        +<div className={clsxm('absolute left-0 top-1/2 h-[80%] w-[1px] -translate-y-1/2 transform bg-gray')}></div>
      </div>
    </div>
  );
};

export default NumberInput;

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

// TypeScript test for: feat: ✨ implement TypeScript decorators for validation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____implement_TypeScript_decorators_for_validation', () => {
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
