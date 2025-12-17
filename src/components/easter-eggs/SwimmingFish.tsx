import { useState, useEffect, useCallback, useRef } from 'react';
import { useFishVisibility } from '@/hooks/useFishVisibility';
import { getRandomInterval, PageDensity } from '@/lib/fishConfig';
import fishImage from '@/assets/swimming-fish.svg';

type Direction = 'ltr' | 'rtl';

interface FishState {
  isVisible: boolean;
  direction: Direction;
  verticalPosition: number;
  swimDuration: number;
  fishScale: number;
  opacity: number;
  undulateDuration: number;
  tailDuration: number;
}

interface SingleFishProps {
  fishId: number;
  initialDelay: number;
  density: Exclude<PageDensity, 'never'>;
  isEnabled: boolean;
}

function SingleFish({ fishId, initialDelay, density, isEnabled }: SingleFishProps) {
  const [state, setState] = useState<FishState>({
    isVisible: false,
    direction: 'ltr',
    verticalPosition: 50,
    swimDuration: 18,
    fishScale: 1,
    opacity: 0.7,
    undulateDuration: 4,
    tailDuration: 2,
  });
  
  const hasTriggeredInitialRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSwim = useCallback(() => {
    // Random direction (true 50/50, not alternating)
    const newDirection: Direction = Math.random() > 0.5 ? 'ltr' : 'rtl';
    
    // Random scale (depth) - 0.5 to 1.5 for dramatic size variation
    const scale = Math.random() * 1.0 + 0.5;
    
    // Derive opacity from scale (closer = more visible)
    // Scale 0.5 → opacity 0.7, Scale 1.5 → opacity 1.0
    const opacity = 0.7 + (scale - 0.5) * 0.3;
    
    // Derive speed from scale (closer = faster)
    // Scale 0.6 → 21s, Scale 1.4 → 11s
    const duration = Math.round(28 - (scale * 12));
    
    // Randomize animation durations for organic feel
    const undulateDuration = 3.7 + Math.random() * 0.6; // 3.7-4.3s
    const tailDuration = 1.8 + Math.random() * 0.4; // 1.8-2.2s
    
    // Calculate position relative to current scroll + random viewport position
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const randomViewportPercent = Math.random() * 0.7 + 0.15; // 15-85% of viewport
    const documentY = scrollY + (viewportHeight * randomViewportPercent);
    
    setState({
      isVisible: true,
      direction: newDirection,
      verticalPosition: documentY,
      swimDuration: duration,
      fishScale: scale,
      opacity,
      undulateDuration,
      tailDuration,
    });
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

  const handleAnimationEnd = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: false }));
    
    if (isEnabled) {
      scheduleNextSwim(density);
    }
  }, [isEnabled, density, scheduleNextSwim]);

  // Initial trigger and scheduling
  useEffect(() => {
    if (!isEnabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    // Trigger with initial delay
    if (!hasTriggeredInitialRef.current) {
      hasTriggeredInitialRef.current = true;
      setTimeout(() => {
        triggerSwim();
      }, 500 + initialDelay);
    } else if (!state.isVisible) {
      scheduleNextSwim(density);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isEnabled, density, triggerSwim, scheduleNextSwim, state.isVisible, initialDelay]);

  if (!isEnabled || !state.isVisible) {
    return null;
  }

  return (
    <div
      className="absolute"
      style={{
        top: `${state.verticalPosition}px`,
        left: state.direction === 'ltr' ? '-100px' : 'calc(100vw + 100px)',
        animation: `${state.direction === 'ltr' ? 'fish-swim' : 'fish-swim-rtl'} ${state.swimDuration}s linear forwards`,
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Undulate wrapper - slow gentle wave */}
      <div 
        className="animate-fish-undulate"
        style={{ animationDuration: `${state.undulateDuration}s` }}
      >
        {/* Tail wrapper - subtle tail movement */}
        <div 
          className="animate-fish-tail"
          style={{ animationDuration: `${state.tailDuration}s` }}
        >
          <img
            src={fishImage}
            alt=""
            className="h-auto"
            style={{
              width: `${180 * state.fishScale}px`,
              opacity: state.opacity,
              transform: state.direction === 'ltr' ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function SwimmingFish() {
  const { density, isEnabled } = useFishVisibility();
  const [secondFishDelay] = useState(() => Math.random() * 1200 + 800);

  if (!isEnabled || density === 'never') {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" style={{ minHeight: '100%' }}>
      <SingleFish 
        fishId={1} 
        initialDelay={0} 
        density={density} 
        isEnabled={isEnabled} 
      />
      <SingleFish 
        fishId={2} 
        initialDelay={secondFishDelay} 
        density={density} 
        isEnabled={isEnabled} 
      />
    </div>
  );
}
