import { useState, useEffect, useCallback, useRef } from 'react';
import { useFishVisibility } from '@/hooks/useFishVisibility';
import { getRandomInterval, PageDensity } from '@/lib/fishConfig';
import fishImage from '@/assets/swimming-fish.png';

type Direction = 'ltr' | 'rtl';

export function SwimmingFish() {
  const { density, isEnabled } = useFishVisibility();
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<Direction>('ltr');
  const [verticalPosition, setVerticalPosition] = useState(50);
  const [swimDuration, setSwimDuration] = useState(18);
  const lastDirectionRef = useRef<Direction>('rtl'); // Start with rtl so first swim is ltr
  const hasTriggeredInitialRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSwim = useCallback(() => {
    // Alternate direction
    const newDirection: Direction = lastDirectionRef.current === 'ltr' ? 'rtl' : 'ltr';
    lastDirectionRef.current = newDirection;
    setDirection(newDirection);
    
    // Randomize vertical position (15-85% to avoid header/footer)
    setVerticalPosition(Math.floor(Math.random() * 70) + 15);
    
    // Randomize swim duration (15-22 seconds)
    setSwimDuration(Math.floor(Math.random() * 7) + 15);
    
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <div
        className="absolute"
        style={{
          top: `${verticalPosition}%`,
          left: direction === 'ltr' ? '-100px' : 'auto',
          right: direction === 'rtl' ? '-100px' : 'auto',
          animation: `fish-swim ${swimDuration}s linear forwards`,
          animationDirection: direction === 'rtl' ? 'reverse' : 'normal',
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Bob wrapper */}
        <div 
          className="animate-fish-bob"
          style={{ animationDuration: '2s' }}
        >
          {/* Undulate wrapper */}
          <div 
            className="animate-fish-undulate"
            style={{ animationDuration: '0.8s' }}
          >
            {/* Tail wrapper */}
            <div 
              className="animate-fish-tail"
              style={{ animationDuration: '0.4s' }}
            >
              <img
                src={fishImage}
                alt=""
                className="w-16 h-auto"
                style={{
                  opacity: 0.06,
                  transform: direction === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
