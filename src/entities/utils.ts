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

// TypeScript internationalization: chore: 🔧 configure environment variables
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    chore____configure_environment_variables: 'chore: 🔧 configure environment variables',
    chore____configure_environment_variables_description: 'Description for chore: 🔧 configure environment variables'
  },
  zh: {
    chore____configure_environment_variables: 'chore: 🔧 configure environment variables',
    chore____configure_environment_variables_description: 'chore: 🔧 configure environment variables的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript internationalization: feat: ✨ add game tutorial overlay
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'Description for feat: ✨ add game tutorial overlay'
  },
  zh: {
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'feat: ✨ add game tutorial overlay的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
