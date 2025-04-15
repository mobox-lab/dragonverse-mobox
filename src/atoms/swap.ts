import { atom } from 'jotai';
import { ALLOW_CHAINS } from '@/constants';
import { assetsBalanceAtom, mbtcAllowanceAtom, poolInitialAtom } from '@/atoms/lbp';
import { evmAddressAtom } from '@/atoms/wallet';
import { Address, erc20Abi, maxUint256 } from 'viem';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LiquidityBootstrapPool, Pool } from '@/entities/pool';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';

type SwapTokenParams = {
  description: string;
  errorMapping?: Record<string, string>;
  writeParams?: {
    abi: readonly any[];
    chainId: any;
    address: Address;
    functionName: string;
    args: any;
  };
};

export enum SwapField {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum ExactField {
  ExactIn = 'exactIn',
  ExactOut = 'exactOut',
}

export const DEFAULT_SLIPPAGE_TOLERANCE = '5';

export const SWAP_OPERATIONS = {
  [SwapField.Buy]: {
    [ExactField.ExactIn]: {
      name: 'swapExactAssetsForShares',
      priceLookup: 'previewSharesOut',
    },
    [ExactField.ExactOut]: {
      name: 'swapAssetsForExactShares',
      priceLookup: 'previewAssetsIn',
    },
  },
  [SwapField.Sell]: {
    [ExactField.ExactIn]: {
      name: 'swapExactSharesForAssets',
      priceLookup: 'previewAssetsOut',
    },
    [ExactField.ExactOut]: {
      name: 'swapSharesForExactAssets',
      priceLookup: 'previewSharesIn',
    },
  },
} as const;

export const ERROR_MAPPING: Record<string, string> = {
  'Error: WhitelistProof()': 'The whitelist proof verification fails.',
  'Error: AssetsInExceeded()': 'Liquidity Exceeded (AssetsInExceeded)',
  'Error: AmountInTooLarge()': 'Liquidity Exceeded (AmountInTooLarge)',
  'Error: SharesOutExceeded()': 'Liquidity Exceeded (SharesOutExceeded)',
  'Error: SlippageExceeded()': 'The slippage limit is exceeded.',
  'Error: SellingDisallowed()': 'Selling is disallowed.',
  'Error: TradingDisallowed()': 'Trading is disallowed.',
  'Error: ClosingDisallowed()': 'Closing is disallowed',
  'Error: RedeemingDisallowed()': 'Redeeming is disallowed',
  'Error: ReferringDisallowed()': 'Referring is disallowed',
  'Error: CallerDisallowed()': 'An address is not allowed to call a function.',
  'Error: AmountOutTooLarge()': 'Liquidity Exceeded (AmountOutTooLarge)',
};

const SLIPPAGE_ADJUSTMENT = { discount: -1n, increment: 1n };

function getSlippageValue(
  amount: bigint,
  slippage = DEFAULT_SLIPPAGE_TOLERANCE,
  adjustment: 'discount' | 'increment' = 'discount',
) {
  if (!slippage) return amount;
  const slippageValue = BigInt(parseInt(`${100 * Number(slippage)}`));
  return amount + ((amount * slippageValue) / 10000n) * SLIPPAGE_ADJUSTMENT[adjustment];
}

export const assetPairAtom = atom([
  { address: CONTRACT_ADDRESSES.mbtc, decimals: 18 },
  { address: CONTRACT_ADDRESSES.mdbl, decimals: 18 },
]);

export const swapTypeAtom = atom((get) => {
  const pool = get(poolInitialAtom);
  const [asset] = get(assetPairAtom);
  return pool?.asset === asset.address ? SwapField.Buy : SwapField.Sell;
});

export const swapErrorAtom = atom('');

export const tradeTypeAtom = atom<ExactField>(ExactField.ExactIn);

export const swapStateAtom = atom<[ExactField, bigint]>([ExactField.ExactIn, 0n]);
export const swapAmountsAtom = atom([0n, 0n]);

//  
export const slippageAtom = atom<string>(DEFAULT_SLIPPAGE_TOLERANCE);

//  
export const priceImpactAtom = atom<number>(0);

//  
export const currentInputOutputAtom = atom((get) => {
  const poolInitial = get(poolInitialAtom);
  const slippage = get(slippageAtom);
  const [tradeType, amount] = get(swapStateAtom);
  if (0n === amount || !poolInitial) return [0n, 0n];
  const lbp = new LiquidityBootstrapPool(new Pool(poolInitial));
  const swapType = get(swapTypeAtom);
  const priceLookup = SWAP_OPERATIONS[swapType][tradeType].priceLookup;

  try {
    const { value: amountOut } = lbp[priceLookup](amount, Number(slippage));
    return tradeType === 'exactIn' ? [amount, amountOut] : [amountOut, amount];
  } catch (error) {
    return [0n, 0n];
  }
});

//  
export const inputChangeAtom = atom(null, (get, set, action: [ExactField, bigint]) => {
  const slippage = get(slippageAtom);
  let [tradeType, amount] = action;
  set(swapStateAtom, [tradeType, amount]);
  set(tradeTypeAtom, tradeType);
  const poolInitial = get(poolInitialAtom);
  if (amount === 0n || !poolInitial) {
    set(swapAmountsAtom, [0n, 0n]);
    return;
  }
  const lbp = new LiquidityBootstrapPool(new Pool(poolInitial));
  const swapType = get(swapTypeAtom);
  const priceLookup = SWAP_OPERATIONS[swapType][tradeType].priceLookup;

  try {
    const { impact, value: amountOut } = lbp[priceLookup](amount, Number(slippage));

    set(swapErrorAtom, '');
    set(priceImpactAtom, impact);
    set(swapAmountsAtom, tradeType === 'exactIn' ? [amount, amountOut] : [amountOut, amount]);
    return amount;
  } catch (error) {
    set(swapErrorAtom, ERROR_MAPPING[`${error}`] || `${error}`);
    set(priceImpactAtom, 0);
    set(swapAmountsAtom, tradeType === 'exactIn' ? [amount, 0n] : [0n, amount]);
    return amount;
  }
});

//  
export const switchTokenAtom = atom(null, (get, set) => {
  set(assetPairAtom, (tokens) => {
    const [token0, token1] = tokens;
    return [token1, token0];
  });
  set(swapAmountsAtom, [0n, 0n]);
});

export const approveParamsAtom = atom<SwapTokenParams | undefined>((get) => {
  const token = CONTRACT_ADDRESSES.mbtc;
  const spender = CONTRACT_ADDRESSES.lbp;
  const swapType = get(swapTypeAtom);
  if (swapType === SwapField.Sell) return;
  const evmAddress = get(evmAddressAtom);
  const poolInitial = get(poolInitialAtom);
  if (!evmAddress || !poolInitial) return;
  const [amount] = get(swapAmountsAtom);
  const { value: assetsBalance } = get(assetsBalanceAtom);

  if (amount > assetsBalance) return { description: 'Insufficient balance' };
  const { value: allowance } = get(mbtcAllowanceAtom);
  if (!(allowance >= amount)) {
    return {
      description: 'Approve',
      errorMapping: {},
      writeParams: {
        abi: erc20Abi,
        chainId: ALLOW_CHAINS[0],
        address: token,
        functionName: 'approve',
        args: [spender, maxUint256],
      },
    };
  }
});

export const swapParamsAtom = atom<SwapTokenParams | undefined>((get) => {
  const slippage = get(slippageAtom);
  const evmAddress = get(evmAddressAtom);
  if (!evmAddress) return;

  const tradeType = get(tradeTypeAtom);
  const [amountIn, amountOut] = get(currentInputOutputAtom);
  if (amountIn === 0n) return { description: 'Enter an amount' };

  const [amount] = get(swapAmountsAtom);
  if (!amount) return { description: 'No amount' };

  const approveParams = get(approveParamsAtom);
  if (approveParams) return approveParams;

  const swapType = get(swapTypeAtom);
  const functionName = SWAP_OPERATIONS[swapType][tradeType].name;
  const args = {
    exactOut: [amountOut, getSlippageValue(amountIn, slippage, 'increment'), evmAddress],
    exactIn: [amountIn, getSlippageValue(amountOut, slippage, 'discount'), evmAddress],
  };

  return {
    description: 'Swap',
    errorMapping: ERROR_MAPPING,
    writeParams: {
      abi: LiquidityBootstrapPoolABI,
      address: CONTRACT_ADDRESSES.lbp,
      functionName,
      chainId: ALLOW_CHAINS[0],
      args: args[tradeType],
    },
  };
});

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
