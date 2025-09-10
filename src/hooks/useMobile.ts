import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const orient = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      setIsMobile(mobile);
      setIsTouch(touch);
      setOrientation(orient);
    };

    checkDevice();
    
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator && isMobile) {
      navigator.vibrate(pattern);
    }
  };

  const isInStandaloneMode = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  };

  return {
    isMobile,
    isTouch,
    orientation,
    vibrate,
    isInStandaloneMode: isInStandaloneMode(),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent)
  };
}