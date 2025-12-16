import { useState, useEffect, useCallback, useRef } from 'react';
import { useFishVisibility } from '@/hooks/useFishVisibility';
import { getRandomInterval, PageDensity } from '@/lib/fishConfig';
import fishImage from '@/assets/swimming-fish.svg';

type Direction = 'ltr' | 'rtl';

export function SwimmingFish() {
  const { density, isEnabled } = useFishVisibility();
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<Direction>('ltr');
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [swimDuration, setSwimDuration] = useState(18);
  const [fishScale, setFishScale] = useState(1);
  const lastDirectionRef = useRef<Direction>('rtl'); // Start with rtl so first swim is ltr
  const hasTriggeredInitialRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSwim = useCallback(() => {
    // Alternate direction
    const newDirection: Direction = lastDirectionRef.current === 'ltr' ? 'rtl' : 'ltr';
    lastDirectionRef.current = newDirection;
    setDirection(newDirection);
    
    // Calculate position relative to current scroll + random viewport position
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const randomViewportPercent = Math.random() * 0.7 + 0.15; // 15-85% of viewport
    const documentY = scrollY + (viewportHeight * randomViewportPercent);
    setVerticalPosition(documentY); // Now stores pixel value
    
    // Randomize swim duration (15-22 seconds)
    setSwimDuration(Math.floor(Math.random() * 7) + 15);
    
    // Randomize size for depth effect (0.6 to 1.4 scale)
    setFishScale(Math.random() * 0.8 + 0.6);
    
    setIsVisible(true);
  }, []);

  const scheduleNextSwim = useCallback((currentDensity: Exclude<PageDensity, 'never'>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const interval = getRandomInterval(currentDensity);
    timeoutRef.current = setTimeout(() => {
      triggerSwim();
    }, interval);
  }, [triggerSwim]);

  // Handle animation end
  const handleAnimationEnd = useCallback(() => {
    setIsVisible(false);
    
    if (isEnabled && density !== 'never') {
      scheduleNextSwim(density);
    }
  }, [isEnabled, density, scheduleNextSwim]);

  // Initial trigger on homepage and scheduling
  useEffect(() => {
    if (!isEnabled || density === 'never') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    // Trigger immediately on first load of homepage
    if (!hasTriggeredInitialRef.current && density === 'low') {
      hasTriggeredInitialRef.current = true;
      // Small delay to let the page render first
      setTimeout(() => {
        triggerSwim();
      }, 2000);
    } else if (!isVisible) {
      // Schedule next swim if not currently swimming
      scheduleNextSwim(density);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isEnabled, density, triggerSwim, scheduleNextSwim, isVisible]);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" style={{ minHeight: '100%' }}>
      <div
        className="absolute"
        style={{
          top: `${verticalPosition}px`,
          left: direction === 'ltr' ? '-100px' : 'auto',
          right: direction === 'rtl' ? '-100px' : 'auto',
          animation: `fish-swim ${swimDuration}s linear forwards`,
          animationDirection: direction === 'rtl' ? 'reverse' : 'normal',
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Undulate wrapper - slow gentle wave */}
        <div 
          className="animate-fish-undulate"
          style={{ animationDuration: '4s' }}
        >
          {/* Tail wrapper - subtle tail movement */}
          <div 
            className="animate-fish-tail"
            style={{ animationDuration: '2s' }}
          >
            <img
              src={fishImage}
              alt=""
              className="h-auto"
              style={{
                width: `${180 * fishScale}px`,
                opacity: 0.65,
                transform: direction === 'ltr' ? 'scaleX(-1)' : 'scaleX(1)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
