import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';

interface MobileGestureHandlerProps {
  children: React.ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTab?: () => void;
  onLongPress?: () => void;
  className?: string;
}

export function MobileGestureHandler({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTab,
  onLongPress,
  className = ''
}: MobileGestureHandlerProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [lastTap, setLastTap] = useState<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const minSwipeDistance = 50;
  const doubleTapDelay = 300;
  const longPressDelay = 600;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    
    // Start long press timer
    if (onLongPress) {
      setIsLongPressing(false);
      longPressTimer.current = setTimeout(() => {
        setIsLongPressing(true);
        onLongPress();
        // Haptic feedback for long press
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      }, longPressDelay);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    // Cancel long press if user moves finger
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (isLongPressing) {
      setIsLongPressing(false);
      return;
    }

    if (!touchStart || !touchEnd) {
      // Handle tap/double tap
      const now = Date.now();
      if (onDoubleTab && now - lastTap < doubleTapDelay) {
        onDoubleTab();
        // Haptic feedback for double tap
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 25, 50]);
        }
      }
      setLastTap(now);
      return;
    }
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;
    
    // Determine primary swipe direction
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
        if ('vibrate' in navigator) {
          navigator.vibrate(25);
        }
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
        if ('vibrate' in navigator) {
          navigator.vibrate(25);
        }
      }
    } else {
      // Vertical swipe
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp();
        if ('vibrate' in navigator) {
          navigator.vibrate(25);
        }
      } else if (isDownSwipe && onSwipeDown) {
        onSwipeDown();
        if ('vibrate' in navigator) {
          navigator.vibrate(25);
        }
      }
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      {children}
    </div>
  );
}