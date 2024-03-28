import Decimal from 'decimal.js-light';

export class MathLib {
  static WAD = 10n ** 18n;

  static mulWad(x: bigint, y: bigint) {
    return (x * y) / MathLib.WAD;
  }

  static mulWadUp(x: bigint, y: bigint) {
    let product = x * y;
    let z = product / MathLib.WAD;
    if (product % MathLib.WAD > 0n) {
      z += 1n;
    }
    return z;
  }

  static divWad(x: bigint, y: bigint) {
    return (x * MathLib.WAD) / (y === 0n ? 1n : y);
  }

  static divWadUp(x: bigint, y: bigint) {
    const product = x * MathLib.WAD;
    const modulo = product % y;
    return modulo > 0n ? product / y + 1n : product / y;
  }

  static mulDiv(x: bigint, y: bigint, d: bigint) {
    return (x * y) / d;
  }

  static max(x: bigint, y: bigint) {
    return x > y ? x : y;
  }

  static min(x: bigint, y: bigint) {
    return x < y ? x : y;
  }

  static lnWad(x: bigint) {
    const xFloat = Number(x) / Number(MathLib.WAD);
    const result = Math.log(xFloat) * Number(MathLib.WAD);
    return BigInt(Math.round(result));
  }

  static expWad(y: bigint) {
    const yFloat = Number(y) / Number(MathLib.WAD);
    const result = Math.exp(yFloat) * Number(MathLib.WAD);
    return BigInt(Math.round(result));
  }

  static powWad(x: bigint, y: bigint) {
    const lnX = MathLib.lnWad(x);
    const lnXTimesY = (lnX * y) / MathLib.WAD;
    return MathLib.expWad(lnXTimesY);
  }
}
