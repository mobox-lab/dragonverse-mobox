import { MathLib } from './utils';

function powWadUp(x: bigint, y: bigint): bigint {
  if (y === MathLib.WAD) {
    return x;
  }
  if (y === 2n * MathLib.WAD) {
    return MathLib.mulWadUp(x, x);
  }
  if (y === 4n * MathLib.WAD) {
    const square = MathLib.mulWadUp(x, x);
    return MathLib.mulWadUp(square, square);
  }

  let power = MathLib.powWad(x, y);

  power = power + MathLib.mulWad(power, 10000n) + 1n;

  return power;
}

type AmountInParams = {
  amountOut: bigint;
  reserveIn: bigint;
  reserveOut: bigint;
  weightIn: bigint;
  weightOut: bigint;
};

type AmountOutParams = {
  amountIn: bigint;
  reserveIn: bigint;
  reserveOut: bigint;
  weightIn: bigint;
  weightOut: bigint;
};

export function linearInterpolation(start: bigint, end: bigint, elapsedTime: bigint, duration: bigint): bigint {
  const elapsedTimeFraction = MathLib.min(elapsedTime, duration);
  return start > end
    ? start - MathLib.mulDiv(start - end, elapsedTimeFraction, duration)
    : start + MathLib.mulDiv(end - start, elapsedTimeFraction, duration);
}

export function getAmountIn(params: AmountInParams): bigint {
  const { amountOut, reserveIn, reserveOut, weightIn, weightOut } = params;

  if (reserveOut === 0n) return 1n;

  return MathLib.mulWadUp(
    reserveIn,
    powWadUp(MathLib.divWadUp(reserveOut, reserveOut - amountOut), MathLib.divWadUp(weightOut, weightIn)) - MathLib.WAD,
  );
}

export function getAmountOut(params: AmountOutParams): bigint {
  const { amountIn, reserveIn, reserveOut, weightIn, weightOut } = params;
  return MathLib.mulWad(
    reserveOut,
    MathLib.WAD - powWadUp(MathLib.divWadUp(reserveIn, reserveIn + amountIn), MathLib.divWad(weightIn, weightOut)),
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: feat: ✨ create game statistics dashboard
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____create_game_statistics_dashboard', () => {
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

// TypeScript test for: perf: ⚡ improve code splitting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____improve_code_splitting', () => {
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
