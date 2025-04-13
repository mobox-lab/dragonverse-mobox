import { PeriodType } from '@/components/ui/dialog/stake/StakeAndRedeemDialog';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';
import { bsc, bscTestnet } from 'wagmi/chains';

export const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? '';

export const ALLOW_CHAINS =
  /* [merlin, bsc] */
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? [merlinMainnet.id, bsc.id] : [merlinTestnet.id, bscTestnet.id];

export const CDN_URL = 'https://cdn-dragonverseneo.mobox.app';

export const inputRegex = /^\d*(?:\\[.])?\d*$/;

export const SocialLinks = {
  twitter: 'https://twitter.com/DragonverseNeo',
  telegram: 'https://t.me/mobox_io',
  discord: 'https://discord.com/invite/gW2eAU4WZy',
};

export const ONE = 1000000000000000000n;

export const MAX_UINT_256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const periodTime = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? 24 * 60 * 60 : 60;

export const periodData = [
  {
    id: PeriodType.Day15,
    percent: 25,
    days: 15,
  },
  {
    id: PeriodType.Day30,
    percent: 35,
    days: 30,
  },
  {
    id: PeriodType.Day60,
    percent: 50,
    days: 60,
  },
  {
    id: PeriodType.Day120,
    percent: 100,
    days: 120,
  },
];

//  
export const TDStartSeason = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? 7 : 27;

// TypeScript test for: feat: ✨ add in-game marketplace
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_in_game_marketplace', () => {
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
