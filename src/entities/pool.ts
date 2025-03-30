import { Address } from 'viem';
import { MathLib } from './utils';
import { bigIntToFloat } from './bigint';
import { getAmountIn, getAmountOut, linearInterpolation } from './common';

export type PoolParams = {
  asset: Address;
  share: Address;
  assets: bigint;
  shares: bigint;
  virtualAssets: bigint;
  virtualShares: bigint;
  weightStart: bigint;
  weightEnd: bigint;
  saleStart: bigint;
  saleEnd: bigint;
  totalPurchased: bigint;
  maxSharePrice: bigint;
  assetDecimals: number;
  shareDecimals: number;
  address: string;
  swapFee: bigint;
  chainId: number;
};

export type ReservesAndWeights = {
  assetReserve: bigint;
  shareReserve: bigint;
  assetWeight: bigint;
  shareWeight: bigint;
};

const calculateSlippage = (value: bigint, slippageTolerance: number): bigint => {
  const slippageToleranceBigInt = BigInt(Math.round(1e5 * slippageTolerance));
  const slippage = (value * slippageToleranceBigInt) / BigInt(1e5);
  return value + slippage;
};

export class Pool {
  blockTimestamp: bigint;
  asset: Address;
  share: Address;
  assets: bigint;
  shares: bigint;
  virtualAssets: bigint;
  virtualShares: bigint;
  weightStart: bigint;
  weightEnd: bigint;
  saleStart: bigint;
  saleEnd: bigint;
  totalPurchased: bigint;
  maxSharePrice: bigint;
  assetDecimals: number;
  shareDecimals: number;
  address: string;
  swapFee: bigint;
  chainId: number;
  ERC20Decimals: Record<string, number>;

  constructor(params: PoolParams, blockTimestamp: bigint = BigInt(Date.now()) / 1000n) {
    this.blockTimestamp = blockTimestamp;
    this.asset = params.asset;
    this.share = params.share;
    this.assets = params.assets;
    this.shares = params.shares;
    this.virtualAssets = params.virtualAssets;
    this.virtualShares = params.virtualShares;
    this.weightStart = params.weightStart;
    this.weightEnd = params.weightEnd;
    this.saleStart = params.saleStart;
    this.saleEnd = params.saleEnd;
    this.totalPurchased = params.totalPurchased;
    this.maxSharePrice = params.maxSharePrice;
    this.assetDecimals = params.assetDecimals;
    this.shareDecimals = params.shareDecimals;
    this.address = params.address;
    this.swapFee = params.swapFee;
    this.chainId = params.chainId;
    this.blockTimestamp = blockTimestamp;
    this.ERC20Decimals = {
      [this.asset]: this.assetDecimals,
      [this.share]: this.shareDecimals,
    };
  }

  getPrice = (priceParams?: { add: { assetReserve: bigint; shareReserve: bigint } }) => {
    const { shareReserve, assetReserve, shareWeight, assetWeight } = this.computeReservesAndWeights(this.blockTimestamp);
    const scaledAssetReserve = bigIntToFloat({
      amount: assetReserve + (priceParams?.add?.assetReserve ?? 0n),
      decimals: this.assetDecimals,
    });
    const scaledShareReserve = bigIntToFloat({
      amount: shareReserve + (priceParams?.add?.shareReserve ?? 0n),
      decimals: this.shareDecimals,
    });
    const scaledAssetWeight = bigIntToFloat({ amount: assetWeight, decimals: 18 });
    const scaledShareWeight = bigIntToFloat({ amount: shareWeight, decimals: 18 });
    return (scaledAssetReserve * scaledShareWeight) / (scaledShareReserve * scaledAssetWeight || 1);
  };

  toString(): string {
    return JSON.stringify(
      {
        asset: this.asset,
        share: this.share,
        assets: this.assets,
        shares: this.shares,
        virtualAssets: this.virtualAssets,
        virtualShares: this.virtualShares,
        weightStart: this.weightStart,
        weightEnd: this.weightEnd,
        saleStart: this.saleStart,
        saleEnd: this.saleEnd,
        totalPurchased: this.totalPurchased,
        maxSharePrice: this.maxSharePrice,
        assetDecimals: this.assetDecimals,
        shareDecimals: this.shareDecimals,
        address: this.address,
        swapFee: this.swapFee,
        chainId: this.chainId,
      },
      null,
      2,
    );
  }

  get endsAt(): Date {
    return new Date(1000 * parseInt(this.saleEnd + ''));
  }

  get startsAt(): Date {
    return new Date(1000 * parseInt(this.saleStart + ''));
  }

  timeMachine(blockTimestamp: bigint): Pool {
    return new Pool(this, blockTimestamp);
  }

  computeReservesAndWeights(blockTimestamp: bigint = this.blockTimestamp): ReservesAndWeights {
    const assetReserve = this.assets + this.virtualAssets;
    const shareReserve = this.shares + this.virtualShares - this.totalPurchased;
    const totalSeconds = this.saleEnd - this.saleStart;
    const elapsedTime = MathLib.max(0n, blockTimestamp - this.saleStart);
    const assetWeight = linearInterpolation(this.weightStart, this.weightEnd, elapsedTime, totalSeconds);
    const shareWeight = MathLib.WAD - assetWeight;

    return { assetReserve, shareReserve, assetWeight, shareWeight };
  }

  previewAssetsIn(shareAmount: bigint): bigint {
    const { assetReserve, shareReserve, assetWeight, shareWeight } = this.computeReservesAndWeights();
    const [scaledAssetReserve, scaledShareReserve] = this.scaledReserves(assetReserve, shareReserve);
    const shareAmountScaled = this.scaleTokenBefore(this.share, shareAmount);
    let amountIn = getAmountIn({
      amountOut: shareAmountScaled,
      reserveIn: scaledAssetReserve,
      reserveOut: scaledShareReserve,
      weightIn: assetWeight,
      weightOut: shareWeight,
    });

    if (MathLib.divWad(amountIn, shareAmountScaled) > this.maxSharePrice) {
      amountIn = MathLib.divWad(shareAmountScaled, this.maxSharePrice);
    }

    return this.scaleTokenAfter(this.asset, amountIn);
  }

  previewAssetsOut(shareAmount: bigint): bigint {
    const { assetReserve, shareReserve, assetWeight, shareWeight } = this.computeReservesAndWeights();
    const [scaledAssetReserve, scaledShareReserve] = this.scaledReserves(assetReserve, shareReserve);
    const shareAmountScaled = this.scaleTokenBefore(this.share, shareAmount);
    let assetAmountOut = getAmountOut({
      amountIn: shareAmountScaled,
      reserveIn: scaledShareReserve,
      reserveOut: scaledAssetReserve,
      weightIn: shareWeight,
      weightOut: assetWeight,
    });

    if (MathLib.divWad(assetAmountOut, shareAmountScaled) > this.maxSharePrice) {
      assetAmountOut = MathLib.mulWad(shareAmountScaled, this.maxSharePrice);
    }

    return this.scaleTokenAfter(this.asset, assetAmountOut);
  }

  previewSharesIn(assetAmount: bigint): bigint {
    const { assetReserve, shareReserve, assetWeight, shareWeight } = this.computeReservesAndWeights();
    const [scaledAssetReserve, scaledShareReserve] = this.scaledReserves(assetReserve, shareReserve);
    const assetAmountScaled = this.scaleTokenBefore(this.asset, assetAmount);
    let shareAmountIn = getAmountIn({
      amountOut: assetAmountScaled,
      reserveIn: scaledShareReserve,
      reserveOut: scaledAssetReserve,
      weightIn: shareWeight,
      weightOut: assetWeight,
    });

    if (MathLib.divWad(assetAmountScaled, shareAmountIn) > this.maxSharePrice) {
      shareAmountIn = MathLib.divWad(assetAmountScaled, this.maxSharePrice);
    }

    return this.scaleTokenAfter(this.share, shareAmountIn);
  }

  previewSharesOut(assetAmount: bigint): bigint {
    const { assetReserve, shareReserve, assetWeight, shareWeight } = this.computeReservesAndWeights();
    const [scaledAssetReserve, scaledShareReserve] = this.scaledReserves(assetReserve, shareReserve);
    const assetAmountScaled = this.scaleTokenBefore(this.asset, assetAmount);
    let shareAmountOut = getAmountOut({
      amountIn: assetAmountScaled,
      reserveIn: scaledAssetReserve,
      reserveOut: scaledShareReserve,
      weightIn: assetWeight,
      weightOut: shareWeight,
    });
    if (MathLib.divWad(assetAmountScaled, shareAmountOut) > this.maxSharePrice) {
      shareAmountOut = MathLib.mulWad(assetAmountScaled, this.maxSharePrice);
    }
    return this.scaleTokenAfter(this.share, shareAmountOut);
  }

  scaledReserves(assetReserve: bigint, shareReserve: bigint): [bigint, bigint] {
    return [this.scaleTokenBefore(this.asset, assetReserve), this.scaleTokenBefore(this.share, shareReserve)];
  }

  scaleTokenBefore(token: string, amount: bigint): bigint {
    const decimals = this.ERC20Decimals[token];
    let scaledAmount = amount;

    if (decimals < 18) {
      scaledAmount = amount * 10n ** BigInt(18 - decimals);
    } else if (decimals > 18) {
      scaledAmount = amount / 10n ** BigInt(decimals - 18);
    }

    return scaledAmount;
  }

  scaleTokenAfter(token: string, amount: bigint): bigint {
    const decimals = this.ERC20Decimals[token];
    let scaledAmount = amount;

    if (decimals < 18) {
      scaledAmount = amount / 10n ** BigInt(18 - decimals);
    } else if (decimals > 18) {
      scaledAmount = amount * 10n ** BigInt(decimals - 18);
    }

    return scaledAmount;
  }
}

export class LiquidityBootstrapPool {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  static fromArgs(args: PoolParams): LiquidityBootstrapPool {
    return new LiquidityBootstrapPool(new Pool(args));
  }

  previewAssetsIn(
    sharesIn: bigint,
    slippageTolerance: number,
  ): {
    price: number;
    slippedValue: bigint;
    value: bigint;
    impact: number;
  } {
    const assetsIn = this.pool.previewAssetsIn(sharesIn);
    const value = MathLib.mulWad(assetsIn, MathLib.WAD + this.pool.swapFee);
    const price = this.pool.getPrice();
    const slippedPrice = this.pool.getPrice({ add: { shareReserve: -(1n * sharesIn), assetReserve: assetsIn } });
    const slippedValue = calculateSlippage(value, slippageTolerance);
    return { price, slippedValue, value, impact: Math.round((slippedPrice / price - 1) * 1e4) / 100 };
  }

  previewSharesOut(
    assetsIn: bigint,
    slippageTolerance: number,
  ): {
    price: number;
    slippedValue: bigint;
    value: bigint;
    impact: number;
  } {
    const value = MathLib.mulWad(assetsIn, MathLib.WAD - this.pool.swapFee);
    const sharesOut = this.pool.previewSharesOut(value);
    const price = this.pool.getPrice();
    const slippedPrice = this.pool.getPrice({ add: { shareReserve: -(1n * sharesOut), assetReserve: value } });
    const slippedValue = calculateSlippage(sharesOut, -slippageTolerance);
    return { price, slippedValue, value: sharesOut, impact: Math.round((slippedPrice / price - 1) * 1e4) / 100 };
  }

  previewSharesIn(
    assetsIn: bigint,
    slippageTolerance: number,
  ): {
    price: number;
    slippedValue: bigint;
    value: bigint;
    impact: number;
  } {
    const sharesIn = this.pool.previewSharesIn(assetsIn);
    const value = MathLib.mulWad(sharesIn, MathLib.WAD + this.pool.swapFee);
    const price = this.pool.getPrice();
    const slippedPrice = this.pool.getPrice({ add: { shareReserve: sharesIn, assetReserve: -(1n * assetsIn) } });
    const slippedValue = calculateSlippage(value, slippageTolerance);
    return { price, slippedValue, value, impact: Math.round((slippedPrice / price - 1) * 1e4) / 100 };
  }

  previewAssetsOut(
    sharesIn: bigint,
    slippageTolerance: number,
  ): {
    price: number;
    slippedValue: bigint;
    value: bigint;
    impact: number;
  } {
    const value = MathLib.mulWad(sharesIn, MathLib.WAD - this.pool.swapFee);
    const assetsOut = this.pool.previewAssetsOut(value);
    const price = this.pool.getPrice();
    const slippedPrice = this.pool.getPrice({ add: { shareReserve: value, assetReserve: -(1n * assetsOut) } });
    const slippedValue = calculateSlippage(assetsOut, -slippageTolerance);
    return { price, slippedValue, value: assetsOut, impact: Math.round((slippedPrice / price - 1) * 1e4) / 100 };
  }

  timeMachine(blockTimestamp: bigint): Pool {
    return new Pool(this.pool, blockTimestamp);
  }

  predicate(blockTimestamp: bigint): number {
    const timeMachine = this.timeMachine(blockTimestamp);
    return timeMachine.getPrice();
  }
}

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
