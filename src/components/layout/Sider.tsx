import { siderCollapsedAtom } from '@/atoms';
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

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setCollapsed(false);
  }, [setCollapsed]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setCollapsed(true);
  }, [setCollapsed]);

  const xlBreakpoint = 1280; //  
  const { width: windowWidth } = useWindowSize();
  const variants = useMemo(
    () => ({
      open: { width: windowWidth >= xlBreakpoint ? '238px' : 'calc(19.04vw)' },
      closed: { width: windowWidth >= xlBreakpoint ? '86px' : 'calc(6.88vw)' },
    }),
    [windowWidth, xlBreakpoint],
  );

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
