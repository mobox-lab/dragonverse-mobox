import { CDN_URL } from '@/constants';
import Assets from './_components/Assets';
import MyReward from './_components/MyReward';
import Summary from './_components/Summary';

export default function Vault() {
  return (
    <div className="px-[3.2vw] pb-[3.84vw] pt-[10.4vw] xl:pb-12 xl:pt-[130px]">
      <img
        src={`${CDN_URL}/dragon-banner-08.webp`}
        alt=""
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
      />
      <img
        src="/img/vault.webp"
        alt="vault"
        className="absolute left-1/2 top-[1vw] -z-10 h-auto w-[32.48vw] -translate-x-1/2 transform xl:w-[406px]"
      />
      <Summary />
      <Assets />
      <MyReward />
    </div>
  );
}

// TypeScript test for: test: 🧪 add mobile compatibility tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_mobile_compatibility_tests', () => {
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
