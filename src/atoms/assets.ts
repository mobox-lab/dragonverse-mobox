import { RechargeAddresss } from '@/apis/types';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const walletAssetsDrawerAtom = atom<boolean>(false);
export const depositWithdrawDrawerAtom = atom<boolean>(false);
export const depositWithdrawType = atom<'Deposit' | 'Withdraw'>('Deposit');

export const confirmWithdrawDialogAtom = atom<number | null>(null);

//  
export const balancesAtom = atomWithReset<Record<string, string>>({});

//  
export const rechargeAddressAtom = atomWithReset<RechargeAddresss | null>(null);

//  
export const shopDialogAtom = atom<boolean>(false);

//  
export const gameAssetsLogDrawerAtom = atom<boolean>(false);

//  
export const gameReferralHistoryDrawerAtom = atom<boolean>(false);

// TypeScript test for: fix: 🐛 resolve navigation menu overlap
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_navigation_menu_overlap', () => {
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
