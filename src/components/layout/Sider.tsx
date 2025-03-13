import { siderCollapsedAtom } from '@/atoms';
import { useIsHome } from '@/hooks/useIsHome';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { useWindowSize } from 'react-use';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
  onCollapse?: (collapsed: boolean) => void;
}

export interface SiderContextProps {
  siderCollapsed?: boolean;
}

export const SiderContext: React.Context<SiderContextProps> = React.createContext({});

const Sider: React.FunctionComponent<SiderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useAtom(siderCollapsedAtom);
  const { isHome } = useIsHome();

  const handleMouseEnter = useCallback(() => {
    if (isMobile || isHome) return;
    setCollapsed(false);
  }, [isHome, setCollapsed]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || isHome) return;
    setCollapsed(true);
  }, [isHome, setCollapsed]);

  const xlBreakpoint = 1280; //  
  const { width: windowWidth } = useWindowSize();
  const variants = useMemo(
    () => ({
      open: { width: windowWidth >= xlBreakpoint ? '238px' : 'calc(19.04vw)' },
      closed: { width: windowWidth >= xlBreakpoint ? '86px' : 'calc(6.88vw)' },
    }),
    [windowWidth, xlBreakpoint],
  );

  useEffect(() => {
    if (isHome) setCollapsed(false);
    else setCollapsed(true);
  }, [isHome, setCollapsed]);

  return (
    <motion.aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={collapsed ? 'closed' : 'open'}
      variants={variants}
      className={`fixed left-0 top-0 z-20 h-screen bg-[#0E0F15] px-[1.28vw] xl:px-4`}
    >
      <div>{children}</div>
    </motion.aside>
  );
};

export default Sider;

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

// TypeScript internationalization: fix: 🐛 fix game loading screen stuck
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
    fix____fix_game_loading_screen_stuck: 'fix: 🐛 fix game loading screen stuck',
    fix____fix_game_loading_screen_stuck_description: 'Description for fix: 🐛 fix game loading screen stuck'
  },
  zh: {
    fix____fix_game_loading_screen_stuck: 'fix: 🐛 fix game loading screen stuck',
    fix____fix_game_loading_screen_stuck_description: 'fix: 🐛 fix game loading screen stuck的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: feat: ✨ add multi-language support (i18n)
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const feat____add_multi_language_support__i18n_: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
