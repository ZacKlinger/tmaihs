import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollCompletionOptions {
  threshold?: number; // How much of the bottom needs to be visible (0-1)
  onComplete?: () => void;
  disabled?: boolean;
}

export const useScrollCompletion = ({
  threshold = 0.9,
  onComplete,
  disabled = false,
}: UseScrollCompletionOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const hasTriggeredRef = useRef(false);

  const checkScrollPosition = useCallback(() => {
    if (disabled || hasTriggeredRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Check if scrolled to bottom (with threshold tolerance)
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage >= threshold) {
      setHasScrolledToBottom(true);
      hasTriggeredRef.current = true;
      onComplete?.();
    }
  }, [disabled, threshold, onComplete]);

  // Also check if content fits without scrolling
  useEffect(() => {
    if (disabled || hasTriggeredRef.current || !containerRef.current) return;

    const container = containerRef.current;
    
    // If content doesn't require scrolling, mark as complete after a brief delay
    if (container.scrollHeight <= container.clientHeight) {
      const timer = setTimeout(() => {
        if (!hasTriggeredRef.current) {
          setHasScrolledToBottom(true);
          hasTriggeredRef.current = true;
          onComplete?.();
        }
      }, 1500); // Brief delay to ensure user has time to read
      
      return () => clearTimeout(timer);
    }
  }, [disabled, onComplete]);

  // Reset when disabled changes
  useEffect(() => {
    if (disabled) {
      hasTriggeredRef.current = false;
      setHasScrolledToBottom(false);
    }
  }, [disabled]);

  return {
    containerRef,
    hasScrolledToBottom,
    checkScrollPosition,
  };
};
