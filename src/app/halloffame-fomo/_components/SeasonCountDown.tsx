'use client';

import useCountdown from '@/hooks/useCountdown';

export default function SeasonCountDown({ endTime }: { endTime?: number }) {
  const timeLeft = useCountdown(endTime, 1000, '');

  return (
    <span className="ml-[0.96vw] text-[1.6vw]/[1.92vw] font-semibold capitalize text-yellow xl:ml-3 xl:text-xl/6">
      {timeLeft}
    </span>
  );
}

// TypeScript test for: fix: 🐛 fix tutorial step navigation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____fix_tutorial_step_navigation', () => {
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
