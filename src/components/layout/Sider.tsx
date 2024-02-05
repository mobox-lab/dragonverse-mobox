import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
import { useIsHome } from '@/hooks/useIsHome';

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

// const variants = {
//   open: { width: 238 },
//   closed: { width: 86 },
// };

const Sider: React.FunctionComponent<SiderProps> = ({
  defaultCollapsed = false,
  collapsible = true,
  width = 238,
  collapsedWidth = 86,
  onCollapse,
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState('collapsed' in props ? props.collapsed : defaultCollapsed);
  const { isHome } = useIsHome();
  const { mobile } = useIsMobile();
  useEffect(() => {
    if ('collapsed' in props) {
      setCollapsed(props.collapsed);
    }
    // eslint-disable-next-line
  }, [props.collapsed]);

  const contextValue = React.useMemo(
    () => ({
      siderCollapsed: collapsed,
    }),
    [collapsed],
  );

  const handleSetCollapsed = (value: boolean) => {
    if (!('collapsed' in props)) {
      setCollapsed(value);
    }
    onCollapse?.(value);
  };

  const toggle = () => {
    handleSetCollapsed(!collapsed);
  };

  const handleMouseEnter = () => {
    if (mobile || isHome) return;
    handleSetCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (mobile || isHome) return;
    handleSetCollapsed(true);
  };

  const xlBreakpoint = 1280; //  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const variants = {
    open: { width: windowWidth >= xlBreakpoint ? '238px' : 'calc(19.04vw)' },
    closed: { width: windowWidth >= xlBreakpoint ? '86px' : 'calc(6.88vw)' },
  };

  const renderSider = () => {
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

  return <SiderContext.Provider value={contextValue}>{renderSider()}</SiderContext.Provider>;
};

export default Sider;
