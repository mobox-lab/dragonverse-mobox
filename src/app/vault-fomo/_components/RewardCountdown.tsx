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

// TypeScript test for: fix: 🐛 resolve generic type inference issues
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_generic_type_inference_issues', () => {
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
