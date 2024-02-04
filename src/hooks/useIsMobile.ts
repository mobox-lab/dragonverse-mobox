import { isMobileAtom } from '@/atoms/dragonverse';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export const useIsMobile = () => {
  const [mobile, setMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  return { mobile, setMobile };
};
