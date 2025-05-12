import { useState, useEffect } from 'react';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ScreenSizeInfo {
  isMobile: boolean;  // true for xs and sm (< 768px)
  isExtraSmall: boolean; // < 480px
  isSmall: boolean;   // 480px-767px
  isMedium: boolean;  // 768px-1023px
  isLarge: boolean;   // 1024px-1279px
  isExtraLarge: boolean; // >= 1280px
  screenSize: ScreenSize; // Current screen size category
}

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Set initial value
      checkMobile();
      
      // Add event listener
      window.addEventListener('resize', checkMobile);
      
      // Clean up
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return isMobile;
};

// Enhanced version that provides more detailed screen size information
export const useScreenSize = (): ScreenSizeInfo => {
  const [screenInfo, setScreenInfo] = useState<ScreenSizeInfo>({
    isMobile: true,
    isExtraSmall: true,
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
    screenSize: 'xs'
  });

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        const isXs = width < 480;
        const isSm = width >= 480 && width < 768;
        const isMd = width >= 768 && width < 1024;
        const isLg = width >= 1024 && width < 1280;
        const isXl = width >= 1280;
        
        let screenSize: ScreenSize = 'xs';
        if (isXs) screenSize = 'xs';
        else if (isSm) screenSize = 'sm';
        else if (isMd) screenSize = 'md';
        else if (isLg) screenSize = 'lg';
        else screenSize = 'xl';

        setScreenInfo({
          isMobile: isXs || isSm,
          isExtraSmall: isXs,
          isSmall: isSm,
          isMedium: isMd,
          isLarge: isLg,
          isExtraLarge: isXl,
          screenSize
        });
      };
      
      // Set initial value
      checkScreenSize();
      
      // Add event listener
      window.addEventListener('resize', checkScreenSize);
      
      // Clean up
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  return screenInfo;
};

export default useIsMobile;